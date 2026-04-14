'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Search, Filter, ChevronRight, X, ShoppingCart, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { useSearchParams } from 'next/navigation';
import api from '@/lib/api';

// ── Skeleton card para loading ──────────────────────────────────────────────
const SkeletonCard = () => (
    <div className="bg-white rounded-lg border border-zinc-200 shadow-sm overflow-hidden animate-pulse">
        <div className="h-40 bg-zinc-100" />
        <div className="p-4 space-y-3">
            <div className="h-3 bg-zinc-200 rounded w-1/3" />
            <div className="h-4 bg-zinc-200 rounded w-3/4" />
            <div className="h-3 bg-zinc-200 rounded w-1/4" />
            <div className="h-6 bg-zinc-200 rounded w-1/2 mt-4" />
        </div>
    </div>
);

const Catalog = () => {
    const searchParams = useSearchParams();

    // ── Estado de filtros ────────────────────────────────────────────────────
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('categoria') || '');
    const [selectedBrand,    setSelectedBrand]    = useState(searchParams.get('marca') || '');
    const [selectedModel,    setSelectedModel]    = useState('');
    const [priceMax,         setPriceMax]         = useState(200000);
    const [sortOption,       setSortOption]       = useState('default');
    const [searchText,       setSearchText]       = useState('');
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    // ── Datos de la API ──────────────────────────────────────────────────────
    const [products,   setProducts]   = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands,     setBrands]     = useState([]);
    const [meta,       setMeta]       = useState({ total: 0, current_page: 1, last_page: 1 });
    const [loading,    setLoading]    = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const { addToCart, isWholesale, getProductPrice } = useShop();

    // ── Cargar categorías y marcas UNA sola vez ──────────────────────────────
    useEffect(() => {
        Promise.all([api.getCategories(), api.getBrands()])
            .then(([catRes, brandRes]) => {
                setCategories(catRes.data ?? []);
                setBrands(brandRes.data ?? []);
            })
            .catch(console.error);
    }, []);

    // ── Sincronizar URL params al cambiar ────────────────────────────────────
    useEffect(() => {
        const cat   = searchParams.get('categoria') || '';
        const brand = searchParams.get('marca') || '';
        setSelectedCategory(cat);
        setSelectedBrand(brand);
        setCurrentPage(1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [searchParams]);

    // ── Fetch productos cuando cambia cualquier filtro ───────────────────────
    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const res = await api.getProducts({
                category:  selectedCategory || undefined,
                brand:     selectedBrand    || undefined,
                car_model: selectedModel    || undefined,
                price_max: priceMax < 200000 ? priceMax : undefined,
                search:    searchText       || undefined,
                sort:      sortOption !== 'default' ? sortOption : undefined,
                page:      currentPage,
            });
            setProducts(res.data ?? []);
            setMeta(res.meta ?? { total: 0, current_page: 1, last_page: 1 });
        } catch (err) {
            console.error('Error cargando productos:', err);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, [selectedCategory, selectedBrand, selectedModel, priceMax, searchText, sortOption, currentPage]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // ── Handlers ────────────────────────────────────────────────────────────
    const handleBrandChange = (e) => {
        setSelectedBrand(e.target.value);
        setSelectedModel('');
        setCurrentPage(1);
    };

    const handleCategoryChange = (slug) => {
        setSelectedCategory(slug);
        setCurrentPage(1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 300, behavior: 'smooth' });
    };

    const clearFilters = () => {
        setSelectedCategory('');
        setSelectedBrand('');
        setSelectedModel('');
        setPriceMax(200000);
        setSearchText('');
        setSortOption('default');
        setCurrentPage(1);
    };

    // Modelos disponibles del brand seleccionado
    const modelsForBrand = brands.find(b => b.slug === selectedBrand)?.car_models ?? [];

    // Nombre de la categoría activa
    const activeCategoryName = categories.find(c => c.slug === selectedCategory)?.name || '';

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* ── Header / Banner ─────────────────────────────────────────── */}
            <div className="container mx-auto px-4 mt-8 mb-8">
                <div className="relative w-full h-auto min-h-[200px] md:h-64 rounded-3xl overflow-hidden shadow-2xl flex items-center bg-zinc-900 group">
                    <img
                        src="/images/catalog-banner-v2.png"
                        alt="Catálogo Repuestos"
                        className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="relative z-10 w-full h-full bg-black/50 backdrop-blur-[2px] flex flex-col justify-center items-center px-4 text-center">
                        <span className="text-white/90 font-bold tracking-[0.2em] text-xs md:text-sm uppercase mb-2">
                            {selectedBrand ? 'Marca' : selectedCategory ? 'Categoría' : 'Mundo Asiático'}
                        </span>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white italic tracking-tighter uppercase leading-none pb-2 drop-shadow-2xl">
                            {activeCategoryName || selectedBrand ? (
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400 block whitespace-nowrap pr-8 pb-4 -mb-4">
                                    {activeCategoryName || selectedBrand}
                                </span>
                            ) : (
                                <>
                                    Catálogo de <br className="md:hidden" />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400 md:ml-4 block md:inline pr-2 pb-2 -mb-2">Repuestos</span>
                                </>
                            )}
                        </h1>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-8">
                <div className="flex flex-col md:flex-row gap-8">

                    {/* ── Sidebar de filtros ─────────────────────────────── */}
                    <div className={`
                        fixed inset-0 z-40 bg-white p-6 md:static md:p-0 md:w-64 md:block overflow-y-auto transition-transform duration-300
                        ${isMobileFiltersOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                    `}>
                        <div className="flex items-center justify-between md:hidden mb-6">
                            <span className="font-bold text-lg">Filtros</span>
                            <button onClick={() => setIsMobileFiltersOpen(false)}><X /></button>
                        </div>

                        {/* Buscador */}
                        <div className="mb-6">
                            <label className="text-xs font-bold text-zinc-500 mb-1 block">Buscar repuesto</label>
                            <div className="relative">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                                <input
                                    type="text"
                                    value={searchText}
                                    onChange={e => { setSearchText(e.target.value); setCurrentPage(1); }}
                                    placeholder="SKU, nombre..."
                                    className="w-full pl-8 pr-3 py-2 border border-zinc-200 rounded-lg text-sm focus:border-red-600 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Mi Vehículo */}
                        <div className="mb-8">
                            <h3 className="font-bold text-zinc-900 mb-4 text-sm uppercase tracking-wider">Mi Vehículo</h3>
                            <div className="space-y-3">
                                <div>
                                    <label className="text-xs font-bold text-zinc-500 mb-1 block">Marca</label>
                                    <select
                                        value={selectedBrand}
                                        onChange={handleBrandChange}
                                        className="w-full p-2 border border-zinc-200 rounded-lg text-sm focus:border-red-600 focus:outline-none"
                                    >
                                        <option value="">Todas las Marcas</option>
                                        {brands.map(b => (
                                            <option key={b.id} value={b.slug}>{b.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-zinc-500 mb-1 block">Modelo</label>
                                    <select
                                        value={selectedModel}
                                        onChange={e => { setSelectedModel(e.target.value); setCurrentPage(1); }}
                                        disabled={!selectedBrand}
                                        className="w-full p-2 border border-zinc-200 rounded-lg text-sm focus:border-red-600 focus:outline-none disabled:bg-zinc-100 disabled:text-zinc-400"
                                    >
                                        <option value="">Todos los Modelos</option>
                                        {modelsForBrand.map(m => (
                                            <option key={m.id} value={m.slug}>{m.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Categorías */}
                        <div className="mb-8">
                            <h3 className="font-bold text-zinc-900 mb-4 text-sm uppercase tracking-wider">Categorías</h3>
                            <div className="space-y-2">
                                <button
                                    onClick={() => handleCategoryChange('')}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${!selectedCategory ? 'bg-red-600 text-white' : 'hover:bg-zinc-50 text-zinc-600'}`}
                                >
                                    Todas
                                </button>
                                {categories.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => handleCategoryChange(cat.slug)}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${selectedCategory === cat.slug ? 'bg-red-600 text-white' : 'hover:bg-zinc-50 text-zinc-600'}`}
                                    >
                                        <span>{cat.icon} {cat.name}</span>
                                        {selectedCategory === cat.slug && <ChevronRight size={14} />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Precio máximo */}
                        <div>
                            <h3 className="font-bold text-zinc-900 mb-4 text-sm uppercase tracking-wider">Precio Máximo</h3>
                            <input
                                type="range" min="0" max="200000" step="5000"
                                value={priceMax}
                                onChange={e => { setPriceMax(parseInt(e.target.value)); setCurrentPage(1); }}
                                className="w-full accent-red-600 cursor-pointer"
                            />
                            <div className="flex justify-between text-xs font-bold text-zinc-500 mt-2">
                                <span>$0</span>
                                <span>{priceMax < 200000 ? `$${priceMax.toLocaleString()}` : 'Sin límite'}</span>
                            </div>
                        </div>
                    </div>

                    {/* ── Grid de productos ─────────────────────────────── */}
                    <main className="w-full md:w-3/4">
                        {/* Barra superior */}
                        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <h2 className="text-2xl font-bold">
                                    {activeCategoryName || 'Catálogo Completo'}
                                </h2>
                                <span className="text-zinc-500 text-sm">
                                    {loading ? 'Cargando...' : `${meta.total} productos • Página ${meta.current_page} de ${meta.last_page}`}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                {/* Botón filtros mobile */}
                                <button
                                    onClick={() => setIsMobileFiltersOpen(true)}
                                    className="md:hidden flex items-center gap-2 px-4 py-2 border border-zinc-200 rounded-lg text-sm font-bold"
                                >
                                    <Filter size={16} /> Filtros
                                </button>

                                <select
                                    value={sortOption}
                                    onChange={e => { setSortOption(e.target.value); setCurrentPage(1); }}
                                    className="p-2 border border-zinc-200 rounded-lg text-sm focus:border-red-600 focus:outline-none bg-white"
                                >
                                    <option value="default">Relevancia</option>
                                    <option value="price-asc">Precio: Menor a Mayor</option>
                                    <option value="price-desc">Precio: Mayor a Menor</option>
                                    <option value="name-asc">Nombre: A - Z</option>
                                    <option value="name-desc">Nombre: Z - A</option>
                                </select>
                            </div>
                        </div>

                        {/* Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {loading
                                ? [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
                                : products.map(product => {
                                    const price = getProductPrice(product);
                                    const slug  = product.slug ?? product.id;
                                    return (
                                        <div key={product.id} className="bg-white rounded-lg border border-zinc-200 shadow-sm hover:shadow-xl transition-shadow overflow-hidden group relative">
                                            <Link href={`/producto/${slug}`} className="block">
                                                <div className="h-40 bg-zinc-100 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                                                    {product.image
                                                        ? <img src={product.image} alt={product.name} className="w-full h-full object-contain p-4" />
                                                        : <span>{product.category?.name === 'Encendido' ? '⚡' : product.category?.name === 'Filtros' ? '🔩' : product.category?.name === 'Frenos' ? '🛑' : '🔧'}</span>
                                                    }
                                                </div>
                                                <div className="p-4">
                                                    <div className="text-xs font-bold text-zinc-400 mb-1 uppercase">
                                                        {product.brand?.name ?? product.category?.name ?? '—'}
                                                    </div>
                                                    <h3 className="font-bold text-zinc-900 leading-tight mb-2 h-10 overflow-hidden">
                                                        {product.name}
                                                    </h3>
                                                    <div className="text-xs text-zinc-500 mb-4">SKU: {product.sku}</div>

                                                    <div className="flex items-end justify-between">
                                                        <div>
                                                            {isWholesale && product.regular_price !== price && (
                                                                <div className="text-xs text-zinc-400 line-through">
                                                                    ${product.regular_price?.toLocaleString()}
                                                                </div>
                                                            )}
                                                            <div className="text-xl font-bold text-red-600">
                                                                ${price.toLocaleString()}
                                                            </div>
                                                            {isWholesale && <span className="text-[10px] text-blue-600 font-bold">PRECIO MAYORISTA</span>}
                                                        </div>
                                                        {!product.in_stock && (
                                                            <span className="text-[10px] font-bold text-zinc-400 border border-zinc-200 rounded px-2 py-1">SIN STOCK</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </Link>

                                            {product.in_stock && (
                                                <button
                                                    onClick={e => { e.preventDefault(); e.stopPropagation(); addToCart(product); }}
                                                    className="absolute bottom-4 right-4 bg-zinc-900 text-white p-2.5 rounded-full hover:bg-red-600 transition-colors shadow-lg z-10"
                                                    title="Agregar al carro"
                                                >
                                                    <ShoppingCart size={18} />
                                                </button>
                                            )}
                                        </div>
                                    );
                                })
                            }
                        </div>

                        {/* Sin resultados */}
                        {!loading && products.length === 0 && (
                            <div className="text-center py-20 bg-zinc-50 rounded-lg">
                                <Filter className="mx-auto text-zinc-300 mb-4" size={48} />
                                <p className="text-zinc-500">No encontramos repuestos con estos filtros.</p>
                                <button onClick={clearFilters} className="text-red-600 font-bold mt-2">
                                    Limpiar filtros
                                </button>
                            </div>
                        )}

                        {/* Paginación */}
                        {!loading && meta.last_page > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-8 mb-12">
                                <button
                                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed font-bold"
                                >
                                    Anterior
                                </button>

                                <div className="flex gap-1">
                                    {[...Array(meta.last_page)].map((_, i) => {
                                        const page = i + 1;
                                        if (meta.last_page > 7 && Math.abs(currentPage - page) > 2 && page !== 1 && page !== meta.last_page) {
                                            if (Math.abs(currentPage - page) === 3) return <span key={page} className="px-2">...</span>;
                                            return null;
                                        }
                                        return (
                                            <button
                                                key={page}
                                                onClick={() => handlePageChange(page)}
                                                className={`w-10 h-10 rounded-lg font-bold transition-colors ${currentPage === page ? 'bg-red-600 text-white' : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200'}`}
                                            >
                                                {page}
                                            </button>
                                        );
                                    })}
                                </div>

                                <button
                                    onClick={() => handlePageChange(Math.min(meta.last_page, currentPage + 1))}
                                    disabled={currentPage === meta.last_page}
                                    className="px-4 py-2 rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed font-bold"
                                >
                                    Siguiente
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Catalog;
