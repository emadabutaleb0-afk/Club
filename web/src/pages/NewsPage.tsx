import { useState, useEffect } from 'react';
import { Newspaper, Clock, User, Pin, ChevronRight, TrendingUp, ExternalLink, X, Building2, CheckCircle2 } from 'lucide-react';
import { useLanguageStore } from '../store/languageStore';

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
    image?: string;
    sources?: { title: string; url: string }[];
}

const newsList: NewsItem[] = [
    {
        id: '1',
        titleAr: 'في جولة مفاجئة.. وزير الشباب والرياضة يتفقد مركز التنمية الشبابية بالتجمع الأول',
        titleEn: 'In Surprise Field Inspection: Minister of Youth & Sports Visits First Settlement Youth Development Center',
        excerptAr: 'في ضوء الزيارات الميدانية المتواصلة، تفقد جوهر نبيل، وزير الشباب والرياضة، يرافقه د. مصطفى زمزم مساعد الوزير، مرافق المركز ووجه بسرعة الانتهاء من أعمال الصيانة والدهانات وتوفير أحدث التجهيزات الرياضية لكافة الألعاب.',
        excerptEn: 'Minister of Youth & Sports Gohar Nabil, accompanied by Assistant Minister Dr. Mostafa Zamzam, conducted a surprise inspection of the Center facilities, directing accelerated maintenance and provision of modern equipment.',
        bodyAr: `في ضوء الزيارات المفاجئة الميدانية المتواصلة تفقد جوهر نبيل، وزير الشباب والرياضة، مركز التنمية الشبابية بالتجمع الأول، يرافقه الدكتور مصطفى زمزم، مساعد الوزير لتطوير مراكز الشباب والتنمية المجتمعية.

وتفقد وزير الشباب والرياضة خلال جولته عدداً من المرافق، من بينها حمام السباحة وصالة الألعاب الرياضية ومكاتب الموظفين، كما اطلع على سير أعمال الصيانة والدهانات الجارية بالمبنى الإداري.

وفي هذا الإطار، وجه وزير الشباب والرياضة بسرعة الانتهاء من أعمال الصيانة ودهانات المبنى الإداري وفقاً لأعلى مستويات الجودة، مع الاستفادة من الموارد المالية المتاحة للارتقاء بمستوى الخدمات المقدمة.

كما شدد الوزير على أهمية توفير الأدوات والتجهيزات الرياضية اللازمة لمختلف الألعاب، بما يضمن جاهزية المنشأة وتقديم خدمات أفضل لشباب وأسر المنطقة.`,
        bodyEn: `As part of ongoing unannounced field inspections, Minister of Youth & Sports Gohar Nabil inspected the First Settlement Youth Development Center, accompanied by Dr. Mostafa Zamzam, Assistant Minister for Youth Centers and Community Development.

During the tour, the Minister inspected multiple facilities including the swimming pool, the sports arena (gym), and administrative staff offices, closely reviewing ongoing maintenance and painting works.

The Minister directed the swift completion of maintenance and painting of the administrative building to the highest quality standards, leveraging available resources to elevate service quality.

Furthermore, the Minister stressed the importance of supplying all essential sports equipment and tools across various disciplines, ensuring facility readiness and delivering superior services to the families and youth of the district.`,
        authorAr: 'وزارة الشباب والرياضة ورئاسة مجلس الوزراء',
        authorEn: 'Ministry of Youth & Sports & Egyptian Cabinet',
        date: '2026/09/25',
        category: 'official',
        readTimeAr: '٣ دقائق قراءة',
        readTimeEn: '3 min read',
        pinned: true,
        featured: true,
        image: 'https://www.emys.gov.eg/uploads/photos/2026/09/1790364166.jpg',
        sources: [
            { title: 'بوابة وزارة الشباب والرياضة الرسمية', url: 'https://www.emys.gov.eg/news/21600' },
            { title: 'موقع صدى العرب الإخباري', url: 'https://www.sada-elarab.com/820789' },
            { title: 'الصفحة الرسمية لرئاسة مجلس الوزراء', url: 'https://www.facebook.com/EgyptianCabinet/posts/1698085385695208/' },
        ]
    },
    {
        id: '2',
        titleAr: 'بدء تنفيذ توجيهات الوزير: رفع كفاءة مجمع حمام السباحة وصالة اللياقة البدنية',
        titleEn: 'Executing Ministerial Directives: Upgrading the Swimming Complex & Gymnasium Arena',
        excerptAr: 'تنفيذاً لتوجيهات وزير الشباب والرياضة، انطلقت اليوم فرق الصيانة الفنية في أعمال العزل والدهانات وتجديد غرف تبديل الملابس بمجمع السباحة الأولمبي.',
        excerptEn: 'Following ministerial directives, engineering and technical crews commenced comprehensive painting, insulation, and upgrades across the Olympic swimming complex.',
        bodyAr: 'انطلقت اليوم فرق العمل الفنية والهندسية في تنفيذ خطة التطوير الشاملة الموجه بها من وزير الشباب والرياضة جوهر نبيل، والتي تشمل استكمال دهانات الواجهات والمبنى الإداري، ورفع كفاءة صيانة المضخات وفلاتر مجمع حمامات السباحة الأولمبي، بالإضافة إلى تحديث أجهزة القياس البدني بصالة اللياقة البدنية، لتكون المنشأة في أبهى صورها أمام الأعضاء والمشاركين.',
        bodyEn: 'Technical crews began executing the comprehensive improvement plan instructed by the Minister, including facade refurbishment, pool pump and filter maintenance, and gym equipment modernizations.',
        authorAr: 'إدارة الصيانة والتشغيل',
        authorEn: 'Operations & Maintenance Dept',
        date: '2026/09/26',
        category: 'maintenance',
        readTimeAr: 'دقيقتان',
        readTimeEn: '2 min read',
        pinned: true,
        featured: false,
        image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&fit=crop'
    },
    {
        id: '3',
        titleAr: 'فتح باب تجديد العضويات السنوية 2026 وسداد رسوم الأكاديميات عبر فوري',
        titleEn: '2026 Annual Membership Renewal & Academy Fees Now Payable via Fawry',
        excerptAr: 'أطلقت إدارة المركز منظومة التحصيل الإلكتروني لتيسير تجديد الاشتراكات السنوية وسداد اشتراكات الأكاديميات الرياضية عبر فوري والبطاقات البنكية.',
        excerptEn: 'The Center has activated online fee calculation and payment via Fawry code and bank cards with family discounts.',
        bodyAr: 'تعلن إدارة المركز عن فتح باب تجديد الاشتراكات السنوية لموسم 2026/2027، مع إتاحة سداد الرسوم من خلال فروع فوري بكود سداد موحد، أو عبر البطاقات البنكية والمحافظ الإلكترونية، مع تقديم تيسيرات وخصومات خاصة للأسر وأصحاب الاشتراكات المتعددة في الأكاديميات الرياضية.',
        bodyEn: 'Annual membership renewal for 2026/2027 is now open, offering seamless payment via nationwide Fawry branches, cards, and wallets with sibling discounts.',
        authorAr: 'شؤون العضوية والاشتراكات',
        authorEn: 'Membership Affairs',
        date: '2026/09/20',
        category: 'official',
        readTimeAr: '٣ دقائق',
        readTimeEn: '3 min read',
        pinned: false,
        featured: false,
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&fit=crop'
    },
    {
        id: '4',
        titleAr: 'انطلاق برنامج اختبارات وتجارب اكتشاف المواهب الرياضية الواعدة',
        titleEn: 'Launch of the Youth Sports Talent Scouting Assessment Program',
        excerptAr: 'بالتعاون مع الاتحادات الرياضية المصرية، يستقبل المركز الأطفال والناشئين لتقييم المهارات البدنية وتوجيههم للأكاديميات المتخصصة في السباحة والكاراتيه وتنس الطاولة.',
        excerptEn: 'In collaboration with Egyptian sports federations, the Center welcomes youth for kinetic assessments and direct placement into elite academies.',
        bodyAr: 'بدأت لجان التقييم الفني للمواهب الرياضية عملها لاختبار البراعم والناشئين من سن 4 وحتى 16 سنة في رياضات السباحة الأولمبية، كاراتيه البطولات، وتنس الطاولة وكرة القدم، مع وضع برامج رعاية مخصصة لأصحاب المهارات الاستثنائية لتمثيل المركز في بطولات الجمهورية.',
        bodyEn: 'Technical evaluation committees began assessments for children and juniors aged 4 to 16 in swimming, karate, table tennis and football.',
        authorAr: 'قطاع النشاط الرياضي',
        authorEn: 'Sports Activities Sector',
        date: '2026/09/18',
        category: 'sports',
        readTimeAr: '٤ دقائق',
        readTimeEn: '4 min read',
        pinned: false,
        featured: false,
        image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&fit=crop'
    }
];

export default function NewsPage() {
    const { language, isRTL } = useLanguageStore();
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [activeModalArticle, setActiveModalArticle] = useState<NewsItem | null>(null);

    const categories = [
        { id: 'all', labelAr: 'جميع الأخبار', labelEn: 'All News' },
        { id: 'official', labelAr: 'بيانات وقرارات رسمية', labelEn: 'Official Statements' },
        { id: 'maintenance', labelAr: 'تطوير وصيانة المرافق', labelEn: 'Facilities & Upgrades' },
        { id: 'sports', labelAr: 'أنشطة وبطولات رياضية', labelEn: 'Sports & Tournaments' },
    ];

    const filtered = selectedCategory === 'all'
        ? newsList
        : newsList.filter((n) => n.category === selectedCategory);

    const featured = filtered.find((n) => n.featured) || filtered[0];
    const rest = filtered.filter((n) => n !== featured);

    return (
        <div>
            {/* Header */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">
                        {language === 'ar' ? 'أخبار المركز والبيانات الرسمية' : 'Club News & Official Updates'}
                    </h1>
                    <p className="page-subtitle">
                        {language === 'ar' ? 'متابعة حية لقرارات وزارة الشباب والرياضة وأنشطة المركز والبطولات' : 'Live coverage of ministerial visits, club activities, and announcements'}
                    </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Newspaper size={20} style={{ color: 'var(--color-accent-3)' }} />
                    <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                        {newsList.length} {language === 'ar' ? 'أخبار موثقة' : 'articles'}
                    </span>
                </div>
            </div>

            {/* Category Filters */}
            <div className="category-filters" style={{ marginBottom: 28, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        className={`filter-pill ${selectedCategory === cat.id ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(cat.id)}
                        style={{
                            padding: '8px 18px',
                            borderRadius: '20px',
                            border: `1.5px solid ${selectedCategory === cat.id ? 'var(--color-accent-1)' : 'var(--color-border)'}`,
                            background: selectedCategory === cat.id ? 'var(--color-gradient)' : 'var(--color-bg-card)',
                            color: selectedCategory === cat.id ? 'white' : 'var(--color-text-secondary)',
                            fontWeight: 700,
                            cursor: 'pointer'
                        }}
                    >
                        {language === 'ar' ? cat.labelAr : cat.labelEn}
                    </button>
                ))}
            </div>

            {/* Featured Story: Ministerial Inspection */}
            {featured && (
                <div
                    className="news-featured"
                    style={{
                        padding: '32px',
                        borderRadius: '24px',
                        background: 'linear-gradient(135deg, rgba(108, 92, 231, 0.18) 0%, rgba(16, 185, 129, 0.12) 100%)',
                        border: '1px solid rgba(108, 92, 231, 0.35)',
                        marginBottom: 36,
                        boxShadow: 'var(--shadow-md)'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
                        <span className="badge badge-info" style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                            <Pin size={12} /> {language === 'ar' ? 'بيان وزاري مثبت' : 'Official Pinned Story'}
                        </span>
                        <span className="badge badge-success">
                            {language === 'ar' ? 'الزيارات الميدانية' : 'Field Inspection'}
                        </span>
                        <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                            {featured.date}
                        </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 360px', gap: 28, alignItems: 'center' }}>
                        <div>
                            <h2 style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--color-text-primary)', lineHeight: 1.3, marginBottom: 14 }}>
                                {language === 'ar' ? featured.titleAr : featured.titleEn}
                            </h2>
                            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 18 }}>
                                {language === 'ar' ? featured.excerptAr : featured.excerptEn}
                            </p>

                            <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: 20 }}>
                                <span><User size={14} style={{ verticalAlign: 'middle' }} /> {language === 'ar' ? featured.authorAr : featured.authorEn}</span>
                                <span><Clock size={14} style={{ verticalAlign: 'middle' }} /> {language === 'ar' ? featured.readTimeAr : featured.readTimeEn}</span>
                            </div>

                            <button className="btn btn-primary" onClick={() => setActiveModalArticle(featured)} style={{ gap: 8, padding: '10px 22px' }}>
                                {language === 'ar' ? 'قراءة البيان والتوجيهات كاملة' : 'Read Full Coverage'}
                                <ChevronRight size={16} style={{ transform: isRTL ? 'rotate(180deg)' : 'none' }} />
                            </button>
                        </div>

                        {featured.image && (
                            <div style={{ borderRadius: '18px', overflow: 'hidden', height: 240, boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-border)' }}>
                                <img
                                    src={featured.image}
                                    alt="وزير الشباب والرياضة في مركز التنمية الشبابية بالتجمع الأول"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* News Grid */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                    gap: 24
                }}
            >
                {rest.map((article) => (
                    <div
                        key={article.id}
                        className="news-card"
                        style={{
                            borderRadius: '20px',
                            background: 'var(--color-bg-card)',
                            border: '1px solid var(--color-border)',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: 'var(--shadow-sm)'
                        }}
                    >
                        {article.image && (
                            <div style={{ height: 170, overflow: 'hidden' }}>
                                <img src={article.image} alt={article.titleAr} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        )}
                        <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                    <span className="badge badge-purple" style={{ fontSize: '0.72rem' }}>
                                        {article.category === 'maintenance' ? (language === 'ar' ? 'صيانة وتطوير' : 'Maintenance') : (language === 'ar' ? 'نشاط رياضي' : 'Sports')}
                                    </span>
                                    <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{article.date}</span>
                                </div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: 10, lineHeight: 1.4 }}>
                                    {language === 'ar' ? article.titleAr : article.titleEn}
                                </h3>
                                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: '0 0 16px' }}>
                                    {language === 'ar' ? article.excerptAr : article.excerptEn}
                                </p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: '1px solid var(--color-border)' }}>
                                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                                    {language === 'ar' ? article.readTimeAr : article.readTimeEn}
                                </span>
                                <button className="btn btn-secondary btn-sm" onClick={() => setActiveModalArticle(article)}>
                                    {language === 'ar' ? 'التفاصيل' : 'Details'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Article Detail Reading Modal */}
            {activeModalArticle && (
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
                    onClick={() => setActiveModalArticle(null)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            width: '100%',
                            maxWidth: '720px',
                            maxHeight: '90vh',
                            overflowY: 'auto',
                            background: 'var(--color-bg-secondary)',
                            borderRadius: '24px',
                            border: '1px solid var(--color-border)',
                            padding: '32px',
                            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <span className="badge badge-info">{activeModalArticle.date}</span>
                                <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                                    {language === 'ar' ? activeModalArticle.authorAr : activeModalArticle.authorEn}
                                </span>
                            </div>
                            <button
                                onClick={() => setActiveModalArticle(null)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)' }}
                            >
                                <X size={22} />
                            </button>
                        </div>

                        {activeModalArticle.image && (
                            <div style={{ borderRadius: '16px', overflow: 'hidden', maxHeight: 320, marginBottom: 24, border: '1px solid var(--color-border)' }}>
                                <img
                                    src={activeModalArticle.image}
                                    alt="News"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                        )}

                        <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--color-text-primary)', marginBottom: 16, lineHeight: 1.3 }}>
                            {language === 'ar' ? activeModalArticle.titleAr : activeModalArticle.titleEn}
                        </h2>

                        <div style={{ fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--color-text-secondary)', whiteSpace: 'pre-line', marginBottom: 24 }}>
                            {language === 'ar' ? activeModalArticle.bodyAr : activeModalArticle.bodyEn}
                        </div>

                        {activeModalArticle.sources && (
                            <div style={{ padding: '16px', borderRadius: '14px', background: 'var(--color-bg-primary)', border: '1px solid var(--color-border)', marginBottom: 20 }}>
                                <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: 10 }}>
                                    {language === 'ar' ? 'مصادر الخبر الرسمية للتوثيق:' : 'Official News Sources & Citations:'}
                                </span>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {activeModalArticle.sources.map((src, i) => (
                                        <a
                                            key={i}
                                            href={src.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                fontSize: '0.85rem',
                                                color: 'var(--color-accent-3)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 6,
                                                textDecoration: 'none'
                                            }}
                                        >
                                            <ExternalLink size={14} />
                                            <span>{src.title}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button className="btn btn-secondary" onClick={() => setActiveModalArticle(null)}>
                                {language === 'ar' ? 'إغلاق' : 'Close'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
