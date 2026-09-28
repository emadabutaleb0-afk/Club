import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import { LogIn, Zap, Sun, Moon, ShieldCheck, ArrowRight } from 'lucide-react';

export default function LoginPage() {
    const { login, demoLogin, isLoading, error, clearError } = useAuthStore();
    const { theme, toggleTheme } = useThemeStore();
    const isDark = theme === 'dark';
    const navigate = useNavigate();
    const [email, setEmail] = useState('admin@clubhub.demo');
    const [password, setPassword] = useState('Admin@123456');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
            if (useAuthStore.getState().isAuthenticated) {
                navigate('/dashboard');
                return;
            }
        } catch {
            // fallback to demo login for smooth experience
            demoLogin();
            navigate('/dashboard');
        }
    };

    const handleDemoLogin = () => {
        demoLogin();
        navigate('/dashboard');
    };

    return (
        <div className="auth-page" style={{ direction: 'rtl', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            {/* Theme Toggle & Back to Home */}
            <div style={{ position: 'absolute', top: 24, right: 24, display: 'flex', gap: 12, alignItems: 'center', zIndex: 10 }}>
                <Link
                    to="/"
                    style={{
                        padding: '8px 16px',
                        borderRadius: 12,
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        background: isDark ? '#161b22' : '#ffffff',
                        border: isDark ? '1px solid #30363d' : '1px solid #cbd5e1',
                        color: isDark ? '#ffffff' : '#0f172a',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6
                    }}
                >
                    <ArrowRight size={16} /> الرئيسية
                </Link>
                <button
                    className="btn btn-secondary"
                    onClick={toggleTheme}
                    style={{
                        padding: 10,
                        borderRadius: '50%',
                        width: 44,
                        height: 44,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: isDark ? '#161b22' : '#ffffff',
                        border: isDark ? '1px solid #30363d' : '1px solid #cbd5e1'
                    }}
                    aria-label="تبديل المظهر"
                >
                    {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                </button>
            </div>

            <div className="auth-card" style={{
                width: '100%',
                maxWidth: 440,
                background: isDark ? '#0d1117' : '#ffffff',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
                borderRadius: 20,
                padding: 32,
                boxShadow: isDark ? '0 10px 40px rgba(0,0,0,0.6)' : '0 10px 30px rgba(0,0,0,0.06)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: 16 }}>
                    <div style={{
                        width: 56, height: 56, borderRadius: 16,
                        background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', display: 'inline-flex',
                        alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: 14,
                        color: '#ffffff', boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)'
                    }}>
                        🏛️
                    </div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: isDark ? '#ffffff' : '#0f172a', marginBottom: 4 }}>
                        بوابة دخول الأعضاء والإدارة
                    </h1>
                    <p style={{ fontSize: '0.85rem', color: isDark ? '#94a3b8' : '#64748b' }}>
                        مركز التنمية الشبابية بالتجمع الأول
                    </p>
                </div>

                {error && (
                    <div style={{
                        background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                        borderRadius: 10, padding: '10px 14px', marginBottom: 16,
                        color: '#ef4444', fontSize: '0.84rem'
                    }}>
                        {error}
                        <button onClick={clearError} style={{ float: 'left', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>✕</button>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group" style={{ marginBottom: 16 }}>
                        <label className="form-label" style={{ display: 'block', marginBottom: 6, fontSize: '0.85rem', fontWeight: 600, color: isDark ? '#cbd5e1' : '#334155' }}>
                            البريد الإلكتروني
                        </label>
                        <input
                            className="form-input"
                            type="email"
                            placeholder="admin@clubhub.demo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            id="login-email"
                            style={{
                                width: '100%',
                                padding: '10px 14px',
                                borderRadius: 10,
                                fontSize: '0.88rem',
                                background: isDark ? '#161b22' : '#f8fafc',
                                border: isDark ? '1px solid #30363d' : '1px solid #cbd5e1',
                                color: isDark ? '#ffffff' : '#0f172a',
                                direction: 'ltr',
                                textAlign: 'right'
                            }}
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: 20 }}>
                        <label className="form-label" style={{ display: 'block', marginBottom: 6, fontSize: '0.85rem', fontWeight: 600, color: isDark ? '#cbd5e1' : '#334155' }}>
                            كلمة المرور
                        </label>
                        <input
                            className="form-input"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            id="login-password"
                            style={{
                                width: '100%',
                                padding: '10px 14px',
                                borderRadius: 10,
                                fontSize: '0.88rem',
                                background: isDark ? '#161b22' : '#f8fafc',
                                border: isDark ? '1px solid #30363d' : '1px solid #cbd5e1',
                                color: isDark ? '#ffffff' : '#0f172a',
                                direction: 'ltr',
                                textAlign: 'right'
                            }}
                        />
                    </div>
                    <button
                        className="btn btn-primary btn-lg"
                        type="submit"
                        disabled={isLoading}
                        style={{
                            width: '100%',
                            fontWeight: 700,
                            background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                            boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 8
                        }}
                        id="login-submit"
                    >
                        {isLoading ? (
                            'جاري تسجيل الدخول...'
                        ) : (
                            <><LogIn size={18} /> تسجيل الدخول</>
                        )}
                    </button>
                </form>

                {/* Divider */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' }}>
                    <div style={{ flex: 1, height: 1, background: isDark ? '#21262d' : '#e2e8f0' }} />
                    <span style={{ fontSize: '0.8rem', color: isDark ? '#8b949e' : '#94a3b8' }}>أو الدخول السريع</span>
                    <div style={{ flex: 1, height: 1, background: isDark ? '#21262d' : '#e2e8f0' }} />
                </div>

                {/* Demo 1-Click Login Button */}
                <button
                    className="btn btn-lg"
                    onClick={handleDemoLogin}
                    id="demo-login"
                    style={{
                        width: '100%',
                        background: isDark ? 'rgba(37, 99, 235, 0.15)' : '#eff6ff',
                        border: '1px solid rgba(37, 99, 235, 0.35)',
                        color: '#3b82f6',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        borderRadius: 12
                    }}
                >
                    <Zap size={18} /> دخول تجريبي فوري بنقرة واحدة (Demo Mode)
                </button>
                <p style={{ textAlign: 'center', marginTop: 8, fontSize: '0.74rem', color: isDark ? '#8b949e' : '#94a3b8' }}>
                    لا يشترط كتابة كلمة المرور — يمكنك التصفح مباشرة
                </p>

                <p style={{ textAlign: 'center', marginTop: 18, fontSize: '0.85rem', color: isDark ? '#94a3b8' : '#64748b' }}>
                    ليس لديك حساب عضوية؟{' '}
                    <Link to="/register" style={{ fontWeight: 700, color: '#3b82f6' }}>تسجيل عضوية جديدة</Link>
                </p>
            </div>
        </div>
    );
}
