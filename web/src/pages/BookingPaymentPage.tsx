import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, Calendar, Clock, MapPin, CheckCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

export default function BookingPaymentPage() {
    const theme = useThemeStore((state) => state.theme);
    const isDark = theme === 'dark';

    const navigate = useNavigate();
    const location = useLocation();
    const bookingDetails = location.state as {
        facility: { id: string; name: string; price: number };
        date: string;
        slot: string;
    } | null;

    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [cardholderName, setCardholderName] = useState('م. أحمد مصطفى الشناوي');

    // Redirect if no booking details (e.g., direct access)
    if (!bookingDetails) {
        return (
            <div style={{ padding: 60, textAlign: 'center', direction: 'rtl' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: isDark ? '#ffffff' : '#0f172a' }}>لم يتم العثور على بيانات حجز نشطة.</h2>
                <button className="btn btn-primary" onClick={() => navigate('/bookings')} style={{ marginTop: 20 }}>
                    العودة لصفحة حجز المنشآت
                </button>
            </div>
        );
    }

    const { facility, date, slot } = bookingDetails;
    const platformFee = Math.round(facility.price * 0.02); // 2% platform fee
    const total = facility.price + platformFee;

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate API call
        setTimeout(() => {
            setIsProcessing(false);
            setPaymentSuccess(true);
        }, 1500);
    };

    if (paymentSuccess) {
        return (
            <div style={{
                maxWidth: 520,
                margin: '60px auto',
                textAlign: 'center',
                padding: 40,
                background: isDark ? '#0d1117' : '#ffffff',
                borderRadius: 20,
                border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
                boxShadow: isDark ? '0 10px 40px rgba(0,0,0,0.5)' : '0 10px 30px rgba(0,0,0,0.06)',
                direction: 'rtl'
            }}>
                <div style={{
                    width: 80, height: 80, background: 'rgba(16, 185, 129, 0.15)',
                    borderRadius: '50%', color: '#10b981', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px'
                }}>
                    <CheckCircle size={44} />
                </div>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 12, color: isDark ? '#ffffff' : '#0f172a' }}>
                    تم تأكيد الحجز وسداد الرسوم بنجاح!
                </h2>
                <p style={{ color: isDark ? '#94a3b8' : '#64748b', marginBottom: 28, fontSize: '0.92rem', lineHeight: 1.6 }}>
                    تم اعتماد حجزك في <strong>{facility.name}</strong> بمركز التنمية الشبابية بالتجمع الأول، وتم إرسال إيصال السداد الإلكتروني وتأكيد الحجز إلى هاتفك وبريدك المسجل.
                </p>
                <div style={{ background: isDark ? '#161b22' : '#f8fafc', padding: 20, borderRadius: 12, marginBottom: 28, border: isDark ? '1px solid #30363d' : '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: '0.88rem' }}>
                        <span style={{ color: isDark ? '#94a3b8' : '#64748b' }}>رقم المعاملة البنكية</span>
                        <span style={{ fontWeight: 700, fontFamily: 'monospace' }}>#EG-TRX-{Math.floor(100000 + Math.random() * 900000)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: '0.88rem' }}>
                        <span style={{ color: isDark ? '#94a3b8' : '#64748b' }}>اسم العضو</span>
                        <span style={{ fontWeight: 700 }}>{cardholderName}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                        <span style={{ color: isDark ? '#94a3b8' : '#64748b' }}>إجمالي المبلغ المدفوع</span>
                        <span style={{ fontWeight: 800, color: '#10b981' }}>{total} ج.م</span>
                    </div>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate('/bookings')}
                    style={{
                        width: '100%',
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #2563eb, #1d4ed8)'
                    }}
                >
                    العودة لجدول الحجوزات
                </button>
            </div>
        );
    }

    return (
        <div style={{ direction: 'rtl', minHeight: '100%', paddingBottom: 40 }}>
            <div className="page-header" style={{ marginBottom: 24 }}>
                <div>
                    <button
                        onClick={() => navigate(-1)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: isDark ? '#94a3b8' : '#64748b',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            marginBottom: 12,
                            fontSize: '0.88rem',
                            fontWeight: 600
                        }}
                    >
                        <ArrowRight size={16} /> العودة لاختيار الموعد
                    </button>
                    <h1 className="page-title" style={{ fontSize: '1.8rem', fontWeight: 800 }}>
                        تأكيد الحجز وبوابة السداد الإلكتروني
                    </h1>
                    <p className="page-subtitle" style={{ fontSize: '0.92rem' }}>
                        بوابة السداد الإلكترونية المعتمدة لمركز التنمية الشبابية بالتجمع الأول (الجنيه المصري)
                    </p>
                </div>
            </div>

            <div className="grid-2" style={{ gridTemplateColumns: '1fr 380px', gap: 24 }}>
                {/* Payment Form */}
                <div className="card" style={{
                    background: isDark ? '#0d1117' : '#ffffff',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
                    borderRadius: 16,
                    padding: 24
                }}>
                    <div className="card-title" style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10, fontSize: '1.05rem', fontWeight: 800, color: isDark ? '#ffffff' : '#0f172a' }}>
                        <CreditCard size={20} color="#2563eb" /> بيانات بطاقة الدفع (فيزا / ميزة / ماستركارد)
                    </div>

                    <form onSubmit={handlePayment}>
                        <div className="form-group" style={{ marginBottom: 16 }}>
                            <label className="form-label" style={{ display: 'block', marginBottom: 6, fontSize: '0.85rem', fontWeight: 600, color: isDark ? '#cbd5e1' : '#334155' }}>
                                اسم حامل البطاقة (رباعي)
                            </label>
                            <input
                                type="text"
                                className="form-input"
                                value={cardholderName}
                                onChange={(e) => setCardholderName(e.target.value)}
                                placeholder="م. أحمد مصطفى الشناوي"
                                required
                                style={{
                                    width: '100%',
                                    padding: '10px 14px',
                                    borderRadius: 10,
                                    fontSize: '0.9rem',
                                    background: isDark ? '#161b22' : '#f8fafc',
                                    border: isDark ? '1px solid #30363d' : '1px solid #cbd5e1',
                                    color: isDark ? '#ffffff' : '#0f172a'
                                }}
                            />
                        </div>

                        <div className="form-group" style={{ marginBottom: 16 }}>
                            <label className="form-label" style={{ display: 'block', marginBottom: 6, fontSize: '0.85rem', fontWeight: 600, color: isDark ? '#cbd5e1' : '#334155' }}>
                                رقم البطاقة البنكية
                            </label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="5078 •••• •••• 9924"
                                    maxLength={19}
                                    defaultValue="5078 4920 1849 9924"
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '10px 14px',
                                        borderRadius: 10,
                                        fontSize: '0.9rem',
                                        background: isDark ? '#161b22' : '#f8fafc',
                                        border: isDark ? '1px solid #30363d' : '1px solid #cbd5e1',
                                        color: isDark ? '#ffffff' : '#0f172a',
                                        direction: 'ltr',
                                        textAlign: 'right'
                                    }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                            <div className="form-group">
                                <label className="form-label" style={{ display: 'block', marginBottom: 6, fontSize: '0.85rem', fontWeight: 600, color: isDark ? '#cbd5e1' : '#334155' }}>
                                    تاريخ الانتهاء
                                </label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="MM/YY"
                                    maxLength={5}
                                    defaultValue="08/28"
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '10px 14px',
                                        borderRadius: 10,
                                        fontSize: '0.9rem',
                                        background: isDark ? '#161b22' : '#f8fafc',
                                        border: isDark ? '1px solid #30363d' : '1px solid #cbd5e1',
                                        color: isDark ? '#ffffff' : '#0f172a',
                                        direction: 'ltr',
                                        textAlign: 'center'
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label" style={{ display: 'block', marginBottom: 6, fontSize: '0.85rem', fontWeight: 600, color: isDark ? '#cbd5e1' : '#334155' }}>
                                    رمز التحقق (CVV)
                                </label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="•••"
                                    maxLength={3}
                                    defaultValue="491"
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '10px 14px',
                                        borderRadius: 10,
                                        fontSize: '0.9rem',
                                        background: isDark ? '#161b22' : '#f8fafc',
                                        border: isDark ? '1px solid #30363d' : '1px solid #cbd5e1',
                                        color: isDark ? '#ffffff' : '#0f172a',
                                        direction: 'ltr',
                                        textAlign: 'center'
                                    }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, color: isDark ? '#94a3b8' : '#64748b', fontSize: '0.82rem' }}>
                            <ShieldCheck size={16} color="#10b981" />
                            <span>بوابة دفع مؤمنة ومشفرة بالكامل طبقاً لمعايير البنك المركزي المصري.</span>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                            style={{
                                width: '100%',
                                marginTop: 28,
                                fontWeight: 800,
                                fontSize: '1rem',
                                background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                                boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)'
                            }}
                            disabled={isProcessing}
                        >
                            {isProcessing ? 'جاري معالجة الدفع...' : `سداد المبلغ الآن (${total} ج.م)`}
                        </button>
                    </form>
                </div>

                {/* Booking Summary */}
                <div className="card" style={{
                    height: 'fit-content',
                    background: isDark ? '#0d1117' : '#ffffff',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
                    borderRadius: 16,
                    padding: 24
                }}>
                    <div className="card-title" style={{ marginBottom: 18, fontSize: '1.05rem', fontWeight: 800, color: isDark ? '#ffffff' : '#0f172a' }}>
                        ملخص الحجز الرياضي
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                            <div style={{
                                width: 40, height: 40, borderRadius: 10, background: isDark ? '#161b22' : '#f1f5f9',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', flexShrink: 0
                            }}>
                                <MapPin size={20} />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: isDark ? '#ffffff' : '#0f172a' }}>{facility.name}</div>
                                <div style={{ fontSize: '0.78rem', color: isDark ? '#94a3b8' : '#64748b' }}>حجز منشأة أولمبية رسمية</div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                            <div style={{
                                width: 40, height: 40, borderRadius: 10, background: isDark ? '#161b22' : '#f1f5f9',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', flexShrink: 0
                            }}>
                                <Calendar size={20} />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: isDark ? '#ffffff' : '#0f172a' }}>{date}</div>
                                <div style={{ fontSize: '0.78rem', color: isDark ? '#94a3b8' : '#64748b' }}>تاريخ الحجز</div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                            <div style={{
                                width: 40, height: 40, borderRadius: 10, background: isDark ? '#161b22' : '#f1f5f9',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', flexShrink: 0
                            }}>
                                <Clock size={20} />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: isDark ? '#ffffff' : '#0f172a' }}>{slot}</div>
                                <div style={{ fontSize: '0.78rem', color: isDark ? '#94a3b8' : '#64748b' }}>الفترة الزمنية المحددة</div>
                            </div>
                        </div>
                    </div>

                    <div style={{ borderTop: isDark ? '1px solid #21262d' : '1px solid #e2e8f0', paddingTop: 18 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: '0.88rem' }}>
                            <span style={{ color: isDark ? '#94a3b8' : '#64748b' }}>رسوم المنشأة</span>
                            <span style={{ fontWeight: 700, color: isDark ? '#ffffff' : '#0f172a' }}>{facility.price} ج.م</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: '0.88rem' }}>
                            <span style={{ color: isDark ? '#94a3b8' : '#64748b' }}>رسوم الصيانة والتشغيل (2%)</span>
                            <span style={{ fontWeight: 700, color: isDark ? '#ffffff' : '#0f172a' }}>{platformFee} ج.م</span>
                        </div>
                        <div style={{
                            display: 'flex', justifyContent: 'space-between', marginTop: 14, paddingTop: 14,
                            borderTop: isDark ? '1px dashed #30363d' : '1px dashed #cbd5e1', fontSize: '1.05rem', fontWeight: 800
                        }}>
                            <span style={{ color: isDark ? '#ffffff' : '#0f172a' }}>الإجمالي المستحق</span>
                            <span style={{ color: '#10b981' }}>{total} ج.م</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
