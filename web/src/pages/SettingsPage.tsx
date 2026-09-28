import { Globe, Bell, Shield, Palette, CreditCard, Save } from 'lucide-react';

export default function SettingsPage() {
    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">Settings</h1>
                    <p className="page-subtitle">Configure your club preferences</p>
                </div>
                <button className="btn btn-primary"><Save size={16} /> Save Changes</button>
            </div>

            <div style={{ maxWidth: 700, display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div className="card">
                    <div className="card-title" style={{ marginBottom: 20 }}>
                        <Globe size={18} style={{ display: 'inline', marginRight: 8, verticalAlign: 'middle' }} />General
                    </div>
                    <div className="form-group">
                        <label className="form-label">Club Name</label>
                        <input className="form-input" defaultValue="Riverside Sports Club" />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <div className="form-group">
                            <label className="form-label">Timezone</label>
                            <select className="form-input"><option>America/New_York</option><option>Europe/London</option><option>Asia/Tokyo</option></select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Currency</label>
                            <select className="form-input"><option>USD</option><option>EUR</option><option>GBP</option></select>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-title" style={{ marginBottom: 20 }}>
                        <CreditCard size={18} style={{ display: 'inline', marginRight: 8, verticalAlign: 'middle' }} />Payments
                    </div>
                    <div style={{ padding: '16px', background: 'var(--color-bg-glass)', borderRadius: 'var(--radius-md)', marginBottom: 16, border: '1px solid var(--color-border)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ fontWeight: 600, marginBottom: 4 }}>Stripe Connect</div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Platform fee: 2% per transaction</div>
                            </div>
                            <span className="badge badge-success">Connected</span>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-title" style={{ marginBottom: 20 }}>
                        <Bell size={18} style={{ display: 'inline', marginRight: 8, verticalAlign: 'middle' }} />Booking Rules
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <div className="form-group">
                            <label className="form-label">Booking Lead Time (mins)</label>
                            <input className="form-input" type="number" defaultValue={60} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Cancellation Policy (hours)</label>
                            <input className="form-input" type="number" defaultValue={24} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Max Bookings per Member</label>
                            <input className="form-input" type="number" defaultValue={5} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Allow Waitlists</label>
                            <select className="form-input"><option>Yes</option><option>No</option></select>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-title" style={{ marginBottom: 20 }}>
                        <Shield size={18} style={{ display: 'inline', marginRight: 8, verticalAlign: 'middle' }} />Compliance
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                        <p style={{ marginBottom: 12 }}>GDPR data handling is enabled. Member data is encrypted at rest.</p>
                        <p style={{ marginBottom: 12 }}>Waiver management: <span className="badge badge-success">Active</span></p>
                        <p>Background check integration: <span className="badge badge-warning">Not configured</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
