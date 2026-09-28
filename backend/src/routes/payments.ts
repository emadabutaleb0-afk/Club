import { Router } from 'express';
import { authenticate, AuthRequest, requireRole, ClubAuthRequest } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { createPlanSchema, createSubscriptionSchema } from '@clubhub/shared';
import { PaymentService } from '../services/paymentService';
import prisma from '../lib/prisma';

export const paymentRouter = Router();

// Create membership plan (admin)
paymentRouter.post('/plans/:clubId', authenticate, requireRole('admin', 'super_admin', 'finance'), validate(createPlanSchema), async (req: ClubAuthRequest, res, next) => {
    try {
        const plan = await PaymentService.createPlan(req.params.clubId, req.body);
        res.status(201).json({ success: true, data: plan });
    } catch (error) { next(error); }
});

// List plans for a club
paymentRouter.get('/plans/:clubId', authenticate, async (req: AuthRequest, res, next) => {
    try {
        const plans = await prisma.membershipPlan.findMany({
            where: { clubId: req.params.clubId, isActive: true },
            orderBy: { price: 'asc' },
        });
        res.json({ success: true, data: plans });
    } catch (error) { next(error); }
});

// Subscribe to a plan
paymentRouter.post('/subscribe/:clubId', authenticate, validate(createSubscriptionSchema), async (req: AuthRequest, res, next) => {
    try {
        const subscription = await PaymentService.createSubscription(req.userId!, req.params.clubId, req.body.planId, req.body.paymentMethodId);
        res.status(201).json({ success: true, data: subscription });
    } catch (error) { next(error); }
});

// Get settlement report (admin/finance)
paymentRouter.get('/settlements/:clubId', authenticate, requireRole('admin', 'super_admin', 'finance'), async (req: ClubAuthRequest, res, next) => {
    try {
        const startDate = new Date(req.query.startDate as string || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
        const endDate = new Date(req.query.endDate as string || new Date());
        const report = await PaymentService.getSettlementReport(req.params.clubId, startDate, endDate);
        res.json({ success: true, data: report });
    } catch (error) { next(error); }
});

// Payment history for current user
paymentRouter.get('/history', authenticate, async (req: AuthRequest, res, next) => {
    try {
        const payments = await prisma.payment.findMany({
            where: { userId: req.userId! },
            orderBy: { createdAt: 'desc' },
            take: 50,
        });
        res.json({ success: true, data: payments });
    } catch (error) { next(error); }
});

// Stripe Connect onboarding (admin)
paymentRouter.post('/connect/:clubId', authenticate, requireRole('admin', 'super_admin'), async (req: ClubAuthRequest, res, next) => {
    try {
        const result = await PaymentService.createConnectAccount(req.params.clubId, req.userEmail!);
        res.json({ success: true, data: result });
    } catch (error) { next(error); }
});
