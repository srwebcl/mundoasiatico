'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Star, ArrowRight } from 'lucide-react';
import api from '@/lib/api';
import { useShop } from '@/context/ShopContext';

export function FeaturedProducts({ limit = 8 }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isWholesale, getProductPrice } = useShop();

    useEffect(() => {
        let active = true;
        (async () => {
            try {
                const res = await api.getFeaturedProducts(limit);
                if (active) setProducts(res.data ?? []);
            } catch (error) {
                console.error('Error cargando productos destacados:', error);
            } finally {
                if (active) setLoading(false);
            }
        })();
        return () => { active = false; };
    }, [limit]);

    // Sin destacados marcados en el admin: no mostramos la sección vacía.
    if (!loading && products.length === 0) return null;

    return (
        <section className="py-16 bg-zinc-50">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-red-100 text-red-600 font-bold tracking-wider text-xs uppercase mb-3">
                            <Star size={12} fill="currentColor" /> Selección Mundo Asiático
                        </span>
                        <h2 className="text-2xl md:text-3xl font-black text-zinc-900 uppercase">Productos Destacados</h2>
                        <div className="w-20 h-1 bg-red-600 mt-2"></div>
                    </div>
                    <Link
                        href="/catalogo"
                        className="hidden md:inline-flex items-center gap-2 text-sm font-bold text-zinc-700 hover:text-red-600 transition-colors"
                    >
                        Ver catálogo completo <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {loading
                        ? [...Array(4)].map((_, i) => (
                            <div key={i} className="bg-white rounded-lg border border-zinc-200 overflow-hidden animate-pulse">
                                <div className="h-40 bg-zinc-100" />
                                <div className="p-4 space-y-2">
                                    <div className="h-3 w-1/3 bg-zinc-100 rounded" />
                                    <div className="h-4 w-full bg-zinc-100 rounded" />
                                    <div className="h-5 w-1/2 bg-zinc-100 rounded" />
                                </div>
                            </div>
                        ))
                        : products.map((product) => {
                            const price = getProductPrice(product);
                            const slug = product.slug ?? product.id;
                            return (
                                <Link
                                    key={product.id}
                                    href={`/producto/${slug}`}
                                    className="group relative bg-white rounded-lg border border-zinc-200 shadow-sm hover:shadow-xl transition-shadow overflow-hidden"
                                >
                                    <span className="absolute top-2 left-2 z-10 inline-flex items-center gap-1 bg-red-600 text-white text-[10px] font-bold uppercase px-2 py-1 rounded-full shadow">
                                        <Star size={10} fill="currentColor" /> Destacado
                                    </span>
                                    <div className="h-40 bg-zinc-100 flex items-center justify-center overflow-hidden">
                                        {product.image
                                            ? <img src={product.image} alt={product.name} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300" />
                                            : <span className="text-5xl opacity-30">🔧</span>
                                        }
                                    </div>
                                    <div className="p-4">
                                        <div className="text-xs font-bold text-zinc-400 mb-1 uppercase truncate">
                                            {product.brand?.name ?? product.category?.name ?? '—'}
                                        </div>
                                        <h3 className="font-bold text-zinc-900 leading-tight mb-2 h-10 overflow-hidden">
                                            {product.name}
                                        </h3>
                                        <div className="text-xl font-bold text-red-600">
                                            ${price?.toLocaleString()}
                                        </div>
                                        {isWholesale && <span className="text-[10px] text-blue-600 font-bold">PRECIO MAYORISTA</span>}
                                    </div>
                                </Link>
                            );
                        })
                    }
                </div>

                <div className="mt-10 text-center md:hidden">
                    <Link href="/catalogo" className="inline-flex items-center gap-2 font-bold bg-zinc-900 text-white px-8 py-4 rounded-full shadow-lg hover:bg-zinc-800 transition-colors w-full justify-center">
                        Ver catálogo completo <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
