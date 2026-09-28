import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Trophy, CheckCircle, ArrowRight, ArrowLeft, RefreshCw, Star, User, Phone, Calendar } from 'lucide-react';
import { useLanguageStore } from '../store/languageStore';
import { t } from '../services/translations';
import { sportsPrograms, SportProgram } from '../services/mockData';

interface MatcherResult {
    sport: SportProgram;
    score: number;
    secondarySport: SportProgram;
    reasonAr: string;
    reasonEn: string;
}

export default function AiSportMatcherModal({
    isOpen,
    onClose
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const { language, isRTL } = useLanguageStore();
    const trans = t[language];

    const [step, setStep] = useState<number>(1);
    const [ageCategory, setAgeCategory] = useState<string>('junior');
    const [fitnessLevel, setFitnessLevel] = useState<string>('moderate');
    const [preferredEnv, setPreferredEnv] = useState<string>('racquet');
    const [dynamicPref, setDynamicPref] = useState<string>('precision');
    const [goal, setGoal] = useState<string>('competition');

    const [loadingPhase, setLoadingPhase] = useState<number>(0);
    const [result, setResult] = useState<MatcherResult | null>(null);

    // Talent registration form state
    const [talentName, setTalentName] = useState('عماد حمدي');
    const [talentAge, setTalentAge] = useState('14');
    const [talentPhone, setTalentPhone] = useState('01013010137');
    const [registeredTicket, setRegisteredTicket] = useState<string | null>(null);
    const [isSubmittingTalent, setIsSubmittingTalent] = useState(false);

    const handleStartAnalysis = () => {
        setStep(4); // Loading state
        setLoadingPhase(0);

        setTimeout(() => setLoadingPhase(1), 700);
        setTimeout(() => setLoadingPhase(2), 1500);

        setTimeout(() => {
            // Compute best match based on inputs
            let matchedSport = sportsPrograms[0];
            let secondary = sportsPrograms[1];

            if (preferredEnv === 'aquatics') {
                matchedSport = sportsPrograms.find((s) => s.id === 'swim') || sportsPrograms[0];
                secondary = sportsPrograms.find((s) => s.id === 'gym') || sportsPrograms[1];
            } else if (preferredEnv === 'racquet') {
                matchedSport = sportsPrograms.find((s) => s.id === 'table-tennis') || sportsPrograms[1];
                secondary = sportsPrograms.find((s) => s.id === 'tennis') || sportsPrograms[4];
            } else if (preferredEnv === 'combat') {
                matchedSport = sportsPrograms.find((s) => s.id === 'karate') || sportsPrograms[2];
                secondary = sportsPrograms.find((s) => s.id === 'gym') || sportsPrograms[5];
            } else if (preferredEnv === 'ball') {
                matchedSport = sportsPrograms.find((s) => s.id === 'football') || sportsPrograms[3];
                secondary = sportsPrograms.find((s) => s.id === 'swim') || sportsPrograms[0];
            } else {
                matchedSport = sportsPrograms.find((s) => s.id === 'gym') || sportsPrograms[5];
                secondary = sportsPrograms.find((s) => s.id === 'tennis') || sportsPrograms[4];
            }

            setResult({
                sport: matchedSport,
                score: 94 + Math.floor(Math.random() * 5),
                secondarySport: secondary,
                reasonAr: `بناءً على تفضيلك لـ (${preferredEnv === 'racquet' ? 'ألعاب المضرب وسرعة رد الفعل' : preferredEnv === 'aquatics' ? 'الرياضات المائية والتحمل' : preferredEnv === 'combat' ? 'الدفاع عن النفس والانضباط' : 'اللياقة والمهارات الحركية'}) وهدف (${goal === 'competition' ? 'المنافسة والبطولات' : 'بناء اللياقة والصحة'})، يعتبر هذا البرنامج هو المسار الأفضل لتطوير الموهبة وصقلها سريعاً.`,
                reasonEn: `Based on your inclination towards kinetic precision, physical endurance, and competitive development, this program offers the optimal pathway to elevate skills with certified federation trainers.`
            });

            setStep(5); // Result state
        }, 2200);
    };

    const handleRegisterTalent = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmittingTalent(true);
        setTimeout(() => {
            setIsSubmittingTalent(false);
            const ticket = `TALENT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
            setRegisteredTicket(ticket);
        }, 800);
    };

    const resetWizard = () => {
        setStep(1);
        setResult(null);
        setRegisteredTicket(null);
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
                className="ai-matcher-card"
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: '100%',
                    maxWidth: '680px',
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
                        background: 'linear-gradient(135deg, rgba(108, 92, 231, 0.25) 0%, rgba(168, 85, 247, 0.15) 100%)',
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
                                background: 'var(--color-gradient)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white'
                            }}
                        >
                            <Sparkles size={24} />
                        </div>
                        <div>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: 'var(--color-accent-3)', fontWeight: 700, textTransform: 'uppercase' }}>
                                <Trophy size={14} />
                                {trans.talentQuiz.badge}
                            </div>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '2px 0 0', color: 'var(--color-text-primary)' }}>
                                {trans.talentQuiz.title}
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

                {/* Body Content */}
                <div style={{ padding: '28px' }}>
                    {/* Step 1: Age & Fitness */}
                    {step === 1 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                            <div style={{ marginBottom: 20 }}>
                                <span style={{ fontSize: '0.8rem', color: 'var(--color-accent-3)', fontWeight: 700 }}>
                                    {language === 'ar' ? 'المرحلة 1 من 3' : 'Step 1 of 3'}
                                </span>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '4px 0 16px' }}>
                                    {trans.talentQuiz.step1}
                                </h3>

                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-secondary)' }}>
                                    {language === 'ar' ? 'الفئة العمرية للمتدرب:' : 'Target Age Group:'}
                                </label>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 20 }}>
                                    {[
                                        { id: 'kid', labelAr: 'أطفال (٤ - ١٠ سنوات)', labelEn: 'Kids (4-10 yrs)', icon: '🧒' },
                                        { id: 'junior', labelAr: 'ناشئين (١١ - ١٦ سنة)', labelEn: 'Juniors (11-16 yrs)', icon: '🏃‍♂️' },
                                        { id: 'youth', labelAr: 'شباب (١٧ - ٢٥ سنة)', labelEn: 'Youth (17-25 yrs)', icon: '⚡' },
                                        { id: 'adult', labelAr: 'كبار ورواد (٢٦+ سنة)', labelEn: 'Adults & Masters (26+)', icon: '🌟' },
                                    ].map((opt) => (
                                        <button
                                            key={opt.id}
                                            onClick={() => setAgeCategory(opt.id)}
                                            style={{
                                                padding: '14px',
                                                borderRadius: '14px',
                                                border: `2px solid ${ageCategory === opt.id ? 'var(--color-accent-1)' : 'var(--color-border)'}`,
                                                background: ageCategory === opt.id ? 'rgba(108, 92, 231, 0.15)' : 'var(--color-bg-card)',
                                                color: 'var(--color-text-primary)',
                                                textAlign: isRTL ? 'right' : 'left',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 10,
                                                cursor: 'pointer',
                                                fontWeight: ageCategory === opt.id ? 700 : 500
                                            }}
                                        >
                                            <span style={{ fontSize: '1.4rem' }}>{opt.icon}</span>
                                            <span style={{ fontSize: '0.9rem' }}>{language === 'ar' ? opt.labelAr : opt.labelEn}</span>
                                        </button>
                                    ))}
                                </div>

                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-secondary)' }}>
                                    {language === 'ar' ? 'المستوى الرياضي الحالي:' : 'Current Physical Activity:'}
                                </label>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                                    {[
                                        { id: 'beginner', labelAr: 'مبتدئ تماماً', labelEn: 'Beginner' },
                                        { id: 'moderate', labelAr: 'نشاط متوسط', labelEn: 'Active' },
                                        { id: 'advanced', labelAr: 'رياضي ممارس', labelEn: 'Competitive' },
                                    ].map((opt) => (
                                        <button
                                            key={opt.id}
                                            onClick={() => setFitnessLevel(opt.id)}
                                            style={{
                                                padding: '12px',
                                                borderRadius: '12px',
                                                border: `2px solid ${fitnessLevel === opt.id ? 'var(--color-accent-2)' : 'var(--color-border)'}`,
                                                background: fitnessLevel === opt.id ? 'rgba(168, 85, 247, 0.15)' : 'var(--color-bg-card)',
                                                color: 'var(--color-text-primary)',
                                                fontSize: '0.85rem',
                                                fontWeight: fitnessLevel === opt.id ? 700 : 500,
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {language === 'ar' ? opt.labelAr : opt.labelEn}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
                                <button className="btn btn-primary" onClick={() => setStep(2)}>
                                    {language === 'ar' ? 'المتابعة للخطوة التالية' : 'Next Step'}
                                    <ArrowRight size={16} style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: Environment & Preferences */}
                    {step === 2 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                            <div style={{ marginBottom: 20 }}>
                                <span style={{ fontSize: '0.8rem', color: 'var(--color-accent-3)', fontWeight: 700 }}>
                                    {language === 'ar' ? 'المرحلة 2 من 3' : 'Step 2 of 3'}
                                </span>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '4px 0 16px' }}>
                                    {trans.talentQuiz.step2}
                                </h3>

                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 8, color: 'var(--color-text-secondary)' }}>
                                    {language === 'ar' ? 'ما نوع البيئة والرياضة المفضلة؟' : 'Preferred Sports Setting:'}
                                </label>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 20 }}>
                                    {[
                                        { id: 'racquet', labelAr: 'مضرب ورد فعل (تنس طاولة / بادل)', labelEn: 'Racquet & Reflexes (Table Tennis, Padel)', icon: '🏓' },
                                        { id: 'aquatics', labelAr: 'رياضات مائية وسباحة أولمبية', labelEn: 'Aquatics & Olympic Swimming', icon: '🏊‍♂️' },
                                        { id: 'combat', labelAr: 'فنون قتالية ودفاع عن النفس (كاراتيه)', labelEn: 'Martial Arts & Discipline (Karate)', icon: '🥋' },
                                        { id: 'ball', labelAr: 'ألعاب جماعية وملاعب مفتوحة (كرة قدم)', labelEn: 'Team Ball Games (Football)', icon: '⚽' },
                                    ].map((opt) => (
                                        <button
                                            key={opt.id}
                                            onClick={() => setPreferredEnv(opt.id)}
                                            style={{
                                                padding: '14px',
                                                borderRadius: '14px',
                                                border: `2px solid ${preferredEnv === opt.id ? 'var(--color-accent-1)' : 'var(--color-border)'}`,
                                                background: preferredEnv === opt.id ? 'rgba(108, 92, 231, 0.15)' : 'var(--color-bg-card)',
                                                color: 'var(--color-text-primary)',
                                                textAlign: isRTL ? 'right' : 'left',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 10,
                                                cursor: 'pointer',
                                                fontWeight: preferredEnv === opt.id ? 700 : 500
                                            }}
                                        >
                                            <span style={{ fontSize: '1.4rem' }}>{opt.icon}</span>
                                            <span style={{ fontSize: '0.85rem' }}>{language === 'ar' ? opt.labelAr : opt.labelEn}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
                                <button className="btn btn-secondary" onClick={() => setStep(1)}>
                                    <ArrowLeft size={16} style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
                                    {language === 'ar' ? 'السابق' : 'Back'}
                                </button>
                                <button className="btn btn-primary" onClick={() => setStep(3)}>
                                    {language === 'ar' ? 'الخطوة الأخيرة' : 'Next Step'}
                                    <ArrowRight size={16} style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Goals */}
                    {step === 3 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                            <div style={{ marginBottom: 20 }}>
                                <span style={{ fontSize: '0.8rem', color: 'var(--color-accent-3)', fontWeight: 700 }}>
                                    {language === 'ar' ? 'المرحلة 3 من 3' : 'Step 3 of 3'}
                                </span>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '4px 0 16px' }}>
                                    {trans.talentQuiz.step3}
                                </h3>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    {[
                                        { id: 'competition', titleAr: 'بناء بطل رياضي والمشاركة في بطولات الجمهورية', titleEn: 'Championship Preparation & Federation Tournaments', icon: '🥇' },
                                        { id: 'fitness', titleAr: 'رفع اللياقة البدنية والرشاقة والصحة العامة', titleEn: 'General Fitness, Stamina & Active Lifestyle', icon: '💪' },
                                        { id: 'social', titleAr: 'تفريغ طاقة الطفل وتكوين صداقات واكتساب الانضباط', titleEn: 'Discipline, Fun & Social Skills for Kids', icon: '🤝' },
                                    ].map((opt) => (
                                        <button
                                            key={opt.id}
                                            onClick={() => setGoal(opt.id)}
                                            style={{
                                                padding: '16px',
                                                borderRadius: '14px',
                                                border: `2px solid ${goal === opt.id ? 'var(--color-accent-2)' : 'var(--color-border)'}`,
                                                background: goal === opt.id ? 'rgba(168, 85, 247, 0.15)' : 'var(--color-bg-card)',
                                                color: 'var(--color-text-primary)',
                                                textAlign: isRTL ? 'right' : 'left',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 14,
                                                cursor: 'pointer',
                                                fontWeight: goal === opt.id ? 700 : 500
                                            }}
                                        >
                                            <span style={{ fontSize: '1.6rem' }}>{opt.icon}</span>
                                            <span style={{ fontSize: '0.92rem' }}>{language === 'ar' ? opt.titleAr : opt.titleEn}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 28 }}>
                                <button className="btn btn-secondary" onClick={() => setStep(2)}>
                                    <ArrowLeft size={16} style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
                                    {language === 'ar' ? 'السابق' : 'Back'}
                                </button>
                                <button className="btn btn-primary" onClick={handleStartAnalysis} style={{ gap: 8 }}>
                                    <Sparkles size={18} />
                                    {language === 'ar' ? 'تحليل النتائج بالمساعد الذكي' : 'Generate AI Recommendation'}
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 4: Skeleton Loading State */}
                    {step === 4 && (
                        <div style={{ textAlign: 'center', padding: '40px 10px' }}>
                            <div
                                style={{
                                    width: 72,
                                    height: 72,
                                    borderRadius: '50%',
                                    background: 'var(--color-gradient)',
                                    margin: '0 auto 24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    animation: 'pulse 1.2s infinite'
                                }}
                            >
                                <Sparkles size={36} />
                            </div>

                            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 8, color: 'var(--color-text-primary)' }}>
                                {trans.talentQuiz.analyzing}
                            </h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: 28 }}>
                                {trans.talentQuiz.analyzingSteps[loadingPhase] || trans.talentQuiz.analyzingSteps[0]}
                            </p>

                            {/* Animated Skeleton bars */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 460, margin: '0 auto' }}>
                                <div className="skeleton" style={{ height: 20, width: '100%' }} />
                                <div className="skeleton" style={{ height: 48, width: '90%', margin: '0 auto' }} />
                                <div className="skeleton" style={{ height: 20, width: '75%', margin: '0 auto' }} />
                            </div>
                        </div>
                    )}

                    {/* Step 5: Result Card */}
                    {step === 5 && result && (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                            <div
                                style={{
                                    padding: '24px',
                                    borderRadius: '20px',
                                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(59, 130, 246, 0.12) 100%)',
                                    border: '1px solid rgba(16, 185, 129, 0.3)',
                                    marginBottom: 24
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#10b981', display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <CheckCircle size={18} />
                                        {trans.talentQuiz.resultTitle}
                                    </span>
                                    <span style={{
                                        fontSize: '0.85rem',
                                        fontWeight: 800,
                                        background: 'var(--color-gradient)',
                                        color: 'white',
                                        padding: '4px 12px',
                                        borderRadius: '20px'
                                    }}>
                                        {trans.talentQuiz.matchScore} {result.score}%
                                    </span>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                                    <div
                                        style={{
                                            width: 64,
                                            height: 64,
                                            borderRadius: '16px',
                                            background: `${result.sport.color}22`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '2rem',
                                            flexShrink: 0
                                        }}
                                    >
                                        {result.sport.icon}
                                    </div>
                                    <div>
                                        <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                                            {trans.talentQuiz.recommendedSport}
                                        </span>
                                        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: '2px 0 4px', color: 'var(--color-text-primary)' }}>
                                            {language === 'ar' ? result.sport.titleAr : result.sport.titleEn}
                                        </h3>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                                            {language === 'ar' ? result.sport.coachAr : result.sport.coachEn}
                                        </div>
                                    </div>
                                </div>

                                <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--color-text-secondary)', margin: '0 0 14px' }}>
                                    {language === 'ar' ? result.reasonAr : result.reasonEn}
                                </p>

                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(2, 1fr)',
                                    gap: 12,
                                    paddingTop: 12,
                                    borderTop: '1px solid var(--color-border)',
                                    fontSize: '0.85rem'
                                }}>
                                    <div>
                                        <span style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '0.75rem' }}>
                                            {trans.talentQuiz.schedule}
                                        </span>
                                        <span style={{ fontWeight: 600 }}>
                                            {language === 'ar' ? result.sport.scheduleAr : result.sport.scheduleEn}
                                        </span>
                                    </div>
                                    <div>
                                        <span style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '0.75rem' }}>
                                            {trans.talentQuiz.secondarySport}
                                        </span>
                                        <span style={{ fontWeight: 600 }}>
                                            {result.secondarySport.icon} {language === 'ar' ? result.secondarySport.titleAr : result.secondarySport.titleEn}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Talent Trial Registration */}
                            {!registeredTicket ? (
                                <form onSubmit={handleRegisterTalent} style={{
                                    padding: '20px',
                                    borderRadius: '16px',
                                    background: 'var(--color-bg-card)',
                                    border: '1px solid var(--color-border)'
                                }}>
                                    <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: 12, color: 'var(--color-text-primary)' }}>
                                        {trans.talentQuiz.registerTalent}
                                    </h4>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: 4, color: 'var(--color-text-secondary)' }}>
                                                {trans.talentQuiz.fullName}
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={talentName}
                                                onChange={(e) => setTalentName(e.target.value)}
                                                className="form-input"
                                                style={{ padding: '8px 12px', fontSize: '0.88rem' }}
                                            />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: 4, color: 'var(--color-text-secondary)' }}>
                                                {trans.talentQuiz.ageInput}
                                            </label>
                                            <input
                                                type="number"
                                                required
                                                value={talentAge}
                                                onChange={(e) => setTalentAge(e.target.value)}
                                                className="form-input"
                                                style={{ padding: '8px 12px', fontSize: '0.88rem' }}
                                            />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: 4, color: 'var(--color-text-secondary)' }}>
                                                {trans.talentQuiz.phone}
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={talentPhone}
                                                onChange={(e) => setTalentPhone(e.target.value)}
                                                className="form-input"
                                                style={{ padding: '8px 12px', fontSize: '0.88rem' }}
                                            />
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <button type="button" className="btn btn-secondary btn-sm" onClick={resetWizard}>
                                            <RefreshCw size={14} />
                                            {language === 'ar' ? 'إعادة الاختبار' : 'Retake Quiz'}
                                        </button>
                                        <button type="submit" className="btn btn-primary" disabled={isSubmittingTalent}>
                                            {isSubmittingTalent ? '...' : trans.talentQuiz.submitTalent}
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{
                                        padding: '20px',
                                        borderRadius: '16px',
                                        background: 'rgba(16, 185, 129, 0.15)',
                                        border: '1px solid #10b981',
                                        textAlign: 'center'
                                    }}
                                >
                                    <CheckCircle size={32} style={{ color: '#10b981', margin: '0 auto 8px' }} />
                                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-text-primary)', margin: '0 0 6px' }}>
                                        {trans.talentQuiz.talentSuccess}
                                    </h4>
                                    <div style={{
                                        display: 'inline-block',
                                        padding: '6px 16px',
                                        background: 'var(--color-bg-primary)',
                                        borderRadius: '8px',
                                        fontWeight: 800,
                                        fontSize: '1.1rem',
                                        color: '#10b981',
                                        letterSpacing: '0.05em',
                                        margin: '6px 0 12px'
                                    }}>
                                        {registeredTicket}
                                    </div>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                                        {language === 'ar'
                                            ? `تم حجز موعد التقييم للموهبة (${talentName}). تم إرسال رسالة تأكيد للرقم ${talentPhone}. يرجى التوجه لقطاع النشاط الرياضي بالمركز.`
                                            : `Trial session reserved for (${talentName}). Confirmation SMS dispatched to ${talentPhone}. Please present this code at reception.`
                                        }
                                    </p>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
