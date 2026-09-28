import { create } from 'zustand';

type Theme = 'light' | 'dark';

interface ThemeState {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

// Helper to get initial theme - defaults to dark
const getInitialTheme = (): Theme => {
    if (typeof window !== 'undefined' && window.location.search.includes('dark=1')) {
        return 'dark';
    }
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) return savedTheme;
    return 'dark';
};

export const useThemeStore = create<ThemeState>((set) => ({
    theme: getInitialTheme(),

    toggleTheme: () => set((state) => {
        const newTheme = state.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        return { theme: newTheme };
    }),

    setTheme: (theme) => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
        set({ theme });
    }
}));

// Initialize theme on load
const initialTheme = getInitialTheme();
document.documentElement.setAttribute('data-theme', initialTheme);
