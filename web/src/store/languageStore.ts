import { create } from 'zustand';

export type Language = 'ar' | 'en';

interface LanguageState {
    language: Language;
    toggleLanguage: () => void;
    setLanguage: (lang: Language) => void;
    isRTL: boolean;
}

const getInitialLanguage = (): Language => {
    const saved = localStorage.getItem('club_language') as Language;
    if (saved === 'en' || saved === 'ar') return saved;
    // Default to Arabic for the Egyptian Youth Center
    return 'ar';
};

const applyLanguageToDOM = (lang: Language) => {
    const isRtl = lang === 'ar';
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    if (isRtl) {
        document.body.classList.add('lang-ar');
        document.body.classList.remove('lang-en');
    } else {
        document.body.classList.add('lang-en');
        document.body.classList.remove('lang-ar');
    }
};

const initial = getInitialLanguage();
applyLanguageToDOM(initial);

export const useLanguageStore = create<LanguageState>((set) => ({
    language: initial,
    isRTL: initial === 'ar',

    toggleLanguage: () => set((state) => {
        const nextLang = state.language === 'ar' ? 'en' : 'ar';
        localStorage.setItem('club_language', nextLang);
        applyLanguageToDOM(nextLang);
        return { language: nextLang, isRTL: nextLang === 'ar' };
    }),

    setLanguage: (lang: Language) => {
        localStorage.setItem('club_language', lang);
        applyLanguageToDOM(lang);
        set({ language: lang, isRTL: lang === 'ar' });
    }
}));
