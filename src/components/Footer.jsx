import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, Car } from 'lucide-react';
import { MARCAS, CATEGORIAS } from '@/data/mockData';

export const Footer = () => {
    return (
        <footer className="bg-[#0a0a0a] text-zinc-400 pt-16 pb-8 border-t border-zinc-800">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* Brand Column */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="bg-white/10 p-1.5 rounded-lg">
                                <Car className="text-white w-6 h-6" />
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="font-black text-lg md:text-xl tracking-tighter text-white italic">MUNDO<span className="text-red-600">ASIÁTICO</span></span>
                            </div>
                        </Link>
                        <p className="text-sm leading-relaxed max-w-xs">
                            Especialistas en repuestos para vehículos chinos. Calidad garantizada, envíos a todo Chile y la mejor asesoría técnica.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"><Facebook size={16} /></a>
                            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"><Instagram size={16} /></a>
                            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"><Twitter size={16} /></a>
                        </div>
                    </div>

                    {/* Links Column */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-sm tracking-wider uppercase">Navegación</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/" className="hover:text-red-500 transition-colors">Inicio</Link></li>
                            <li><Link href="/catalogo" className="hover:text-red-500 transition-colors">Catálogo Completo</Link></li>
                            <li><Link href="/ofertas" className="hover:text-red-500 transition-colors">Ofertas Flash</Link></li>
                            <li><Link href="/contacto" className="hover:text-red-500 transition-colors">Contacto</Link></li>
                        </ul>
                    </div>

                    {/* Categories Column */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-sm tracking-wider uppercase">Marcas Principales</h4>
                        <ul className="space-y-2 text-sm grid grid-cols-2 gap-x-4">
                            {MARCAS.slice(0, 12).map(marca => (
                                <li key={marca}>
                                    <Link href={`/catalogo?marca=${marca}`} className="hover:text-red-500 transition-colors">{marca}</Link>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-4">
                            <Link href="/catalogo" className="text-xs text-red-500 hover:text-red-400 font-bold underline">VER TODAS ({MARCAS.length})</Link>
                        </div>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-sm tracking-wider uppercase">Contacto</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin className="text-red-600 mt-0.5 shrink-0" size={18} />
                                <span>Av. 10 de Julio Huamachuco 1234, Santiago, Región Metropolitana</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="text-red-600 shrink-0" size={18} />
                                <span>+56 9 1234 5678</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="text-red-600 shrink-0" size={18} />
                                <span>contacto@mundoasiatico.cl</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                    <p>© {new Date().getFullYear()} Mundo Asiático. Todos los derechos reservados.</p>
                    <div className="flex gap-6">
                        <Link href="/terminos" className="hover:text-white transition-colors">Términos y Condiciones</Link>
                        <Link href="/privacidad" className="hover:text-white transition-colors">Política de Privacidad</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
