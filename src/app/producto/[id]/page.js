/**
 * Wrapper Server Component para la página de producto.
 * Permite generar metadata SEO dinámica por producto
 * mientras el componente de UI sigue siendo 'use client'.
 */

import ProductPageClient from './ProductPageClient';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const DOMAIN  = 'https://mundoasiatico.cl';

// ─── Metadata dinámica por producto ──────────────────────────────────────────
export async function generateMetadata({ params }) {
    const { id: slug } = await params;

    try {
        const res = await fetch(`${API_URL}/products/${slug}`, {
            next: { revalidate: 3600 },
        });
        if (!res.ok) throw new Error('Not found');
        const json = await res.json();
        const product = json.data;

        const title     = `${product.name} | Repuestos Mundo Asiático`;
        const brand     = product.brand?.name ?? 'Vehículos Asiáticos';
        const category  = product.category?.name ?? 'Repuestos';
        const price     = product.regular_price
            ? `$${Number(product.regular_price).toLocaleString('es-CL')}`
            : null;

        const description = product.description
            ? product.description.substring(0, 155)
            : `${product.name} para ${brand}. Repuesto de calidad en Mundo Asiático, Chile. ${price ? 'Precio: ' + price + ' CLP.' : ''} SKU: ${product.sku ?? ''}.`;

        const image = product.image ?? product.gallery?.[0] ?? `${DOMAIN}/og-image.jpg`;

        // Schema.org para el producto (Rich Results en Google)
        const productSchema = {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            sku: product.sku,
            description: description,
            image: [image],
            brand: {
                '@type': 'Brand',
                name: brand,
            },
            category: category,
            offers: {
                '@type': 'Offer',
                url: `${DOMAIN}/producto/${slug}`,
                priceCurrency: 'CLP',
                price: product.regular_price,
                availability: product.stock > 0
                    ? 'https://schema.org/InStock'
                    : 'https://schema.org/OutOfStock',
                seller: {
                    '@type': 'Organization',
                    name: 'Mundo Asiático',
                },
            },
        };

        return {
            title,
            description,
            keywords: [
                product.name,
                brand,
                category,
                `repuesto ${brand} Chile`,
                `${product.name} precio Chile`,
                `${category} ${brand}`,
                product.sku,
            ].filter(Boolean),
            openGraph: {
                title,
                description,
                url: `${DOMAIN}/producto/${slug}`,
                type: 'website',
                images: [
                    {
                        url: image,
                        width: 800,
                        height: 800,
                        alt: product.name,
                    },
                ],
            },
            twitter: {
                card: 'summary_large_image',
                title,
                description,
                images: [image],
            },
            alternates: {
                canonical: `${DOMAIN}/producto/${slug}`,
            },
            other: {
                'product:price:amount': product.regular_price,
                'product:price:currency': 'CLP',
            },
            // Inyectar JSON-LD del producto
            script: [
                {
                    type: 'application/ld+json',
                    children: JSON.stringify(productSchema),
                },
            ],
        };
    } catch {
        return {
            title: 'Repuesto no encontrado | Mundo Asiático',
            description: 'Este repuesto no se encuentra disponible. Visita nuestro catálogo para ver todos los repuestos disponibles.',
        };
    }
}

// ─── Página ───────────────────────────────────────────────────────────────────
export default async function ProductPage({ params }) {
    const resolvedParams = await params;
    return <ProductPageClient params={resolvedParams} />;
}
