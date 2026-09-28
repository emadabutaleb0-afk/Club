import { useState } from 'react';
import { Dumbbell, Plus, Edit, Trash2, Lock, Unlock } from 'lucide-react';

const mockFacilities = [
    { id: '1', name: 'Swimming Pool', type: 'pool', capacity: 20, status: 'active', slots: 8, bookingsToday: 15 },
    { id: '2', name: 'Football Pitch A', type: 'field', capacity: 22, status: 'active', slots: 10, bookingsToday: 8 },
    { id: '3', name: 'Football Pitch B', type: 'field', capacity: 22, status: 'active', slots: 10, bookingsToday: 5 },
    { id: '4', name: 'Table Tennis', type: 'studio', capacity: 8, status: 'active', slots: 6, bookingsToday: 4 },
    { id: '5', name: 'Basketball Court', type: 'court', capacity: 12, status: 'maintenance', slots: 10, bookingsToday: 0 },
    { id: '6', name: 'Weight Room', type: 'gym', capacity: 30, status: 'active', slots: 14, bookingsToday: 22 },
];

const typeColors: Record<string, string> = {
    court: '#6c5ce7', pool: '#3b82f6', studio: '#a855f7', gym: '#10b981', field: '#f59e0b',
};

export default function FacilitiesPage() {
    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">Facilities</h1>
                    <p className="page-subtitle">Manage courts, lanes, rooms and schedules</p>
                </div>
                <button className="btn btn-primary"><Plus size={16} /> Add Facility</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
                {mockFacilities.map((f) => (
                    <div className="card" key={f.id} style={{ position: 'relative', overflow: 'hidden' }}>
                        <div style={{
                            position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                            background: typeColors[f.type] || '#6c5ce7',
                        }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: 4 }}>{f.name}</div>
                                <span className="badge badge-purple" style={{ textTransform: 'capitalize' }}>{f.type}</span>
                            </div>
                            <span className={`badge ${f.status === 'active' ? 'badge-success' : 'badge-warning'}`}>{f.status}</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 16 }}>
                            <div style={{ textAlign: 'center', padding: '10px 0', background: 'var(--color-bg-glass)', borderRadius: 'var(--radius-sm)' }}>
                                <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{f.capacity}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Capacity</div>
                            </div>
                            <div style={{ textAlign: 'center', padding: '10px 0', background: 'var(--color-bg-glass)', borderRadius: 'var(--radius-sm)' }}>
                                <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{f.slots}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Slots</div>
                            </div>
                            <div style={{ textAlign: 'center', padding: '10px 0', background: 'var(--color-bg-glass)', borderRadius: 'var(--radius-sm)' }}>
                                <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{f.bookingsToday}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Today</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                            <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}><Edit size={14} /> Edit</button>
                            <button className="btn btn-secondary btn-sm"><Lock size={14} /></button>
                            <button className="btn btn-danger btn-sm"><Trash2 size={14} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
