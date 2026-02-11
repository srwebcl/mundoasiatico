'use client';
import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { ArrowRight, ArrowLeft } from 'lucide-react';

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
        title: 'TODO FRENOS',
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
        align: 'left'
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


// Adjust height for laptops and responsive view
export const Hero = () => {
    return (
        <section className="relative w-full h-[500px] md:h-[calc(100vh-140px)] min-h-[500px] max-h-[850px] bg-zinc-950 overflow-hidden group">
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                effect={'fade'}
                fadeEffect={{ crossFade: true }}
                speed={1500}
                autoplay={{
                    delay: 6000,
                    disableOnInteraction: false,
                }}
                navigation={{
                    nextEl: '.swiper-custom-next',
                    prevEl: '.swiper-custom-prev',
                }}
                pagination={{
                    clickable: true,
                    renderBullet: function (index, className) {
                        return '<span class="' + className + ' custom-bullet"></span>';
                    }
                }}
                loop={true}
                className="w-full h-full"
            >
                {SLIDES.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        {/* Background Image with Slow Zoom */}
                        <div className="absolute inset-0 w-full h-full overflow-hidden">
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover opacity-60 animate-[zoomIn_10s_infinite_alternate]"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 container mx-auto px-6 md:px-12 h-full flex flex-col justify-center pb-20 md:pb-0">
                            <div className="w-full md:w-3/4 lg:w-2/3 text-left" >

                                <span className="block mb-2 md:mb-4 text-red-500 font-bold tracking-[0.3em] uppercase text-xs md:text-sm animate-in fade-in slide-in-from-bottom-8 duration-700">
                                    {slide.subtitle}
                                </span>

                                <h1 className="text-4xl md:text-5xl lg:text-7xl xl:text-7xl font-black text-white italic tracking-tighter leading-[0.9] animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200 drop-shadow-2xl pr-8 pb-2 mt-0">
                                    {slide.title.split(' ').map((word, i) => (
                                        <span key={i} className={i % 2 !== 0 ? "text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600 inline-block pr-4 transform translate-x-0" : "inline-block text-zinc-100 pr-4 transform translate-x-0"}>
                                            {word}{' '}
                                        </span>
                                    ))}
                                </h1>

                                <p className="mt-2 md:mt-4 text-zinc-300 text-base md:text-lg lg:text-xl max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300 drop-shadow-md">
                                    {slide.description}
                                </p>

                                <div className="pt-4 md:pt-6 lg:pt-8 animate-in fade-in slide-in-from-bottom-20 duration-1000 delay-500">
                                    <Link
                                        href={slide.ctaLink}
                                        className="inline-flex items-center gap-3 bg-red-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-bold hover:bg-red-700 transition-all hover:gap-5 shadow-lg shadow-red-900/50 group/btn border-2 border-transparent hover:border-red-400 text-sm md:text-base"
                                    >
                                        {slide.ctaText} <ArrowRight size={20} className="group-hover/btn:rotate-0 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <button className="swiper-custom-prev absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center border border-white/10 bg-white/5 backdrop-blur-md text-white transition-all duration-300 hover:bg-white/20 hover:scale-105 active:scale-95 group/nav shadow-lg hover:border-white/30 cursor-pointer">
                <ArrowLeft size={16} strokeWidth={1.5} className="group-hover/nav:-translate-x-0.5 transition-transform" />
            </button>
            <button className="swiper-custom-next absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center border border-white/10 bg-white/5 backdrop-blur-md text-white transition-all duration-300 hover:bg-white/20 hover:scale-105 active:scale-95 group/nav shadow-lg hover:border-white/30 cursor-pointer">
                <ArrowRight size={16} strokeWidth={1.5} className="group-hover/nav:translate-x-0.5 transition-transform" />
            </button>

            {/* Custom Styles for Pagination */}
            <style jsx global>{`
                    @keyframes zoomIn {
                        from { transform: scale(1); }
                        to { transform: scale(1.1); }
                    }

                    /* Custom Pagination */
                    .swiper-pagination-horizontal.swiper-pagination-bullets, 
                    .swiper-pagination-custom, 
                    .swiper-pagination-fraction {
                        bottom: 40px !important;
                    }

                    .swiper-pagination-bullet {
                        width: 8px;
                        height: 8px;
                        background: white;
                        opacity: 0.3;
                        transition: all 0.3s ease;
                        margin: 0 4px !important;
                    }
                    @media (min-width: 1024px) {
                        .swiper-pagination-bullet {
                            width: 10px;
                            height: 10px;
                            margin: 0 6px !important;
                        }
                    }

                    .swiper-pagination-bullet-active {
                        opacity: 1;
                        background: #dc2626;
                        transform: scale(1.2);
                        box-shadow: 0 0 10px rgba(220,38,38,0.5);
                    }
                `}</style>
        </section>
    );
};
