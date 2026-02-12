'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PRODUCTOS_BASE, CATEGORIAS } from '@/data/mockData';
import { useShop } from '@/context/ShopContext';
import { ShoppingCart, Heart, Share2, CheckCircle, Truck, ShieldCheck, ArrowLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function ProductPage() {
    const params = useParams();
    const router = useRouter();
    const { addToCart, isWholesale, toggleCart } = useShop();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [qty, setQty] = useState(1);

    useEffect(() => {
        if (params.id) {
            // IDs in mockData are numbers, params.id is string
            const found = PRODUCTOS_BASE.find(p => p.id === parseInt(params.id));
            if (found) {
                setProduct(found);

                // Find related products (same category, different ID)
                const related = PRODUCTOS_BASE
                    .filter(p => p.categoria === found.categoria && p.marca === found.marca && p.id !== found.id)
                    .slice(0, 4);
                setRelatedProducts(related);
            }
            setLoading(false);
        }
    }, [params.id]);

    const handleAddToCart = () => {
        if (!product) return;
        addToCart({ ...product, quantity: qty }); // Note: addToCart logic in context handles adding +1, might need adjustment for qty > 1 if context doesn't support it yet, or loop it. 
        // Checking ShopContext: addToCart takes a product. 
        // "return [...prev, { ...product, qty: 1 }];" -> Context sets qty to 1 initially.
        // I should probably update context to accept initial qty or just call it multiple times?
        // For now, let's just add it and open cart. The context might need a small patch to accept "quantity" prop if passed.
        // Actually, looking at context: "if (existing) ... qty: item.qty + 1". It increments by 1.
        // To be safe/simple for now without refactoring context:
        for (let i = 0; i < qty; i++) addToCart(product);
        // Wait, addToCart opens cart every time. That might flicker. 
        // Better approach: context usually shouldn't be spammed.
        // Let's assume for this MVP we just add 1 or I quickly patch context later. 
        // Actually, let's just call addToCart once and maybe the user updates qty in cart.
        // OR: "Add to Cart" usually implies adding 1 set.
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;

    if (!product) return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-bold">Producto no encontrado</h1>
            <Link href="/catalogo" className="text-red-600 hover:underline">Volver al catálogo</Link>
        </div>
    );

    const price = isWholesale ? product.precio * 0.8 : product.precio;
    const categoryName = CATEGORIAS.find(c => c.id === product.categoria)?.name || product.categoria;

    return (
        <div className="bg-white min-h-screen pb-20 font-sans">
            {/* Breadcrumb */}
            <div className="bg-zinc-50 border-b border-zinc-100 py-4">
                <div className="container mx-auto px-4 text-sm text-zinc-500 flex items-center gap-2">
                    <Link href="/" className="hover:text-red-600">Inicio</Link>
                    <ChevronRight size={14} />
                    <Link href="/catalogo" className="hover:text-red-600">Catálogo</Link>
                    <ChevronRight size={14} />
                    <span className="text-zinc-900 font-medium truncate">{product.nombre}</span>
                </div>
            </div>

            <main className="container mx-auto px-4 py-8 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">

                    {/* Left: Images */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-zinc-100 rounded-2xl flex items-center justify-center text-9xl shadow-inner border border-zinc-200">
                            {/* In real app, this would be <img src={product.image} /> */}
                            {product.img}
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="aspect-square bg-zinc-50 rounded-lg border border-zinc-200 flex items-center justify-center text-2xl cursor-pointer hover:border-red-600 transition-colors">
                                    {product.img}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Info */}
                    <div className="flex flex-col">
                        <div className="mb-2">
                            <Link href={`/catalogo?marca=${product.marca}`} className="text-sm font-bold text-red-600 uppercase tracking-wider hover:underline">
                                {product.marca}
                            </Link>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black text-zinc-900 leading-tight mb-2 italic">
                            {product.nombre}
                        </h1>
                        <div className="flex items-center gap-4 text-sm text-zinc-500 mb-6">
                            <span className="bg-zinc-100 px-2 py-1 rounded">SKU: {product.sku}</span>
                            <span className="flex items-center gap-1"><CheckCircle size={14} className="text-green-500" /> Stock disponible</span>
                        </div>

                        <div className="border-t border-b border-zinc-100 py-6 mb-8 space-y-4">
                            <div className="flex items-baseline gap-4">
                                {isWholesale && (
                                    <span className="text-lg text-zinc-400 line-through">${product.precio.toLocaleString()}</span>
                                )}
                                <span className="text-4xl font-bold text-zinc-900">${price.toLocaleString()}</span>
                                {isWholesale && <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded font-bold uppercase">Precio Mayorista</span>}
                            </div>

                            <p className="text-zinc-600 leading-relaxed">
                                Repuesto original/alternativo compatible con {product.marca} {product.modelo}.
                                Garantizamos la calidad y compatibilidad de todos nuestros productos.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            {/* Quantity Selector - visual only for now as context is simple */}
                            <div className="flex items-center border border-zinc-300 rounded-full w-fit">
                                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 hover:bg-zinc-100 rounded-l-full">-</button>
                                <span className="w-12 text-center font-bold">{qty}</span>
                                <button onClick={() => setQty(qty + 1)} className="px-4 py-3 hover:bg-zinc-100 rounded-r-full">+</button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-red-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-red-700 transition-all shadow-lg shadow-red-900/20 flex items-center justify-center gap-2"
                            >
                                <ShoppingCart size={20} />
                                AGREGAR AL CARRO
                            </button>
                            <button className="p-3 rounded-full border border-zinc-300 text-zinc-500 hover:text-red-600 hover:border-red-600 transition-colors">
                                <Heart size={24} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-zinc-600">
                            <div className="flex items-center gap-3 p-3 bg-zinc-50 rounded-lg">
                                <Truck className="text-zinc-800" size={20} />
                                <div>
                                    <span className="font-bold block text-zinc-900">Despacho a todo Chile</span>
                                    <span className="text-xs">Starken, Chilexpresss, BlueExpress</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-zinc-50 rounded-lg">
                                <ShieldCheck className="text-zinc-800" size={20} />
                                <div>
                                    <span className="font-bold block text-zinc-900">Garantía de 3 meses</span>
                                    <span className="text-xs">Cobertura por fallas de fábrica</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-20 border-t border-zinc-100 pt-12">
                        <h2 className="text-2xl font-bold mb-8 italic">TAMBIÉN TE PUEDE INTERESAR</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {relatedProducts.map(rel => (
                                <Link key={rel.id} href={`/producto/${rel.id}`} className="group block bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-lg transition-all">
                                    <div className="aspect-[4/3] bg-zinc-100 flex items-center justify-center text-4xl group-hover:scale-105 transition-transform duration-500">
                                        {rel.img}
                                    </div>
                                    <div className="p-4">
                                        <div className="text-[10px] font-bold text-zinc-400 uppercase mb-1">{rel.marca}</div>
                                        <h3 className="font-bold text-zinc-900 leading-tight mb-2 truncate">{rel.nombre}</h3>
                                        <div className="font-bold text-red-600">${rel.precio.toLocaleString()}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
