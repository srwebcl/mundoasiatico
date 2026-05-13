/**
 * robots.js — Archivo robots.txt dinámico de Next.js
 * Controla cómo Google y otros bots rastrean el sitio.
 */

export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',
                    '/admin/',
                    '/checkout/',
                    '/exito/',
                    '/mi-cuenta/',
                    '/reset-password/',
                    '/_next/',
                ],
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
                disallow: [
                    '/api/',
                    '/admin/',
                    '/checkout/',
                    '/exito/',
                    '/mi-cuenta/',
                ],
            },
        ],
        sitemap: 'https://mundoasiatico.cl/sitemap.xml',
        host: 'https://mundoasiatico.cl',
    };
}
