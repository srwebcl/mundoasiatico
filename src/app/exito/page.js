'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, XCircle, Loader2, MessageCircle, Home, ShoppingBag, MapPin } from 'lucide-react';
import api from '@/lib/api';
import Link from 'next/link';

export default function ExitoPage() {
    const router       = useRouter();
    const searchParams = useSearchParams();
    const [state,  setState]  = useState('loading'); // 'loading' | 'success' | 'error' | 'pending'
    const [order,  setOrder]  = useState(null);
    const [error,  setError]  = useState('');

    useEffect(() => {
        // Transbank devuelve el token en la URL tras el pago:
        // GET /exito?token_ws=XXXX  → pago OK
        // GET /exito?TBK_TOKEN=XXXX → usuario canceló / error
        const token_ws  = searchParams.get('token_ws');
        const tbk_token = searchParams.get('TBK_TOKEN');

        const pending = JSON.parse(localStorage.getItem('ma_pending_order') || 'null');

        if (tbk_token || (!token_ws && !pending)) {
            // El usuario canceló en Transbank o llegó sin pasar por checkout
            setState('error');
            setError(tbk_token ? 'El pago fue cancelado o rechazado por Transbank.' : 'No encontramos una orden reciente.');
            return;
        }

        if (token_ws) {
            // Consultamos la orden guardada en backend (el backend la confirmó vía webhook o retorno)
            const orderId = pending?.order_id;
            if (orderId) {
                api.getOrder(orderId)
                    .then(res => {
                        setOrder({ ...res.data, customer: pending.customer, shipping_method: pending.shipping_method, shipping_address: pending.shipping_address });
                        setState('success');
                        localStorage.removeItem('ma_pending_order');
                    })
                    .catch(() => {
                        // Igual mostramos éxito con los datos locales
                        setOrder({ id: orderId, ...pending, total: null });
                        setState('success');
                        localStorage.removeItem('ma_pending_order');
                    });
            } else {
                setState('success');
                setOrder({ id: '—', customer: {}, shipping_method: '', total: null });
            }
            return;
        }

        // Si llegó directo (sin token) pero hay pending → mostrar pendiente
        if (pending) {
            setOrder({ id: pending.order_id, ...pending });
            setState('pending');
        }
    }, []);

    const handleWhatsApp = () => {
        const items   = order?.items?.map(i => `- ${i.qty ?? i.quantity}x ${i.name || i.nombre}`).join('\n') ?? '';
        const message = `Hola Mundo Asiático, realicé el pedido #${order?.id}.
Cliente: ${order?.customer?.name}
RUT: ${order?.customer?.rut}
Email: ${order?.customer?.email}
Total: $${order?.total?.toLocaleString() ?? '—'}
Detalle:
${items}
Método: ${order?.shipping_method === 'starken' ? 'Envío Starken' : order?.shipping_method === 'pm' ? 'Retiro Puerto Montt' : 'Retiro Santiago'}
Quedo atento a la confirmación.`;
        window.open(`https://wa.me/56955668391?text=${encodeURIComponent(message)}`, '_blank');
    };

    // ── Loading ──────────────────────────────────────────────────────────────
    if (state === 'loading') return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50">
            <div className="text-center space-y-4">
                <Loader2 className="w-12 h-12 animate-spin text-red-600 mx-auto" />
                <p className="text-zinc-500 font-medium">Verificando tu pago...</p>
            </div>
        </div>
    );

    // ── Error / Cancelado ────────────────────────────────────────────────────
    if (state === 'error') return (
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden text-center">
                <div className="bg-red-500 p-8 text-white">
                    <XCircle size={56} className="mx-auto mb-4 text-white" />
                    <h1 className="text-2xl font-bold mb-2">Pago no completado</h1>
                    <p className="opacity-90 text-sm">{error}</p>
                </div>
                <div className="p-8 space-y-4">
                    <p className="text-zinc-600 text-sm">Tu carrito sigue guardado. Puedes intentarlo nuevamente.</p>
                    <Link href="/checkout" className="block w-full bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition-colors">
                        Reintentar pago
                    </Link>
                    <Link href="/catalogo" className="block w-full bg-zinc-100 text-zinc-600 py-3 rounded-xl font-bold hover:bg-zinc-200 transition-colors">
                        Volver al catálogo
                    </Link>
                </div>
            </div>
        </div>
    );

    // ── Éxito ────────────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-zinc-50 py-12 px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom duration-500">

                {/* Header */}
                <div className="bg-green-500 p-8 text-center text-white">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                        <CheckCircle size={48} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">¡Pedido {state === 'pending' ? 'Registrado' : 'Exitoso'}!</h1>
                    <p className="opacity-90 text-sm">
                        {state === 'pending'
                            ? 'Tu pedido fue registrado. Aguarda la confirmación de pago.'
                            : 'Tu pago fue procesado correctamente. Recibirás un email de confirmación.'}
                    </p>
                </div>

                {/* Detalles */}
                <div className="p-8">
                    {order && (
                        <>
                            <div className="flex justify-between items-center border-b border-zinc-100 pb-6 mb-6">
                                <div>
                                    <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold">Número de Orden</p>
                                    <p className="text-2xl font-black text-zinc-900">#{order.id}</p>
                                </div>
                                {order.total && (
                                    <div className="text-right">
                                        <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold">Total Pagado</p>
                                        <p className="text-2xl font-black text-red-600">${order.total?.toLocaleString()}</p>
                                    </div>
                                )}
                            </div>

                            {/* Items */}
                            {order.items?.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="font-bold text-zinc-900 mb-3 flex items-center gap-2">
                                        <ShoppingBag size={18} className="text-red-500" /> Resumen del pedido
                                    </h3>
                                    <div className="bg-zinc-50 rounded-xl p-4 space-y-2">
                                        {order.items.map((item, i) => (
                                            <div key={i} className="flex justify-between text-sm">
                                                <span className="text-zinc-600">
                                                    <span className="font-bold text-zinc-900">{item.qty ?? item.quantity}x</span> {item.name || item.nombre}
                                                </span>
                                                <span className="font-medium">${((item.unit_price ?? item.total_price ?? 0)).toLocaleString()}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Datos de envío */}
                            {order.customer?.name && (
                                <div className="mb-8">
                                    <h3 className="font-bold text-zinc-900 mb-3 flex items-center gap-2">
                                        <MapPin size={18} className="text-blue-500" /> Datos de entrega
                                    </h3>
                                    <div className="bg-blue-50/50 rounded-xl p-4 text-sm text-zinc-700 space-y-1">
                                        <p><span className="font-bold">Cliente:</span> {order.customer.name}</p>
                                        <p><span className="font-bold">RUT:</span> {order.customer.rut}</p>
                                        <p><span className="font-bold">Método:</span> {order.shipping_method === 'santiago' ? 'Retiro en Santiago' : order.shipping_method === 'pm' ? 'Retiro en Puerto Montt' : 'Envío por Pagar (Starken)'}</p>
                                        {order.shipping_method === 'starken' && order.shipping_address && (
                                            <div className="pt-2 mt-1 border-t border-blue-100">
                                                <p>{order.shipping_address.street} #{order.shipping_address.number} {order.shipping_address.apto ? `Dpto ${order.shipping_address.apto}` : ''}</p>
                                                <p>{order.shipping_address.city}, {order.shipping_address.region}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {/* Acciones */}
                    <div className="space-y-3">
                        <button onClick={handleWhatsApp}
                            className="w-full bg-[#25D366] text-white py-4 rounded-xl font-bold hover:bg-[#1dbf57] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-green-200">
                            <MessageCircle size={24} /> Confirmar por WhatsApp
                        </button>
                        <Link href="/catalogo"
                            className="w-full bg-zinc-100 text-zinc-600 py-4 rounded-xl font-bold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2">
                            <Home size={20} /> Volver a la Tienda
                        </Link>
                    </div>
                </div>
            </div>

            {order?.customer?.email && (
                <p className="text-center text-zinc-400 text-sm mt-8">
                    Se envió una confirmación a <span className="font-bold">{order.customer.email}</span>
                </p>
            )}
        </div>
    );
}
