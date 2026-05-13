'use client';
import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Lock, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import api from '@/lib/api';

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const token = searchParams.get('token');
    const email = searchParams.get('email');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== passwordConfirmation) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await api.resetPassword({
                token,
                email,
                password,
                password_confirmation: passwordConfirmation
            });
            setSuccess(true);
            setTimeout(() => router.push('/login'), 3000);
        } catch (err) {
            setError(err.message || 'El enlace de recuperación es inválido o ha expirado.');
        } finally {
            setLoading(false);
        }
    };

    if (!token || !email) {
        return (
            <div className="text-center p-8 bg-white rounded-3xl border border-zinc-100 shadow-sm max-w-md w-full">
                <XCircle size={40} className="text-red-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-zinc-900 mb-2">Error de Enlace</h2>
                <p className="text-zinc-500 mb-6">Este enlace de recuperación no es válido. Por favor, solicita uno nuevo.</p>
                <a href="/forgot-password" title="Recuperar contraseña" className="text-red-600 font-bold hover:underline">Solicitar nuevo enlace</a>
            </div>
        );
    }

    return (
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl shadow-xl border border-zinc-100">
            <div>
                <h2 className="text-3xl font-black text-zinc-900 tracking-tight">Nueva contraseña</h2>
                <p className="mt-2 text-sm text-zinc-500">
                    Ingresa tu nueva contraseña para acceder a tu cuenta.
                </p>
            </div>

            {success ? (
                <div className="bg-green-50 border border-green-100 p-6 rounded-2xl text-center">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-green-900 mb-2">¡Contraseña actualizada!</h3>
                    <p className="text-sm text-green-700">Has restablecido tu contraseña correctamente. Redirigiendo al login...</p>
                </div>
            ) : (
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="flex items-center gap-3 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
                            <AlertCircle size={18} /> {error}
                        </div>
                    )}
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-zinc-700 mb-1">Nueva Contraseña</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password" required minLength={8}
                                    className="appearance-none block w-full px-4 py-3 pl-10 border border-zinc-200 placeholder-zinc-400 text-zinc-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-600 transition-all sm:text-sm"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); setError(''); }}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-zinc-700 mb-1">Confirmar Contraseña</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password" required minLength={8}
                                    className="appearance-none block w-full px-4 py-3 pl-10 border border-zinc-200 placeholder-zinc-400 text-zinc-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-600 transition-all sm:text-sm"
                                    placeholder="••••••••"
                                    value={passwordConfirmation}
                                    onChange={(e) => { setPasswordConfirmation(e.target.value); setError(''); }}
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !password || !passwordConfirmation}
                        className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-black rounded-xl text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-50 disabled:opacity-50 transition-all"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : 'Actualizar contraseña'}
                    </button>
                </form>
            )}
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-zinc-50 py-12 px-4 sm:px-6 lg:px-8">
            <Suspense fallback={<Loader2 className="animate-spin text-red-600" size={40} />}>
                <ResetPasswordForm />
            </Suspense>
        </div>
    );
}
