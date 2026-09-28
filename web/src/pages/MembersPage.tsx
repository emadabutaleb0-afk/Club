import { useState } from 'react';
import { Search, UserPlus, Filter, MoreVertical, Mail, Phone, ShieldCheck, CheckCircle2, Clock, AlertCircle, Ban } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

interface Member {
    id: string;
    name: string;
    email: string;
    phone: string;
    plan: string;
    status: 'active' | 'pending' | 'expired' | 'suspended';
    role: 'عضو ماسي' | 'مدرب أولمبي' | 'إدارة وإشراف' | 'عضو عامل' | 'عضوية شرفية';
    joined: string;
    avatar: string;
    membershipNo: string;
}

const mockMembers: Member[] = [
    {
        id: '1',
        name: 'المستشار محمود عبد الرحمن الفقي',
        email: 'm.elfeki@justice.gov.eg',
        phone: '+20 100 554 9912',
        plan: 'عضوية عائلية ماسية دائمـة (VIP)',
        status: 'active',
        role: 'عضو ماسي',
        joined: '15 يناير 2024',
        avatar: 'م.ف',
        membershipNo: 'CLB-2024-0012'
    },
    {
        id: '2',
        name: 'ك. إبراهيم كمال السعدني',
        email: 'coach.saadany@clubhub.eg',
        phone: '+20 111 883 4510',
        plan: 'طاقم التدريب الفني المعتمد',
        status: 'active',
        role: 'مدرب أولمبي',
        joined: '3 ديسمبر 2023',
        avatar: 'إ.س',
        membershipNo: 'CLB-COACH-004'
    },
    {
        id: '3',
        name: 'د. نورهان طارق عبد العزيز',
        email: 'nourhan.tarek@aucegypt.edu',
        phone: '+20 122 341 9081',
        plan: 'أكاديمية السباحة الأولمبية السنوية',
        status: 'pending',
        role: 'عضو عامل',
        joined: '5 فبراير 2026',
        avatar: 'ن.ع',
        membershipNo: 'CLB-2026-0891'
    },
    {
        id: '4',
        name: 'م. أحمد مصطفى الشناوي',
        email: 'a.elshinawy@orascom.com',
        phone: '+20 109 443 2187',
        plan: 'عضوية عائلية أولمبية ممتدة',
        status: 'active',
        role: 'عضو ماسي',
        joined: '20 سبتمبر 2024',
        avatar: 'أ.ش',
        membershipNo: 'CLB-2024-0142'
    },
    {
        id: '5',
        name: 'أ. مروة حسن عبد الله',
        email: 'marwa.abdallah@cibeg.com',
        phone: '+20 102 991 7623',
        plan: 'عضوية سنوية متكاملة (اللياقة والبادل)',
        status: 'active',
        role: 'عضو عامل',
        joined: '22 يناير 2025',
        avatar: 'م.ع',
        membershipNo: 'CLB-2025-0341'
    },
    {
        id: '6',
        name: 'ك. محمد طارق الشريف',
        email: 'm.elshereef@clubhub.eg',
        phone: '+20 115 671 2309',
        plan: 'إدارة وتنسيق الأكاديميات الرياضية',
        status: 'active',
        role: 'إدارة وإشراف',
        joined: '10 أغسطس 2024',
        avatar: 'م.ش',
        membershipNo: 'CLB-STAFF-008'
    },
    {
        id: '7',
        name: 'أ. ياسمين خالد المنشاوي',
        email: 'yasmine.elmenshawy@gmail.com',
        phone: '+20 106 550 4392',
        plan: 'اشتراك مجمع التنس والاسكواش',
        status: 'expired',
        role: 'عضو عامل',
        joined: '1 نوفمبر 2024',
        avatar: 'ي.م',
        membershipNo: 'CLB-2024-0610'
    },
    {
        id: '8',
        name: 'د. حازم إمام الدسوقي',
        email: 'dr.hazem.emam@kasralainy.edu.eg',
        phone: '+20 120 778 1245',
        plan: 'عضوية شرفية - اللجنة الطبية الرياضية',
        status: 'active',
        role: 'عضوية شرفية',
        joined: '12 مايو 2024',
        avatar: 'ح.د',
        membershipNo: 'CLB-HONOR-002'
    },
    {
        id: '9',
        name: 'م. كريم سامي العدوي',
        email: 'karim.eladawy@tmg.com.eg',
        phone: '+20 100 812 3456',
        plan: 'عضوية مجمع ملاعب كرة القدم',
        status: 'suspended',
        role: 'عضو عامل',
        joined: '5 أكتوبر 2025',
        avatar: 'ك.ع',
        membershipNo: 'CLB-2025-0723'
    },
    {
        id: '10',
        name: 'أ. رانيا صلاح الدين بدر',
        email: 'rania.badr@vodafone.com',
        phone: '+20 101 234 8876',
        plan: 'عضوية عائلية متميزة',
        status: 'active',
        role: 'عضو عامل',
        joined: '18 يونيو 2025',
        avatar: 'ر.ب',
        membershipNo: 'CLB-2025-0519'
    }
];

export default function MembersPage() {
    const theme = useThemeStore((state) => state.theme);
    const isDark = theme === 'dark';

    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const filtered = mockMembers.filter((m) => {
        const matchSearch =
            m.name.toLowerCase().includes(search.toLowerCase()) ||
            m.email.toLowerCase().includes(search.toLowerCase()) ||
            m.membershipNo.toLowerCase().includes(search.toLowerCase()) ||
            m.phone.includes(search);
        const matchStatus = statusFilter === 'all' || m.status === statusFilter;
        return matchSearch && matchStatus;
    });

    return (
        <div style={{ direction: 'rtl', minHeight: '100%', paddingBottom: 40 }}>
            {/* Page Header */}
            <div className="page-header" style={{ marginBottom: 24 }}>
                <div>
                    <h1 className="page-title" style={{ fontSize: '1.8rem', fontWeight: 800 }}>
                        سجل الأعضاء والاشتراكات
                    </h1>
                    <p className="page-subtitle" style={{ fontSize: '0.92rem' }}>
                        إجمالي {mockMembers.length} عضوية مسجلة بمركز التنمية الشبابية بالتجمع الأول (منشآت أولمبية وعائلية)
                    </p>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                    <button className="btn btn-primary" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                        boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)'
                    }}>
                        <UserPlus size={16} /> إضافة عضو جديد
                    </button>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="card" style={{
                marginBottom: 24,
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                flexWrap: 'wrap',
                background: isDark ? '#0d1117' : '#ffffff',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
                borderRadius: 16,
                padding: 16
            }}>
                <div className="search-bar" style={{ flex: 1, minWidth: 260, position: 'relative' }}>
                    <input
                        placeholder="ابحث بالاسم، رقم العضوية، الهاتف، أو البريد الإلكتروني..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        id="member-search"
                        style={{
                            width: '100%',
                            padding: '10px 38px 10px 14px',
                            borderRadius: 10,
                            fontSize: '0.88rem',
                            background: isDark ? '#161b22' : '#f8fafc',
                            border: isDark ? '1px solid #30363d' : '1px solid #cbd5e1',
                            color: isDark ? '#ffffff' : '#0f172a',
                            outline: 'none'
                        }}
                    />
                    <Search size={18} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                </div>

                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {[
                        { key: 'all', label: 'كافة الحالات' },
                        { key: 'active', label: 'نشطة وفعالة' },
                        { key: 'pending', label: 'قيد المراجعة' },
                        { key: 'expired', label: 'منتهية' },
                        { key: 'suspended', label: 'موقوفة' },
                    ].map((s) => (
                        <button
                            key={s.key}
                            onClick={() => setStatusFilter(s.key)}
                            style={{
                                padding: '8px 14px',
                                borderRadius: 10,
                                fontSize: '0.84rem',
                                fontWeight: 700,
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                background: statusFilter === s.key ? '#2563eb' : isDark ? '#161b22' : '#f1f5f9',
                                color: statusFilter === s.key ? '#ffffff' : isDark ? '#94a3b8' : '#475569'
                            }}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Members Table */}
            <div className="card" style={{
                padding: 0,
                overflow: 'hidden',
                background: isDark ? '#0d1117' : '#ffffff',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
                borderRadius: 16,
                boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.4)' : '0 2px 10px rgba(0,0,0,0.03)'
            }}>
                <div className="table-container" style={{ border: 'none', overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
                        <thead>
                            <tr style={{
                                borderBottom: isDark ? '1px solid #21262d' : '1px solid #e2e8f0',
                                color: isDark ? '#94a3b8' : '#64748b',
                                fontSize: '0.84rem'
                            }}>
                                <th style={{ padding: '14px 16px', fontWeight: 600 }}>بيانات العضو ورقم العضوية</th>
                                <th style={{ padding: '14px 16px', fontWeight: 600 }}>وسائل الاتصال</th>
                                <th style={{ padding: '14px 16px', fontWeight: 600 }}>باقة الاشتراك والمنشأة</th>
                                <th style={{ padding: '14px 16px', fontWeight: 600 }}>الصفة والصفة الرياضية</th>
                                <th style={{ padding: '14px 16px', fontWeight: 600 }}>حالة العضوية</th>
                                <th style={{ padding: '14px 16px', fontWeight: 600 }}>تاريخ الانضمام</th>
                                <th style={{ padding: '14px 16px', fontWeight: 600 }}>إجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((m) => (
                                <tr key={m.id} style={{
                                    borderBottom: isDark ? '1px solid #161b22' : '1px solid #f1f5f9',
                                    transition: 'background 0.15s'
                                }}>
                                    <td style={{ padding: '14px 16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <div style={{
                                                width: 42,
                                                height: 42,
                                                borderRadius: '50%',
                                                background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '0.82rem',
                                                fontWeight: 800,
                                                color: '#ffffff',
                                                flexShrink: 0
                                            }}>
                                                {m.avatar}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 700, color: isDark ? '#ffffff' : '#0f172a', fontSize: '0.94rem' }}>
                                                    {m.name}
                                                </div>
                                                <div style={{ fontSize: '0.78rem', color: isDark ? '#94a3b8' : '#64748b', marginTop: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                                                    <span style={{ fontFamily: 'monospace', fontWeight: 600, color: '#3b82f6' }}>{m.membershipNo}</span>
                                                    <span>•</span>
                                                    <span>{m.email}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '14px 16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <a
                                                href={`tel:${m.phone}`}
                                                className="btn btn-secondary btn-sm"
                                                title={m.phone}
                                                style={{
                                                    padding: '6px 10px',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: 4,
                                                    fontSize: '0.78rem',
                                                    borderRadius: 8,
                                                    color: isDark ? '#ffffff' : '#0f172a',
                                                    border: isDark ? '1px solid #374151' : '1px solid #cbd5e1'
                                                }}
                                            >
                                                <Phone size={13} /> {m.phone}
                                            </a>
                                            <a
                                                href={`mailto:${m.email}`}
                                                className="btn btn-secondary btn-sm"
                                                title={m.email}
                                                style={{
                                                    padding: '6px 8px',
                                                    borderRadius: 8,
                                                    color: isDark ? '#ffffff' : '#0f172a',
                                                    border: isDark ? '1px solid #374151' : '1px solid #cbd5e1'
                                                }}
                                            >
                                                <Mail size={13} />
                                            </a>
                                        </div>
                                    </td>
                                    <td style={{ padding: '14px 16px' }}>
                                        <span style={{
                                            padding: '4px 10px',
                                            borderRadius: 8,
                                            fontSize: '0.8rem',
                                            fontWeight: 600,
                                            background: isDark ? 'rgba(37, 99, 235, 0.15)' : '#eff6ff',
                                            color: '#3b82f6',
                                            display: 'inline-block',
                                            border: '1px solid rgba(59, 130, 246, 0.25)'
                                        }}>
                                            {m.plan}
                                        </span>
                                    </td>
                                    <td style={{ padding: '14px 16px' }}>
                                        <span style={{
                                            padding: '4px 10px',
                                            borderRadius: 8,
                                            fontSize: '0.78rem',
                                            fontWeight: 700,
                                            background: m.role === 'عضو ماسي'
                                                ? 'rgba(168, 85, 247, 0.15)'
                                                : m.role === 'مدرب أولمبي'
                                                    ? 'rgba(245, 158, 11, 0.15)'
                                                    : m.role === 'إدارة وإشراف'
                                                        ? 'rgba(59, 130, 246, 0.15)'
                                                        : 'rgba(16, 185, 129, 0.15)',
                                            color: m.role === 'عضو ماسي'
                                                ? '#a855f7'
                                                : m.role === 'مدرب أولمبي'
                                                    ? '#f59e0b'
                                                    : m.role === 'إدارة وإشراف'
                                                        ? '#3b82f6'
                                                        : '#10b981'
                                        }}>
                                            {m.role}
                                        </span>
                                    </td>
                                    <td style={{ padding: '14px 16px' }}>
                                        <span style={{
                                            fontSize: '0.78rem',
                                            padding: '4px 10px',
                                            borderRadius: 8,
                                            fontWeight: 700,
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: 4,
                                            background: m.status === 'active'
                                                ? 'rgba(16, 185, 129, 0.12)'
                                                : m.status === 'pending'
                                                    ? 'rgba(245, 158, 11, 0.12)'
                                                    : m.status === 'suspended'
                                                        ? 'rgba(239, 68, 68, 0.12)'
                                                        : 'rgba(100, 116, 139, 0.15)',
                                            color: m.status === 'active'
                                                ? '#10b981'
                                                : m.status === 'pending'
                                                    ? '#f59e0b'
                                                    : m.status === 'suspended'
                                                        ? '#ef4444'
                                                        : '#64748b'
                                        }}>
                                            {m.status === 'active' && <CheckCircle2 size={13} />}
                                            {m.status === 'pending' && <Clock size={13} />}
                                            {m.status === 'expired' && <AlertCircle size={13} />}
                                            {m.status === 'suspended' && <Ban size={13} />}
                                            {m.status === 'active' ? 'نشطة وفعالة' : m.status === 'pending' ? 'قيد المراجعة' : m.status === 'expired' ? 'منتهية' : 'موقوفة مؤقتاً'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '14px 16px', fontSize: '0.84rem', color: isDark ? '#94a3b8' : '#64748b' }}>
                                        {m.joined}
                                    </td>
                                    <td style={{ padding: '14px 16px' }}>
                                        <button className="btn btn-secondary btn-sm" style={{
                                            padding: '6px 8px',
                                            borderRadius: 8,
                                            color: isDark ? '#ffffff' : '#0f172a',
                                            border: isDark ? '1px solid #374151' : '1px solid #cbd5e1'
                                        }}>
                                            <MoreVertical size={14} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
