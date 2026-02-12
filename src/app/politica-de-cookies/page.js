import React from 'react';
import { Cookie, ShieldCheck, Settings, Info } from 'lucide-react';

export const metadata = {
    title: "Política de Cookies | Mundo Asiático",
    description: "Información sobre el uso de cookies en Mundo Asiático.",
};

export default function CookiesPage() {
    return (
        <div className="min-h-screen bg-zinc-50 py-12 px-4 md:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-zinc-100 overflow-hidden">

                {/* Header */}
                <div className="bg-zinc-900 text-white p-8 md:p-12 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-yellow-600/10 opacity-20"></div>
                    <Cookie className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
                    <h1 className="text-3xl md:text-4xl font-black italic tracking-tighter mb-2">POLÍTICA DE COOKIES</h1>
                    <p className="text-zinc-400">Mundo Asiático</p>
                </div>

                <div className="p-8 md:p-12 space-y-8 text-zinc-700 leading-relaxed">

                    <section>
                        <h2 className="flex items-center gap-2 text-xl font-bold text-zinc-900 mb-4">
                            <Info className="text-yellow-600" size={24} /> 1. ¿Qué son las Cookies?
                        </h2>
                        <p>
                            Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (ordenador, móvil o tablet) cuando visitas un sitio web.
                            No son virus ni programas maliciosos. Se utilizan para recordar tus preferencias, mejorar tu experiencia de navegación y recopilar información estadística anónima.
                        </p>
                    </section>

                    <section>
                        <h2 className="flex items-center gap-2 text-xl font-bold text-zinc-900 mb-4">
                            <ShieldCheck className="text-yellow-600" size={24} /> 2. ¿Qué tipos de cookies utilizamos?
                        </h2>
                        <ul className="space-y-4">
                            <li className="bg-zinc-50 p-4 rounded-lg border border-zinc-200">
                                <strong className="text-zinc-900 block mb-1">Cookies Esenciales</strong>
                                Son necesarias para que el sitio web funcione correctamente. Permiten, por ejemplo, mantener tu sesión iniciada, recordar los productos de tu carrito de compras y procesar pagos de forma segura. Sin estas cookies, el sitio no puede funcionar.
                            </li>
                            <li className="bg-zinc-50 p-4 rounded-lg border border-zinc-200">
                                <strong className="text-zinc-900 block mb-1">Cookies de Analítica</strong>
                                Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web (qué páginas visitan más, cuánto tiempo permanecen, etc.). Esta información es anónima y la utilizamos para mejorar nuestros contenidos y servicios. Utilizamos herramientas como Google Analytics.
                            </li>
                            <li className="bg-zinc-50 p-4 rounded-lg border border-zinc-200">
                                <strong className="text-zinc-900 block mb-1">Cookies de Funcionalidad</strong>
                                Permiten recordar tus preferencias, como el idioma o tu región, para ofrecerte una experiencia más personalizada en futuras visitas.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="flex items-center gap-2 text-xl font-bold text-zinc-900 mb-4">
                            <Settings className="text-yellow-600" size={24} /> 3. ¿Cómo gestionar o desactivar las cookies?
                        </h2>
                        <p className="mb-4">
                            Puedes permitir, bloquear o eliminar las cookies instaladas en tu equipo mediante la configuración de las opciones de tu navegador de internet.
                            Ten en cuenta que si bloqueas las cookies esenciales, es posible que algunos servicios o funcionalidades del sitio web no funcionen correctamente.
                        </p>
                        <p className="text-sm text-zinc-500">
                            Para más información sobre cómo gestionar las cookies en los navegadores más comunes:
                        </p>
                        <ul className="list-disc pl-6 mt-2 text-sm text-zinc-600 space-y-1">
                            <li><a href="https://support.google.com/chrome/answer/95647?hl=es" target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600">Google Chrome</a></li>
                            <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600">Safari</a></li>
                            <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600">Mozilla Firefox</a></li>
                        </ul>
                    </section>

                    <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-200 mt-8">
                        <h3 className="font-bold text-lg mb-2">Contacto</h3>
                        <p>Si tienes dudas sobre nuestra política de cookies, puedes contactarnos en:</p>
                        <ul className="mt-2 text-sm space-y-1">
                            <li><strong>Email:</strong> ventasweb@mundoasiatico.cl</li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
}
