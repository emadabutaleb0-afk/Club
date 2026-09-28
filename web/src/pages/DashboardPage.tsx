import { Users, DollarSign, Calendar, TrendingUp, ArrowUpRight, ArrowDownRight, CreditCard, Activity, Coins } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { motion } from 'framer-motion';
import { useThemeStore } from '../store/themeStore';

// Mock data in Millions EGP
const revenueData = [
    { month: 'أغسطس', revenue: 3200000, fees: 64000 },
    { month: 'سبتمبر', revenue: 3600000, fees: 72000 },
    { month: 'أكتوبر', revenue: 4100000, fees: 82000 },
    { month: 'نوفمبر', revenue: 4500000, fees: 90000 },
    { month: 'ديسمبر', revenue: 4800000, fees: 96000 },
    { month: 'يناير', revenue: 5200000, fees: 104000 },
    { month: 'فبراير', revenue: 5900000, fees: 118000 },
];

const bookingData = [
    { day: 'السبت', bookings: 94 },
    { day: 'الأحد', bookings: 76 },
    { day: 'الإثنين', bookings: 68 },
    { day: 'الثلاثاء', bookings: 82 },
    { day: 'الأربعاء', bookings: 74 },
    { day: 'الخميس', bookings: 112 },
    { day: 'الجمعة', bookings: 145 },
];

const recentMembers = [
    { name: 'المستشار محمود عبد الرحمن الفقي', email: 'm.elfeki@justice.gov.eg', plan: 'عضوية ماسية دائمـة (VIP)', status: 'active', joined: 'منذ يومين' },
    { name: 'م. أحمد مصطفى الشناوي', email: 'a.elshinawy@orascom.com', plan: 'عضوية عائلية أولمبية', status: 'active', joined: 'منذ ٣ أيام' },
    { name: 'د. نورهان طارق عبد العزيز', email: 'nourhan.tarek@aucegypt.edu', plan: 'أكاديمية السباحة الدولية', status: 'pending', joined: 'منذ ٥ أيام' },
    { name: 'أ. مروة حسن عبد الله', email: 'marwa.abdallah@cibeg.com', plan: 'اللياقة البدنية والبادل', status: 'active', joined: 'منذ أسبوع' },
    { name: 'ك. إبراهيم كمال السعدني', email: 'coach.saadany@clubhub.eg', plan: 'طاقم التدريب الفني المعتمد', status: 'active', joined: 'منذ أسبوعين' },
];

const announcements = [
    {
        title: 'توجيهات معالي وزير الشباب والرياضة',
        body: 'المتابعة الدورية لأعمال الصيانة والتشغيل بمجمع حمامات السباحة الأولمبي والملاعب وفق أعلى معايير الجودة العالمية.',
        date: '10 فبراير',
        pinned: true
    },
    {
        title: 'فتح باب التسجيل لأكاديميات التنس والبادل',
        body: 'بدء استقبال طلبات الاشتراك للموسم الصيفي والربيعي تحت إشراف نخبة من المدربين المعتمدين دولياً.',
        date: '8 فبراير',
        pinned: false
    },
    {
        title: 'انطلاق دوري القاهرة الجديدة لكرة القدم',
        body: 'القرعة الرسمية لبطولة الناشئين على الملاعب القانونية المغطاة بالنجيل الصناعي المعتمد من الفيفا.',
        date: '5 فبراير',
        pinned: false
    },
];

const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05
        }
    }
};

const itemVariants = {
    hidden: { opacity: 1, y: 0 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.2
        }
    }
} as const;

export default function DashboardPage() {
    const theme = useThemeStore((state) => state.theme);
    const isDark = theme === 'dark';

    const stats = [
        { icon: Users, label: 'إجمالي الأعضاء والرياضيين', value: '3,850', change: '+14.2%', positive: true, color: 'purple' },
        { icon: Coins, label: 'الإيراد الشهري المعتمد', value: '5,900,000 ج.م', change: '+18.3%', positive: true, color: 'green' },
        { icon: Calendar, label: 'الحجوزات هذا الشهر', value: '651', change: '+22.5%', positive: true, color: 'blue' },
        { icon: CreditCard, label: 'صندوق صيانة المنشآت (2%)', value: '118,000 ج.م', change: '', positive: true, color: 'orange' },
        { icon: TrendingUp, label: 'معدل تجديد العضويات', value: '96.8%', change: '+3.4%', positive: true, color: 'pink' },
        { icon: Activity, label: 'الممارسون بالصالات الآن', value: '142', change: '', positive: true, color: 'blue' },
    ];

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            style={{ direction: 'rtl', minHeight: '100%', paddingBottom: 40 }}
        >
            <div className="page-header" style={{ marginBottom: 24 }}>
                <div>
                    <h1 className="page-title" style={{ fontSize: '1.8rem', fontWeight: 800 }}>
                        لوحة المتابعة الإدارية والرياضية
                    </h1>
                    <p className="page-subtitle" style={{ fontSize: '0.92rem' }}>
                        مرحباً بك! مؤشرات الأداء الحية لمركز التنمية الشبابية بالتجمع الأول
                    </p>
                </div>
                <button className="btn btn-primary" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)'
                }}>
                    <Calendar size={16} /> حجز منشأة فورية
                </button>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 28 }}>
                {stats.map((stat) => (
                    <motion.div
                        className="stat-card"
                        key={stat.label}
                        variants={itemVariants}
                        style={{
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
                            {stat.change && (
                                <span className={`stat-change ${stat.positive ? 'positive' : 'negative'}`} style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                                    {stat.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                    {stat.change}
                                </span>
                            )}
                        </div>
                        <div className="stat-value" style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: 12, color: isDark ? '#ffffff' : '#0f172a' }}>
                            {stat.value}
                        </div>
                        <div className="stat-label" style={{ fontSize: '0.86rem', color: isDark ? '#94a3b8' : '#64748b', marginTop: 4 }}>
                            {stat.label}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Charts Row */}
            <motion.div className="grid-2" style={{ marginBottom: 32, gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 20 }} variants={itemVariants}>
                <div className="card" style={{
                    background: isDark ? '#0d1117' : '#ffffff',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
                    borderRadius: 16,
                    padding: 20
                }}>
                    <div className="card-header" style={{ marginBottom: 16 }}>
                        <div>
                            <div className="card-title" style={{ fontSize: '1.05rem', fontWeight: 800, color: isDark ? '#ffffff' : '#0f172a' }}>
                                تدفق الإيرادات الشهرية (بالملايين)
                            </div>
                            <div className="card-subtitle" style={{ fontSize: '0.82rem' }}>
                                حجم الإيرادات الشهرية بالجنيه المصري واستقطاع 2% للصيانة
                            </div>
                        </div>
                    </div>
                    <div className="chart-container" style={{ height: 260, width: '100%', minWidth: 0, overflow: 'hidden' }}>
                        <ResponsiveContainer width="99%" height={260} minWidth={300} minHeight={260}>
                            <AreaChart data={revenueData}>
                                <defs>
                                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} />
                                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
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
                                    formatter={(value: number) => [`${(value).toLocaleString()} ج.م`, 'الإيراد']}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2.5} fill="url(#revenueGradient)" name="الإيرادات" isAnimationActive={false} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

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
                                معدل إشغال المنشآت الرياضية أسبوعياً
                            </div>
                            <div className="card-subtitle" style={{ fontSize: '0.82rem' }}>
                                عدد الحصص والتدريبات المنفذة على مدار أيام الأسبوع
                            </div>
                        </div>
                    </div>
                    <div className="chart-container" style={{ height: 260, width: '100%', minWidth: 0, overflow: 'hidden' }}>
                        <ResponsiveContainer width="99%" height={260} minWidth={300} minHeight={260}>
                            <BarChart data={bookingData}>
                                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                                <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
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
                                    formatter={(value: number) => [`${value} تدريب / حجز`, 'الحجوزات']}
                                />
                                <Bar dataKey="bookings" fill="#3b82f6" radius={[6, 6, 0, 0]} name="الحجوزات" isAnimationActive={false} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </motion.div>

            {/* Bottom Row: Recent Members + Official Announcements */}
            <motion.div className="grid-2" style={{ gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: 20 }} variants={itemVariants}>
                <div className="card" style={{
                    background: isDark ? '#0d1117' : '#ffffff',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
                    borderRadius: 16,
                    padding: 20
                }}>
                    <div className="card-header" style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className="card-title" style={{ fontSize: '1.05rem', fontWeight: 800, color: isDark ? '#ffffff' : '#0f172a' }}>
                            أحدث الأعضاء المنضمين للمركز
                        </div>
                        <a href="/members" className="btn btn-secondary btn-sm" style={{
                            fontSize: '0.78rem',
                            padding: '6px 12px',
                            borderRadius: 8,
                            color: isDark ? '#ffffff' : '#0f172a',
                            border: isDark ? '1px solid #374151' : '1px solid #cbd5e1'
                        }}>
                            عرض كافة الأعضاء
                        </a>
                    </div>
                    <div className="table-container" style={{ border: 'none', overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
                            <thead>
                                <tr style={{
                                    borderBottom: isDark ? '1px solid #21262d' : '1px solid #e2e8f0',
                                    color: isDark ? '#94a3b8' : '#64748b',
                                    fontSize: '0.82rem'
                                }}>
                                    <th style={{ padding: '10px 8px', fontWeight: 600 }}>اسم العضو</th>
                                    <th style={{ padding: '10px 8px', fontWeight: 600 }}>نوع الاشتراك</th>
                                    <th style={{ padding: '10px 8px', fontWeight: 600 }}>الحالة</th>
                                    <th style={{ padding: '10px 8px', fontWeight: 600 }}>تاريخ الانضمام</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentMembers.map((m) => (
                                    <tr key={m.email} style={{
                                        borderBottom: isDark ? '1px solid #161b22' : '1px solid #f1f5f9',
                                    }}>
                                        <td style={{ padding: '12px 8px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                <div style={{
                                                    width: 34, height: 34, borderRadius: '50%',
                                                    background: 'linear-gradient(135deg, #2563eb, #7c3aed)', display: 'flex',
                                                    alignItems: 'center', justifyContent: 'center',
                                                    fontSize: '0.74rem', fontWeight: 800, color: 'white', flexShrink: 0
                                                }}>
                                                    {m.name.slice(0, 2)}
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: 700, color: isDark ? '#ffffff' : '#0f172a', fontSize: '0.86rem' }}>{m.name}</div>
                                                    <div style={{ fontSize: '0.74rem', color: isDark ? '#94a3b8' : '#64748b' }}>{m.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ padding: '12px 8px' }}>
                                            <span style={{
                                                fontSize: '0.78rem',
                                                padding: '3px 8px',
                                                borderRadius: 6,
                                                background: isDark ? 'rgba(37, 99, 235, 0.15)' : '#eff6ff',
                                                color: '#3b82f6',
                                                fontWeight: 600
                                            }}>
                                                {m.plan}
                                            </span>
                                        </td>
                                        <td style={{ padding: '12px 8px' }}>
                                            <span style={{
                                                fontSize: '0.76rem',
                                                padding: '2px 8px',
                                                borderRadius: 6,
                                                fontWeight: 700,
                                                background: m.status === 'active' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(245, 158, 11, 0.12)',
                                                color: m.status === 'active' ? '#10b981' : '#f59e0b'
                                            }}>
                                                {m.status === 'active' ? 'نشط' : 'قيد المراجعة'}
                                            </span>
                                        </td>
                                        <td style={{ padding: '12px 8px', fontSize: '0.8rem', color: isDark ? '#94a3b8' : '#64748b' }}>
                                            {m.joined}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="card" style={{
                    background: isDark ? '#0d1117' : '#ffffff',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
                    borderRadius: 16,
                    padding: 20
                }}>
                    <div className="card-header" style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className="card-title" style={{ fontSize: '1.05rem', fontWeight: 800, color: isDark ? '#ffffff' : '#0f172a' }}>
                            التعميمات والتوجيهات الإدارية
                        </div>
                        <button className="btn btn-secondary btn-sm" style={{
                            fontSize: '0.78rem',
                            padding: '6px 10px',
                            borderRadius: 8,
                            color: isDark ? '#ffffff' : '#0f172a',
                            border: isDark ? '1px solid #374151' : '1px solid #cbd5e1'
                        }}>
                            + تعميم جديد
                        </button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        {announcements.map((a) => (
                            <div key={a.title} style={{
                                padding: 14,
                                borderRadius: 12,
                                background: isDark ? '#161b22' : '#f8fafc',
                                border: isDark ? '1px solid #30363d' : '1px solid #e2e8f0',
                                transition: 'all 0.2s'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                                    {a.pinned && (
                                        <span style={{
                                            fontSize: '0.72rem',
                                            padding: '2px 8px',
                                            borderRadius: 6,
                                            fontWeight: 700,
                                            background: 'rgba(37, 99, 235, 0.15)',
                                            color: '#3b82f6'
                                        }}>
                                            📌 تعميم وزاري هام
                                        </span>
                                    )}
                                    <span style={{ fontSize: '0.76rem', color: isDark ? '#94a3b8' : '#64748b', marginRight: 'auto' }}>
                                        {a.date}
                                    </span>
                                </div>
                                <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 4, color: isDark ? '#ffffff' : '#0f172a' }}>
                                    {a.title}
                                </div>
                                <div style={{ fontSize: '0.8rem', color: isDark ? '#94a3b8' : '#475569', lineHeight: 1.5 }}>
                                    {a.body}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
