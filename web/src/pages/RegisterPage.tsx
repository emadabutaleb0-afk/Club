import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import { UserPlus, Sun, Moon } from 'lucide-react';

export default function RegisterPage() {
    const { register, isLoading, error, clearError } = useAuthStore();
    const { theme, toggleTheme } = useThemeStore();
    const navigate = useNavigate();
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
    const [localError, setLocalError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError('');
        if (form.password !== form.confirmPassword) {
            setLocalError('Passwords do not match');
            return;
        }
        await register({ email: form.email, password: form.password, firstName: form.firstName, lastName: form.lastName });
        if (useAuthStore.getState().isAuthenticated) {
            navigate('/dashboard');
        }
    };

    const displayError = localError || error;

    return (
        <div className="auth-page">
            <button
                className="btn btn-secondary"
                onClick={toggleTheme}
                style={{
                    position: 'absolute',
                    top: 24,
                    right: 24,
                    zIndex: 10,
                    padding: 10,
                    borderRadius: '50%',
                    width: 44,
                    height: 44
                }}
                aria-label="Toggle Theme"
            >
                {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <div className="auth-card">
                <div style={{ textAlign: 'center', marginBottom: 8 }}>
                    <div style={{
                        width: 56, height: 56, borderRadius: 16,
                        background: 'var(--color-gradient)', display: 'inline-flex',
                        alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: 16
                    }}>⚡</div>
                </div>
                <h1 className="auth-title">Join ClubHub</h1>
                <p className="auth-subtitle">Create your account to get started</p>

                {displayError && (
                    <div style={{
                        background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                        borderRadius: 'var(--radius-md)', padding: '12px 16px', marginBottom: 20,
                        color: '#ef4444', fontSize: '0.85rem'
                    }}>
                        {displayError}
                        <button onClick={() => { clearError(); setLocalError(''); }} style={{ float: 'right', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>✕</button>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <div className="form-group">
                            <label className="form-label">First Name</label>
                            <input className="form-input" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} required id="reg-first" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Last Name</label>
                            <input className="form-input" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} required id="reg-last" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input className="form-input" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required id="reg-email" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input className="form-input" type="password" placeholder="Min 8 chars, 1 uppercase, 1 number" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required id="reg-pass" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Confirm Password</label>
                        <input className="form-input" type="password" placeholder="Repeat your password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} required id="reg-confirm" />
                    </div>
                    <button className="btn btn-primary btn-lg" type="submit" disabled={isLoading} style={{ width: '100%', marginTop: 8 }} id="reg-submit">
                        {isLoading ? 'Creating account...' : <><UserPlus size={18} /> Create Account</>}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: 24, fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                    Already have an account? <Link to="/login" style={{ fontWeight: 600 }}>Sign in</Link>
                </p>
            </div>
        </div>
    );
}
