'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isWholesale, setIsWholesale] = useState(false);

    // Load cart from local storage on mount (optional, nice for "real" feel)
    useEffect(() => {
        const savedCart = localStorage.getItem('ma_cart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error('Failed to parse cart', e);
            }
        }
    }, []);

    // Save cart to local storage
    useEffect(() => {
        localStorage.setItem('ma_cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            const price = isWholesale ? product.precio * 0.8 : product.precio;
            // Always update price if wholesale mode changes? 
            // For now, adhere to prototype logic: price is set at add time, 
            // but maybe better to calculate price dynamically during render.
            // Let's store base product and calculate price on the fly for better consistency.

            // Prototype logic: stored price in cart. 
            // Real app logic: Store product ID and qty, derive price from mode. 
            // To stick to prototype's behavior but act "real", let's store standard item.

            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
            }
            return [...prev, { ...product, qty: 1 }];
        });
        setIsCartOpen(true);
    };

    const updateQuantity = (id, delta) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = Math.max(1, item.qty + delta);
                return { ...item, qty: newQty };
            }
            return item;
        }));
    };

    const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));
    const clearCart = () => setCart([]);
    const toggleCart = () => setIsCartOpen(!isCartOpen);
    const toggleWholesale = () => setIsWholesale(!isWholesale);

    const getCartTotal = () => {
        return cart.reduce((sum, item) => {
            const price = isWholesale ? item.precio * 0.8 : item.precio;
            return sum + (price * item.qty);
        }, 0);
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
            toggleCart,
            isWholesale,
            toggleWholesale,
            getCartTotal
        }}>
            {children}
        </ShopContext.Provider>
    );
};
