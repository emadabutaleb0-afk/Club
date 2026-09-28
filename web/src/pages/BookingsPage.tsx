import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Search, ChevronLeft, ChevronRight, CheckCircle, ShieldCheck } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

const facilities = [
    { id: '1', name: 'مجمع حمامات السباحة الأولمبي (المسارات 1-4)', type: 'pool', capacity: 16, price: 350 },
    { id: '2', name: 'ملعب كرة القدم القانوني A (النجيل الدولي)', type: 'field', capacity: 22, price: 1200 },
    { id: '3', name: 'ملعب كرة القدم الخماسي B (المغطى)', type: 'field', capacity: 14, price: 650 },
    { id: '4', name: 'مجمع ملاعب البادل الزجاجية (الملعب 1)', type: 'court', capacity: 4, price: 400 },
    { id: '5', name: 'صالة الجمباز وتنس الطاولة متعددة الأغراض', type: 'studio', capacity: 12, price: 250 },
    { id: '6', name: 'صالة اللياقة البدنية والـ Crossfit الحديثة', type: 'gym', capacity: 35, price: 200 },
];

const timeSlots = [
    { time: '07:00 - 08:00 ص', available: true, booked: 2, max: 8 },
    { time: '08:00 - 09:00 ص', available: true, booked: 4, max: 8 },
    { time: '09:00 - 10:00 ص', available: false, booked: 8, max: 8, waitlist: 2 },
    { time: '10:00 - 11:00 ص', available: true, booked: 3, max: 8 },
    { time: '11:00 - 12:00 م', available: true, booked: 1, max: 8 },
    { time: '04:00 - 05:00 م', available: true, booked: 5, max: 8 },
    { time: '05:00 - 06:00 م', available: true, booked: 7, max: 8 },
    { time: '06:00 - 07:00 م', available: false, booked: 8, max: 8, waitlist: 4 },
    { time: '07:00 - 08:00 م', available: true, booked: 4, max: 8 },
    { time: '08:00 - 09:00 م', available: true, booked: 6, max: 8 },
    { time: '09:00 - 10:00 م', available: true, booked: 3, max: 8 },
    { time: '10:00 - 11:00 م', available: true, booked: 2, max: 8 },
];

const myBookings = [
    { id: '1', facility: 'مجمع حمامات السباحة الأولمبي', date: '2026-02-12', time: '08:00 - 09:00 ص', status: 'مؤكد ومعتمد' },
    { id: '2', facility: 'ملعب كرة القدم القانوني A', date: '2026-02-13', time: '06:00 - 07:00 م', status: 'مؤكد ومعتمد' },
    { id: '3', facility: 'مجمع ملاعب البادل الزجاجية', date: '2026-02-14', time: '07:00 - 08:00 م', status: 'قائمة الانتظار' },
];

export default function BookingsPage() {
    const theme = useThemeStore((state) => state.theme);
    const isDark = theme === 'dark';

    const navigate = useNavigate();
    const [selectedFacility, setSelectedFacility] = useState(facilities[0]);
    const [selectedDate, setSelectedDate] = useState('2026-02-12');
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

    const handleBook = () => {
        navigate('/booking-payment', {
            state: {
                facility: selectedFacility,
                date: selectedDate,
                slot: selectedSlot,
            }
        });
    };

    return (
        <div style={{ direction: 'rtl', minHeight: '100%', paddingBottom: 40 }}>
            <div className="page-header" style={{ marginBottom: 24 }}>
                <div>
                    <h1 className="page-title" style={{ fontSize: '1.8rem', fontWeight: 800 }}>
                        حجز الملاعب والمنشآت الأولمبية
                    </h1>
                    <p className="page-subtitle" style={{ fontSize: '0.92rem' }}>
                        اختر المنشأة والموعد المناسب لتدريباتك في مركز التنمية الشبابية بالتجمع الأول
                    </p>
                </div>
            </div>

            <div className="grid-2" style={{ gridTemplateColumns: '1fr 360px', gap: 24 }}>
                {/* Left: Booking Flow */}
                <div>
                    {/* Facility Selector */}
                    <div className="card" style={{
                        marginBottom: 24,
                        background: isDark ? '#0d1117' : '#ffffff',
                        border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
                        borderRadius: 16,
                        padding: 20
                    }}>
                        <div className="card-title" style={{ marginBottom: 14, fontSize: '1rem', fontWeight: 800, color: isDark ? '#ffffff' : '#0f172a' }}>
                            1. اختر الصرح الرياضي أو المنشأة
                        </div>
                        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                            {facilities.map((f) => (
                                <button
                                    key={f.id}
                                    onClick={() => { setSelectedFacility(f); setSelectedSlot(null); }}
                                    style={{
                                        padding: '10px 14px',
                                        borderRadius: 12,
                                        fontSize: '0.86rem',
                                        fontWeight: 700,
                                        border: selectedFacility.id === f.id ? '2px solid #2563eb' : isDark ? '1px solid #30363d' : '1px solid #cbd5e1',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        background: selectedFacility.id === f.id ? (isDark ? 'rgba(37, 99, 235, 0.25)' : '#eff6ff') : isDark ? '#161b22' : '#ffffff',
                                        color: selectedFacility.id === f.id ? '#2563eb' : isDark ? '#ffffff' : '#0f172a'
                                    }}
                                >
                                    <MapPin size={15} color={selectedFacility.id === f.id ? '#2563eb' : '#94a3b8'} />
                                    <span>{f.name}</span>
                                    <span style={{ fontSize: '0.78rem', color: '#10b981', marginRight: 4 }}>({f.price} ج.م/ساعة)</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Date Picker */}
                    <div className="card" style={{
                        marginBottom: 24,
                        background: isDark ? '#0d1117' : '#ffffff',
                        border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
                        borderRadius: 16,
                        padding: 20
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                            <div className="card-title" style={{ fontSize: '1rem', fontWeight: 800, color: isDark ? '#ffffff' : '#0f172a' }}>
                                <Calendar size={18} style={{ display: 'inline', marginLeft: 8, verticalAlign: 'middle', color: '#2563eb' }} />
                                2. حدد تاريخ الحجز
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    style={{
                                        padding: '8px 14px',
                                        borderRadius: 10,
                                        fontSize: '0.88rem',
                                        background: isDark ? '#161b22' : '#f8fafc',
                                        border: isDark ? '1px solid #30363d' : '1px solid #cbd5e1',
                                        color: isDark ? '#ffffff' : '#0f172a',
                                        outline: 'none',
                                        direction: 'ltr'
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Time Slots */}
                    <div className="card" style={{
                        background: isDark ? '#0d1117' : '#ffffff',
                        border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
                        borderRadius: 16,
                        padding: 20
                    }}>
                        <div className="card-title" style={{ marginBottom: 4, fontSize: '1rem', fontWeight: 800, color: isDark ? '#ffffff' : '#0f172a' }}>
                            <Clock size={18} style={{ display: 'inline', marginLeft: 8, verticalAlign: 'middle', color: '#2563eb' }} />
                            3. الفترات الزمنية المتاحة — {selectedFacility.name}
                        </div>
                        <div className="card-subtitle" style={{ marginBottom: 18, fontSize: '0.82rem', color: isDark ? '#94a3b8' : '#64748b' }}>
                            سعة الحصة: حتى {selectedFacility.capacity} متدرب • سعر الساعة: {selectedFacility.price} ج.م
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 10 }}>
                            {timeSlots.map((slot) => {
                                const isSelected = selectedSlot === slot.time;
                                return (
                                    <div
                                        key={slot.time}
                                        onClick={() => slot.available && setSelectedSlot(slot.time)}
                                        style={{
                                            padding: 12,
                                            borderRadius: 12,
                                            textAlign: 'center',
                                            cursor: slot.available ? 'pointer' : 'not-allowed',
                                            opacity: slot.available ? 1 : 0.45,
                                            transition: 'all 0.2s',
                                            background: isSelected
                                                ? '#2563eb'
                                                : isDark ? '#161b22' : '#f8fafc',
                                            border: isSelected
                                                ? '2px solid #2563eb'
                                                : isDark ? '1px solid #30363d' : '1px solid #e2e8f0',
                                            color: isSelected ? '#ffffff' : isDark ? '#ffffff' : '#0f172a'
                                        }}
                                    >
                                        <div style={{ fontWeight: 800, fontSize: '0.86rem' }}>{slot.time}</div>
                                        <div style={{ fontSize: '0.72rem', marginTop: 4, color: isSelected ? '#dbeafe' : slot.available ? '#10b981' : '#ef4444' }}>
                                            {slot.available ? `متاح (${slot.max - slot.booked} أماكن)` : 'مكتمل بالكامل'}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {selectedSlot && (
                            <div style={{
                                marginTop: 24,
                                padding: 16,
                                borderRadius: 12,
                                background: isDark ? 'rgba(37, 99, 235, 0.15)' : '#eff6ff',
                                border: '1px solid rgba(37, 99, 235, 0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexWrap: 'wrap',
                                gap: 12
                            }}>
                                <div>
                                    <div style={{ fontWeight: 800, fontSize: '0.94rem', color: isDark ? '#ffffff' : '#0f172a' }}>
                                        {selectedFacility.name}
                                    </div>
                                    <div style={{ fontSize: '0.82rem', color: isDark ? '#94a3b8' : '#475569', marginTop: 2 }}>
                                        الموعد: {selectedDate} | الفترة: {selectedSlot} | الإجمالي: {selectedFacility.price} ج.م
                                    </div>
                                </div>
                                <button
                                    className="btn btn-primary"
                                    onClick={handleBook}
                                    style={{
                                        fontWeight: 700,
                                        background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                                        boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)'
                                    }}
                                >
                                    الانتقال لتأكيد الحجز والدفع
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: My Bookings */}
                <div>
                    <div className="card" style={{
                        background: isDark ? '#0d1117' : '#ffffff',
                        border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
                        borderRadius: 16,
                        padding: 20
                    }}>
                        <div className="card-title" style={{ marginBottom: 16, fontSize: '1rem', fontWeight: 800, color: isDark ? '#ffffff' : '#0f172a' }}>
                            حجوزاتي القادمة بالمركز
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {myBookings.map((b) => (
                                <div
                                    key={b.id}
                                    style={{
                                        padding: 14,
                                        borderRadius: 12,
                                        background: isDark ? '#161b22' : '#f8fafc',
                                        border: isDark ? '1px solid #30363d' : '1px solid #e2e8f0',
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                        <span style={{ fontWeight: 700, fontSize: '0.88rem', color: isDark ? '#ffffff' : '#0f172a' }}>{b.facility}</span>
                                        <span style={{
                                            fontSize: '0.72rem',
                                            padding: '2px 8px',
                                            borderRadius: 6,
                                            fontWeight: 700,
                                            background: b.status.includes('مؤكد') ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                                            color: b.status.includes('مؤكد') ? '#10b981' : '#f59e0b'
                                        }}>
                                            {b.status}
                                        </span>
                                    </div>
                                    <div style={{ fontSize: '0.78rem', color: isDark ? '#94a3b8' : '#64748b', display: 'flex', gap: 14 }}>
                                        <span><Calendar size={13} style={{ verticalAlign: 'middle', marginLeft: 4 }} />{b.date}</span>
                                        <span><Clock size={13} style={{ verticalAlign: 'middle', marginLeft: 4 }} />{b.time}</span>
                                    </div>
                                    <button className="btn btn-secondary btn-sm" style={{
                                        marginTop: 10,
                                        fontSize: '0.74rem',
                                        padding: '4px 10px',
                                        color: '#ef4444',
                                        border: '1px solid rgba(239, 68, 68, 0.3)'
                                    }}>
                                        إلغاء الحجز
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
