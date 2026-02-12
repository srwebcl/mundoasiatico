import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';

export const metadata = {
    title: "Contacto y Sucursales | Mundo Asiático",
    description: "Visita nuestras sucursales en Santiago y Puerto Montt. Repuestos para vehículos chinos.",
};

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-zinc-50 py-12 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black italic text-zinc-900 mb-4 tracking-tighter">
                        NUESTRAS <span className="text-red-600">SUCURSALES</span>
                    </h1>
                    <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
                        Encuentra el repuesto que necesitas en nuestros puntos de venta o contáctanos para envíos a todo Chile.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">

                    {/* Sucursal Santiago */}
                    <div className="bg-white rounded-2xl shadow-lg border border-zinc-100 overflow-hidden group hover:shadow-xl transition-all duration-300">
                        <div className="h-48 bg-zinc-900 relative">
                            <div className="absolute inset-0 bg-red-600/10 mix-blend-overlay"></div>
                            {/* Maps Iframe or Placeholder Image */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <MapPin className="text-white/20 w-24 h-24 transform -rotate-12" />
                            </div>
                            <div className="absolute bottom-0 left-0 w-full p-6 text-white bg-gradient-to-t from-black/80 to-transparent">
                                <h2 className="text-2xl font-black italic tracking-tighter">SANTIAGO</h2>
                                <p className="text-zinc-300 text-sm font-bold uppercase tracking-wider">Casa Matriz</p>
                            </div>
                        </div>

                        <div className="p-8 space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-red-50 p-3 rounded-lg text-red-600 shrink-0">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p className="font-bold text-zinc-900 text-lg">Puente Alto</p>
                                    <p className="text-zinc-600 leading-relaxed">
                                        Av. Concha y Toro 3063 Local 24,<br />
                                        Santiago, Región Metropolitana
                                    </p>
                                    <a
                                        href="https://maps.app.goo.gl/QJaGHNseL9MPApfx8"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-red-600 font-bold text-sm mt-2 hover:underline"
                                    >
                                        Ver en Mapa <ArrowRight size={16} />
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-zinc-50 p-3 rounded-lg text-zinc-600 shrink-0">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <p className="font-bold text-zinc-900">Horario de Atención</p>
                                    <p className="text-zinc-600 text-sm">Lunes a Viernes: 09:00 - 18:30 hrs</p>
                                    <p className="text-zinc-600 text-sm">Sábado: 10:00 - 14:00 hrs</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sucursal Puerto Montt */}
                    <div className="bg-white rounded-2xl shadow-lg border border-zinc-100 overflow-hidden group hover:shadow-xl transition-all duration-300">
                        <div className="h-48 bg-zinc-900 relative">
                            <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <MapPin className="text-white/20 w-24 h-24 transform -rotate-12" />
                            </div>
                            <div className="absolute bottom-0 left-0 w-full p-6 text-white bg-gradient-to-t from-black/80 to-transparent">
                                <h2 className="text-2xl font-black italic tracking-tighter">PUERTO MONTT</h2>
                                <p className="text-zinc-300 text-sm font-bold uppercase tracking-wider">Sucursal Sur</p>
                            </div>
                        </div>

                        <div className="p-8 space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-50 p-3 rounded-lg text-blue-600 shrink-0">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p className="font-bold text-zinc-900 text-lg">Centro</p>
                                    <p className="text-zinc-600 leading-relaxed">
                                        Urmeneta 882 Local 1,<br />
                                        Puerto Montt
                                    </p>
                                    <a
                                        href="https://maps.app.goo.gl/aQpANDX4KYPsdevf6"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm mt-2 hover:underline"
                                    >
                                        Ver en Mapa <ArrowRight size={16} />
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-zinc-50 p-3 rounded-lg text-zinc-600 shrink-0">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <p className="font-bold text-zinc-900">Horario de Atención</p>
                                    <p className="text-zinc-600 text-sm">Lunes a Viernes: 09:30 - 18:30 hrs</p>
                                    <p className="text-zinc-600 text-sm">Sábado: 10:00 - 14:00 hrs</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Contact info extra */}
                <div className="bg-[#0a0a0a] rounded-2xl p-8 md:p-12 text-white text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-red-600/10 opacity-20"></div>
                    <div className="relative z-10">
                        <h3 className="text-2xl md:text-3xl font-bold mb-6">¿Necesitas ayuda con tu compra?</h3>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
                            <a href="tel:+56984534364" className="flex items-center gap-3 text-lg hover:text-red-500 transition-colors">
                                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                                    <Phone size={24} />
                                </div>
                                <span className="font-bold">+56 9 8453 4364</span>
                            </a>
                            <a href="mailto:ventas@mundoasiatico.cl" className="flex items-center gap-3 text-lg hover:text-red-500 transition-colors">
                                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                                    <Mail size={24} />
                                </div>
                                <span className="font-bold">ventas@mundoasiatico.cl</span>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
