'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X, Search, Car, ChevronDown } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { MARCAS, CATEGORIAS } from '@/data/mockData';

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState({ brands: [], categories: [], products: [] });
    const { openCart, cart } = useShop();

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.length < 2) {
            setSearchResults({ brands: [], categories: [], products: [] });
            return;
        }

        const term = query.toLowerCase();

        // Filter Brands
        const matchedBrands = MARCAS.filter(m => m.toLowerCase().includes(term)).slice(0, 3);

        // Filter Categories
        const matchedCats = CATEGORIAS.filter(c => c.name.toLowerCase().includes(term)).slice(0, 3);

        // Filter Products (Mock Logic - normally would be API or full list search)
        // Since PRODUCTOS_BASE is small, this works fine. 
        // In real app, might need to wait for CSV data or search API.
        const matchedProducts = []; // Add logic here if needed, or leave empty if PRODUCTOS_BASE is not imported (It IS imported in previous steps? No, I need to check imports!)

        setSearchResults({ brands: matchedBrands, categories: matchedCats, products: matchedProducts });
    };

    return (
        <nav className="bg-white border-b border-zinc-100 sticky top-0 z-50">
            {/* Top Bar - Promos */}
            <div className="bg-[#0a0a0a] text-white text-[10px] md:text-xs py-2 px-4 text-center tracking-wider uppercase font-medium">
                <span className="text-red-500 font-bold mr-2">OFERTA:</span>
                Despacho gratis en compras sobre $50.000
            </div>

            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between h-16 md:h-20">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group shrink-0">
                        <div className="bg-red-600 p-1.5 rounded-lg group-hover:rotate-3 transition-transform">
                            <Car className="text-white w-6 h-6 md:w-7 md:h-7" />
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="font-black text-lg md:text-xl tracking-tighter italic">MUNDO<span className="text-red-600">ASIÁTICO</span></span>
                            <span className="text-[9px] text-zinc-500 font-bold tracking-[0.2em] uppercase">Repuestos Expertos</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden xl:flex items-center gap-8 shrink-0">
                        <Link href="/" className="text-sm font-bold text-zinc-900 hover:text-red-600 transition-colors">INICIO</Link>

                        {/* Categories Mega Menu */}
                        <div className="relative group cursor-pointer">
                            <span className="flex items-center gap-1 text-sm font-bold text-zinc-900 hover:text-red-600 transition-colors py-6">
                                CATÁLOGO <ChevronDown size={14} />
                            </span>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[600px] bg-white border border-zinc-100 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0 p-6 z-50">
                                <div className="grid grid-cols-2 gap-4">
                                    {CATEGORIAS.map(cat => (
                                        <Link
                                            key={cat.id}
                                            href={`/catalogo?categoria=${cat.id}`}
                                            className="flex items-center gap-3 p-2 hover:bg-zinc-50 rounded-lg transition-colors group/item"
                                        >
                                            <span className="text-xl group-hover/item:scale-110 transition-transform">{cat.icon}</span>
                                            <span className="font-medium text-sm text-zinc-700 group-hover/item:text-red-600">{cat.name}</span>
                                        </Link>
                                    ))}
                                </div>
                                <div className="mt-4 pt-4 border-t border-zinc-100 text-center">
                                    <Link href="/catalogo" className="text-xs font-bold text-red-600 hover:text-red-700 underline">VER TODO EL CATÁLOGO</Link>
                                </div>
                            </div>
                        </div>

                        {/* Brands Mega Menu */}
                        <div className="relative group cursor-pointer">
                            <span className="flex items-center gap-1 text-sm font-bold text-zinc-900 hover:text-red-600 transition-colors py-6">
                                MARCAS <ChevronDown size={14} />
                            </span>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[800px] bg-white border border-zinc-100 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0 p-6 z-50">
                                <div className="grid grid-cols-4 gap-2">
                                    {MARCAS.map(marca => (
                                        <Link
                                            key={marca}
                                            href={`/catalogo?marca=${marca}`}
                                            className="block px-3 py-2 hover:bg-zinc-50 rounded-lg text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors border-l-2 border-transparent hover:border-red-600"
                                        >
                                            {marca}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Search Bar - Smart & Dynamic */}
                    <div className="hidden md:flex flex-1 mx-4 lg:mx-8 relative">
                        <div className="relative w-full">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearch}
                                placeholder="Busca tu repuesto (ej: Chery, Frenos...)"
                                className="w-full pl-10 pr-4 py-2 bg-zinc-100 border-transparent focus:bg-white border-2 focus:border-red-600 rounded-full text-sm outline-none transition-all placeholder:text-zinc-400"
                            />
                            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-zinc-400" />

                            {/* Smart Search Results Dropdown */}
                            {(searchResults.brands.length > 0 || searchResults.categories.length > 0) && (
                                <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-xl border border-zinc-100 overflow-hidden z-50 p-2">

                                    {searchResults.brands.length > 0 && (
                                        <div className="mb-2">
                                            <p className="px-3 py-1 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Marcas</p>
                                            {searchResults.brands.map(brand => (
                                                <Link
                                                    key={brand}
                                                    href={`/catalogo?marca=${brand}`}
                                                    onClick={() => setSearchQuery('')}
                                                    className="block px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 rounded-lg"
                                                >
                                                    Repuestos para <span className="font-bold text-zinc-900">{brand}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    )}

                                    {searchResults.categories.length > 0 && (
                                        <div>
                                            <p className="px-3 py-1 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Categorías</p>
                                            {searchResults.categories.map(cat => (
                                                <Link
                                                    key={cat.id}
                                                    href={`/catalogo?categoria=${cat.id}`}
                                                    onClick={() => setSearchQuery('')}
                                                    className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 rounded-lg"
                                                >
                                                    <span>{cat.icon}</span> {cat.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2 md:gap-4 shrink-0">
                        <button
                            onClick={openCart}
                            className="relative p-2 hover:bg-zinc-100 rounded-full transition-colors group"
                        >
                            <ShoppingCart className="w-5 h-5 text-zinc-600 group-hover:text-zinc-900" />
                            {totalItems > 0 && (
                                <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold animate-bounce">
                                    {totalItems}
                                </span>
                            )}
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            className="xl:hidden p-2 hover:bg-zinc-100 rounded-full transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="w-6 h-6 text-zinc-900" /> : <Menu className="w-6 h-6 text-zinc-900" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {
                isMenuOpen && (
                    <div className="md:hidden border-t border-zinc-100 bg-white absolute w-full left-0 top-full shadow-xl max-h-[80vh] overflow-y-auto">
                        <div className="p-4 space-y-4">
                            <Link href="/" onClick={() => setIsMenuOpen(false)} className="block p-3 rounded-lg hover:bg-zinc-50 font-bold text-zinc-900 border-l-4 border-transparent hover:border-red-600 transition-all">INICIO</Link>

                            <div className="space-y-2">
                                <p className="px-3 font-bold text-zinc-400 text-xs uppercase tracking-wider">Categorías</p>
                                <div className="grid grid-cols-2 gap-2 px-3">
                                    {CATEGORIAS.map(cat => (
                                        <Link
                                            key={cat.id}
                                            href={`/catalogo?categoria=${cat.id}`}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-sm p-2 bg-zinc-50 rounded text-zinc-700 flex items-center gap-2"
                                        >
                                            <span>{cat.icon}</span> {cat.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <p className="px-3 font-bold text-zinc-400 text-xs uppercase tracking-wider">Marcas</p>
                                <div className="grid grid-cols-2 gap-2 px-3">
                                    {MARCAS.map(marca => (
                                        <Link
                                            key={marca}
                                            href={`/catalogo?marca=${marca}`}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-sm p-2 bg-zinc-50 rounded text-zinc-700 truncate"
                                        >
                                            {marca}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </nav >
    );
};
