import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Trophy, ArrowRight, ArrowLeft, Calendar, User, ExternalLink,
    Shield, Globe, Sun, Moon, Sparkles, Phone, MapPin, Building2, Flame
} from 'lucide-react';
import { useLanguageStore } from '../store/languageStore';
import { useThemeStore } from '../store/themeStore';
import { motion, AnimatePresence } from 'framer-motion';

interface NewsItem {
    id: string;
    titleAr: string;
    titleEn: string;
    excerptAr: string;
    excerptEn: string;
    bodyAr: string;
    bodyEn: string;
    authorAr: string;
    authorEn: string;
    date: string;
    category: 'official' | 'sports' | 'maintenance' | 'community';
    readTimeAr: string;
    readTimeEn: string;
    pinned: boolean;
    featured: boolean;
    image: string;
    sources?: { title: string; url: string }[];
}

const newsList: NewsItem[] = [
    {
        id: '1',
        titleAr: 'في جولة مفاجئة.. وزير الشباب والرياضة (جوهر نبيل) يتفقد مركز التنمية الشبابية بالتجمع الأول',
        titleEn: 'Surprise Field Inspection: Minister of Youth & Sports (Gohar Nabil) Visits First Settlement Youth Development Center',
        excerptAr: 'في ضوء المتابعة الميدانية المستمرة، تفقد السيد الوزير جوهر نبيل يرافقه د. مصطفى زمزم مساعد الوزير مرافق المركز بالكامل، ووجه بسرعة الانتهاء من أعمال الصيانة الشاملة والدهانات للمبنى الإداري وتوفير أحدث التجهيزات والأدوات الرياضية.',
        excerptEn: 'As part of ongoing field inspections, Minister of Youth & Sports Gohar Nabil, accompanied by Assistant Minister Dr. Mostafa Zamzam, inspected the center, directing accelerated maintenance and provision of modern equipment.',
        bodyAr: `في إطار المتابعة الميدانية المستمرة والحرص على الارتقاء بجودة الخدمات المقدمة للشباب والأسرة المصرية، أجرى السيد جوهر نبيل، وزير الشباب والرياضة، جولة تفقدية مفاجئة لمركز التنمية الشبابية بالتجمع الأول بمحافظة القاهرة، يرافقه الدكتور مصطفى زمزم، مساعد الوزير لتطوير مراكز الشباب والتنمية المجتمعية.

وشملت الجولة الميدانية الموسعة تفقد مجمع حمامات السباحة الأولمبي لمتابعة كفاءة تشغيل الفلاتر وجودة المياه والمدرجات، وصالة اللياقة البدنية والألعاب الرياضية (الجيم) للوقوف على مستوى الأجهزة والمعدات المتوفرة للأعضاء، بالإضافة إلى المبنى الإداري ومكاتب خدمة الأعضاء والموظفين.

وخلال الجولة، وجّه السيد وزير الشباب والرياضة بسرعة الانتهاء من أعمال الصيانة الشاملة والدهانات للمبنى الإداري وفقاً لأعلى معايير الجودة والسلامة، مع التأكيد على ضرورة الاستغلال الأمثل للموارد المالية المتاحة للمركز بما يضمن تقديم خدمات متطورة ومتميزة تلبي تطلعات رواد وأبناء التجمع الأول والقاهرة الجديدة.

كما شدد السيد الوزير على أهمية توفير كافة الأدوات والتجهيزات الرياضية الحديثة لمختلف الألعاب الفردية والجماعية داخل الأكاديميات، لضمان جاهزية المنشآت ودعم واكتشاف المواهب الشابة لتغذية المنتخبات الوطنية.`,
        bodyEn: `As part of ongoing unannounced field inspections to elevate community services, Minister of Youth & Sports Gohar Nabil conducted a surprise inspection tour of the First Settlement Youth Development Center in New Cairo, accompanied by Dr. Mostafa Zamzam, Assistant Minister for Youth Centers and Community Development.

The tour covered the Olympic swimming pool complex, modern fitness gymnasium, and the administrative headquarters and member service offices.

The Minister directed swift completion of all maintenance and painting works across the administrative facilities to the highest quality standards, while ensuring efficient allocation of available resources to deliver superior community services.

Furthermore, the Minister instructed the immediate provision of state-of-the-art sports gear and equipment across all accredited academies to cultivate emerging athletic talent.`,
        authorAr: 'وزارة الشباب والرياضة ورئاسة مجلس الوزراء',
        authorEn: 'Ministry of Youth & Sports & Egyptian Cabinet',
        date: '٢٥ سبتمبر ٢٠٢٦',
        category: 'official',
        readTimeAr: '٣ دقائق قراءة',
        readTimeEn: '3 min read',
        pinned: true,
        featured: true,
        image: 'https://www.emys.gov.eg/uploads/photos/2026/09/1790364166.jpg',
        sources: [
            { title: 'بوابة وزارة الشباب والرياضة الرسمية (الخبر 21600)', url: 'https://www.emys.gov.eg/news/21600/%D9%81%D9%8A-%D8%AC%D9%88%D9%84%D8%A9-%D9%85%D9%81%D8%A7%D8%AC%D8%A6%D8%A9-%D9%88%D8%B2%D9%8A%D8%B1-%D8%A7%D9%84%D8%B4%D8%A8%D8%A7%D8%A8-%D9%88%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6%D8%A9-%D9%8A%D8%AA%D9%81%D9%82%D8%AF-%D9%85%D8%B1%D9%83%D8%B2-%D8%A7%D9%84%D8%AA%D9%86%D9%85%D9%8A%D8%A9-%D8%A7%D9%84%D8%B4%D8%A8%D8%A7%D8%A8%D9%8A%D8%A9-%D8%A8%D8%A7%D9%84%D8%AA%D8%AC%D9%85%D8%B9-%D8%A7%D9%84%D8%A3%D9%88%D9%84' },
            { title: 'الصفحة الرسمية لرئاسة مجلس الوزراء (Facebook)', url: 'https://www.facebook.com/share/p/18byx4fosi/' },
            { title: 'تغطية جريدة صدى العرب الإخبارية (820789)', url: 'https://www.sada-elarab.com/820789' }
        ]
    },
    {
        id: '2',
        titleAr: 'بدء تنفيذ توجيهات الوزير: رفع كفاءة مجمع حمام السباحة وصالة اللياقة البدنية',
        titleEn: 'Executing Directives: Full Modernization of Pool Complex & Fitness Arena',
        excerptAr: 'تنفيذاً لتوجيهات السيد الوزير جوهر نبيل، بدأت الفرق الفنية والهندسية في صيانة أنظمة التدفئة والفلاتر وتجهيز الصالة بأحدث الأجهزة الرياضية.',
        excerptEn: 'Following ministerial directives, engineering crews began deep maintenance across the Olympic pool heating and state-of-the-art gym equipment.',
        bodyAr: 'بدأت لجان الصيانة والتشغيل الفوري بتنفيذ توصيات جولة وزير الشباب والرياضة، حيث تشمل الأعمال الجارية استكمال دهانات الواجهات والمبنى الإداري بأرقى الخامات، وصيانة دورة التعقيم والتنقية بمجمع حمام السباحة، وتوريد دفعة جديدة من الأجهزة الرياضية الحديثة لدعم تدريبات الأكاديميات.',
        bodyEn: 'Operations crews began executing the comprehensive improvement plan instructed by the Minister, including facade painting, water filtration upgrades, and supplying advanced athletic machines.',
        authorAr: 'إدارة التشغيل والمرافق',
        authorEn: 'Facilities & Operations Directorate',
        date: '٢٦ سبتمبر ٢٠٢٦',
        category: 'maintenance',
        readTimeAr: 'دقيقتان',
        readTimeEn: '2 min read',
        pinned: true,
        featured: false,
        image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1000&q=80'
    },
    {
        id: '3',
        titleAr: 'فتح باب تجديد الاشتراكات السنوية لعام 2026 وسداد الأكاديميات عبر فوري وإنستاباي',
        titleEn: '2026 Membership Renewals Open via Fawry & InstaPay',
        excerptAr: 'تسهيلاً على الأعضاء، تتيح إدارة المركز سداد رسوم العضويات السنوية واشتراكات الأكاديميات الرياضية إلكترونياً مع خصومات الأخوة العائلية.',
        excerptEn: 'Annual membership renewal for 2026 is officially open via nationwide Fawry branches, InstaPay (01013010137) and bank cards.',
        bodyAr: 'أعلنت إدارة الشؤون المالية والعضوية عن بدء سداد اشتراكات التجديد السنوي لعام 2026 مع توفير الدفع الإلكتروني عبر كود فوري مخصص، أو المحافظ الإلكترونية وإنستاباي على الرقم الرسمي للمركز (01013010137)، مع منح خصومات للأسر وأصحاب الاشتراكات المتعددة.',
        bodyEn: 'The club activated electronic payments for 2026 renewals and sport academies via Fawry, InstaPay and card gateways.',
        authorAr: 'شؤون العضوية والاشتراكات',
        authorEn: 'Membership Affairs',
        date: '٢٠ سبتمبر ٢٠٢٦',
        category: 'official',
        readTimeAr: '٣ دقائق',
        readTimeEn: '3 min read',
        pinned: false,
        featured: false,
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80'
    },
    {
        id: '4',
        titleAr: 'انطلاق برنامج اكتشاف المواهب الرياضية ورعاية أبطال المستقبل بالتجمع الأول',
        titleEn: 'Youth Talent Scouting Program Kicks Off in New Cairo',
        excerptAr: 'بالتنسيق مع الاتحادات الرياضية المصرية، يستقبل المركز البراعم والناشئين لتقييم المهارات الحركية وإعدادهم للمنافسات والبطولات الرسمية.',
        excerptEn: 'In collaboration with Egyptian Sports Federations, the center launched comprehensive skill assessments for youth aged 4 to 16.',
        bodyAr: 'انطلقت اليوم المرحلة الأولى من اختبارات اكتشاف المواهب في السباحة الأولمبية، كاراتيه البطولات، كرة القدم وتنس الطاولة، بإشراف مدربين معتمدين دولياً لوضع خطط تدريب ورعاية متخصصة للأبطال الواعدين.',
        bodyEn: 'Phase one of the athletic talent assessment program commenced across swimming, karate, soccer and racquet sports.',
        authorAr: 'قطاع النشاط الرياضي',
        authorEn: 'Athletics Sector',
        date: '١٨ سبتمبر ٢٠٢٦',
        category: 'sports',
        readTimeAr: '٤ دقائق',
        readTimeEn: '4 min read',
        pinned: false,
        featured: false,
        image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1000&q=80'
    }
];

export default function PublicNewsPage() {
    const navigate = useNavigate();
    const { language, toggleLanguage, isRTL } = useLanguageStore();
    const { theme, toggleTheme } = useThemeStore();
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [activeModalItem, setActiveModalItem] = useState<NewsItem | null>(null);

    const categories = [
        { id: 'all', labelAr: 'جميع الأخبار والبيانات', labelEn: 'All Press Updates' },
        { id: 'official', labelAr: 'بيانات وزارة الشباب والرياضة', labelEn: 'Ministry Statements' },
        { id: 'maintenance', labelAr: 'تطوير وصيانة المنشآت', labelEn: 'Facilities Upgrades' },
        { id: 'sports', labelAr: 'أنشطة وبطولات المركز', labelEn: 'Sports & Tournaments' },
    ];

    const filtered = selectedCategory === 'all'
        ? newsList
        : newsList.filter((n) => n.category === selectedCategory);

    const featuredArticle = filtered.find((n) => n.featured) || filtered[0];
    const regularArticles = filtered.filter((n) => n.id !== featuredArticle?.id);

    return (
        <div className={`landing ${isRTL ? 'rtl-direction' : 'ltr-direction'}`} style={{ minHeight: '100vh', background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)' }}>
            {/* Top Official Banner */}
            <div style={{ background: '#0f172a', color: '#94a3b8', padding: '8px 24px', fontSize: '0.8rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div style={{ maxWidth: 1250, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ color: '#ef4444', fontWeight: 800 }}>🇪🇬 جمهورية مصر العربية</span>
                        <span>•</span>
                        <span style={{ color: '#e2e8f0', fontWeight: 700 }}>وزارة الشباب والرياضة</span>
                        <span>•</span>
                        <span>المركز الإعلامي الرسمي</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <span>📞 الخط الساخن: 01013010137</span>
                        <button onClick={toggleLanguage} style={{ background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer', fontWeight: 700 }}>
                            {language === 'ar' ? 'English' : 'العربية'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation Header */}
            <header style={{ position: 'sticky', top: 0, zIndex: 900, backdropFilter: 'blur(20px)', background: 'rgba(10, 10, 26, 0.92)', borderBottom: '1px solid var(--color-border)' }}>
                <div style={{ maxWidth: 1250, margin: '0 auto', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div onClick={() => navigate('/')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 44, height: 44, borderRadius: 14, background: 'var(--color-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                            <Trophy size={22} />
                        </div>
                        <div>
                            <span style={{ fontSize: '1.15rem', fontWeight: 900, display: 'block', lineHeight: 1.2 }}>
                                {language === 'ar' ? 'مركز التنمية الشبابية بالتجمع الأول' : 'First Settlement Youth Center'}
                            </span>
                            <span style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                                {language === 'ar' ? 'البوابة الإعلامية والبيانات المعتمدة' : 'Official Press & Media Center'}
                            </span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <button className="btn btn-secondary" onClick={() => navigate('/')} style={{ gap: 8, fontSize: '0.88rem' }}>
                            <ArrowRight size={16} style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
                            {language === 'ar' ? 'العودة للرئيسية' : 'Back to Club'}
                        </button>
                        <button className="btn btn-primary" onClick={() => navigate('/login')} style={{ fontSize: '0.88rem' }}>
                            {language === 'ar' ? 'دخول الأعضاء' : 'Sign In'}
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main style={{ maxWidth: 1250, margin: '0 auto', padding: '40px 24px 80px' }}>
                {/* Page Title */}
                <div style={{ marginBottom: 36, textAlign: isRTL ? 'right' : 'left' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: '20px', background: 'rgba(239, 68, 68, 0.12)', color: '#ef4444', fontSize: '0.82rem', fontWeight: 800, marginBottom: 12 }}>
                        <Flame size={14} />
                        {language === 'ar' ? 'التغطية الحية والبيانات المعتمدة' : 'Live Official Press Feed'}
                    </div>
                    <h1 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)', fontWeight: 900, margin: '0 0 10px', color: 'var(--color-text-primary)' }}>
                        {language === 'ar' ? 'أخبار المركز والبيانات الرسمية' : 'Official News & Statements'}
                    </h1>
                    <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', maxWidth: 700, margin: 0 }}>
                        {language === 'ar'
                            ? 'المصدر الرسمي لقرارات وزارة الشباب والرياضة، جولات القيادات الميدانية، والأنشطة والبطولات بمركز التنمية الشبابية بالتجمع الأول.'
                            : 'The authoritative source for Ministry directives, leadership inspection visits, and athletic tournaments at First Settlement Youth Center.'}
                    </p>
                </div>

                {/* Filter Tabs */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 36 }}>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            style={{
                                padding: '10px 20px',
                                borderRadius: '16px',
                                border: `1.5px solid ${selectedCategory === cat.id ? 'var(--color-accent-1)' : 'var(--color-border)'}`,
                                background: selectedCategory === cat.id ? 'var(--color-gradient)' : 'var(--color-bg-card)',
                                color: selectedCategory === cat.id ? 'white' : 'var(--color-text-secondary)',
                                fontWeight: 700,
                                fontSize: '0.88rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            {language === 'ar' ? cat.labelAr : cat.labelEn}
                        </button>
                    ))}
                </div>

                {/* Featured Headline Article (Minister's Visit) */}
                {featuredArticle && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            background: 'var(--color-bg-card)',
                            borderRadius: '28px',
                            border: '1px solid var(--color-border)',
                            overflow: 'hidden',
                            marginBottom: 44,
                            boxShadow: 'var(--shadow-lg)'
                        }}
                    >
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))' }}>
                            <div style={{ position: 'relative', minHeight: 340 }}>
                                <img
                                    src={featuredArticle.image}
                                    alt={language === 'ar' ? featuredArticle.titleAr : featuredArticle.titleEn}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80';
                                    }}
                                />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15, 23, 42, 0.8) 0%, transparent 60%)' }} />
                                <span style={{ position: 'absolute', top: 18, [isRTL ? 'right' : 'left']: 18, background: '#ef4444', color: 'white', padding: '6px 16px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                                    <Shield size={14} />
                                    {language === 'ar' ? 'تغطية رسمية استثنائية' : 'Official Coverage'}
                                </span>
                            </div>

                            <div style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--color-text-muted)', fontSize: '0.82rem', marginBottom: 14 }}>
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                                            <Calendar size={14} />
                                            {featuredArticle.date}
                                        </span>
                                        <span>•</span>
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                                            <User size={14} />
                                            {language === 'ar' ? featuredArticle.authorAr : featuredArticle.authorEn}
                                        </span>
                                    </div>

                                    <h2 style={{ fontSize: 'clamp(1.4rem, 2.2vw, 1.85rem)', fontWeight: 900, lineHeight: 1.35, color: 'var(--color-text-primary)', marginBottom: 16 }}>
                                        {language === 'ar' ? featuredArticle.titleAr : featuredArticle.titleEn}
                                    </h2>

                                    <p style={{ fontSize: '0.96rem', color: 'var(--color-text-secondary)', lineHeight: 1.75, marginBottom: 20 }}>
                                        {language === 'ar' ? featuredArticle.excerptAr : featuredArticle.excerptEn}
                                    </p>

                                    {/* Sources */}
                                    {featuredArticle.sources && (
                                        <div style={{ background: 'var(--color-bg-primary)', padding: '14px', borderRadius: '16px', border: '1px solid var(--color-border)', marginBottom: 24 }}>
                                            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 700, display: 'block', marginBottom: 8 }}>
                                                {language === 'ar' ? 'المصادر الرسمية المعتمدة:' : 'Verified Official Sources:'}
                                            </span>
                                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                                {featuredArticle.sources.map((s, idx) => (
                                                    <a
                                                        key={idx}
                                                        href={s.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{ fontSize: '0.76rem', color: '#38bdf8', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '4px 10px', borderRadius: '10px', display: 'inline-flex', alignItems: 'center', gap: 4, textDecoration: 'none' }}
                                                    >
                                                        <Globe size={12} />
                                                        {s.title}
                                                        <ExternalLink size={10} />
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => setActiveModalItem(featuredArticle)}
                                        style={{ padding: '12px 24px', fontSize: '0.92rem', gap: 8 }}
                                    >
                                        {language === 'ar' ? 'قراءة البيان والتفاصيل الكاملة' : 'Read Full Ministerial Report'}
                                        <ArrowRight size={16} style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Regular News Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 26 }}>
                    {regularArticles.map((article) => (
                        <motion.div
                            key={article.id}
                            whileHover={{ y: -6 }}
                            style={{
                                background: 'var(--color-bg-card)',
                                borderRadius: '22px',
                                border: '1px solid var(--color-border)',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                boxShadow: 'var(--shadow-md)'
                            }}
                        >
                            <div style={{ position: 'relative', height: 210 }}>
                                <img
                                    src={article.image}
                                    alt={language === 'ar' ? article.titleAr : article.titleEn}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <span style={{ position: 'absolute', top: 12, [isRTL ? 'right' : 'left']: 12, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)', color: 'white', padding: '4px 12px', borderRadius: '14px', fontSize: '0.75rem', fontWeight: 700 }}>
                                    {article.date}
                                </span>
                            </div>

                            <div style={{ padding: '22px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <div>
                                    <span style={{ fontSize: '0.78rem', color: 'var(--color-accent-3)', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                                        {language === 'ar' ? article.authorAr : article.authorEn}
                                    </span>
                                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, lineHeight: 1.4, color: 'var(--color-text-primary)', marginBottom: 12 }}>
                                        {language === 'ar' ? article.titleAr : article.titleEn}
                                    </h3>
                                    <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                                        {language === 'ar' ? article.excerptAr : article.excerptEn}
                                    </p>
                                </div>

                                <div style={{ paddingTop: 18, borderTop: '1px solid var(--color-border)', marginTop: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                                        {language === 'ar' ? article.readTimeAr : article.readTimeEn}
                                    </span>
                                    <button
                                        className="btn btn-secondary btn-sm"
                                        onClick={() => setActiveModalItem(article)}
                                        style={{ padding: '6px 14px', fontSize: '0.82rem' }}
                                    >
                                        {language === 'ar' ? 'التفاصيل' : 'Read More'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>

            {/* Article Detail Modal */}
            <AnimatePresence>
                {activeModalItem && (
                    <div
                        className="modal-backdrop"
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0, 0, 0, 0.8)',
                            backdropFilter: 'blur(10px)',
                            zIndex: 1100,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '16px'
                        }}
                        onClick={() => setActiveModalItem(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                width: '100%',
                                maxWidth: '780px',
                                maxHeight: '90vh',
                                overflowY: 'auto',
                                background: 'var(--color-bg-secondary)',
                                borderRadius: '24px',
                                border: '1px solid var(--color-border)',
                                padding: '32px'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                                <span style={{ background: '#ef4444', color: 'white', padding: '4px 14px', borderRadius: '16px', fontSize: '0.76rem', fontWeight: 800 }}>
                                    {language === 'ar' ? 'بيان رسمي معتمد' : 'Official Statement'}
                                </span>
                                <button
                                    onClick={() => setActiveModalItem(null)}
                                    style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', fontSize: '1.2rem', cursor: 'pointer' }}
                                >
                                    ✕
                                </button>
                            </div>

                            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, lineHeight: 1.3, marginBottom: 12, color: 'var(--color-text-primary)' }}>
                                {language === 'ar' ? activeModalItem.titleAr : activeModalItem.titleEn}
                            </h2>

                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--color-text-muted)', fontSize: '0.82rem', marginBottom: 20 }}>
                                <span>📅 {activeModalItem.date}</span>
                                <span>•</span>
                                <span>✍️ {language === 'ar' ? activeModalItem.authorAr : activeModalItem.authorEn}</span>
                            </div>

                            <div style={{ borderRadius: '18px', overflow: 'hidden', marginBottom: 22, maxHeight: '360px' }}>
                                <img
                                    src={activeModalItem.image}
                                    alt={language === 'ar' ? activeModalItem.titleAr : activeModalItem.titleEn}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80';
                                    }}
                                />
                            </div>

                            <div style={{ fontSize: '0.98rem', color: 'var(--color-text-secondary)', lineHeight: 1.85, whiteSpace: 'pre-line', marginBottom: 26 }}>
                                {language === 'ar' ? activeModalItem.bodyAr : activeModalItem.bodyEn}
                            </div>

                            {activeModalItem.sources && (
                                <div style={{ background: 'var(--color-bg-primary)', padding: '16px', borderRadius: '14px', border: '1px solid var(--color-border)', marginBottom: 24 }}>
                                    <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--color-text-primary)', display: 'block', marginBottom: 8 }}>
                                        {language === 'ar' ? 'الروابط والمصادر الرسمية للخبر:' : 'Official Citations & Source Links:'}
                                    </span>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                        {activeModalItem.sources.map((s, idx) => (
                                            <a
                                                key={idx}
                                                href={s.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ color: '#38bdf8', fontSize: '0.82rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                                            >
                                                <Globe size={14} />
                                                {s.title}
                                                <ExternalLink size={12} />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div>
                                <button className="btn btn-secondary" onClick={() => setActiveModalItem(null)} style={{ width: '100%' }}>
                                    {language === 'ar' ? 'إغلاق' : 'Close'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Footer */}
            <footer style={{ background: 'var(--color-bg-secondary)', borderTop: '1px solid var(--color-border)', padding: '36px 24px', textAlign: 'center', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                © 2026 {language === 'ar' ? 'مركز التنمية الشبابية بالتجمع الأول • وزارة الشباب والرياضة المصرية. جميع الحقوق محفوظة.' : 'First Settlement Youth Center • Ministry of Youth & Sports. All rights reserved.'}
            </footer>
        </div>
    );
}
