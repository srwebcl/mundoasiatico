'use client';
import React, { useState } from 'react';
import { User, Truck, CreditCard, CheckCircle, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import Link from 'next/link';

const REGIONES = [
    "Arica y Parinacota", "Tarapacá", "Antofagasta", "Atacama", "Coquimbo",
    "Valparaíso", "Metropolitana", "O'Higgins", "Maule", "Ñuble", "Biobío",
    "Araucanía", "Los Ríos", "Los Lagos", "Aysén", "Magallanes"
];

const StepIndicator = ({ step }) => (
    <div className="flex justify-between items-center mb-12 relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-200 -z-10" />
        <div className="absolute top-1/2 left-0 h-0.5 bg-red-600 -z-10 transition-all duration-500"
            style={{ width: `${((step - 1) / 2) * 100}%` }} />
        {[
            { n: 1, label: 'Tus datos' },
            { n: 2, label: 'Envío' },
            { n: 3, label: 'Pago' },
        ].map(({ n, label }) => (
            <div key={n} className="flex flex-col items-center gap-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 ${step > n
                    ? 'bg-red-600 border-red-600 text-white'
                    : step === n
                        ? 'bg-white border-red-600 text-red-600 shadow-lg shadow-red-100'
                        : 'bg-white border-zinc-200 text-zinc-400'
                    }`}>
                    {step > n ? <CheckCircle size={18} /> : n}
                </div>
                <span className={`text-xs font-bold hidden sm:block ${step >= n ? 'text-zinc-800' : 'text-zinc-400'}`}>{label}</span>
            </div>
        ))}
    </div>
);

export const Checkout = () => {
    const { cart, getCartTotal, getProductPrice, clearCart, isWholesale } = useShop();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [shippingMethod, setShippingMethod] = useState('');
    const [formData, setFormData] = useState({ name: '', rut: '', email: '', phone: '' });
    const [shippingData, setShippingData] = useState({ region: '', city: '', street: '', number: '', apto: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const total = getCartTotal();

    // ── Validaciones ─────────────────────────────────────────────────────────
    const validateStep1 = () => {
        if (!formData.name || !formData.rut || !formData.email || !formData.phone) {
            setError('Completa todos los datos personales.');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError('El email no tiene un formato válido.');
            return false;
        }
        setError('');
        return true;
    };

    const validateStep2 = () => {
        if (!shippingMethod) { setError('Selecciona un método de envío.'); return false; }
        if (shippingMethod === 'starken') {
            if (!shippingData.region || !shippingData.city || !shippingData.street || !shippingData.number) {
                setError('Completa la dirección de envío completa.');
                return false;
            }
        }
        setError('');
        return true;
    };

    // ── Iniciar pago real con Transbank ──────────────────────────────────────
    const handlePayment = async () => {
        setLoading(true);
        setError('');

        const payload = {
            customer: formData,
            shipping_method: shippingMethod,
            ...(shippingMethod === 'starken' && {
                shipping_address: {
                    region:  shippingData.region,
                    city:    shippingData.city,
                    street:  shippingData.street,
                    number:  shippingData.number,
                    apt:     shippingData.apto,
                }
            }),
            items: cart.map(item => ({
                product_id: item.id,
                quantity:   item.qty,
                unit_price: getProductPrice(item),
            })),
        };

        try {
            const res = await api.checkoutInit(payload);
            // Guardar order_id para la página de éxito
            localStorage.setItem('ma_pending_order', JSON.stringify({
                order_id: res.order_id,
                customer: formData,
                shipping_method: shippingMethod,
                shipping_address: shippingMethod === 'starken' ? shippingData : null,
            }));
            clearCart();
            // Redirigir al portal de pago de Transbank
            window.location.href = res.webpay_url + '?token_ws=' + res.webpay_token;
        } catch (err) {
            setError(err.message || 'Error al iniciar el pago. Intenta nuevamente.');
            setLoading(false);
        }
    };

    // ── Carrito vacío ─────────────────────────────────────────────────────────
    if (cart.length === 0) return (
        <div className="container mx-auto px-4 py-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
            <div className="text-8xl mb-6">🛒</div>
            <h2 className="text-2xl font-bold mb-2">Tu carrito está vacío</h2>
            <p className="text-zinc-500 mb-8">Agrega productos desde el catálogo para continuar.</p>
            <Link href="/catalogo" className="bg-red-600 text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition-colors">
                Ir al Catálogo
            </Link>
        </div>
    );

    return (
        <div className="bg-zinc-50 min-h-screen py-8">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">

                    {/* Título */}
                    <div className="mb-8 flex items-center gap-4">
                        <Link href="/catalogo" className="p-2 rounded-full hover:bg-white border border-zinc-200 transition-colors">
                            <ArrowLeft size={20} className="text-zinc-600" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-black text-zinc-900">Finalizar Compra</h1>
                            <p className="text-zinc-500 text-sm">{cart.reduce((s, i) => s + i.qty, 0)} producto(s) en tu carrito</p>
                        </div>
                    </div>

                    <StepIndicator step={step} />

                    {/* Error global */}
                    {error && (
                        <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm font-medium">
                            <AlertCircle size={18} className="shrink-0" /> {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* ── Formulario ─────────────────────────────────── */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* STEP 1: Datos personales */}
                            {step === 1 && (
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100">
                                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-zinc-900">
                                        <div className="w-8 h-8 bg-red-600 rounded-full text-white flex items-center justify-center text-sm font-bold">1</div>
                                        Tus datos de contacto
                                    </h3>
                                    <div className="space-y-4">
                                        {[
                                            { key: 'name',  label: 'Nombre Completo',       placeholder: 'Juan Pérez',          type: 'text'  },
                                            { key: 'rut',   label: 'RUT',                   placeholder: '12.345.678-9',        type: 'text'  },
                                            { key: 'email', label: 'Email',                 placeholder: 'juan@email.com',      type: 'email' },
                                            { key: 'phone', label: 'Teléfono (WhatsApp)',  placeholder: '+56 9 1234 5678',    type: 'tel'   },
                                        ].map(({ key, label, placeholder, type }) => (
                                            <div key={key}>
                                                <label className="block text-sm font-bold text-zinc-700 mb-1">{label}</label>
                                                <input
                                                    type={type} placeholder={placeholder}
                                                    value={formData[key]}
                                                    onChange={e => { setFormData({ ...formData, [key]: e.target.value }); setError(''); }}
                                                    className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:border-red-600 focus:ring-2 focus:ring-red-50 outline-none transition-all"
                                                />
                                            </div>
                                        ))}
                                        <button
                                            onClick={() => { if (validateStep1()) setStep(2); }}
                                            className="w-full bg-zinc-900 text-white py-4 rounded-xl font-bold hover:bg-black transition-colors mt-2"
                                        >
                                            Continuar a Envío →
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* STEP 2: Envío */}
                            {step === 2 && (
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100">
                                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-zinc-900">
                                        <div className="w-8 h-8 bg-red-600 rounded-full text-white flex items-center justify-center text-sm font-bold">2</div>
                                        Método de entrega
                                    </h3>
                                    <div className="space-y-3">
                                        {[
                                            { id: 'santiago', label: 'Retiro en Santiago (Casa Matriz)', desc: 'Disponible en 24–48 hrs hábiles.', icon: '🏢', badge: 'Gratis' },
                                            { id: 'pm',       label: 'Retiro en Puerto Montt (Sucursal)', desc: 'Listo para retiro en máx. 3 días.', icon: '🏪', badge: 'Gratis' },
                                            { id: 'starken',  label: 'Despacho a Domicilio (Starken)',   desc: 'Envío por pagar al recibir.', icon: '🚚', badge: 'Por pagar' },
                                        ].map(opt => (
                                            <div
                                                key={opt.id}
                                                onClick={() => { setShippingMethod(opt.id); setError(''); }}
                                                className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${shippingMethod === opt.id ? 'border-red-600 bg-red-50' : 'border-zinc-200 hover:border-zinc-300'}`}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <span className="text-2xl">{opt.icon}</span>
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between">
                                                            <span className="font-bold text-zinc-900 text-sm">{opt.label}</span>
                                                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${opt.badge === 'Gratis' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{opt.badge}</span>
                                                        </div>
                                                        <p className="text-xs text-zinc-500 mt-0.5">{opt.desc}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        {/* Dirección Starken */}
                                        {shippingMethod === 'starken' && (
                                            <div className="mt-4 pt-4 border-t border-zinc-100 space-y-4">
                                                <h4 className="font-bold text-zinc-900">Dirección de envío</h4>
                                                <div>
                                                    <label className="text-xs font-bold text-zinc-600 mb-1 block">Región</label>
                                                    <select
                                                        value={shippingData.region}
                                                        onChange={e => setShippingData({ ...shippingData, region: e.target.value })}
                                                        className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:border-red-600 outline-none"
                                                    >
                                                        <option value="">Selecciona una región</option>
                                                        {REGIONES.map(r => <option key={r} value={r}>{r}</option>)}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="text-xs font-bold text-zinc-600 mb-1 block">Comuna</label>
                                                    <input type="text" placeholder="Ej: Providencia"
                                                        value={shippingData.city}
                                                        onChange={e => setShippingData({ ...shippingData, city: e.target.value })}
                                                        className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:border-red-600 outline-none" />
                                                </div>
                                                <div className="grid grid-cols-3 gap-3">
                                                    <div className="col-span-2">
                                                        <label className="text-xs font-bold text-zinc-600 mb-1 block">Calle</label>
                                                        <input type="text" placeholder="Av. Providencia"
                                                            value={shippingData.street}
                                                            onChange={e => setShippingData({ ...shippingData, street: e.target.value })}
                                                            className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:border-red-600 outline-none" />
                                                    </div>
                                                    <div>
                                                        <label className="text-xs font-bold text-zinc-600 mb-1 block">Número</label>
                                                        <input type="text" placeholder="1234"
                                                            value={shippingData.number}
                                                            onChange={e => setShippingData({ ...shippingData, number: e.target.value })}
                                                            className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:border-red-600 outline-none" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="text-xs font-bold text-zinc-600 mb-1 block">Depto / Casa (opcional)</label>
                                                    <input type="text" placeholder="Depto 301"
                                                        value={shippingData.apto}
                                                        onChange={e => setShippingData({ ...shippingData, apto: e.target.value })}
                                                        className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:border-red-600 outline-none" />
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex gap-3 mt-4">
                                            <button onClick={() => { setStep(1); setError(''); }} className="flex-1 py-3 rounded-xl border-2 border-zinc-200 font-bold text-zinc-600 hover:border-zinc-300 transition-colors">← Volver</button>
                                            <button onClick={() => { if (validateStep2()) setStep(3); }} className="flex-1 bg-zinc-900 text-white py-3 rounded-xl font-bold hover:bg-black transition-colors">Continuar →</button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* STEP 3: Confirmación y pago */}
                            {step === 3 && (
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100">
                                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-zinc-900">
                                        <div className="w-8 h-8 bg-red-600 rounded-full text-white flex items-center justify-center text-sm font-bold">3</div>
                                        Confirmar y Pagar
                                    </h3>

                                    {/* Resumen del pedido */}
                                    <div className="bg-zinc-50 rounded-xl p-4 mb-6 space-y-2 text-sm">
                                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-zinc-600">
                                            <span className="font-bold text-zinc-800">Cliente:</span>    <span>{formData.name}</span>
                                            <span className="font-bold text-zinc-800">RUT:</span>        <span>{formData.rut}</span>
                                            <span className="font-bold text-zinc-800">Email:</span>      <span>{formData.email}</span>
                                            <span className="font-bold text-zinc-800">Teléfono:</span>   <span>{formData.phone}</span>
                                            <span className="font-bold text-zinc-800">Entrega:</span>
                                            <span>{shippingMethod === 'santiago' ? 'Retiro Santiago' : shippingMethod === 'pm' ? 'Retiro Puerto Montt' : 'Envío Starken'}</span>
                                        </div>
                                        {shippingMethod === 'starken' && (
                                            <div className="pt-2 mt-2 border-t border-zinc-200 text-zinc-600">
                                                <span className="font-bold text-zinc-800 block mb-1">Dirección:</span>
                                                <span>{shippingData.street} #{shippingData.number} {shippingData.apto}, {shippingData.city}, {shippingData.region}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Total */}
                                    <div className="flex items-center justify-between py-4 border-t border-b border-zinc-100 mb-6">
                                        <span className="text-lg font-bold text-zinc-900">Total a Pagar</span>
                                        <span className="text-2xl font-black text-red-600">${total.toLocaleString()}</span>
                                    </div>

                                    {/* Botón Webpay */}
                                    <button
                                        onClick={handlePayment}
                                        disabled={loading}
                                        className="w-full bg-[#E57600] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#d66e00] transition-all shadow-lg shadow-orange-200 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-wait"
                                    >
                                        {loading
                                            ? <><Loader2 size={22} className="animate-spin" /> Iniciando pago seguro...</>
                                            : <><img src="/webpay-logo.png" className="h-6 w-auto" onError={e => { e.target.style.display = 'none'; }} alt="" /> Pagar con Webpay</>
                                        }
                                    </button>
                                    <p className="text-xs text-zinc-400 mt-3 text-center">
                                        Serás redirigido al portal seguro de Transbank para completar el pago.
                                    </p>

                                    <button onClick={() => { setStep(2); setError(''); }} className="w-full text-sm text-zinc-400 hover:text-zinc-600 mt-4 underline">
                                        ← Volver a envíos
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* ── Resumen lateral ─────────────────────────────── */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6 sticky top-24">
                                <h4 className="font-bold text-zinc-900 mb-4">Tu pedido</h4>
                                <div className="space-y-3 mb-4 max-h-72 overflow-y-auto pr-1">
                                    {cart.map(item => {
                                        const price = getProductPrice(item);
                                        return (
                                            <div key={item.id} className="flex gap-3 text-sm">
                                                <div className="w-12 h-12 bg-zinc-100 rounded-lg flex items-center justify-center text-lg shrink-0 overflow-hidden">
                                                    {item.image
                                                        ? <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
                                                        : '📦'
                                                    }
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-bold text-zinc-800 truncate">{item.name || item.nombre}</p>
                                                    <p className="text-zinc-500 text-xs">x{item.qty}</p>
                                                </div>
                                                <span className="font-bold text-zinc-900 shrink-0">${(price * item.qty).toLocaleString()}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="border-t border-zinc-100 pt-4 space-y-2">
                                    <div className="flex justify-between text-sm text-zinc-500">
                                        <span>Subtotal</span>
                                        <span>${total.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-zinc-500">
                                        <span>Envío</span>
                                        <span className="text-green-600 font-bold">{shippingMethod === 'starken' ? 'Por pagar al recibir' : 'Retiro Gratis'}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-black text-zinc-900 pt-2 border-t border-zinc-100">
                                        <span>Total</span>
                                        <span className="text-red-600">${total.toLocaleString()}</span>
                                    </div>
                                </div>

                                {/* Badges de seguridad */}
                                <div className="mt-4 pt-4 border-t border-zinc-100 space-y-2">
                                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                                        <span>🔒</span> Pago 100% seguro con Transbank
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                                        <span>🛡️</span> Garantía de 3 meses en todos los repuestos
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
