
"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Crown, ShieldCheck, ArrowLeft, Loader2, Lock } from "lucide-react";
import Link from "next/link";

function ActivationForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const targetPlan = searchParams.get("plan") || "pro";

    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    async function handleActivate(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/v1/premium/activate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password, plan: targetPlan }),
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess(true);
                setTimeout(() => {
                    router.push("/dashboard");
                    router.refresh();
                }, 2000);
            } else {
                setError(data.error || "Aktivasyon başarısız.");
            }
        } catch (error) {
            console.error(error);
            setError("Bir hata oluştu. İnternet bağlantınızı kontrol edin.");
        } finally {
            setIsLoading(false);
        }
    }

    if (success) {
        return (
            <div className="text-center space-y-6 animate-[fade-up_0.3s_ease-out]">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                    <ShieldCheck className="h-10 w-10 text-emerald-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900">Aktivasyon Başarılı!</h1>
                <p className="text-gray-600">
                    {targetPlan.toUpperCase()} paketiniz tanımlandı. {"Dashboard'a"} yönlendiriliyorsunuz...
                </p>
                <div className="flex justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-[fade-up_0.3s_ease-out]">
            <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100">
                    <Crown className="h-8 w-8 text-emerald-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900">Premium Aktivasyon</h1>
                <p className="mt-2 text-gray-500">
                    <span className="font-bold text-emerald-600">{targetPlan.toUpperCase()}</span> paketini aktif etmek için anahtarı girin.
                </p>
            </div>

            <form onSubmit={handleActivate} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Aktivasyon Anahtarı
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full rounded-2xl border-gray-200 bg-gray-50 pl-10 focus:border-emerald-500 focus:ring-emerald-500 py-4 text-center tracking-widest text-lg font-mono"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                {error && (
                    <div className="rounded-xl bg-rose-50 p-4 text-sm font-medium text-rose-600 border border-rose-100">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading || !password}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-4 text-lg font-bold text-white shadow-xl shadow-emerald-200 transition-all hover:bg-emerald-700 disabled:opacity-50"
                >
                    {isLoading ? (
                        <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                        "Paketi Aktifleştir"
                    )}
                </button>
            </form>

            <Link
                href="/pricing"
                className="flex items-center justify-center gap-2 text-sm font-medium text-gray-500 hover:text-emerald-600 transition-colors"
            >
                <ArrowLeft className="h-4 w-4" />
                Fiyatlandırmaya Geri Dön
            </Link>
        </div>
    );
}

export default function PremiumActivatePage() {
    return (
        <div className="min-h-screen bg-[#fffcf9] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md rounded-[2.5rem] border border-emerald-100 bg-white p-8 shadow-2xl shadow-emerald-100/50 sm:p-12">
                <Suspense fallback={<div className="flex justify-center py-20"><Loader2 className="h-10 w-10 animate-spin text-emerald-600" /></div>}>
                    <ActivationForm />
                </Suspense>
            </div>
        </div>
    );
}
