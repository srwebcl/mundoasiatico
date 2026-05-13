/**
 * sitemap.js — Sitemap Dinámico de Mundo Asiático
 * Genera automáticamente las URLs de todos los productos y marcas.
 * Google reindexará el sitio completo con cada build.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const DOMAIN  = 'https://mundoasiatico.cl';

// Páginas estáticas del sitio
const staticPages = [
    { url: '/',          priority: 1.0, changeFrequency: 'daily'   },
    { url: '/catalogo',  priority: 0.9, changeFrequency: 'hourly'  },
    { url: '/contacto',  priority: 0.7, changeFrequency: 'monthly' },
    { url: '/marcas',    priority: 0.8, changeFrequency: 'weekly'  },
];

export default async function sitemap() {
    const now = new Date();

    // ── Páginas estáticas ────────────────────────────────────────────────────
    const staticRoutes = staticPages.map(({ url, priority, changeFrequency }) => ({
        url: `${DOMAIN}${url}`,
        lastModified: now,
        changeFrequency,
        priority,
    }));

    // ── Productos (dinámicos) ────────────────────────────────────────────────
    let productRoutes = [];
    try {
        let page = 1;
        let hasMore = true;
        const allProducts = [];

        while (hasMore) {
            const res = await fetch(`${API_URL}/products?page=${page}&per_page=100`, {
                next: { revalidate: 3600 }, // Revalidar cada hora
            });
            if (!res.ok) break;
            const json = await res.json();
            const products = json.data ?? [];
            allProducts.push(...products);
            hasMore = products.length === 100;
            page++;
        }

        productRoutes = allProducts.map((product) => ({
            url: `${DOMAIN}/producto/${product.slug}`,
            lastModified: product.updated_at ? new Date(product.updated_at) : now,
            changeFrequency: 'weekly',
            priority: 0.8,
        }));
    } catch (err) {
        console.error('[Sitemap] No se pudieron cargar productos:', err.message);
    }

    // ── Marcas (dinámicas) ───────────────────────────────────────────────────
    let brandRoutes = [];
    try {
        const res = await fetch(`${API_URL}/brands`, {
            next: { revalidate: 86400 }, // Revalidar cada día
        });
        if (res.ok) {
            const json = await res.json();
            const brands = json.data ?? [];
            brandRoutes = brands.map((brand) => ({
                url: `${DOMAIN}/catalogo?marca=${brand.slug}`,
                lastModified: now,
                changeFrequency: 'weekly',
                priority: 0.7,
            }));
        }
    // ── Categorías (dinámicas) ──────────────────────────────────────────────
    let categoryRoutes = [];
    try {
        const res = await fetch(`${API_URL}/categories`, {
            next: { revalidate: 86400 },
        });
        if (res.ok) {
            const json = await res.json();
            const categories = json.data ?? [];
            categoryRoutes = categories.map((cat) => ({
                url: `${DOMAIN}/catalogo?categoria=${cat.slug}`,
                lastModified: now,
                changeFrequency: 'weekly',
                priority: 0.7,
            }));
        }
    } catch (err) {
        console.error('[Sitemap] No se pudieron cargar categorías:', err.message);
    }

    return [...staticRoutes, ...productRoutes, ...brandRoutes, ...categoryRoutes];
}
