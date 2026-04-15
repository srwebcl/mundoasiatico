'use client';
import React from 'react';
import { ShoppingCart, X, ArrowRight, Trash2, Plus, Minus } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import Link from 'next/link';

export const CartDrawer = () => {
    const {
        cart,
        isCartOpen,
        setIsCartOpen,
        updateQuantity,
        removeFromCart,
        getProductPrice,
        getCartTotal,
    } = useShop();

    if (!isCartOpen) return null;

    const total = getCartTotal();
    const totalItems = cart.reduce((s, i) => s + i.qty, 0);

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setIsCartOpen(false)}
            />

            {/* Drawer */}
            <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">

                {/* Header */}
                <div className="px-5 py-4 bg-zinc-900 text-white flex justify-between items-center shrink-0">
                    <h2 className="font-bold text-lg flex items-center gap-2">
                        <ShoppingCart size={20} />
                        Tu Carrito
                        {totalItems > 0 && (
                            <span className="bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                {totalItems}
                            </span>
                        )}
                    </h2>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto p-4">
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-16">
                            <div className="text-6xl opacity-20">🛒</div>
                            <p className="text-zinc-500 font-medium">Tu carrito está vacío</p>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="text-sm text-red-600 font-bold hover:underline"
                            >
                                Explorar catálogo →
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {cart.map(item => {
                                const price = getProductPrice(item);
                                const name  = item.name  ?? item.nombre;
                                const icon  = item.image
                                    ? null
                                    : { encendido: '⚡', filtros: '🔩', inyeccion: '💉', frenos: '🛑', sensores: '📡' }[item.category?.slug] ?? '📦';

                                return (
                                    <div key={item.id} className="flex gap-3 bg-zinc-50 rounded-xl p-3 border border-zinc-100">
                                        {/* Imagen / Emoji */}
                                        <div className="w-16 h-16 bg-white rounded-lg border border-zinc-100 flex items-center justify-center shrink-0 overflow-hidden">
                                            {item.image
                                                ? <img src={item.image} alt={name} className="w-full h-full object-contain p-1" />
                                                : <span className="text-2xl">{icon}</span>
                                            }
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-sm text-zinc-900 leading-tight truncate">{name}</h4>
                                            <p className="text-xs text-zinc-400 mt-0.5">SKU: {item.sku}</p>

                                            {/* Cantidad + precio */}
                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center border border-zinc-200 rounded-lg bg-white overflow-hidden">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className="w-7 h-7 flex items-center justify-center hover:bg-zinc-100 transition-colors"
                                                    >
                                                        <Minus size={12} />
                                                    </button>
                                                    <span className="w-8 text-center text-sm font-bold">{item.qty}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="w-7 h-7 flex items-center justify-center hover:bg-zinc-100 transition-colors"
                                                    >
                                                        <Plus size={12} />
                                                    </button>
                                                </div>
                                                <span className="font-bold text-red-600 text-sm">${(price * item.qty).toLocaleString()}</span>
                                            </div>
                                        </div>

                                        {/* Eliminar */}
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="self-start p-1.5 hover:bg-red-50 hover:text-red-600 text-zinc-300 rounded-full transition-colors"
                                            aria-label="Eliminar"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                    <div className="p-5 bg-zinc-50 border-t border-zinc-100 space-y-3 shrink-0">
                        <div className="flex justify-between items-center">
                            <span className="text-zinc-500 text-sm">Subtotal ({totalItems} items)</span>
                            <span className="font-black text-zinc-900 text-lg">${total.toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-zinc-400">Envío calculado en el checkout</p>

                        <Link
                            href="/checkout"
                            onClick={() => setIsCartOpen(false)}
                            className="w-full bg-red-600 text-white py-3.5 rounded-xl font-bold hover:bg-red-700 flex items-center justify-center gap-2 transition-colors shadow-lg shadow-red-100"
                        >
                            IR A PAGAR <ArrowRight size={18} />
                        </Link>

                        <button
                            onClick={() => setIsCartOpen(false)}
                            className="w-full text-sm text-zinc-500 hover:text-zinc-700 py-1 transition-colors"
                        >
                            Seguir comprando
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
