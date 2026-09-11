import { NewsSection } from "@/components/NewsSection";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
    title: "Noticias y Novedades | Mundo Asiático Chile",
    description: "Mantente informado con las últimas noticias y eventos de repuestos Mundo Asiático en Chile.",
};

export default function NoticiasPage() {
    return (
        <main className="flex flex-col min-h-screen pt-24 bg-zinc-50">
            <div className="container mx-auto px-4 mt-6">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-500 font-bold hover:text-red-600 transition-colors">
                    <ArrowLeft size={16} /> Volver al Inicio
                </Link>
            </div>

            {/* Header */}
            <div className="container mx-auto px-4 text-center mt-8 mb-4">
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-black italic text-zinc-900 mb-4 tracking-tighter max-w-full">
                    NOTICIAS Y <span className="text-red-600">NOVEDADES</span>
                </h1>
                <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
                    Mantente informado con las últimas noticias sobre repuestos, vehículos chinos y novedades de Mundo Asiático en Chile.
                </p>
            </div>

            <NewsSection showHeader={false} />
        </main>
    );
}
