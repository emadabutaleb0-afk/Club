import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';
import { AppError } from './errorHandler';

export interface AuthRequest extends Request {
    userId?: string;
    userEmail?: string;
}

export interface ClubAuthRequest extends AuthRequest {
    clubId?: string;
    membershipRole?: string;
}

// ─── Verify JWT ───────────────────────────────────────
export function authenticate(req: AuthRequest, _res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            throw new AppError('Authentication required', 401);
        }

        const token = authHeader.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as { userId: string; email: string };

        req.userId = payload.userId;
        req.userEmail = payload.email;
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return next(new AppError('Invalid or expired token', 401));
        }
        next(error);
    }
}

// ─── Role-Based Guard ─────────────────────────────────
export function requireRole(...roles: string[]) {
    return async (req: ClubAuthRequest, _res: Response, next: NextFunction) => {
        try {
            const clubId = req.params.clubId || req.body.clubId || req.query.clubId as string;
            if (!clubId) {
                throw new AppError('Club ID is required', 400);
            }

            const membership = await prisma.clubMembership.findUnique({
                where: { userId_clubId: { userId: req.userId!, clubId } },
            });

            if (!membership) {
                throw new AppError('You are not a member of this club', 403);
            }

            if (!roles.includes(membership.role)) {
                throw new AppError('Insufficient permissions', 403);
            }

            req.clubId = clubId;
            req.membershipRole = membership.role;
            next();
        } catch (error) {
            next(error);
        }
    };
}

// ─── Club Member Guard (any role) ─────────────────────
export async function requireClubMember(req: ClubAuthRequest, _res: Response, next: NextFunction) {
    try {
        const clubId = req.params.clubId || req.body.clubId || req.query.clubId as string;
        if (!clubId) {
            throw new AppError('Club ID is required', 400);
        }

        const membership = await prisma.clubMembership.findUnique({
            where: { userId_clubId: { userId: req.userId!, clubId } },
        });

        if (!membership) {
            throw new AppError('You are not a member of this club', 403);
        }

        req.clubId = clubId;
        req.membershipRole = membership.role;
        next();
    } catch (error) {
        next(error);
    }
}
