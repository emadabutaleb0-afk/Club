import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { errorHandler } from './middleware/errorHandler';
import { authRouter } from './routes/auth';
import { memberRouter } from './routes/members';
import { paymentRouter } from './routes/payments';
import { bookingRouter } from './routes/bookings';
import { facilityRouter } from './routes/facilities';
import { adminRouter } from './routes/admin';
import { webhookRouter } from './routes/webhooks';

const app = express();
const PORT = process.env.PORT || 4000;

// ─── Global Middleware ────────────────────────────────
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173', credentials: true }));
app.use(morgan('dev'));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));

// Stripe webhooks need raw body — mount BEFORE json parser
app.use('/api/webhooks', webhookRouter);

// JSON body parser for all other routes
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── API Routes ───────────────────────────────────────
app.use('/api/auth', authRouter);
app.use('/api/members', memberRouter);
app.use('/api/payments', paymentRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/facilities', facilityRouter);
app.use('/api/admin', adminRouter);

// ─── Health Check ─────────────────────────────────────
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── Error Handler ────────────────────────────────────
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────
app.listen(PORT, () => {
    console.log(`🚀 ClubHub API running on http://localhost:${PORT}`);
});

export default app;
