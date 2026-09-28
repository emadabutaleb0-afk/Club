import { useState, useEffect } from 'react';
import { Megaphone, Pin, PinOff, Trash2, Plus, Users, Shield, Dumbbell, AlertCircle } from 'lucide-react';

type Priority = 'urgent' | 'important' | 'normal';
type Audience = 'All Members' | 'Staff Only' | 'Coaches';

interface Announcement {
    id: string;
    title: string;
    body: string;
    author: string;
    date: string;
    priority: Priority;
    audience: Audience;
    pinned: boolean;
}

const initialAnnouncements: Announcement[] = [
    { id: '1', title: 'Emergency: Water Main Break', body: 'Due to a water main break, the pool area and locker rooms will be closed until further notice. Showers in the gym building remain available. We apologize for the inconvenience and are working to resolve this as quickly as possible.', author: 'Club Management', date: 'Feb 11, 2026', priority: 'urgent', audience: 'All Members', pinned: true },
    { id: '2', title: 'Swimming Pool Extended Hours', body: 'Starting March 1, the Olympic swimming pool will be open from 5:00 AM to 10:00 PM on weekdays and 6:00 AM to 9:00 PM on weekends. Additional lifeguard shifts have been arranged. Family swim sessions available every Saturday morning.', author: 'Facilities Team', date: 'Feb 10, 2026', priority: 'important', audience: 'All Members', pinned: true },
    { id: '3', title: 'Staff Meeting: Q1 Review', body: 'All staff members are required to attend the quarterly review meeting on Feb 14 at 9:00 AM in Conference Room B. Please have your department reports ready for presentation.', author: 'HR Department', date: 'Feb 9, 2026', priority: 'important', audience: 'Staff Only', pinned: false },
    { id: '4', title: 'New Coaching Certification Requirements', body: 'Starting March 2026, all coaches must hold a valid First Aid certification. The club will sponsor certification courses on Feb 22 and March 1. Sign up through the staff portal.', author: 'Sports Director', date: 'Feb 8, 2026', priority: 'normal', audience: 'Coaches', pinned: false },
    { id: '5', title: 'Updated Gym Hours for February', body: 'The gym will operate on extended hours during February: Weekdays 5:00 AM – 11:00 PM, Weekends 6:00 AM – 10:00 PM. This is a trial period based on member feedback.', author: 'Facilities Team', date: 'Feb 5, 2026', priority: 'normal', audience: 'All Members', pinned: false },
    { id: '6', title: 'Parking Policy Enforcement', body: 'Starting Feb 15, unauthorized vehicles in reserved spots will be towed at the owner\'s expense. Please display your member parking sticker prominently on your windshield.', author: 'Security', date: 'Feb 3, 2026', priority: 'important', audience: 'All Members', pinned: false },
    { id: '7', title: 'Summer Camp Registration Opens', body: 'Registration for our popular Junior Summer Camp (ages 6-16) opens March 1. Programs include swimming, football, basketball, arts & crafts, and outdoor adventures. Early registration receives priority.', author: 'Youth Programs', date: 'Feb 1, 2026', priority: 'normal', audience: 'All Members', pinned: false },
    { id: '8', title: 'Equipment Inspection Schedule', body: 'Coaches, please submit your equipment inspection reports by Feb 20. Any damaged or worn equipment should be flagged for replacement. Use Form EQ-7 from the staff portal.', author: 'Safety Officer', date: 'Jan 28, 2026', priority: 'normal', audience: 'Coaches', pinned: false },
];

const priorityConfig: Record<Priority, { color: string; label: string; badgeClass: string }> = {
    urgent: { color: '#ef4444', label: 'Urgent', badgeClass: 'badge-error' },
    important: { color: '#f59e0b', label: 'Important', badgeClass: 'badge-warning' },
    normal: { color: '#3b82f6', label: 'Normal', badgeClass: 'badge-info' },
};

const audienceIcons: Record<Audience, React.ElementType> = {
    'All Members': Users,
    'Staff Only': Shield,
    'Coaches': Dumbbell,
};

export default function AnnouncementsPage() {
    const [announcements, setAnnouncements] = useState(initialAnnouncements);
    const [animateCards, setAnimateCards] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setAnimateCards(true), 50);
        return () => clearTimeout(t);
    }, []);

    const togglePin = (id: string) => {
        setAnnouncements((prev) =>
            prev.map((a) => (a.id === id ? { ...a, pinned: !a.pinned } : a))
        );
    };

    const deleteAnnouncement = (id: string) => {
        setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    };

    // Sort: pinned first, then by date
    const sorted = [...announcements].sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return 0;
    });

    const pinnedCount = announcements.filter((a) => a.pinned).length;
    const thisMonthCount = announcements.filter((a) => a.date.includes('Feb')).length;

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">Announcements</h1>
                    <p className="page-subtitle">Manage and broadcast club-wide announcements</p>
                </div>
                <button className="btn btn-primary">
                    <Plus size={16} /> New Announcement
                </button>
            </div>

            {/* Stats */}
            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: 28 }}>
                <div className="stat-card">
                    <div className="stat-icon purple"><Megaphone size={22} /></div>
                    <div className="stat-value">{announcements.length}</div>
                    <div className="stat-label">Total Announcements</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon orange"><Pin size={22} /></div>
                    <div className="stat-value">{pinnedCount}</div>
                    <div className="stat-label">Pinned</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon blue"><AlertCircle size={22} /></div>
                    <div className="stat-value">{thisMonthCount}</div>
                    <div className="stat-label">This Month</div>
                </div>
            </div>

            {/* Announcements List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {sorted.map((ann, i) => {
                    const AudienceIcon = audienceIcons[ann.audience];
                    const priority = priorityConfig[ann.priority];
                    return (
                        <div
                            className="announcement-card"
                            key={ann.id}
                            style={{
                                opacity: animateCards ? 1 : 0,
                                transform: animateCards ? 'translateY(0)' : 'translateY(15px)',
                                transition: `all 0.4s ease ${i * 0.06}s`,
                            }}
                        >
                            {/* Priority indicator bar */}
                            <div className="announcement-priority" style={{ background: priority.color }} />

                            <div className="announcement-content">
                                <div className="announcement-top">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                                        <span className={`badge ${priority.badgeClass}`}>{priority.label}</span>
                                        <span className="badge badge-purple" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                                            <AudienceIcon size={12} /> {ann.audience}
                                        </span>
                                        {ann.pinned && (
                                            <span className="badge badge-info" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '0.7rem' }}>
                                                <Pin size={10} /> Pinned
                                            </span>
                                        )}
                                    </div>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>{ann.date}</span>
                                </div>

                                <h3 className="announcement-title">{ann.title}</h3>
                                <p className="announcement-body">{ann.body}</p>

                                <div className="announcement-footer">
                                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                                        By {ann.author}
                                    </span>
                                    <div style={{ display: 'flex', gap: 6 }}>
                                        <button
                                            className="btn btn-secondary btn-sm"
                                            onClick={() => togglePin(ann.id)}
                                            title={ann.pinned ? 'Unpin' : 'Pin'}
                                        >
                                            {ann.pinned ? <PinOff size={14} /> : <Pin size={14} />}
                                            {ann.pinned ? 'Unpin' : 'Pin'}
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            style={{ padding: 6 }}
                                            onClick={() => deleteAnnouncement(ann.id)}
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {announcements.length === 0 && (
                <div className="empty-state">
                    <Megaphone size={64} />
                    <h3>No announcements</h3>
                    <p>Create your first announcement to keep members informed.</p>
                </div>
            )}
        </div>
    );
}
