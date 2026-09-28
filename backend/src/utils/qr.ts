import QRCode from 'qrcode';
import jwt from 'jsonwebtoken';

const QR_SECRET = process.env.JWT_ACCESS_SECRET || 'dev-qr-secret';

export async function generateMemberQR(userId: string, clubId: string, membershipNumber: string): Promise<string> {
    // Sign a short-lived token for check-in
    const token = jwt.sign(
        { userId, clubId, membershipNumber, purpose: 'checkin' },
        QR_SECRET,
        { expiresIn: '24h' }
    );

    // Generate QR code as data URL (PNG base64)
    const qrDataUrl = await QRCode.toDataURL(token, {
        width: 300,
        margin: 2,
        color: { dark: '#1a1a2e', light: '#ffffff' },
    });

    return qrDataUrl;
}

export function verifyCheckinQR(token: string): { userId: string; clubId: string; membershipNumber: string } {
    const payload = jwt.verify(token, QR_SECRET) as any;
    if (payload.purpose !== 'checkin') {
        throw new Error('Invalid QR code');
    }
    return { userId: payload.userId, clubId: payload.clubId, membershipNumber: payload.membershipNumber };
}
