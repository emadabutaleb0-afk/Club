import { NavLink, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import { useLanguageStore } from '../store/languageStore';
import {
    LayoutDashboard, Calendar, Users, CreditCard, Dumbbell,
    User, Settings, LogOut, Menu, X,
    Newspaper, CalendarDays, Image,
    Bell, Megaphone, BarChart3, Sun, Moon, Globe
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/bookings', icon: Calendar, label: 'Bookings' },
    { to: '/members', icon: Users, label: 'Members' },
    { to: '/payments', icon: CreditCard, label: 'Payments' },
    { to: '/facilities', icon: Dumbbell, label: 'Facilities' },
    { to: '/reports', icon: BarChart3, label: 'Reports' },
];

const clubItems = [
    { to: '/news', icon: Newspaper, label: 'News' },
    { to: '/events', icon: CalendarDays, label: 'Events' },
    { to: '/gallery', icon: Image, label: 'Gallery' },
    { to: '/notifications', icon: Bell, label: 'Notifications' },
    { to: '/announcements', icon: Megaphone, label: 'Announcements' },
];

const bottomItems = [
    { to: '/profile', icon: User, label: 'Profile' },
    { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
    const logout = useAuthStore((s) => s.logout);
    const user = useAuthStore((s) => s.user);
    const { theme, toggleTheme } = useThemeStore();
    const { language, toggleLanguage, isRTL } = useLanguageStore();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    return (
        <div className="app-layout">
            {/* Mobile Header */}
            <button
                className="btn btn-secondary"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                style={{
                    position: 'fixed', top: 12, left: 12, zIndex: 200,
                    display: 'none', padding: 8,
                }}
                id="mobile-menu-btn"
            >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <style>{`@media(max-width:768px){#mobile-menu-btn{display:flex!important}}`}</style>

            {/* Sidebar */}
            <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-logo">
                    <div className="logo-icon">⚡</div>
                    <h1>ClubHub</h1>
                </div>

                <nav className="sidebar-nav">
                    <span className="nav-section-title">Main</span>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                            onClick={() => setSidebarOpen(false)}
                        >
                            <item.icon size={20} />
                            {item.label}
                        </NavLink>
                    ))}

                    <span className="nav-section-title">Club</span>
                    {clubItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                            onClick={() => setSidebarOpen(false)}
                        >
                            <item.icon size={20} />
                            {item.label}
                        </NavLink>
                    ))}

                    <span className="nav-section-title" style={{ marginTop: 'auto' }}>Account</span>
                    {bottomItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                            onClick={() => setSidebarOpen(false)}
                        >
                            <item.icon size={20} />
                            {item.label}
                        </NavLink>
                    ))}

                    <button className="nav-link" onClick={toggleTheme}>
                        {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                        {theme === 'dark' ? (language === 'ar' ? 'الوضع الليلي' : 'Dark Mode') : (language === 'ar' ? 'الوضع المضيء' : 'Light Mode')}
                    </button>

                    <button className="nav-link" onClick={toggleLanguage}>
                        <Globe size={20} />
                        {language === 'ar' ? 'English (LTR)' : 'العربية (RTL)'}
                    </button>

                    <button className="nav-link" onClick={logout} style={{ color: '#ef4444' }}>
                        <LogOut size={20} />
                        {language === 'ar' ? 'تسجيل الخروج' : 'Logout'}
                    </button>

                </nav>

                {/* User info */}
                {user && (
                    <div style={{
                        padding: '16px 12px', borderTop: '1px solid var(--color-border)',
                        marginTop: 16, display: 'flex', alignItems: 'center', gap: 10
                    }}>
                        <div style={{
                            width: 36, height: 36, borderRadius: '50%',
                            background: 'var(--color-gradient)', display: 'flex',
                            alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.85rem', fontWeight: 700, color: 'white'
                        }}>
                            {user.firstName?.[0]}{user.lastName?.[0]}
                        </div>
                        <div>
                            <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{user.firstName} {user.lastName}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{user.email}</div>
                        </div>
                    </div>
                )}
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <div className="animate-fade-in" key={location.pathname}>
                    {children}
                </div>
            </main>

            {/* Mobile Bottom Nav */}
            <nav className="mobile-nav">
                <ul className="mobile-nav-items">
                    {navItems.slice(0, 4).map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
                        >
                            <item.icon size={22} />
                            {item.label}
                        </NavLink>
                    ))}
                    <button className="mobile-nav-item" onClick={toggleTheme}>
                        {theme === 'dark' ? <Moon size={22} /> : <Sun size={22} />}
                        Theme
                    </button>
                    <NavLink
                        to="/profile"
                        className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
                    >
                        <User size={22} />
                        Profile
                    </NavLink>
                </ul>
            </nav>
        </div>
    );
}
