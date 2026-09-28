import { User, Mail, Phone, QrCode, ShieldCheck } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

export default function ProfilePage() {
    const theme = useThemeStore((state) => state.theme);
    const isDark = theme === 'dark';

    const user = {
        firstName: 'م. أحمد',
        lastName: 'مصطفى الشناوي',
        email: 'a.elshinawy@orascom.com',
        phone: '+20 109 443 2187',
        membershipNumber: 'CLB-2024-00142',
        plan: 'عضوية عائلية أولمبية ممتدة (VIP)',
        status: 'نشطة ومفعلة',
        club: 'مركز التنمية الشبابية بالتجمع الأول',
        joinedAt: '20 سبتمبر 2024',
        expiresAt: '20 سبتمبر 2026',
        medicalNotes: 'لائق طبياً لكافة الأنشطة والسباحة الأولمبية',
        bloodType: '+O',
        nationalId: '28704150102934',
        address: 'حي البنفسج 4 - التجمع الأول - القاهرة الجديدة',
        emergencyContact: { name: 'د. نورهان مصطفى الشناوي', phone: '+20 100 876 5432', relationship: 'الأخت / جهة اتصال الطوارئ' },
    };

    const InfoField = ({ label, value }: { label: string; value: string }) => (
        <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ fontSize: '0.82rem', fontWeight: 600, color: isDark ? '#94a3b8' : '#64748b', marginBottom: 4, display: 'block' }}>
                {label}
            </label>
            <div style={{
                padding: '10px 14px',
                background: isDark ? '#161b22' : '#f8fafc',
                borderRadius: 10,
                border: isDark ? '1px solid #30363d' : '1px solid #e2e8f0',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: isDark ? '#ffffff' : '#0f172a'
            }}>
                {value}
            </div>
        </div>
    );

    return (
        <div style={{ direction: 'rtl', minHeight: '100%', paddingBottom: 40 }}>
            <div className="page-header" style={{ marginBottom: 24 }}>
                <div>
                    <h1 className="page-title" style={{ fontSize: '1.8rem', fontWeight: 800 }}>
                        الملف التعريفي للعضو
                    </h1>
                    <p className="page-subtitle" style={{ fontSize: '0.92rem' }}>
                        إدارة البيانات الشخصية وبطاقة العضوية الإلكترونية المعتمدة
                    </p>
                </div>
                <button className="btn btn-primary" style={{
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)'
                }}>
                    تعديل البيانات
                </button>
            </div>

            <div className="grid-2" style={{ gridTemplateColumns: '340px 1fr', gap: 24 }}>
                {/* Right: Digital Member Card */}
                <div>
                    <div className="member-card" style={{
                        marginBottom: 24,
                        background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
                        color: '#ffffff',
                        padding: 24,
                        borderRadius: 20,
                        boxShadow: '0 10px 25px rgba(37, 99, 235, 0.35)',
                        position: 'relative'
                    }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, opacity: 0.9, letterSpacing: '0.5px' }}>
                            {user.club}
                        </div>
                        <div style={{ fontSize: '1.3rem', fontWeight: 800, marginTop: 8 }}>
                            {user.firstName} {user.lastName}
                        </div>
                        <div style={{ fontSize: '0.88rem', fontFamily: 'monospace', opacity: 0.9, marginTop: 4 }}>
                            {user.membershipNumber}
                        </div>
                        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
                            <div style={{ width: 120, height: 120, background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12, padding: 8 }}>
                                <QrCode size={100} color="#0f172a" />
                            </div>
                        </div>
                        <div style={{ marginTop: 16, fontSize: '0.75rem', textAlign: 'center', opacity: 0.85 }}>
                            سارية حتى {user.expiresAt}
                        </div>
                    </div>

                    <div className="card" style={{
                        background: isDark ? '#0d1117' : '#ffffff',
                        border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
                        borderRadius: 16,
                        padding: 20
                    }}>
                        <div className="card-title" style={{ fontSize: '1rem', fontWeight: 800, marginBottom: 16, color: isDark ? '#ffffff' : '#0f172a' }}>
                            تفاصيل العضوية
                        </div>
                        {[
                            ['نوع الباقة', user.plan],
                            ['تاريخ الانضمام', user.joinedAt],
                            ['تاريخ التجديد', user.expiresAt],
                            ['حالة العضوية', user.status]
                        ].map(([k, v]) => (
                            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: 12 }}>
                                <span style={{ color: isDark ? '#94a3b8' : '#64748b' }}>{k}</span>
                                <span style={{ fontWeight: 700, color: k === 'حالة العضوية' ? '#10b981' : isDark ? '#ffffff' : '#0f172a' }}>{v}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Left: Detailed Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div className="card" style={{
                        background: isDark ? '#0d1117' : '#ffffff',
                        border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
                        borderRadius: 16,
                        padding: 20
                    }}>
                        <div className="card-title" style={{ fontSize: '1rem', fontWeight: 800, marginBottom: 16, color: isDark ? '#ffffff' : '#0f172a' }}>
                            البيانات الشخصية
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                            <InfoField label="الاسم الأول" value={user.firstName} />
                            <InfoField label="اسم العائلة" value={user.lastName} />
                            <InfoField label="البريد الإلكتروني" value={user.email} />
                            <InfoField label="رقم الهاتف" value={user.phone} />
                            <InfoField label="الرقم القومي" value={user.nationalId} />
                            <InfoField label="العنوان السكني" value={user.address} />
                        </div>
                    </div>

                    <div className="card" style={{
                        background: isDark ? '#0d1117' : '#ffffff',
                        border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
                        borderRadius: 16,
                        padding: 20
                    }}>
                        <div className="card-title" style={{ fontSize: '1rem', fontWeight: 800, marginBottom: 16, color: isDark ? '#ffffff' : '#0f172a' }}>
                            الملف الطبي واللياقة الرياضية
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 16 }}>
                            <InfoField label="فصيلة الدم" value={user.bloodType} />
                            <InfoField label="الملاحظات والفحوصات الطبية" value={user.medicalNotes} />
                        </div>
                    </div>

                    <div className="card" style={{
                        background: isDark ? '#0d1117' : '#ffffff',
                        border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
                        borderRadius: 16,
                        padding: 20
                    }}>
                        <div className="card-title" style={{ fontSize: '1rem', fontWeight: 800, marginBottom: 16, color: isDark ? '#ffffff' : '#0f172a' }}>
                            بيانات الاتصال في حالات الطوارئ
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                            <InfoField label="اسم جهة الاتصال" value={user.emergencyContact.name} />
                            <InfoField label="صلة القرابة" value={user.emergencyContact.relationship} />
                            <InfoField label="رقم هاتف الطوارئ" value={user.emergencyContact.phone} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
