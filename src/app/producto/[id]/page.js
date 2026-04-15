'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import {
    ShoppingCart, Heart, Share2, CheckCircle, XCircle,
    Truck, ShieldCheck, ChevronRight, ArrowLeft, Loader2
} from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/api';

// ─── Skeleton ───────────────────────────────────────────────────────────────
const Skeleton = ({ className }) => (
    <div className={`bg-zinc-200 animate-pulse rounded ${className}`} />
);

export default function ProductPage() {
    const params                                     = useParams();
    const { addToCart, isWholesale, getProductPrice } = useShop();

    const [product,  setProduct]  = useState(null);
    const [related,  setRelated]  = useState([]);
    const [loading,  setLoading]  = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [qty,      setQty]      = useState(1);
    const [added,    setAdded]    = useState(false);  // feedback visual

    // ── Fetch del producto por slug ──────────────────────────────────────────
    useEffect(() => {
        const slug = params.id;
        if (!slug) return;

        setLoading(true);
        setNotFound(false);

        api.getProduct(slug)
            .then(res => {
                setProduct(res.data);

                // Productos relacionados: misma categoría, diferente producto
                return api.getProducts({
                    category: res.data.category?.slug,
                    page: 1,
                });
            })
            .then(res => {
                const others = (res.data ?? []).filter(p => p.id !== product?.id).slice(0, 4);
                setRelated(others);
            })
            .catch(err => {
                console.error('Error cargando producto:', err);
                setNotFound(true);
            })
            .finally(() => setLoading(false));
    }, [params.id]);

    // ── Corrige race condition en related ────────────────────────────────────
    // (el closure captura product antes de setearlo — usamos un segundo effect limpio)
    useEffect(() => {
        if (!product) return;
        api.getProducts({ category: product.category?.slug, page: 1 })
            .then(res => {
                setRelated((res.data ?? []).filter(p => p.id !== product.id).slice(0, 4));
            })
            .catch(() => {});
    }, [product?.id]);

    // ── Agregar al carrito ───────────────────────────────────────────────────
    const handleAddToCart = () => {
        if (!product || !product.in_stock) return;
        // Añadir `qty` veces respetando la lógica del contexto
        for (let i = 0; i < qty; i++) addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    // ── Estados de carga y error ─────────────────────────────────────────────
    if (loading) return (
        <div className="bg-white min-h-screen pb-20">
            <div className="bg-zinc-50 border-b border-zinc-100 py-4">
                <div className="container mx-auto px-4">
                    <Skeleton className="h-4 w-64" />
                </div>
            </div>
            <main className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <Skeleton className="aspect-square rounded-2xl" />
                    <div className="space-y-4">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-3/4" />
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-12 w-48 mt-6" />
                        <Skeleton className="h-20 w-full mt-4" />
                        <Skeleton className="h-14 w-full rounded-full mt-6" />
                    </div>
                </div>
            </main>
        </div>
    );

    if (notFound || !product) return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-white px-4">
            <div className="text-center">
                <div className="text-7xl mb-4">🔧</div>
                <h1 className="text-3xl font-black text-zinc-900 mb-2">Producto no encontrado</h1>
                <p className="text-zinc-500 mb-6">
                    El repuesto que buscas no existe o fue dado de baja del catálogo.
                </p>
                <Link
                    href="/catalogo"
                    className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition-colors"
                >
                    <ArrowLeft size={18} /> Volver al catálogo
                </Link>
            </div>
        </div>
    );

    const price        = getProductPrice(product);
    const categoryName = product.category?.name    ?? '—';
    const categorySlug = product.category?.slug    ?? '';
    const brandName    = product.brand?.name       ?? null;
    const brandSlug    = product.brand?.slug       ?? null;

    // Icono emoji de fallback por categoría
    const categoryIcon = {
        encendido: '⚡', filtros: '🔩', inyeccion: '💉', frenos: '🛑', sensores: '📡'
    }[categorySlug] ?? '🔧';

    return (
        <div className="bg-white min-h-screen pb-20 font-sans">

            {/* ── Breadcrumb ──────────────────────────────────────────────── */}
            <div className="bg-zinc-50 border-b border-zinc-100 py-4">
                <div className="container mx-auto px-4 text-sm text-zinc-500 flex items-center gap-2 flex-wrap">
                    <Link href="/" className="hover:text-red-600">Inicio</Link>
                    <ChevronRight size={14} />
                    <Link href="/catalogo" className="hover:text-red-600">Catálogo</Link>
                    {categoryName && (
                        <>
                            <ChevronRight size={14} />
                            <Link href={`/catalogo?categoria=${categorySlug}`} className="hover:text-red-600">
                                {categoryName}
                            </Link>
                        </>
                    )}
                    <ChevronRight size={14} />
                    <span className="text-zinc-900 font-medium truncate max-w-[200px]">{product.name}</span>
                </div>
            </div>

            <main className="container mx-auto px-4 py-8 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">

                    {/* ── Imagen ──────────────────────────────────────────── */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-zinc-100 rounded-2xl flex items-center justify-center shadow-inner border border-zinc-200 overflow-hidden relative">
                            {product.image
                                ? <img src={product.image} alt={product.name} className="w-full h-full object-contain p-8" />
                                : <span className="text-9xl opacity-40">{categoryIcon}</span>
                            }
                            {/* Badge de stock */}
                            <div className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full ${product.in_stock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {product.in_stock ? `✓ En stock (${product.stock} uds.)` : '✗ Sin stock'}
                            </div>
                        </div>

                        {/* Miniaturas decorativas */}
                        <div className="grid grid-cols-4 gap-3">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className={`aspect-square bg-zinc-50 rounded-lg border flex items-center justify-center text-2xl cursor-pointer transition-colors ${i === 1 ? 'border-red-600 bg-red-50' : 'border-zinc-200 hover:border-zinc-400'}`}>
                                    <span className="opacity-30">{categoryIcon}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Info del producto ────────────────────────────────── */}
                    <div className="flex flex-col">

                        {/* Marca y categoría */}
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                            {brandName && (
                                <Link href={`/catalogo?marca=${brandSlug}`} className="text-sm font-bold text-red-600 uppercase tracking-wider hover:underline">
                                    {brandName}
                                </Link>
                            )}
                            {brandName && <span className="text-zinc-300">•</span>}
                            <Link href={`/catalogo?categoria=${categorySlug}`} className="text-sm text-zinc-500 hover:text-red-600">
                                {categoryIcon} {categoryName}
                            </Link>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-black text-zinc-900 leading-tight mb-2 italic">
                            {product.name}
                        </h1>

                        <div className="flex items-center gap-3 text-sm text-zinc-500 mb-6 flex-wrap">
                            <span className="bg-zinc-100 px-2 py-1 rounded font-mono text-xs">SKU: {product.sku}</span>
                            <span className="flex items-center gap-1">
                                {product.in_stock
                                    ? <><CheckCircle size={14} className="text-green-500" /> Disponible</>
                                    : <><XCircle size={14} className="text-red-400" /> Sin stock</>
                                }
                            </span>
                        </div>

                        {/* Precio */}
                        <div className="border-t border-b border-zinc-100 py-6 mb-8 space-y-4">
                            <div className="flex items-baseline gap-4 flex-wrap">
                                {isWholesale && product.regular_price !== price && (
                                    <span className="text-lg text-zinc-400 line-through">${product.regular_price?.toLocaleString()}</span>
                                )}
                                <span className="text-5xl font-black text-zinc-900">${price.toLocaleString()}</span>
                                {isWholesale && (
                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded font-bold uppercase">
                                        Precio Mayorista
                                    </span>
                                )}
                            </div>

                            <p className="text-zinc-600 leading-relaxed">
                                {product.description || `Repuesto certificado compatible con múltiples modelos. Garantizamos calidad y compatibilidad.`}
                            </p>
                        </div>

                        {/* Controles de compra */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            {/* Selector de cantidad */}
                            <div className="flex items-center border border-zinc-300 rounded-full w-fit">
                                <button
                                    onClick={() => setQty(q => Math.max(1, q - 1))}
                                    className="px-4 py-3 hover:bg-zinc-100 rounded-l-full transition-colors font-bold"
                                >−</button>
                                <span className="w-12 text-center font-bold text-lg">{qty}</span>
                                <button
                                    onClick={() => setQty(q => Math.min(product.stock || 99, q + 1))}
                                    disabled={!product.in_stock}
                                    className="px-4 py-3 hover:bg-zinc-100 rounded-r-full transition-colors font-bold disabled:opacity-40"
                                >+</button>
                            </div>

                            {/* Botón agregar */}
                            <button
                                onClick={handleAddToCart}
                                disabled={!product.in_stock}
                                className={`flex-1 px-8 py-3 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg ${
                                    product.in_stock
                                        ? added
                                            ? 'bg-green-600 text-white shadow-green-900/20'
                                            : 'bg-red-600 text-white hover:bg-red-700 shadow-red-900/20'
                                        : 'bg-zinc-200 text-zinc-400 cursor-not-allowed shadow-none'
                                }`}
                            >
                                {added
                                    ? <><CheckCircle size={20} /> ¡AGREGADO!</>
                                    : <><ShoppingCart size={20} /> {product.in_stock ? 'AGREGAR AL CARRO' : 'SIN STOCK'}</>
                                }
                            </button>

                            <button className="p-3 rounded-full border border-zinc-300 text-zinc-500 hover:text-red-600 hover:border-red-600 transition-colors">
                                <Heart size={24} />
                            </button>
                        </div>

                        {/* Garantías / envío */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-zinc-600">
                            <div className="flex items-center gap-3 p-3 bg-zinc-50 rounded-lg">
                                <Truck className="text-zinc-800 shrink-0" size={20} />
                                <div>
                                    <span className="font-bold block text-zinc-900">Despacho a todo Chile</span>
                                    <span className="text-xs">Starken, Chilexpress, BlueExpress</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-zinc-50 rounded-lg">
                                <ShieldCheck className="text-zinc-800 shrink-0" size={20} />
                                <div>
                                    <span className="font-bold block text-zinc-900">Garantía de 3 meses</span>
                                    <span className="text-xs">Cobertura por fallas de fábrica</span>
                                </div>
                            </div>
                        </div>

                        {/* Modelos compatibles */}
                        {product.compatible_models?.length > 0 && (
                            <div className="mt-8 p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                                <h3 className="font-bold text-zinc-900 mb-3 text-sm uppercase tracking-wider">
                                    🚗 Vehículos Compatibles
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {product.compatible_models.map(m => (
                                        <span key={m.id} className="text-xs bg-white border border-zinc-200 rounded-full px-3 py-1 font-medium text-zinc-700">
                                            {m.brand?.name} {m.name}
                                            {m.year_start && ` (${m.year_start}${m.year_end ? `–${m.year_end}` : '+'})`}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Productos Relacionados ───────────────────────────────────── */}
                {related.length > 0 && (
                    <div className="mt-20 border-t border-zinc-100 pt-12">
                        <h2 className="text-2xl font-bold mb-8 italic">TAMBIÉN TE PUEDE INTERESAR</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {related.map(rel => {
                                const relPrice = getProductPrice(rel);
                                return (
                                    <Link
                                        key={rel.id}
                                        href={`/producto/${rel.slug}`}
                                        className="group block bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-lg transition-all"
                                    >
                                        <div className="aspect-[4/3] bg-zinc-100 flex items-center justify-center text-4xl group-hover:scale-105 transition-transform duration-500 overflow-hidden">
                                            {rel.image
                                                ? <img src={rel.image} alt={rel.name} className="w-full h-full object-contain p-2" />
                                                : <span className="opacity-30">{categoryIcon}</span>
                                            }
                                        </div>
                                        <div className="p-4">
                                            <div className="text-[10px] font-bold text-zinc-400 uppercase mb-1">
                                                {rel.brand?.name ?? rel.category?.name}
                                            </div>
                                            <h3 className="font-bold text-zinc-900 leading-tight mb-2 truncate text-sm">{rel.name}</h3>
                                            <div className="font-bold text-red-600">${relPrice.toLocaleString()}</div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
