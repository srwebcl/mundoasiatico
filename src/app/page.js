import { Hero } from "@/components/Hero";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, CreditCard, PenTool } from "lucide-react";
import { CATEGORIAS } from "@/data/mockData";

export default function Home() {
    return (
        <main className="flex flex-col min-h-screen">
            <Hero />

            {/* Benefits Section */}
            <section className="py-20 bg-zinc-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600 mb-4">
                                <ShieldCheck size={24} />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Garantía Asegurada</h3>
                            <p className="text-zinc-500 text-sm">Todos nuestros repuestos cuentan con garantía de fábrica y soporte técnico.</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                                <Truck size={24} />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Despacho Nacional</h3>
                            <p className="text-zinc-500 text-sm">Envíos rápidos y seguros a todo Chile. Seguimiento en tiempo real.</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-4">
                                <CreditCard size={24} />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Pago Seguro</h3>
                            <p className="text-zinc-500 text-sm">Transbank Webpay, Transferencias y facilidades de pago para empresas.</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-4">
                                <PenTool size={24} />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Servicio Experto</h3>
                            <p className="text-zinc-500 text-sm">Asesoría técnica especializada en vehículos chinos. <br />¿Dudas? Contáctanos.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Preview */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <span className="text-red-600 font-bold text-sm tracking-wider uppercase">Lo que necesitas</span>
                            <h2 className="text-3xl md:text-4xl font-black italic mt-2 text-zinc-900">BUSCA POR <span className="text-zinc-400">CATEGORÍA</span></h2>
                        </div>
                        <Link href="/catalogo" className="hidden md:flex items-center gap-2 font-bold hover:gap-3 transition-all">
                            VER TODO <ArrowRight size={20} className="text-red-600" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                        {CATEGORIAS.map((cat) => (
                            <Link
                                key={cat.id}
                                href={`/catalogo?categoria=${cat.id}`}
                                className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-zinc-100 overflow-hidden flex flex-col aspect-square"
                            >
                                {/* Image Container */}
                                <div className="absolute inset-0 z-0">
                                    <img
                                        src={cat.image}
                                        alt={cat.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Gradient Overlay for Text Readability */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                </div>

                                {/* Content - positioned at bottom */}
                                <div className="relative z-10 mt-auto p-4 w-full">
                                    <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white mb-2 shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                        <span className="text-xl">{cat.icon}</span>
                                    </div>
                                    <span className="block font-bold text-white text-lg md:text-xl leading-tight group-hover:text-red-400 transition-colors">
                                        {cat.name}
                                    </span>
                                    <span className="text-xs text-zinc-300 font-medium mt-1 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                                        Explorar <ArrowRight size={12} />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-8 text-center md:hidden">
                        <Link href="/catalogo" className="inline-flex items-center gap-2 font-bold bg-zinc-900 text-white px-6 py-3 rounded-full">
                            VER CATÁLOGO <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-[#0a0a0a] text-white overflow-hidden relative">
                <div className="absolute inset-0 bg-red-600/10 bg-[radial-gradient(#e11d48_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h2 className="text-3xl md:text-5xl font-black italic mb-6">¿NO ENCUENTRAS TU REPUESTO?</h2>
                    <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-10">
                        Contamos con el stock más grande de Chile para marcas como Chery, MG, JAC y Great Wall.
                        Si no lo ves en la web, ¡escríbenos! Lo tenemos en bodega.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/contacto" className="px-8 py-4 bg-red-600 rounded-full font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-900/50">
                            CONTACTAR VENTAS
                        </Link>
                        <Link href="/catalogo" className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full font-bold hover:bg-white/20 transition-colors">
                            BUSCAR EN CATÁLOGO
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
