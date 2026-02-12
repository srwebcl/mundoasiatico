'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, X } from 'lucide-react';

export const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already consented
        const consent = localStorage.getItem('ma_cookie_consent');
        if (!consent) {
            // Show banner after a short delay
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('ma_cookie_consent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom duration-500">
            <div className="max-w-4xl mx-auto bg-zinc-900 border border-zinc-800 text-white p-6 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center gap-6">

                <div className="bg-zinc-800 p-3 rounded-full shrink-0">
                    <Cookie className="text-yellow-500" size={24} />
                </div>

                <div className="flex-1 text-center md:text-left">
                    <h3 className="font-bold text-lg mb-1">Utilizamos Cookies</h3>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                        Usamos cookies propias y de terceros para mejorar tu experiencia, analizar el tráfico y recordar tus preferencias.
                        Al continuar navegando, aceptas su uso.
                        <Link href="/politica-de-cookies" className="text-white underline ml-1 hover:text-red-400 transition-colors">
                            Leer Política de Cookies
                        </Link>
                    </p>
                </div>

                <div className="flex gap-3 shrink-0">
                    <button
                        onClick={acceptCookies}
                        className="bg-white text-zinc-900 px-6 py-2.5 rounded-full font-bold text-sm hover:bg-zinc-200 transition-colors shadow-lg active:scale-95"
                    >
                        Aceptar
                    </button>
                    {/* Optional: 'Reject' button could be added here, but usually Accept/Learn More is standard for simple banners */}
                </div>

                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-2 right-2 text-zinc-500 hover:text-white md:hidden"
                >
                    <X size={20} />
                </button>
            </div>
        </div>
    );
};
