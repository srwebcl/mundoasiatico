'use client';
import React, { useState } from 'react';
import { User, Truck, CreditCard, CheckCircle } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { useRouter } from 'next/navigation';


export const Checkout = () => {
    const { cart, getCartTotal, clearCart, isWholesale } = useShop();
    const [step, setStep] = useState(1);
    const [shippingMethod, setShippingMethod] = useState(''); // 'santiago', 'pm', 'starken'
    const [formData, setFormData] = useState({
        name: '',
        rut: '',
        email: '',
        phone: ''
    });
    const [shippingData, setShippingData] = useState({
        region: '',
        city: '',
        street: '',
        number: '',
        apto: ''
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const total = getCartTotal();
    const REGIONES = [
        "Arica y Parinacota", "Tarapacá", "Antofagasta", "Atacama", "Coquimbo",
        "Valparaíso", "Metropolitana", "O'Higgins", "Maule", "Ñuble", "Biobío",
        "Araucanía", "Los Ríos", "Los Lagos", "Aysén", "Magallanes"
    ];

    const validateStep1 = () => {
        if (!formData.name || !formData.rut || !formData.email || !formData.phone) {
            alert('Por favor completa todos los datos personales (incluyendo RUT).');
            return false;
        }
        return true;
    };

    const validateStep2 = () => {
        if (!shippingMethod) {
            alert('Selecciona un método de envío.');
            return false;
        }
        if (shippingMethod === 'starken') {
            if (!shippingData.region || !shippingData.city || !shippingData.street || !shippingData.number) {
                alert('Para envío a domicilio, debes completar la dirección completa.');
                return false;
            }
        }
        return true;
    };

    const handlePayment = () => {
        setLoading(true);

        // Generate Order
        const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
        const newOrder = {
            id: orderId,
            date: new Date().toISOString(),
            customer: formData,
            shippingMethod: shippingMethod,
            shippingAddress: shippingMethod === 'starken' ? shippingData : null,
            items: cart,
            total: total
        };

        // Simulate API call
        setTimeout(() => {
            // Save order to LocalStorage
            localStorage.setItem('lastOrder', JSON.stringify(newOrder));

            setLoading(false);
            clearCart();
            router.push('/exito');
        }, 1500);
    };

    const ShippingMessage = () => {
        if (shippingMethod === 'santiago') return <div className="text-green-600 text-sm mt-2 flex items-center gap-1"><CheckCircle size={14} /> Disponible en 24 hrs hábiles (o según stock).</div>;
        if (shippingMethod === 'pm') return <div className="text-blue-600 text-sm mt-2 flex items-center gap-1"><CheckCircle size={14} /> Listo para retiro en máx 3 días hábiles.</div>;
        if (shippingMethod === 'starken') return <div className="text-orange-600 text-sm mt-2 font-bold flex items-center gap-1"><Truck size={14} /> Envío por pagar vía Starken. Se paga al recibir.</div>;
        return null;
    };

    if (cart.length === 0) return (
        <div className="container mx-auto px-4 py-20 text-center">
            <h2 className="text-2xl font-bold mb-4">No hay productos para comprar</h2>
            <button onClick={() => router.push('/catalogo')} className="text-blue-600 underline">Volver al catálogo</button>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                {/* Steps Header */}
                <div className="flex justify-between items-center mb-12 relative">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-zinc-200 -z-10"></div>
                    {[1, 2, 3].map(s => (
                        <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= s ? 'bg-red-600 text-white' : 'bg-zinc-200 text-zinc-500'}`}>
                            {s}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">

                        {/* STEP 1: DATA */}
                        {step === 1 && (
                            <div className="bg-white p-6 rounded-lg shadow-md animate-in fade-in">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><User /> Tus Datos</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Nombre Completo</label>
                                        <input
                                            type="text"
                                            className="w-full border rounded p-2"
                                            placeholder="Juan Pérez"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">RUT</label>
                                        <input
                                            type="text"
                                            className="w-full border rounded p-2"
                                            placeholder="12.345.678-9"
                                            value={formData.rut}
                                            onChange={e => setFormData({ ...formData, rut: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Email</label>
                                        <input
                                            type="email"
                                            className="w-full border rounded p-2"
                                            placeholder="juan@email.com"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Teléfono</label>
                                        <input
                                            type="tel"
                                            className="w-full border rounded p-2"
                                            placeholder="+56 9 ..."
                                            value={formData.phone}
                                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                    <button
                                        onClick={() => { if (validateStep1()) setStep(2); }}
                                        className="w-full bg-zinc-900 text-white py-3 rounded font-bold hover:bg-black"
                                    >
                                        Continuar a Envío
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* STEP 2: LOGISTICS */}
                        {step === 2 && (
                            <div className="bg-white p-6 rounded-lg shadow-md animate-in fade-in">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Truck /> Envío / Retiro</h3>

                                <div className="space-y-4">
                                    <div className="border rounded p-4 cursor-pointer hover:border-blue-500 relative" onClick={() => setShippingMethod('santiago')}>
                                        <div className="flex items-center gap-2">
                                            <input type="radio" name="shipping" checked={shippingMethod === 'santiago'} onChange={() => setShippingMethod('santiago')} />
                                            <span className="font-bold">Retiro en Santiago (Casa Matriz)</span>
                                        </div>
                                    </div>

                                    <div className="border rounded p-4 cursor-pointer hover:border-blue-500 relative" onClick={() => setShippingMethod('pm')}>
                                        <div className="flex items-center gap-2">
                                            <input type="radio" name="shipping" checked={shippingMethod === 'pm'} onChange={() => setShippingMethod('pm')} />
                                            <span className="font-bold">Retiro en Puerto Montt (Sucursal)</span>
                                        </div>
                                    </div>

                                    <div className="border rounded p-4 cursor-pointer hover:border-blue-500 relative" onClick={() => setShippingMethod('starken')}>
                                        <div className="flex items-center gap-2">
                                            <input type="radio" name="shipping" checked={shippingMethod === 'starken'} onChange={() => setShippingMethod('starken')} />
                                            <span className="font-bold">Despacho a Domicilio (Starken)</span>
                                        </div>
                                    </div>

                                    <div className="bg-zinc-50 p-4 rounded border border-zinc-200 min-h-[60px]">
                                        <ShippingMessage />
                                    </div>

                                    {shippingMethod === 'starken' && (
                                        <div className="mt-4 pt-4 border-t border-zinc-200 space-y-4 animate-in slide-in-from-top-2">
                                            <h4 className="font-bold text-lg">Dirección de Envío</h4>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">Región</label>
                                                <select
                                                    className="w-full border rounded p-2"
                                                    value={shippingData.region}
                                                    onChange={e => setShippingData({ ...shippingData, region: e.target.value })}
                                                >
                                                    <option value="">Selecciona una región</option>
                                                    {REGIONES.map(r => <option key={r} value={r}>{r}</option>)}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">Comuna</label>
                                                <input
                                                    type="text"
                                                    className="w-full border rounded p-2"
                                                    placeholder="Ej: Providencia"
                                                    value={shippingData.city}
                                                    onChange={e => setShippingData({ ...shippingData, city: e.target.value })}
                                                />
                                            </div>
                                            <div className="grid grid-cols-3 gap-4">
                                                <div className="col-span-2">
                                                    <label className="block text-sm font-medium mb-1">Calle</label>
                                                    <input
                                                        type="text"
                                                        className="w-full border rounded p-2"
                                                        placeholder="Av. Providencia"
                                                        value={shippingData.street}
                                                        onChange={e => setShippingData({ ...shippingData, street: e.target.value })}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-1">Número</label>
                                                    <input
                                                        type="text"
                                                        className="w-full border rounded p-2"
                                                        placeholder="1234"
                                                        value={shippingData.number}
                                                        onChange={e => setShippingData({ ...shippingData, number: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">Depto / Casa (Opcional)</label>
                                                <input
                                                    type="text"
                                                    className="w-full border rounded p-2"
                                                    placeholder="Depto 301"
                                                    value={shippingData.apto}
                                                    onChange={e => setShippingData({ ...shippingData, apto: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex gap-4 mt-6">
                                        <button onClick={() => setStep(1)} className="w-1/2 border border-zinc-300 py-3 rounded font-bold">Volver</button>
                                        <button onClick={() => { if (validateStep2()) setStep(3); }} className="w-1/2 bg-zinc-900 text-white py-3 rounded font-bold hover:bg-black">Continuar a Pago</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 3: PAYMENT */}
                        {step === 3 && (
                            <div className="bg-white p-6 rounded-lg shadow-md animate-in fade-in">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><CreditCard /> Pago Seguro</h3>
                                <div className="space-y-4 text-center">
                                    <p className="text-zinc-600">Estás a un paso de confirmar tu pedido.</p>

                                    <div className="bg-zinc-100 p-6 rounded-lg text-left">
                                        <div className="mb-4 text-sm text-zinc-600 border-b border-zinc-200 pb-4 space-y-1">
                                            <p><span className="font-bold">Cliente:</span> {formData.name}</p>
                                            <p><span className="font-bold">RUT:</span> {formData.rut}</p>
                                            <p><span className="font-bold">Email:</span> {formData.email}</p>
                                            <p><span className="font-bold">Teléfono:</span> {formData.phone}</p>
                                            <p><span className="font-bold">Método:</span> {shippingMethod === 'santiago' ? 'Retiro Santiago' : shippingMethod === 'pm' ? 'Retiro Puerto Montt' : 'Envío Starken'}</p>

                                            {shippingMethod === 'starken' && (
                                                <div className="mt-2 pt-2 border-t border-zinc-200">
                                                    <p className="font-bold text-zinc-800">Dirección de Envío:</p>
                                                    <p>{shippingData.street} #{shippingData.number} {shippingData.apto ? `Dpto/Casa ${shippingData.apto}` : ''}</p>
                                                    <p>{shippingData.city}, {shippingData.region}</p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-xl text-zinc-800">Total a Pagar:</span>
                                            <span className="font-bold text-xl text-red-600">${total.toLocaleString()}</span>
                                        </div>

                                        {/* Simulated Webpay Button */}
                                        <button
                                            onClick={handlePayment}
                                            className="w-full bg-[#E57600] text-white py-4 rounded font-bold hover:bg-[#d66e00] shadow-md flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] mt-6"
                                        >
                                            {loading ? 'Procesando...' : (
                                                <>
                                                    <div className="w-4 h-4 bg-white rounded-full"></div> Pagar con Webpay
                                                </>
                                            )}
                                        </button>
                                        <p className="text-xs text-zinc-400 mt-2 text-center">Al pagar aceptas nuestros términos y condiciones.</p>
                                    </div>

                                    <button onClick={() => setStep(2)} className="text-sm text-zinc-500 underline">Volver a envíos</button>
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Order Summary */}
                    <div className="h-fit bg-zinc-50 p-6 rounded-lg border border-zinc-200">
                        <h4 className="font-bold text-lg mb-4">Resumen de Compra</h4>
                        <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
                            {cart.map(item => {
                                const price = isWholesale ? item.precio * 0.8 : item.precio;
                                return (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <span>{item.qty}x {item.nombre.substring(0, 20)}...</span>
                                        <span>${(price * item.qty).toLocaleString()}</span>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="border-t pt-4 flex justify-between font-bold text-xl text-red-600">
                            <span>Total</span>
                            <span>${total.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
