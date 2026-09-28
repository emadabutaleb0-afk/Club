import prisma from '../lib/prisma';
import { AppError } from '../middleware/errorHandler';

export class BookingService {
    // ─── Get Availability ───────────────────────────
    static async getAvailability(facilityId: string, date: string) {
        const facility = await prisma.facility.findUnique({
            where: { id: facilityId },
            include: { slots: true },
        });
        if (!facility) throw new AppError('Facility not found', 404);

        const dayOfWeek = new Date(date).getDay();
        const daySlots = facility.slots.filter((s) => s.dayOfWeek === dayOfWeek && !s.isBlocked);

        // Count existing bookings per slot
        const bookings = await prisma.booking.findMany({
            where: {
                facilityId,
                date: new Date(date),
                status: { in: ['confirmed', 'waitlisted'] },
            },
        });

        const slots = daySlots.map((slot) => {
            const slotBookings = bookings.filter(
                (b) => b.startTime === slot.startTime && b.endTime === slot.endTime
            );
            const confirmedCount = slotBookings.filter((b) => b.status === 'confirmed').length;
            const waitlistCount = slotBookings.filter((b) => b.status === 'waitlisted').length;

            return {
                startTime: slot.startTime,
                endTime: slot.endTime,
                currentBookings: confirmedCount,
                maxBookings: slot.maxBookings,
                isAvailable: confirmedCount < slot.maxBookings,
                waitlistCount,
            };
        });

        return { facilityId, date, slots };
    }

    // ─── Create Booking ─────────────────────────────
    static async createBooking(userId: string, data: {
        facilityId: string; date: string; startTime: string; endTime: string; notes?: string;
    }) {
        const facility = await prisma.facility.findUnique({
            where: { id: data.facilityId },
            include: { slots: true },
        });
        if (!facility || !facility.isActive) throw new AppError('Facility not found or inactive', 404);

        // Check slot exists
        const dayOfWeek = new Date(data.date).getDay();
        const slot = facility.slots.find(
            (s) => s.dayOfWeek === dayOfWeek && s.startTime === data.startTime && s.endTime === data.endTime
        );
        if (!slot) throw new AppError('Invalid time slot', 400);
        if (slot.isBlocked) throw new AppError('This slot is currently blocked', 400);

        // Check availability
        const existingBookings = await prisma.booking.count({
            where: {
                facilityId: data.facilityId,
                date: new Date(data.date),
                startTime: data.startTime,
                endTime: data.endTime,
                status: 'confirmed',
            },
        });

        const isAvailable = existingBookings < slot.maxBookings;
        const club = await prisma.club.findUnique({ where: { id: facility.clubId } });

        // Check member's booking limit
        const memberBookingCount = await prisma.booking.count({
            where: {
                userId,
                status: 'confirmed',
                date: { gte: new Date() },
            },
        });
        if (club && memberBookingCount >= club.maxBookingsPerMember) {
            throw new AppError(`Maximum ${club.maxBookingsPerMember} active bookings allowed`, 400);
        }

        let status = 'confirmed';
        let waitlistPosition: number | undefined;

        if (!isAvailable) {
            if (!club?.allowWaitlists) {
                throw new AppError('No availability and waitlists are disabled', 400);
            }
            status = 'waitlisted';
            const waitlistCount = await prisma.booking.count({
                where: {
                    facilityId: data.facilityId,
                    date: new Date(data.date),
                    startTime: data.startTime,
                    status: 'waitlisted',
                },
            });
            waitlistPosition = waitlistCount + 1;
        }

        const booking = await prisma.booking.create({
            data: {
                userId,
                facilityId: data.facilityId,
                date: new Date(data.date),
                startTime: data.startTime,
                endTime: data.endTime,
                status,
                waitlistPosition,
                notes: data.notes,
            },
            include: { facility: { select: { name: true, type: true } } },
        });

        return booking;
    }

    // ─── Cancel Booking ─────────────────────────────
    static async cancelBooking(bookingId: string, userId: string) {
        const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
        if (!booking) throw new AppError('Booking not found', 404);
        if (booking.userId !== userId) throw new AppError('Not your booking', 403);
        if (booking.status === 'cancelled') throw new AppError('Already cancelled', 400);

        await prisma.booking.update({
            where: { id: bookingId },
            data: { status: 'cancelled' },
        });

        // Promote first waitlisted booking
        if (booking.status === 'confirmed') {
            const nextWaitlisted = await prisma.booking.findFirst({
                where: {
                    facilityId: booking.facilityId,
                    date: booking.date,
                    startTime: booking.startTime,
                    status: 'waitlisted',
                },
                orderBy: { waitlistPosition: 'asc' },
            });

            if (nextWaitlisted) {
                await prisma.booking.update({
                    where: { id: nextWaitlisted.id },
                    data: { status: 'confirmed', waitlistPosition: null },
                });

                // Create notification for promoted member
                await prisma.notification.create({
                    data: {
                        userId: nextWaitlisted.userId,
                        type: 'waitlist_promoted',
                        title: 'Booking Confirmed!',
                        body: `Your waitlisted booking has been confirmed.`,
                        data: { bookingId: nextWaitlisted.id },
                    },
                });
            }
        }

        return { success: true };
    }

    // ─── List User Bookings ─────────────────────────
    static async getUserBookings(userId: string, query: { page?: number; limit?: number; status?: string }) {
        const page = query.page || 1;
        const limit = query.limit || 20;
        const skip = (page - 1) * limit;

        const where: any = { userId };
        if (query.status) where.status = query.status;

        const [bookings, total] = await Promise.all([
            prisma.booking.findMany({
                where,
                skip,
                take: limit,
                orderBy: { date: 'asc' },
                include: { facility: { select: { name: true, type: true } } },
            }),
            prisma.booking.count({ where }),
        ]);

        return { data: bookings, total, page, limit, totalPages: Math.ceil(total / limit) };
    }
}
