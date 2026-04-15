'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import api from '@/lib/api';

export default function RegistroPage() {
    const router = useRouter();
    const { setAuthUser } = useShop();
    const [formData, setFormData] = useState({ name: '', rut: '', email: '', phone: '', password: '', password_confirmation: '' });
    const [showPwd,  setShowPwd]  = useState(false);
    const [loading,  setLoading]  = useState(false);
    const [errors,   setErrors]   = useState({});

    const validate = () => {
        const e = {};
        if (!formData.name)     e.name     = 'Ingresa tu nombre completo.';
        if (!formData.rut)      e.rut      = 'Ingresa tu RUT.';
        if (!formData.email)    e.email    = 'Ingresa tu email.';
        if (!formData.phone)    e.phone    = 'Ingresa tu teléfono.';
        if (formData.password.length < 8) e.password = 'La contraseña debe tener al menos 8 caracteres.';
        if (formData.password !== formData.password_confirmation) e.password_confirmation = 'Las contraseñas no coinciden.';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        try {
            const res = await api.register(formData);
            setAuthUser(res.user);
            router.push('/');
        } catch (err) {
            // Los errores de validación del backend vienen como { message, errors: {field: [msgs]} }
            const be = err.errors ?? {};
            setErrors(Object.fromEntries(Object.entries(be).map(([k, msgs]) => [k, msgs[0]])));
            if (!Object.keys(be).length) setErrors({ _global: err.message || 'Error al registrarse.' });
        } finally {
            setLoading(false);
        }
    };

    const Field = ({ name, label, type = 'text', placeholder, autoComplete }) => (
        <div>
            <label className="block text-sm font-bold text-zinc-700 mb-1">{label}</label>
            <div className="relative">
                <input
                    type={name.includes('password') && !showPwd ? 'password' : type === 'password' ? (showPwd ? 'text' : 'password') : type}
                    placeholder={placeholder}
                    value={formData[name]}
                    onChange={e => { setFormData({ ...formData, [name]: e.target.value }); setErrors({ ...errors, [name]: '' }); }}
                    autoComplete={autoComplete}
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-50 outline-none transition-all ${errors[name] ? 'border-red-400 bg-red-50' : 'border-zinc-200 focus:border-red-600'}`}
                />
                {(name === 'password' || name === 'password_confirmation') && (
                    <button type="button" onClick={() => setShowPwd(!showPwd)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 p-1">
                        {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                )}
            </div>
            {errors[name] && <p className="text-xs text-red-600 mt-1">{errors[name]}</p>}
        </div>
    );

    return (
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-md">

                <div className="text-center mb-8">
                    <Link href="/">
                        <img src="/logo-mundo-asiatico.webp" alt="Mundo Asiático" className="h-16 w-auto mx-auto mb-4" />
                    </Link>
                    <h1 className="text-2xl font-black text-zinc-900">Crea tu Cuenta</h1>
                    <p className="text-zinc-500 text-sm mt-1">Accede a precios mayoristas y rastrea tus pedidos</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-8">
                    {errors._global && (
                        <div className="mb-4 flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                            <AlertCircle size={16} className="shrink-0" /> {errors._global}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Field name="name"  label="Nombre Completo"   placeholder="Juan Pérez"        autoComplete="name" />
                        <Field name="rut"   label="RUT"               placeholder="12.345.678-9"      autoComplete="off" />
                        <Field name="email" label="Email"  type="email" placeholder="juan@email.com"   autoComplete="email" />
                        <Field name="phone" label="Teléfono (WhatsApp)" placeholder="+56 9 1234 5678" autoComplete="tel" />
                        <Field name="password"              label="Contraseña (mín. 8 caracteres)" type="password" placeholder="••••••••" autoComplete="new-password" />
                        <Field name="password_confirmation" label="Confirmar Contraseña"            type="password" placeholder="••••••••" autoComplete="new-password" />

                        <button type="submit" disabled={loading}
                            className="w-full bg-red-600 text-white py-3.5 rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-100 disabled:opacity-70 flex items-center justify-center gap-2 mt-2">
                            {loading ? <><Loader2 size={18} className="animate-spin" /> Creando cuenta...</> : 'CREAR CUENTA'}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-zinc-500">
                        ¿Ya tienes cuenta?{' '}
                        <Link href="/login" className="text-red-600 font-bold hover:underline">
                            Inicia sesión
                        </Link>
                    </div>
                </div>

                <p className="text-center text-zinc-400 text-xs mt-6">
                    Al registrarte aceptas nuestros{' '}
                    <Link href="/terminos" className="hover:text-red-600 underline">términos y condiciones</Link>
                    {' '}y{' '}
                    <Link href="/privacidad" className="hover:text-red-600 underline">política de privacidad</Link>.
                </p>
            </div>
        </div>
    );
}
