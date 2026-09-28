'use client';
import { Suspense, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import api from '@/lib/api';

/**
 * Página a la que Banchile devuelve al cliente después de pagar:
 *   /checkout/return?token_ws=ORD-<id>-<timestamp>
 *
 * 1. Le pide al backend que consulte a Banchile el estado real del pago
 *    (POST /api/checkout/return), lo que marca la orden como pagada, descuenta
 *    stock y envía el correo de confirmación.
 * 2. Redirige a /exito (pago OK / pendiente) o a /exito?TBK_TOKEN=… (rechazado).
 */
function ReturnContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const done = useRef(false);

    useEffect(() => {
        if (done.current) return;
        done.current = true;

        const reference = searchParams.get('token_ws') || searchParams.get('TBK_TOKEN');
        if (!reference) {
            router.replace('/exito');
            return;
        }

        api.request('/checkout/return', {
            method: 'POST',
            body: JSON.stringify({ token_ws: reference }),
        })
            .then((res) => {
                if (res?.status === 'failed' || res?.status === 'cancelled') {
                    router.replace(`/exito?TBK_TOKEN=${encodeURIComponent(reference)}`);
                } else {
                    router.replace(`/exito?token_ws=${encodeURIComponent(reference)}`);
                }
            })
            .catch(() => {
                // Si la consulta falla, /exito igual muestra el pedido; el webhook
                // de Banchile puede confirmar el pago después.
                router.replace(`/exito?token_ws=${encodeURIComponent(reference)}`);
            });
    }, [router, searchParams]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50">
            <div className="text-center space-y-4">
                <Loader2 className="w-12 h-12 animate-spin text-red-600 mx-auto" />
                <p className="text-zinc-500 font-medium">Confirmando tu pago con Banchile...</p>
            </div>
        </div>
    );
}

export default function CheckoutReturnPage() {
    return (
        <Suspense fallback={null}>
            <ReturnContent />
        </Suspense>
    );
}
