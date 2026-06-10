'use client';
import React, { useState, useEffect } from 'react';
import { Package, ChevronRight, Clock, CheckCircle, Truck, XCircle, Loader2, ArrowLeft, ShoppingBag } from 'lucide-react';
import api from '@/lib/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function MisOrdenesPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const user = api.getLocalUser();
        if (!user) {
            router.push('/login?redirect=/mi-cuenta/ordenes');
            return;
        }

        const fetchOrders = async () => {
            try {
                const res = await api.getMyOrders();
                setOrders(res.data || []);
            } catch (err) {
                console.error("Error cargando órdenes:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [router]);

    const getStatusStyles = (status) => {
        switch (status) {
            case 'paid':      return { color: 'bg-green-100 text-green-700', icon: <CheckCircle size={14} />, label: 'Pagado' };
            case 'pending':   return { color: 'bg-amber-100 text-amber-700', icon: <Clock size={14} />, label: 'Pendiente' };
            case 'shipped':   return { color: 'bg-blue-100 text-blue-700',   icon: <Truck size={14} />, label: 'Enviado' };
            case 'cancelled': return { color: 'bg-zinc-100 text-zinc-500',   icon: <XCircle size={14} />, label: 'Cancelado' };
            case 'failed':    return { color: 'bg-red-100 text-red-700',     icon: <XCircle size={14} />, label: 'Fallido' };
            default:          return { color: 'bg-zinc-100 text-zinc-700',   icon: <Package size={14} />, label: status };
        }
    };

    if (loading) return (
        <div className="min-h-[70vh] flex items-center justify-center">
            <Loader2 className="animate-spin text-red-600" size={40} />
        </div>
    );

    return (
        <div className="bg-zinc-50 min-h-screen py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    
                    {/* Header */}
                    <div className="mb-10">
                        <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-red-600 transition-colors mb-4 group">
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="text-sm font-bold">Volver al inicio</span>
                        </Link>
                        <h1 className="text-4xl font-black text-zinc-900 tracking-tight">Mis Pedidos</h1>
                        <p className="text-zinc-500 mt-2">Gestiona tus compras y rastrea tus envíos.</p>
                    </div>

                    {orders.length === 0 ? (
                        <div className="bg-white rounded-3xl p-12 text-center border border-zinc-200 shadow-sm">
                            <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">📦</div>
                            <h2 className="text-xl font-bold text-zinc-900 mb-2">Aún no tienes pedidos</h2>
                            <p className="text-zinc-500 mb-8 max-w-sm mx-auto">Cuando realices una compra, aparecerá aquí para que puedas seguir su estado.</p>
                            <Link href="/catalogo" className="bg-red-600 text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-100">
                                Explorar Repuestos
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order) => {
                                const status = getStatusStyles(order.status);
                                return (
                                    <div key={order.id} className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden hover:border-red-200 transition-all group">
                                        <div className="p-6">
                                            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-600">
                                                        <ShoppingBag size={24} />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Orden #ORD-{order.id}</p>
                                                        <p className="text-sm font-bold text-zinc-900">{new Date(order.created_at).toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                                    </div>
                                                </div>
                                                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${status.color}`}>
                                                    {status.icon}
                                                    {status.label}
                                                </div>
                                            </div>

                                            <div className="border-t border-zinc-100 pt-4 flex items-center justify-between">
                                                <div>
                                                    <p className="text-xs text-zinc-400 mb-1">Total pagado</p>
                                                    <p className="text-lg font-black text-zinc-900">${(order.total_amount).toLocaleString('es-CL')}</p>
                                                </div>
                                                
                                                <div className="flex items-center gap-6">
                                                    <div className="hidden sm:block text-right">
                                                        <p className="text-xs text-zinc-400 mb-1">Ítems</p>
                                                        <p className="text-sm font-bold text-zinc-800">{order.items?.length || 0} productos</p>
                                                    </div>
                                                    <Link 
                                                        href={`/exito?order_id=${order.id}`} 
                                                        className="flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-600 transition-all"
                                                    >
                                                        Ver Detalle
                                                        <ChevronRight size={16} />
                                                    </Link>
                                                </div>
                                            </div>

                                            {/* Info de tracking si está enviado */}
                                            {order.status === 'shipped' && order.tracking_number && (
                                                <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-between gap-4 transition-all">
                                                    <div className="flex items-center gap-3">
                                                        <Truck className="text-blue-600" size={20} />
                                                        <div>
                                                            <p className="text-xs font-bold text-blue-800">Tu pedido está en camino</p>
                                                            <p className="text-xs text-blue-600">{order.shipping_carrier || 'Starken'}: {order.tracking_number}</p>
                                                        </div>
                                                    </div>
                                                    <a 
                                                        href={`https://www.starken.cl/seguimiento?codigo=${order.tracking_number}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-xs font-bold text-blue-700 underline hover:text-blue-900"
                                                    >
                                                        Seguir Envío
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    <div className="mt-12 p-8 bg-zinc-900 rounded-3xl text-white flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-xl font-bold mb-1">¿Necesitas ayuda con un pedido?</h3>
                            <p className="text-zinc-400 text-sm">Contáctanos por WhatsApp para una atención rápida.</p>
                        </div>
                        <a 
                            href="https://wa.me/56941737497" 
                            target="_blank" 
                            className="bg-green-500 text-white px-6 py-3 rounded-full font-bold hover:bg-green-600 transition-all flex items-center gap-2 shrink-0"
                        >
                            Hablar con Soporte
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
