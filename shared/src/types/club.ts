export interface Club {
    id: string;
    name: string;
    slug: string;
    logo?: string;
    description?: string;
    address?: string;
    phone?: string;
    email?: string;
    website?: string;
    stripeAccountId?: string;
    stripeOnboardingComplete: boolean;
    settings: ClubSettings;
    createdAt: string;
    updatedAt: string;
}

export interface ClubSettings {
    timezone: string;
    currency: string;
    bookingLeadTimeMins: number;
    cancellationPolicyHours: number;
    allowWaitlists: boolean;
    maxBookingsPerMember: number;
}

export interface CreateClubRequest {
    name: string;
    slug: string;
    description?: string;
    address?: string;
    phone?: string;
    email?: string;
    website?: string;
    settings?: Partial<ClubSettings>;
}
