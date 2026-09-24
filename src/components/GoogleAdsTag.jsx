'use client';
import Script from 'next/script';
import { GOOGLE_ADS_ID } from '@/lib/gtag';

/**
 * Etiqueta de Google Ads (AW-…) en todas las páginas.
 * gtag.js ya lo carga MarketingScriptsManager con el ID de Analytics (G-…, admin);
 * aquí solo se define window.gtag y se agrega el comando config de Ads. Si ese script
 * no estuviera activo en el admin, se carga gtag.js con el ID de Ads como respaldo.
 */
export default function GoogleAdsTag() {
    return (
        <Script id="google-ads-tag" strategy="afterInteractive">
            {`
                window.dataLayer = window.dataLayer || [];
                window.gtag = window.gtag || function(){ dataLayer.push(arguments); };
                gtag('js', new Date());
                gtag('config', '${GOOGLE_ADS_ID}');
                setTimeout(function () {
                    if (!document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
                        var s = document.createElement('script');
                        s.async = true;
                        s.src = 'https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}';
                        document.head.appendChild(s);
                    }
                }, 8000);
            `}
        </Script>
    );
}
