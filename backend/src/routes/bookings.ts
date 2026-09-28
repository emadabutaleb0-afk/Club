import { Router } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { createBookingSchema, bookingListQuerySchema } from '@clubhub/shared';
import { BookingService } from '../services/bookingService';

export const bookingRouter = Router();

// Get availability for a facility
bookingRouter.get('/availability/:facilityId', authenticate, async (req: AuthRequest, res, next) => {
    try {
        const date = req.query.date as string || new Date().toISOString().split('T')[0];
        const availability = await BookingService.getAvailability(req.params.facilityId, date);
        res.json({ success: true, data: availability });
    } catch (error) { next(error); }
});

// Create booking
bookingRouter.post('/', authenticate, validate(createBookingSchema), async (req: AuthRequest, res, next) => {
    try {
        const booking = await BookingService.createBooking(req.userId!, req.body);
        res.status(201).json({ success: true, data: booking });
    } catch (error) { next(error); }
});

// Get user bookings
bookingRouter.get('/my', authenticate, validate(bookingListQuerySchema, 'query'), async (req: AuthRequest, res, next) => {
    try {
        const result = await BookingService.getUserBookings(req.userId!, req.query as any);
        res.json({ success: true, data: result });
    } catch (error) { next(error); }
});

// Cancel booking
bookingRouter.delete('/:id', authenticate, async (req: AuthRequest, res, next) => {
    try {
        const result = await BookingService.cancelBooking(req.params.id, req.userId!);
        res.json({ success: true, data: result });
    } catch (error) { next(error); }
});
