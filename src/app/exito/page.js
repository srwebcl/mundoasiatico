'use client';
import { useRouter } from "next/navigation";
import { CheckCircle, MessageCircle, Home, ShoppingBag, MapPin } from "lucide-react";
import { useEffect, useState } from "react";


export default function SuccessPage() {
    const router = useRouter();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const lastOrder = localStorage.getItem('lastOrder');
        if (lastOrder) {
            setOrder(JSON.parse(lastOrder));
        } else {
            router.push('/');
        }
    }, []);

    if (!order) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div></div>;

    const handleWhatsApp = () => {
        const itemsList = order.items.map(i => `- ${i.qty}x ${i.nombre}`).join('\n');

        let addressText = '';
        if (order.shippingMethod === 'starken' && order.shippingAddress) {
            const { street, number, apto, city, region } = order.shippingAddress;
            addressText = `\n*Dirección de Envío:*\n${street} #${number} ${apto ? `Dpto/Casa ${apto}` : ''}\n${city}, ${region}`;
        }

        const message = `Hola Mundo Asiático, acabo de realizar el pedido #${order.id}.
        
*Cliente:* ${order.customer.name}
*RUT:* ${order.customer.rut}
*Email:* ${order.customer.email}
*Total:* $${order.total.toLocaleString()}

*Detalle:*
${itemsList}

*Método de entrega:* ${order.shippingMethod === 'starken' ? 'Envío por Pagar (Starken)' : order.shippingMethod === 'pm' ? 'Retiro Puerto Montt' : 'Retiro Santiago'}${addressText}

Quedo atento a la confirmación.`;

        window.open(`https://wa.me/56955668391?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-zinc-50 py-12 px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom duration-500">
                {/* Header */}
                <div className="bg-green-500 p-8 text-center text-white">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                        <CheckCircle size={48} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">¡Pedido Exitoso!</h1>
                    <p className="opacity-90">Gracias por tu compra. Tu orden ha sido registrada.</p>
                </div>

                {/* Order Details */}
                <div className="p-8">
                    <div className="flex justify-between items-center border-b border-zinc-100 pb-6 mb-6">
                        <div>
                            <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold">Número de Orden</p>
                            <p className="text-2xl font-black text-zinc-900">#{order.id}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold">Total Pagado</p>
                            <p className="text-2xl font-black text-red-600">${order.total.toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="space-y-6 mb-8">
                        <div>
                            <h3 className="font-bold text-zinc-900 mb-3 flex items-center gap-2">
                                <ShoppingBag size={18} className="text-red-500" /> Resumen de Compra
                            </h3>
                            <div className="bg-zinc-50 rounded-lg p-4 space-y-3">
                                {order.items.map((item, index) => (
                                    <div key={index} className="flex justify-between text-sm">
                                        <span className="text-zinc-600"><span className="font-bold text-zinc-900">{item.qty}x</span> {item.nombre}</span>
                                        <span className="font-medium">${(item.precio * item.qty).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-zinc-900 mb-3 flex items-center gap-2">
                                <MapPin size={18} className="text-blue-500" /> Datos de Envío
                            </h3>
                            <div className="bg-blue-50/50 rounded-lg p-4 text-sm text-zinc-700 space-y-1">
                                <p><span className="font-bold">Cliente:</span> {order.customer.name}</p>
                                <p><span className="font-bold">RUT:</span> {order.customer.rut}</p>
                                <p><span className="font-bold">Método:</span> {order.shippingMethod === 'santiago' ? 'Retiro en Santiago' : order.shippingMethod === 'pm' ? 'Retiro en Puerto Montt' : 'Envío por Pagar (Starken)'}</p>

                                {order.shippingMethod === 'starken' && order.shippingAddress && (
                                    <div className="mt-2 pt-2 border-t border-blue-200">
                                        <p className="font-bold block mb-1">Dirección:</p>
                                        <p>{order.shippingAddress.street} #{order.shippingAddress.number} {order.shippingAddress.apto ? `Dpto ${order.shippingAddress.apto}` : ''}</p>
                                        <p>{order.shippingAddress.city}, {order.shippingAddress.region}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                        <button
                            onClick={handleWhatsApp}
                            className="w-full bg-[#25D366] text-white py-4 rounded-xl font-bold hover:bg-[#1dbf57] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-green-200"
                        >
                            <MessageCircle size={24} /> Confirmar por WhatsApp
                        </button>

                        <button
                            onClick={() => router.push('/catalogo')}
                            className="w-full bg-zinc-100 text-zinc-600 py-4 rounded-xl font-bold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                        >
                            <Home size={20} /> Volver a la Tienda
                        </button>
                    </div>
                </div>
            </div>

            <p className="text-center text-zinc-400 text-sm mt-8">
                Recibirás un correo de confirmación en {order.customer.email}
            </p>
        </div>
    );
}
