import { Router } from 'express';
import { AuthService } from '../services/authService';
import { validate } from '../middleware/validate';
import { loginSchema, registerSchema, refreshSchema } from '@clubhub/shared';

export const authRouter = Router();

authRouter.post('/register', validate(registerSchema), async (req, res, next) => {
    try {
        const result = await AuthService.register(req.body);
        res.status(201).json({ success: true, data: result });
    } catch (error) { next(error); }
});

authRouter.post('/login', validate(loginSchema), async (req, res, next) => {
    try {
        const result = await AuthService.login(req.body.email, req.body.password);
        res.json({ success: true, data: result });
    } catch (error) { next(error); }
});

authRouter.post('/refresh', validate(refreshSchema), async (req, res, next) => {
    try {
        const result = await AuthService.refresh(req.body.refreshToken);
        res.json({ success: true, data: result });
    } catch (error) { next(error); }
});

authRouter.post('/logout', async (req, res, next) => {
    try {
        await AuthService.logout(req.body.refreshToken);
        res.json({ success: true, message: 'Logged out' });
    } catch (error) { next(error); }
});
