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
            <NewsSection />
        </main>
    );
}
