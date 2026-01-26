import Catalog from "@/components/Catalog";
import { Suspense } from "react";

export const metadata = {
    title: "Catálogo de Repuestos | Mundo Asiático",
    description: "Encuentra el repuesto que necesitas.",
};

export default function CatalogPage() {
    return (
        <Suspense fallback={<div className="container mx-auto p-20 text-center">Cargando catálogo...</div>}>
            <Catalog />
        </Suspense>
    );
}
