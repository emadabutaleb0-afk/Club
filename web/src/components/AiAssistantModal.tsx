import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { useLanguageStore } from '../store/languageStore';
import { t } from '../services/translations';

interface Message {
    id: string;
    sender: 'user' | 'bot';
    text: string;
    timestamp: string;
    actionLink?: {
        label: string;
        targetId: string;
    };
}

export default function AiAssistantModal({
    onOpenCalculator,
    onOpenMatcher,
    onOpenComplaints
}: {
    onOpenCalculator: () => void;
    onOpenMatcher: () => void;
    onOpenComplaints: () => void;
}) {
    const { language, isRTL } = useLanguageStore();
    const trans = t[language];
    const [isOpen, setIsOpen] = useState(() => typeof window !== 'undefined' && window.location.search.includes('openAssistant=1'));
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const initialMessages: Message[] = [
        {
            id: 'm1',
            sender: 'bot',
            text: language === 'ar'
                ? 'أهلاً بك في مركز التنمية الشبابية بالتجمع الأول! 🌟 أنا مساعدك الذكي، كيف يمكنني مساعدتك اليوم بخصوص الأكاديميات، مواعيد التدريب، أو تجديد الاشتراك؟'
                : 'Welcome to First Settlement Youth Development Center! 🌟 I am your AI Club Assistant. How can I assist you today with sports academies, schedules, or membership renewal?',
            timestamp: 'الآن'
        }
    ];

    const [messages, setMessages] = useState<Message[]>(initialMessages);

    // Update greeting when language changes
    useEffect(() => {
        setMessages([
            {
                id: 'm1',
                sender: 'bot',
                text: language === 'ar'
                    ? 'أهلاً بك في مركز التنمية الشبابية بالتجمع الأول! 🌟 أنا مساعدك الذكي، كيف يمكنني مساعدتك اليوم بخصوص الأكاديميات، مواعيد التدريب، أو تجديد الاشتراك؟'
                    : 'Welcome to First Settlement Youth Development Center! 🌟 I am your AI Club Assistant. How can I assist you today with sports academies, schedules, or membership renewal?',
                timestamp: 'الآن'
            }
        ]);
    }, [language]);

    useEffect(() => {
        if (isOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen]);

    const handleSend = (textToSend?: string) => {
        const query = (textToSend || inputText).trim();
        if (!query) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            sender: 'user',
            text: query,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages((prev) => [...prev, userMsg]);
        setInputText('');
        setIsTyping(true);

        setTimeout(() => {
            const botResponse = generateBotResponse(query, language);
            setMessages((prev) => [...prev, botResponse]);
            setIsTyping(false);
        }, 650);
    };

    const generateBotResponse = (query: string, lang: 'ar' | 'en'): Message => {
        const q = query.toLowerCase();
        const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        if (q.includes('وزير') || q.includes('جوهر') || q.includes('زمزم') || q.includes('زيار') || q.includes('جول') || q.includes('minister') || q.includes('visit') || q.includes('inspection') || q.includes('خبر') || q.includes('news')) {
            return {
                id: (Date.now() + 1).toString(),
                sender: 'bot',
                text: lang === 'ar'
                    ? '🏛️ في 25 سبتمبر 2026، قام السيد جوهر نبيل وزير الشباب والرياضة برفقة د. مصطفى زمزم بجولة تفقدية مفاجئة لمركز التنمية الشبابية بالتجمع الأول. شملت الجولة حمام السباحة وصالة الألعاب الرياضية والمبنى الإداري، ووجه الوزير بسرعة إنهاء أعمال الصيانة والدهانات وتزويد كافة الألعاب بالأدوات الرياضية الحديثة لخدمة أسر وشباب المنطقة.'
                    : '🏛️ On September 25, 2026, Minister of Youth & Sports Gohar Nabil, accompanied by Assistant Minister Dr. Mostafa Zamzam, paid a surprise inspection visit to the Center. He inspected the pool, gym, and administrative offices, directing rapid completion of high-standard maintenance and modern athletic equipment.',
                timestamp: now,
                actionLink: { label: lang === 'ar' ? 'عرض تفاصيل الزيارة والبيان' : 'View Visit Details', targetId: 'ministerial-news' }
            };
        }

        if (q.includes('سباح') || q.includes('مسبح') || q.includes('swim') || q.includes('pool')) {
            return {
                id: (Date.now() + 1).toString(),
                sender: 'bot',
                text: lang === 'ar'
                    ? '🏊 مجمع السباحة الأولمبي بالمركز يضم مسبحاً أولمبياً ومسبحاً للأطفال مغطى ومدفأ. مواعيد تدريب البراعم والأطفال: السبت والإثنين والأربعاء (٤م - ٨م) تحت إشراف نخبة من مدربي المنتخبات. كما تتوفر فترات حرة للأعضاء يومياً.'
                    : '🏊 Our Olympic Swimming Complex includes a heated 50m pool and children pool. Junior academy runs Sat, Mon & Wed (4 PM - 8 PM). Open recreational swim is available daily for members.',
                timestamp: now,
                actionLink: { label: lang === 'ar' ? 'عرض تفاصيل الأكاديميات' : 'View Academies', targetId: 'facilities' }
            };
        }

        if (q.includes('تجديد') || q.includes('رسوم') || q.includes('اشتراك') || q.includes('سعر') || q.includes('renew') || q.includes('fee') || q.includes('cost')) {
            return {
                id: (Date.now() + 1).toString(),
                sender: 'bot',
                text: lang === 'ar'
                    ? '💳 رسوم التجديد السنوي لعام 2026: العضوية العاملة 2,200 جنيه، والتابع البالغ 800 جنيه، والأطفال 450 جنيه. يمكنك حساب القيمة الإجمالية وتوليد كود الدفع عبر فوري أو البطاقة البنكية من حاسبة الرسوم.'
                    : '💳 2026 Annual Membership Renewal: Primary Member EGP 2,200, Adult Dependent EGP 800, Junior EGP 450. You can simulate total fees and generate your Fawry / Card payment reference using our fee calculator.',
                timestamp: now,
                actionLink: { label: lang === 'ar' ? 'فتح حاسبة الرسوم الآن' : 'Open Fee Calculator', targetId: 'calculator' }
            };
        }

        if (q.includes('موهب') || q.includes('مسار') || q.includes('اختبار') || q.includes('talent') || q.includes('track') || q.includes('quiz')) {
            return {
                id: (Date.now() + 1).toString(),
                sender: 'bot',
                text: lang === 'ar'
                    ? '🎯 برنامج اكتشاف المواهب برعاية وزارة الشباب والرياضة! يمكنك إجراء اختبار الذكاء الاصطناعي لتحديد أنسب رياضة تناسب قدراتك، ثم حجز تجربة أداء مجانية مع كباتن المركز مباشرة.'
                    : '🎯 Talent Discovery Program under the Ministry of Youth & Sports! Take our AI sports quiz to determine the optimal sport matching your attributes and book a free trial assessment.',
                timestamp: now,
                actionLink: { label: lang === 'ar' ? 'بدء اختبار المسار' : 'Start Track Quiz', targetId: 'matcher' }
            };
        }

        if (q.includes('طاّول') || q.includes('تنس') || q.includes('كاراتيه') || q.includes('قدم') || q.includes('sport') || q.includes('football') || q.includes('tennis')) {
            return {
                id: (Date.now() + 1).toString(),
                sender: 'bot',
                text: lang === 'ar'
                    ? '🏆 يضم المركز أكاديميات معتمدة في: تنس الطاولة، كرة القدم، الكاراتيه، السباحة، التنس الأرضي والبادل، والجمباز واللياقة البدنية. جميع المدربين معتمدون من الاتحادات الرسمية.'
                    : '🏆 The Center hosts accredited academies in: Table Tennis, Football, Karate, Swimming, Tennis & Padel, and Gymnastics. All coaches are federation-certified.',
                timestamp: now,
                actionLink: { label: lang === 'ar' ? 'تصفح كافة الرياضات' : 'Browse All Sports', targetId: 'facilities' }
            };
        }

        if (q.includes('شكوى') || q.includes('مقترح') || q.includes('ادارة') || q.includes('complain') || q.includes('suggest') || q.includes('feedback')) {
            return {
                id: (Date.now() + 1).toString(),
                sender: 'bot',
                text: lang === 'ar'
                    ? '📋 إدارة المركز ترحب بكافة المقترحات والشكاوى لضمان أعلى مستوى خدمة. يمكنك إرسال طلبك والحصول على رقم تذكرة فوري للمتابعة.'
                    : '📋 Club management welcomes your feedback and complaints to ensure optimal standards. Submit your request for an instant tracking ticket.',
                timestamp: now,
                actionLink: { label: lang === 'ar' ? 'تقديم شكوى أو مقترح' : 'Submit Feedback', targetId: 'complaints' }
            };
        }

        if (q.includes('عنوان') || q.includes('مكان') || q.includes('موقع') || q.includes('location') || q.includes('address') || q.includes('where')) {
            return {
                id: (Date.now() + 1).toString(),
                sender: 'bot',
                text: lang === 'ar'
                    ? '📍 يقع مركز التنمية الشبابية بالتجمع الأول بجوار مجمع المدارس والخدمات، القاهرة الجديدة. مواعيد العمل اليومية: من ٧:٠٠ صباحاً حتى ١١:٠٠ مساءً طوال أيام الأسبوع.'
                    : '📍 First Settlement Youth Development Center is located adjacent to the Services Complex, New Cairo. Open daily from 7:00 AM to 11:00 PM.',
                timestamp: now
            };
        }

        // Generic friendly reply
        return {
            id: (Date.now() + 1).toString(),
            sender: 'bot',
            text: lang === 'ar'
                ? 'شكراً لتواصلك مع مركز التنمية الشبابية بالتجمع الأول. يسعدنا تقديم أفضل الخدمات الرياضية والاجتماعية لك ولأسرتك. يمكنك أيضاً استخدام الأزرار أدناه للوصول السريع لما تبحث عنه.'
                : 'Thank you for reaching out to First Settlement Youth Development Center. We are dedicated to providing the finest athletic experience for you and your family. Feel free to use the quick options below.',
            timestamp: now
        };
    };

    const handleActionClick = (targetId: string) => {
        if (targetId === 'calculator') onOpenCalculator();
        else if (targetId === 'matcher') onOpenMatcher();
        else if (targetId === 'complaints') onOpenComplaints();
        else {
            const el = document.getElementById(targetId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            {/* Floating Trigger Button */}
            <motion.button
                className="ai-floating-trigger"
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                aria-label="Open AI Assistant"
                style={{
                    position: 'fixed',
                    bottom: 28,
                    [isRTL ? 'left' : 'right']: 28,
                    zIndex: 990,
                    width: 62,
                    height: 62,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6c5ce7 0%, #a855f7 50%, #3b82f6 100%)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 30px rgba(108, 92, 231, 0.45)',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    cursor: 'pointer'
                }}
            >
                <div style={{ position: 'relative' }}>
                    <Bot size={28} />
                    <span
                        style={{
                            position: 'absolute',
                            top: -4,
                            right: -4,
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            background: '#10b981',
                            border: '2px solid white'
                        }}
                    />
                </div>
            </motion.button>

            {/* Chat Modal / Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="ai-assistant-drawer"
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                        style={{
                            position: 'fixed',
                            bottom: 28,
                            [isRTL ? 'left' : 'right']: 28,
                            width: 'min(420px, calc(100vw - 32px))',
                            height: '620px',
                            maxHeight: 'calc(100vh - 60px)',
                            background: 'var(--color-bg-secondary)',
                            borderRadius: '24px',
                            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px var(--color-border)',
                            zIndex: 1000,
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Header */}
                        <div
                            style={{
                                padding: '16px 20px',
                                background: 'linear-gradient(135deg, rgba(108, 92, 231, 0.2) 0%, rgba(168, 85, 247, 0.15) 100%)',
                                borderBottom: '1px solid var(--color-border)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div
                                    style={{
                                        width: 42,
                                        height: 42,
                                        borderRadius: 14,
                                        background: 'var(--color-gradient)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white'
                                    }}
                                >
                                    <Sparkles size={20} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: 0, color: 'var(--color-text-primary)' }}>
                                        {trans.aiWidget.title}
                                    </h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} />
                                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                            {language === 'ar' ? 'متصل الآن للإجابة الفورية' : 'Online & ready to help'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                style={{
                                    background: 'var(--color-bg-glass)',
                                    border: '1px solid var(--color-border)',
                                    borderRadius: '50%',
                                    width: 34,
                                    height: 34,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--color-text-secondary)',
                                    cursor: 'pointer'
                                }}
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Quick Prompts Bar */}
                        <div
                            style={{
                                padding: '10px 16px',
                                background: 'var(--color-bg-primary)',
                                borderBottom: '1px solid var(--color-border)',
                                display: 'flex',
                                gap: 8,
                                overflowX: 'auto',
                                whiteSpace: 'nowrap',
                                scrollbarWidth: 'none'
                            }}
                        >
                            {[trans.aiWidget.q1, trans.aiWidget.q2, trans.aiWidget.q3].map((q, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSend(q)}
                                    style={{
                                        fontSize: '0.75rem',
                                        padding: '6px 12px',
                                        borderRadius: '20px',
                                        background: 'var(--color-bg-card)',
                                        border: '1px solid var(--color-border)',
                                        color: 'var(--color-accent-3)',
                                        cursor: 'pointer',
                                        flexShrink: 0
                                    }}
                                >
                                    {q}
                                </button>
                            ))}
                        </div>

                        {/* Messages List */}
                        <div
                            style={{
                                flex: 1,
                                padding: '20px 16px',
                                overflowY: 'auto',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 14
                            }}
                        >
                            {messages.map((m) => (
                                <div
                                    key={m.id}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: m.sender === 'user' ? 'flex-end' : 'flex-start'
                                    }}
                                >
                                    <div
                                        style={{
                                            maxWidth: '85%',
                                            padding: '12px 16px',
                                            borderRadius: m.sender === 'user'
                                                ? (isRTL ? '18px 4px 18px 18px' : '18px 18px 4px 18px')
                                                : (isRTL ? '4px 18px 18px 18px' : '18px 18px 18px 4px'),
                                            background: m.sender === 'user'
                                                ? 'var(--color-gradient)'
                                                : 'var(--color-bg-card)',
                                            color: m.sender === 'user' ? 'white' : 'var(--color-text-primary)',
                                            border: m.sender === 'user' ? 'none' : '1px solid var(--color-border)',
                                            fontSize: '0.88rem',
                                            lineHeight: 1.5,
                                            boxShadow: 'var(--shadow-sm)'
                                        }}
                                    >
                                        {m.text}

                                        {m.actionLink && (
                                            <div style={{ marginTop: 10 }}>
                                                <button
                                                    onClick={() => handleActionClick(m.actionLink!.targetId)}
                                                    style={{
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: 6,
                                                        padding: '6px 12px',
                                                        borderRadius: '8px',
                                                        background: 'rgba(108, 92, 231, 0.2)',
                                                        border: '1px solid rgba(108, 92, 231, 0.4)',
                                                        color: 'var(--color-accent-3)',
                                                        fontSize: '0.78rem',
                                                        fontWeight: 700,
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    {m.actionLink.label}
                                                    <ChevronRight size={14} style={{ transform: isRTL ? 'rotate(180deg)' : 'none' }} />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <span
                                        style={{
                                            fontSize: '0.7rem',
                                            color: 'var(--color-text-muted)',
                                            marginTop: 4,
                                            padding: '0 6px'
                                        }}
                                    >
                                        {m.timestamp}
                                    </span>
                                </div>
                            ))}

                            {isTyping && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px' }}>
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#6c5ce7', animation: 'pulse 1s infinite' }} />
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#a855f7', animation: 'pulse 1s infinite 0.2s' }} />
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3b82f6', animation: 'pulse 1s infinite 0.4s' }} />
                                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                        {language === 'ar' ? 'المساعد الذكي يكتب...' : 'Assistant is typing...'}
                                    </span>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Footer */}
                        <div
                            style={{
                                padding: '14px 16px',
                                background: 'var(--color-bg-primary)',
                                borderTop: '1px solid var(--color-border)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10
                            }}
                        >
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder={trans.aiWidget.placeholder}
                                style={{
                                    flex: 1,
                                    padding: '12px 16px',
                                    background: 'var(--color-bg-input)',
                                    border: '1px solid var(--color-border)',
                                    borderRadius: '14px',
                                    color: 'var(--color-text-primary)',
                                    fontSize: '0.9rem',
                                    outline: 'none'
                                }}
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleSend()}
                                disabled={!inputText.trim()}
                                style={{
                                    width: 44,
                                    height: 44,
                                    borderRadius: '14px',
                                    background: inputText.trim() ? 'var(--color-gradient)' : 'var(--color-bg-card)',
                                    color: inputText.trim() ? 'white' : 'var(--color-text-muted)',
                                    border: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: inputText.trim() ? 'pointer' : 'default',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <Send size={18} style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
