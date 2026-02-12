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
    const [activeMenu, setActiveMenu] = useState(null); // 'catalog', 'brands', or null
    const { openCart, cart } = useShop();
    const searchRef = React.useRef(null); // Ref for click outside

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    // Close search on click outside
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchQuery(''); // Clear query to close results
                // Or set a separate isOpen state if we wanted to keep the query
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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

            {/* Main Header Row: Logo - Nav - Search - Icons */}
            <div className="container mx-auto px-4 md:px-6 py-2">
                <div className="flex items-center gap-4 md:gap-8">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group shrink-0">
                        <img
                            src="/logo-mundo-asiatico.webp"
                            alt="Mundo Asiático"
                            className="h-14 md:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                    </Link>

                    {/* Desktop Navigation - Moved Inline */}
                    <div className="hidden lg:flex items-center gap-8 shrink-0 h-20">
                        <Link href="/" className="h-full flex items-center text-sm font-bold text-zinc-700 hover:text-red-600 border-b-2 border-transparent hover:border-red-600 transition-all">
                            INICIO
                        </Link>

                        {/* Mega Menu: Catálogo */}
                        <div
                            className="h-full flex items-center"
                            onMouseEnter={() => setActiveMenu('catalog')}
                            onMouseLeave={() => setActiveMenu(null)}
                        >
                            <span className={`flex items-center gap-1 text-sm font-bold transition-colors cursor-pointer h-full border-b-2 border-transparent ${activeMenu === 'catalog' ? 'text-red-600 border-red-600' : 'text-zinc-700 hover:text-red-600 hover:border-red-600'}`}>
                                CATÁLOGO <ChevronDown size={14} className={`transition-transform duration-200 ${activeMenu === 'catalog' ? 'rotate-180' : ''}`} />
                            </span>
                            {/* Dropdown - Full Width Relative to Nav */}
                            <div className={`absolute top-full left-0 w-full bg-white border-t border-zinc-100 shadow-xl transition-all duration-200 z-50 overflow-hidden ${activeMenu === 'catalog' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}>
                                <div className="container mx-auto px-4 md:px-6 py-8">
                                    <div className="grid grid-cols-5 gap-6">
                                        {CATEGORIAS.map(cat => (
                                            <Link
                                                key={cat.id}
                                                href={`/catalogo?categoria=${cat.id}`}
                                                onClick={() => setActiveMenu(null)}
                                                className="group/item block relative overflow-hidden rounded-xl aspect-[4/3] shadow-sm hover:shadow-md transition-all"
                                            >
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

                        {/* Mega Menu: Marcas */}
                        <div
                            className="h-full flex items-center"
                            onMouseEnter={() => setActiveMenu('brands')}
                            onMouseLeave={() => setActiveMenu(null)}
                        >
                            <span className={`flex items-center gap-1 text-sm font-bold transition-colors cursor-pointer h-full border-b-2 border-transparent ${activeMenu === 'brands' ? 'text-red-600 border-red-600' : 'text-zinc-700 hover:text-red-600 hover:border-red-600'}`}>
                                MARCAS <ChevronDown size={14} className={`transition-transform duration-200 ${activeMenu === 'brands' ? 'rotate-180' : ''}`} />
                            </span>
                            <div className={`absolute top-full left-0 w-full bg-white border-t border-zinc-100 shadow-xl transition-all duration-200 z-50 overflow-hidden ${activeMenu === 'brands' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}>
                                <div className="container mx-auto px-4 md:px-6 py-8">
                                    <h3 className="font-bold text-zinc-400 text-xs uppercase tracking-wider mb-4">Todas nuestras marcas</h3>
                                    <div className="grid grid-cols-6 gap-y-4 gap-x-8">
                                        {MARCAS.map(marca => (
                                            <Link
                                                key={marca}
                                                href={`/catalogo?marca=${marca}`}
                                                onClick={() => setActiveMenu(null)}
                                                className="block py-2 px-3 hover:bg-zinc-50 rounded-lg text-sm font-medium text-zinc-600 hover:text-red-600 hover:pl-4 transition-all border-l-2 border-transparent hover:border-red-600"
                                            >
                                                {marca}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Link href="/contacto" className="h-full flex items-center text-sm font-bold text-zinc-700 hover:text-red-600 border-b-2 border-transparent hover:border-red-600 transition-all">
                            CONTACTO
                        </Link>
                    </div>

                    {/* Search Bar - Flexible */}
                    <div className="hidden md:flex flex-1 max-w-md ml-auto relative z-40" ref={searchRef}>
                        <div className="relative w-full group">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearch}
                                placeholder="Buscar repuesto..."
                                className="w-full pl-10 pr-4 py-2.5 bg-zinc-100 border-none focus:bg-white focus:ring-2 focus:ring-red-600 rounded-full text-sm outline-none transition-all shadow-inner group-hover:shadow-md"
                            />
                            <Search className="absolute left-3 top-3 w-5 h-5 text-zinc-400 group-hover:text-red-500 transition-colors" />

                            {/* Live Results Dropdown */}
                            {(searchQuery.length >= 2 && (searchResults.brands.length > 0 || searchResults.categories.length > 0 || searchResults.products.length > 0)) && (
                                <div className="absolute top-full right-0 w-[400px] mt-2 bg-white rounded-2xl shadow-2xl border border-zinc-100 overflow-hidden">
                                    <div className="max-h-[60vh] overflow-y-auto py-2">
                                        {/* Matches: Brands */}
                                        {searchResults.brands.length > 0 && (
                                            <div className="mb-2">
                                                <div className="px-4 py-2 bg-zinc-50 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Marcas</div>
                                                {searchResults.brands.map(brand => (
                                                    <Link
                                                        key={brand}
                                                        href={`/catalogo?marca=${brand}`}
                                                        onClick={() => setSearchQuery('')}
                                                        className="block px-4 py-2 text-sm text-zinc-800 hover:bg-red-50 hover:text-red-700"
                                                    >
                                                        {brand}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}

                                        {/* Matches: Categories */}
                                        {searchResults.categories.length > 0 && (
                                            <div className="mb-2">
                                                <div className="px-4 py-2 bg-zinc-50 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Categorías</div>
                                                {searchResults.categories.map(cat => (
                                                    <Link
                                                        key={cat.id}
                                                        href={`/catalogo?categoria=${cat.id}`}
                                                        onClick={() => setSearchQuery('')}
                                                        className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-800 hover:bg-red-50 hover:text-red-700"
                                                    >
                                                        <span>{cat.icon}</span> {cat.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}

                                        {/* Matches: Products */}
                                        {searchResults.products.length > 0 && (
                                            <div>
                                                <div className="px-4 py-2 bg-zinc-50 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Productos</div>
                                                {searchResults.products.map(prod => (
                                                    <Link
                                                        key={prod.id}
                                                        href="/catalogo"
                                                        onClick={() => setSearchQuery('')}
                                                        className="flex items-center gap-3 px-4 py-2 hover:bg-zinc-50 border-b border-zinc-50 last:border-0"
                                                    >
                                                        <div className="w-8 h-8 bg-zinc-100 rounded flex items-center justify-center shrink-0">{prod.img}</div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-bold text-zinc-800 truncate">{prod.nombre}</p>
                                                            <p className="text-xs text-red-600 font-bold">${prod.precio.toLocaleString()}</p>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="bg-zinc-50 p-2 text-center border-t border-zinc-100">
                                        <Link href="/catalogo" className="text-xs font-bold text-red-600 hover:underline">
                                            Ver todos
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
                        <button className="lg:hidden p-2 hover:bg-zinc-100 rounded-full" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X className="w-6 h-6 text-zinc-800" /> : <Menu className="w-6 h-6 text-zinc-800" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu - Full Screen Overlay */}
            {
                isMenuOpen && (
                    <div className="md:hidden fixed inset-0 z-[60] bg-white overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-200">
                        {/* Mobile Header */}
                        <div className="flex items-center justify-between p-4 border-b border-zinc-100 bg-white shrink-0">
                            <Link href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
                                <img
                                    src="/logo-mundo-asiatico.webp"
                                    alt="Mundo Asiático"
                                    className="h-10 w-auto object-contain"
                                />
                            </Link>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="p-2 bg-zinc-100 rounded-full hover:bg-zinc-200 transition-colors"
                            >
                                <X className="w-6 h-6 text-zinc-800" />
                            </button>
                        </div>

                        {/* Mobile Content - Scrollable */}
                        <div className="flex-1 overflow-y-auto bg-zinc-50">

                            {/* Mobile Search Section */}
                            <div className="sticky top-0 bg-white p-4 border-b border-zinc-100 shadow-sm z-10">
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={handleSearch}
                                        placeholder="Buscar repuesto..."
                                        className="w-full pl-10 pr-4 py-3 bg-zinc-100 border-none rounded-xl text-base focus:ring-2 focus:ring-red-600 outline-none transition-all"
                                    />
                                    <Search className="absolute left-3 top-3.5 w-5 h-5 text-zinc-400" />
                                </div>

                                {/* Live Results Mobile */}
                                {(searchResults.brands.length > 0 || searchResults.categories.length > 0 || searchResults.products.length > 0) && (
                                    <div className="mt-4 bg-white rounded-xl border border-zinc-100 shadow-lg overflow-hidden">
                                        {searchResults.brands.length > 0 && (
                                            <div className="border-b border-zinc-50">
                                                <div className="px-4 py-2 bg-zinc-50 text-[10px] font-bold text-zinc-500 uppercase">Marcas</div>
                                                {searchResults.brands.map(brand => (
                                                    <Link key={brand} href={`/catalogo?marca=${brand}`} onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-sm font-medium text-zinc-800 border-b border-zinc-50 last:border-0">
                                                        {brand}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                        {searchResults.categories.length > 0 && (
                                            <div className="border-b border-zinc-50">
                                                <div className="px-4 py-2 bg-zinc-50 text-[10px] font-bold text-zinc-500 uppercase">Categorías</div>
                                                {searchResults.categories.map(cat => (
                                                    <Link key={cat.id} href={`/catalogo?categoria=${cat.id}`} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-zinc-800 border-b border-zinc-50 last:border-0">
                                                        <span>{cat.icon}</span> {cat.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                        {searchResults.products.length > 0 && (
                                            <div>
                                                <div className="px-4 py-2 bg-zinc-50 text-[10px] font-bold text-zinc-500 uppercase">Productos</div>
                                                {searchResults.products.map(prod => (
                                                    <Link key={prod.id} href="/catalogo" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 border-b border-zinc-50 last:border-0 active:bg-zinc-50">
                                                        <div className="w-8 h-8 bg-zinc-100 rounded flex items-center justify-center text-lg shrink-0">{prod.img}</div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-bold text-zinc-800 truncate">{prod.nombre}</p>
                                                            <p className="text-xs text-red-600 font-bold">${prod.precio.toLocaleString()}</p>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="p-4 space-y-6 pb-20">
                                <Link
                                    href="/"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-zinc-100 font-bold text-zinc-900 active:scale[0.98] transition-all"
                                >
                                    <span>INICIO</span>
                                    <ChevronDown className="-rotate-90 text-zinc-300" size={16} />
                                </Link>

                                {/* Mobile Categories Grid */}
                                <div>
                                    <div className="flex items-center justify-between mb-3 px-1">
                                        <h3 className="font-bold text-zinc-800 text-sm">Categorías</h3>
                                        <Link href="/catalogo" onClick={() => setIsMenuOpen(false)} className="text-xs font-bold text-red-600">Ver todas</Link>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        {CATEGORIAS.map(cat => (
                                            <Link
                                                key={cat.id}
                                                href={`/catalogo?categoria=${cat.id}`}
                                                onClick={() => setIsMenuOpen(false)}
                                                className="bg-white p-3 rounded-xl border border-zinc-100 shadow-sm flex flex-col items-center justify-center gap-2 text-center active:scale-95 transition-transform"
                                            >
                                                <span className="text-2xl">{cat.icon}</span>
                                                <span className="text-xs font-medium text-zinc-700 leading-tight">{cat.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Mobile Brands Grid */}
                                <div>
                                    <div className="flex items-center justify-between mb-3 px-1">
                                        <h3 className="font-bold text-zinc-800 text-sm">Marcas Populares</h3>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        {MARCAS.map(marca => (
                                            <Link
                                                key={marca}
                                                href={`/catalogo?marca=${marca}`}
                                                onClick={() => setIsMenuOpen(false)}
                                                className="bg-white py-2 px-1 rounded-lg border border-zinc-100 shadow-sm text-center text-xs font-medium text-zinc-600 truncate active:bg-zinc-50"
                                            >
                                                {marca}
                                            </Link>
                                        ))}
                                        <Link href="/catalogo" onClick={() => setIsMenuOpen(false)} className="bg-red-50 py-2 px-1 rounded-lg border border-red-100 text-center text-xs font-bold text-red-600 flex items-center justify-center">
                                            Ver más...
                                        </Link>
                                    </div>
                                </div>

                                <Link
                                    href="/contacto"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center justify-center p-4 bg-zinc-900 text-white rounded-xl font-bold shadow-lg shadow-zinc-200 mt-4 active:scale-95 transition-transform"
                                >
                                    CONTACTAR SOPORTE
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            }
        </nav >
    );
};
