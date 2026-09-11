import { NewsSection } from "@/components/NewsSection";

export const metadata = {
    title: "Noticias y Novedades | Mundo Asiático Chile",
    description: "Mantente informado con las últimas noticias y eventos de repuestos Mundo Asiático en Chile.",
};

export default function NoticiasPage() {
    return (
        <main className="min-h-screen bg-zinc-50">
            {/* Header (mismo formato que /contacto) */}
            <div className="max-w-6xl mx-auto px-4 md:px-8 pt-12 text-center">
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
