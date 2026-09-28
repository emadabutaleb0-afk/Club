import { useState, useEffect } from 'react';
import { CalendarDays, MapPin, Clock, Users, ChevronLeft, Star, Ticket } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

type Tab = 'upcoming' | 'past';

interface ClubEvent {
    id: string;
    title: string;
    description: string;
    date: string;
    dayNum: string;
    monthShort: string;
    time: string;
    location: string;
    capacity: number;
    registered: number;
    status: 'open' | 'full' | 'cancelled';
    category: string;
    featured: boolean;
    past: boolean;
}

const events: ClubEvent[] = [
    {
        id: '1',
        title: 'حفل تكريم أبطال الجمهورية والرواد الرياضيين السنوي',
        description: 'احتفالية كبرى لتكريم أبطال مركز التنمية الشبابية بالتجمع الأول الحاصلين على ميداليات وبطولات الجمهورية، وتوزيع دروع التميز بحضور قيادات وزارة الشباب والرياضة.',
        date: '28 فبراير 2026',
        dayNum: '28',
        monthShort: 'فبراير',
        time: '07:00 م – 10:30 م',
        location: 'المسرح الروماني والقاعة الملكية الكبرى',
        capacity: 350,
        registered: 295,
        status: 'open',
        category: 'احتفال رسمي',
        featured: true,
        past: false,
    },
    {
        id: '2',
        title: 'كأس الربيع لكرة القدم للناشئين (القاهرة الجديدة)',
        description: 'بطولة كرة القدم الرسمية على الملاعب القانونية المغطاة بالنجيل المعتمد، تشمل منافسات فرق تحت 14 و 16 سنة بمشاركة أكاديميات وأندية المحافظة.',
        date: '15 - 16 مارس 2026',
        dayNum: '15',
        monthShort: 'مارس',
        time: '09:00 ص – 06:00 م',
        location: 'الملاعب القانونية والخماسية',
        capacity: 120,
        registered: 96,
        status: 'open',
        category: 'بطولات رياضية',
        featured: false,
        past: false,
    },
    {
        id: '3',
        title: 'مهرجان اليوم الرياضي والترفيهي للأسرة والطفل',
        description: 'يوم مفتوح حافل بالأنشطة العائلية، مسابقات التلي ماتش، عروض الجمباز الإيقاعي، وألعاب الأطفال المجانية لكافة أعضاء المركز ورواد التجمع الأول.',
        date: '22 مارس 2026',
        dayNum: '22',
        monthShort: 'مارس',
        time: '10:00 ص – 05:00 م',
        location: 'المسطحات الخضراء والمنطقة الترفيهية',
        capacity: 600,
        registered: 410,
        status: 'open',
        category: 'عائلي وترفيهي',
        featured: false,
        past: false,
    },
    {
        id: '4',
        title: 'بطولة الجمهورية التنشيطية للبادل والتنس الأرضي',
        description: 'منافسات الزوجي والفردي المفتوحة على ملاعب البادل الزجاجية الحديثة بمشاركة نخبة من لاعبي الأندية الرياضية المصرية.',
        date: '5 أبريل 2026',
        dayNum: '05',
        monthShort: 'أبريل',
        time: '04:00 م – 10:00 م',
        location: 'مجمع ملاعب البادل والتنس',
        capacity: 64,
        registered: 64,
        status: 'full',
        category: 'بطولات',
        featured: false,
        past: false,
    },
    {
        id: '5',
        title: 'سباق السباحة الأولمبية للمسافات القصيرة',
        description: 'تحدي السباحة الحرة وسباحة الصدر والظهر بمجمع حمامات السباحة الأولمبي لاكتشاف وتأهيل المواهب للانضمام لمنتخبات مصر القومية.',
        date: '12 أبريل 2026',
        dayNum: '12',
        monthShort: 'أبريل',
        time: '01:00 م – 06:00 م',
        location: 'مجمع حمامات السباحة الأولمبي',
        capacity: 160,
        registered: 115,
        status: 'open',
        category: 'رياضات مائية',
        featured: false,
        past: false,
    },
    // Past events
    {
        id: '6',
        title: 'ماراثون القاهرة الجديدة للجري والدراجات 2025',
        description: 'انطلاق السباق بمشاركة أكثر من 800 شاب وعائلة انطلاقاً من بوابة المركز بالتجمع الأول برعاية وزارة الشباب والرياضة.',
        date: '31 ديسمبر 2025',
        dayNum: '31',
        monthShort: 'ديسمبر',
        time: '07:00 ص – 12:00 م',
        location: 'المسار الخارجي وبوابة المركز الرئيسية',
        capacity: 800,
        registered: 790,
        status: 'full',
        category: 'ماراثون',
        featured: false,
        past: true,
    },
    {
        id: '7',
        title: 'نهائي دوري الشتاء لكرة القدم الخماسية',
        description: 'تتويج فريق نجوم التجمع بكأس البطولة بعد مباراة ملحمية في ختام الموسم الرياضي الشتوي.',
        date: '14 ديسمبر 2025',
        dayNum: '14',
        monthShort: 'ديسمبر',
        time: '05:00 م – 09:00 م',
        location: 'الملعب القانوني A',
        capacity: 400,
        registered: 380,
        status: 'full',
        category: 'رياضي',
        featured: false,
        past: true,
    }
];

const statusStyles: Record<string, { className: string; label: string }> = {
    open: { className: 'badge-success', label: 'التسجيل متاح' },
    full: { className: 'badge-warning', label: 'اكتمل العدد' },
    cancelled: { className: 'badge-error', label: 'ملغي' },
};

export default function EventsPage() {
    const theme = useThemeStore((state) => state.theme);
    const isDark = theme === 'dark';

    const [activeTab, setActiveTab] = useState<Tab>('upcoming');
    const [animateCards, setAnimateCards] = useState(false);

    useEffect(() => {
        setAnimateCards(false);
        const t = setTimeout(() => setAnimateCards(true), 50);
        return () => clearTimeout(t);
    }, [activeTab]);

    const filtered = events.filter((e) => (activeTab === 'upcoming' ? !e.past : e.past));
    const featured = activeTab === 'upcoming' ? filtered.find((e) => e.featured) : null;
    const rest = filtered.filter((e) => e !== featured);

    return (
        <div style={{ direction: 'rtl', minHeight: '100%', paddingBottom: 40 }}>
            {/* Header */}
            <div className="page-header" style={{ marginBottom: 24 }}>
                <div>
                    <h1 className="page-title" style={{ fontSize: '1.8rem', fontWeight: 800 }}>
                        الفعاليات والبطولات الرياضية
                    </h1>
                    <p className="page-subtitle" style={{ fontSize: '0.92rem' }}>
                        تعرف على أحدث الفعاليات والبطولات والمهرجانات في مركز التنمية الشبابية بالتجمع الأول
                    </p>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                    <button
                        className={`btn ${activeTab === 'upcoming' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setActiveTab('upcoming')}
                        style={{
                            fontWeight: 700,
                            color: activeTab === 'upcoming' ? '#ffffff' : isDark ? '#ffffff' : '#0f172a',
                            border: isDark ? '1px solid #374151' : '1px solid #cbd5e1'
                        }}
                    >
                        <CalendarDays size={16} /> الفعاليات القادمة
                    </button>
                    <button
                        className={`btn ${activeTab === 'past' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setActiveTab('past')}
                        style={{
                            fontWeight: 700,
                            color: activeTab === 'past' ? '#ffffff' : isDark ? '#ffffff' : '#0f172a',
                            border: isDark ? '1px solid #374151' : '1px solid #cbd5e1'
                        }}
                    >
                        <Clock size={16} /> الفعاليات السابقة
                    </button>
                </div>
            </div>

            {/* Featured / Next Up */}
            {featured && (
                <div
                    className="event-featured"
                    style={{
                        opacity: animateCards ? 1 : 0,
                        transform: animateCards ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 0.5s ease',
                        background: isDark ? '#0d1117' : '#ffffff',
                        border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
                        borderRadius: 20,
                        padding: 24,
                        marginBottom: 28,
                        boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.4)' : '0 4px 15px rgba(0,0,0,0.04)',
                        display: 'flex',
                        gap: 24,
                        flexWrap: 'wrap',
                        alignItems: 'center'
                    }}
                >
                    <div className="event-featured-left" style={{
                        background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                        color: '#ffffff',
                        padding: '24px 32px',
                        borderRadius: 16,
                        textAlign: 'center',
                        minWidth: 120
                    }}>
                        <div style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1 }}>{featured.dayNum}</div>
                        <div style={{ fontSize: '1rem', fontWeight: 700, marginTop: 4 }}>{featured.monthShort}</div>
                    </div>
                    <div className="event-featured-right" style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                            <Star size={16} style={{ color: '#f59e0b' }} />
                            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#f59e0b', letterSpacing: '0.05em' }}>
                                الحدث الأبرز القادم
                            </span>
                            <span className={`badge ${statusStyles[featured.status].className}`} style={{ marginRight: 8 }}>
                                {statusStyles[featured.status].label}
                            </span>
                        </div>
                        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 8, color: isDark ? '#ffffff' : '#0f172a' }}>
                            {featured.title}
                        </h2>
                        <p style={{ color: isDark ? '#94a3b8' : '#64748b', marginBottom: 16, lineHeight: 1.6, fontSize: '0.9rem' }}>
                            {featured.description}
                        </p>
                        <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', fontSize: '0.85rem', color: isDark ? '#cbd5e1' : '#475569' }}>
                            <span><Clock size={14} style={{ verticalAlign: 'middle', marginLeft: 4 }} /> {featured.time}</span>
                            <span><MapPin size={14} style={{ verticalAlign: 'middle', marginLeft: 4 }} /> {featured.location}</span>
                            <span><Users size={14} style={{ verticalAlign: 'middle', marginLeft: 4 }} /> مسجل: {featured.registered} من {featured.capacity} مشارك</span>
                        </div>
                        <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
                            <button className="btn btn-primary" style={{
                                fontWeight: 700,
                                background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 6
                            }}>
                                <Ticket size={16} /> حجز تذكرة / تسجيل الحضور
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Events Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
                {rest.map((event, i) => (
                    <div
                        key={event.id}
                        style={{
                            opacity: animateCards ? 1 : 0,
                            transform: animateCards ? 'translateY(0)' : 'translateY(20px)',
                            transition: `all 0.4s ease ${(i + 1) * 0.07}s`,
                            background: isDark ? '#0d1117' : '#ffffff',
                            border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
                            borderRadius: 16,
                            padding: 20,
                            display: 'flex',
                            gap: 16,
                            boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 2px 10px rgba(0,0,0,0.03)'
                        }}
                    >
                        <div style={{
                            background: isDark ? '#161b22' : '#eff6ff',
                            color: '#2563eb',
                            borderRadius: 12,
                            padding: '12px 16px',
                            textAlign: 'center',
                            height: 'fit-content',
                            minWidth: 70,
                            border: isDark ? '1px solid #30363d' : '1px solid #bfdbfe'
                        }}>
                            <div style={{ fontSize: '1.6rem', fontWeight: 900, lineHeight: 1 }}>{event.dayNum}</div>
                            <div style={{ fontSize: '0.78rem', fontWeight: 700, marginTop: 4 }}>{event.monthShort}</div>
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                                <span style={{
                                    fontSize: '0.72rem',
                                    padding: '2px 8px',
                                    borderRadius: 6,
                                    fontWeight: 700,
                                    background: 'rgba(37, 99, 235, 0.1)',
                                    color: '#2563eb'
                                }}>
                                    {event.category}
                                </span>
                                <span className={`badge ${statusStyles[event.status].className}`}>
                                    {statusStyles[event.status].label}
                                </span>
                            </div>
                            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: 6, color: isDark ? '#ffffff' : '#0f172a' }}>
                                {event.title}
                            </h3>
                            <p style={{ fontSize: '0.82rem', color: isDark ? '#94a3b8' : '#64748b', lineHeight: 1.5, marginBottom: 12 }}>
                                {event.description}
                            </p>
                            <div style={{ fontSize: '0.78rem', color: isDark ? '#cbd5e1' : '#475569', display: 'flex', flexDirection: 'column', gap: 4 }}>
                                <span><Clock size={12} style={{ verticalAlign: 'middle', marginLeft: 4 }} /> {event.time}</span>
                                <span><MapPin size={12} style={{ verticalAlign: 'middle', marginLeft: 4 }} /> {event.location}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
