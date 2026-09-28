import { Router } from 'express';
import { authenticate, requireRole, ClubAuthRequest } from '../middleware/auth';
import prisma from '../lib/prisma';

export const adminRouter = Router();

// Dashboard KPIs
adminRouter.get('/dashboard/:clubId', authenticate, requireRole('admin', 'super_admin', 'finance'), async (req: ClubAuthRequest, res, next) => {
    try {
        const clubId = req.params.clubId;
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

        const [totalMembers, activeMembers, pendingMembers, recentPayments, totalRevenue, bookingsThisMonth, facilities] = await Promise.all([
            prisma.clubMembership.count({ where: { clubId } }),
            prisma.clubMembership.count({ where: { clubId, status: 'active' } }),
            prisma.clubMembership.count({ where: { clubId, status: 'pending' } }),
            prisma.payment.findMany({ where: { clubId, createdAt: { gte: thirtyDaysAgo }, status: 'succeeded' } }),
            prisma.payment.aggregate({ where: { clubId, status: 'succeeded' }, _sum: { amount: true, platformFee: true } }),
            prisma.booking.count({ where: { facility: { clubId }, createdAt: { gte: thirtyDaysAgo } } }),
            prisma.facility.count({ where: { clubId, isActive: true } }),
        ]);

        const monthlyRevenue = recentPayments.reduce((sum, p) => sum + p.amount, 0);
        const monthlyFees = recentPayments.reduce((sum, p) => sum + p.platformFee, 0);

        res.json({
            success: true,
            data: {
                members: { total: totalMembers, active: activeMembers, pending: pendingMembers, churnRate: totalMembers > 0 ? ((totalMembers - activeMembers) / totalMembers * 100).toFixed(1) : '0' },
                revenue: {
                    allTime: totalRevenue._sum.amount || 0,
                    allTimeFees: totalRevenue._sum.platformFee || 0,
                    monthly: Math.round(monthlyRevenue * 100) / 100,
                    monthlyFees: Math.round(monthlyFees * 100) / 100,
                    monthlyNet: Math.round((monthlyRevenue - monthlyFees) * 100) / 100,
                },
                bookings: { thisMonth: bookingsThisMonth },
                facilities: { total: facilities },
            },
        });
    } catch (error) { next(error); }
});

// Announcements
adminRouter.post('/announcements/:clubId', authenticate, requireRole('admin', 'super_admin', 'coach'), async (req: ClubAuthRequest, res, next) => {
    try {
        const announcement = await prisma.announcement.create({
            data: { clubId: req.params.clubId, authorId: req.userId!, ...req.body },
        });
        res.status(201).json({ success: true, data: announcement });
    } catch (error) { next(error); }
});

adminRouter.get('/announcements/:clubId', authenticate, async (req, res, next) => {
    try {
        const announcements = await prisma.announcement.findMany({
            where: { clubId: req.params.clubId },
            orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }],
            take: 20,
        });
        res.json({ success: true, data: announcements });
    } catch (error) { next(error); }
});

// Invoices
adminRouter.get('/invoices/:clubId', authenticate, requireRole('admin', 'super_admin', 'finance'), async (req: ClubAuthRequest, res, next) => {
    try {
        const invoices = await prisma.invoice.findMany({
            where: { clubId: req.params.clubId },
            orderBy: { createdAt: 'desc' },
            take: 50,
        });
        res.json({ success: true, data: invoices });
    } catch (error) { next(error); }
});
