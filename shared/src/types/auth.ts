export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}

export interface AuthUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    roles: ClubRole[];
}

export interface ClubRole {
    clubId: string;
    clubName: string;
    role: Role;
}

export type Role = 'member' | 'coach' | 'reception' | 'finance' | 'admin' | 'super_admin';

export interface RefreshRequest {
    refreshToken: string;
}
