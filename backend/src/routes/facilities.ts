import { Router } from 'express';
import { authenticate, requireRole, ClubAuthRequest } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { createFacilitySchema, createSlotSchema } from '@clubhub/shared';
import prisma from '../lib/prisma';

export const facilityRouter = Router();

// List facilities for a club
facilityRouter.get('/:clubId', authenticate, async (req, res, next) => {
    try {
        const facilities = await prisma.facility.findMany({
            where: { clubId: req.params.clubId, isActive: true },
            include: { slots: true },
            orderBy: { name: 'asc' },
        });
        res.json({ success: true, data: facilities });
    } catch (error) { next(error); }
});

// Create facility (admin)
facilityRouter.post('/:clubId', authenticate, requireRole('admin', 'super_admin'), validate(createFacilitySchema), async (req: ClubAuthRequest, res, next) => {
    try {
        const facility = await prisma.facility.create({
            data: { clubId: req.params.clubId, ...req.body },
        });
        res.status(201).json({ success: true, data: facility });
    } catch (error) { next(error); }
});

// Update facility (admin)
facilityRouter.put('/:clubId/:facilityId', authenticate, requireRole('admin', 'super_admin'), async (req: ClubAuthRequest, res, next) => {
    try {
        const facility = await prisma.facility.update({
            where: { id: req.params.facilityId },
            data: req.body,
        });
        res.json({ success: true, data: facility });
    } catch (error) { next(error); }
});

// Add slot to facility (admin)
facilityRouter.post('/:clubId/:facilityId/slots', authenticate, requireRole('admin', 'super_admin'), validate(createSlotSchema), async (req: ClubAuthRequest, res, next) => {
    try {
        const slot = await prisma.facilitySlot.create({
            data: { facilityId: req.params.facilityId, ...req.body },
        });
        res.status(201).json({ success: true, data: slot });
    } catch (error) { next(error); }
});

// Block/unblock slot (admin)
facilityRouter.patch('/:clubId/slots/:slotId/block', authenticate, requireRole('admin', 'super_admin'), async (req: ClubAuthRequest, res, next) => {
    try {
        const slot = await prisma.facilitySlot.update({
            where: { id: req.params.slotId },
            data: { isBlocked: req.body.isBlocked, blockReason: req.body.reason },
        });
        res.json({ success: true, data: slot });
    } catch (error) { next(error); }
});
