'use client';
import React, { useState, useEffect } from 'react';
import { useShop } from '@/context/ShopContext';
import {
    ShoppingCart, Share2, CheckCircle, XCircle,
    Truck, ShieldCheck, ChevronRight, ArrowLeft, Loader2
} from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/api';

// ─── Skeleton ───────────────────────────────────────────────────────────────
const Skeleton = ({ className }) => (
    <div className={`bg-zinc-200 animate-pulse rounded ${className}`} />
);

export default function ProductPageClient({ params }) {
    const { addToCart, isWholesale, getProductPrice } = useShop();
    const slug = params?.id;

    const [product,  setProduct]  = useState(null);
    const [related,  setRelated]  = useState([]);
    const [loading,  setLoading]  = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [qty,      setQty]      = useState(1);
    const [added,    setAdded]    = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // ── Fetch del producto por slug ──────────────────────────────────────────
    useEffect(() => {
        if (!slug) return;
        setLoading(true);
        setNotFound(false);

        api.getProduct(slug)
            .then(res => {
                setProduct(res.data);
                return api.getProducts({ category: res.data.category?.slug, page: 1 });
            })
            .then(res => {
                setRelated((res.data ?? []).filter(p => p.slug !== slug).slice(0, 4));
            })
            .catch(() => setNotFound(true))
            .finally(() => setLoading(false));
    }, [slug]);

    const handleAddToCart = () => {
        if (!product) return;
        for (let i = 0; i < qty; i++) addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    const handleShare = async () => {
        try {
            await navigator.share({ title: product?.name, url: window.location.href });
        } catch {
            navigator.clipboard?.writeText(window.location.href);
        }
    };

    // ── Loading ───────────────────────────────────────────────────────────────
    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-50 py-10">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <Skeleton className="aspect-square w-full" />
                        <div className="space-y-4">
                            <Skeleton className="h-8 w-3/4" />
                            <Skeleton className="h-5 w-1/3" />
                            <Skeleton className="h-12 w-1/2" />
                            <Skeleton className="h-24 w-full" />
                            <Skeleton className="h-12 w-full" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ── Not Found ─────────────────────────────────────────────────────────────
    if (notFound || !product) {
        return (
            <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center py-20 px-4">
                <XCircle size={64} className="text-red-400 mb-4" />
                <h1 className="text-2xl font-black text-zinc-800 mb-2">Repuesto no encontrado</h1>
                <p className="text-zinc-500 mb-6 text-center">Este repuesto ya no está disponible o el enlace es incorrecto.</p>
                <Link href="/catalogo" className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition-colors">
                    Ver Catálogo Completo
                </Link>
            </div>
        );
    }

    const price  = getProductPrice ? getProductPrice(product) : product.regular_price;
    const images = [product.image, ...(product.gallery || [])].filter(Boolean);

    return (
        <div className="min-h-screen bg-zinc-50 py-6 md:py-10">
            <div className="container mx-auto px-4 max-w-5xl">

                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
                    <Link href="/" className="hover:text-red-600">Inicio</Link>
                    <ChevronRight size={12} />
                    <Link href="/catalogo" className="hover:text-red-600">Catálogo</Link>
                    {product.category && (
                        <>
                            <ChevronRight size={12} />
                            <Link href={`/catalogo?categoria=${product.category.slug}`} className="hover:text-red-600">
                                {product.category.name}
                            </Link>
                        </>
                    )}
                    <ChevronRight size={12} />
                    <span className="text-zinc-800 font-medium truncate max-w-[200px]">{product.name}</span>
                </nav>

                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">

                    {/* ── Galería ─────────────────────────────────────────── */}
                    <div>
                        <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden aspect-square flex items-center justify-center mb-3">
                            {images.length > 0 ? (
                                <img
                                    src={images[currentImageIndex]}
                                    alt={product.name}
                                    className="w-full h-full object-contain p-6"
                                />
                            ) : (
                                <span className="text-8xl">🔧</span>
                            )}
                        </div>
                        {images.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                {images.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentImageIndex(i)}
                                        className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden transition-all ${i === currentImageIndex ? 'border-red-600' : 'border-zinc-200'}`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-contain p-1" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ── Info del producto ────────────────────────────────── */}
                    <div className="flex flex-col justify-between">
                        <div>
                            {/* Brand & Category */}
                            <div className="flex items-center gap-2 mb-2">
                                {product.brand?.name && (
                                    <span className="bg-zinc-100 text-zinc-600 text-xs font-bold px-2 py-1 rounded-full">
                                        {product.brand.name}
                                    </span>
                                )}
                                {product.category?.name && (
                                    <span className="bg-red-50 text-red-700 text-xs font-bold px-2 py-1 rounded-full">
                                        {product.category.name}
                                    </span>
                                )}
                            </div>

                            <h1 className="text-2xl md:text-3xl font-black text-zinc-900 mb-1 leading-tight">
                                {product.name}
                            </h1>
                            <p className="text-xs text-zinc-400 font-mono mb-4">SKU: {product.sku}</p>

                            {/* Precio */}
                            <div className="mb-6">
                                {isWholesale && product.regular_price !== price && (
                                    <div className="text-sm text-zinc-400 line-through mb-1">
                                        ${Number(product.regular_price).toLocaleString('es-CL')}
                                    </div>
                                )}
                                <div className="text-4xl font-black text-red-600">
                                    ${Number(price).toLocaleString('es-CL')}
                                    <span className="text-lg font-medium text-zinc-400 ml-2">CLP</span>
                                </div>
                                {isWholesale && (
                                    <span className="text-xs text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded-full">
                                        Precio Mayorista
                                    </span>
                                )}
                            </div>

                            {/* Stock */}
                            <div className="flex items-center gap-2 mb-6">
                                {product.in_stock || product.stock > 0 ? (
                                    <>
                                        <CheckCircle size={16} className="text-green-500" />
                                        <span className="text-sm font-semibold text-green-700">
                                            {product.stock ? `${product.stock} unidades disponibles` : 'En stock'}
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <XCircle size={16} className="text-red-400" />
                                        <span className="text-sm font-semibold text-red-600">Sin stock disponible</span>
                                    </>
                                )}
                            </div>

                            {/* Descripción */}
                            {product.description && (
                                <div
                                    className="text-zinc-600 text-sm leading-relaxed mb-6 border-t border-zinc-100 pt-4 prose prose-sm max-w-none"
                                    dangerouslySetInnerHTML={{ __html: product.description }}
                                />
                            )}
                        </div>

                        {/* Acciones */}
                        <div>
                            {/* Cantidad */}
                            {(product.in_stock || product.stock > 0) && (
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-sm font-medium text-zinc-600">Cantidad:</span>
                                    <div className="flex items-center border border-zinc-200 rounded-xl overflow-hidden">
                                        <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 text-zinc-500 hover:bg-zinc-100 transition-colors font-bold">−</button>
                                        <span className="px-4 py-2 font-bold text-zinc-900">{qty}</span>
                                        <button onClick={() => setQty(qty + 1)} className="px-3 py-2 text-zinc-500 hover:bg-zinc-100 transition-colors font-bold">+</button>
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-3 mb-4">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={!product.in_stock && !product.stock}
                                    className={`flex-1 py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all shadow-lg
                                        ${added
                                            ? 'bg-green-600 shadow-green-200'
                                            : 'bg-red-600 hover:bg-red-700 shadow-red-100 hover:-translate-y-0.5'
                                        }
                                        disabled:bg-zinc-300 disabled:cursor-not-allowed disabled:shadow-none`}
                                >
                                    {added ? <><CheckCircle size={20} /> ¡Agregado!</> : <><ShoppingCart size={20} /> Agregar al Carro</>}
                                </button>

                                <button onClick={handleShare} className="p-4 border border-zinc-200 rounded-xl hover:bg-zinc-50 transition-colors">
                                    <Share2 size={20} className="text-zinc-500" />
                                </button>
                            </div>

                            {/* Garantías */}
                            <div className="bg-zinc-50 rounded-xl p-4 space-y-2">
                                <div className="flex items-center gap-2 text-sm text-zinc-600">
                                    <Truck size={16} className="text-red-500" />
                                    <span>Despacho a todo Chile — 2 a 3 días hábiles</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-zinc-600">
                                    <ShieldCheck size={16} className="text-green-500" />
                                    <span>Garantía de calidad en todos nuestros repuestos</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Productos relacionados */}
                {related.length > 0 && (
                    <div>
                        <h2 className="text-xl font-black text-zinc-900 mb-6">
                            Otros repuestos de <span className="text-red-600">{product.category?.name ?? 'la misma categoría'}</span>
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {related.map(p => {
                                const rPrice = getProductPrice ? getProductPrice(p) : p.regular_price;
                                return (
                                    <Link key={p.id} href={`/producto/${p.slug ?? p.id}`}
                                        className="bg-white rounded-xl border border-zinc-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                                    >
                                        <div className="h-28 bg-zinc-50 flex items-center justify-center overflow-hidden">
                                            {p.image
                                                ? <img src={p.image} alt={p.name} className="h-full w-full object-contain p-3 group-hover:scale-105 transition-transform" />
                                                : <span className="text-4xl">🔧</span>
                                            }
                                        </div>
                                        <div className="p-3">
                                            <p className="text-xs font-bold text-zinc-500 truncate">{p.brand?.name}</p>
                                            <p className="font-bold text-zinc-900 text-sm leading-tight mb-1 h-8 overflow-hidden">{p.name}</p>
                                            <p className="text-red-600 font-black text-base">${Number(rPrice).toLocaleString('es-CL')}</p>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Volver */}
                <div className="mt-10">
                    <Link href="/catalogo" className="flex items-center gap-2 text-sm text-zinc-500 hover:text-red-600 transition-colors font-medium">
                        <ArrowLeft size={16} /> Volver al Catálogo
                    </Link>
                </div>
            </div>
        </div>
    );
}
