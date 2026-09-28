import Stripe from 'stripe';
import prisma from '../lib/prisma';
import { AppError } from '../middleware/errorHandler';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2025-01-27.acacia' as any });
const PLATFORM_FEE_PERCENT = parseFloat(process.env.STRIPE_PLATFORM_FEE_PERCENT || '2');

export class PaymentService {
    // ─── Create Stripe Connect Account for Club ─────
    static async createConnectAccount(clubId: string, email: string) {
        const account = await stripe.accounts.create({
            type: 'express',
            email,
            capabilities: { card_payments: { requested: true }, transfers: { requested: true } },
            metadata: { clubId },
        });

        await prisma.club.update({
            where: { id: clubId },
            data: { stripeAccountId: account.id },
        });

        // Generate onboarding link
        const accountLink = await stripe.accountLinks.create({
            account: account.id,
            refresh_url: `${process.env.FRONTEND_URL}/admin/stripe/refresh`,
            return_url: `${process.env.FRONTEND_URL}/admin/stripe/complete`,
            type: 'account_onboarding',
        });

        return { accountId: account.id, onboardingUrl: accountLink.url };
    }

    // ─── Create Membership Plan + Stripe Price ──────
    static async createPlan(clubId: string, data: {
        name: string; description?: string; type: string; price: number;
        currency?: string; interval: string; intervalCount?: number; features?: string[];
    }) {
        const club = await prisma.club.findUnique({ where: { id: clubId } });
        if (!club?.stripeAccountId) {
            throw new AppError('Club must complete Stripe onboarding first', 400);
        }

        // Create Stripe product + price on connected account
        const product = await stripe.products.create(
            { name: data.name, description: data.description, metadata: { clubId } },
            { stripeAccount: club.stripeAccountId }
        );

        let stripePriceId: string | undefined;
        if (data.interval !== 'one_time') {
            const price = await stripe.prices.create(
                {
                    product: product.id,
                    unit_amount: Math.round(data.price * 100),
                    currency: data.currency || club.currency,
                    recurring: {
                        interval: data.interval === 'quarter' ? 'month' : data.interval as Stripe.PriceCreateParams.Recurring.Interval,
                        interval_count: data.interval === 'quarter' ? 3 : (data.intervalCount || 1),
                    },
                },
                { stripeAccount: club.stripeAccountId }
            );
            stripePriceId = price.id;
        }

        const plan = await prisma.membershipPlan.create({
            data: {
                clubId,
                name: data.name,
                description: data.description,
                type: data.type,
                price: data.price,
                currency: data.currency || club.currency,
                interval: data.interval,
                intervalCount: data.intervalCount || 1,
                features: data.features || [],
                stripePriceId,
            },
        });

        return plan;
    }

    // ─── Subscribe Member to Plan ───────────────────
    static async createSubscription(userId: string, clubId: string, planId: string, paymentMethodId: string) {
        const club = await prisma.club.findUnique({ where: { id: clubId } });
        if (!club?.stripeAccountId) throw new AppError('Club not set up for payments', 400);

        const plan = await prisma.membershipPlan.findUnique({ where: { id: planId } });
        if (!plan || !plan.isActive) throw new AppError('Plan not found or inactive', 404);

        const membership = await prisma.clubMembership.findUnique({
            where: { userId_clubId: { userId, clubId } },
        });
        if (!membership) throw new AppError('Must be a club member first', 400);

        // Create or get Stripe customer on connected account
        const user = await prisma.user.findUnique({ where: { id: userId } });
        const customer = await stripe.customers.create(
            { email: user!.email, name: `${user!.firstName} ${user!.lastName}`, payment_method: paymentMethodId, invoice_settings: { default_payment_method: paymentMethodId } },
            { stripeAccount: club.stripeAccountId }
        );

        // Create subscription with application fee
        const stripeSubscription = await stripe.subscriptions.create(
            {
                customer: customer.id,
                items: [{ price: plan.stripePriceId! }],
                application_fee_percent: PLATFORM_FEE_PERCENT,
                metadata: { userId, clubId, membershipId: membership.id },
            },
            { stripeAccount: club.stripeAccountId }
        );

        const subscription = await prisma.subscription.create({
            data: {
                membershipId: membership.id,
                planId: plan.id,
                status: stripeSubscription.status,
                stripeSubscriptionId: stripeSubscription.id,
                currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
                currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
            },
        });

        // Activate membership
        await prisma.clubMembership.update({
            where: { id: membership.id },
            data: { status: 'active' },
        });

        return subscription;
    }

    // ─── Settlement Report ──────────────────────────
    static async getSettlementReport(clubId: string, startDate: Date, endDate: Date) {
        const payments = await prisma.payment.findMany({
            where: {
                clubId,
                status: 'succeeded',
                createdAt: { gte: startDate, lte: endDate },
            },
            orderBy: { createdAt: 'desc' },
        });

        const totalCollected = payments.reduce((sum, p) => sum + p.amount, 0);
        const platformFees = payments.reduce((sum, p) => sum + p.platformFee, 0);

        return {
            clubId,
            period: { start: startDate.toISOString(), end: endDate.toISOString() },
            totalCollected: Math.round(totalCollected * 100) / 100,
            platformFees: Math.round(platformFees * 100) / 100,
            netSettled: Math.round((totalCollected - platformFees) * 100) / 100,
            transactionCount: payments.length,
            transactions: payments,
        };
    }

    // ─── Handle Stripe Webhook Events ───────────────
    static async handleWebhookEvent(event: Stripe.Event) {
        switch (event.type) {
            case 'invoice.paid': {
                const invoice = event.data.object as Stripe.Invoice;
                const subscriptionId = invoice.subscription as string;
                const sub = await prisma.subscription.findUnique({ where: { stripeSubscriptionId: subscriptionId } });
                if (sub) {
                    const membership = await prisma.clubMembership.findUnique({ where: { id: sub.membershipId } });
                    if (membership) {
                        const amount = (invoice.amount_paid || 0) / 100;
                        const platformFee = Math.round(amount * PLATFORM_FEE_PERCENT) / 100;
                        await prisma.payment.create({
                            data: {
                                clubId: membership.clubId,
                                userId: membership.userId,
                                amount,
                                platformFee,
                                netAmount: amount - platformFee,
                                currency: invoice.currency || 'usd',
                                status: 'succeeded',
                                type: 'subscription',
                                description: `Subscription payment`,
                                stripePaymentIntentId: invoice.payment_intent as string,
                            },
                        });
                    }
                }
                break;
            }
            case 'customer.subscription.updated': {
                const subscription = event.data.object as Stripe.Subscription;
                await prisma.subscription.updateMany({
                    where: { stripeSubscriptionId: subscription.id },
                    data: {
                        status: subscription.status,
                        currentPeriodStart: new Date(subscription.current_period_start * 1000),
                        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
                        cancelAtPeriodEnd: subscription.cancel_at_period_end,
                    },
                });
                break;
            }
            case 'customer.subscription.deleted': {
                await prisma.subscription.updateMany({
                    where: { stripeSubscriptionId: (event.data.object as Stripe.Subscription).id },
                    data: { status: 'cancelled' },
                });
                break;
            }
        }
    }
}
