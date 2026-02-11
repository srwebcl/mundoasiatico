'use client';
import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { ArrowRight } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const SLIDES = [
    {
        id: 1,
        image: '/images/banner-brakes.png',
        subtitle: 'SEGURIDAD TOTAL',
        title: 'FRENOS DE ALTA GAMA',
        description: 'Pastillas, discos y calipers para Chery, MG y Maxus. Garantiza tu frenado con repuestos certificados.',
        ctaText: 'VER FRENOS',
        ctaLink: '/catalogo?categoria=frenos',
        align: 'left'
    },
    {
        id: 2,
        image: '/images/banner-maintenance.png',
        subtitle: 'MANTENIMIENTO PREVENTIVO',
        title: 'MOTOR Y FILTROS',
        description: 'Mantén tu motor rugiendo. Kits de afinamiento completos para todas las marcas chinas.',
        ctaText: 'VER KIT MANTENCIÓN',
        ctaLink: '/catalogo?categoria=filtros',
        align: 'center'
    },
    {
        id: 3,
        image: '/banner.jpeg', // Fallback to existing banner if available
        subtitle: 'REPUESTOS ORIGINALES',
        title: 'MUNDO ASIÁTICO',
        description: 'El stock más grande de Chile en repuestos para vehículos chinos. Expertos a tu servicio.',
        ctaText: 'BUSCAR REPUESTO',
        ctaLink: '/catalogo',
        align: 'left'
    }
];

export const Hero = () => {
    return (
        <section className="relative w-full h-[500px] md:h-[600px] bg-zinc-900 overflow-hidden">
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                effect={'fade'}
                speed={1000}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                navigation={true}
                pagination={{ clickable: true }}
                loop={true}
                className="w-full h-full group"
            >
                {SLIDES.map((slide) => (
                    <SwiperSlide key={slide.id} className="relative w-full h-full">
                        {/* Background Image */}
                        <div className="absolute inset-0 w-full h-full">
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover"
                            />
                            {/* Gradient Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${slide.align === 'center' ? 'from-black/70 via-black/50 to-black/70' : 'from-black/80 via-black/40 to-transparent'}`}></div>
                        </div>

                        {/* Content Overlay */}
                        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
                            <div className={`max-w-xl ${slide.align === 'center' ? 'mx-auto text-center' : ''} space-y-6`}>
                                <div className="space-y-2 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                                    <span className="inline-block py-1 px-3 rounded-full bg-red-600/90 text-white text-xs md:text-sm font-bold tracking-wider uppercase backdrop-blur-sm">
                                        {slide.subtitle}
                                    </span>
                                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white italic tracking-tighter leading-none">
                                        {slide.title}
                                    </h1>
                                </div>

                                <p className="text-zinc-200 text-lg md:text-xl font-medium leading-relaxed max-w-lg animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                                    {slide.description}
                                </p>

                                <div className={`flex flex-wrap gap-4 pt-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 ${slide.align === 'center' ? 'justify-center' : 'justify-start'}`}>
                                    <Link
                                        href={slide.ctaLink}
                                        className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 group/btn transition-all shadow-lg hover:shadow-red-600/30"
                                    >
                                        {slide.ctaText} <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

                <style jsx global>{`
                    .swiper-button-next, .swiper-button-prev {
                        color: white !important;
                        opacity: 0;
                        transition: opacity 0.3s;
                    }
                    .swiper:hover .swiper-button-next, .swiper:hover .swiper-button-prev {
                        opacity: 1;
                    }
                    .swiper-pagination-bullet {
                        background: white !important;
                        opacity: 0.5;
                    }
                    .swiper-pagination-bullet-active {
                        opacity: 1;
                        background: #dc2626 !important; /* red-600 */
                    }
                `}</style>
            </Swiper>
        </section>
    );
};
