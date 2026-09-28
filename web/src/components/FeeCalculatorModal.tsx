import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Calculator, CheckCircle2, Copy, Check, QrCode, Shield, ArrowRight, Smartphone } from 'lucide-react';
import { useLanguageStore } from '../store/languageStore';
import { t } from '../services/translations';
import { sportsPrograms } from '../services/mockData';

export default function FeeCalculatorModal({
    isOpen,
    onClose
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const { language, isRTL } = useLanguageStore();
    const trans = t[language];

    const [tier, setTier] = useState<'primary' | 'dependent' | 'child' | 'family'>('primary');
    const [extraChildren, setExtraChildren] = useState(0);
    const [selectedAcademies, setSelectedAcademies] = useState<string[]>(['swim']);
    const [isPaymentStep, setIsPaymentStep] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'fawry' | 'wallet' | 'card'>('fawry');
    const [copied, setCopied] = useState(false);
    const [isPaidSuccess, setIsPaidSuccess] = useState(false);

    // Pricing rules in EGP
    const tierPrices = {
        primary: 2200,
        dependent: 800,
        child: 450,
        family: 3600
    };

    const basePrice = tierPrices[tier];
    const extraChildrenCost = tier === 'family' ? extraChildren * 400 : 0;

    const academiesCost = selectedAcademies.reduce((acc, currId) => {
        const item = sportsPrograms.find((s) => s.id === currId);
        return acc + (item ? item.feeMonthlyEgp : 0);
    }, 0);

    const totalAnnualEstimate = basePrice + extraChildrenCost + (academiesCost * 12);
    const totalFirstMonth = basePrice + extraChildrenCost + academiesCost;

    const fawryCode = '982451092314';
    const walletNumber = '01013010137';

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSimulateCardPayment = (e: React.FormEvent) => {
        e.preventDefault();
        setIsPaidSuccess(true);
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
                className="fee-calculator-card"
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: '100%',
                    maxWidth: '720px',
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
                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(59, 130, 246, 0.15) 100%)',
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
                                background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white'
                            }}
                        >
                            <Calculator size={24} />
                        </div>
                        <div>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: 'var(--color-text-primary)' }}>
                                {trans.calculator.title}
                            </h2>
                            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', margin: '2px 0 0' }}>
                                {trans.calculator.subtitle}
                            </p>
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

                {/* Content */}
                <div style={{ padding: '28px' }}>
                    {!isPaymentStep ? (
                        <>
                            {/* Membership Tier */}
                            <div style={{ marginBottom: 24 }}>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: 12, color: 'var(--color-text-secondary)' }}>
                                    {trans.calculator.membershipType}
                                </label>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                                    {[
                                        { id: 'primary', label: trans.calculator.primaryMember, price: '2,200 ج.م' },
                                        { id: 'family', label: trans.calculator.familyPackage, price: '3,600 ج.م' },
                                        { id: 'dependent', label: trans.calculator.dependentAdult, price: '800 ج.م' },
                                        { id: 'child', label: trans.calculator.childMember, price: '450 ج.م' },
                                    ].map((opt) => (
                                        <button
                                            key={opt.id}
                                            onClick={() => setTier(opt.id as any)}
                                            style={{
                                                padding: '14px',
                                                borderRadius: '14px',
                                                border: `2px solid ${tier === opt.id ? '#10b981' : 'var(--color-border)'}`,
                                                background: tier === opt.id ? 'rgba(16, 185, 129, 0.15)' : 'var(--color-bg-card)',
                                                color: 'var(--color-text-primary)',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                cursor: 'pointer',
                                                textAlign: isRTL ? 'right' : 'left'
                                            }}
                                        >
                                            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{opt.label}</span>
                                            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#10b981' }}>{opt.price}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Extra Children for family */}
                            {tier === 'family' && (
                                <div style={{ marginBottom: 24, padding: '14px 18px', background: 'var(--color-bg-card)', borderRadius: '14px', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{trans.calculator.numChildren}</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <button
                                            className="btn btn-secondary btn-sm"
                                            onClick={() => setExtraChildren((c) => Math.max(0, c - 1))}
                                            style={{ width: 32, height: 32, padding: 0 }}
                                        >
                                            -
                                        </button>
                                        <span style={{ fontWeight: 800, fontSize: '1.1rem', minWidth: 20, textAlign: 'center' }}>
                                            {extraChildren}
                                        </span>
                                        <button
                                            className="btn btn-secondary btn-sm"
                                            onClick={() => setExtraChildren((c) => Math.min(5, c + 1))}
                                            style={{ width: 32, height: 32, padding: 0 }}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Academies Selection */}
                            <div style={{ marginBottom: 28 }}>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: 12, color: 'var(--color-text-secondary)' }}>
                                    {trans.calculator.academiesTitle}
                                </label>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                                    {sportsPrograms.map((sport) => {
                                        const isSelected = selectedAcademies.includes(sport.id);
                                        return (
                                            <button
                                                key={sport.id}
                                                onClick={() => {
                                                    if (isSelected) {
                                                        setSelectedAcademies((prev) => prev.filter((id) => id !== sport.id));
                                                    } else {
                                                        setSelectedAcademies((prev) => [...prev, sport.id]);
                                                    }
                                                }}
                                                style={{
                                                    padding: '12px 14px',
                                                    borderRadius: '12px',
                                                    border: `2px solid ${isSelected ? 'var(--color-accent-1)' : 'var(--color-border)'}`,
                                                    background: isSelected ? 'rgba(108, 92, 231, 0.15)' : 'var(--color-bg-card)',
                                                    color: 'var(--color-text-primary)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                    <span style={{ fontSize: '1.2rem' }}>{sport.icon}</span>
                                                    <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>
                                                        {language === 'ar' ? sport.titleAr : sport.titleEn}
                                                    </span>
                                                </div>
                                                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-accent-3)' }}>
                                                    +{sport.feeMonthlyEgp} {trans.calculator.egp}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Price Summary Box */}
                            <div
                                style={{
                                    padding: '20px 24px',
                                    borderRadius: '18px',
                                    background: 'var(--color-bg-primary)',
                                    border: '1px solid var(--color-border)',
                                    marginBottom: 24
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                                    <span>{language === 'ar' ? 'رسوم التجديد السنوي الأساسية:' : 'Base Annual Renewal:'}</span>
                                    <span style={{ fontWeight: 700 }}>{basePrice + extraChildrenCost} {trans.calculator.egp}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                                    <span>{language === 'ar' ? 'رسوم الأكاديميات المختارة (شهرياً):' : 'Selected Academies (Monthly):'}</span>
                                    <span style={{ fontWeight: 700 }}>{academiesCost} {trans.calculator.egp} / {trans.calculator.perMonth}</span>
                                </div>
                                <div style={{ height: 1, background: 'var(--color-border)', margin: '12px 0' }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                                            {language === 'ar' ? 'إجمالي السداد المطلوب لبدء الدورة:' : 'Total Payable for Cycle Initiation:'}
                                        </span>
                                        <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#10b981' }}>
                                            {totalFirstMonth.toLocaleString()} {trans.calculator.egp}
                                        </span>
                                    </div>
                                    <button className="btn btn-primary" onClick={() => setIsPaymentStep(true)} style={{ padding: '12px 24px' }}>
                                        {trans.calculator.proceedPayment}
                                        <ArrowRight size={16} style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        /* Payment Channels Step */
                        <div>
                            {!isPaidSuccess ? (
                                <>
                                    <div style={{ display: 'flex', gap: 8, marginBottom: 20, borderBottom: '1px solid var(--color-border)', paddingBottom: 12 }}>
                                        {[
                                            { id: 'fawry', label: 'كود فوري (Fawry)', icon: '⚡' },
                                            { id: 'wallet', label: 'إنستاباي ومحافظ (01013010137)', icon: '📱' },
                                            { id: 'card', label: 'بطاقة بنكية (Visa/Mastercard)', icon: '💳' },
                                        ].map((m) => (
                                            <button
                                                key={m.id}
                                                onClick={() => setPaymentMethod(m.id as any)}
                                                style={{
                                                    flex: 1,
                                                    padding: '10px',
                                                    borderRadius: '12px',
                                                    border: `2px solid ${paymentMethod === m.id ? 'var(--color-accent-1)' : 'var(--color-border)'}`,
                                                    background: paymentMethod === m.id ? 'rgba(108, 92, 231, 0.15)' : 'var(--color-bg-card)',
                                                    color: 'var(--color-text-primary)',
                                                    fontSize: '0.82rem',
                                                    fontWeight: paymentMethod === m.id ? 700 : 500,
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                {m.icon} {m.label}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Fawry View */}
                                    {paymentMethod === 'fawry' && (
                                        <div style={{ textAlign: 'center', padding: '20px 0' }}>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: 8 }}>
                                                {language === 'ar' ? 'رقم مرجع السداد عبر فوري (صالح لمدة 48 ساعة):' : 'Fawry Payment Reference (Valid for 48h):'}
                                            </div>
                                            <div style={{
                                                fontSize: '1.8rem',
                                                fontWeight: 900,
                                                letterSpacing: '0.1em',
                                                color: '#f59e0b',
                                                padding: '14px',
                                                borderRadius: '14px',
                                                background: 'rgba(245, 158, 11, 0.1)',
                                                border: '1px dashed #f59e0b',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: 12,
                                                marginBottom: 16
                                            }}>
                                                <span>{fawryCode}</span>
                                                <button
                                                    onClick={() => handleCopy(fawryCode)}
                                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f59e0b' }}
                                                >
                                                    {copied ? <Check size={20} /> : <Copy size={20} />}
                                                </button>
                                            </div>
                                            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', maxWidth: 440, margin: '0 auto' }}>
                                                {language === 'ar'
                                                    ? 'توجه لأي منفذ فوري واطلب سداد خدمة (مدفوعات الأندية والشباب) باستخدام الكود أعلاه، وسيتم تجديد العضوية تلقائياً.'
                                                    : 'Visit any Fawry POS and provide this service code to complete your membership payment.'}
                                            </p>
                                        </div>
                                    )}

                                    {/* Wallet View */}
                                    {paymentMethod === 'wallet' && (
                                        <div style={{ textAlign: 'center', padding: '20px 0' }}>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: 8 }}>
                                                {language === 'ar' ? 'رقم المحفظة الإلكترونية وإنستاباي المعتمد:' : 'Official Wallet & InstaPay Transfer Number:'}
                                            </div>
                                            <div style={{
                                                fontSize: '1.8rem',
                                                fontWeight: 900,
                                                color: '#10b981',
                                                padding: '14px',
                                                borderRadius: '14px',
                                                background: 'rgba(16, 185, 129, 0.1)',
                                                border: '1px dashed #10b981',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: 12,
                                                marginBottom: 16
                                            }}>
                                                <span>{walletNumber}</span>
                                                <button
                                                    onClick={() => handleCopy(walletNumber)}
                                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#10b981' }}
                                                >
                                                    {copied ? <Check size={20} /> : <Copy size={20} />}
                                                </button>
                                            </div>
                                            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', maxWidth: 440, margin: '0 auto' }}>
                                                {language === 'ar'
                                                    ? 'يمكنك التحويل عبر فودافون كاش، أورنج كاش، أو إنستاباي، ثم إرسال صورة الإيصال مع رقم العضوية.'
                                                    : 'Transfer via InstaPay or Mobile Wallet to the official club number and retain your receipt.'}
                                            </p>
                                        </div>
                                    )}

                                    {/* Card Simulation */}
                                    {paymentMethod === 'card' && (
                                        <form onSubmit={handleSimulateCardPayment} style={{ maxWidth: 440, margin: '0 auto' }}>
                                            <div className="form-group">
                                                <label className="form-label">{language === 'ar' ? 'رقم البطاقة البنكية' : 'Card Number'}</label>
                                                <input type="text" className="form-input" placeholder="4111 2222 3333 4444" required />
                                            </div>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                                                <div className="form-group">
                                                    <label className="form-label">{language === 'ar' ? 'تاريخ الانتهاء' : 'Expiry'}</label>
                                                    <input type="text" className="form-input" placeholder="MM/YY" required />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">CVV</label>
                                                    <input type="password" className="form-input" placeholder="123" maxLength={4} required />
                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', marginTop: 10 }}>
                                                {language === 'ar' ? `تأكيد وسداد ${totalFirstMonth} ج.م` : `Pay EGP ${totalFirstMonth}`}
                                            </button>
                                        </form>
                                    )}

                                    <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 24 }}>
                                        <button className="btn btn-secondary btn-sm" onClick={() => setIsPaymentStep(false)}>
                                            {language === 'ar' ? 'الرجوع للحاسبة' : 'Back to Calculator'}
                                        </button>
                                    </div>
                                </>
                            ) : (
                                /* Success Receipt View */
                                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '30px 10px' }}>
                                    <CheckCircle2 size={54} style={{ color: '#10b981', margin: '0 auto 12px' }} />
                                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: 6 }}>
                                        {language === 'ar' ? 'تمت عملية السداد بنجاح!' : 'Payment Completed Successfully!'}
                                    </h3>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: 20 }}>
                                        {language === 'ar'
                                            ? 'تم تجديد الاشتراك وتفعيل بطاقة العضوية الإلكترونية للألعاب المختارة بنجاح.'
                                            : 'Membership renewal confirmed and digital pass activated.'}
                                    </p>
                                    <div style={{
                                        display: 'inline-block',
                                        padding: '12px 24px',
                                        background: 'var(--color-bg-primary)',
                                        borderRadius: '12px',
                                        border: '1px solid var(--color-border)',
                                        fontSize: '0.85rem',
                                        textAlign: 'left',
                                        marginBottom: 24
                                    }}>
                                        <div><strong>{language === 'ar' ? 'رقم الإيصال:' : 'Invoice No:'}</strong> INV-2026-94812</div>
                                        <div><strong>{language === 'ar' ? 'المبلغ:' : 'Amount:'}</strong> {totalFirstMonth} EGP</div>
                                        <div><strong>{language === 'ar' ? 'التاريخ:' : 'Date:'}</strong> {new Date().toLocaleDateString()}</div>
                                    </div>
                                    <div>
                                        <button className="btn btn-primary" onClick={onClose}>
                                            {language === 'ar' ? 'إغلاق والعودة للموقع' : 'Done'}
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
