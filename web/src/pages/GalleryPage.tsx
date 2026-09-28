import { useState, useEffect, useCallback } from 'react';
import { Image, X, ChevronLeft, ChevronRight, ZoomIn, Calendar, MapPin } from 'lucide-react';

const galleryCategories = ['All', 'Facilities', 'Events', 'Teams', 'Social', 'Championships'] as const;
type GalleryCat = typeof galleryCategories[number];

interface GalleryItem {
    id: string;
    title: string;
    description: string;
    category: Exclude<GalleryCat, 'All'>;
    date: string;
    color: string;     // gradient color for placeholder
    colorAlt: string;
    icon: string;
}

const galleryItems: GalleryItem[] = [
    { id: '1', title: 'Olympic Swimming Pool', description: 'Our brand-new 50m Olympic-sized pool with 8 lanes, state-of-the-art filtration, and heated water year-round.', category: 'Facilities', date: 'Feb 2026', color: '#0ea5e9', colorAlt: '#2563eb', icon: '🏊' },
    { id: '2', title: 'Annual Gala Dinner 2025', description: 'Members enjoying the glamorous annual gala. Over 250 guests celebrated with live entertainment and awards.', category: 'Events', date: 'Dec 2025', color: '#f59e0b', colorAlt: '#ef4444', icon: '🎉' },
    { id: '3', title: 'Kids Swimming Championship', description: 'Young swimmers competing in the 50m freestyle finals. Our junior athletes showed incredible skill and determination.', category: 'Championships', date: 'Nov 2025', color: '#10b981', colorAlt: '#059669', icon: '🏅' },
    { id: '4', title: 'BBQ Social Night', description: 'Members gathered for our monthly BBQ night. Great food, great company, and beautiful sunset views.', category: 'Social', date: 'Jan 2026', color: '#ec4899', colorAlt: '#a855f7', icon: '🍖' },
    { id: '5', title: 'Modern Fitness Center', description: 'Fully equipped with Technogym machines, free weights, and a dedicated stretching area with panoramic windows.', category: 'Facilities', date: 'Jan 2026', color: '#6c5ce7', colorAlt: '#818cf8', icon: '💪' },
    { id: '6', title: 'Youth Football Academy', description: 'Our U-16 football academy players during their weekend training session on the main pitch.', category: 'Teams', date: 'Jan 2026', color: '#22c55e', colorAlt: '#14b8a6', icon: '⚽' },
    { id: '7', title: 'Winter Holiday Party', description: 'Festive decorations, Secret Santa, and hot cocoa. A warm and cheerful gathering to close out the year.', category: 'Social', date: 'Dec 2025', color: '#ef4444', colorAlt: '#dc2626', icon: '🎄' },
    { id: '8', title: 'Football Pitch Complex', description: 'Our three full-size football pitches with professional-grade turf, floodlights, and spectator seating.', category: 'Facilities', date: 'Nov 2025', color: '#3b82f6', colorAlt: '#6366f1', icon: '⚽' },
    { id: '9', title: 'Kids Football Championship', description: 'The U-12 finals in action. Future stars battling it out for the club championship trophy with amazing teamwork.', category: 'Championships', date: 'Oct 2025', color: '#f97316', colorAlt: '#eab308', icon: '🏆' },
    { id: '10', title: 'Women\'s Basketball Team', description: 'The ladies\' basketball team proudly holding their inter-club league trophy.', category: 'Teams', date: 'Oct 2025', color: '#a855f7', colorAlt: '#7c3aed', icon: '🏀' },
    { id: '11', title: 'Kids\' Fun Day', description: 'Face painting, bouncy castles, and games galore! The kids had an absolute blast at our annual Fun Day.', category: 'Events', date: 'Sep 2025', color: '#06b6d4', colorAlt: '#0891b2', icon: '🎈' },
    { id: '12', title: 'Rooftop Lounge', description: 'Our exclusive members\' rooftop lounge with panoramic views, perfect for after-game relaxation.', category: 'Facilities', date: 'Sep 2025', color: '#8b5cf6', colorAlt: '#c084fc', icon: '🌆' },
    { id: '13', title: 'Football League Champions 2025', description: 'Our senior football team celebrating after winning the regional league final! A historic moment for the club with a thrilling 3-1 victory.', category: 'Championships', date: 'Dec 2025', color: '#22c55e', colorAlt: '#16a34a', icon: '⚽' },
    { id: '14', title: 'Karate Championship Victory', description: 'Club karate athletes dominating the national competition. Gold, silver, and bronze medals across multiple weight categories — a proud day for our martial arts program.', category: 'Championships', date: 'Jan 2026', color: '#ef4444', colorAlt: '#dc2626', icon: '🥋' },
];

// Varying heights for masonry effect
const heights = [280, 320, 260, 340, 300, 280, 320, 260, 300, 340, 280, 320, 300, 340];

export default function GalleryPage() {
    const [activeCategory, setActiveCategory] = useState<GalleryCat>('All');
    const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
    const [animateCards, setAnimateCards] = useState(false);

    useEffect(() => {
        setAnimateCards(false);
        const t = setTimeout(() => setAnimateCards(true), 50);
        return () => clearTimeout(t);
    }, [activeCategory]);

    const filtered = activeCategory === 'All'
        ? galleryItems
        : galleryItems.filter((item) => item.category === activeCategory);

    const currentIndex = lightbox ? filtered.findIndex((item) => item.id === lightbox.id) : -1;

    const navigateLightbox = useCallback((dir: number) => {
        if (currentIndex < 0) return;
        const next = (currentIndex + dir + filtered.length) % filtered.length;
        setLightbox(filtered[next]);
    }, [currentIndex, filtered]);

    // Keyboard navigation
    useEffect(() => {
        if (!lightbox) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setLightbox(null);
            if (e.key === 'ArrowLeft') navigateLightbox(-1);
            if (e.key === 'ArrowRight') navigateLightbox(1);
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [lightbox, navigateLightbox]);

    return (
        <div>
            {/* Header */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">Gallery</h1>
                    <p className="page-subtitle">Browse photos from around the club</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Image size={18} style={{ color: 'var(--color-accent-3)' }} />
                    <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                        {galleryItems.length} photos
                    </span>
                </div>
            </div>

            {/* Category Filters */}
            <div className="category-filters" style={{ marginBottom: 28 }}>
                {galleryCategories.map((cat) => (
                    <button
                        key={cat}
                        className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Gallery Grid */}
            <div className="gallery-grid">
                {filtered.map((item, i) => (
                    <div
                        className="gallery-card"
                        key={item.id}
                        style={{
                            height: heights[i % heights.length],
                            opacity: animateCards ? 1 : 0,
                            transform: animateCards ? 'scale(1)' : 'scale(0.92)',
                            transition: `all 0.4s ease ${i * 0.05}s`,
                        }}
                        onClick={() => setLightbox(item)}
                    >
                        {/* Gradient placeholder image */}
                        <div
                            className="gallery-card-image"
                            style={{
                                background: `linear-gradient(135deg, ${item.color}CC 0%, ${item.colorAlt}CC 100%)`,
                            }}
                        >
                            <span className="gallery-card-emoji">{item.icon}</span>
                        </div>
                        {/* Hover overlay */}
                        <div className="gallery-card-overlay">
                            <ZoomIn size={24} style={{ marginBottom: 8 }} />
                            <span className="gallery-card-overlay-title">{item.title}</span>
                            <span className="gallery-card-overlay-cat">{item.category}</span>
                        </div>
                        {/* Bottom info */}
                        <div className="gallery-card-info">
                            <span>{item.title}</span>
                            <span className="gallery-card-info-date">{item.date}</span>
                        </div>
                    </div>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="empty-state">
                    <Image size={64} />
                    <h3>No photos found</h3>
                    <p>There are no photos in this category yet.</p>
                </div>
            )}

            {/* Lightbox Modal */}
            {lightbox && (
                <div className="gallery-lightbox" onClick={() => setLightbox(null)}>
                    <div className="gallery-lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <button className="gallery-lightbox-close" onClick={() => setLightbox(null)}>
                            <X size={22} />
                        </button>
                        <button className="gallery-lightbox-nav left" onClick={() => navigateLightbox(-1)}>
                            <ChevronLeft size={28} />
                        </button>
                        <button className="gallery-lightbox-nav right" onClick={() => navigateLightbox(1)}>
                            <ChevronRight size={28} />
                        </button>
                        <div
                            className="gallery-lightbox-image"
                            style={{
                                background: `linear-gradient(135deg, ${lightbox.color}DD 0%, ${lightbox.colorAlt}DD 100%)`,
                            }}
                        >
                            <span style={{ fontSize: '5rem' }}>{lightbox.icon}</span>
                        </div>
                        <div className="gallery-lightbox-info">
                            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 8 }}>{lightbox.title}</h2>
                            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 12 }}>{lightbox.description}</p>
                            <div style={{ display: 'flex', gap: 16, fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Calendar size={14} /> {lightbox.date}</span>
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><MapPin size={14} /> {lightbox.category}</span>
                            </div>
                            <div style={{ marginTop: 8, fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                                {currentIndex + 1} / {filtered.length}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
