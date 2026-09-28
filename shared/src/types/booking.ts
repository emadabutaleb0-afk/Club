export interface Booking {
    id: string;
    memberId: string;
    facilityId: string;
    facility: { name: string; type: string };
    date: string;           // YYYY-MM-DD
    startTime: string;      // HH:mm
    endTime: string;        // HH:mm
    status: BookingStatus;
    waitlistPosition?: number;
    notes?: string;
    createdAt: string;
}

export type BookingStatus = 'confirmed' | 'waitlisted' | 'cancelled' | 'completed' | 'no_show';

export interface CreateBookingRequest {
    facilityId: string;
    date: string;
    startTime: string;
    endTime: string;
    notes?: string;
}

export interface BookingAvailability {
    facilityId: string;
    date: string;
    slots: AvailableSlot[];
}

export interface AvailableSlot {
    startTime: string;
    endTime: string;
    currentBookings: number;
    maxBookings: number;
    isAvailable: boolean;
    waitlistCount: number;
}

export interface BookingListQuery {
    page?: number;
    limit?: number;
    facilityId?: string;
    date?: string;
    dateFrom?: string;
    dateTo?: string;
    status?: BookingStatus;
}
