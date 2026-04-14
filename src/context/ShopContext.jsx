'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [user, setUser] = useState(null); // { id, name, email, role, is_wholesale }

    // ── Cargar carrito y usuario desde localStorage al montar ─────────────────
    useEffect(() => {
        const savedCart = localStorage.getItem('ma_cart');
        if (savedCart) {
            try { setCart(JSON.parse(savedCart)); } catch (e) { /* ignore */ }
        }
        // Usuario autenticado (guardado por api.js al hacer login)
        const savedUser = localStorage.getItem('ma_user');
        if (savedUser) {
            try { setUser(JSON.parse(savedUser)); } catch (e) { /* ignore */ }
        }
    }, []);

    // ── Persistir carrito ─────────────────────────────────────────────────────
    useEffect(() => {
        localStorage.setItem('ma_cart', JSON.stringify(cart));
    }, [cart]);

    // ── Precio activo según rol ───────────────────────────────────────────────
    const isWholesale = user?.is_wholesale === true;

    const getProductPrice = (product) => {
        // Si viene de la API tiene active_price; si viene del mock tiene precio
        if (product.active_price !== undefined) return product.active_price;
        if (isWholesale && product.wholesale_price) return product.wholesale_price;
        if (product.regular_price) return product.regular_price;
        return product.precio ?? 0;
    };

    // ── Carrito ───────────────────────────────────────────────────────────────
    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id ? { ...item, qty: item.qty + 1 } : item
                );
            }
            return [...prev, { ...product, qty: 1 }];
        });
        setIsCartOpen(true);
    };

    const updateQuantity = (id, delta) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                return { ...item, qty: Math.max(1, item.qty + delta) };
            }
            return item;
        }));
    };

    const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));
    const clearCart      = () => setCart([]);
    const openCart       = () => setIsCartOpen(true);
    const toggleCart     = () => setIsCartOpen(prev => !prev);

    const getCartTotal = () =>
        cart.reduce((sum, item) => sum + (getProductPrice(item) * item.qty), 0);

    // ── Auth helpers ──────────────────────────────────────────────────────────
    const setAuthUser = (userData) => {
        setUser(userData);
        if (userData) {
            localStorage.setItem('ma_user', JSON.stringify(userData));
        } else {
            localStorage.removeItem('ma_user');
            localStorage.removeItem('ma_token');
        }
    };

    const logoutUser = () => {
        setAuthUser(null);
        clearCart();
    };

    // Toggle manual para demo/desarrollo sin backend activo
    const toggleWholesale = () => {
        setUser(prev => {
            const updated = { ...(prev || { id: null, name: 'Demo', email: '' }), is_wholesale: !isWholesale };
            localStorage.setItem('ma_user', JSON.stringify(updated));
            return updated;
        });
    };

    return (
        <ShopContext.Provider value={{
            cart,
            isCartOpen,
            setIsCartOpen,
            addToCart,
            updateQuantity,
            removeFromCart,
            clearCart,
            openCart,
            toggleCart,
            isWholesale,
            toggleWholesale,
            getCartTotal,
            getProductPrice,
            user,
            setAuthUser,
            logoutUser,
        }}>
            {children}
        </ShopContext.Provider>
    );
};
