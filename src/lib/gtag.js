/**
 * Google Ads – seguimiento de conversiones.
 * IDs entregados por el cliente (cuenta ventasweb@mundoasiatico.cl).
 * Se pueden sobreescribir con variables de entorno de Vercel.
 */
export const GOOGLE_ADS_ID =
    process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || 'AW-18436085852';

export const GOOGLE_ADS_CONVERSION_LABEL =
    process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL || 'flDNCMeOtYAdENywgddE';

/** Garantiza que window.gtag exista (encola en dataLayer hasta que cargue gtag.js). */
export function ensureGtag() {
    if (typeof window === 'undefined') return null;
    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag !== 'function') {
        window.gtag = function () { window.dataLayer.push(arguments); };
    }
    return window.gtag;
}

/**
 * Registra la conversión de Google Ads (página de agradecimiento del pedido).
 * Se ejecuta una sola vez por pedido aunque el cliente recargue /exito.
 */
export function trackAdsConversion({ value, transactionId } = {}) {
    const gtag = ensureGtag();
    if (!gtag) return;

    const key = `ma_ads_conv_${transactionId ?? 'sin-id'}`;
    try {
        if (transactionId && localStorage.getItem(key)) return;
        if (transactionId) localStorage.setItem(key, '1');
    } catch { /* storage bloqueado: se envía igual */ }

    const amount = Number(value);
    gtag('event', 'conversion', {
        send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`,
        value: Number.isFinite(amount) && amount > 0 ? amount : 1.0,
        currency: 'CLP',
        ...(transactionId ? { transaction_id: String(transactionId) } : {}),
    });
}
