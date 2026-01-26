'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, MessageCircle } from 'lucide-react';

export const Hero = () => {
    const router = useRouter();

    return (
        <div className="relative bg-[#0a0a0a] text-white overflow-hidden min-h-[450px] lg:min-h-[500px] flex items-center selection:bg-red-500 selection:text-white group">

            {/* --- BACKGROUND LAYERS --- */}

            {/* 1. Main Background Image with Parallax-like scale */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                    src="/banner.jpeg"
                    alt="Background"
                    className="w-full h-full object-cover opacity-50 scale-110 group-hover:scale-100 transition-transform duration-[2s] ease-out will-change-transform"
                />
            </div>

            {/* 2. Gradient Overlays for Spotlight Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
            <div className="absolute -top-1/2 -left-1/4 w-[1000px] h-[1000px] bg-red-600/20 rounded-full blur-[120px] mix-blend-screen opacity-40 animate-pulse"></div>
            <div className="absolute -bottom-1/2 -right-1/4 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[100px] mix-blend-screen opacity-30"></div>

            {/* --- CONTENT --- */}
            <div className="container mx-auto px-4 relative z-20 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 py-12 lg:py-16">

                {/* Left Column: Text & CTA */}
                <div className="w-full lg:w-3/5 space-y-6 animate-in slide-in-from-left duration-1000 ease-out fill-mode-backwards">

                    <div>
                        <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 text-[10px] font-bold px-3 py-1 rounded-full mb-4 shadow-2xl shadow-red-900/20 ring-1 ring-white/20 hover:bg-white/10 transition-colors">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                            <span className="text-red-400 tracking-wider uppercase">Nueva Plataforma 2026</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black italic leading-[0.9] tracking-tighter drop-shadow-xl">
                            TU EXPERTO EN <br />
                            <span className="relative inline-block text-red-600 animate-shine pb-1 whitespace-nowrap">
                                REPUESTOS <span className="text-white drop-shadow-2xl">CHINOS</span>
                                <span className="absolute inset-0 bg-gradient-to-r from-red-500 via-red-600 to-red-500 blur-2xl opacity-50 -z-10"></span>
                            </span>
                        </h1>
                    </div>

                    <p className="text-zinc-300 text-base md:text-xl max-w-xl font-light leading-relaxed border-l-4 border-red-600 pl-4">
                        La red más grande de Chile. Repuestos certificados para
                        <strong className="text-white font-semibold"> Chery, MG, JAC, Great Wall</strong> y Haval.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-2">
                        <button
                            onClick={() => router.push('/catalogo')}
                            className="group relative px-6 py-4 rounded-full bg-red-600 text-white font-bold text-base overflow-hidden shadow-2xl shadow-red-600/40 hover:shadow-red-600/60 transition-all hover:-translate-y-1"
                        >
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                            <span className="relative flex items-center gap-2">
                                VER CATÁLOGO <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>

                        <button className="px-6 py-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-white font-bold text-base hover:bg-white/10 transition-all hover:-translate-y-1 flex items-center gap-2">
                            <MessageCircle size={20} className="text-green-500" />
                            COTIZAR WHATSAPP
                        </button>
                    </div>
                </div>

                {/* Right Column: Hero Image (Floating Car) */}
                <div className="w-full lg:w-2/5 flex justify-center relative perspective-1000">
                    {/* Glow behind car */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-radial-gradient from-red-600/30 to-transparent blur-3xl rounded-full"></div>

                    <div className="relative animate-float z-10 w-full max-w-[380px] lg:max-w-[450px]">
                        {/* Reflection/Glare on car visual */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 blur-3xl rounded-full z-20 mix-blend-overlay"></div>

                        <img
                            src="/camioneta-great-wall.webp"
                            alt="Camioneta Great Wall"
                            className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] filter contrast-125 saturate-110 transform rotate-1 hover:rotate-0 transition-transform duration-500"
                        />

                        {/* Floating Glass Card */}
                        <div className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-xl border border-white/20 p-3 rounded-2xl shadow-2xl z-30 max-w-[180px] animate-in slide-in-from-bottom duration-1000 delay-300">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="flex h-2 w-2 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                </span>
                                <span className="text-[9px] text-white/80 font-bold tracking-widest uppercase">Oferta Flash</span>
                            </div>
                            <div className="text-white font-bold text-base leading-tight">Kit Embrague Chery</div>
                            <div className="text-red-400 font-bold text-xs mt-0.5">Desde $89.900</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
