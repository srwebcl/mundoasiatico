'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X, Search, ChevronDown, User, LogOut } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

export const Navbar = () => {
    const [isMenuOpen,    setIsMenuOpen]    = useState(false);
    const [activeMenu,    setActiveMenu]    = useState(null);
    const [searchQuery,   setSearchQuery]   = useState('');
    const [searchResults, setSearchResults] = useState({ categories: [], products: [] });
    const [searching,     setSearching]     = useState(false);
    const [categories,    setCategories]    = useState([]);
    const [brands,        setBrands]        = useState([]);
    const { openCart, cart, user, logoutUser } = useShop();
    const searchRef = useRef(null);
    const searchTimer = useRef(null);
    const router = useRouter();

    const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

    // ── Cargar categorías y marcas para los megamenús ─────────────────────────
    useEffect(() => {
        Promise.all([api.getCategories(), api.getBrands()])
            .then(([catRes, brandRes]) => {
                setCategories(catRes.data ?? []);
                setBrands(brandRes.data ?? []);
            })
            .catch(() => {}); // silencioso
    }, []);

    // ── Click fuera del buscador ──────────────────────────────────────────────
    useEffect(() => {
        const handleClickOutside = e => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setSearchQuery('');
                setSearchResults({ categories: [], products: [] });
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // ── Live search con debounce ──────────────────────────────────────────────
    const handleSearch = useCallback((q) => {
        setSearchQuery(q);
        clearTimeout(searchTimer.current);

        if (q.length < 2) {
            setSearchResults({ categories: [], products: [] });
            return;
        }

        setSearching(true);
        searchTimer.current = setTimeout(async () => {
            try {
                const [catRes, prodRes] = await Promise.all([
                    api.getCategories(),
                    api.getProducts({ search: q, page: 1 }),
                ]);
                const term = q.toLowerCase();
                setSearchResults({
                    categories: (catRes.data ?? []).filter(c => c.name.toLowerCase().includes(term)).slice(0, 3),
                    products:   (prodRes.data ?? []).slice(0, 4),
                });
            } catch {
                setSearchResults({ categories: [], products: [] });
            } finally {
                setSearching(false);
            }
        }, 350);
    }, []);

    const clearSearch = () => {
        setSearchQuery('');
        setSearchResults({ categories: [], products: [] });
    };

    const handleLogout = async () => {
        await api.logout().catch(() => {});
        logoutUser();
        router.push('/');
    };

    const hasResults = searchResults.categories.length > 0 || searchResults.products.length > 0;

    return (
        <nav className="bg-white border-b border-zinc-100 sticky top-0 z-50 shadow-sm font-sans">

            {/* Top promo bar */}
            <div className="bg-[#0a0a0a] text-white text-[10px] md:text-xs py-1.5 px-4 text-center tracking-wider uppercase font-medium">
                <span className="text-red-500 font-bold mr-2">OFERTA:</span>
                Despacho gratis en compras sobre $50.000
            </div>

            {/* Main header */}
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

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-8 shrink-0 h-20">
                        <Link href="/" className="h-full flex items-center text-sm font-bold text-zinc-700 hover:text-red-600 border-b-2 border-transparent hover:border-red-600 transition-all">
                            INICIO
                        </Link>

                        {/* Mega Menu: Catálogo */}
                        <div className="h-full flex items-center"
                            onMouseEnter={() => setActiveMenu('catalog')}
                            onMouseLeave={() => setActiveMenu(null)}>
                            <span className={`flex items-center gap-1 text-sm font-bold transition-colors cursor-pointer h-full border-b-2 border-transparent ${activeMenu === 'catalog' ? 'text-red-600 border-red-600' : 'text-zinc-700 hover:text-red-600 hover:border-red-600'}`}>
                                CATÁLOGO <ChevronDown size={14} className={`transition-transform duration-200 ${activeMenu === 'catalog' ? 'rotate-180' : ''}`} />
                            </span>
                            <div className={`absolute top-full left-0 w-full bg-white border-t border-zinc-100 shadow-xl transition-all duration-200 z-50 overflow-hidden ${activeMenu === 'catalog' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}>
                                <div className="container mx-auto px-4 md:px-6 py-8">
                                    <div className="grid grid-cols-5 gap-6">
                                        {categories.map(cat => (
                                            <Link
                                                key={cat.id}
                                                href={`/catalogo?categoria=${cat.slug}`}
                                                onClick={() => setActiveMenu(null)}
                                                className="group/item block relative overflow-hidden rounded-xl aspect-[4/3] shadow-sm hover:shadow-md transition-all bg-zinc-900"
                                            >
                                                {cat.image
                                                    ? <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110 opacity-80" />
                                                    : <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-20">{cat.icon}</div>
                                                }
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                                <div className="absolute bottom-0 left-0 w-full p-4">
                                                    <div className="flex items-center gap-2 text-white">
                                                        <span className="text-xl">{cat.icon}</span>
                                                        <span className="font-bold text-sm group-hover/item:text-red-400 transition-colors">{cat.name}</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mega Menu: Marcas */}
                        <div className="h-full flex items-center"
                            onMouseEnter={() => setActiveMenu('brands')}
                            onMouseLeave={() => setActiveMenu(null)}>
                            <span className={`flex items-center gap-1 text-sm font-bold transition-colors cursor-pointer h-full border-b-2 border-transparent ${activeMenu === 'brands' ? 'text-red-600 border-red-600' : 'text-zinc-700 hover:text-red-600 hover:border-red-600'}`}>
                                MARCAS <ChevronDown size={14} className={`transition-transform duration-200 ${activeMenu === 'brands' ? 'rotate-180' : ''}`} />
                            </span>
                            <div className={`absolute top-full left-0 w-full bg-white border-t border-zinc-100 shadow-xl transition-all duration-200 z-50 overflow-hidden ${activeMenu === 'brands' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}>
                                <div className="container mx-auto px-4 md:px-6 py-8">
                                    <h3 className="font-bold text-zinc-400 text-xs uppercase tracking-wider mb-4">Todas nuestras marcas</h3>
                                    <div className="grid grid-cols-6 gap-y-4 gap-x-8">
                                        {brands.map(brand => (
                                            <Link
                                                key={brand.id}
                                                href={`/catalogo?marca=${brand.slug}`}
                                                onClick={() => setActiveMenu(null)}
                                                className="block py-2 px-3 hover:bg-zinc-50 rounded-lg text-sm font-medium text-zinc-600 hover:text-red-600 hover:pl-4 transition-all border-l-2 border-transparent hover:border-red-600"
                                            >
                                                {brand.name}
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

                    {/* Search Bar */}
                    <div className="hidden md:flex flex-1 max-w-md ml-auto relative z-40" ref={searchRef}>
                        <div className="relative w-full group">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={e => handleSearch(e.target.value)}
                                placeholder="Busca repuesto: Filtro, Chery..."
                                className="w-full pl-5 pr-12 py-2.5 bg-zinc-50 border border-zinc-200 focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-50 rounded-full text-sm outline-none transition-all shadow-sm group-hover:shadow-md placeholder:text-zinc-400 text-zinc-800"
                            />
                            <button
                                onClick={() => { if (searchQuery) router.push(`/catalogo?search=${searchQuery}`); clearSearch(); }}
                                className="absolute right-1.5 top-1.5 bottom-1.5 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-all shadow-sm"
                            >
                                <Search className="w-4 h-4" />
                            </button>

                            {/* Resultados en vivo */}
                            {searchQuery.length >= 2 && (hasResults || searching) && (
                                <div className="absolute top-full right-0 w-[400px] mt-2 bg-white rounded-2xl shadow-2xl border border-zinc-100 overflow-hidden">
                                    <div className="max-h-[60vh] overflow-y-auto py-2">
                                        {searching && (
                                            <div className="px-4 py-3 text-sm text-zinc-400 flex items-center gap-2">
                                                <div className="w-3 h-3 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                                                Buscando...
                                            </div>
                                        )}

                                        {searchResults.categories.length > 0 && (
                                            <div className="mb-2">
                                                <div className="px-4 py-2 bg-zinc-50 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Categorías</div>
                                                {searchResults.categories.map(cat => (
                                                    <Link key={cat.id} href={`/catalogo?categoria=${cat.slug}`} onClick={clearSearch}
                                                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-zinc-800 hover:bg-red-50 hover:text-red-700 transition-colors">
                                                        <span>{cat.icon}</span> {cat.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}

                                        {searchResults.products.length > 0 && (
                                            <div>
                                                <div className="px-4 py-2 bg-zinc-50 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Productos</div>
                                                {searchResults.products.map(prod => (
                                                    <Link key={prod.id} href={`/producto/${prod.slug}`} onClick={clearSearch}
                                                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-zinc-50 border-b border-zinc-50 last:border-0 transition-colors">
                                                        <div className="w-8 h-8 bg-zinc-100 rounded-lg flex items-center justify-center text-sm shrink-0">
                                                            {prod.image ? <img src={prod.image} alt={prod.name} className="w-full h-full object-contain p-0.5 rounded-lg" /> : '📦'}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-bold text-zinc-800 truncate">{prod.name}</p>
                                                            <p className="text-xs text-red-600 font-bold">${prod.regular_price?.toLocaleString()}</p>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        )}

                                        <div className="bg-zinc-50 p-2 text-center border-t border-zinc-100">
                                            <Link href={`/catalogo?search=${searchQuery}`} onClick={clearSearch} className="text-xs font-bold text-red-600 hover:underline">
                                                Ver todos los resultados →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Icons */}
                    <div className="flex items-center gap-2 md:gap-3 shrink-0">

                        {/* Usuario autenticado */}
                        {user ? (
                            <div className="hidden md:flex items-center gap-2">
                                <span className="text-xs text-zinc-500 font-medium max-w-[100px] truncate">{user.name?.split(' ')[0]}</span>
                                <button onClick={handleLogout} title="Cerrar sesión"
                                    className="p-2 rounded-full hover:bg-red-50 hover:text-red-600 text-zinc-400 transition-colors">
                                    <LogOut size={18} />
                                </button>
                            </div>
                        ) : (
                            <Link href="/login" className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-200 text-xs font-bold text-zinc-600 hover:border-red-600 hover:text-red-600 transition-all">
                                <User size={14} /> Ingresar
                            </Link>
                        )}

                        {/* Carrito */}
                        <button onClick={openCart} className="relative p-2.5 hover:bg-zinc-100 rounded-full transition-colors group">
                            <ShoppingCart className="w-6 h-6 text-zinc-700 group-hover:text-red-600 transition-colors" />
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-sm border-2 border-white">
                                    {totalItems}
                                </span>
                            )}
                        </button>

                        {/* Hamburger mobile */}
                        <button className="lg:hidden p-2 hover:bg-zinc-100 rounded-full" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X className="w-6 h-6 text-zinc-800" /> : <Menu className="w-6 h-6 text-zinc-800" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden fixed inset-0 z-[60] bg-white overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-200">
                    {/* Mobile Header */}
                    <div className="flex items-center justify-between p-4 border-b border-zinc-100 shrink-0">
                        <Link href="/" onClick={() => setIsMenuOpen(false)}>
                            <img src="/logo-mundo-asiatico.webp" alt="Mundo Asiático" className="h-10 w-auto object-contain" />
                        </Link>
                        <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-zinc-100 rounded-full hover:bg-zinc-200 transition-colors">
                            <X className="w-6 h-6 text-zinc-800" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto bg-zinc-50">
                        {/* Buscador mobile */}
                        <div className="sticky top-0 bg-white p-4 border-b border-zinc-100 shadow-sm z-10">
                            <div className="relative">
                                <input type="text" value={searchQuery} onChange={e => handleSearch(e.target.value)}
                                    placeholder="Buscar repuesto..." onKeyDown={e => { if (e.key === 'Enter') { router.push(`/catalogo?search=${searchQuery}`); setIsMenuOpen(false); clearSearch(); } }}
                                    className="w-full pl-10 pr-4 py-3 bg-zinc-100 rounded-xl text-base focus:ring-2 focus:ring-red-600 outline-none" />
                                <Search className="absolute left-3 top-3.5 w-5 h-5 text-zinc-400" />
                            </div>

                            {/* Resultados mobile */}
                            {hasResults && (
                                <div className="mt-3 bg-white rounded-xl border border-zinc-100 shadow-lg overflow-hidden">
                                    {searchResults.products.map(prod => (
                                        <Link key={prod.id} href={`/producto/${prod.slug}`} onClick={() => { setIsMenuOpen(false); clearSearch(); }}
                                            className="flex items-center gap-3 px-4 py-3 border-b border-zinc-50 last:border-0">
                                            <div className="w-8 h-8 bg-zinc-100 rounded-lg flex items-center justify-center text-sm shrink-0">📦</div>
                                            <div>
                                                <p className="text-sm font-bold text-zinc-800">{prod.name}</p>
                                                <p className="text-xs text-red-600 font-bold">${prod.regular_price?.toLocaleString()}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="p-4 space-y-6 pb-20">
                            <Link href="/" onClick={() => setIsMenuOpen(false)}
                                className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-zinc-100 font-bold text-zinc-900">
                                <span>INICIO</span>
                                <ChevronDown className="-rotate-90 text-zinc-300" size={16} />
                            </Link>

                            {/* Categorías mobile */}
                            <div>
                                <div className="flex items-center justify-between mb-3 px-1">
                                    <h3 className="font-bold text-zinc-800 text-sm">Categorías</h3>
                                    <Link href="/catalogo" onClick={() => setIsMenuOpen(false)} className="text-xs font-bold text-red-600">Ver todas</Link>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {categories.map(cat => (
                                        <Link key={cat.id} href={`/catalogo?categoria=${cat.slug}`} onClick={() => setIsMenuOpen(false)}
                                            className="bg-white p-3 rounded-xl border border-zinc-100 shadow-sm flex flex-col items-center justify-center gap-2 text-center active:scale-95 transition-transform">
                                            <span className="text-2xl">{cat.icon}</span>
                                            <span className="text-xs font-medium text-zinc-700 leading-tight">{cat.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Marcas mobile */}
                            <div>
                                <h3 className="font-bold text-zinc-800 text-sm mb-3 px-1">Marcas Populares</h3>
                                <div className="grid grid-cols-3 gap-2">
                                    {brands.slice(0, 11).map(brand => (
                                        <Link key={brand.id} href={`/catalogo?marca=${brand.slug}`} onClick={() => setIsMenuOpen(false)}
                                            className="bg-white py-2 px-1 rounded-lg border border-zinc-100 shadow-sm text-center text-xs font-medium text-zinc-600 truncate active:bg-zinc-50">
                                            {brand.name}
                                        </Link>
                                    ))}
                                    <Link href="/catalogo" onClick={() => setIsMenuOpen(false)}
                                        className="bg-red-50 py-2 px-1 rounded-lg border border-red-100 text-center text-xs font-bold text-red-600 flex items-center justify-center">
                                        Ver más...
                                    </Link>
                                </div>
                            </div>

                            {/* Auth mobile */}
                            {user ? (
                                <div className="flex gap-3">
                                    <div className="flex-1 p-3 bg-zinc-100 rounded-xl text-center text-sm font-bold text-zinc-600">{user.name?.split(' ')[0]}</div>
                                    <button onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                                        className="flex-1 p-3 bg-red-50 rounded-xl text-center text-sm font-bold text-red-600">
                                        Cerrar sesión
                                    </button>
                                </div>
                            ) : (
                                <Link href="/login" onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center justify-center gap-2 p-4 bg-zinc-900 text-white rounded-xl font-bold shadow-lg">
                                    <User size={18} /> INGRESAR / REGISTRARSE
                                </Link>
                            )}

                            <Link href="/contacto" onClick={() => setIsMenuOpen(false)}
                                className="flex items-center justify-center p-4 bg-white border border-zinc-200 text-zinc-700 rounded-xl font-bold">
                                CONTACTO
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};
