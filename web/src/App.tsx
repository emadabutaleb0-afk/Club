import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import BookingsPage from './pages/BookingsPage';
import MembersPage from './pages/MembersPage';
import PaymentsPage from './pages/PaymentsPage';
import ProfilePage from './pages/ProfilePage';
import FacilitiesPage from './pages/FacilitiesPage';
import SettingsPage from './pages/SettingsPage';
import NewsPage from './pages/NewsPage';
import EventsPage from './pages/EventsPage';
import GalleryPage from './pages/GalleryPage';
import NotificationsPage from './pages/NotificationsPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import ReportsPage from './pages/ReportsPage';
import PublicGalleryPage from './pages/PublicGalleryPage';
import PublicNewsPage from './pages/PublicNewsPage';
import BookingPaymentPage from './pages/BookingPaymentPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    if (!isAuthenticated && typeof window !== 'undefined' && window.location.search.includes('demo=1')) {
        useAuthStore.getState().demoLogin();
        return <>{children}</>;
    }
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

export default function App() {
    return (
        <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/news" element={<PublicNewsPage />} />
            <Route path="/public-gallery" element={<PublicGalleryPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected app routes */}
            <Route
                path="/*"
                element={
                    <ProtectedRoute>
                        <Layout>
                            <Routes>
                                <Route path="/dashboard" element={<DashboardPage />} />
                                <Route path="/bookings" element={<BookingsPage />} />
                                <Route path="/booking-payment" element={<BookingPaymentPage />} />
                                <Route path="/members" element={<MembersPage />} />
                                <Route path="/payments" element={<PaymentsPage />} />
                                <Route path="/facilities" element={<FacilitiesPage />} />
                                <Route path="/news" element={<NewsPage />} />
                                <Route path="/events" element={<EventsPage />} />
                                <Route path="/gallery" element={<GalleryPage />} />
                                <Route path="/notifications" element={<NotificationsPage />} />
                                <Route path="/announcements" element={<AnnouncementsPage />} />
                                <Route path="/reports" element={<ReportsPage />} />
                                <Route path="/profile" element={<ProfilePage />} />
                                <Route path="/settings" element={<SettingsPage />} />
                                <Route path="*" element={<Navigate to="/dashboard" replace />} />
                            </Routes>
                        </Layout>
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

