'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import api from '@/lib/api';

export default function LoginPage() {
    const router = useRouter();
    const { setAuthUser } = useShop();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPwd,  setShowPwd]  = useState(false);
    const [loading,  setLoading]  = useState(false);
    const [error,    setError]    = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) { setError('Completa todos los campos.'); return; }
        setLoading(true);
        setError('');
        try {
            const res = await api.login(formData.email, formData.password);
            setAuthUser(res.user);
            router.push('/');
        } catch (err) {
            setError(err.message || 'Email o contraseña incorrectos.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-md">

                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/">
                        <img src="/logo-mundo-asiatico.webp" alt="Mundo Asiático" className="h-16 w-auto mx-auto mb-4" />
                    </Link>
                    <h1 className="text-2xl font-black text-zinc-900">Inicia Sesión</h1>
                    <p className="text-zinc-500 text-sm mt-1">Accede a tus pedidos y precios exclusivos</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-8">
                    {error && (
                        <div className="mb-4 flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                            <AlertCircle size={16} className="shrink-0" /> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-zinc-700 mb-1">Email</label>
                            <input type="email" placeholder="juan@email.com"
                                value={formData.email}
                                onChange={e => { setFormData({ ...formData, email: e.target.value }); setError(''); }}
                                className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:border-red-600 focus:ring-2 focus:ring-red-50 outline-none transition-all"
                                autoComplete="email"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-zinc-700 mb-1">Contraseña</label>
                            <div className="relative">
                                <input
                                    type={showPwd ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={e => { setFormData({ ...formData, password: e.target.value }); setError(''); }}
                                    className="w-full border border-zinc-200 rounded-xl px-4 py-3 pr-11 text-sm focus:border-red-600 focus:ring-2 focus:ring-red-50 outline-none transition-all"
                                    autoComplete="current-password"
                                />
                                <button type="button" onClick={() => setShowPwd(!showPwd)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 p-1">
                                    {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" disabled={loading}
                            className="w-full bg-red-600 text-white py-3.5 rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-100 disabled:opacity-70 flex items-center justify-center gap-2">
                            {loading ? <><Loader2 size={18} className="animate-spin" /> Ingresando...</> : 'INGRESAR'}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-zinc-500">
                        ¿No tienes cuenta?{' '}
                        <Link href="/registro" className="text-red-600 font-bold hover:underline">
                            Regístrate aquí
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
