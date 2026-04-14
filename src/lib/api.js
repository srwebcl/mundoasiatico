/**
 * Cliente HTTP centralizado para la API de Mundo Asiático.
 *
 * Uso:
 *   import api from '@/lib/api';
 *   const products = await api.getProducts({ category: 'filtros', page: 1 });
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// ── Utilidad base ──────────────────────────────────────────────────────────

async function request(endpoint, options = {}) {
    const token = typeof window !== 'undefined'
        ? localStorage.getItem('ma_token')
        : null;

    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
    };

    const res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({ message: 'Error desconocido' }));
        throw new Error(error.message || `HTTP ${res.status}`);
    }

    return res.json();
}

// ── Catálogo ───────────────────────────────────────────────────────────────

/**
 * GET /api/products
 * @param {Object} params - { category, brand, car_model, price_min, price_max, search, sort, page }
 */
async function getProducts(params = {}) {
    const qs = new URLSearchParams(
        Object.entries(params).filter(([, v]) => v !== undefined && v !== '' && v !== 'all')
    ).toString();

    return request(`/products${qs ? `?${qs}` : ''}`);
}

/**
 * GET /api/products/:slug
 */
async function getProduct(slug) {
    return request(`/products/${slug}`);
}

/**
 * GET /api/categories
 */
async function getCategories() {
    return request('/categories');
}

/**
 * GET /api/brands  (incluye carModels anidados)
 */
async function getBrands() {
    return request('/brands');
}

// ── Auth ───────────────────────────────────────────────────────────────────

/**
 * POST /api/auth/register
 */
async function register(data) {
    return request('/auth/register', { method: 'POST', body: JSON.stringify(data) });
}

/**
 * POST /api/auth/login
 * Guarda el token en localStorage automáticamente.
 */
async function login(email, password) {
    const res = await request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
    if (res.token && typeof window !== 'undefined') {
        localStorage.setItem('ma_token', res.token);
        localStorage.setItem('ma_user', JSON.stringify(res.user));
    }
    return res;
}

/**
 * POST /api/auth/logout
 */
async function logout() {
    await request('/auth/logout', { method: 'POST' }).catch(() => {});
    if (typeof window !== 'undefined') {
        localStorage.removeItem('ma_token');
        localStorage.removeItem('ma_user');
    }
}

/**
 * GET /api/auth/me
 */
async function getMe() {
    return request('/auth/me');
}

// ── Checkout ───────────────────────────────────────────────────────────────

/**
 * POST /api/checkout/init
 * Inicia el pago con Transbank y devuelve { webpay_url, webpay_token, order_id }
 */
async function checkoutInit(payload) {
    return request('/checkout/init', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}

/**
 * GET /api/orders/:id
 */
async function getOrder(id) {
    return request(`/orders/${id}`);
}

// ── Helpers de usuario local ───────────────────────────────────────────────

function getLocalUser() {
    if (typeof window === 'undefined') return null;
    try {
        return JSON.parse(localStorage.getItem('ma_user'));
    } catch {
        return null;
    }
}

function isLoggedIn() {
    return !!getLocalUser();
}

function isWholesale() {
    return getLocalUser()?.is_wholesale === true;
}

// ── Export ─────────────────────────────────────────────────────────────────

const api = {
    // Catálogo
    getProducts,
    getProduct,
    getCategories,
    getBrands,
    // Auth
    register,
    login,
    logout,
    getMe,
    // Checkout
    checkoutInit,
    getOrder,
    // Helpers
    getLocalUser,
    isLoggedIn,
    isWholesale,
};

export default api;
