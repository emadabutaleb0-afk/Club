import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, CheckCircle, Search, Clock, FileText, Send, Phone, User } from 'lucide-react';
import { useLanguageStore } from '../store/languageStore';
import { t } from '../services/translations';

interface Ticket {
    id: string;
    type: string;
    name: string;
    phone: string;
    message: string;
    status: 'pending' | 'in_progress' | 'resolved';
    date: string;
    response?: string;
}

export default function ComplaintsModal({
    isOpen,
    onClose
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const { language, isRTL } = useLanguageStore();
    const trans = t[language];

    const [activeTab, setActiveTab] = useState<'new' | 'track'>('new');
    const [reqType, setReqType] = useState('complaint');
    const [name, setName] = useState('عماد حمدي');
    const [phone, setPhone] = useState('01013010137');
    const [membershipId, setMembershipId] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submittedTicket, setSubmittedTicket] = useState<Ticket | null>(null);

    // Track ticket state
    const [trackInput, setTrackInput] = useState('');
    const [searchedTicket, setSearchedTicket] = useState<Ticket | null>(null);
    const [searchError, setSearchError] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            const newTicket: Ticket = {
                id: `TK-2026-${Math.floor(1000 + Math.random() * 9000)}`,
                type: reqType,
                name,
                phone,
                message,
                status: 'pending',
                date: new Date().toLocaleDateString('ar-EG'),
                response: language === 'ar'
                    ? 'تم توجيه طلبك إلى إدارة النشاط الرياضي ومتابعة الجودة، وسيتواصل معك مشرف القطاع هاتفياً.'
                    : 'Your inquiry has been assigned to operations quality assurance. A supervisor will call you.'
            };
            setSubmittedTicket(newTicket);
            setMessage('');
        }, 700);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (submittedTicket && trackInput.trim().toUpperCase() === submittedTicket.id) {
            setSearchedTicket(submittedTicket);
            setSearchError(false);
        } else if (trackInput.trim().length > 3) {
            // Mock sample ticket
            setSearchedTicket({
                id: trackInput.trim().toUpperCase(),
                type: 'suggestion',
                name: 'عضو النادي',
                phone: '01013010137',
                message: language === 'ar' ? 'طلب زيادة ساعات تدريب تنس الطاولة المسائية' : 'Request to extend evening table tennis sessions',
                status: 'in_progress',
                date: '2026-09-24',
                response: language === 'ar' ? 'تمت دراسة المقترح والموافقة على فتح الصالة حتى الساعة 10:30 مساءً.' : 'Approved. Table tennis arena hours extended to 10:30 PM.'
            });
            setSearchError(false);
        } else {
            setSearchError(true);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="modal-backdrop"
            style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.75)',
                backdropFilter: 'blur(8px)',
                zIndex: 1050,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px'
            }}
            onClick={onClose}
        >
            <motion.div
                className="complaints-card"
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: '100%',
                    maxWidth: '640px',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    background: 'var(--color-bg-secondary)',
                    borderRadius: '24px',
                    border: '1px solid var(--color-border)',
                    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                {/* Header */}
                <div
                    style={{
                        padding: '24px 28px',
                        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(108, 92, 231, 0.15) 100%)',
                        borderBottom: '1px solid var(--color-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <div
                            style={{
                                width: 48,
                                height: 48,
                                borderRadius: 16,
                                background: 'linear-gradient(135deg, #ef4444 0%, #6c5ce7 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white'
                            }}
                        >
                            <MessageSquare size={24} />
                        </div>
                        <div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--color-accent-3)', fontWeight: 700 }}>
                                {trans.complaintSystem.badge}
                            </span>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '2px 0 0', color: 'var(--color-text-primary)' }}>
                                {trans.complaintSystem.title}
                            </h2>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'var(--color-bg-glass)',
                            border: '1px solid var(--color-border)',
                            borderRadius: '50%',
                            width: 36,
                            height: 36,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--color-text-secondary)',
                            cursor: 'pointer'
                        }}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', padding: '16px 28px 0', borderBottom: '1px solid var(--color-border)', gap: 16 }}>
                    <button
                        onClick={() => setActiveTab('new')}
                        style={{
                            padding: '10px 16px',
                            border: 'none',
                            background: 'none',
                            borderBottom: `2px solid ${activeTab === 'new' ? 'var(--color-accent-1)' : 'transparent'}`,
                            color: activeTab === 'new' ? 'var(--color-accent-3)' : 'var(--color-text-muted)',
                            fontWeight: 700,
                            cursor: 'pointer',
                            fontSize: '0.9rem'
                        }}
                    >
                        {language === 'ar' ? 'تقديم طلب جديد' : 'Submit New Feedback'}
                    </button>
                    <button
                        onClick={() => setActiveTab('track')}
                        style={{
                            padding: '10px 16px',
                            border: 'none',
                            background: 'none',
                            borderBottom: `2px solid ${activeTab === 'track' ? 'var(--color-accent-1)' : 'transparent'}`,
                            color: activeTab === 'track' ? 'var(--color-accent-3)' : 'var(--color-text-muted)',
                            fontWeight: 700,
                            cursor: 'pointer',
                            fontSize: '0.9rem'
                        }}
                    >
                        {language === 'ar' ? 'متابعة حالة تذكرة' : 'Track Existing Ticket'}
                    </button>
                </div>

                {/* Content */}
                <div style={{ padding: '28px' }}>
                    {activeTab === 'new' ? (
                        !submittedTicket ? (
                            <form onSubmit={handleSubmit}>
                                {/* Category Selection */}
                                <div style={{ marginBottom: 18 }}>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-secondary)' }}>
                                        {trans.complaintSystem.typeLabel}
                                    </label>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                                        {[
                                            { id: 'complaint', label: trans.complaintSystem.complaint },
                                            { id: 'suggestion', label: trans.complaintSystem.suggestion },
                                            { id: 'inquiry', label: trans.complaintSystem.inquiry },
                                        ].map((item) => (
                                            <button
                                                key={item.id}
                                                type="button"
                                                onClick={() => setReqType(item.id)}
                                                style={{
                                                    padding: '10px 8px',
                                                    borderRadius: '10px',
                                                    border: `2px solid ${reqType === item.id ? 'var(--color-accent-1)' : 'var(--color-border)'}`,
                                                    background: reqType === item.id ? 'rgba(108, 92, 231, 0.15)' : 'var(--color-bg-card)',
                                                    color: 'var(--color-text-primary)',
                                                    fontSize: '0.78rem',
                                                    fontWeight: reqType === item.id ? 700 : 500,
                                                    cursor: 'pointer',
                                                    textAlign: 'center'
                                                }}
                                            >
                                                {item.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Form Fields */}
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, marginBottom: 14 }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 6, color: 'var(--color-text-secondary)' }}>
                                            {trans.complaintSystem.name}
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="form-input"
                                            style={{ padding: '10px 14px' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 6, color: 'var(--color-text-secondary)' }}>
                                            {trans.complaintSystem.phone}
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="form-input"
                                            style={{ padding: '10px 14px' }}
                                        />
                                    </div>
                                </div>

                                <div style={{ marginBottom: 14 }}>
                                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 6, color: 'var(--color-text-secondary)' }}>
                                        {trans.complaintSystem.memberId}
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="مثال: MEM-2026-4410"
                                        value={membershipId}
                                        onChange={(e) => setMembershipId(e.target.value)}
                                        className="form-input"
                                        style={{ padding: '10px 14px' }}
                                    />
                                </div>

                                <div style={{ marginBottom: 20 }}>
                                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 6, color: 'var(--color-text-secondary)' }}>
                                        {trans.complaintSystem.message}
                                    </label>
                                    <textarea
                                        rows={4}
                                        required
                                        placeholder={language === 'ar' ? 'اكتب تفاصيل طلبك أو مقترحك هنا بدقة...' : 'Describe your suggestion or feedback in detail...'}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="form-input"
                                        style={{ padding: '12px 14px', resize: 'vertical' }}
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px' }} disabled={isSubmitting}>
                                    <Send size={16} />
                                    {isSubmitting ? '...' : trans.complaintSystem.submit}
                                </button>
                            </form>
                        ) : (
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '20px 10px' }}>
                                <CheckCircle size={50} style={{ color: '#10b981', margin: '0 auto 12px' }} />
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: 8 }}>
                                    {trans.complaintSystem.success}
                                </h3>
                                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: 12 }}>
                                    {trans.complaintSystem.ticketNumber}
                                </div>
                                <div style={{
                                    display: 'inline-block',
                                    padding: '8px 20px',
                                    background: 'var(--color-bg-primary)',
                                    borderRadius: '10px',
                                    fontWeight: 900,
                                    fontSize: '1.3rem',
                                    color: 'var(--color-accent-3)',
                                    letterSpacing: '0.08em',
                                    marginBottom: 20
                                }}>
                                    {submittedTicket.id}
                                </div>
                                <div>
                                    <button className="btn btn-secondary" onClick={() => setSubmittedTicket(null)}>
                                        {language === 'ar' ? 'إرسال طلب آخر' : 'Submit Another Request'}
                                    </button>
                                </div>
                            </motion.div>
                        )
                    ) : (
                        /* Track Tab */
                        <div>
                            <form onSubmit={handleSearch} style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
                                <input
                                    type="text"
                                    placeholder={language === 'ar' ? 'أدخل رقم التذكرة (مثال: TK-2026-1048)' : 'Enter ticket ID (e.g. TK-2026-1048)'}
                                    value={trackInput}
                                    onChange={(e) => setTrackInput(e.target.value)}
                                    className="form-input"
                                    style={{ flex: 1 }}
                                />
                                <button type="submit" className="btn btn-primary" style={{ padding: '10px 20px' }}>
                                    <Search size={16} />
                                    {language === 'ar' ? 'بحث' : 'Search'}
                                </button>
                            </form>

                            {searchedTicket && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{
                                        padding: '20px',
                                        borderRadius: '16px',
                                        background: 'var(--color-bg-card)',
                                        border: '1px solid var(--color-border)'
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                                        <span style={{ fontWeight: 800, color: 'var(--color-accent-3)' }}>{searchedTicket.id}</span>
                                        <span className={`badge ${searchedTicket.status === 'resolved' ? 'badge-success' : 'badge-warning'}`}>
                                            {searchedTicket.status === 'resolved' ? (language === 'ar' ? 'تم الحل' : 'Resolved') : (language === 'ar' ? 'قيد المتابعة' : 'In Progress')}
                                        </span>
                                    </div>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-primary)', marginBottom: 12 }}>
                                        "{searchedTicket.message}"
                                    </p>
                                    {searchedTicket.response && (
                                        <div style={{ padding: '12px', borderRadius: '10px', background: 'var(--color-bg-primary)', border: '1px solid var(--color-border)', fontSize: '0.85rem' }}>
                                            <span style={{ fontWeight: 700, color: '#10b981', display: 'block', marginBottom: 4 }}>
                                                {language === 'ar' ? 'رد إدارة المركز:' : 'Management Response:'}
                                            </span>
                                            {searchedTicket.response}
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {searchError && (
                                <div style={{ color: 'var(--color-error)', fontSize: '0.85rem', textAlign: 'center' }}>
                                    {language === 'ar' ? 'لم يتم العثور على تذكرة بهذا الرقم. يرجى التأكد من الرقم والمحاولة ثانية.' : 'No ticket found with this ID.'}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
