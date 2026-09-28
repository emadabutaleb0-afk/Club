export interface MembershipPlan {
    id: string;
    clubId: string;
    name: string;
    description?: string;
    type: PlanType;
    price: number;
    currency: string;
    interval: BillingInterval;
    intervalCount: number;
    features: string[];
    isActive: boolean;
    stripePriceId?: string;
    createdAt: string;
}

export type PlanType = 'annual' | 'monthly' | 'quarterly' | 'swimming' | 'courts' | 'custom';
export type BillingInterval = 'month' | 'quarter' | 'year' | 'one_time';

export interface Subscription {
    id: string;
    memberId: string;
    planId: string;
    plan: MembershipPlan;
    status: SubscriptionStatus;
    stripeSubscriptionId?: string;
    currentPeriodStart: string;
    currentPeriodEnd: string;
    cancelAtPeriodEnd: boolean;
    createdAt: string;
}

export type SubscriptionStatus = 'active' | 'past_due' | 'cancelled' | 'trialing' | 'incomplete';

export interface Payment {
    id: string;
    clubId: string;
    memberId: string;
    amount: number;
    platformFee: number;
    netAmount: number;
    currency: string;
    status: PaymentStatus;
    type: PaymentType;
    description: string;
    stripePaymentIntentId?: string;
    invoiceId?: string;
    refundedAt?: string;
    createdAt: string;
}

export type PaymentStatus = 'succeeded' | 'pending' | 'failed' | 'refunded' | 'partially_refunded';
export type PaymentType = 'subscription' | 'one_time' | 'booking' | 'event' | 'refund';

export interface Invoice {
    id: string;
    clubId: string;
    memberId: string;
    invoiceNumber: string;
    amount: number;
    platformFee: number;
    status: InvoiceStatus;
    dueDate: string;
    paidAt?: string;
    pdfUrl?: string;
    lineItems: InvoiceLineItem[];
    createdAt: string;
}

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';

export interface InvoiceLineItem {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
}

export interface SettlementReport {
    clubId: string;
    period: { start: string; end: string };
    totalCollected: number;
    platformFees: number;
    netSettled: number;
    transactionCount: number;
    transactions: Payment[];
}

export interface CreatePlanRequest {
    name: string;
    description?: string;
    type: PlanType;
    price: number;
    currency?: string;
    interval: BillingInterval;
    intervalCount?: number;
    features?: string[];
}

export interface CreateSubscriptionRequest {
    planId: string;
    paymentMethodId: string;
}
