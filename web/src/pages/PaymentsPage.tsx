import { useState } from 'react';
import {
    Download,
    FileText,
    TrendingUp,
    Receipt,
    Search,
    ShieldCheck,
    CheckCircle2,
    Clock,
    RotateCcw,
    Building,
    CreditCard,
    DollarSign,
    Coins
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useThemeStore } from '../store/themeStore';

interface Transaction {
    id: string;
    member: string;
    description: string;
    amount: number;
    fee: number;
    net: number;
    type: string;
    status: 'succeeded' | 'pending' | 'refunded';
    date: string;
    method: string;
}

const planBreakdown = [
    { name: 'عقود الرعاية وحقوق التسمية', value: 20.5, color: '#2563eb', label: '20.5 مليون ج.م' },
    { name: 'العضويات العائلية والماسية', value: 12.2, color: '#10b981', label: '12.2 مليون ج.م' },
    { name: 'أكاديميات السباحة والألعاب الأولمبية', value: 7.5, color: '#8b5cf6', label: '7.5 مليون ج.م' },
    { name: 'إيجارات الملاعب والأنشطة الرياضية', value: 4.8, color: '#f59e0b', label: '4.8 مليون ج.م' },
    { name: 'المحلات والمنطقة الاستثمارية', value: 3.5, color: '#ec4899', label: '3.5 مليون ج.م' },
];

const transactionsData: Transaction[] = [
    {
        id: 'TXN-2026-001',
        member: 'شركة السويدي إلكتريك',
        description: 'رعاية سنوية استراتيجية للمجمع الأولمبي وصالة الجمباز',
        amount: 12000000,
        fee: 240000,
        net: 11760000,
        type: 'عقد رعاية استراتيجي',
        status: 'succeeded',
        date: '10 فبراير 2026',
        method: 'تحويل بنكي - البنك الأهلي المصري'
    },
    {
        id: 'TXN-2026-002',
        member: 'بنك مصر (الإدارة العامة للمسؤولية المجتمعية)',
        description: 'حقوق تسمية ورعاية مجمع البادل والمركز الإعلامي',
        amount: 8500000,
        fee: 170000,
        net: 8330000,
        type: 'حقوق تسمية ورعاية',
        status: 'succeeded',
        date: '9 فبراير 2026',
        method: 'تحويل مركزي CIB'
    },
    {
        id: 'TXN-2026-003',
        member: 'المستشار محمود عبد الرحمن الفقي',
        description: 'عضوية عائلية ماسية دائمـة مدى الحياة - فئة VIP',
        amount: 3500000,
        fee: 70000,
        net: 3430000,
        type: 'عضوية VIP ماسية',
        status: 'succeeded',
        date: '8 فبراير 2026',
        method: 'فيزا بلاتينيوم (البنك التجاري الدولي)'
    },
    {
        id: 'TXN-2026-004',
        member: 'أكاديمية يوفنتوس مصر الرياضية',
        description: 'حق انتفاع وتشغيل مواسم الملاعب الخماسية والقانونية',
        amount: 4200000,
        fee: 84000,
        net: 4116000,
        type: 'استثمار أكاديمي دولي',
        status: 'succeeded',
        date: '7 فبراير 2026',
        method: 'شيك مصرفي معتمد'
    },
    {
        id: 'TXN-2026-005',
        member: 'م. أحمد مصطفى الشناوي',
        description: 'عضوية عائلية أولمبية ممتدة (مجمع التجمع الأول)',
        amount: 2800000,
        fee: 56000,
        net: 2744000,
        type: 'عضوية عائلية متميزة',
        status: 'succeeded',
        date: '6 فبراير 2026',
        method: 'تحويل لحظي عبر InstaPay'
    },
    {
        id: 'TXN-2026-006',
        member: 'ك. إبراهيم كمال السعدني',
        description: 'إيجار سنوي للمجمع التجاري ومنطقة الكافيهات والمطاعم',
        amount: 1850000,
        fee: 37000,
        net: 1813000,
        type: 'إيجار تجاري واستثماري',
        status: 'refunded',
        date: '5 فبراير 2026',
        method: 'تحويل داخلي معتمد'
    },
    {
        id: 'TXN-2026-007',
        member: 'أ. مروة حسن عبد الله',
        description: 'تجديد العضوية العائلية الشاملة واشتراك صالة اللياقة',
        amount: 1600000,
        fee: 32000,
        net: 1568000,
        type: 'تجديد عضوية عائلية',
        status: 'succeeded',
        date: '4 فبراير 2026',
        method: 'فوري للمدفوعات المتكاملة'
    },
    {
        id: 'TXN-2026-008',
        member: 'د. نورهان طارق عبد العزيز',
        description: 'اشتراك سنوي لأكاديمية السباحة الأولمبية وبطولات الجمهورية',
        amount: 1250000,
        fee: 25000,
        net: 1225000,
        type: 'أكاديمية السباحة الأولمبية',
        status: 'pending',
        date: '3 فبراير 2026',
        method: 'بطاقة ميزة الوطنية'
    },
    {
        id: 'TXN-2026-009',
        member: 'مجموعة طلعت مصطفى للتطوير العقاري',
        description: 'رعاية سباق ضاحية التجمع وماراثون الشباب السنوي',
        amount: 5000000,
        fee: 100000,
        net: 4900000,
        type: 'رعاية فعاليات وماراثون',
        status: 'succeeded',
        date: '1 فبراير 2026',
        method: 'تحويل بنكي - بنك مصر'
    }
];

const settlementsData = [
    {
        batchId: 'SETTLE-EG-9941',
        bank: 'البنك الأهلي المصري (حساب المشروعات الرياضية)',
        accountNo: 'EG23000300001099238472910',
        amount: 25400000,
        settledDate: '8 فبراير 2026',
        status: 'تم التحويل لحساب المركز',
        ref: 'REF-NBE-883921'
    },
    {
        batchId: 'SETTLE-EG-9940',
        bank: 'بنك مصر (حساب صندوق تنمية الشباب والرياضة)',
        accountNo: 'EG54000200004928172635411',
        amount: 16800000,
        settledDate: '1 فبراير 2026',
        status: 'تم التحويل لحساب المركز',
        ref: 'REF-BM-774102'
    },
    {
        batchId: 'SETTLE-EG-9939',
        bank: 'البنك التجاري الدولي CIB (حساب الاستثمار وتطوير الملاعب)',
        accountNo: 'EG19001000007839201948271',
        amount: 5330000,
        settledDate: '25 يناير 2026',
        status: 'تم التحويل لحساب المركز',
        ref: 'REF-CIB-662910'
    }
];

const invoicesData = [
    {
        invoiceNo: 'INV-2026-081',
        client: 'شركة السويدي إلكتريك',
        title: 'الدفعة الأولى من الرعاية الأولمبية الرسمية',
        dueDate: '15 فبراير 2026',
        amount: 12000000,
        taxNumber: '392-849-102',
        status: 'مدفوعة بالكامل'
    },
    {
        invoiceNo: 'INV-2026-082',
        client: 'بنك مصر',
        title: 'عقد استغلال مجمع ملاعب البادل والتسمية الحصرية',
        dueDate: '20 فبراير 2026',
        amount: 8500000,
        taxNumber: '100-293-847',
        status: 'مدفوعة بالكامل'
    },
    {
        invoiceNo: 'INV-2026-083',
        client: 'د. نورهان طارق عبد العزيز',
        title: 'اشتراك عائلة النخبة في برامج الإعداد الأولمبي',
        dueDate: '12 فبراير 2026',
        amount: 1250000,
        taxNumber: 'فردي / رقم قومي 289100201923',
        status: 'قيد انتظار السداد'
    },
    {
        invoiceNo: 'INV-2026-084',
        client: 'مجموعة طلعت مصطفى',
        title: 'رعاية ماراثون القاهرة الجديدة الرياضي 2026',
        dueDate: '28 فبراير 2026',
        amount: 5000000,
        taxNumber: '204-918-382',
        status: 'مدفوعة بالكامل'
    }
];

// Helper to format currency in Egyptian Pounds (ج.م)
function formatEGP(num: number): string {
    return new Intl.NumberFormat('ar-EG', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(num) + ' ج.م';
}

function formatEGP_EN(num: number): string {
    return new Intl.NumberFormat('en-US').format(num) + ' ج.م';
}

export default function PaymentsPage() {
    const theme = useThemeStore((state) => state.theme);
    const isDark = theme === 'dark';

    const [tab, setTab] = useState<'transactions' | 'settlements' | 'invoices'>('transactions');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    const filteredTransactions = transactionsData.filter((t) => {
        const matchesSearch = t.member.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.type.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div style={{ direction: 'rtl', minHeight: '100%', paddingBottom: 40 }}>
            {/* Header */}
            <div className="page-header" style={{ marginBottom: 24 }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                        <h1 className="page-title" style={{ fontSize: '1.8rem', fontWeight: 800 }}>
                            المدفوعات والميزانية والمالية
                        </h1>
                        <span style={{
                            padding: '4px 10px',
                            borderRadius: 20,
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            background: isDark ? 'rgba(37, 99, 235, 0.2)' : 'rgba(37, 99, 235, 0.1)',
                            color: '#3b82f6',
                            border: '1px solid rgba(59, 130, 246, 0.3)'
                        }}>
                            العملة: الجنيه المصري (EGP)
                        </span>
                    </div>
                    <p className="page-subtitle" style={{ fontSize: '0.92rem' }}>
                        إدارة التدفقات النقدية، اشتراكات العضويات، عقود الرعاية، وحصيلة المجمع الأولمبي لمركز التنمية الشبابية بالتجمع الأول
                    </p>
                </div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <button className="btn btn-secondary" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        fontWeight: 600,
                        background: isDark ? '#111827' : '#f8fafc',
                        border: isDark ? '1px solid #374151' : '1px solid #cbd5e1',
                        color: isDark ? '#ffffff' : '#0f172a'
                    }}>
                        <Download size={16} /> تصدير التقرير المالي (Excel)
                    </button>
                    <button className="btn btn-primary" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                        boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)'
                    }}>
                        <FileText size={16} /> إصدار مطالبة / فاتورة إلكترونية
                    </button>
                </div>
            </div>

            {/* Millions KPI Revenue Stats */}
            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 28 }}>
                {/* 1. Total Revenue in Millions */}
                <div className="stat-card" style={{
                    background: isDark ? '#0d1117' : '#ffffff',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
                    borderRadius: 16,
                    padding: 20,
                    boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.5)' : '0 2px 10px rgba(0,0,0,0.04)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div className="stat-icon green" style={{ width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                            <Coins size={24} />
                        </div>
                        <span className="stat-change positive" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#10b981', display: 'flex', alignItems: 'center', gap: 2 }}>
                            <TrendingUp size={14} /> +18.4% نمو
                        </span>
                    </div>
                    <div style={{ marginTop: 14 }}>
                        <div style={{ fontSize: '1.75rem', fontWeight: 800, color: isDark ? '#ffffff' : '#0f172a', letterSpacing: '-0.5px' }}>
                            ٤٨,٥٠٠,٠٠٠ ج.م
                        </div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 600, color: isDark ? '#94a3b8' : '#64748b', marginTop: 4 }}>
                            إجمالي الإيرادات والتحصيلات السنوية
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#10b981', marginTop: 4, fontWeight: 500 }}>
                            (48.5 مليون جنيه مصري معتمد)
                        </div>
                    </div>
                </div>

                {/* 2. Sponsorships & Premium Memberships in Millions */}
                <div className="stat-card" style={{
                    background: isDark ? '#0d1117' : '#ffffff',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
                    borderRadius: 16,
                    padding: 20,
                    boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.5)' : '0 2px 10px rgba(0,0,0,0.04)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div className="stat-icon blue" style={{ width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(37, 99, 235, 0.15)', color: '#3b82f6' }}>
                            <Building size={24} />
                        </div>
                        <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#3b82f6', background: 'rgba(37, 99, 235, 0.1)', padding: '2px 8px', borderRadius: 8 }}>
                            عقود كبرى
                        </span>
                    </div>
                    <div style={{ marginTop: 14 }}>
                        <div style={{ fontSize: '1.75rem', fontWeight: 800, color: isDark ? '#ffffff' : '#0f172a', letterSpacing: '-0.5px' }}>
                            ٣٢,٧٠٠,٠٠٠ ج.م
                        </div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 600, color: isDark ? '#94a3b8' : '#64748b', marginTop: 4 }}>
                            عقود الرعاية والعضويات الماسية
                        </div>
                        <div style={{ fontSize: '0.78rem', color: isDark ? '#cbd5e1' : '#475569', marginTop: 4 }}>
                            تشمل 14 شريكًا وبنكًا استثماريًا
                        </div>
                    </div>
                </div>

                {/* 3. Platform & Facility Maintenance (2%) */}
                <div className="stat-card" style={{
                    background: isDark ? '#0d1117' : '#ffffff',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
                    borderRadius: 16,
                    padding: 20,
                    boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.5)' : '0 2px 10px rgba(0,0,0,0.04)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div className="stat-icon orange" style={{ width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
                            <Receipt size={24} />
                        </div>
                        <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#f59e0b', background: 'rgba(245, 158, 11, 0.1)', padding: '2px 8px', borderRadius: 8 }}>
                            نسبة 2%
                        </span>
                    </div>
                    <div style={{ marginTop: 14 }}>
                        <div style={{ fontSize: '1.75rem', fontWeight: 800, color: isDark ? '#ffffff' : '#0f172a', letterSpacing: '-0.5px' }}>
                            ٩٧٠,٠٠٠ ج.م
                        </div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 600, color: isDark ? '#94a3b8' : '#64748b', marginTop: 4 }}>
                            رسوم الإدارة وتطوير الصالات (2%)
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#f59e0b', marginTop: 4 }}>
                            تخصم تلقائياً لصيانة المجمع الأولمبي
                        </div>
                    </div>
                </div>

                {/* 4. Net Settled in Millions */}
                <div className="stat-card" style={{
                    background: isDark ? '#0d1117' : '#ffffff',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
                    borderRadius: 16,
                    padding: 20,
                    boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.5)' : '0 2px 10px rgba(0,0,0,0.04)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div className="stat-icon purple" style={{ width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' }}>
                            <ShieldCheck size={24} />
                        </div>
                        <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#8b5cf6', background: 'rgba(139, 92, 246, 0.1)', padding: '2px 8px', borderRadius: 8 }}>
                            رصيد معتمد
                        </span>
                    </div>
                    <div style={{ marginTop: 14 }}>
                        <div style={{ fontSize: '1.75rem', fontWeight: 800, color: isDark ? '#ffffff' : '#0f172a', letterSpacing: '-0.5px' }}>
                            ٤٧,٥٣٠,٠٠٠ ج.م
                        </div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 600, color: isDark ? '#94a3b8' : '#64748b', marginTop: 4 }}>
                            صافي الحساب المعتمد للمركز
                        </div>
                        <div style={{ fontSize: '0.78rem', color: isDark ? '#cbd5e1' : '#475569', marginTop: 4 }}>
                            جاهز للصرف والتسويات البنكية
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Layout */}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 360px', gap: 24, alignItems: 'start' }}>
                {/* Left Area: Transactions & Tabs */}
                <div className="card" style={{
                    background: isDark ? '#0d1117' : '#ffffff',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
                    borderRadius: 16,
                    padding: 20,
                    boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.4)' : '0 2px 10px rgba(0,0,0,0.03)'
                }}>
                    {/* Tabs & Filters */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
                        <div style={{ display: 'flex', gap: 8, background: isDark ? '#161b22' : '#f1f5f9', padding: 4, borderRadius: 12 }}>
                            <button
                                onClick={() => setTab('transactions')}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: 10,
                                    fontSize: '0.86rem',
                                    fontWeight: 700,
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    background: tab === 'transactions' ? '#2563eb' : 'transparent',
                                    color: tab === 'transactions' ? '#ffffff' : isDark ? '#94a3b8' : '#64748b'
                                }}
                            >
                                المعاملات المالية المباشرة ({transactionsData.length})
                            </button>
                            <button
                                onClick={() => setTab('settlements')}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: 10,
                                    fontSize: '0.86rem',
                                    fontWeight: 700,
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    background: tab === 'settlements' ? '#2563eb' : 'transparent',
                                    color: tab === 'settlements' ? '#ffffff' : isDark ? '#94a3b8' : '#64748b'
                                }}
                            >
                                التسويات والتحويلات البنكية ({settlementsData.length})
                            </button>
                            <button
                                onClick={() => setTab('invoices')}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: 10,
                                    fontSize: '0.86rem',
                                    fontWeight: 700,
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    background: tab === 'invoices' ? '#2563eb' : 'transparent',
                                    color: tab === 'invoices' ? '#ffffff' : isDark ? '#94a3b8' : '#64748b'
                                }}
                            >
                                الفواتير الإلكترونية ({invoicesData.length})
                            </button>
                        </div>

                        {tab === 'transactions' && (
                            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type="text"
                                        placeholder="بحث بالاسم أو الهيئة..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        style={{
                                            padding: '8px 32px 8px 12px',
                                            borderRadius: 10,
                                            fontSize: '0.85rem',
                                            background: isDark ? '#161b22' : '#f8fafc',
                                            border: isDark ? '1px solid #30363d' : '1px solid #cbd5e1',
                                            color: isDark ? '#ffffff' : '#0f172a',
                                            outline: 'none',
                                            width: 180
                                        }}
                                    />
                                    <Search size={15} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                </div>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    style={{
                                        padding: '8px 10px',
                                        borderRadius: 10,
                                        fontSize: '0.85rem',
                                        background: isDark ? '#161b22' : '#f8fafc',
                                        border: isDark ? '1px solid #30363d' : '1px solid #cbd5e1',
                                        color: isDark ? '#ffffff' : '#0f172a',
                                        outline: 'none',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <option value="all">كافة الحالات</option>
                                    <option value="succeeded">مكتملة</option>
                                    <option value="pending">معلقة</option>
                                    <option value="refunded">مستردة</option>
                                </select>
                            </div>
                        )}
                    </div>

                    {/* Tab 1: Transactions Table */}
                    {tab === 'transactions' && (
                        <div className="table-container" style={{ border: 'none', overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
                                <thead>
                                    <tr style={{
                                        borderBottom: isDark ? '1px solid #21262d' : '1px solid #e2e8f0',
                                        color: isDark ? '#94a3b8' : '#64748b',
                                        fontSize: '0.84rem'
                                    }}>
                                        <th style={{ padding: '12px 10px', fontWeight: 600 }}>العضو / الجهة الراعية</th>
                                        <th style={{ padding: '12px 10px', fontWeight: 600 }}>المبلغ الإجمالي</th>
                                        <th style={{ padding: '12px 10px', fontWeight: 600 }}>رسوم الصيانة (2%)</th>
                                        <th style={{ padding: '12px 10px', fontWeight: 600 }}>صافي الإيراد</th>
                                        <th style={{ padding: '12px 10px', fontWeight: 600 }}>نوع العقد / الاشتراك</th>
                                        <th style={{ padding: '12px 10px', fontWeight: 600 }}>الحالة</th>
                                        <th style={{ padding: '12px 10px', fontWeight: 600 }}>طريقة السداد والتاريخ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTransactions.map((t) => (
                                        <tr key={t.id} style={{
                                            borderBottom: isDark ? '1px solid #161b22' : '1px solid #f1f5f9',
                                            transition: 'background 0.15s'
                                        }}>
                                            <td style={{ padding: '14px 10px' }}>
                                                <div style={{ fontWeight: 700, color: isDark ? '#ffffff' : '#0f172a', fontSize: '0.92rem' }}>
                                                    {t.member}
                                                </div>
                                                <div style={{ fontSize: '0.78rem', color: isDark ? '#94a3b8' : '#64748b', marginTop: 2 }}>
                                                    {t.description}
                                                </div>
                                            </td>
                                            <td style={{ padding: '14px 10px', fontWeight: 800, color: isDark ? '#ffffff' : '#0f172a', whiteSpace: 'nowrap', fontSize: '0.92rem' }}>
                                                {formatEGP_EN(t.amount)}
                                            </td>
                                            <td style={{ padding: '14px 10px', color: '#f59e0b', fontWeight: 600, whiteSpace: 'nowrap', fontSize: '0.85rem' }}>
                                                -{formatEGP_EN(t.fee)}
                                            </td>
                                            <td style={{ padding: '14px 10px', fontWeight: 800, color: '#10b981', whiteSpace: 'nowrap', fontSize: '0.95rem' }}>
                                                {formatEGP_EN(t.net)}
                                            </td>
                                            <td style={{ padding: '14px 10px' }}>
                                                <span style={{
                                                    fontSize: '0.78rem',
                                                    padding: '4px 10px',
                                                    borderRadius: 8,
                                                    fontWeight: 600,
                                                    background: isDark ? 'rgba(37, 99, 235, 0.15)' : '#eff6ff',
                                                    color: '#3b82f6',
                                                    display: 'inline-block',
                                                    whiteSpace: 'nowrap'
                                                }}>
                                                    {t.type}
                                                </span>
                                            </td>
                                            <td style={{ padding: '14px 10px' }}>
                                                <span style={{
                                                    fontSize: '0.76rem',
                                                    padding: '3px 8px',
                                                    borderRadius: 6,
                                                    fontWeight: 700,
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: 4,
                                                    background: t.status === 'succeeded' ? 'rgba(16, 185, 129, 0.12)' : t.status === 'pending' ? 'rgba(245, 158, 11, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                                                    color: t.status === 'succeeded' ? '#10b981' : t.status === 'pending' ? '#f59e0b' : '#ef4444'
                                                }}>
                                                    {t.status === 'succeeded' && <CheckCircle2 size={12} />}
                                                    {t.status === 'pending' && <Clock size={12} />}
                                                    {t.status === 'refunded' && <RotateCcw size={12} />}
                                                    {t.status === 'succeeded' ? 'معتمد ومكتمل' : t.status === 'pending' ? 'قيد المراجعة' : 'مسترد'}
                                                </span>
                                            </td>
                                            <td style={{ padding: '14px 10px', fontSize: '0.8rem', color: isDark ? '#94a3b8' : '#64748b' }}>
                                                <div style={{ fontWeight: 600, color: isDark ? '#cbd5e1' : '#334155' }}>{t.date}</div>
                                                <div style={{ fontSize: '0.75rem', marginTop: 2 }}>{t.method}</div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Tab 2: Bank Settlements */}
                    {tab === 'settlements' && (
                        <div>
                            <div style={{ marginBottom: 16, fontSize: '0.88rem', color: isDark ? '#94a3b8' : '#64748b' }}>
                                التسويات النقدية المحولة مباشرة إلى الحسابات البنكية الرسمية لمركز التنمية الشبابية بالتجمع الأول (معتمدة من البنك المركزي المصري):
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {settlementsData.map((s) => (
                                    <div key={s.batchId} style={{
                                        padding: 16,
                                        borderRadius: 12,
                                        background: isDark ? '#161b22' : '#f8fafc',
                                        border: isDark ? '1px solid #30363d' : '1px solid #e2e8f0',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        flexWrap: 'wrap',
                                        gap: 12
                                    }}>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <span style={{ fontWeight: 700, fontSize: '1rem', color: isDark ? '#ffffff' : '#0f172a' }}>{s.bank}</span>
                                                <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: 6, background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', fontWeight: 600 }}>
                                                    {s.status}
                                                </span>
                                            </div>
                                            <div style={{ fontSize: '0.8rem', color: isDark ? '#94a3b8' : '#64748b', marginTop: 4, fontFamily: 'monospace' }}>
                                                رقم الحساب الدولي (IBAN): {s.accountNo}
                                            </div>
                                            <div style={{ fontSize: '0.78rem', color: isDark ? '#6e7681' : '#94a3b8', marginTop: 2 }}>
                                                تاريخ التحويل: {s.settledDate} • كود الإشعار البنكي: {s.ref}
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'left' }}>
                                            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981' }}>
                                                {formatEGP_EN(s.amount)}
                                            </div>
                                            <div style={{ fontSize: '0.78rem', color: isDark ? '#94a3b8' : '#64748b' }}>
                                                الدفعة {s.batchId}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tab 3: Electronic Invoices */}
                    {tab === 'invoices' && (
                        <div>
                            <div style={{ marginBottom: 16, fontSize: '0.88rem', color: isDark ? '#94a3b8' : '#64748b' }}>
                                منظومة الفاتورة الإلكترونية المعتمدة لدى مصلحة الضرائب المصرية لمركز التنمية الشبابية:
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {invoicesData.map((inv) => (
                                    <div key={inv.invoiceNo} style={{
                                        padding: 16,
                                        borderRadius: 12,
                                        background: isDark ? '#161b22' : '#f8fafc',
                                        border: isDark ? '1px solid #30363d' : '1px solid #e2e8f0',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        flexWrap: 'wrap',
                                        gap: 12
                                    }}>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <span style={{ fontWeight: 800, fontSize: '0.95rem', color: isDark ? '#ffffff' : '#0f172a' }}>{inv.invoiceNo}</span>
                                                <span style={{ fontSize: '0.8rem', color: '#3b82f6', fontWeight: 600 }}>{inv.client}</span>
                                            </div>
                                            <div style={{ fontSize: '0.84rem', color: isDark ? '#cbd5e1' : '#334155', marginTop: 4, fontWeight: 500 }}>
                                                {inv.title}
                                            </div>
                                            <div style={{ fontSize: '0.76rem', color: isDark ? '#8b949e' : '#64748b', marginTop: 2 }}>
                                                تاريخ الاستحقاق: {inv.dueDate} • التسجيل الضريبي: {inv.taxNumber}
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                                            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: isDark ? '#ffffff' : '#0f172a' }}>
                                                {formatEGP_EN(inv.amount)}
                                            </div>
                                            <span style={{
                                                fontSize: '0.76rem',
                                                padding: '3px 10px',
                                                borderRadius: 6,
                                                fontWeight: 700,
                                                background: inv.status.includes('مدفوعة') ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                                                color: inv.status.includes('مدفوعة') ? '#10b981' : '#f59e0b'
                                            }}>
                                                {inv.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Area: Revenue Breakdown by Category in Millions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div className="card" style={{
                        background: isDark ? '#0d1117' : '#ffffff',
                        border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
                        borderRadius: 16,
                        padding: 20,
                        boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.4)' : '0 2px 10px rgba(0,0,0,0.03)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                            <div style={{ fontSize: '1rem', fontWeight: 800, color: isDark ? '#ffffff' : '#0f172a' }}>
                                توزيع الإيرادات حسب القطاع
                            </div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#3b82f6', background: 'rgba(37, 99, 235, 0.1)', padding: '2px 8px', borderRadius: 6 }}>
                                بالملايين (ج.م)
                            </span>
                        </div>

                        {/* Pie Chart */}
                        <div style={{ height: 210 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={planBreakdown}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={80}
                                        paddingAngle={4}
                                        dataKey="value"
                                    >
                                        {planBreakdown.map((entry) => (
                                            <Cell key={entry.name} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            background: isDark ? '#161b22' : '#ffffff',
                                            border: isDark ? '1px solid #30363d' : '1px solid #e2e8f0',
                                            borderRadius: 10,
                                            color: isDark ? '#ffffff' : '#0f172a',
                                            fontSize: '0.82rem',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                            direction: 'rtl'
                                        }}
                                        formatter={(val: number) => [`${val} مليون جنيه مصري`, 'القيمة']}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Breakdown Legend */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
                            {planBreakdown.map((p) => (
                                <div key={p.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.84rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: p.color, flexShrink: 0 }} />
                                        <span style={{ color: isDark ? '#cbd5e1' : '#334155', fontWeight: 500 }}>{p.name}</span>
                                    </div>
                                    <span style={{ fontWeight: 800, color: isDark ? '#ffffff' : '#0f172a', whiteSpace: 'nowrap', marginRight: 10 }}>
                                        {p.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Official Guarantee Box */}
                    <div style={{
                        background: isDark ? 'rgba(37, 99, 235, 0.08)' : '#eff6ff',
                        border: isDark ? '1px solid rgba(37, 99, 235, 0.25)' : '1px solid #bfdbfe',
                        borderRadius: 16,
                        padding: 18
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, color: '#2563eb' }}>
                            <ShieldCheck size={20} />
                            <span style={{ fontWeight: 800, fontSize: '0.92rem' }}>الشفافية والرقابة المالية</span>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: isDark ? '#94a3b8' : '#475569', lineHeight: 1.6, margin: 0 }}>
                            تخضع جميع المعاملات المالية لمركز التنمية الشبابية بالتجمع الأول لرقابة وزارة الشباب والرياضة والجهاز المركزي للمحاسبات، مع تطبيق منظومة الدفع والتحصيل الإلكتروني الحكومية (GPS).
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
