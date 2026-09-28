import { z } from 'zod';

export const createBookingSchema = z.object({
    facilityId: z.string().uuid(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
    startTime: z.string().regex(/^\d{2}:\d{2}$/, 'Time must be HH:mm'),
    endTime: z.string().regex(/^\d{2}:\d{2}$/, 'Time must be HH:mm'),
    notes: z.string().max(500).optional(),
});

export const bookingListQuerySchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
    facilityId: z.string().uuid().optional(),
    date: z.string().optional(),
    dateFrom: z.string().optional(),
    dateTo: z.string().optional(),
    status: z.enum(['confirmed', 'waitlisted', 'cancelled', 'completed', 'no_show']).optional(),
});

export const createFacilitySchema = z.object({
    name: z.string().min(1).max(200),
    type: z.enum(['court', 'lane', 'room', 'field', 'pool', 'gym', 'studio', 'other']),
    description: z.string().max(1000).optional(),
    capacity: z.number().int().min(1),
    amenities: z.array(z.string()).optional(),
});

export const createSlotSchema = z.object({
    dayOfWeek: z.number().int().min(0).max(6),
    startTime: z.string().regex(/^\d{2}:\d{2}$/),
    endTime: z.string().regex(/^\d{2}:\d{2}$/),
    maxBookings: z.number().int().min(1).default(1),
});
