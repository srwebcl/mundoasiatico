'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X, Search, Car, ChevronDown } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { MARCAS, CATEGORIAS, PRODUCTOS_BASE } from '@/data/mockData';

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
        const matchedProducts = PRODUCTOS_BASE.filter(p =>
            p.nombre.toLowerCase().includes(term) ||
            p.sku.toLowerCase().includes(term) ||
            p.marca.toLowerCase().includes(term)
        ).slice(0, 4);

        setSearchResults({ brands: matchedBrands, categories: matchedCats, products: matchedProducts });
    };

    return (
        <nav className="bg-white border-b border-zinc-100 sticky top-0 z-50 shadow-sm font-sans">
            {/* Top Bar - Promos */}
            <div className="bg-[#0a0a0a] text-white text-[10px] md:text-xs py-1.5 px-4 text-center tracking-wider uppercase font-medium">
                <span className="text-red-500 font-bold mr-2">OFERTA:</span>
                Despacho gratis en compras sobre $50.000
            </div>

            {/* Main Header Row: Logo - Search - Icons */}
            <div className="container mx-auto px-4 md:px-6 py-4">
                <div className="flex items-center justify-between gap-4 md:gap-8">

                    {/* Logo (Shrink allowed but kept visible) */}
                    <Link href="/" className="flex items-center gap-2 group shrink-0">
                        <div className="bg-red-600 p-1.5 rounded-lg group-hover:rotate-3 transition-transform">
                            <Car className="text-white w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="font-black text-xl md:text-2xl tracking-tighter italic">MUNDO<span className="text-red-600">ASIÁTICO</span></span>
                            <span className="text-[9px] md:text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase">Repuestos Expertos</span>
                        </div>
                    </Link>

                    {/* Search Bar - Center - Large and Functional */}
                    <div className="hidden md:flex flex-1 max-w-2xl relative z-50">
                        <div className="relative w-full group">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearch}
                                placeholder="Busca repuesto: Filtro, Chery, Pastillas..."
                                className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-200 focus:bg-white focus:border-red-600 rounded-full text-base outline-none transition-all shadow-sm group-hover:shadow-md"
                            />
                            <Search className="absolute left-4 top-3.5 w-5 h-5 text-zinc-400 group-hover:text-red-500 transition-colors" />

                            {/* Live Results Dropdown */}
                            {(searchResults.brands.length > 0 || searchResults.categories.length > 0 || searchResults.products.length > 0) && (
                                <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-zinc-100 overflow-hidden">
                                    <div className="max-h-[70vh] overflow-y-auto py-2">

                                        {/* Matches: Brands */}
                                        {searchResults.brands.length > 0 && (
                                            <div className="mb-2">
                                                <div className="px-4 py-2 bg-zinc-50 text-xs font-bold text-zinc-500 uppercase tracking-wider">Marcas</div>
                                                {searchResults.brands.map(brand => (
                                                    <Link
                                                        key={brand}
                                                        href={`/catalogo?marca=${brand}`}
                                                        onClick={() => setSearchQuery('')}
                                                        className="block px-4 py-2.5 text-sm text-zinc-800 hover:bg-red-50 hover:text-red-700 transition-colors"
                                                    >
                                                        Ir a repuestos <span className="font-bold">{brand}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        )}

                                        {/* Matches: Categories */}
                                        {searchResults.categories.length > 0 && (
                                            <div className="mb-2">
                                                <div className="px-4 py-2 bg-zinc-50 text-xs font-bold text-zinc-500 uppercase tracking-wider">Categorías</div>
                                                {searchResults.categories.map(cat => (
                                                    <Link
                                                        key={cat.id}
                                                        href={`/catalogo?categoria=${cat.id}`}
                                                        onClick={() => setSearchQuery('')}
                                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-800 hover:bg-red-50 hover:text-red-700 transition-colors"
                                                    >
                                                        <span className="text-lg">{cat.icon}</span> {cat.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}

                                        {/* Matches: Products */}
                                        {searchResults.products.length > 0 && (
                                            <div>
                                                <div className="px-4 py-2 bg-zinc-50 text-xs font-bold text-zinc-500 uppercase tracking-wider">Productos</div>
                                                {searchResults.products.map(prod => (
                                                    <Link
                                                        key={prod.id}
                                                        href="/catalogo"
                                                        onClick={() => setSearchQuery('')}
                                                        className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-50 transition-colors border-b border-zinc-50 last:border-0"
                                                    >
                                                        <div className="w-10 h-10 bg-zinc-100 rounded-md flex items-center justify-center text-xl shrink-0">{prod.img}</div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-bold text-zinc-800 truncate">{prod.nombre}</p>
                                                            <p className="text-xs text-zinc-500">{prod.marca} - {prod.modelo}</p>
                                                        </div>
                                                        <div className="font-bold text-red-600 text-sm whitespace-nowrap">
                                                            ${prod.precio.toLocaleString()}
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="bg-zinc-50 p-2 text-center border-t border-zinc-100">
                                        <Link href="/catalogo" className="text-xs font-bold text-red-600 hover:underline">
                                            Ver todos los resultados
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Icons */}
                    <div className="flex items-center gap-2 md:gap-4 shrink-0">
                        <button onClick={openCart} className="relative p-2.5 hover:bg-zinc-100 rounded-full transition-colors group">
                            <ShoppingCart className="w-6 h-6 text-zinc-700 group-hover:text-red-600 transition-colors" />
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-sm border-2 border-white">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                        <button className="md:hidden p-2 hover:bg-zinc-100 rounded-full" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X className="w-6 h-6 text-zinc-800" /> : <Menu className="w-6 h-6 text-zinc-800" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation Bar (Row 2) - Desktop Only */}
            <div className="hidden md:block border-t border-zinc-100 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex items-center gap-8 h-12">
                        {/* Nav Links */}
                        <Link href="/" className="h-full flex items-center text-sm font-bold text-zinc-700 hover:text-red-600 border-b-2 border-transparent hover:border-red-600 transition-all px-2">
                            INICIO
                        </Link>

                        {/* Mega Menu Triggers */}
                        {/* Mega Menu Triggers - Removed 'relative' for full-width dropdown */}
                        <div className="group cursor-pointer h-full flex items-center">
                            <span className="flex items-center gap-1 text-sm font-bold text-zinc-700 group-hover:text-red-600 transition-colors px-2">
                                CATÁLOGO <ChevronDown size={14} />
                            </span>
                            {/* Mega Menu Dropdown - Full Width */}
                            <div className="absolute top-full left-0 mt-0 w-full bg-white border-b border-zinc-200 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0 z-40">
                                <div className="container mx-auto px-4 md:px-6 py-8">
                                    <div className="grid grid-cols-5 gap-6">
                                        {CATEGORIAS.map(cat => (
                                            <Link key={cat.id} href={`/catalogo?categoria=${cat.id}`} className="group/item block relative overflow-hidden rounded-xl aspect-[4/3] shadow-sm hover:shadow-md transition-all">
                                                <img
                                                    src={cat.image}
                                                    alt={cat.name}
                                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                                <div className="absolute bottom-0 left-0 w-full p-4">
                                                    <div className="flex items-center gap-2 text-white mb-1">
                                                        <span className="text-xl">{cat.icon}</span>
                                                        <span className="font-bold text-sm md:text-base leading-tight group-hover/item:text-red-400 transition-colors">{cat.name}</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="group cursor-pointer h-full flex items-center">
                            <span className="flex items-center gap-1 text-sm font-bold text-zinc-700 group-hover:text-red-600 transition-colors px-2">
                                MARCAS <ChevronDown size={14} />
                            </span>
                            <div className="absolute top-full left-0 mt-0 w-full bg-white border-b border-zinc-200 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0 z-40">
                                <div className="container mx-auto px-4 md:px-6 py-8">
                                    <h3 className="font-bold text-zinc-400 text-xs uppercase tracking-wider mb-4">Todas nuestras marcas</h3>
                                    <div className="grid grid-cols-6 gap-y-3 gap-x-8">
                                        {MARCAS.map(marca => (
                                            <Link key={marca} href={`/catalogo?marca=${marca}`} className="block py-2 px-3 hover:bg-zinc-50 rounded-lg text-sm font-medium text-zinc-600 hover:text-red-600 hover:pl-4 transition-all border-l-2 border-transparent hover:border-red-600">
                                                {marca}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Link href="/contacto" className="h-full flex items-center text-sm font-bold text-zinc-700 hover:text-red-600 border-b-2 border-transparent hover:border-red-600 transition-all px-2 ml-auto">
                            CONTACTO
                        </Link>
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
