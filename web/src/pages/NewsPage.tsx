import { useState } from 'react';
import { Newspaper, Clock, User, Pin, ChevronRight, ExternalLink, X, Globe, Trophy } from 'lucide-react';
import { useLanguageStore } from '../store/languageStore';
import { clubNewsList, NewsItem } from './PublicNewsPage';

export default function NewsPage() {
    const { language, isRTL } = useLanguageStore();
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [activeModalArticle, setActiveModalArticle] = useState<NewsItem | null>(null);

    const categories = [
        { id: 'all', labelAr: 'جميع الأخبار', labelEn: 'All News' },
        { id: 'official', labelAr: 'بيانات وقرارات رسمية', labelEn: 'Official Statements' },
        { id: 'sports', labelAr: 'أنشطة وبطولات رياضية', labelEn: 'Sports & Tournaments' },
        { id: 'maintenance', labelAr: 'تطوير وصيانة المرافق', labelEn: 'Facilities & Upgrades' },
        { id: 'community', labelAr: 'أنشطة مجتمعية وثقافية', labelEn: 'Community & Culture' },
    ];

    const filtered = selectedCategory === 'all'
        ? clubNewsList
        : clubNewsList.filter((n) => n.category === selectedCategory);

    const featured = filtered.find((n) => n.featured) || filtered[0];
    const rest = filtered.filter((n) => n.id !== featured?.id);

    const getCategoryBadge = (category: string) => {
        switch (category) {
            case 'official':
                return { textAr: 'بيان رسمي', textEn: 'Official', badgeClass: 'badge-error' };
            case 'sports':
                return { textAr: 'بطولات ورياضة', textEn: 'Sports', badgeClass: 'badge-success' };
            case 'maintenance':
                return { textAr: 'صيانة وتطوير', textEn: 'Maintenance', badgeClass: 'badge-purple' };
            case 'community':
                return { textAr: 'نشاط مجتمعي', textEn: 'Community', badgeClass: 'badge-info' };
            default:
                return { textAr: 'عام', textEn: 'General', badgeClass: 'badge-secondary' };
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">
                        {language === 'ar' ? 'أخبار المركز والبيانات الرسمية' : 'Club News & Official Updates'}
                    </h1>
                    <p className="page-subtitle">
                        {language === 'ar'
                            ? 'متابعة حية لقرارات وزارة الشباب والرياضة وأنشطة وبطولات مركز التنمية الشبابية بالتجمع الأول المعتمدة'
                            : 'Live coverage of ministerial visits, championships, and official statements for First Settlement Center'}
                    </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Newspaper size={20} style={{ color: 'var(--color-accent-3)' }} />
                    <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                        {clubNewsList.length} {language === 'ar' ? 'أخبار موثقة بالإنترنت' : 'verified articles'}
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
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        {language === 'ar' ? cat.labelAr : cat.labelEn}
                    </button>
                ))}
            </div>

            {/* Featured Story */}
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
                            <Pin size={12} /> {language === 'ar' ? 'بيان رسمي مثبت' : 'Official Pinned Story'}
                        </span>
                        <span className={`badge ${getCategoryBadge(featured.category).badgeClass}`}>
                            {language === 'ar' ? getCategoryBadge(featured.category).textAr : getCategoryBadge(featured.category).textEn}
                        </span>
                        <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                            {featured.date}
                        </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28, alignItems: 'center' }}>
                        <div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--color-text-primary)', lineHeight: 1.35, marginBottom: 14 }}>
                                {language === 'ar' ? featured.titleAr : featured.titleEn}
                            </h2>
                            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 18 }}>
                                {language === 'ar' ? featured.excerptAr : featured.excerptEn}
                            </p>

                            <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: 20, flexWrap: 'wrap' }}>
                                <span><User size={14} style={{ verticalAlign: 'middle' }} /> {language === 'ar' ? featured.authorAr : featured.authorEn}</span>
                                <span><Clock size={14} style={{ verticalAlign: 'middle' }} /> {language === 'ar' ? featured.readTimeAr : featured.readTimeEn}</span>
                            </div>

                            <button className="btn btn-primary" onClick={() => setActiveModalArticle(featured)} style={{ gap: 8, padding: '10px 22px' }}>
                                {language === 'ar' ? 'قراءة البيان والتفاصيل كاملة' : 'Read Full Coverage'}
                                <ChevronRight size={16} style={{ transform: isRTL ? 'rotate(180deg)' : 'none' }} />
                            </button>
                        </div>

                        {featured.image && (
                            <div style={{ borderRadius: '18px', overflow: 'hidden', height: 250, boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-border)' }}>
                                <img
                                    src={featured.image}
                                    alt={featured.titleAr}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80';
                                    }}
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
                {rest.map((article) => {
                    const badge = getCategoryBadge(article.category);
                    return (
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
                                <div style={{ height: 180, overflow: 'hidden', position: 'relative' }}>
                                    <img
                                        src={article.image}
                                        alt={article.titleAr}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80';
                                        }}
                                    />
                                    {article.pinned && (
                                        <span style={{ position: 'absolute', top: 10, [isRTL ? 'left' : 'right']: 10, background: '#f59e0b', color: '#1e1b4b', padding: '3px 10px', borderRadius: '10px', fontSize: '0.72rem', fontWeight: 800 }}>
                                            ★ {language === 'ar' ? 'مميز' : 'Pinned'}
                                        </span>
                                    )}
                                </div>
                            )}
                            <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                        <span className={`badge ${badge.badgeClass}`} style={{ fontSize: '0.72rem' }}>
                                            {language === 'ar' ? badge.textAr : badge.textEn}
                                        </span>
                                        <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{article.date}</span>
                                    </div>
                                    <h3 style={{ fontSize: '1.08rem', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: 10, lineHeight: 1.4 }}>
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
                    );
                })}
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
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                                <span className={`badge ${getCategoryBadge(activeModalArticle.category).badgeClass}`}>
                                    {language === 'ar' ? getCategoryBadge(activeModalArticle.category).textAr : getCategoryBadge(activeModalArticle.category).textEn}
                                </span>
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
                            <div style={{ borderRadius: '16px', overflow: 'hidden', maxHeight: 300, marginBottom: 24, border: '1px solid var(--color-border)' }}>
                                <img
                                    src={activeModalArticle.image}
                                    alt="News"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80';
                                    }}
                                />
                            </div>
                        )}

                        <h2 style={{ fontSize: '1.45rem', fontWeight: 900, color: 'var(--color-text-primary)', marginBottom: 16, lineHeight: 1.35 }}>
                            {language === 'ar' ? activeModalArticle.titleAr : activeModalArticle.titleEn}
                        </h2>

                        <div style={{ fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--color-text-secondary)', whiteSpace: 'pre-line', marginBottom: 24 }}>
                            {language === 'ar' ? activeModalArticle.bodyAr : activeModalArticle.bodyEn}
                        </div>

                        {activeModalArticle.sources && (
                            <div style={{ padding: '16px', borderRadius: '14px', background: 'var(--color-bg-primary)', border: '1px solid var(--color-border)', marginBottom: 20 }}>
                                <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: 10 }}>
                                    {language === 'ar' ? 'مصادر الخبر الرسمية للتوثيق عبر الإنترنت:' : 'Official News Sources & Verified Citations:'}
                                </span>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {activeModalArticle.sources.map((src, i) => (
                                        <a
                                            key={i}
                                            href={src.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                fontSize: '0.84rem',
                                                color: '#38bdf8',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 6,
                                                textDecoration: 'none'
                                            }}
                                        >
                                            <Globe size={14} />
                                            <span>{src.title}</span>
                                            <ExternalLink size={12} />
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
