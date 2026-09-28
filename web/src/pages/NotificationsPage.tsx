import { useState, useEffect } from 'react';
import {
    Bell, CheckCheck, Calendar, CreditCard, AlertTriangle,
    UserPlus, Settings, Info, Trash2
} from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

type NotifCategory = 'all' | 'bookings' | 'payments' | 'system' | 'members';

interface Notification {
    id: string;
    title: string;
    message: string;
    time: string;
    category: Exclude<NotifCategory, 'all'>;
    read: boolean;
    icon: 'calendar' | 'credit' | 'alert' | 'user' | 'settings' | 'info';
}

const initialNotifications: Notification[] = [
    {
        id: '1',
        title: 'تأكيد حجز الملعب القانوني A',
        message: 'تم تأكيد حجزك لملعب كرة القدم القانوني A ليوم الخميس الساعة 06:00 مساءً بنجاح.',
        time: 'منذ 5 دقائق',
        category: 'bookings',
        read: false,
        icon: 'calendar'
    },
    {
        id: '2',
        title: 'تحصيل دفعة رعاية أولمبية',
        message: 'تم استلام دفعة عقد رعاية شركة السويدي إلكتريك بمبلغ 12,000,000 ج.م وتسجيلها في الحساب.',
        time: 'منذ ساعة',
        category: 'payments',
        read: false,
        icon: 'credit'
    },
    {
        id: '3',
        title: 'عضوية VIP جديدة',
        message: 'انضم المستشار محمود عبد الرحمن الفقي إلى المركز بالعضوية العائلية الماسية الدائمة.',
        time: 'منذ ساعتين',
        category: 'members',
        read: false,
        icon: 'user'
    },
    {
        id: '4',
        title: 'تنبيه صيانة المجمع الأولمبي',
        message: 'توجيهات وزير الشباب والرياضة: أعمال الفحص الدوري لكفاءة محطات فلاتر مسبح التجمع الأول مستمرة.',
        time: 'منذ 3 ساعات',
        category: 'system',
        read: false,
        icon: 'alert'
    },
    {
        id: '5',
        title: 'تجديد اشتراك السباحة',
        message: 'تم تجديد اشتراك د. نورهان طارق عبد العزيز في أكاديمية السباحة الأولمبية بنجاح.',
        time: 'منذ 5 ساعات',
        category: 'members',
        read: true,
        icon: 'user'
    },
    {
        id: '6',
        title: 'إصدار فاتورة إلكترونية معتمدة',
        message: 'تم إصدار الفاتورة رقم INV-2026-082 لبنك مصر عن حقوق رعاية مجمع البادل والمركز الإعلامي.',
        time: 'منذ 8 ساعات',
        category: 'payments',
        read: true,
        icon: 'credit'
    },
    {
        id: '7',
        title: 'طلب حجز ملاعب البادل',
        message: 'طلب م. أحمد مصطفى الشناوي حجز ملعب البادل الزجاجي رقم 2 ليوم الجمعة 07:00 مساءً.',
        time: 'منذ يوم',
        category: 'bookings',
        read: true,
        icon: 'calendar'
    },
    {
        id: '8',
        title: 'إشعار استحقاق تجديد العضوية',
        message: 'عضوية أ. ياسمين خالد المنشاوي تنتهي خلال 7 أيام، تم إرسال إشعار التجديد التلقائي.',
        time: 'منذ يومين',
        category: 'members',
        read: true,
        icon: 'info'
    }
];

const categoryFilters: { key: NotifCategory; label: string }[] = [
    { key: 'all', label: 'كافة الإشعارات' },
    { key: 'bookings', label: 'الحجوزات والأنشطة' },
    { key: 'payments', label: 'المدفوعات والميزانية' },
    { key: 'members', label: 'شؤون الأعضاء' },
    { key: 'system', label: 'تنبيهات النظام والوزارة' },
];

const iconMap: Record<string, React.ElementType> = {
    calendar: Calendar,
    credit: CreditCard,
    alert: AlertTriangle,
    user: UserPlus,
    settings: Settings,
    info: Info,
};

const iconColorMap: Record<string, string> = {
    calendar: 'blue',
    credit: 'green',
    alert: 'orange',
    user: 'purple',
    settings: 'pink',
    info: 'blue',
};

export default function NotificationsPage() {
    const theme = useThemeStore((state) => state.theme);
    const isDark = theme === 'dark';

    const [notifications, setNotifications] = useState(initialNotifications);
    const [activeFilter, setActiveFilter] = useState<NotifCategory>('all');
    const [animateCards, setAnimateCards] = useState(false);

    useEffect(() => {
        setAnimateCards(false);
        const t = setTimeout(() => setAnimateCards(true), 50);
        return () => clearTimeout(t);
    }, [activeFilter]);

    const filtered = activeFilter === 'all'
        ? notifications
        : notifications.filter((n) => n.category === activeFilter);

    const unreadCount = notifications.filter((n) => !n.read).length;

    const markAsRead = (id: string) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
    };

    const markAllAsRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    };

    const deleteNotification = (id: string) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    return (
        <div style={{ direction: 'rtl', minHeight: '100%', paddingBottom: 40 }}>
            <div className="page-header" style={{ marginBottom: 24 }}>
                <div>
                    <h1 className="page-title" style={{ fontSize: '1.8rem', fontWeight: 800 }}>
                        مركز الإشعارات والتنبيهات
                    </h1>
                    <p className="page-subtitle" style={{ fontSize: '0.92rem' }}>
                        لديك {unreadCount} إشعار غير مقروء في سجل التنبيهات
                    </p>
                </div>
                {unreadCount > 0 && (
                    <button className="btn btn-secondary" onClick={markAllAsRead} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        fontWeight: 600,
                        color: isDark ? '#ffffff' : '#0f172a',
                        border: isDark ? '1px solid #374151' : '1px solid #cbd5e1'
                    }}>
                        <CheckCheck size={16} /> تحديد الكل كمقروء
                    </button>
                )}
            </div>

            {/* Stats Row */}
            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
                <div className="stat-card" style={{ background: isDark ? '#0d1117' : '#ffffff', border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2e8f0', borderRadius: 16, padding: 20 }}>
                    <div className="stat-icon purple"><Bell size={22} /></div>
                    <div className="stat-value" style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: 10, color: isDark ? '#ffffff' : '#0f172a' }}>{unreadCount}</div>
                    <div className="stat-label" style={{ fontSize: '0.86rem', color: isDark ? '#94a3b8' : '#64748b' }}>إشعارات جديدة غير مقروءة</div>
                </div>
                <div className="stat-card" style={{ background: isDark ? '#0d1117' : '#ffffff', border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2e8f0', borderRadius: 16, padding: 20 }}>
                    <div className="stat-icon blue"><Info size={22} /></div>
                    <div className="stat-value" style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: 10, color: isDark ? '#ffffff' : '#0f172a' }}>
                        {notifications.filter((n) => n.time.includes('دقائق') || n.time.includes('ساع')).length}
                    </div>
                    <div className="stat-label" style={{ fontSize: '0.86rem', color: isDark ? '#94a3b8' : '#64748b' }}>إشعارات اليوم</div>
                </div>
                <div className="stat-card" style={{ background: isDark ? '#0d1117' : '#ffffff', border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2e8f0', borderRadius: 16, padding: 20 }}>
                    <div className="stat-icon green"><CheckCheck size={22} /></div>
                    <div className="stat-value" style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: 10, color: isDark ? '#ffffff' : '#0f172a' }}>{notifications.length}</div>
                    <div className="stat-label" style={{ fontSize: '0.86rem', color: isDark ? '#94a3b8' : '#64748b' }}>إجمالي التنبيهات المؤرشفة</div>
                </div>
            </div>

            {/* Filter Pills */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
                {categoryFilters.map((f) => (
                    <button
                        key={f.key}
                        onClick={() => setActiveFilter(f.key)}
                        style={{
                            padding: '8px 16px',
                            borderRadius: 10,
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            background: activeFilter === f.key ? '#2563eb' : isDark ? '#161b22' : '#f1f5f9',
                            color: activeFilter === f.key ? '#ffffff' : isDark ? '#94a3b8' : '#475569'
                        }}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {/* Notifications List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {filtered.map((notif, i) => {
                    const IconComponent = iconMap[notif.icon];
                    return (
                        <div
                            key={notif.id}
                            style={{
                                padding: 16,
                                borderRadius: 14,
                                background: isDark
                                    ? (notif.read ? '#0d1117' : '#161b22')
                                    : (notif.read ? '#ffffff' : '#f0f7ff'),
                                border: isDark
                                    ? (notif.read ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(37, 99, 235, 0.3)')
                                    : (notif.read ? '1px solid #e2e8f0' : '1px solid #bfdbfe'),
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 14,
                                transition: 'all 0.2s'
                            }}
                        >
                            <div className={`stat-icon ${iconColorMap[notif.icon]}`} style={{ width: 40, height: 40, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <IconComponent size={20} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <span style={{ fontWeight: 800, fontSize: '0.94rem', color: isDark ? '#ffffff' : '#0f172a' }}>
                                            {notif.title}
                                        </span>
                                        {!notif.read && (
                                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#2563eb' }} />
                                        )}
                                    </div>
                                    <span style={{ fontSize: '0.78rem', color: isDark ? '#94a3b8' : '#64748b' }}>
                                        {notif.time}
                                    </span>
                                </div>
                                <p style={{ fontSize: '0.86rem', color: isDark ? '#cbd5e1' : '#475569', margin: '4px 0 10px 0', lineHeight: 1.5 }}>
                                    {notif.message}
                                </p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{
                                        fontSize: '0.74rem',
                                        padding: '2px 8px',
                                        borderRadius: 6,
                                        fontWeight: 600,
                                        background: isDark ? 'rgba(37, 99, 235, 0.15)' : '#eff6ff',
                                        color: '#3b82f6'
                                    }}>
                                        {notif.category === 'bookings' ? 'حجوزات' : notif.category === 'payments' ? 'مالية' : notif.category === 'members' ? 'أعضاء' : 'نظام'}
                                    </span>
                                    <div style={{ display: 'flex', gap: 8 }}>
                                        {!notif.read && (
                                            <button
                                                className="btn btn-secondary btn-sm"
                                                onClick={() => markAsRead(notif.id)}
                                                style={{ fontSize: '0.76rem', padding: '4px 8px', display: 'flex', alignItems: 'center', gap: 4 }}
                                            >
                                                <CheckCheck size={13} /> تحديد كمقروء
                                            </button>
                                        )}
                                        <button
                                            className="btn btn-danger btn-sm"
                                            style={{ padding: '4px 8px' }}
                                            onClick={() => deleteNotification(notif.id)}
                                        >
                                            <Trash2 size={13} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
