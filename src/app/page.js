import { Hero } from "@/components/Hero";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, CreditCard, PenTool } from "lucide-react";
import { CATEGORIAS } from "@/data/mockData";
import { BrandCarousel } from "@/components/BrandCarousel";

export default function Home() {
    return (
        <main className="flex flex-col min-h-screen">
            <Hero />

            {/* Brand Carousel */}
            <BrandCarousel />

            {/* Benefits Section */}
            <section className="py-24 bg-zinc-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Card 1 */}
                        <div className="group bg-white p-8 rounded-xl border border-zinc-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-red-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500"></div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-red-600 text-white rounded-lg flex items-center justify-center mb-6 shadow-lg shadow-red-200 group-hover:scale-110 transition-transform duration-300">
                                    <ShieldCheck size={28} />
                                </div>
                                <h3 className="font-bold text-xl text-zinc-900 mb-3 group-hover:text-red-600 transition-colors">Garantía Total</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed">
                                    Cada repuesto está certificado. Si no es lo que necesitas, lo cambiamos sin letra chica.
                                </p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="group bg-white p-8 rounded-xl border border-zinc-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500"></div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-zinc-900 text-white rounded-lg flex items-center justify-center mb-6 shadow-lg shadow-zinc-200 group-hover:scale-110 transition-transform duration-300">
                                    <Truck size={28} />
                                </div>
                                <h3 className="font-bold text-xl text-zinc-900 mb-3 group-hover:text-blue-600 transition-colors">Despacho Veloz</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed">
                                    Envíos a todo Chile el mismo día. Seguimiento en tiempo real vía WhatsApp.
                                </p>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="group bg-white p-8 rounded-xl border border-zinc-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-green-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500"></div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-zinc-900 text-white rounded-lg flex items-center justify-center mb-6 shadow-lg shadow-zinc-200 group-hover:scale-110 transition-transform duration-300">
                                    <CreditCard size={28} />
                                </div>
                                <h3 className="font-bold text-xl text-zinc-900 mb-3 group-hover:text-green-600 transition-colors">Pago Flexible</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed">
                                    Paga seguro con Webpay. Aceptamos tarjetas, transferencias y pago rut.
                                </p>
                            </div>
                        </div>

                        {/* Card 4 */}
                        <div className="group bg-white p-8 rounded-xl border border-zinc-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500"></div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-zinc-900 text-white rounded-lg flex items-center justify-center mb-6 shadow-lg shadow-zinc-200 group-hover:scale-110 transition-transform duration-300">
                                    <PenTool size={28} />
                                </div>
                                <h3 className="font-bold text-xl text-zinc-900 mb-3 group-hover:text-purple-600 transition-colors">Soporte Experto</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed">
                                    ¿Dudas con la compatibilidad? Nuestros expertos te ayudan a elegir vía WhatsApp.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Preview */}
            <section className="py-24 bg-white relative overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-zinc-100/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div>
                            <span className="inline-block py-1 px-3 rounded-full bg-red-100 text-red-600 font-bold tracking-wider text-xs uppercase mb-4">
                                Lo que necesitas
                            </span>
                            <h2 className="text-4xl md:text-5xl font-black italic text-zinc-900 leading-tight">
                                BUSCA POR <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500">CATEGORÍA</span>
                            </h2>
                        </div>
                        <Link href="/catalogo" className="hidden md:inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-zinc-200 text-zinc-700 font-bold hover:border-red-600 hover:text-red-600 transition-all shadow-sm hover:shadow-md group">
                            VER TODO EL CATÁLOGO <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                        {CATEGORIAS.map((cat) => (
                            <Link
                                key={cat.id}
                                href={`/catalogo?categoria=${cat.id}`}
                                className="group relative bg-zinc-50 rounded-2xl p-4 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-zinc-100 overflow-hidden flex flex-col aspect-[4/5]"
                            >
                                {/* Image Container */}
                                <div className="absolute inset-0 z-0">
                                    <img
                                        src={cat.image}
                                        alt={cat.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                                    />
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                                </div>

                                {/* Content - positioned at bottom */}
                                <div className="relative z-10 mt-auto w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <div className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center text-white mb-3 shadow-lg group-hover:bg-red-600 group-hover:border-red-500 transition-all duration-300">
                                        <span className="text-2xl">{cat.icon}</span>
                                    </div>
                                    <span className="block font-black text-white text-xl leading-tight mb-2">
                                        {cat.name}
                                    </span>
                                    <div className="h-0 group-hover:h-6 overflow-hidden transition-all duration-300">
                                        <span className="text-xs text-zinc-300 font-bold uppercase tracking-wider inline-flex items-center gap-2">
                                            Ver productos <ArrowRight size={12} className="text-red-500" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-12 text-center md:hidden">
                        <Link href="/catalogo" className="inline-flex items-center gap-2 font-bold bg-zinc-900 text-white px-8 py-4 rounded-full shadow-lg hover:bg-zinc-800 transition-colors w-full justify-center">
                            VER CATÁLOGO COMPLETO <ArrowRight size={20} />
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
