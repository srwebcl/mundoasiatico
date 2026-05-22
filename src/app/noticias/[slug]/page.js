'use client';
import { useEffect, useState, use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { Calendar, ArrowLeft } from 'lucide-react';

export default function SingleNewsPage({ params }) {
    const slug = use(params).slug;
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await api.getNewsItem(slug);
                setNews(data);
            } catch (error) {
                console.error("Error fetching news:", error);
                setNews(null);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, [slug]);

    if (loading) {
        return (
            <main className="min-h-screen pt-24 pb-12 bg-zinc-50 flex items-center justify-center">
                <div className="text-zinc-400 font-medium">Cargando noticia...</div>
            </main>
        );
    }

    if (!news) {
        return notFound();
    }

    return (
        <main className="min-h-screen pt-24 pb-12 bg-zinc-50">
            <article className="container mx-auto px-4 max-w-4xl mt-6">
                <Link href="/noticias" className="inline-flex items-center gap-2 text-sm text-zinc-500 font-bold hover:text-red-600 transition-colors mb-8">
                    <ArrowLeft size={16} /> Volver a Noticias
                </Link>

                {news.image && (
                    <div className="w-full aspect-[21/9] bg-zinc-200 rounded-3xl overflow-hidden mb-8 shadow-sm">
                        <img 
                            src={news.image} 
                            alt={news.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-zinc-100">
                    <div className="flex items-center gap-2 text-zinc-500 text-sm font-bold mb-4">
                        <Calendar size={16} />
                        <span>{new Date(news.created_at).toLocaleDateString('es-CL', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black text-zinc-900 mb-8 leading-tight">
                        {news.title}
                    </h1>

                    <div 
                        className="prose prose-zinc md:prose-lg max-w-none prose-headings:font-black prose-a:text-red-600 hover:prose-a:text-red-700"
                        dangerouslySetInnerHTML={{ __html: news.content }}
                    />
                </div>
            </article>
        </main>
    );
}
