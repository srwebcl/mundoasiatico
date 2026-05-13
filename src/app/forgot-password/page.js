'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import api from '@/lib/api';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await api.forgotPassword(email);
            setSuccess(true);
        } catch (err) {
            setError(err.message || 'No pudimos encontrar una cuenta con ese email.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-zinc-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl shadow-xl border border-zinc-100">
                <div>
                    <Link href="/login" className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-600 mb-6 transition-colors">
                        <ArrowLeft size={16} />
                        <span className="text-sm font-bold">Volver al login</span>
                    </Link>
                    <h2 className="text-3xl font-black text-zinc-900 tracking-tight">Recuperar contraseña</h2>
                    <p className="mt-2 text-sm text-zinc-500">
                        Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña.
                    </p>
                </div>

                {success ? (
                    <div className="bg-green-50 border border-green-100 p-6 rounded-2xl text-center">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-green-900 mb-2">¡Enlace enviado!</h3>
                        <p className="text-sm text-green-700 mb-6">Revisa tu bandeja de entrada y sigue las instrucciones.</p>
                        <Link href="/login" className="block w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-colors">
                            Volver al inicio de sesión
                        </Link>
                    </div>
                ) : (
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="flex items-center gap-3 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
                                <AlertCircle size={18} /> {error}
                            </div>
                        )}
                        
                        <div className="rounded-md shadow-sm space-y-4">
                            <div>
                                <label htmlFor="email-address" className="block text-sm font-bold text-zinc-700 mb-1">
                                    Correo electrónico
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        id="email-address" name="email" type="email" required
                                        className="appearance-none relative block w-full px-4 py-3 pl-10 border border-zinc-200 placeholder-zinc-400 text-zinc-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-600 transition-all sm:text-sm"
                                        placeholder="ejemplo@correo.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading || !email}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-black rounded-xl text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Enviar enlace de recuperación'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
