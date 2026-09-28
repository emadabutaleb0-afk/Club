export interface Member {
    id: string;
    userId: string;
    clubId: string;
    role: string;
    status: MembershipStatus;
    membershipNumber: string;
    joinedAt: string;
    expiresAt?: string;
    profile: MemberProfile;
}

export type MembershipStatus = 'active' | 'expired' | 'suspended' | 'pending' | 'cancelled';

export interface MemberProfile {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    dateOfBirth?: string;
    gender?: string;
    address?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    avatar?: string;
    medicalNotes?: string;
    allergies?: string;
    bloodType?: string;
    emergencyContacts: EmergencyContact[];
    waiverSigned: boolean;
    waiverSignedAt?: string;
}

export interface EmergencyContact {
    name: string;
    relationship: string;
    phone: string;
    email?: string;
}

export interface UpdateProfileRequest {
    firstName?: string;
    lastName?: string;
    phone?: string;
    dateOfBirth?: string;
    gender?: string;
    address?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    medicalNotes?: string;
    allergies?: string;
    bloodType?: string;
    emergencyContacts?: EmergencyContact[];
}

export interface MemberListQuery {
    page?: number;
    limit?: number;
    search?: string;
    status?: MembershipStatus;
    role?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
