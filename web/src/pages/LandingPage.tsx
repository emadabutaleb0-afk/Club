import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Dumbbell, Users, Calendar, CreditCard, Shield, Zap,
    ArrowRight, Trophy, Waves, Target, Heart, Sun, Moon,
    Check, Sparkles, Phone, MapPin, Clock, Mail, Globe,
    ChevronDown, Play, Filter, Award, MessageSquare, Flame, ExternalLink,
    Star, Activity, Medal, CheckCircle2, Building2
} from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import { useLanguageStore } from '../store/languageStore';
import { t } from '../services/translations';
import { sportsPrograms, SportProgram } from '../services/mockData';
import { motion, AnimatePresence } from 'framer-motion';

import AiAssistantModal from '../components/AiAssistantModal';
import AiSportMatcherModal from '../components/AiSportMatcherModal';
import FeeCalculatorModal from '../components/FeeCalculatorModal';
import ComplaintsModal from '../components/ComplaintsModal';

interface FacilityHighlight {
    id: string;
    titleAr: string;
    titleEn: string;
    descAr: string;
    descEn: string;
    tagAr: string;
    tagEn: string;
    specsAr: string;
    specsEn: string;
    image: string;
    statusAr: string;
    statusEn: string;
    statusColor: string;
    icon: string;
}

const clubFacilities: FacilityHighlight[] = [
    {
        id: 'pool',
        titleAr: 'مجمع حمام السباحة الأولمبي',
        titleEn: 'Olympic Aquatics Complex',
        descAr: 'حوض أولمبي ٥٠ متر مجهز بأحدث أنظمة التدفئة والفلترة المائية، مع مدرجات للجماهير وحمام سباحة مخصص للأطفال والمبتدئين.',
        descEn: 'Olympic 50-meter pool equipped with cutting-edge heating and filtration, spectator stands, and a dedicated training pool for juniors.',
        tagAr: 'منشأة أولمبية دولية',
        tagEn: 'Olympic Standard',
        specsAr: '٥٠ متر • ١٠ حارات • نظام تدفئة • مدرج ١,٢٠٠ مقعد',
        specsEn: '50m • 10 Lanes • Heated • 1,200 Seats',
        image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=80',
        statusAr: 'مفتوح وجاهز للتدريب',
        statusEn: 'Open & Active',
        statusColor: '#10b981',
        icon: '🏊‍♂️'
    },
    {
        id: 'football',
        titleAr: 'استادات وملاعب كرة القدم',
        titleEn: 'FIFA Football Stadiums',
        descAr: 'ملعب قانوني مضاء بالكامل للبطولات والمباريات الرسمية، بالإضافة إلى ٣ ملاعب خماسية بنجيل صناعي معتمد للتدريب اليومي.',
        descEn: 'Full-sized floodlit match stadium plus three 5-a-side artificial turf pitches certified for daily academy drills and night matches.',
        tagAr: 'نجيل معتمد دولياً',
        tagEn: 'Certified Turf',
        specsAr: 'ملعب قانوني ١١ ضد ١١ + ٣ ملاعب خماسية مضاءة',
        specsEn: '11v11 Match Pitch + 3 Lighted 5-a-side Courts',
        image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
        statusAr: 'متاح للحجز والأكاديميات',
        statusEn: 'Available for Booking',
        statusColor: '#2563eb',
        icon: '⚽'
    },
    {
        id: 'indoor-arena',
        titleAr: 'الصالة المغطاة ومجمع الفنون القتالية',
        titleEn: 'Multi-Sport & Combat Arena',
        descAr: 'صالة ألعاب مغطاة ومكيفة بالكامل بأرضيات باركيه دولية لاستضافة مباريات كرة السلة، الطائرة، اليد، وبساط الكاراتيه والتايكوندو.',
        descEn: 'Air-conditioned multi-purpose arena with international parquet flooring hosting basketball, volleyball, handball, and martial arts tatami.',
        tagAr: 'صالة مكيفة بالكامل',
        tagEn: 'Air-Conditioned Arena',
        specsAr: 'أرضية باركيه دولية • ٤ أبسطة كاراتيه وتايكوندو',
        specsEn: 'International Parquet • 4 Combat Tatamis',
        image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=1200&q=80',
        statusAr: 'تدريبات أبطال الجمهورية',
        statusEn: 'Championship Training',
        statusColor: '#d97706',
        icon: '🥋'
    },
    {
        id: 'gym',
        titleAr: 'صالة اللياقة البدنية والحديد (الجيم الدولي)',
        titleEn: 'Elite Fitness & Gymnasium',
        descAr: 'صالة جيم متكاملة تضم أحدث أجهزة الكارديو وبناء الأجسام العالمية، مع منطقة ساونا وجاكوزي وإشراف مدربين معتمدين.',
        descEn: 'Full-service gymnasium featuring premium cardio and strength equipment, recovery sauna and steam zone, supervised by certified trainers.',
        tagAr: 'أحدث التجهيزات الرياضية',
        tagEn: 'State-of-the-Art Gear',
        specsAr: 'أجهزة أمريكية حديثة • صالة سبا واستشفاء • مدربين خاصين',
        specsEn: 'Modern Gym Stations • Recovery Spa • Personal Coaches',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
        statusAr: 'يومياً ٧ ص - ١١ م',
        statusEn: 'Daily 7 AM - 11 PM',
        statusColor: '#7c3aed',
        icon: '🏋️'
    },
    {
        id: 'padel-tennis',
        titleAr: 'مجمع ملاعب الباديل والتنس الأرضي',
        titleEn: 'Padel & Tennis Complex',
        descAr: 'أحدث ملاعب الباديل البانورامية الزجاجية المضاءة بكشافات LED عالمية، وملاعب تنس أرضي هارد كورت وفق معايير الاتحاد الدولي.',
        descEn: 'Panoramic glass padel courts with stadium-grade LED illumination, alongside professional hard-court tennis facilities.',
        tagAr: 'باديل بانوراما حديث',
        tagEn: 'Panoramic Padel Courts',
        specsAr: '٤ ملاعب باديل زجاجية + ٢ ملعب تنس أرضي مضاء',
        specsEn: '4 Glass Padel Courts + 2 Lit Tennis Courts',
        image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1200&q=80',
        statusAr: 'متاح للحجز الفوري',
        statusEn: 'Online Booking Open',
        statusColor: '#059669',
        icon: '🎾'
    },
    {
        id: 'social-park',
        titleAr: 'الحديقة الاجتماعية ومجمع العائلات والأطفال',
        titleEn: 'Family Social Club & Kids Zone',
        descAr: 'مساحات خضراء شاسعة مخصصة للأسر والعائلات، تضم منطقة ألعاب ترفيهية مؤمنة للأطفال، ومجموعة من الكافيهات والمطاعم المتميزة.',
        descEn: 'Extensive manicured green gardens for families, featuring a secure children playpark and high-quality dining outlets.',
        tagAr: 'بيئة عائلية آمنة',
        tagEn: 'Secure Family Park',
        specsAr: 'حدائق مفتوحة • كيدز إريا مؤمنة • مطاعم وكافيهات عائلية',
        specsEn: 'Open Gardens • Kids Fun Zone • Family Cafes',
        image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
        statusAr: 'استقبال العائلات يومياً',
        statusEn: 'Family Access Daily',
        statusColor: '#db2777',
        icon: '🌳'
    }
];

const upcomingEvents = [
    {
        id: 'e1',
        titleAr: 'بطولة منطقة القاهرة للسباحة القصيرة',
        titleEn: 'Cairo Regional Short-Course Swimming Championship',
        dateAr: '٥ أكتوبر ٢٠٢٦',
        dateEn: 'October 5, 2026',
        venueAr: 'مجمع حمام السباحة الأولمبي',
        venueEn: 'Olympic Pool Complex',
        categoryAr: 'بطولة رسمية',
        categoryEn: 'Official Championship',
        icon: '🏊‍♂️'
    },
    {
        id: 'e2',
        titleAr: 'دوري براعم التجمع الأول لكرة القدم',
        titleEn: 'First Settlement Youth Soccer League',
        dateAr: '٨ أكتوبر ٢٠٢٦',
        dateEn: 'October 8, 2026',
        venueAr: 'استاد النجيل الطبيعي الرئيسي',
        venueEn: 'Main Stadium',
        categoryAr: 'دوري الناشئين',
        categoryEn: 'Junior League',
        icon: '⚽'
    },
    {
        id: 'e3',
        titleAr: 'التصفيات التمهيدية لبطولة الجمهورية للكاراتيه',
        titleEn: 'National Karate Championship Qualifiers',
        dateAr: '١٢ أكتوبر ٢٠٢٦',
        dateEn: 'October 12, 2026',
        venueAr: 'الصالة المغطاة الكبرى',
        venueEn: 'Grand Indoor Arena',
        categoryAr: 'اتحاد الكاراتيه',
        categoryEn: 'Federation Qualifier',
        icon: '🥋'
    }
];

export default function LandingPage() {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useThemeStore();
    const { language, toggleLanguage, isRTL } = useLanguageStore();
    const trans = t[language];

    const isDark = theme === 'dark';

    // Modals visibility state
    const [isMatcherOpen, setIsMatcherOpen] = useState(() => typeof window !== 'undefined' && window.location.search.includes('openMatcher=1'));
    const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
    const [isComplaintsOpen, setIsComplaintsOpen] = useState(false);

    // Sports filter state
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [selectedSportForBooking, setSelectedSportForBooking] = useState<SportProgram | null>(null);
    const [bookingSuccessCode, setBookingSuccessCode] = useState<string | null>(null);

    const filteredSports = activeCategory === 'all'
        ? sportsPrograms
        : sportsPrograms.filter((s) => s.category === activeCategory);

    const handleQuickTrialBook = (sport: SportProgram) => {
        setSelectedSportForBooking(sport);
        setBookingSuccessCode(`TRIAL-${sport.id.toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`);
    };

    // Auto-scroll to section if requested in query or hash
    useState(() => {
        if (typeof window !== 'undefined' && (window.location.hash === '#academies' || window.location.search.includes('scroll=academies'))) {
            setTimeout(() => {
                const el = document.getElementById('academies');
                if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
            }, 300);
        }
    });

    return (
        <div
            className={`landing ${isRTL ? 'rtl-direction' : 'ltr-direction'}`}
            style={{
                minHeight: '100vh',
                position: 'relative',
                background: isDark ? '#000000' : '#ffffff',
                color: isDark ? '#ffffff' : '#0f172a',
                transition: 'background 0.25s ease, color 0.25s ease'
            }}
        >
            {/* ─── Dedicated Sports Activities Showcase View (when view=sports) ─── */}
            {typeof window !== 'undefined' && window.location.search.includes('view=sports') && (
                <section style={{ maxWidth: 1320, margin: '0 auto', padding: '32px 24px', background: isDark ? '#000000' : '#ffffff' }}>
                    <div style={{ textAlign: 'center', marginBottom: 28 }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 18px', borderRadius: '20px', background: isDark ? 'rgba(124, 58, 237, 0.2)' : '#faf5ff', color: isDark ? '#c084fc' : '#7c3aed', fontSize: '0.86rem', fontWeight: 800, marginBottom: 10 }}>
                            <Trophy size={16} />
                            قطاع النشاط والأكاديميات الرياضية المعتمدة
                        </div>
                        <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: isDark ? '#ffffff' : '#0f172a', margin: '0 0 10px' }}>
                            الأنشطة والأكاديميات الرياضية بمركز التنمية الشبابية بالتجمع الأول
                        </h2>
                        <p style={{ fontSize: '0.95rem', color: isDark ? '#cbd5e1' : '#475569', maxWidth: 740, margin: '0 auto' }}>
                            تدريبات معتمدة تحت إشراف نخبة من أبطال العالم والمدربين الدوليين لكافة الفئات العمرية
                        </p>
                    </div>

                    {/* Filter Tabs */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 26, flexWrap: 'wrap' }}>
                        {[
                            { id: 'all', label: 'كافة الأنشطة (14 لعبة)' },
                            { id: 'aquatics', label: 'المسبح الأولمبي' },
                            { id: 'racquet', label: 'التنس الأرضي والبادل' },
                            { id: 'ball', label: 'كرة القدم والسلة' },
                            { id: 'combat', label: 'الفنون القتالية' },
                            { id: 'fitness', label: 'اللياقة والجمباز' },
                        ].map((tab, idx) => (
                            <button
                                key={tab.id}
                                style={{
                                    padding: '7px 18px',
                                    borderRadius: '12px',
                                    border: `1.5px solid ${idx === 0 ? '#2563eb' : (isDark ? 'rgba(255, 255, 255, 0.12)' : '#cbd5e1')}`,
                                    background: idx === 0 ? 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)' : (isDark ? '#080a12' : '#ffffff'),
                                    color: idx === 0 ? 'white' : (isDark ? '#cbd5e1' : '#475569'),
                                    fontWeight: 800,
                                    fontSize: '0.84rem'
                                }}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                        {sportsPrograms.slice(0, 6).map((sport) => (
                            <div
                                key={sport.id}
                                style={{
                                    borderRadius: '18px',
                                    background: isDark ? '#0b0f19' : '#ffffff',
                                    border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e2e8f0',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <div style={{ position: 'relative', height: 160 }}>
                                    <img
                                        src={sport.image}
                                        alt={sport.titleAr}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    <span style={{ position: 'absolute', top: 10, right: 10, background: '#2563eb', color: '#fff', fontSize: '11px', fontWeight: 800, padding: '3px 10px', borderRadius: '6px' }}>
                                        {sport.tagAr}
                                    </span>
                                </div>
                                <div style={{ padding: '16px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: isDark ? '#fff' : '#0f172a' }}>{sport.titleAr}</h3>
                                        <span style={{ color: '#10b981', fontWeight: 800, fontSize: '0.9rem' }}>{sport.priceMonthlyAr}</span>
                                    </div>
                                    <p style={{ fontSize: '0.8rem', color: isDark ? '#94a3b8' : '#64748b', marginBottom: 10, lineHeight: 1.5 }}>{sport.descAr}</p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: isDark ? '#cbd5e1' : '#475569', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 8 }}>
                                        <span>👥 {sport.ageGroupAr}</span>
                                        <span style={{ color: '#3b82f6', fontWeight: 700 }}>سجل في الأكاديمية ⚡</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* ─── 1. Official Government & Club Super-Header ─── */}
            <div
                style={{
                    background: isDark ? '#06080f' : '#f8fafc',
                    color: isDark ? '#94a3b8' : '#334155',
                    padding: '8px 24px',
                    fontSize: '0.8rem',
                    borderBottom: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
                    position: 'relative',
                    zIndex: 950,
                    transition: 'all 0.25s ease'
                }}
            >
                <div style={{ maxWidth: 1320, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                    {/* Left: Republic & Ministry Badge */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ color: '#dc2626', fontWeight: 900, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                            <span>🇪🇬</span>
                            {language === 'ar' ? 'جمهورية مصر العربية' : 'Arab Republic of Egypt'}
                        </span>
                        <span style={{ color: isDark ? 'rgba(255,255,255,0.2)' : '#cbd5e1' }}>|</span>
                        <span style={{ color: isDark ? '#ffffff' : '#0f172a', fontWeight: 800 }}>
                            {language === 'ar' ? 'وزارة الشباب والرياضة' : 'Ministry of Youth & Sports'}
                        </span>
                        <span style={{ color: isDark ? 'rgba(255,255,255,0.2)' : '#cbd5e1' }}>|</span>
                        <span style={{ color: isDark ? '#94a3b8' : '#64748b', fontWeight: 600 }}>
                            {language === 'ar' ? 'مركز التنمية الشبابية بالتجمع الأول' : 'First Settlement Youth Center'}
                        </span>
                    </div>

                    {/* Right: Hotline, Working Hours & Language Switch */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: isDark ? '#38bdf8' : '#0284c7', fontWeight: 800 }}>
                            <Phone size={13} />
                            <span style={{ direction: 'ltr' }}>01013010137</span>
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: isDark ? '#94a3b8' : '#64748b' }}>
                            <Clock size={13} />
                            <span>{language === 'ar' ? 'يومياً ٧:٠٠ ص – ١١:٠٠ م' : '7:00 AM – 11:00 PM'}</span>
                        </span>
                        <button
                            onClick={toggleLanguage}
                            style={{
                                background: isDark ? 'rgba(255, 255, 255, 0.08)' : '#ffffff',
                                color: isDark ? '#ffffff' : '#0f172a',
                                border: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1.5px solid #cbd5e1',
                                borderRadius: '14px',
                                padding: '3px 12px',
                                fontSize: '0.76rem',
                                fontWeight: 800,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 4
                            }}
                        >
                            <Globe size={13} />
                            {language === 'ar' ? 'English' : 'العربية'}
                        </button>
                    </div>
                </div>
            </div>

            {/* ─── 2. Top Breaking News Alert Ticker (Ministerial Inspection 25 Sep 2026) ─── */}
            <div
                style={{
                    background: 'linear-gradient(90deg, #dc2626 0%, #b91c1c 100%)',
                    color: 'white',
                    padding: '8px 24px',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    boxShadow: '0 2px 10px rgba(220, 38, 38, 0.2)',
                    position: 'relative',
                    zIndex: 940
                }}
            >
                <div style={{ maxWidth: 1320, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 280 }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(0,0,0,0.25)', padding: '2px 10px', borderRadius: '10px', fontSize: '0.74rem', fontWeight: 900 }}>
                            <Flame size={14} color="#fef08a" />
                            {language === 'ar' ? 'بيان عاجل' : 'Alert'}
                        </span>
                        <span style={{ lineHeight: 1.4, fontSize: '0.82rem' }}>
                            {language === 'ar'
                                ? '🏛️ وزير الشباب والرياضة (جوهر نبيل) يتفقد مجمع حمام السباحة والجيم والمبنى الإداري بالتجمع الأول ويوجه برفع كفاءة المنشآت (٢٥ سبتمبر ٢٠٢٦)'
                                : '🏛️ Minister Gohar Nabil conducts surprise inspection of First Settlement Youth Center, pool & gym facilities (25 Sep 2026)'}
                        </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <a
                            href="#ministerial-news"
                            style={{
                                background: 'white',
                                color: '#b91c1c',
                                borderRadius: '18px',
                                padding: '3px 12px',
                                fontSize: '0.75rem',
                                fontWeight: 900,
                                textDecoration: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 4
                            }}
                        >
                            {language === 'ar' ? 'تفاصيل الجولة' : 'Read Inspection'}
                            <ArrowRight size={13} style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
                        </a>
                        <button
                            onClick={() => setIsCalculatorOpen(true)}
                            style={{
                                background: 'rgba(0,0,0,0.25)',
                                color: 'white',
                                border: '1px solid rgba(255,255,255,0.4)',
                                borderRadius: '18px',
                                padding: '3px 12px',
                                fontSize: '0.75rem',
                                fontWeight: 800,
                                cursor: 'pointer'
                            }}
                        >
                            {language === 'ar' ? 'تجديد اشتراكات ٢٠٢٦' : '2026 Renewal'}
                        </button>
                    </div>
                </div>
            </div>

            {/* ─── 3. Main Club Navigation Bar ─── */}
            <nav
                className="landing-nav"
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 900,
                    background: isDark ? 'rgba(6, 8, 15, 0.96)' : 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(16px)',
                    borderBottom: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
                    boxShadow: isDark ? '0 4px 20px rgba(0, 0, 0, 0.6)' : '0 2px 10px rgba(0, 0, 0, 0.04)',
                    transition: 'all 0.25s ease'
                }}
            >
                <div style={{ maxWidth: 1320, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 24px', gap: 16 }}>
                    {/* Club Brand Logo — ONLY the Title, Subtitle Removed! */}
                    <div
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}
                    >
                        <div
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: '12px',
                                background: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)',
                                flexShrink: 0
                            }}
                        >
                            <Trophy size={22} />
                        </div>
                        <span style={{ fontSize: '1.05rem', fontWeight: 900, color: isDark ? '#ffffff' : '#0f172a', whiteSpace: 'nowrap', lineHeight: 1.2 }}>
                            مركز التنمية الشبابية بالتجمع الأول
                        </span>
                    </div>

                    {/* Desktop Navigation Links — Concise, Single-Line, Clean Text */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0, whiteSpace: 'nowrap' }} className="landing-nav-links">
                        <a href="#about" style={{ cursor: 'pointer', color: isDark ? '#ffffff' : '#0f172a', fontWeight: 800, fontSize: '0.84rem', padding: '6px 10px', borderRadius: '8px', textDecoration: 'none' }}>
                            {trans.home}
                        </a>
                        <a href="#ministerial-news" style={{ cursor: 'pointer', color: '#ef4444', fontWeight: 800, fontSize: '0.84rem', padding: '6px 10px', borderRadius: '8px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                            <Flame size={13} />
                            {language === 'ar' ? 'جولة الوزير' : 'Minister Visit'}
                        </a>
                        <a href="#facilities" style={{ cursor: 'pointer', color: isDark ? '#cbd5e1' : '#334155', fontWeight: 700, fontSize: '0.84rem', padding: '6px 10px', borderRadius: '8px', textDecoration: 'none' }}>
                            {language === 'ar' ? 'المنشآت' : 'Facilities'}
                        </a>
                        <a href="#academies" style={{ cursor: 'pointer', color: isDark ? '#cbd5e1' : '#334155', fontWeight: 700, fontSize: '0.84rem', padding: '6px 10px', borderRadius: '8px', textDecoration: 'none' }}>
                            {language === 'ar' ? 'الأكاديميات' : 'Academies'}
                        </a>
                        <a href="#events" style={{ cursor: 'pointer', color: isDark ? '#cbd5e1' : '#334155', fontWeight: 700, fontSize: '0.84rem', padding: '6px 10px', borderRadius: '8px', textDecoration: 'none' }}>
                            {language === 'ar' ? 'البطولات' : 'Tournaments'}
                        </a>
                        <a
                            onClick={() => setIsMatcherOpen(true)}
                            style={{ cursor: 'pointer', color: isDark ? '#c084fc' : '#7c3aed', fontWeight: 800, fontSize: '0.84rem', padding: '6px 10px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                        >
                            <Sparkles size={14} />
                            {language === 'ar' ? 'مسارك (AI)' : 'AI Matcher'}
                        </a>
                        <a
                            onClick={() => navigate('/news')}
                            style={{ cursor: 'pointer', color: isDark ? '#cbd5e1' : '#334155', fontWeight: 700, fontSize: '0.84rem', padding: '6px 10px', borderRadius: '8px' }}
                        >
                            {language === 'ar' ? 'الأخبار' : 'News'}
                        </a>
                        <a
                            onClick={() => navigate('/public-gallery')}
                            style={{ cursor: 'pointer', color: isDark ? '#cbd5e1' : '#334155', fontWeight: 700, fontSize: '0.84rem', padding: '6px 10px', borderRadius: '8px' }}
                        >
                            {language === 'ar' ? 'معرض البطولات' : 'Gallery'}
                        </a>
                    </div>

                    {/* Navigation Actions — High Contrast "بوابة دخول الأعضاء" & "تجديد العضوية" */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                        <button
                            onClick={toggleTheme}
                            style={{
                                padding: '8px',
                                background: isDark ? 'rgba(255, 255, 255, 0.08)' : '#f1f5f9',
                                border: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid #cbd5e1',
                                borderRadius: '10px',
                                color: isDark ? '#fbbf24' : '#334155',
                                cursor: 'pointer'
                            }}
                            aria-label="Toggle Theme"
                        >
                            {isDark ? <Sun size={16} /> : <Moon size={16} />}
                        </button>

                        {/* Sign In Button — 100% Sharp, Legible & Highly Visible in both light & dark! */}
                        <button
                            onClick={() => navigate('/login')}
                            style={{
                                background: isDark ? 'rgba(255, 255, 255, 0.08)' : '#f8fafc',
                                color: isDark ? '#ffffff' : '#0f172a',
                                border: isDark ? '1.5px solid rgba(255, 255, 255, 0.25)' : '1.5px solid #cbd5e1',
                                borderRadius: '12px',
                                padding: '8px 16px',
                                fontSize: '0.84rem',
                                fontWeight: 800,
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.15s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.15)' : '#e2e8f0';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.08)' : '#f8fafc';
                            }}
                        >
                            {language === 'ar' ? 'بوابة دخول الأعضاء' : 'Member Sign In'}
                        </button>

                        {/* Renewal Button */}
                        <button
                            onClick={() => setIsCalculatorOpen(true)}
                            style={{
                                background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '12px',
                                padding: '8px 18px',
                                fontSize: '0.84rem',
                                fontWeight: 800,
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                boxShadow: '0 3px 12px rgba(37, 99, 235, 0.35)',
                                transition: 'all 0.15s ease'
                            }}
                        >
                            {language === 'ar' ? 'تجديد العضوية ٢٠٢٦' : '2026 Renewal'}
                        </button>
                    </div>
                </div>
            </nav>

            {/* ─── 4. Grand Athletic Hero Section ─── */}
            <section
                id="about"
                style={{
                    position: 'relative',
                    minHeight: '660px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    padding: '60px 24px 120px',
                    background: isDark
                        ? 'radial-gradient(ellipse at 50% 20%, rgba(30, 58, 138, 0.35) 0%, #000000 80%)'
                        : 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
                    transition: 'background 0.25s ease'
                }}
            >
                {/* Stadium Athletics Photo Subtle Watermark */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1920&q=80')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center 40%',
                        opacity: isDark ? 0.18 : 0.08,
                        filter: 'saturate(0.8)'
                    }}
                />

                <div style={{ maxWidth: 1180, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
                    {/* Official Accreditation Crest Pill */}
                    <motion.div
                        initial={{ opacity: 0, y: -15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 8,
                            padding: '6px 20px',
                            borderRadius: '30px',
                            background: isDark ? 'rgba(255, 255, 255, 0.06)' : '#ffffff',
                            border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1.5px solid #e2e8f0',
                            color: isDark ? '#fbbf24' : '#b45309',
                            fontSize: '0.84rem',
                            fontWeight: 800,
                            marginBottom: 22,
                            boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.5)' : '0 2px 10px rgba(0,0,0,0.04)'
                        }}
                    >
                        <Trophy size={16} color="#d97706" />
                        <span>{language === 'ar' ? '🏛️ تحت رعاية وزارة الشباب والرياضة • الصرح الأولمبي الأكبر بالقاهرة الجديدة' : '🏛️ Ministry of Youth & Sports • Premier Olympic Complex in New Cairo'}</span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        style={{
                            fontSize: 'clamp(2.2rem, 5.2vw, 4.4rem)',
                            fontWeight: 900,
                            lineHeight: 1.18,
                            marginBottom: 18,
                            letterSpacing: '-0.02em',
                            color: isDark ? '#ffffff' : '#0f172a'
                        }}
                    >
                        {trans.heroTitleLine1}{' '}
                        <span style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #a855f7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            {trans.heroTitleLine2}
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{
                            fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
                            color: isDark ? '#cbd5e1' : '#475569',
                            maxWidth: 800,
                            margin: '0 auto 36px',
                            lineHeight: 1.8,
                            fontWeight: 500
                        }}
                    >
                        {trans.heroSubtitle}
                    </motion.p>

                    {/* Hero Primary Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 50 }}
                    >
                        <button
                            className="btn btn-primary btn-lg"
                            onClick={() => setIsMatcherOpen(true)}
                            style={{
                                gap: 10,
                                padding: '14px 30px',
                                fontSize: '1rem',
                                fontWeight: 800,
                                background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
                                boxShadow: '0 8px 24px rgba(37, 99, 235, 0.35)',
                                border: 'none',
                                borderRadius: '14px'
                            }}
                        >
                            <Sparkles size={18} />
                            {trans.talentQuiz.startQuiz}
                        </button>
                        <button
                            onClick={() => setIsCalculatorOpen(true)}
                            style={{
                                gap: 8,
                                padding: '14px 26px',
                                fontSize: '1rem',
                                fontWeight: 800,
                                background: isDark ? 'rgba(255, 255, 255, 0.08)' : '#ffffff',
                                color: isDark ? '#ffffff' : '#0f172a',
                                border: isDark ? '1px solid rgba(255, 255, 255, 0.2)' : '1.5px solid #cbd5e1',
                                borderRadius: '14px',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                boxShadow: isDark ? '0 4px 14px rgba(0,0,0,0.4)' : '0 2px 8px rgba(0,0,0,0.04)'
                            }}
                        >
                            <CreditCard size={18} color="#2563eb" />
                            {trans.fees}
                        </button>
                        <a
                            href="#facilities"
                            style={{
                                gap: 8,
                                padding: '14px 24px',
                                fontSize: '1rem',
                                fontWeight: 700,
                                textDecoration: 'none',
                                background: isDark ? 'rgba(255, 255, 255, 0.04)' : '#f1f5f9',
                                color: isDark ? '#cbd5e1' : '#334155',
                                border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1.5px solid #e2e8f0',
                                borderRadius: '14px',
                                display: 'inline-flex',
                                alignItems: 'center'
                            }}
                        >
                            <Waves size={18} color="#0284c7" />
                            {language === 'ar' ? 'جولة بالمنشآت الأولمبية' : 'Olympic Facilities'}
                        </a>
                    </motion.div>

                    {/* Stats Ticker */}
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                            gap: 16,
                            maxWidth: 1050,
                            margin: '0 auto'
                        }}
                    >
                        {[
                            { value: trans.quickStats.members, label: language === 'ar' ? 'أعضاء وممارسون مسجلون' : 'Active Registered Members', icon: Users, color: '#0284c7' },
                            { value: trans.quickStats.academies, label: language === 'ar' ? 'أكاديميات رياضية معتمدة' : 'Federation Academies', icon: Dumbbell, color: '#059669' },
                            { value: trans.quickStats.trophies, label: language === 'ar' ? 'ميداليات وبطولات الجمهورية' : 'National Medals Won', icon: Trophy, color: '#d97706' },
                            { value: trans.quickStats.satisfaction, label: language === 'ar' ? 'مؤشر رضا العائلات' : 'Family Satisfaction Rate', icon: Heart, color: '#db2777' },
                        ].map((stat, i) => (
                            <div
                                key={stat.label}
                                style={{
                                    padding: '22px 18px',
                                    borderRadius: '18px',
                                    background: isDark ? '#080a12' : '#ffffff',
                                    border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
                                    boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.6)' : '0 4px 16px rgba(0,0,0,0.05)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center'
                                }}
                            >
                                <div
                                    style={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: '12px',
                                        background: `${stat.color}15`,
                                        color: stat.color,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: 10
                                    }}
                                >
                                    <stat.icon size={22} />
                                </div>
                                <span style={{ fontSize: '1.45rem', fontWeight: 900, color: isDark ? '#ffffff' : '#0f172a', marginBottom: 4 }}>
                                    {stat.value}
                                </span>
                                <span style={{ fontSize: '0.82rem', color: isDark ? '#94a3b8' : '#64748b', fontWeight: 700 }}>
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── 5. Quick Facility Strip ─── */}
            <div style={{ maxWidth: 1250, margin: '-40px auto 70px', padding: '0 24px', position: 'relative', zIndex: 10 }}>
                <div
                    style={{
                        background: isDark ? '#080a12' : '#ffffff',
                        border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
                        borderRadius: '22px',
                        padding: '18px 24px',
                        boxShadow: isDark ? '0 10px 30px rgba(0, 0, 0, 0.7)' : '0 10px 30px rgba(0, 0, 0, 0.06)',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: 16
                    }}
                >
                    {[
                        { icon: '🏊‍♂️', titleAr: 'مجمع حمام السباحة', titleEn: 'Olympic Pool', descAr: 'حوض ٥٠ متر مجهز بالتدفئة', descEn: '50m Heated Facility', href: '#facilities' },
                        { icon: '⚽', titleAr: 'ملاعب واستاد كرة القدم', titleEn: 'Match Football Stadium', descAr: 'استاد قانوني + ملاعب خماسية', descEn: 'FIFA Grass & 5-a-side', href: '#facilities' },
                        { icon: '🥋', titleAr: 'صالة الفنون القتالية', titleEn: 'Martial Arts Arena', descAr: 'كاراتيه • تايكوندو • جودو', descEn: 'Karate & Taekwondo Tatami', href: '#facilities' },
                        { icon: '🏋️', titleAr: 'صالة الجيم واللياقة', titleEn: 'International Gym', descAr: 'أحدث الأجهزة وسبا استشفاء', descEn: 'Premium Strength Gear', href: '#facilities' },
                    ].map((item, idx) => (
                        <a
                            key={idx}
                            href={item.href}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 14,
                                padding: '10px 14px',
                                borderRadius: '14px',
                                background: isDark ? '#0f131f' : '#f8fafc',
                                border: isDark ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #e2e8f0',
                                textDecoration: 'none',
                                color: 'inherit',
                                transition: 'all 0.2s'
                            }}
                        >
                            <span style={{ fontSize: '2rem' }}>{item.icon}</span>
                            <div>
                                <h4 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 800, color: isDark ? '#ffffff' : '#0f172a' }}>
                                    {language === 'ar' ? item.titleAr : item.titleEn}
                                </h4>
                                <span style={{ fontSize: '0.74rem', color: isDark ? '#94a3b8' : '#64748b' }}>
                                    {language === 'ar' ? item.descAr : item.descEn}
                                </span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            {/* ─── 6. Ministerial Field Inspection Spotlight (25 Sep 2026) ─── */}
            <section id="ministerial-news" style={{ maxWidth: 1250, margin: '0 auto 80px', padding: '0 24px' }}>
                <div
                    style={{
                        background: isDark
                            ? 'linear-gradient(135deg, #05070f 0%, #0d1222 50%, #05070f 100%)'
                            : 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
                        borderRadius: '26px',
                        border: '2px solid rgba(220, 38, 38, 0.45)',
                        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.35)',
                        overflow: 'hidden',
                        position: 'relative',
                        color: 'white'
                    }}
                >
                    {/* Top Ribbon */}
                    <div style={{ height: 5, background: 'linear-gradient(90deg, #ef4444 0%, #f59e0b 35%, #3b82f6 70%, #10b981 100%)' }} />

                    <div style={{ padding: '36px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 36, alignItems: 'center' }}>
                        {/* Text Details */}
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 14 }}>
                                <span style={{ background: '#ef4444', color: 'white', padding: '4px 14px', borderRadius: '18px', fontSize: '0.78rem', fontWeight: 900, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                                    <Shield size={14} />
                                    {language === 'ar' ? 'تغطية رسمية • وزارة الشباب والرياضة' : 'Official Statement • Ministry of Youth'}
                                </span>
                                <span style={{ background: 'rgba(255, 255, 255, 0.15)', color: '#f8fafc', padding: '4px 14px', borderRadius: '18px', fontSize: '0.78rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                                    <Calendar size={14} />
                                    {language === 'ar' ? 'الجمعة ٢٥ سبتمبر ٢٠٢٦' : 'Friday, 25 September 2026'}
                                </span>
                            </div>

                            <h2 style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2.1rem)', fontWeight: 900, lineHeight: 1.3, marginBottom: 14, color: '#ffffff' }}>
                                {language === 'ar'
                                    ? 'في جولة مفاجئة.. وزير الشباب والرياضة (جوهر نبيل) يتفقد مركز التنمية الشبابية بالتجمع الأول'
                                    : 'Surprise Field Inspection: Minister of Youth & Sports (Gohar Nabil) Inspects First Settlement Youth Center'}
                            </h2>

                            <p style={{ fontSize: '0.96rem', color: '#cbd5e1', lineHeight: 1.75, marginBottom: 20 }}>
                                {language === 'ar'
                                    ? 'أجرى السيد الوزير جوهر نبيل ومساعده د. مصطفى زمزم جولة تفقدية شاملة للمركز، شملت مجمع حمام السباحة الأولمبي، صالة الجيم والألعاب الرياضية، والمبنى الإداري ومكاتب خدمة الأعضاء. ووجّه سيادته بسرعة الانتهاء من أعمال الصيانة الشاملة والدهانات للمبنى الإداري بأعلى جودة، واستغلال الموارد المالية المتاحة لتوفير كافة التجهيزات والأدوات الرياضية الحديثة لدعم أبطال الأكاديميات ورواد التجمع الأول.'
                                    : 'Minister Gohar Nabil and Assistant Minister Dr. Mostafa Zamzam conducted a comprehensive surprise inspection of the Olympic swimming pool, modern fitness arena, and administrative building. The Minister directed rapid completion of maintenance and painting to the highest standards while equipping all sports academies with cutting-edge gear.'}
                            </p>

                            {/* Inspected Facilities */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 8, marginBottom: 22 }}>
                                {[
                                    { icon: '🏊‍♂️', ar: 'حمام السباحة الأولمبي', en: 'Olympic Pool Complex' },
                                    { icon: '🏋️', ar: 'صالة الجيم والأنشطة', en: 'Modern Fitness Gym' },
                                    { icon: '🏢', ar: 'المبنى الإداري والخدمات', en: 'Administrative HQ' },
                                    { icon: '⚡', ar: 'صيانة دورية وتجهيزات', en: 'Rapid Modernization' },
                                ].map((item, idx) => (
                                    <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '12px', padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', fontWeight: 700, color: '#f1f5f9' }}>
                                        <span style={{ fontSize: '1.15rem' }}>{item.icon}</span>
                                        <span>{language === 'ar' ? item.ar : item.en}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Citations */}
                            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.15)', paddingTop: 16, marginBottom: 20 }}>
                                <span style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginBottom: 8, fontWeight: 700 }}>
                                    {language === 'ar' ? 'الروابط والمصادر الرسمية المعتمدة للجولة:' : 'Verified Official Sources & Media Coverage:'}
                                </span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                                    <a
                                        href="https://www.emys.gov.eg/news/21600/%D9%81%D9%8A-%D8%AC%D9%88%D9%84%D8%A9-%D9%85%D9%81%D8%A7%D8%AC%D8%A6%D8%A9-%D9%88%D8%B2%D9%8A%D8%B1-%D8%A7%D9%84%D8%B4%D8%A8%D8%A7%D8%A8-%D9%88%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6%D8%A9-%D9%8A%D8%AA%D9%81%D9%82%D8%AF-%D9%85%D8%B1%D9%83%D8%B2-%D8%A7%D9%84%D8%AA%D9%86%D9%85%D9%8A%D8%A9-%D8%A7%D9%84%D8%B4%D8%A8%D8%A7%D8%A8%D9%8A%D8%A9-%D8%A8%D8%A7%D9%84%D8%AA%D8%AC%D9%85%D8%B9-%D8%A7%D9%84%D8%A3%D9%88%D9%84"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ background: 'rgba(59, 130, 246, 0.25)', border: '1px solid rgba(59, 130, 246, 0.5)', color: '#93c5fd', padding: '5px 12px', borderRadius: '10px', fontSize: '0.76rem', fontWeight: 800, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 5 }}
                                    >
                                        <Globe size={12} />
                                        {language === 'ar' ? 'بوابة وزارة الشباب والرياضة' : 'Ministry Portal'}
                                        <ExternalLink size={11} />
                                    </a>
                                    <a
                                        href="https://www.facebook.com/share/p/18byx4fosi/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ background: 'rgba(99, 102, 241, 0.25)', border: '1px solid rgba(99, 102, 241, 0.5)', color: '#c7d2fe', padding: '5px 12px', borderRadius: '10px', fontSize: '0.76rem', fontWeight: 800, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 5 }}
                                    >
                                        <Globe size={12} />
                                        {language === 'ar' ? 'صفحة مجلس الوزراء / فيسبوك' : 'Egyptian Cabinet Facebook'}
                                        <ExternalLink size={11} />
                                    </a>
                                    <a
                                        href="https://www.sada-elarab.com/820789"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ background: 'rgba(245, 158, 11, 0.25)', border: '1px solid rgba(245, 158, 11, 0.5)', color: '#fde68a', padding: '5px 12px', borderRadius: '10px', fontSize: '0.76rem', fontWeight: 800, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 5 }}
                                    >
                                        <Globe size={12} />
                                        {language === 'ar' ? 'جريدة صدى العرب' : 'Sada El-Arab Report'}
                                        <ExternalLink size={11} />
                                    </a>
                                </div>
                            </div>

                            {/* Actions */}
                            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                                <button
                                    onClick={() => navigate('/news')}
                                    style={{
                                        padding: '10px 22px',
                                        fontSize: '0.9rem',
                                        fontWeight: 800,
                                        background: '#2563eb',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 6
                                    }}
                                >
                                    {language === 'ar' ? 'استعراض التغطية الصحفية الكاملة' : 'Read Full Report'}
                                    <ArrowRight size={15} style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
                                </button>
                                <button
                                    onClick={() => setIsComplaintsOpen(true)}
                                    style={{
                                        padding: '10px 18px',
                                        fontSize: '0.9rem',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        color: 'white',
                                        border: '1px solid rgba(255, 255, 255, 0.25)',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 6
                                    }}
                                >
                                    <MessageSquare size={15} />
                                    {language === 'ar' ? 'إرسال مقترح مباشر للإدارة' : 'Submit Feedback'}
                                </button>
                            </div>
                        </div>

                        {/* Official Photo Card */}
                        <div style={{ position: 'relative' }}>
                            <div
                                style={{
                                    borderRadius: '22px',
                                    overflow: 'hidden',
                                    border: '2px solid rgba(255, 255, 255, 0.2)',
                                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
                                    position: 'relative'
                                }}
                            >
                                <img
                                    src="https://www.emys.gov.eg/uploads/photos/2026/09/1790364166.jpg"
                                    alt={language === 'ar' ? 'جولة وزير الشباب والرياضة بمركز التنمية الشبابية بالتجمع الأول' : 'Ministerial inspection at First Settlement Youth Center'}
                                    style={{ width: '100%', height: '370px', objectFit: 'cover', display: 'block' }}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80';
                                    }}
                                />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, transparent 50%)' }} />

                                <div style={{ position: 'absolute', bottom: 18, left: 18, right: 18, color: 'white' }}>
                                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#ef4444', padding: '4px 12px', borderRadius: '10px', fontSize: '0.74rem', fontWeight: 900, marginBottom: 6 }}>
                                        <Trophy size={12} color="white" />
                                        {language === 'ar' ? 'توثيق الجولة الميدانية الرسمية (٢٥ سبتمبر ٢٠٢٦)' : 'Official Inspection Tour'}
                                    </div>
                                    <p style={{ fontSize: '0.88rem', fontWeight: 800, margin: 0, lineHeight: 1.4, textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                                        {language === 'ar'
                                            ? 'الوزير جوهر نبيل ومساعده د. مصطفى زمزم يتابعان جاهزية مجمع حمام السباحة والجيم والمبنى الإداري'
                                            : 'Minister Gohar Nabil & Assistant Minister Dr. Mostafa Zamzam reviewing pool & gym facilities'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── 7. World-Class Olympic Facilities Showcase ─── */}
            <section id="facilities" style={{ maxWidth: 1300, margin: '0 auto 90px', padding: '0 24px' }}>
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 16px', borderRadius: '20px', background: isDark ? 'rgba(56, 189, 248, 0.15)' : '#eff6ff', color: isDark ? '#38bdf8' : '#0284c7', fontSize: '0.84rem', fontWeight: 800, marginBottom: 10 }}>
                        <Building2 size={16} />
                        {language === 'ar' ? 'مرافق ومنشآت بمواصفات دولية' : 'World-Class Olympic Facilities'}
                    </div>
                    <h2 style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', fontWeight: 900, color: isDark ? '#ffffff' : '#0f172a', margin: '0 0 10px' }}>
                        {language === 'ar' ? 'منشآت المركز ومرافقه الأولمبية' : 'Olympic Facilities & Athletic Arenas'}
                    </h2>
                    <p style={{ fontSize: '1rem', color: isDark ? '#cbd5e1' : '#475569', maxWidth: 740, margin: '0 auto' }}>
                        {language === 'ar'
                            ? 'صرح متكامل يضم حمام سباحة أولمبي ٥٠ متر، استادات كرة قدم معتمدة، صالات مغطاة للألعاب القتالية، وأحدث صالات اللياقة البدنية والباديل.'
                            : 'An integrated sports city featuring an Olympic 50m pool, certified football pitches, combat sports dojo, and international fitness gyms.'}
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 26 }}>
                    {clubFacilities.map((fac) => (
                        <div
                            key={fac.id}
                            style={{
                                background: isDark ? '#080a12' : '#ffffff',
                                borderRadius: '22px',
                                border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1.5px solid #e2e8f0',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                boxShadow: isDark ? '0 4px 20px rgba(0, 0, 0, 0.6)' : '0 4px 16px rgba(0, 0, 0, 0.05)',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
                                <img
                                    src={fac.image}
                                    alt={language === 'ar' ? fac.titleAr : fac.titleEn}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15, 23, 42, 0.8) 0%, transparent 60%)' }} />

                                <span
                                    style={{
                                        position: 'absolute',
                                        top: 12,
                                        [isRTL ? 'right' : 'left']: 12,
                                        background: 'rgba(0, 0, 0, 0.75)',
                                        backdropFilter: 'blur(8px)',
                                        padding: '4px 12px',
                                        borderRadius: '16px',
                                        fontSize: '0.76rem',
                                        fontWeight: 800,
                                        color: 'white',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 5
                                    }}
                                >
                                    <span>{fac.icon}</span>
                                    <span>{language === 'ar' ? fac.tagAr : fac.tagEn}</span>
                                </span>

                                <span
                                    style={{
                                        position: 'absolute',
                                        bottom: 12,
                                        [isRTL ? 'right' : 'left']: 14,
                                        background: `${fac.statusColor}20`,
                                        border: `1.5px solid ${fac.statusColor}`,
                                        color: fac.statusColor,
                                        backdropFilter: 'blur(8px)',
                                        padding: '3px 10px',
                                        borderRadius: '14px',
                                        fontSize: '0.74rem',
                                        fontWeight: 800,
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 5
                                    }}
                                >
                                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: fac.statusColor }} />
                                    <span>{language === 'ar' ? fac.statusAr : fac.statusEn}</span>
                                </span>
                            </div>

                            <div style={{ padding: '22px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: isDark ? '#ffffff' : '#0f172a', marginBottom: 8 }}>
                                        {language === 'ar' ? fac.titleAr : fac.titleEn}
                                    </h3>
                                    <p style={{ fontSize: '0.88rem', color: isDark ? '#cbd5e1' : '#475569', lineHeight: 1.6, marginBottom: 14 }}>
                                        {language === 'ar' ? fac.descAr : fac.descEn}
                                    </p>
                                </div>

                                <div>
                                    <div style={{ background: isDark ? '#0f131f' : '#f8fafc', padding: '10px 12px', borderRadius: '12px', border: isDark ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #e2e8f0', marginBottom: 16, fontSize: '0.8rem', fontWeight: 700, color: isDark ? '#38bdf8' : '#0284c7' }}>
                                        {language === 'ar' ? fac.specsAr : fac.specsEn}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                                        <button
                                            onClick={() => setIsCalculatorOpen(true)}
                                            style={{
                                                flex: 1,
                                                padding: '10px 16px',
                                                fontWeight: 800,
                                                background: '#2563eb',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '12px',
                                                cursor: 'pointer',
                                                fontSize: '0.84rem'
                                            }}
                                        >
                                            {language === 'ar' ? 'الاشتراك بالمرفق' : 'Join / Subscribe'}
                                        </button>
                                        <button
                                            onClick={() => setIsMatcherOpen(true)}
                                            style={{
                                                padding: '9px 12px',
                                                fontWeight: 700,
                                                background: isDark ? 'rgba(255, 255, 255, 0.08)' : '#f1f5f9',
                                                border: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid #cbd5e1',
                                                borderRadius: '12px',
                                                color: isDark ? '#c084fc' : '#7c3aed',
                                                cursor: 'pointer'
                                            }}
                                            title="فحص المسار الرياضي"
                                        >
                                            <Sparkles size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── 8. Sports Academies Directory ─── */}
            <section id="academies" style={{ maxWidth: 1300, margin: '0 auto 90px', padding: '0 24px' }}>
                <div style={{ textAlign: 'center', marginBottom: 36 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 16px', borderRadius: '20px', background: isDark ? 'rgba(124, 58, 237, 0.15)' : '#faf5ff', color: isDark ? '#c084fc' : '#7c3aed', fontSize: '0.84rem', fontWeight: 800, marginBottom: 10 }}>
                        <Trophy size={16} />
                        {language === 'ar' ? 'قطاع النشاط والأكاديميات الرياضية' : 'Accredited Athletic Academies'}
                    </div>
                    <h2 style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', fontWeight: 900, color: isDark ? '#ffffff' : '#0f172a', margin: '0 0 10px' }}>
                        {trans.sportsDirectory.title}
                    </h2>
                    <p style={{ fontSize: '1rem', color: isDark ? '#cbd5e1' : '#475569', maxWidth: 720, margin: '0 auto' }}>
                        {trans.sportsDirectory.subtitle}
                    </p>
                </div>

                {/* Filter Tabs */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
                    {[
                        { id: 'all', label: trans.sportsDirectory.all },
                        { id: 'aquatics', label: trans.sportsDirectory.aquatics },
                        { id: 'racquet', label: trans.sportsDirectory.racquet },
                        { id: 'ball', label: trans.sportsDirectory.ball },
                        { id: 'combat', label: trans.sportsDirectory.combat },
                        { id: 'fitness', label: trans.sportsDirectory.fitness },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveCategory(tab.id)}
                            style={{
                                padding: '9px 18px',
                                borderRadius: '14px',
                                border: `1.5px solid ${activeCategory === tab.id ? '#2563eb' : (isDark ? 'rgba(255, 255, 255, 0.12)' : '#cbd5e1')}`,
                                background: activeCategory === tab.id ? 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)' : (isDark ? '#080a12' : '#ffffff'),
                                color: activeCategory === tab.id ? 'white' : (isDark ? '#cbd5e1' : '#475569'),
                                fontWeight: 800,
                                fontSize: '0.86rem',
                                cursor: 'pointer',
                                transition: 'all 0.15s',
                                boxShadow: activeCategory === tab.id ? '0 4px 12px rgba(37, 99, 235, 0.25)' : 'none'
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Academies Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 24 }}>
                    {filteredSports.map((sport) => (
                        <div
                            key={sport.id}
                            style={{
                                borderRadius: '22px',
                                background: isDark ? '#080a12' : '#ffffff',
                                border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1.5px solid #e2e8f0',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                boxShadow: isDark ? '0 4px 20px rgba(0, 0, 0, 0.6)' : '0 4px 16px rgba(0, 0, 0, 0.05)',
                                transition: 'transform 0.2s ease'
                            }}
                        >
                            <div style={{ position: 'relative', height: 200 }}>
                                <img
                                    src={sport.image}
                                    alt={language === 'ar' ? sport.titleAr : sport.titleEn}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    loading="lazy"
                                />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, transparent 60%)' }} />
                                <span
                                    style={{
                                        position: 'absolute',
                                        top: 12,
                                        [isRTL ? 'right' : 'left']: 12,
                                        background: 'rgba(0, 0, 0, 0.7)',
                                        backdropFilter: 'blur(8px)',
                                        padding: '4px 12px',
                                        borderRadius: '16px',
                                        fontSize: '0.78rem',
                                        fontWeight: 800,
                                        color: 'white',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 5
                                    }}
                                >
                                    <span>{sport.icon}</span>
                                    <span>{language === 'ar' ? sport.agesAr : sport.agesEn}</span>
                                </span>
                                <span style={{ position: 'absolute', bottom: 10, [isRTL ? 'right' : 'left']: 14, fontSize: '1.25rem', fontWeight: 900, color: 'white' }}>
                                    {language === 'ar' ? sport.titleAr : sport.titleEn}
                                </span>
                            </div>

                            <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <p style={{ fontSize: '0.88rem', color: isDark ? '#cbd5e1' : '#475569', lineHeight: 1.6, margin: '0 0 14px' }}>
                                    {language === 'ar' ? sport.descAr : sport.descEn}
                                </p>

                                <div style={{ background: isDark ? '#0f131f' : '#f8fafc', padding: '10px 12px', borderRadius: '12px', border: isDark ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #e2e8f0', marginBottom: 14 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4, fontSize: '0.82rem' }}>
                                        <span style={{ color: isDark ? '#94a3b8' : '#64748b' }}>{language === 'ar' ? 'المدرب المشرف:' : 'Head Coach:'}</span>
                                        <span style={{ fontWeight: 800, color: isDark ? '#ffffff' : '#0f172a' }}>
                                            {language === 'ar' ? sport.coachAr : sport.coachEn}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                                        <span style={{ color: isDark ? '#94a3b8' : '#64748b' }}>{language === 'ar' ? 'المواعيد:' : 'Schedule:'}</span>
                                        <span style={{ fontWeight: 700, color: '#0284c7' }}>
                                            {language === 'ar' ? sport.scheduleAr : sport.scheduleEn}
                                        </span>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, borderTop: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0' }}>
                                    <div>
                                        <span style={{ fontSize: '0.72rem', color: isDark ? '#94a3b8' : '#64748b', display: 'block' }}>
                                            {language === 'ar' ? 'الاشتراك الشهري' : 'Monthly Fee'}
                                        </span>
                                        <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#10b981' }}>
                                            {sport.feeMonthlyEgp} {trans.calculator.egp}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => handleQuickTrialBook(sport)}
                                        style={{
                                            padding: '8px 16px',
                                            fontWeight: 800,
                                            background: '#2563eb',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '10px',
                                            cursor: 'pointer',
                                            fontSize: '0.82rem'
                                        }}
                                    >
                                        {language === 'ar' ? 'حجز تجربة أداء' : 'Book Free Trial'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── 9. Upcoming Tournaments & Match Calendar ─── */}
            <section id="events" style={{ maxWidth: 1250, margin: '0 auto 90px', padding: '0 24px' }}>
                <div style={{ background: isDark ? '#080a12' : '#ffffff', borderRadius: '24px', border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1.5px solid #e2e8f0', padding: '32px', boxShadow: isDark ? '0 4px 24px rgba(0, 0, 0, 0.6)' : '0 4px 20px rgba(0, 0, 0, 0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
                        <div>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#d97706', fontSize: '0.84rem', fontWeight: 800, marginBottom: 6 }}>
                                <Medal size={16} />
                                {language === 'ar' ? 'جدول المنافسات الرسمية' : 'Official Championship Schedule'}
                            </div>
                            <h2 style={{ fontSize: '1.7rem', fontWeight: 900, color: isDark ? '#ffffff' : '#0f172a', margin: 0 }}>
                                {language === 'ar' ? 'مركز البطولات والفعاليات الرياضية القادمة' : 'Upcoming Tournaments & Match Center'}
                            </h2>
                        </div>
                        <button
                            onClick={() => navigate('/public-gallery')}
                            style={{
                                background: isDark ? 'rgba(255, 255, 255, 0.08)' : '#f8fafc',
                                color: isDark ? '#ffffff' : '#0f172a',
                                border: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1.5px solid #cbd5e1',
                                borderRadius: '12px',
                                padding: '8px 16px',
                                fontWeight: 800,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 6
                            }}
                        >
                            <Trophy size={16} color="#d97706" />
                            {language === 'ar' ? 'سجل بطولات المركز' : 'Championship Honors'}
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
                        {upcomingEvents.map((evt) => (
                            <div
                                key={evt.id}
                                style={{
                                    background: isDark ? '#0f131f' : '#f8fafc',
                                    borderRadius: '16px',
                                    border: isDark ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #e2e8f0',
                                    padding: '18px',
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: 14
                                }}
                            >
                                <div style={{ fontSize: '2.2rem' }}>{evt.icon}</div>
                                <div style={{ flex: 1 }}>
                                    <span style={{ background: isDark ? 'rgba(245, 158, 11, 0.15)' : '#fef3c7', color: isDark ? '#fbbf24' : '#b45309', padding: '2px 8px', borderRadius: '10px', fontSize: '0.72rem', fontWeight: 800, display: 'inline-block', marginBottom: 6 }}>
                                        {language === 'ar' ? evt.categoryAr : evt.categoryEn}
                                    </span>
                                    <h4 style={{ fontSize: '1rem', fontWeight: 900, color: isDark ? '#ffffff' : '#0f172a', margin: '0 0 6px' }}>
                                        {language === 'ar' ? evt.titleAr : evt.titleEn}
                                    </h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 3, fontSize: '0.78rem', color: isDark ? '#94a3b8' : '#64748b' }}>
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                                            <Calendar size={12} />
                                            {language === 'ar' ? evt.dateAr : evt.dateEn}
                                        </span>
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                                            <MapPin size={12} />
                                            {language === 'ar' ? evt.venueAr : evt.venueEn}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── 10. Interactive AI Track Matcher Callout Banner ─── */}
            <section style={{ maxWidth: 1250, margin: '0 auto 90px', padding: '0 24px' }}>
                <div
                    style={{
                        padding: '36px 40px',
                        borderRadius: '24px',
                        background: isDark
                            ? 'linear-gradient(135deg, rgba(37, 99, 235, 0.18) 0%, rgba(124, 58, 237, 0.18) 100%)'
                            : 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(124, 58, 237, 0.08) 100%)',
                        border: isDark ? '1px solid rgba(124, 58, 237, 0.4)' : '1.5px solid rgba(37, 99, 235, 0.25)',
                        boxShadow: isDark ? '0 10px 30px rgba(0, 0, 0, 0.5)' : '0 10px 30px rgba(0, 0, 0, 0.04)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 24,
                        flexWrap: 'wrap'
                    }}
                >
                    <div style={{ maxWidth: 700 }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: '14px', background: isDark ? 'rgba(124, 58, 237, 0.25)' : '#faf5ff', color: isDark ? '#c084fc' : '#7c3aed', fontSize: '0.8rem', fontWeight: 900, marginBottom: 10 }}>
                            <Sparkles size={14} />
                            {trans.talentQuiz.badge}
                        </div>
                        <h2 style={{ fontSize: 'clamp(1.7rem, 3vw, 2.2rem)', fontWeight: 900, color: isDark ? '#ffffff' : '#0f172a', marginBottom: 10 }}>
                            {trans.talentQuiz.title}
                        </h2>
                        <p style={{ fontSize: '0.96rem', color: isDark ? '#cbd5e1' : '#475569', lineHeight: 1.7, margin: 0 }}>
                            {trans.talentQuiz.subtitle}
                        </p>
                    </div>
                    <div>
                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => setIsMatcherOpen(true)}
                            style={{
                                padding: '16px 32px',
                                fontSize: '1rem',
                                fontWeight: 800,
                                gap: 10,
                                background: 'linear-gradient(135deg, #1d4ed8 0%, #7c3aed 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '14px',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                boxShadow: '0 8px 24px rgba(124, 58, 237, 0.35)'
                            }}
                        >
                            <Sparkles size={18} />
                            {trans.talentQuiz.startQuiz}
                        </motion.button>
                    </div>
                </div>
            </section>

            {/* ─── 11. Quick Booking Confirmation Dialog ─── */}
            <AnimatePresence>
                {selectedSportForBooking && (
                    <div
                        className="modal-backdrop"
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0, 0, 0, 0.75)',
                            backdropFilter: 'blur(8px)',
                            zIndex: 1100,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '16px'
                        }}
                        onClick={() => setSelectedSportForBooking(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                width: '100%',
                                maxWidth: '480px',
                                background: isDark ? '#0a0d16' : '#ffffff',
                                borderRadius: '22px',
                                padding: '30px',
                                border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid #e2e8f0',
                                textAlign: 'center',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.4)'
                            }}
                        >
                            <div style={{ width: 56, height: 56, borderRadius: '50%', background: isDark ? 'rgba(16, 185, 129, 0.15)' : '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                                <Check size={30} />
                            </div>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 900, margin: '0 0 8px', color: isDark ? '#ffffff' : '#0f172a' }}>
                                {language === 'ar' ? 'تم تأكيد حجز التجربة الأولية!' : 'Trial Session Reserved!'}
                            </h3>
                            <p style={{ fontSize: '0.9rem', color: isDark ? '#cbd5e1' : '#475569', marginBottom: 18 }}>
                                {language === 'ar'
                                    ? `تم تأكيد حجز تجربة أداء مجانية في (${selectedSportForBooking.titleAr}). كود الحضور الخاص بك:`
                                    : `Free assessment trial reserved for (${selectedSportForBooking.titleEn}). Your pass code:`}
                            </p>
                            <div
                                style={{
                                    padding: '10px 22px',
                                    borderRadius: '12px',
                                    background: isDark ? '#111726' : '#f8fafc',
                                    color: '#10b981',
                                    fontWeight: 900,
                                    fontSize: '1.4rem',
                                    letterSpacing: '0.08em',
                                    display: 'inline-block',
                                    marginBottom: 20,
                                    border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0'
                                }}
                            >
                                {bookingSuccessCode}
                            </div>
                            <div>
                                <button
                                    onClick={() => setSelectedSportForBooking(null)}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        fontWeight: 800,
                                        background: '#2563eb',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '12px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {language === 'ar' ? 'تم، شكراً لكم' : 'Done'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* ─── 12. Official Club Footer ─── */}
            <footer
                id="contact"
                style={{
                    background: '#03050a',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    padding: '54px 24px 28px',
                    color: '#94a3b8'
                }}
            >
                <div style={{ maxWidth: 1300, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 36, marginBottom: 36 }}>
                    {/* Col 1: Brand */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                <Trophy size={20} />
                            </div>
                            <div>
                                <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#f8fafc', display: 'block' }}>
                                    مركز التنمية الشبابية بالتجمع الأول
                                </span>
                                <span style={{ fontSize: '0.74rem', color: '#38bdf8' }}>
                                    {trans.brandSubtitle}
                                </span>
                            </div>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.7, marginBottom: 18 }}>
                            {trans.slogan}
                            <br />
                            {language === 'ar' ? 'الصرح الرياضي والأولمبي الرائد لخدمة أسر وشباب التجمع الأول والقاهرة الجديدة.' : 'Premier sports hub fostering athletic excellence and community health.'}
                        </p>
                        <button
                            onClick={() => setIsComplaintsOpen(true)}
                            style={{
                                gap: 6,
                                fontWeight: 700,
                                background: 'rgba(255, 255, 255, 0.08)',
                                color: '#e2e8f0',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                borderRadius: '10px',
                                padding: '6px 14px',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                fontSize: '0.8rem'
                            }}
                        >
                            <MessageSquare size={13} />
                            {trans.complaints}
                        </button>
                    </div>

                    {/* Col 2: Facilities */}
                    <div>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 900, marginBottom: 16, color: '#f8fafc' }}>
                            {language === 'ar' ? 'منشآت ومرافق النادي' : 'Club Facilities'}
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.86rem' }}>
                            <a href="#facilities" style={{ color: '#cbd5e1', textDecoration: 'none' }}>
                                {language === 'ar' ? 'مجمع حمام السباحة الأولمبي' : 'Olympic Pool Complex'}
                            </a>
                            <a href="#facilities" style={{ color: '#cbd5e1', textDecoration: 'none' }}>
                                {language === 'ar' ? 'استادات وملاعب كرة القدم' : 'Football Stadiums'}
                            </a>
                            <a href="#academies" style={{ color: '#cbd5e1', textDecoration: 'none' }}>
                                {language === 'ar' ? 'الأكاديميات الرياضية' : 'Sports Academies'}
                            </a>
                            <a onClick={() => navigate('/news')} style={{ cursor: 'pointer', color: '#cbd5e1' }}>
                                {trans.news}
                            </a>
                            <a onClick={() => navigate('/public-gallery')} style={{ cursor: 'pointer', color: '#cbd5e1' }}>
                                {trans.gallery}
                            </a>
                        </div>
                    </div>

                    {/* Col 3: Services */}
                    <div>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 900, marginBottom: 16, color: '#f8fafc' }}>
                            {language === 'ar' ? 'الخدمات الذكية للأعضاء' : 'Member Services'}
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.86rem' }}>
                            <a style={{ cursor: 'pointer', color: '#c084fc', fontWeight: 700 }} onClick={() => setIsMatcherOpen(true)}>
                                ✨ {trans.aiMatcher}
                            </a>
                            <a style={{ cursor: 'pointer', color: '#38bdf8', fontWeight: 700 }} onClick={() => setIsCalculatorOpen(true)}>
                                💳 {trans.fees}
                            </a>
                            <a style={{ cursor: 'pointer', color: '#cbd5e1' }} onClick={() => setIsComplaintsOpen(true)}>
                                🤝 {trans.complaints}
                            </a>
                            <a style={{ cursor: 'pointer', color: '#cbd5e1' }} onClick={() => navigate('/login')}>
                                🔐 {language === 'ar' ? 'بوابة دخول الأعضاء' : 'Member Portal'}
                            </a>
                        </div>
                    </div>

                    {/* Col 4: Contact */}
                    <div>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 900, marginBottom: 16, color: '#f8fafc' }}>
                            {language === 'ar' ? 'المقر وخدمة الأعضاء' : 'Location & Hotline'}
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.85rem', color: '#cbd5e1' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <MapPin size={15} style={{ color: '#ef4444' }} />
                                <span>{language === 'ar' ? 'التجمع الأول، بجوار مجمع الخدمات، القاهرة الجديدة' : 'First Settlement, New Cairo, Egypt'}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <Phone size={15} style={{ color: '#10b981' }} />
                                <span style={{ direction: 'ltr', fontWeight: 800 }}>01013010137</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <Clock size={15} style={{ color: '#f59e0b' }} />
                                <span>{language === 'ar' ? 'يومياً: ٧:٠٠ ص – ١١:٠٠ م' : 'Daily: 7:00 AM – 11:00 PM'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ maxWidth: 1300, margin: '0 auto', paddingTop: 20, borderTop: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'center', fontSize: '0.8rem', color: '#64748b' }}>
                    © 2026 مركز التنمية الشبابية بالتجمع الأول. {language === 'ar' ? 'جميع الحقوق محفوظة • وزارة الشباب والرياضة • جمهورية مصر العربية.' : 'All rights reserved • Ministry of Youth & Sports • Arab Republic of Egypt.'}
                </div>
            </footer>

            {/* ─── Floating AI Club Assistant ─── */}
            <AiAssistantModal
                onOpenCalculator={() => setIsCalculatorOpen(true)}
                onOpenMatcher={() => setIsMatcherOpen(true)}
                onOpenComplaints={() => setIsComplaintsOpen(true)}
            />

            {/* ─── Modal Dialogs ─── */}
            <AiSportMatcherModal
                isOpen={isMatcherOpen}
                onClose={() => setIsMatcherOpen(false)}
            />

            <FeeCalculatorModal
                isOpen={isCalculatorOpen}
                onClose={() => setIsCalculatorOpen(false)}
            />

            <ComplaintsModal
                isOpen={isComplaintsOpen}
                onClose={() => setIsComplaintsOpen(false)}
            />
        </div>
    );
}
