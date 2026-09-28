export interface Facility {
    id: string;
    clubId: string;
    name: string;
    type: FacilityType;
    description?: string;
    capacity: number;
    amenities: string[];
    imageUrl?: string;
    isActive: boolean;
    createdAt: string;
}

export type FacilityType = 'court' | 'lane' | 'room' | 'field' | 'pool' | 'gym' | 'studio' | 'other';

export interface CreateFacilityRequest {
    name: string;
    type: FacilityType;
    description?: string;
    capacity: number;
    amenities?: string[];
}

export interface FacilitySlot {
    id: string;
    facilityId: string;
    dayOfWeek: number; // 0=Sunday, 6=Saturday
    startTime: string; // HH:mm
    endTime: string;   // HH:mm
    isBlocked: boolean;
    blockReason?: string;
    maxBookings: number;
}

export interface CreateSlotRequest {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    maxBookings?: number;
}
