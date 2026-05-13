'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import api from '@/lib/api';

export default function MarketingScriptsManager() {
    const [scripts, setScripts] = useState([]);

    useEffect(() => {
        const fetchScripts = async () => {
            try {
                // Hacemos la llamada al backend para obtener los scripts activos
                const response = await api.getMarketingScripts();
                if (response && Array.isArray(response)) {
                    setScripts(response);
                }
            } catch (error) {
                console.error('Error cargando Marketing Scripts:', error);
            }
        };

        fetchScripts();
    }, []);

    if (scripts.length === 0) return null;

    return (
        <>
            {scripts.map((script) => {
                // Identificamos GTM o Analytics para inyectar su ID directamente
                if (script.type === 'analytics') {
                    // Esperamos que "code" sea el ID de Google Analytics (ej: G-XXXXX)
                    return (
                        <Script
                            key={script.id}
                            src={`https://www.googletagmanager.com/gtag/js?id=${script.code}`}
                            strategy="afterInteractive"
                            onLoad={() => {
                                window.dataLayer = window.dataLayer || [];
                                function gtag() { window.dataLayer.push(arguments); }
                                gtag('js', new Date());
                                gtag('config', script.code);
                            }}
                        />
                    );
                }

                if (script.type === 'gtm') {
                    // Esperamos que "code" sea el ID de GTM (ej: GTM-XXXXX)
                    return (
                        <Script
                            key={script.id}
                            id={`gtm-${script.id}`}
                            strategy="afterInteractive"
                            dangerouslySetInnerHTML={{
                                __html: `
                                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                                })(window,document,'script','dataLayer','${script.code}');
                                `
                            }}
                        />
                    );
                }

                // Para pixels de meta y otros scripts personalizados en crudo
                return (
                    <Script
                        key={script.id}
                        id={`custom-script-${script.id}`}
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{ __html: script.code }}
                    />
                );
            })}
        </>
    );
}
