'use client';
import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import api from '@/lib/api';

export const WhatsAppButton = () => {
    const { isCartOpen } = useShop();
    const [hasNotification, setHasNotification] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form states
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [patente, setPatente] = useState('');
    const [message, setMessage] = useState('');
    const [dynamicNumber, setDynamicNumber] = useState('56971602029');

    useEffect(() => {
        const fetchNumber = async () => {
            try {
                const res = await api.getWhatsAppNumber();
                if (res && res.whatsapp_number) {
                    setDynamicNumber(res.whatsapp_number.replace(/\+/g, ''));
                }
            } catch (error) {
                console.error("Error fetching whatsapp number", error);
            }
        };
        fetchNumber();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setHasNotification(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    // Hide if cart is open
    if (isCartOpen) return null;

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        if (!isModalOpen) {
            setHasNotification(false);
        }
    };

    const sendWaMessage = async () => {
        if (!name || !phone || !patente || !message) {
            alert("Por favor completa todos los campos para poder brindarte una atención rápida.");
            return;
        }

        setIsSubmitting(true);

        try {
            // Intentamos capturar el Lead silenciosamente en el backend
            await api.saveWhatsAppLead({
                name,
                phone,
                patente,
                message
            });
        } catch (error) {
            console.error("Error capturando lead:", error);
            // Ignoramos el error para no frenar la redirección a WhatsApp
        }

        setIsSubmitting(false);

        const fullMessage = `Hola Mundo Asiático, mi nombre es ${name}.\n\n🚗 *Patente:* ${patente}\n🔧 *Consulta:* ${message}`;
        const url = `https://wa.me/${dynamicNumber}?text=${encodeURIComponent(fullMessage)}`;

        window.open(url, "_blank");
        toggleModal();
        
        // Limpiar campos
        setMessage('');
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 group font-sans">
            <button
                onClick={toggleModal}
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center relative overflow-visible group-hover:shadow-[0_0_20px_rgba(37,211,102,0.5)] z-50"
                aria-label="Abrir chat de WhatsApp"
            >
                {hasNotification && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 text-white text-[10px] font-bold items-center justify-center border-2 border-white">1</span>
                    </span>
                )}
                <MessageCircle className="w-8 h-8 fill-current relative z-10" />
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-4 pb-20 sm:pb-4 pointer-events-none">
                    <div className="absolute inset-0 bg-black/40 pointer-events-auto transition-opacity" onClick={toggleModal}></div>

                    <div className="relative z-10 bg-white w-full max-w-sm rounded-t-3xl sm:rounded-3xl shadow-2xl pointer-events-auto animate-in slide-in-from-bottom-5 fade-in duration-300">
                        <div className="bg-[#075E54] p-4 text-white rounded-t-3xl sm:rounded-t-3xl flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="bg-white p-1.5 rounded-full">
                                    <MessageCircle className="w-5 h-5 text-[#075E54] fill-current" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg leading-none">Mundo Asiático</h3>
                                    <p className="text-xs text-white/80">Expertos en repuestos</p>
                                </div>
                            </div>
                            <button onClick={toggleModal} className="text-white/80 hover:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <p className="text-sm text-gray-600 mb-2">
                                Para una atención ultra rápida, déjanos tus datos y la patente de tu vehículo:
                            </p>

                            <div className="grid grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    placeholder="Tu Nombre"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#25D366] outline-none"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <input
                                    type="tel"
                                    placeholder="Tu Teléfono"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#25D366] outline-none"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder="Patente de tu auto (Ej: AB1234)"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm font-bold uppercase focus:ring-2 focus:ring-[#25D366] outline-none"
                                    value={patente}
                                    onChange={(e) => setPatente(e.target.value.toUpperCase())}
                                />
                            </div>

                            <div>
                                <textarea
                                    rows={2}
                                    placeholder="¿Qué repuesto buscas?"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#25D366] outline-none resize-none"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                ></textarea>
                            </div>

                            <button
                                onClick={sendWaMessage}
                                disabled={isSubmitting}
                                className="w-full bg-[#25D366] hover:bg-[#1db851] disabled:opacity-70 text-white font-bold py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-colors"
                            >
                                <MessageCircle className="w-5 h-5 fill-current" />
                                {isSubmitting ? 'Conectando...' : 'Hablar por WhatsApp'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
