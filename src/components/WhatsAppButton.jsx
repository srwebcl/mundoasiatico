'use client';
import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton = () => {
    const [isBubbleVisible, setIsBubbleVisible] = useState(false);
    const [isBubbleClosed, setIsBubbleClosed] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form states
    const [brand, setBrand] = useState('');
    const [vin, setVin] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsBubbleVisible(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        if (!isModalOpen) {
            setIsBubbleClosed(true); // Close bubble if opening modal
        }
    };

    const sendWaMessage = () => {
        if (!brand || !message) {
            alert("Por favor completa los campos para poder ayudarte mejor.");
            return;
        }

        let fullMessage = `Hola Importadora EMA, necesito cotizar: \n\n🚗 *Vehículo:* ${brand}\n🔧 *Repuesto:* ${message}`;
        if (vin) {
            fullMessage += `\n🔢 *VIN:* ${vin}`;
        }

        const url = `https://wa.me/56957191271?text=${encodeURIComponent(fullMessage)}`;

        window.open(url, "_blank");
        toggleModal();
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 group font-sans">
            {/* Chat Bubble - Appears on load */}
            {!isBubbleClosed && (
                <div
                    className={`bg-white text-gray-800 px-4 py-3 rounded-2xl rounded-tr-none shadow-xl border border-gray-100 max-w-[250px] transform transition-all duration-500 mb-2 relative ${isBubbleVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                >
                    <p className="text-sm font-medium">
                        Hola 👋 ¿Buscas un repuesto? ¡Cotiza rápido por aquí!
                    </p>
                    <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white transform rotate-45 border-r border-b border-gray-100"></div>
                    <button
                        onClick={() => setIsBubbleClosed(true)}
                        className="absolute -top-2 -left-2 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold leading-none"
                    >
                        &times;
                    </button>
                </div>
            )}

            {/* Main Button Toggle */}
            <button
                onClick={toggleModal}
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center relative overflow-hidden group-hover:shadow-[0_0_20px_rgba(37,211,102,0.5)] z-50"
                aria-label="Abrir chat de WhatsApp"
            >
                <span className="absolute inset-0 bg-white/20 rounded-full animate-ping opacity-75"></span>
                <MessageCircle className="w-8 h-8 fill-current relative z-10" />
            </button>

            {/* Modal Form */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-4 pb-20 sm:pb-4 pointer-events-none">
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto transition-opacity"
                        onClick={toggleModal}
                    ></div>

                    <div className="bg-white w-full max-w-sm rounded-t-3xl sm:rounded-3xl shadow-2xl pointer-events-auto animate-in slide-in-from-bottom-5 fade-in duration-300">
                        <div className="bg-[#075E54] p-4 text-white rounded-t-3xl flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="bg-white p-1.5 rounded-full">
                                    <MessageCircle className="w-5 h-5 text-[#075E54] fill-current" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg leading-none">Importadora EMA</h3>
                                    <p className="text-xs text-white/80">Responde en minutos</p>
                                </div>
                            </div>
                            <button onClick={toggleModal} className="text-white/80 hover:text-white">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <p className="text-sm text-gray-600 mb-2">
                                Por favor dinos qué necesitas para preparar tu respuesta:
                            </p>

                            <div>
                                <input
                                    type="text"
                                    placeholder="Marca y Modelo (Ej: Mitsubishi L200)"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#25D366] outline-none"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                />
                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder="VIN / Chasis (Opcional)"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#25D366] outline-none"
                                    value={vin}
                                    onChange={(e) => setVin(e.target.value)}
                                />
                            </div>

                            <div>
                                <textarea
                                    rows={3}
                                    placeholder="¿Qué repuesto buscas?"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#25D366] outline-none resize-none"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                ></textarea>
                            </div>

                            <button
                                onClick={sendWaMessage}
                                className="w-full bg-[#25D366] hover:bg-[#1db851] text-white font-bold py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-colors"
                            >
                                <MessageCircle className="w-5 h-5 fill-current" />
                                Iniciar Chat en WhatsApp
                            </button>

                            <p className="text-[10px] text-center text-gray-400">
                                Al hacer clic, serás redirigido a WhatsApp Web o App.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
