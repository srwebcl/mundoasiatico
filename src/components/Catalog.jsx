'use client';
import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, ChevronRight, X, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { PRODUCTOS_BASE, CATEGORIAS, MARCAS, MODELOS } from '@/data/mockData';
import { useShop } from '@/context/ShopContext';
import { useSearchParams, useRouter } from 'next/navigation';

const Catalog = () => {
    const searchParams = useSearchParams();
    const brandParam = searchParams.get('marca');
    const categoryParam = searchParams.get('categoria');

    const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all');
    const [selectedBrand, setSelectedBrand] = useState(brandParam || 'all');
    const [selectedModel, setSelectedModel] = useState('all'); // New State for Model
    const [priceRange, setPriceRange] = useState([0, 200000]);
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const { addToCart, isWholesale } = useShop();

    // Effect to update state if URL params change
    useEffect(() => {
        if (brandParam) setSelectedBrand(brandParam);
        if (categoryParam) setSelectedCategory(categoryParam);
        setCurrentPage(1); // Reset page on URL param change
    }, [brandParam, categoryParam]);

    // Reset model when brand changes
    const handleBrandChange = (e) => {
        setSelectedBrand(e.target.value);
        setSelectedModel('all');
        setCurrentPage(1); // Reset page
    };

    // Handle filter changes
    const handleCategoryChange = (catId) => {
        setSelectedCategory(catId);
        setCurrentPage(1);
    };

    const filteredProducts = PRODUCTOS_BASE.filter(product => {
        const matchCategory = selectedCategory === 'all' || product.categoria === selectedCategory;
        const matchBrand = selectedBrand === 'all' || product.marca.toLowerCase() === selectedBrand.toLowerCase();
        const matchModel = selectedModel === 'all' || product.modelo.toLowerCase() === selectedModel.toLowerCase();
        const matchPrice = product.precio >= priceRange[0] && product.precio <= priceRange[1];
        return matchCategory && matchBrand && matchModel && matchPrice;
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const currentProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 300, behavior: 'smooth' });
    };

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Header / Banner */}
            <div className="container mx-auto px-4 mt-8 mb-8">
                <div className="relative w-full h-auto min-h-[200px] md:h-64 rounded-3xl overflow-hidden shadow-2xl flex items-center bg-zinc-900 group">
                    {/* Background Image */}
                    <img
                        src="/images/catalog-banner-v2.png"
                        alt="Catálogo Repuestos"
                        className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Gradient Overlay & Content */}
                    <div className="relative z-10 w-full h-full bg-black/50 backdrop-blur-[2px] flex flex-col justify-center items-center px-4 text-center">
                        <span className="text-white/90 font-bold tracking-[0.2em] text-xs md:text-sm uppercase mb-2 animate-in fade-in slide-in-from-bottom duration-700">
                            {selectedBrand !== 'all' && selectedCategory !== 'all'
                                ? `Repuestos ${selectedBrand}`
                                : selectedBrand !== 'all'
                                    ? 'Marca'
                                    : selectedCategory !== 'all'
                                        ? 'Categoría'
                                        : 'Mundo Asiático'}
                        </span>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white italic tracking-tighter uppercase leading-none pb-2 animate-in fade-in slide-in-from-bottom duration-700 delay-100 drop-shadow-2xl">
                            {selectedBrand !== 'all' && selectedCategory !== 'all' ? (
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400 block whitespace-nowrap pr-8 pb-4 -mb-4">
                                    {CATEGORIAS.find(c => c.id === selectedCategory)?.name || selectedCategory}
                                </span>
                            ) : selectedBrand !== 'all' ? (
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400 block whitespace-nowrap pr-8 pb-4 -mb-4">
                                    {selectedBrand}
                                </span>
                            ) : selectedCategory !== 'all' ? (
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400 block whitespace-nowrap pr-8 pb-4 -mb-4">
                                    {CATEGORIAS.find(c => c.id === selectedCategory)?.name || selectedCategory}
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

                    {/* Filters Sidebar */}
                    <div className={`
                        fixed inset-0 z-40 bg-white p-6 md:static md:p-0 md:w-64 md:block overflow-y-auto transition-transform duration-300
                        ${isMobileFiltersOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                    `}>
                        <div className="flex items-center justify-between md:hidden mb-6">
                            <span className="font-bold text-lg">Filtros</span>
                            <button onClick={() => setIsMobileFiltersOpen(false)}><X /></button>
                        </div>

                        {/* Brand & Model Filters (Mi Vehículo) */}
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
                                        <option value="all">Todas las Marcas</option>
                                        {MARCAS.map(marca => (
                                            <option key={marca} value={marca}>{marca}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Model Selector - Dependent on Brand */}
                                <div>
                                    <label className="text-xs font-bold text-zinc-500 mb-1 block">Modelo</label>
                                    <select
                                        value={selectedModel}
                                        onChange={(e) => { setSelectedModel(e.target.value); setCurrentPage(1); }}
                                        className="w-full p-2 border border-zinc-200 rounded-lg text-sm focus:border-red-600 focus:outline-none disabled:bg-zinc-100 disabled:text-zinc-400"
                                        disabled={selectedBrand === 'all'}
                                    >
                                        <option value="all">Todos los Modelos</option>
                                        {selectedBrand !== 'all' && MODELOS[selectedBrand]?.map(modelo => (
                                            <option key={modelo} value={modelo}>{modelo}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div className="mb-8">
                            <h3 className="font-bold text-zinc-900 mb-4 text-sm uppercase tracking-wider">Categorías</h3>
                            <div className="space-y-2">
                                <button
                                    onClick={() => handleCategoryChange('all')}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === 'all' ? 'bg-red-600 text-white' : 'hover:bg-zinc-50 text-zinc-600'}`}
                                >
                                    Todas
                                </button>
                                {CATEGORIAS.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => handleCategoryChange(cat.id)}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${selectedCategory === cat.id ? 'bg-red-600 text-white' : 'hover:bg-zinc-50 text-zinc-600'}`}
                                    >
                                        <span>{cat.name}</span>
                                        {selectedCategory === cat.id && <ChevronRight size={14} />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Price Filter (Simple Visual) */}
                        <div>
                            <h3 className="font-bold text-zinc-900 mb-4 text-sm uppercase tracking-wider">Precio Máximo</h3>
                            <input
                                type="range"
                                min="0"
                                max="200000"
                                step="5000"
                                value={priceRange[1]}
                                onChange={(e) => { setPriceRange([0, parseInt(e.target.value)]); setCurrentPage(1); }}
                                className="w-full accent-red-600 cursor-pointer"
                            />
                            <div className="flex justify-between text-xs font-bold text-zinc-500 mt-2">
                                <span>$0</span>
                                <span>${priceRange[1].toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <main className="w-full md:w-3/4">
                        <div className="mb-6 flex justify-between items-center">
                            <h2 className="text-2xl font-bold">
                                {selectedCategory === 'all' ? 'Catálogo Completo' : CATEGORIAS.find(c => c.id === selectedCategory)?.name}
                            </h2>
                            <span className="text-zinc-500 text-sm">
                                {filteredProducts.length} productos • {currentPage} de {totalPages}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {currentProducts.map(product => {
                                const price = isWholesale ? product.precio * 0.8 : product.precio;
                                return (
                                    <div key={product.id} className="bg-white rounded-lg border border-zinc-200 shadow-sm hover:shadow-xl transition-shadow overflow-hidden group relative">
                                        <Link href={`/producto/${product.id}`} className="block">
                                            <div className="h-40 bg-zinc-100 flex items-center justify-center text-4xl group-hover:scale-105 transition-transform duration-300">
                                                {product.img}
                                            </div>
                                            <div className="p-4">
                                                <div className="text-xs font-bold text-zinc-400 mb-1 uppercase">{product.marca}</div>
                                                <h3 className="font-bold text-zinc-900 leading-tight mb-2 h-10 overflow-hidden">{product.nombre}</h3>
                                                <div className="text-xs text-zinc-500 mb-4">SKU: {product.sku}</div>

                                                <div className="flex items-end justify-between">
                                                    <div>
                                                        {isWholesale && (
                                                            <div className="text-xs text-zinc-400 line-through">${product.precio.toLocaleString()}</div>
                                                        )}
                                                        <div className="text-xl font-bold text-red-600">
                                                            ${price.toLocaleString()}
                                                        </div>
                                                        {isWholesale && <span className="text-[10px] text-blue-600 font-bold">PRECIO MAYORISTA</span>}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                addToCart(product);
                                            }}
                                            className="absolute bottom-4 right-4 bg-zinc-900 text-white p-2.5 rounded-full hover:bg-red-600 transition-colors shadow-lg z-10"
                                            title="Agregar al carro"
                                        >
                                            <ShoppingCart size={18} />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>

                        {filteredProducts.length === 0 ? (
                            <div className="text-center py-20 bg-zinc-50 rounded-lg">
                                <Filter className="mx-auto text-zinc-300 mb-4" size={48} />
                                <p className="text-zinc-500">No encontramos repuestos con estos filtros.</p>
                                <button onClick={() => { setSelectedBrand('all'); setSelectedCategory('all'); setCurrentPage(1); }} className="text-blue-600 font-bold mt-2">Limpiar filtros</button>
                            </div>
                        ) : (
                            /* Pagination Controls */
                            totalPages > 1 && (
                                <div className="flex justify-center items-center gap-2 mt-8 mb-12">
                                    <button
                                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                        disabled={currentPage === 1}
                                        className="px-4 py-2 rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed font-bold"
                                    >
                                        Anterior
                                    </button>

                                    <div className="flex gap-1">
                                        {[...Array(totalPages)].map((_, i) => {
                                            const page = i + 1;
                                            // Show first, last, current, and surrounding pages logic could be added here for large sets
                                            // For now, simple list
                                            if (totalPages > 7 && Math.abs(currentPage - page) > 2 && page !== 1 && page !== totalPages) {
                                                if (Math.abs(currentPage - page) === 3) return <span key={page} className="px-2">...</span>;
                                                return null;
                                            }

                                            return (
                                                <button
                                                    key={page}
                                                    onClick={() => handlePageChange(page)}
                                                    className={`w-10 h-10 rounded-lg font-bold transition-colors ${currentPage === page
                                                            ? 'bg-red-600 text-white'
                                                            : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200'
                                                        }`}
                                                >
                                                    {page}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <button
                                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                        disabled={currentPage === totalPages}
                                        className="px-4 py-2 rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed font-bold"
                                    >
                                        Siguiente
                                    </button>
                                </div>
                            )
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};
export default Catalog;
