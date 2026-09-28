import { create } from 'zustand';
import api from '../services/api';

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    roles?: { clubId: string; clubName: string; role: string }[];
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (data: { email: string; password: string; firstName: string; lastName: string }) => Promise<void>;
    demoLogin: () => void;
    logout: () => void;
    clearError: () => void;
    loadUser: () => Promise<void>;
}

const DEMO_USER: User = {
    id: 'demo-001',
    email: 'admin@clubhub.demo',
    firstName: 'Alex',
    lastName: 'Rivera',
    roles: [{ clubId: 'club-001', clubName: 'Riverside Sports Club', role: 'super_admin' }],
};

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: !!localStorage.getItem('accessToken'),
    isLoading: false,
    error: null,

    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const res: any = await api.post('/auth/login', { email, password });
            localStorage.setItem('accessToken', res.data.accessToken);
            localStorage.setItem('refreshToken', res.data.refreshToken);
            set({ user: res.data.user, isAuthenticated: true, isLoading: false });
        } catch (err: any) {
            set({ error: err.message, isLoading: false });
        }
    },

    register: async (data) => {
        set({ isLoading: true, error: null });
        try {
            const res: any = await api.post('/auth/register', data);
            localStorage.setItem('accessToken', res.data.accessToken);
            localStorage.setItem('refreshToken', res.data.refreshToken);
            set({ user: res.data.user, isAuthenticated: true, isLoading: false });
        } catch (err: any) {
            set({ error: err.message, isLoading: false });
        }
    },

    logout: () => {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
            api.post('/auth/logout', { refreshToken }).catch(() => { });
        }
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        set({ user: null, isAuthenticated: false });
    },

    demoLogin: () => {
        localStorage.setItem('accessToken', 'demo-token');
        localStorage.setItem('refreshToken', 'demo-refresh');
        set({ user: DEMO_USER, isAuthenticated: true, isLoading: false, error: null });
    },

    clearError: () => set({ error: null }),

    loadUser: async () => {
        try {
            const res: any = await api.get('/members/me');
            set({ user: res.data, isAuthenticated: true });
        } catch {
            set({ isAuthenticated: false, user: null });
        }
    },
}));
