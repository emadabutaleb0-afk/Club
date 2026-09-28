import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';
import prisma from '../lib/prisma';
import { AppError } from '../middleware/errorHandler';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'dev-access-secret';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret';
const ACCESS_EXPIRES = process.env.JWT_ACCESS_EXPIRES_IN || '15m';
const REFRESH_EXPIRES = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

export class AuthService {
    // ─── Register ─────────────────────────────────────
    static async register(data: { email: string; password: string; firstName: string; lastName: string; phone?: string }) {
        const existing = await prisma.user.findUnique({ where: { email: data.email } });
        if (existing) {
            throw new AppError('Email already registered', 409);
        }

        const passwordHash = await bcrypt.hash(data.password, 12);
        const user = await prisma.user.create({
            data: {
                email: data.email,
                passwordHash,
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone,
            },
        });

        const tokens = await this.generateTokens(user.id, user.email);
        return {
            user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName },
            ...tokens,
        };
    }

    // ─── Login ────────────────────────────────────────
    static async login(email: string, password: string) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.isActive) {
            throw new AppError('Invalid email or password', 401);
        }

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) {
            throw new AppError('Invalid email or password', 401);
        }

        // Load club roles
        const memberships = await prisma.clubMembership.findMany({
            where: { userId: user.id },
            include: { club: { select: { id: true, name: true } } },
        });

        const roles = memberships.map((m) => ({
            clubId: m.club.id,
            clubName: m.club.name,
            role: m.role,
        }));

        const tokens = await this.generateTokens(user.id, user.email);
        return {
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                avatar: user.avatar,
                roles,
            },
            ...tokens,
        };
    }

    // ─── Refresh Token ────────────────────────────────
    static async refresh(refreshToken: string) {
        const stored = await prisma.refreshToken.findUnique({ where: { token: refreshToken } });
        if (!stored || stored.expiresAt < new Date()) {
            throw new AppError('Invalid or expired refresh token', 401);
        }

        // Rotate: delete old, create new
        await prisma.refreshToken.delete({ where: { id: stored.id } });

        const user = await prisma.user.findUnique({ where: { id: stored.userId } });
        if (!user || !user.isActive) {
            throw new AppError('User not found or inactive', 401);
        }

        return this.generateTokens(user.id, user.email);
    }

    // ─── Logout ───────────────────────────────────────
    static async logout(refreshToken: string) {
        await prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
    }

    // ─── Generate Token Pair ──────────────────────────
    private static async generateTokens(userId: string, email: string) {
        const accessToken = jwt.sign({ userId, email }, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES } as jwt.SignOptions);

        const refreshToken = randomUUID();
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);

        await prisma.refreshToken.create({
            data: { token: refreshToken, userId, expiresAt },
        });

        return { accessToken, refreshToken, expiresIn: 900 };
    }
}
