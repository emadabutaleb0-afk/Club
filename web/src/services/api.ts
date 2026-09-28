import { mockData } from './mockData';

const API_BASE = '/api';

async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
    const token = localStorage.getItem('accessToken');

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    // Mock API for static demo deployment
    if (token === 'demo-token') {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 600));

        console.log(`[MOCK API] ${options.method || 'GET'} ${url}`);

        // Auth Mocks
        if (url === '/members/me') return { data: mockData.user } as any;

        // Dashboard Mocks
        if (url === '/dashboard/stats') return { data: mockData.dashboardStats } as any;

        // Booking Mocks
        if (url.startsWith('/bookings')) {
            if (options.method === 'POST') {
                const body = JSON.parse(options.body as string);
                const newBooking = {
                    id: `b-${Date.now()}`,
                    ...body,
                    user_name: 'You (Demo User)',
                    status: 'confirmed'
                };
                return { data: newBooking } as any;
            }
            return { data: mockData.bookings } as any;
        }

        // Facility Mocks
        if (url.startsWith('/facilities')) return { data: mockData.facilities } as any;

        // Member Mocks
        if (url.startsWith('/members')) return { data: mockData.members } as any;

        // Payment Mocks
        if (url.startsWith('/payments')) return { data: mockData.payments } as any;

        // News & Events Mocks
        if (url.startsWith('/news')) return { data: mockData.news } as any;
        if (url.startsWith('/events')) return { data: mockData.events } as any;

        // Default empty response for unknown endpoints to prevent crashes
        console.warn(`[MOCK API] No mock data found for ${url}`);
        return { data: [] } as any;
    }

    const response = await fetch(`${API_BASE}${url}`, { ...options, headers });

    if (response.status === 401) {
        // Try refresh token
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
            try {
                const refreshRes = await fetch(`${API_BASE}/auth/refresh`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ refreshToken }),
                });
                if (refreshRes.ok) {
                    const data = await refreshRes.json();
                    localStorage.setItem('accessToken', data.data.accessToken);
                    localStorage.setItem('refreshToken', data.data.refreshToken);
                    headers['Authorization'] = `Bearer ${data.data.accessToken}`;
                    const retryRes = await fetch(`${API_BASE}${url}`, { ...options, headers });
                    return retryRes.json();
                }
            } catch {
                // Fall through to error
            }
        }
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
    }

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Request failed: ${response.status}`);
    }

    return response.json();
}

export const api = {
    get: <T>(url: string) => request<T>(url),
    post: <T>(url: string, data?: any) => request<T>(url, { method: 'POST', body: JSON.stringify(data) }),
    put: <T>(url: string, data?: any) => request<T>(url, { method: 'PUT', body: JSON.stringify(data) }),
    delete: <T>(url: string) => request<T>(url, { method: 'DELETE' }),
};

export default api;
