'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import api from '@/lib/api';

export default function PopupManager() {
    const [popups, setPopups] = useState([]);
    const [activePopup, setActivePopup] = useState(null);
    const pathname = usePathname();

    useEffect(() => {
        const fetchPopups = async () => {
            try {
                const response = await api.getPopups();
                if (response && Array.isArray(response)) {
                    setPopups(response);
                }
            } catch (error) {
                console.error('Error cargando Popups:', error);
            }
        };

        fetchPopups();
    }, []);

    useEffect(() => {
        if (popups.length === 0) return;

        // Buscar si hay algún popup aplicable para esta página que NO se haya cerrado antes
        const applicablePopup = popups.find(popup => {
            // Validar ruta (si está vacío, aplica a todas, si no, tiene que coincidir)
            const isApplicablePath = !popup.target_url || pathname.includes(popup.target_url);
            
            // Validar si el usuario ya lo cerró en esta sesión
            const hasSeen = sessionStorage.getItem(`popup_closed_${popup.id}`);
            
            return isApplicablePath && !hasSeen;
        });

        if (applicablePopup) {
            // Configurar el timer según el delay del backend
            const timer = setTimeout(() => {
                setActivePopup(applicablePopup);
            }, (applicablePopup.delay_seconds || 3) * 1000);

            return () => clearTimeout(timer);
        }
    }, [popups, pathname]);

    const handleClose = () => {
        if (activePopup) {
            sessionStorage.setItem(`popup_closed_${activePopup.id}`, 'true');
            setActivePopup(null);
        }
    };

    return (
        <AnimatePresence>
            {activePopup && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    {/* Fondo oscuro */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Contenedor del Popup */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Botón de cierre */}
                        <button
                            onClick={handleClose}
                            className="absolute top-3 right-3 p-1.5 bg-black/10 hover:bg-black/20 text-black rounded-full transition-colors z-10"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Imagen (si existe) */}
                        {activePopup.image && (
                            <div className="w-full h-48 bg-gray-100 relative">
                                <img
                                    src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${activePopup.image}`}
                                    alt={activePopup.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        {/* Contenido */}
                        <div className="p-6 md:p-8 text-center flex flex-col items-center">
                            <h2 className="text-2xl font-bold text-zinc-900 mb-3">
                                {activePopup.title}
                            </h2>

                            {activePopup.content && (
                                <div
                                    className="prose prose-sm prose-red mb-6 text-zinc-600"
                                    dangerouslySetInnerHTML={{ __html: activePopup.content }}
                                />
                            )}

                            {/* Botón CTA (si existe) */}
                            {activePopup.button_text && activePopup.button_link && (
                                <a
                                    href={activePopup.button_link}
                                    onClick={handleClose}
                                    className="inline-flex w-full justify-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-colors"
                                >
                                    {activePopup.button_text}
                                </a>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
