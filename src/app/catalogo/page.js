import Catalog from "@/components/Catalog";
import { Suspense } from "react";

export const metadata = {
    title: 'Catálogo de Repuestos para Autos Chinos | Mundo Asiático Chile',
    description: 'Encuentra repuestos originales y alternativos para Chery, MG, JAC, Great Wall, BYD, DFSK, BAIC y más marcas chinas. Filtros, frenos, sensores, inyección y mucho más. Despacho a todo Chile.',
    keywords: [
        'catálogo repuestos autos chinos Chile',
        'repuestos Chery online Chile',
        'repuestos MG Chile precio',
        'repuestos JAC tienda online',
        'comprar repuestos autos chinos',
        'filtros aceite autos chinos',
        'frenos autos chinos Chile',
        'sensores repuestos Chile',
    ],
    openGraph: {
        title: 'Catálogo Completo de Repuestos | Mundo Asiático',
        description: 'Repuestos para Chery, MG, JAC, Great Wall y más. Despacho a todo Chile.',
        url: 'https://mundoasiatico.cl/catalogo',
        type: 'website',
    },
    alternates: {
        canonical: 'https://mundoasiatico.cl/catalogo',
    },
};

export default function CatalogPage() {
    return (
        <Suspense fallback={<div className="container mx-auto p-20 text-center">Cargando catálogo...</div>}>
            <Catalog />
        </Suspense>
    );
}
