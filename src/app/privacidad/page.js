import React from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export const metadata = {
    title: "Política de Privacidad | Mundo Asiático",
    description: "Conoce cómo protegemos tus datos y tu privacidad en Mundo Asiático.",
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-zinc-50 py-12 px-4 md:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-zinc-100 overflow-hidden">

                {/* Header */}
                <div className="bg-zinc-900 text-white p-8 md:p-12 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-red-600/10 opacity-20"></div>
                    <Shield className="w-16 h-16 mx-auto mb-4 text-red-500" />
                    <h1 className="text-3xl md:text-4xl font-black italic tracking-tighter mb-2">POLÍTICA DE PRIVACIDAD</h1>
                    <p className="text-zinc-400">Última actualización: {new Date().toLocaleDateString('es-CL')}</p>
                </div>

                <div className="p-8 md:p-12 space-y-8 text-zinc-700 leading-relaxed">

                    <section>
                        <h2 className="flex items-center gap-2 text-xl font-bold text-zinc-900 mb-4">
                            <Lock className="text-red-600" size={24} /> 1. Información General
                        </h2>
                        <p className="mb-4">
                            En <strong>Mundo Asiático</strong>, valoramos tu privacidad y nos comprometemos a proteger tus datos personales.
                            Esta política explica cómo recopilamos, usamos y protegemos la información que nos proporcionas a través de nuestro sitio web.
                        </p>
                        <p>
                            Al utilizar nuestros servicios, aceptas las prácticas descritas en esta política. Si tienes alguna duda, puedes contactarnos en
                            <a href="mailto:ventasweb@mundoasiatico.cl" className="text-red-600 font-bold hover:underline ml-1">ventasweb@mundoasiatico.cl</a>.
                        </p>
                    </section>

                    <section>
                        <h2 className="flex items-center gap-2 text-xl font-bold text-zinc-900 mb-4">
                            <Eye className="text-red-600" size={24} /> 2. Información que Recopilamos
                        </h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Datos de Identificación:</strong> Nombre, RUT, dirección, teléfono y correo electrónico al momento de cotizar o comprar.</li>
                            <li><strong>Datos de Navegación:</strong> Dirección IP, tipo de dispositivo, navegador y páginas visitadas para mejorar tu experiencia.</li>
                            <li><strong>Datos de Transacción:</strong> Detalles de los productos adquiridos. <strong>No almacenamos datos de tarjetas de crédito o bancarios</strong>; estos son procesados de forma segura por pasarelas de pago externas.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="flex items-center gap-2 text-xl font-bold text-zinc-900 mb-4">
                            <FileText className="text-red-600" size={24} /> 3. Uso de la Información
                        </h2>
                        <p className="mb-4">Utilizamos tus datos exclusivamente para los siguientes fines:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Procesar y gestionar tus pedidos y cotizaciones.</li>
                            <li>Comunicarnos contigo sobre el estado de tu compra o responder consultas.</li>
                            <li>Enviar información sobre ofertas y productos (solo si has aceptado recibir comunicaciones).</li>
                            <li>Cumplir con obligaciones legales y fiscales (como la emisión de boletas o facturas).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 mb-4">4. Compartir Información</h2>
                        <p>
                            No vendemos ni alquilamos tus datos personales a terceros. Solo compartimos información estrictamente necesaria con:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>Proveedores de servicios logísticos para realizar los despachos.</li>
                            <li>Pasarelas de pago para procesar las transacciones.</li>
                            <li>Autoridades legales si así lo requiere la ley.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 mb-4">5. Tus Derechos</h2>
                        <p>
                            De acuerdo a la legislación chilena, tienes derecho a acceder, rectificar o eliminar tus datos personales.
                            Para ejercer estos derechos, por favor contáctanos a nuestro correo o teléfono oficial.
                        </p>
                    </section>

                    <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-200 mt-8">
                        <h3 className="font-bold text-lg mb-2">Contacto de Privacidad</h3>
                        <p>Si tienes preguntas sobre nuestra política de privacidad, contáctanos:</p>
                        <ul className="mt-2 text-sm space-y-1">
                            <li><strong>Email:</strong> ventasweb@mundoasiatico.cl</li>
                            <li><strong>Teléfono:</strong> +569 7160 2029</li>
                            <li><strong>Dirección:</strong> Av. Concha y Toro 3063 Local 24, Puente Alto, Santiago</li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
}
