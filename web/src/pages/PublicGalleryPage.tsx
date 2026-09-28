import { useNavigate } from 'react-router-dom';
import { Dumbbell, ArrowLeft, Trophy, Medal, Sun, Moon, ArrowRight, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useThemeStore } from '../store/themeStore';
import { useLanguageStore } from '../store/languageStore';
import { t } from '../services/translations';

interface GalleryImage {
    src: string;
    captionAr: string;
    captionEn: string;
}

interface GallerySection {
    id: string;
    titleAr: string;
    titleEn: string;
    descAr: string;
    descEn: string;
    dateAr: string;
    dateEn: string;
    icon: string;
    color: string;
    colorAlt: string;
    tagAr: string;
    tagEn: string;
    images: GalleryImage[];
}

const gallerySections: GallerySection[] = [
    {
        id: '1',
        titleAr: 'أبطال دوري كرة القدم للشباب ٢٠٢٥',
        titleEn: 'Youth Football League Champions 2025',
        descAr: 'فريق المركز للناشئين يتوج بطلاً لدوري منطقة القاهرة بعد مباراة نهائية مثيرة انتهت بالفوز ٣-١ وسط هتافات أعضاء النادي.',
        descEn: 'Our senior football team celebrating after winning the regional league final with a thrilling 3-1 victory in front of a packed crowd.',
        dateAr: 'ديسمبر ٢٠٢٥',
        dateEn: 'December 2025',
        icon: '⚽',
        color: '#22c55e',
        colorAlt: '#16a34a',
        tagAr: 'كرة قدم',
        tagEn: 'Football',
        images: [
            { src: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=500&fit=crop', captionAr: 'فرحة التتويج بالبطولة', captionEn: 'Championship celebration' },
            { src: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=800&h=500&fit=crop', captionAr: 'هدف الفوز الحاسم', captionEn: 'Match winning goal' },
            { src: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=500&fit=crop', captionAr: 'الفريق أثناء المنافسة', captionEn: 'Team in action' },
            { src: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&h=500&fit=crop', captionAr: 'تسليم كأس المركز الأول', captionEn: 'Trophy presentation' },
        ],
    },
    {
        id: '2',
        titleAr: 'درع بطولة الجمهورية للكاراتيه ٢٠٢٦',
        titleEn: 'Karate National Championship 2026',
        descAr: 'أبطال مدرسة الكاراتيه يكتسحون منصات التتويج بـ ١٤ ميدالية (ذهبية وفضية وبرونزية) في منافسات الكاتا والكوميتيه لمختلف الأوزان.',
        descEn: 'Club karate athletes dominating the national competition. Gold, silver, and bronze medals across multiple weight categories.',
        dateAr: 'يناير ٢٠٢٦',
        dateEn: 'January 2026',
        icon: '🥋',
        color: '#ef4444',
        colorAlt: '#dc2626',
        tagAr: 'كاراتيه',
        tagEn: 'Karate',
        images: [
            { src: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800&h=500&fit=crop', captionAr: 'أداء استثنائي في نهائيات الكاتا', captionEn: 'Championship kata performance' },
            { src: 'https://images.unsplash.com/photo-1514050566906-8d077bae7046?w=800&h=500&fit=crop', captionAr: 'المباريات النهائية للكوميتيه', captionEn: 'Sparring finals' },
            { src: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=800&h=500&fit=crop', captionAr: 'مراسم التتويج بالميداليات', captionEn: 'Medal ceremony' },
        ],
    },
    {
        id: '3',
        titleAr: 'ميداليات بطولة سباحة البراعم الشتوية',
        titleEn: 'Junior Swimming Winter Championship',
        descAr: 'سباحو أكاديمية السباحة الأولمبية يحصدون ٨ ميداليات ذهبية في سباقات ٥٠م حرة وظَهر بمجمع حمامات السباحة المغطى.',
        descEn: 'Young swimmers competing in the 50m freestyle finals, bringing home 8 gold medals.',
        dateAr: 'نوفمبر ٢٠٢٥',
        dateEn: 'November 2025',
        icon: '🏊‍♂️',
        color: '#0ea5e9',
        colorAlt: '#2563eb',
        tagAr: 'سباحة',
        tagEn: 'Swimming',
        images: [
            { src: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&h=500&fit=crop', captionAr: 'انطلاق سباق الـ ٥٠م حرة', captionEn: 'Freestyle race start' },
            { src: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=800&h=500&fit=crop', captionAr: 'المنافسة في الحارات الأولمبية', captionEn: 'Lap swimming competition' },
            { src: 'https://images.unsplash.com/photo-1560090995-01632a28895b?w=800&h=500&fit=crop', captionAr: 'منصة تتويج براعم السباحة', captionEn: 'Medal winners podium' },
        ],
    },
    {
        id: '4',
        titleAr: 'بطولة دوري التجمع الأول لتنس الطاولة',
        titleEn: 'New Cairo Table Tennis Tournament',
        descAr: 'فريق تنس الطاولة يفوز بالمركز الأول وكأس البطولة الإقليمية بعد مواجهة حاسمة أمام نخبة أندية القاهرة الجديدة.',
        descEn: 'Our table tennis team secured 1st place in the regional championship tournament.',
        dateAr: 'أكتوبر ٢٠٢٥',
        dateEn: 'October 2025',
        icon: '🏓',
        color: '#ec4899',
        colorAlt: '#db2777',
        tagAr: 'تنس طاولة',
        tagEn: 'Table Tennis',
        images: [
            { src: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?w=800&h=500&fit=crop', captionAr: 'لقطة من المباراة النهائية', captionEn: 'Final match point' },
            { src: 'https://images.unsplash.com/photo-1511067007772-9da28875404b?w=800&h=500&fit=crop', captionAr: 'تركيز وتكنيك احترافي', captionEn: 'Precision technique' },
        ],
    }
];

export default function PublicGalleryPage() {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useThemeStore();
    const { language, toggleLanguage, isRTL } = useLanguageStore();
    const trans = t[language];
    const [animateCards, setAnimateCards] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setAnimateCards(true), 100);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className={`landing-page ${isRTL ? 'rtl-direction' : 'ltr-direction'}`}>
            {/* Nav */}
            <nav className="landing-nav" style={{ position: 'sticky', top: 0, zIndex: 900, backdropFilter: 'blur(20px)' }}>
                <div className="landing-nav-inner" style={{ maxWidth: 1300, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px' }}>
                    <div className="landing-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div className="landing-logo-icon" style={{ width: 42, height: 42, borderRadius: 14, background: 'var(--color-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                            <Trophy size={22} />
                        </div>
                        <div>
                            <span style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--color-text-primary)', display: 'block' }}>
                                {trans.brandShort}
                            </span>
                            <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                                {trans.slogan}
                            </span>
                        </div>
                    </div>

                    <div className="landing-nav-links" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                        <a style={{ cursor: 'pointer', color: 'var(--color-text-secondary)', fontWeight: 600 }} onClick={() => navigate('/')}>
                            {trans.home}
                        </a>
                        <a style={{ cursor: 'pointer', color: 'var(--color-text-secondary)', fontWeight: 600 }} onClick={() => navigate('/#facilities')}>
                            {trans.facilities}
                        </a>
                        <a style={{ cursor: 'pointer', color: 'var(--color-accent-3)', fontWeight: 700 }} onClick={() => navigate('/bookings')}>
                            {trans.bookNow}
                        </a>
                    </div>

                    <div className="landing-nav-actions" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <button
                            className="btn btn-secondary"
                            onClick={toggleLanguage}
                            style={{ padding: '8px 12px', fontSize: '0.82rem', gap: 6, fontWeight: 700 }}
                        >
                            <Globe size={16} />
                            {language === 'ar' ? 'English' : 'العربية'}
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={toggleTheme}
                            style={{ padding: '8px 10px' }}
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
                        </button>
                        <button className="btn btn-secondary" onClick={() => navigate('/')} style={{ gap: 6 }}>
                            <ArrowLeft size={16} style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
                            {language === 'ar' ? 'الرجوع للرئيسية' : 'Back to Home'}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Header */}
            <section className="landing-hero" style={{ minHeight: '320px', padding: '60px 24px 40px', textAlign: 'center' }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 14px', borderRadius: '20px', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', fontSize: '0.82rem', fontWeight: 800, marginBottom: 14 }}>
                        <Trophy size={18} />
                        <span>{language === 'ar' ? 'لوحة الشرف والإنجازات الرياضية' : 'Hall of Fame & Trophies'}</span>
                    </div>
                    <h1 className="landing-hero-title" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', fontWeight: 900, marginBottom: 14 }}>
                        {language === 'ar' ? 'معرض بطولات وإنجازات' : 'Club Champions'}{' '}
                        <span className="landing-gradient-text">
                            {language === 'ar' ? 'أبطال التجمع الأول' : 'Gallery'}
                        </span>
                    </h1>
                    <p className="landing-hero-subtitle" style={{ maxWidth: 640, margin: '0 auto', fontSize: '1rem', color: 'var(--color-text-secondary)' }}>
                        {language === 'ar'
                            ? 'نحتفي بأبنائنا وأبطال أكاديميات المركز الذين مثلوا التجمع الأول في بطولات الجمهورية وتوجوا بالمراكز الأولى.'
                            : 'Celebrating our athletes victories across karate, swimming, football, table tennis and more.'}
                    </p>
                </div>
            </section>

            {/* Gallery Sections */}
            <section style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 80px' }}>
                {gallerySections.map((section, sectionIdx) => (
                    <div
                        key={section.id}
                        style={{
                            marginBottom: 64,
                            opacity: animateCards ? 1 : 0,
                            transform: animateCards ? 'translateY(0)' : 'translateY(30px)',
                            transition: `all 0.6s ease ${sectionIdx * 0.12}s`,
                        }}
                    >
                        {/* Section Header */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
                            <div
                                style={{
                                    width: 52,
                                    height: 52,
                                    borderRadius: 16,
                                    background: `linear-gradient(135deg, ${section.color}, ${section.colorAlt})`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.6rem',
                                    flexShrink: 0,
                                    color: 'white'
                                }}
                            >
                                {section.icon}
                            </div>
                            <div style={{ flex: 1, minWidth: 220 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4, flexWrap: 'wrap' }}>
                                    <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--color-text-primary)', margin: 0 }}>
                                        {language === 'ar' ? section.titleAr : section.titleEn}
                                    </h2>
                                    <span style={{
                                        background: `${section.color}22`,
                                        color: section.color,
                                        padding: '3px 12px',
                                        borderRadius: 20,
                                        fontSize: '0.75rem',
                                        fontWeight: 800,
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 5,
                                        border: `1px solid ${section.color}44`,
                                    }}>
                                        <Medal size={13} />
                                        {language === 'ar' ? section.tagAr : section.tagEn}
                                    </span>
                                </div>
                                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', margin: '0 0 4px', lineHeight: 1.5 }}>
                                    {language === 'ar' ? section.descAr : section.descEn}
                                </p>
                                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                                    {language === 'ar' ? section.dateAr : section.dateEn}
                                </span>
                            </div>
                        </div>

                        {/* Photo Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                            {section.images.map((img, imgIdx) => (
                                <div
                                    key={imgIdx}
                                    style={{
                                        borderRadius: 16,
                                        overflow: 'hidden',
                                        position: 'relative',
                                        aspectRatio: '16/11',
                                        background: 'var(--color-bg-card)',
                                        border: '1px solid var(--color-border)',
                                        boxShadow: 'var(--shadow-sm)'
                                    }}
                                >
                                    <img
                                        src={img.src}
                                        alt={language === 'ar' ? img.captionAr : img.captionEn}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
                                        loading="lazy"
                                        onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                                        onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                                    />
                                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(10, 10, 26, 0.9))', padding: '24px 14px 10px' }}>
                                        <span style={{ fontSize: '0.82rem', color: 'white', fontWeight: 700 }}>
                                            {language === 'ar' ? img.captionAr : img.captionEn}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {sectionIdx < gallerySections.length - 1 && (
                            <div style={{ height: 1, background: 'var(--color-border)', marginTop: 48 }} />
                        )}
                    </div>
                ))}
            </section>

            {/* Footer */}
            <footer style={{ textAlign: 'center', padding: '32px 24px', borderTop: '1px solid var(--color-border)', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                © 2026 {trans.brand}. {language === 'ar' ? 'جميع الحقوق محفوظة' : 'All rights reserved.'}
            </footer>
        </div>
    );
}
