import { useState, useEffect } from 'react';
import {
    BarChart3, Download, TrendingUp, Users, Calendar, DollarSign,
    ArrowUpRight, ArrowDownRight, Coins, Building, Award
} from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import { useThemeStore } from '../store/themeStore';

// Monthly revenue data in Millions EGP
const revenueData = [
    { month: 'مارس', revenue: 3200000 },
    { month: 'أبريل', revenue: 3400000 },
    { month: 'مايو', revenue: 3650000 },
    { month: 'يونيو', revenue: 4100000 },
    { month: 'يوليو', revenue: 4400000 },
    { month: 'أغسطس', revenue: 4800000 },
    { month: 'سبتمبر', revenue: 4200000 },
    { month: 'أكتوبر', revenue: 4600000 },
    { month: 'نوفمبر', revenue: 4900000 },
    { month: 'ديسمبر', revenue: 5100000 },
    { month: 'يناير', revenue: 5400000 },
    { month: 'فبراير', revenue: 5900000 },
];

// Member growth
const memberGrowthData = [
    { month: 'مارس', members: 2450, newMembers: 120 },
    { month: 'أبريل', members: 2560, newMembers: 110 },
    { month: 'مايو', members: 2710, newMembers: 150 },
    { month: 'يونيو', members: 2890, newMembers: 180 },
    { month: 'يوليو', members: 3040, newMembers: 150 },
    { month: 'أغسطس', members: 3210, newMembers: 170 },
    { month: 'سبتمبر', members: 3320, newMembers: 110 },
    { month: 'أكتوبر', members: 3460, newMembers: 140 },
    { month: 'نوفمبر', members: 3590, newMembers: 130 },
    { month: 'ديسمبر', members: 3690, newMembers: 100 },
    { month: 'يناير', members: 3770, newMembers: 80 },
    { month: 'فبراير', members: 3850, newMembers: 80 },
];

// Facility utilization
const facilityData = [
    { name: 'مجمع حمامات السباحة الأولمبي', utilization: 94, bookings: 1280, revenue: '1,450,000 ج.م' },
    { name: 'ملاعب كرة القدم الدولية والفرعية', utilization: 91, bookings: 980, revenue: '1,820,000 ج.م' },
    { name: 'مجمع ملاعب البادل والتنس الأرضي', utilization: 86, bookings: 760, revenue: '940,000 ج.م' },
    { name: 'صالات اللياقة البدنية والـ Gym', utilization: 82, bookings: 1420, revenue: '820,000 ج.م' },
    { name: 'صالة الجمباز والأنشطة المتعددة', utilization: 75, bookings: 540, revenue: '510,000 ج.م' },
    { name: 'المسرح الروماني والمنطقة الثقافية', utilization: 68, bookings: 210, revenue: '360,000 ج.م' },
];

// Sport activity distribution
const activityDist = [
    { name: 'السباحة والألعاب المائية', value: 35, color: '#2563eb', label: '35%' },
    { name: 'كرة القدم والأكاديميات', value: 28, color: '#10b981', label: '28%' },
    { name: 'البادل والتنس الأرضي', value: 18, color: '#8b5cf6', label: '18%' },
    { name: 'اللياقة البدنية والجمباز', value: 12, color: '#f59e0b', label: '12%' },
    { name: 'الفنون القتالية وتنس الطاولة', value: 7, color: '#ec4899', label: '7%' },
];

export default function ReportsPage() {
    const theme = useThemeStore((state) => state.theme);
    const isDark = theme === 'dark';

    const [animatedStats, setAnimatedStats] = useState(true);
    const [dateRange, setDateRange] = useState('12months');

    const stats = [
        { icon: Coins, label: 'إجمالي الإيرادات السنوية', value: '48,500,000 ج.م', change: '+18.4%', positive: true, color: 'green' },
        { icon: Users, label: 'الأعضاء والرياضيون المسجلون', value: '3,850', change: '+14.2%', positive: true, color: 'purple' },
        { icon: Calendar, label: 'معدل إشغال المنشآت الأولمبية', value: '88.6%', change: '+6.1%', positive: true, color: 'blue' },
        { icon: TrendingUp, label: 'معدل تجديد واستمرارية العضويات', value: '96.8%', change: '+2.8%', positive: true, color: 'orange' },
    ];

    return (
        <div style={{ direction: 'rtl', minHeight: '100%', paddingBottom: 40 }}>
            <div className="page-header" style={{ marginBottom: 24 }}>
                <div>
                    <h1 className="page-title" style={{ fontSize: '1.8rem', fontWeight: 800 }}>
                        التقارير الإحصائية والتحليلات
                    </h1>
                    <p className="page-subtitle" style={{ fontSize: '0.92rem' }}>
                        مؤشرات الأداء المالي، التشغيلي، ومعدلات إشغال مرافق مركز التنمية الشبابية بالتجمع الأول
                    </p>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        style={{
                            padding: '8px 14px',
                            borderRadius: 10,
                            fontSize: '0.85rem',
                            background: isDark ? '#161b22' : '#f8fafc',
                            border: isDark ? '1px solid #30363d' : '1px solid #cbd5e1',
                            color: isDark ? '#ffffff' : '#0f172a',
                            outline: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="7days">آخر 7 أيام</option>
                        <option value="30days">آخر 30 يوماً</option>
                        <option value="3months">الربع سنوي الحالي</option>
                        <option value="12months">العام المالي 2025 - 2026</option>
                    </select>
                    <button className="btn btn-secondary" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        fontWeight: 600,
                        color: isDark ? '#ffffff' : '#0f172a',
                        border: isDark ? '1px solid #374151' : '1px solid #cbd5e1'
                    }}>
                        <Download size={16} /> تصدير التقرير (Excel / PDF)
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 16, marginBottom: 28 }}>
                {stats.map((stat, i) => (
                    <div
                        className="stat-card"
                        key={stat.label}
                        style={{
                            opacity: animatedStats ? 1 : 0,
                            transform: animatedStats ? 'translateY(0)' : 'translateY(20px)',
                            transition: `all 0.4s ease ${i * 0.08}s`,
                            background: isDark ? '#0d1117' : '#ffffff',
                            border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
                            borderRadius: 16,
                            padding: 20
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div className={`stat-icon ${stat.color}`}>
                                <stat.icon size={22} />
                            </div>
                            <span className={`stat-change ${stat.positive ? 'positive' : 'negative'}`} style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                                {stat.change.startsWith('-') ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
                                {stat.change}
                            </span>
                        </div>
                        <div className="stat-value" style={{ fontSize: '1.55rem', fontWeight: 800, marginTop: 12, color: isDark ? '#ffffff' : '#0f172a' }}>
                            {stat.value}
                        </div>
                        <div className="stat-label" style={{ fontSize: '0.85rem', color: isDark ? '#94a3b8' : '#64748b', marginTop: 4 }}>
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* Revenue + Member Growth Charts */}
            <div className="grid-2" style={{ marginBottom: 32, gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 20 }}>
                {/* Revenue Trend */}
                <div className="card" style={{
                    background: isDark ? '#0d1117' : '#ffffff',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
                    borderRadius: 16,
                    padding: 20,
                    minWidth: 0,
                    overflow: 'hidden'
                }}>
                    <div className="card-header" style={{ marginBottom: 16 }}>
                        <div>
                            <div className="card-title" style={{ fontSize: '1.05rem', fontWeight: 800, color: isDark ? '#ffffff' : '#0f172a' }}>
                                مسار الإيرادات الشهرية بالجنيه المصري
                            </div>
                            <div className="card-subtitle" style={{ fontSize: '0.82rem' }}>
                                تحصيلات الاشتراكات والرعايات بالملايين خلال آخر 12 شهراً
                            </div>
                        </div>
                    </div>
                    <div style={{ height: 260, width: '100%', minWidth: 0 }}>
                        <ResponsiveContainer width="99%" height={260} minWidth={300} minHeight={260}>
                            <AreaChart data={revenueData}>
                                <defs>
                                    <linearGradient id="reportsRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                                <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}م`} />
                                <Tooltip
                                    contentStyle={{
                                        background: isDark ? '#161b22' : '#ffffff',
                                        border: isDark ? '1px solid #30363d' : '1px solid #e2e8f0',
                                        borderRadius: 10,
                                        color: isDark ? '#ffffff' : '#0f172a',
                                        fontSize: '0.82rem',
                                        direction: 'rtl'
                                    }}
                                    formatter={(v: number) => [`${v.toLocaleString()} ج.م`, 'الإيراد الشهري']}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2.5} fill="url(#reportsRev)" isAnimationActive={false} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Member Growth */}
                <div className="card" style={{
                    background: isDark ? '#0d1117' : '#ffffff',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
                    borderRadius: 16,
                    padding: 20,
                    minWidth: 0,
                    overflow: 'hidden'
                }}>
                    <div className="card-header" style={{ marginBottom: 16 }}>
                        <div>
                            <div className="card-title" style={{ fontSize: '1.05rem', fontWeight: 800, color: isDark ? '#ffffff' : '#0f172a' }}>
                                نمو قاعدة الأعضاء والرياضيين
                            </div>
                            <div className="card-subtitle" style={{ fontSize: '0.82rem' }}>
                                إجمالي العضويات المفعلة شهرياً بالتجمع الأول
                            </div>
                        </div>
                    </div>
                    <div style={{ height: 260, width: '100%', minWidth: 0 }}>
                        <ResponsiveContainer width="99%" height={260} minWidth={300} minHeight={260}>
                            <BarChart data={memberGrowthData}>
                                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                                <YAxis stroke="#6b7280" fontSize={12} />
                                <Tooltip
                                    contentStyle={{
                                        background: isDark ? '#161b22' : '#ffffff',
                                        border: isDark ? '1px solid #30363d' : '1px solid #e2e8f0',
                                        borderRadius: 10,
                                        color: isDark ? '#ffffff' : '#0f172a',
                                        fontSize: '0.82rem',
                                        direction: 'rtl'
                                    }}
                                    formatter={(v: number) => [`${v} عضو مسجل`, 'إجمالي الأعضاء']}
                                />
                                <Bar dataKey="members" fill="#2563eb" radius={[6, 6, 0, 0]} isAnimationActive={false} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Bottom Row: Facility Utilization Table + Distribution Pie */}
            <div className="grid-2" style={{ gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: 20 }}>
                {/* Facility Table */}
                <div className="card" style={{
                    background: isDark ? '#0d1117' : '#ffffff',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
                    borderRadius: 16,
                    padding: 20
                }}>
                    <div className="card-title" style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: 16, color: isDark ? '#ffffff' : '#0f172a' }}>
                        تقرير كفاءة وتشغيل المنشآت الأولمبية
                    </div>
                    <div className="table-container" style={{ border: 'none', overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
                            <thead>
                                <tr style={{
                                    borderBottom: isDark ? '1px solid #21262d' : '1px solid #e2e8f0',
                                    color: isDark ? '#94a3b8' : '#64748b',
                                    fontSize: '0.82rem'
                                }}>
                                    <th style={{ padding: '10px 8px', fontWeight: 600 }}>المنشأة الرياضية</th>
                                    <th style={{ padding: '10px 8px', fontWeight: 600 }}>نسبة التشغيل</th>
                                    <th style={{ padding: '10px 8px', fontWeight: 600 }}>الحصص / التدريبات</th>
                                    <th style={{ padding: '10px 8px', fontWeight: 600 }}>العائد المالي</th>
                                </tr>
                            </thead>
                            <tbody>
                                {facilityData.map((f) => (
                                    <tr key={f.name} style={{
                                        borderBottom: isDark ? '1px solid #161b22' : '1px solid #f1f5f9',
                                    }}>
                                        <td style={{ padding: '12px 8px', fontWeight: 700, color: isDark ? '#ffffff' : '#0f172a', fontSize: '0.88rem' }}>
                                            {f.name}
                                        </td>
                                        <td style={{ padding: '12px 8px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <div style={{ width: 80, height: 6, borderRadius: 3, background: isDark ? '#21262d' : '#e2e8f0', overflow: 'hidden' }}>
                                                    <div style={{ width: `${f.utilization}%`, height: '100%', background: f.utilization > 85 ? '#10b981' : '#2563eb' }} />
                                                </div>
                                                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: f.utilization > 85 ? '#10b981' : '#2563eb' }}>{f.utilization}%</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '12px 8px', fontSize: '0.84rem', color: isDark ? '#cbd5e1' : '#334155' }}>
                                            {f.bookings} حصة
                                        </td>
                                        <td style={{ padding: '12px 8px', fontWeight: 700, color: isDark ? '#ffffff' : '#0f172a', fontSize: '0.86rem' }}>
                                            {f.revenue}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Activity Pie */}
                <div className="card" style={{
                    background: isDark ? '#0d1117' : '#ffffff',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
                    borderRadius: 16,
                    padding: 20
                }}>
                    <div className="card-title" style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: 14, color: isDark ? '#ffffff' : '#0f172a' }}>
                        توزيع إقبال الأعضاء حسب اللعبة
                    </div>
                    <div style={{ height: 200, width: '100%', minWidth: 0 }}>
                        <ResponsiveContainer width="99%" height={200} minWidth={200} minHeight={200}>
                            <PieChart>
                                <Pie
                                    data={activityDist}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={45}
                                    outerRadius={75}
                                    paddingAngle={4}
                                    dataKey="value"
                                    isAnimationActive={false}
                                >
                                    {activityDist.map((entry) => (
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
                                        direction: 'rtl'
                                    }}
                                    formatter={(v: number) => [`${v}% من الأعضاء`, 'النسبة']}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
                        {activityDist.map((a) => (
                            <div key={a.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: a.color }} />
                                    <span style={{ color: isDark ? '#cbd5e1' : '#334155' }}>{a.name}</span>
                                </div>
                                <span style={{ fontWeight: 700, color: isDark ? '#ffffff' : '#0f172a' }}>{a.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
