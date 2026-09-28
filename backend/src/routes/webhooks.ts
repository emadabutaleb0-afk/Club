import { Router } from 'express';
import express from 'express';
import Stripe from 'stripe';
import { PaymentService } from '../services/paymentService';

export const webhookRouter = Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2025-01-27.acacia' as any });

// Stripe webhook — needs raw body, hence mounted before json parser in index.ts
webhookRouter.post('/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'] as string;
    try {
        const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
        await PaymentService.handleWebhookEvent(event);
        res.json({ received: true });
    } catch (err: any) {
        console.error('Webhook error:', err.message);
        res.status(400).json({ error: `Webhook Error: ${err.message}` });
    }
});
