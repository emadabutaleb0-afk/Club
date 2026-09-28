import { Router } from 'express';
import { authenticate, AuthRequest, requireRole, ClubAuthRequest } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { updateProfileSchema, memberListQuerySchema } from '@clubhub/shared';
import prisma from '../lib/prisma';
import { generateMemberQR } from '../utils/qr';

export const memberRouter = Router();

// Get current user profile
memberRouter.get('/me', authenticate, async (req: AuthRequest, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.userId! },
            select: { id: true, email: true, firstName: true, lastName: true, phone: true, avatar: true, createdAt: true },
        });
        const memberships = await prisma.clubMembership.findMany({
            where: { userId: req.userId! },
            include: { club: { select: { id: true, name: true, slug: true, logo: true } } },
        });
        res.json({ success: true, data: { ...user, memberships } });
    } catch (error) { next(error); }
});

// Get member list for a club (admin)
memberRouter.get('/club/:clubId', authenticate, requireRole('admin', 'super_admin', 'reception'), validate(memberListQuerySchema, 'query'), async (req: ClubAuthRequest, res, next) => {
    try {
        const { page, limit, search, status, sortBy, sortOrder } = req.query as any;
        const skip = ((page || 1) - 1) * (limit || 20);
        const where: any = { clubId: req.params.clubId };
        if (status) where.status = status;
        if (search) {
            where.user = {
                OR: [
                    { firstName: { contains: search, mode: 'insensitive' } },
                    { lastName: { contains: search, mode: 'insensitive' } },
                    { email: { contains: search, mode: 'insensitive' } },
                ]
            };
        }
        const [members, total] = await Promise.all([
            prisma.clubMembership.findMany({
                where, skip, take: limit || 20,
                orderBy: { [sortBy || 'joinedAt']: sortOrder || 'desc' },
                include: { user: { select: { id: true, email: true, firstName: true, lastName: true, avatar: true } } },
            }),
            prisma.clubMembership.count({ where }),
        ]);
        res.json({ success: true, data: { data: members, total, page: page || 1, limit: limit || 20, totalPages: Math.ceil(total / (limit || 20)) } });
    } catch (error) { next(error); }
});

// Update profile
memberRouter.put('/profile', authenticate, validate(updateProfileSchema), async (req: AuthRequest, res, next) => {
    try {
        const { firstName, lastName, phone, ...profileData } = req.body;
        if (firstName || lastName || phone) {
            await prisma.user.update({ where: { id: req.userId! }, data: { firstName, lastName, phone } });
        }
        res.json({ success: true, message: 'Profile updated' });
    } catch (error) { next(error); }
});

// Generate digital membership card QR
memberRouter.get('/card/:clubId', authenticate, async (req: AuthRequest, res, next) => {
    try {
        const membership = await prisma.clubMembership.findUnique({
            where: { userId_clubId: { userId: req.userId!, clubId: req.params.clubId } },
            include: { club: { select: { name: true, logo: true } }, user: { select: { firstName: true, lastName: true, avatar: true } } },
        });
        if (!membership) return res.status(404).json({ success: false, error: 'Membership not found' });
        const qrCode = await generateMemberQR(req.userId!, req.params.clubId, membership.membershipNumber);
        res.json({ success: true, data: { ...membership, qrCode } });
    } catch (error) { next(error); }
});
