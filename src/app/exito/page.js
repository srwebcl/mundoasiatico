'use client';
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
    const router = useRouter();

    return (
        <div className="min-h-[60vh] bg-zinc-50 flex items-center justify-center px-4">
            <div className="bg-white p-8 rounded-xl shadow-xl text-center max-w-md w-full">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} />
                </div>
                <h2 className="text-3xl font-bold mb-2">¡Pedido Exitoso!</h2>
                <p className="text-zinc-500 mb-8">Hemos recibido tu orden #99281. Te enviaremos un correo con los detalles.</p>
                <button onClick={() => router.push('/')} className="w-full bg-zinc-900 text-white py-3 rounded font-bold">Volver al Inicio</button>
            </div>
        </div>
    );
}
