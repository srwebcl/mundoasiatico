import React from 'react';
import { FileCheck, Truck, CreditCard, RefreshCw, AlertTriangle } from 'lucide-react';

export const metadata = {
    title: "Términos y Condiciones | Mundo Asiático",
    description: "Términos y condiciones de uso, compra y despacho en Mundo Asiático.",
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-zinc-50 py-12 px-4 md:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-zinc-100 overflow-hidden">

                {/* Header */}
                <div className="bg-zinc-900 text-white p-8 md:p-12 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-600/10 opacity-20"></div>
                    <FileCheck className="w-16 h-16 mx-auto mb-4 text-blue-500" />
                    <h1 className="text-3xl md:text-4xl font-black italic tracking-tighter mb-2">TÉRMINOS Y CONDICIONES</h1>
                    <p className="text-zinc-400">Mundo Asiático - Repuestos para Vehículos Chinos</p>
                </div>

                <div className="p-8 md:p-12 space-y-8 text-zinc-700 leading-relaxed">

                    <section>
                        <p className="text-lg">
                            Bienvenido a <strong>Mundo Asiático</strong>. Al acceder y utilizar nuestro sitio web, aceptas los siguientes términos y condiciones.
                            Te recomendamos leerlos detenidamente antes de realizar cualquier compra.
                        </p>
                        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mt-4 text-sm text-amber-800">
                            <strong>Nota Importante:</strong> [FALTA RAZÓN SOCIAL] (en adelante "La Empresa") RUT [FALTA RUT], es la propietaria y operadora de este sitio.
                        </div>
                    </section>

                    <section>
                        <h2 className="flex items-center gap-2 text-xl font-bold text-zinc-900 mb-4">
                            <CreditCard className="text-blue-600" size={24} /> 1. Precios y Pagos
                        </h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Todos los precios están expresados en pesos chilenos e incluyen IVA.</li>
                            <li>Nos reservamos el derecho de modificar los precios sin previo aviso. Sin embargo, se respetará el precio de los pedidos ya confirmados y pagados.</li>
                            <li>Los pagos se pueden realizar mediante transferencia bancaria o tarjetas de crédito/débito a través de las pasarelas habilitadas en el sitio.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="flex items-center gap-2 text-xl font-bold text-zinc-900 mb-4">
                            <Truck className="text-blue-600" size={24} /> 2. Despachos y Envíos
                        </h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Realizamos envíos a todo Chile a través de empresas de transporte externas (Starken, Chilexpress, etc.).</li>
                            <li>Los plazos de entrega son estimados y dependen de la empresa de transporte. Mundo Asiático no se responsabiliza por retrasos imputables al transportista.</li>
                            <li>El costo del envío es por pagar o se calculará e incluirá en el total de la compra según corresponda.</li>
                            <li>Es responsabilidad del cliente ingresar una dirección de entrega correcta y válida.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="flex items-center gap-2 text-xl font-bold text-zinc-900 mb-4">
                            <RefreshCw className="text-blue-600" size={24} /> 3. Cambios y Devoluciones (Garantía Legal)
                        </h2>
                        <p className="mb-2">Cumplimos estrictamente con la Ley del Consumidor de Chile (Ley 19.496):</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Garantía 6x3:</strong> Si el producto presenta fallas de fábrica dentro de los 6 meses siguientes a la compra, puedes optar por el cambio, reparación gratuita o la devolución del dinero.</li>
                            <li>Para hacer válida la garantía, debes presentar la boleta o factura de compra.</li>
                            <li><strong>Derecho a Retracto:</strong> [COMPLETAR: ¿Ofrecen derecho a retracto de 10 días para compras online? La ley lo exige a menos que se estipule explicitamente lo contrario].</li>
                            <li>Los cambios por gusto o error en la compra (compatibilidad) están sujetos a evaluación y el producto debe estar sin uso, sellado y en su embalaje original. Los costos de envío en estos casos corren por cuenta del cliente.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="flex items-center gap-2 text-xl font-bold text-zinc-900 mb-4">
                            <AlertTriangle className="text-blue-600" size={24} /> 4. Responsabilidad
                        </h2>
                        <p>
                            Mundo Asiático no se hace responsable por el mal uso o instalación incorrecta de los repuestos adquiridos.
                            Recomendamos que la instalación sea realizada por personal técnico calificado. Asegúrate de verificar la compatibilidad del repuesto (Modelo, Año, Motor, VIN) antes de comprar o instalar.
                        </p>
                    </section>

                    <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-200 mt-8">
                        <h3 className="font-bold text-lg mb-2">Contacto Legal</h3>
                        <p>Para consultas sobre términos y condiciones:</p>
                        <ul className="mt-2 text-sm space-y-1">
                            <li><strong>Email:</strong> ventasweb@mundoasiatico.cl</li>
                            <li><strong>Teléfono:</strong> +569 7160 2029</li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
}
