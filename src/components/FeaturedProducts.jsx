'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Star, ArrowLeft, ArrowRight } from 'lucide-react';
import api from '@/lib/api';
import { useShop } from '@/context/ShopContext';

import 'swiper/css';
import 'swiper/css/navigation';

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

    // Sin destacados marcados en el admin: la sección no existe, no un hueco vacío.
    if (loading || products.length === 0) return null;

    return (
        <section className="py-16 bg-zinc-50">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex justify-between items-end mb-8 gap-4">
                    <div className="min-w-0 max-w-full">
                        <span className="inline-block py-1 px-3 rounded-full bg-red-100 text-red-600 font-bold tracking-wider text-xs uppercase mb-3">
                            Selección Mundo Asiático
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black italic text-zinc-900 leading-tight">
                            PRODUCTOS <span className="inline-block pr-1 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500">DESTACADOS</span>
                        </h2>
                    </div>
                    <Link
                        href="/catalogo"
                        className="hidden md:inline-flex items-center gap-2 text-sm font-bold text-zinc-700 hover:text-red-600 transition-colors"
                    >
                        Ver catálogo completo <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="relative">
                    <Swiper
                        modules={[Navigation]}
                        navigation={{ nextEl: '.featured-next', prevEl: '.featured-prev' }}
                        spaceBetween={16}
                        slidesPerView={1.3}
                        breakpoints={{
                            480:  { slidesPerView: 2.2, spaceBetween: 16 },
                            768:  { slidesPerView: 3,   spaceBetween: 20 },
                            1024: { slidesPerView: 4,   spaceBetween: 24 },
                        }}
                    >
                        {products.map((product) => {
                            const price = getProductPrice(product);
                            const slug = product.slug ?? product.id;
                            return (
                                <SwiperSlide key={product.id} className="!h-auto pb-1">
                                    <Link
                                        href={`/producto/${slug}`}
                                        className="group relative block h-full bg-white rounded-lg border border-zinc-200 shadow-sm hover:shadow-xl transition-shadow overflow-hidden"
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
                                            <h3 className="font-bold text-zinc-900 leading-tight mb-2 min-h-[3.75rem] line-clamp-3">
                                                {product.name}
                                            </h3>
                                            <div className="text-xl font-bold text-red-600">
                                                ${price?.toLocaleString()}
                                            </div>
                                            {isWholesale && <span className="text-[10px] text-blue-600 font-bold">PRECIO MAYORISTA</span>}
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>

                    {/* Flechas centradas verticalmente sobre el carrusel */}
                    <button aria-label="Anterior" className="featured-prev absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white border border-zinc-200 shadow-md flex items-center justify-center text-zinc-700 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all">
                        <ArrowLeft size={18} />
                    </button>
                    <button aria-label="Siguiente" className="featured-next absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white border border-zinc-200 shadow-md flex items-center justify-center text-zinc-700 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all">
                        <ArrowRight size={18} />
                    </button>
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link href="/catalogo" className="inline-flex items-center gap-2 font-bold bg-zinc-900 text-white px-8 py-4 rounded-full shadow-lg hover:bg-zinc-800 transition-colors w-full justify-center">
                        Ver catálogo completo <ArrowRight size={18} />
                    </Link>
                </div>
            </div>

            <style jsx global>{`
                .featured-prev.swiper-button-disabled,
                .featured-next.swiper-button-disabled {
                    opacity: 0;
                    pointer-events: none;
                }
            `}</style>
        </section>
    );
}
