'use client';
import React from 'react';

const BRANDS = [

    'CHERY', 'MG', 'HAVAL', 'GREAT WALL',
    'JAC', 'CHANGAN', 'GAC', 'MAXUS',
    'DFSK', 'BYD', 'GEELY', 'FAW', 'BRILLIANCE'
];

export const BrandCarousel = () => {
    return (
        <div className="w-full bg-zinc-950 border-y border-white/10 overflow-hidden relative py-8">
            {/* Gradient Masks for Fade Effect */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-zinc-950 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-zinc-950 to-transparent z-10"></div>

            <div className="flex w-max animate-infinite-scroll">
                {/* Original List */}
                <div className="flex items-center gap-16 px-8">
                    {BRANDS.map((brand, index) => (
                        <span
                            key={`brand-${index}`}
                            className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 opacity-50 hover:opacity-100 transition-opacity cursor-default tracking-tighter"
                            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                        >
                            {brand}
                        </span>
                    ))}
                </div>
                {/* Duplicate List for Seamless Loop */}
                <div className="flex items-center gap-16 px-8" aria-hidden="true">
                    {BRANDS.map((brand, index) => (
                        <span
                            key={`brand-dup-${index}`}
                            className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 opacity-50 hover:opacity-100 transition-opacity cursor-default tracking-tighter"
                            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                        >
                            {brand}
                        </span>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes infinite-scroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                .animate-infinite-scroll {
                    animation: infinite-scroll 40s linear infinite;
                }
                .animate-infinite-scroll:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    );
};
