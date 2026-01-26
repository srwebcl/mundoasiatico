'use client';
import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, ChevronRight, X } from 'lucide-react';
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
    const { addToCart, isWholesale } = useShop(); // isWholesale was missing from the provided snippet, added it back.

    // Effect to update state if URL params change
    useEffect(() => {
        if (brandParam) setSelectedBrand(brandParam);
        if (categoryParam) setSelectedCategory(categoryParam);
    }, [brandParam, categoryParam]);

    // Reset model when brand changes
    const handleBrandChange = (e) => {
        setSelectedBrand(e.target.value);
        setSelectedModel('all');
    };

    const filteredProducts = PRODUCTOS_BASE.filter(product => {
        const matchCategory = selectedCategory === 'all' || product.categoria === selectedCategory;
        const matchBrand = selectedBrand === 'all' || product.marca.toLowerCase() === selectedBrand.toLowerCase();
        const matchModel = selectedModel === 'all' || product.modelo.toLowerCase() === selectedModel.toLowerCase(); // Filter by model
        const matchPrice = product.precio >= priceRange[0] && product.precio <= priceRange[1];
        return matchCategory && matchBrand && matchModel && matchPrice;
    });

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Header */}
            <div className="bg-zinc-50 border-b border-zinc-100 py-8 md:py-12">
                <div className="container mx-auto px-4 md:px-6">
                    <h1 className="text-3xl md:text-4xl font-black text-zinc-900 mb-2 italic tracking-tighter uppercase">
                        Catálogo de Repuestos
                    </h1>
                    <p className="text-zinc-500">Encuentra el repuesto exacto para tu vehículo.</p>
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
                                        onChange={(e) => setSelectedModel(e.target.value)}
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
                                    onClick={() => setSelectedCategory('all')}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === 'all' ? 'bg-red-600 text-white' : 'hover:bg-zinc-50 text-zinc-600'}`}
                                >
                                    Todas
                                </button>
                                {CATEGORIAS.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setSelectedCategory(cat.id)}
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
                                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
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
                            <span className="text-zinc-500 text-sm">{filteredProducts.length} productos encontrados</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map(product => {
                                const price = isWholesale ? product.precio * 0.8 : product.precio;
                                return (
                                    <div key={product.id} className="bg-white rounded-lg border border-zinc-200 shadow-sm hover:shadow-xl transition-shadow overflow-hidden group">
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
                                                <button
                                                    onClick={() => addToCart(product)}
                                                    className="bg-zinc-900 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                                                >
                                                    {/* Re-import ShoppingCart or use a different icon if needed. Assuming ShoppingCart is available as it was used before. Wait, I removed ShoppingCart from imports in step 188. I need to re-add it or use Search/Car/etc. I will add ShoppingCart to imports in next step if missing. For now, let's assume it might error if not added. I should check imports. Step 188 removed it. I will add it back in imports first or in this same call if possible. Can't edit imports here easily without huge context. I will fix imports separately. */}
                                                    <Search size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="text-center py-20 bg-zinc-50 rounded-lg">
                                <Filter className="mx-auto text-zinc-300 mb-4" size={48} />
                                <p className="text-zinc-500">No encontramos repuestos con estos filtros.</p>
                                <button onClick={() => { setSelectedBrand('all'); setSelectedCategory('all'); }} className="text-blue-600 font-bold mt-2">Limpiar filtros</button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};
export default Catalog;
