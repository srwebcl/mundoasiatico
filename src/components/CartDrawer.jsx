'use client';
import React from 'react';
import { ShoppingCart, X, ArrowRight, Trash2 } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import Link from 'next/link';

export const CartDrawer = () => {
    const {
        cart,
        isCartOpen,
        setIsCartOpen,
        updateQuantity,
        removeFromCart,
        isWholesale,
        getCartTotal
    } = useShop();

    if (!isCartOpen) return null;

    const total = getCartTotal();

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
            <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                <div className="p-4 border-b flex justify-between items-center bg-zinc-900 text-white">
                    <h2 className="font-bold text-lg flex items-center gap-2"><ShoppingCart size={20} /> Tu Carrito</h2>
                    <button onClick={() => setIsCartOpen(false)}><X /></button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {cart.length === 0 ? (
                        <div className="text-center py-10 text-zinc-500">Tu carrito está vacío.</div>
                    ) : (
                        cart.map(item => {
                            const price = isWholesale ? item.precio * 0.8 : item.precio;
                            return (
                                <div key={item.id} className="flex gap-4 border-b pb-4">
                                    <div className="w-16 h-16 bg-zinc-100 rounded flex items-center justify-center text-2xl">
                                        {item.img}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-sm">{item.nombre}</h4>
                                        <p className="text-xs text-zinc-500 mb-2">{item.sku}</p>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center border rounded">
                                                <button className="px-2 py-1 hover:bg-zinc-100" onClick={() => updateQuantity(item.id, -1)}>-</button>
                                                <span className="px-2 text-sm">{item.qty}</span>
                                                <button className="px-2 py-1 hover:bg-zinc-100" onClick={() => updateQuantity(item.id, 1)}>+</button>
                                            </div>
                                            <span className="font-bold text-red-600">${(price * item.qty).toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)} className="text-zinc-400 hover:text-red-600 self-start p-2 hover:bg-zinc-100 rounded-full transition-colors" aria-label="Eliminar producto">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            );
                        })
                    )}
                </div>

                <div className="p-6 bg-zinc-50 border-t space-y-4">
                    <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>${total.toLocaleString()}</span>
                    </div>
                    <Link
                        href="/checkout"
                        onClick={() => setIsCartOpen(false)}
                        className={`w-full bg-red-600 text-white py-3 rounded font-bold hover:bg-red-700 flex items-center justify-center gap-2 ${cart.length === 0 ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                        IR A PAGAR <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </div>
    );
};
