import { z } from 'zod';

export const createPlanSchema = z.object({
    name: z.string().min(1).max(200),
    description: z.string().max(1000).optional(),
    type: z.enum(['annual', 'monthly', 'quarterly', 'swimming', 'courts', 'custom']),
    price: z.number().positive('Price must be positive'),
    currency: z.string().length(3).default('USD'),
    interval: z.enum(['month', 'quarter', 'year', 'one_time']),
    intervalCount: z.number().int().min(1).default(1),
    features: z.array(z.string()).optional(),
});

export const createSubscriptionSchema = z.object({
    planId: z.string().uuid(),
    paymentMethodId: z.string().min(1),
});
