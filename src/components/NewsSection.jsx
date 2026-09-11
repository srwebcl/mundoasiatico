'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { Calendar } from 'lucide-react';

export function NewsSection({ limit }) {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await api.getNews();
                setNews(limit ? data.slice(0, limit) : data);
            } catch (error) {
                console.error("Error fetching news:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, [limit]);

    if (loading) {
        return <div className="text-center py-20 text-zinc-400">Cargando noticias...</div>;
    }

    if (news.length === 0) {
        return null;
    }

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex justify-between items-end mb-8 gap-4">
                    <div className="min-w-0 max-w-full">
                        <span className="inline-block py-1 px-3 rounded-full bg-red-100 text-red-600 font-bold tracking-wider text-xs uppercase mb-3">
                            Mantente al día
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black italic text-zinc-900 leading-tight">
                            ÚLTIMAS <span className="inline-block pr-1 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500">NOVEDADES</span>
                        </h2>
                    </div>
                    {limit && (
                        <Link href="/noticias" className="text-sm font-bold text-red-600 hover:text-red-700 hidden sm:block">
                            Ver todas las noticias →
                        </Link>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {news.map((item) => (
                        <Link href={`/noticias/${item.slug}`} key={item.id} className="bg-zinc-50 rounded-2xl overflow-hidden border border-zinc-100 hover:border-red-200 hover:shadow-lg transition-all group flex flex-col">
                            {item.image && (
                                <div className="relative h-48 overflow-hidden bg-zinc-200">
                                    <img 
                                        src={item.image} 
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            )}
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold mb-3">
                                    <Calendar size={14} />
                                    <span>{new Date(item.created_at).toLocaleDateString('es-CL')}</span>
                                </div>
                                <h3 className="text-lg font-black text-zinc-900 mb-2 leading-tight group-hover:text-red-600 transition-colors">
                                    {item.title}
                                </h3>
                                <div 
                                    className="text-zinc-600 text-sm line-clamp-3 prose prose-sm max-w-none flex-1"
                                    dangerouslySetInnerHTML={{ __html: item.content }}
                                />
                                <div className="mt-4 text-red-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                    Leer más <span>→</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                
                {limit && (
                    <div className="mt-8 text-center sm:hidden">
                        <Link href="/noticias" className="inline-block bg-zinc-100 text-zinc-900 px-6 py-3 rounded-xl font-bold hover:bg-zinc-200 transition-colors">
                            Ver todas las noticias
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
