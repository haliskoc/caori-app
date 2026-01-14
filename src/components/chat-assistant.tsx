"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, X, Sparkles, User, Loader2, Copy, Check, Search } from "lucide-react";
import Link from "next/link";
import { t, getLocale } from "@/lib/i18n";
import ReactMarkdown from "react-markdown";
import { useTracker } from "@/components/tracker-provider";
import { MealType, ActivityType } from "@/lib/types";

type Message = {
    id: string;
    role: "user" | "list";
    content: string;
};

type FoodData = {
    name: string;
    calories: number;
    mealType?: string;
    amountG?: number;
    proteinG?: number;
    carbsG?: number;
    fatG?: number;
};

type WaterData = {
    amountMl: number;
};

type ActivityData = {
    activityType: string;
    durationMin: number;
    estimatedCalories: number;
};

type WebSearchData = {
    query: string;
    reason?: string;
};

type PendingConfirmation =
    | { action: "log_food"; data: FoodData }
    | { action: "log_water"; data: WaterData }
    | { action: "log_activity"; data: ActivityData }
    | { action: "request_web_search"; data: WebSearchData };

type ChatAssistantProps = {
    isOpen?: boolean;
    onToggle?: (open: boolean) => void;
    launcherClassName?: string;
};

export function ChatAssistant({ isOpen, onToggle, launcherClassName = "" }: ChatAssistantProps) {
    const tracker = useTracker();
    const [internalOpen, setInternalOpen] = useState(false);
    const open = isOpen ?? internalOpen;
    const setOpen = (next: boolean) => {
        if (onToggle) {
            onToggle(next);
            return;
        }
        setInternalOpen(next);
    };
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isLimitReached, setIsLimitReached] = useState(false);
    const [limitPlan, setLimitPlan] = useState<string | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [pendingConfirmation, setPendingConfirmation] = useState<PendingConfirmation | null>(null);
    const scrollAnchorRef = useRef<HTMLDivElement>(null);

    // Her açıldığında sohbeti sıfırla
    useEffect(() => {
        if (open) {
            setMessages([
                {
                    id: "welcome",
                    role: "list",
                    content: t("Merhaba! Ben Calmet AI Sağlık Koçunuz. Bugün beslenme veya antrenman hedefleriniz için size nasıl yardımcı olabilirim?"),
                },
            ]);
            setIsLimitReached(false);
            setLimitPlan(null);
        }
    }, [open]);

    useEffect(() => {
        scrollAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, [messages, open, isLoading]);

    async function copyMessage(message: Message) {
        const text = message.content.trim();
        if (!text) return;
        try {
            if (navigator?.clipboard?.writeText) {
                await navigator.clipboard.writeText(text);
            } else {
                const textarea = document.createElement("textarea");
                textarea.value = text;
                textarea.style.position = "fixed";
                textarea.style.opacity = "0";
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand("copy");
                textarea.remove();
            }
            setCopiedId(message.id);
            window.setTimeout(() => setCopiedId((prev) => (prev === message.id ? null : prev)), 1600);
        } catch {
            // ignore clipboard errors
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const history = messages
                .filter((m) => m.id !== "welcome")
                .map((m) => ({ role: m.role, content: m.content }));

            const res = await fetch("/api/v1/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMessage.content,
                    history,
                    locale: getLocale()
                }),
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || `Sunucu hatası: ${res.status}`);
            }

            const data = await res.json();

            if (data.limitReached) {
                setIsLimitReached(true);
                setLimitPlan(typeof data.plan === "string" ? data.plan : null);
                const limitMessage =
                    data.plan === "ai_plus"
                        ? t("Günlük 25 mesaj limitine ulaştın. Yarın tekrar deneyebilirsin.")
                        : t("AI Koçu şu an sadece AI Plus paketinde aktif.");
                setMessages((prev) => [
                    ...prev,
                    {
                        id: Date.now().toString(),
                        role: "list",
                        content: limitMessage,
                    },
                ]);
            } else if (data.reply) {
                let cleanReply = data.reply;

                // Try multiple patterns to catch JSON (with/without code blocks)
                const codeBlockMatch = data.reply.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
                const rawJsonMatch = data.reply.match(/(\{[\s\S]*?"action"\s*:\s*"(?:log_(?:food|water|activity)|request_web_search)"[\s\S]*?\})/m);

                const jsonMatch = codeBlockMatch || rawJsonMatch;

                if (jsonMatch) {
                    try {
                        const jsonStr = jsonMatch[1];
                        // Clean comments from JSON (AI sometimes adds them)
                        const cleanedJsonStr = jsonStr.replace(/\/\/.*$/gm, "").trim();
                        const command = JSON.parse(cleanedJsonStr);

                        // Remove ALL JSON content from displayed message
                        cleanReply = data.reply
                            .replace(/```(?:json)?\s*[\s\S]*?\s*```/g, "")
                            .replace(/\{[\s\S]*?"action"\s*:\s*"(?:log_(?:food|water|activity)|request_web_search)"[\s\S]*?\}/gm, "")
                            .trim();

                        if ((command.action === "log_food" || command.action === "log_water" || command.action === "log_activity" || command.action === "request_web_search") && command.data) {
                            // Type assertion for command data because it comes from API as any/unknown
                            // We validated action, so we can cast it to PendingConfirmation
                            setPendingConfirmation({
                                action: command.action,
                                data: command.data
                            } as PendingConfirmation);
                        }
                    } catch (e) {
                        console.error("Failed to parse AI command", e);
                        // Still try to clean any JSON-looking content
                        cleanReply = data.reply
                            .replace(/```(?:json)?\s*[\s\S]*?\s*```/g, "")
                            .replace(/\{[\s\S]*?"action"[\s\S]*?\}/gm, "")
                            .trim();
                    }
                }

                // Only add message if there's actual content left
                if (cleanReply) {
                    setMessages((prev) => [
                        ...prev,
                        {
                            id: Date.now().toString(),
                            role: "list",
                            content: cleanReply,
                        },
                    ]);
                }
            } else {
                throw new Error(data.error || "Unknown error");
            }
        } catch (error: unknown) {
            const message =
                error instanceof Error
                    ? error.message
                    : t("Bir bağlantı hatası oluştu. Lütfen tekrar dene.");
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now().toString(),
                    role: "list",
                    content: t(message),
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="fixed bottom-24 left-1/2 z-50 flex flex-col items-center gap-4 -translate-x-1/2 sm:bottom-6 sm:right-6 sm:left-auto sm:translate-x-0 sm:items-end">
            {/* Chat Window */}
            {open && (
                <div className="w-[min(92vw,380px)] overflow-hidden rounded-[2rem] border border-emerald-100 bg-white shadow-2xl animate-[fade-up_0.2s_ease-out] flex flex-col max-h-[70vh] sm:max-h-[70vh] sm:w-[380px]">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-emerald-50 bg-gradient-to-r from-emerald-50 to-white px-5 py-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-200">
                                <Bot className="h-6 w-6 text-white" />
                            </div>
                            <div className="leading-tight">
                                <h3 className="text-sm font-black text-gray-900">{t("Calmet AI")}</h3>
                                <p className="text-[10px] text-emerald-600 font-black tracking-widest uppercase">
                                    {t("Sağlık Koçu")}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setOpen(false)}
                            className="rounded-xl p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto overscroll-contain bg-[#fffcf9] p-5 space-y-6">
                        {messages.map((m) => (
                            <div
                                key={m.id}
                                className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                            >
                                <div
                                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl shadow-sm ${m.role === "user" ? "bg-emerald-700 text-white" : "bg-white text-emerald-600 border border-emerald-100"
                                        }`}
                                >
                                    {m.role === "user" ? <User className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
                                </div>
                                <div
                                    className={`max-w-[85%] rounded-[1.25rem] px-4 py-3 text-sm font-medium leading-relaxed shadow-sm ${m.role === "user"
                                        ? "bg-emerald-700 text-white rounded-tr-none"
                                        : "bg-white text-gray-700 border border-emerald-50 rounded-tl-none"
                                        }`}
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1">
                                            {m.role === "list" ? (
                                                <article className="prose prose-sm prose-emerald max-w-none prose-p:leading-relaxed prose-li:my-1 font-medium">
                                                    <ReactMarkdown>{m.content}</ReactMarkdown>
                                                </article>
                                            ) : (
                                                m.content
                                            )}
                                        </div>
                                        {m.role !== "user" && (
                                            <button
                                                type="button"
                                                onClick={() => copyMessage(m)}
                                                className="rounded-lg border border-emerald-100 bg-emerald-50 p-1.5 text-emerald-700 hover:bg-emerald-100"
                                                aria-label={t("Kopyala")}
                                            >
                                                {copiedId === m.id ? (
                                                    <Check className="h-3.5 w-3.5" />
                                                ) : (
                                                    <Copy className="h-3.5 w-3.5" />
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex gap-3">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 border border-emerald-100 shadow-sm leading-none pt-0.5">
                                    <Sparkles className="h-4 w-4 animate-pulse" />
                                </div>
                                <div className="flex items-center gap-1.5 rounded-[1.25rem] bg-white px-4 py-3 border border-emerald-50 shadow-sm rounded-tl-none">
                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.3s]" />
                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.15s]" />
                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce" />
                                </div>
                            </div>
                        )}

                        {/* Upgrade Prompt if Limit Reached */}
                        {isLimitReached && (
                            <div className="mt-4 rounded-3xl border border-emerald-100 bg-emerald-50 p-6 text-center">
                                <p className="text-sm font-bold text-emerald-800 mb-4 leading-relaxed">
                                    {limitPlan === "ai_plus"
                                        ? t("Günlük limitin doldu. Yarın tekrar deneyebilirsin.")
                                        : t("AI Koçu şu an sadece AI Plus paketinde aktif.")}
                                </p>
                                {limitPlan !== "ai_plus" ? (
                                    <Link
                                        href="/pricing"
                                        className="block w-full rounded-2xl bg-emerald-600 py-3 text-sm font-black text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all hover:scale-105 active:scale-95"
                                    >
                                        {t("Planları Gör")}
                                    </Link>
                                ) : (
                                    <p className="text-xs font-semibold text-emerald-700">
                                        {t("Limit yarın sıfırlanır.")}
                                    </p>
                                )}
                            </div>
                        )}
                        {/* Pending Confirmation Card */}
                        {pendingConfirmation && (
                            <div className="flex gap-3 animate-[fade-up_0.2s_ease-out]">
                                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border shadow-sm ${pendingConfirmation.action === "request_web_search"
                                        ? "bg-blue-100 text-blue-600 border-blue-200"
                                        : "bg-emerald-100 text-emerald-600 border-emerald-200"
                                    }`}>
                                    {pendingConfirmation.action === "request_web_search"
                                        ? <Search className="h-4 w-4" />
                                        : <Sparkles className="h-4 w-4" />
                                    }
                                </div>
                                <div className={`flex-1 rounded-[1.25rem] border p-4 shadow-md rounded-tl-none ${pendingConfirmation.action === "request_web_search"
                                        ? "bg-gradient-to-br from-blue-50 to-white border-blue-100"
                                        : "bg-gradient-to-br from-emerald-50 to-white border-emerald-100"
                                    }`}>
                                    <h4 className={`text-sm font-bold mb-3 ${pendingConfirmation.action === "request_web_search"
                                            ? "text-blue-900"
                                            : "text-emerald-900"
                                        }`}>
                                        {pendingConfirmation.action === "request_web_search"
                                            ? t("Web araması yapayım mı?")
                                            : t("Bunu günlüğüne ekleyeyim mi?")}
                                    </h4>

                                    {/* Details Card */}
                                    <div className={`bg-white rounded-xl p-4 border mb-4 shadow-sm ${pendingConfirmation.action === "request_web_search" ? "border-blue-100" : "border-emerald-100"
                                        }`}>
                                        {pendingConfirmation.action === "request_web_search" ? (
                                            /* Web Search Card */
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2">
                                                    <Search className="h-5 w-5 text-blue-500" />
                                                    <p className="text-base font-bold text-gray-900">
                                                        {pendingConfirmation.data.query}
                                                    </p>
                                                </div>
                                                <p className="text-sm text-gray-600">
                                                    {pendingConfirmation.data.reason}
                                                </p>
                                            </div>
                                        ) : (
                                            <>
                                                <p className="text-base font-bold text-gray-900 mb-2">
                                                    {pendingConfirmation.action === "log_food"
                                                        ? pendingConfirmation.data.name || t("Besin")
                                                        : pendingConfirmation.action === "log_water"
                                                            ? t("Su İçimi")
                                                            : t("Aktivite")}
                                                </p>

                                                {pendingConfirmation.action === "log_food" ? (
                                                    <div className="space-y-2">
                                                        <div className="flex items-baseline gap-2 pb-2 border-b border-gray-100">
                                                            <span className="text-2xl font-black text-emerald-600">
                                                                {pendingConfirmation.data.calories || 0}
                                                            </span>
                                                            <span className="text-sm font-bold text-gray-400">kcal</span>
                                                            {pendingConfirmation.data.amountG !== undefined && pendingConfirmation.data.amountG > 0 && (
                                                                <span className="ml-auto text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                                                                    {pendingConfirmation.data.amountG}g
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="grid grid-cols-3 gap-2 pt-1">
                                                            <div className="text-center p-2 bg-blue-50 rounded-lg">
                                                                <p className="text-xs font-bold text-blue-600 uppercase tracking-wide">{t("Protein")}</p>
                                                                <p className="text-sm font-black text-blue-700">{pendingConfirmation.data.proteinG || 0}g</p>
                                                            </div>
                                                            <div className="text-center p-2 bg-amber-50 rounded-lg">
                                                                <p className="text-xs font-bold text-amber-600 uppercase tracking-wide">{t("Karb")}</p>
                                                                <p className="text-sm font-black text-amber-700">{pendingConfirmation.data.carbsG || 0}g</p>
                                                            </div>
                                                            <div className="text-center p-2 bg-rose-50 rounded-lg">
                                                                <p className="text-xs font-bold text-rose-600 uppercase tracking-wide">{t("Yağ")}</p>
                                                                <p className="text-sm font-black text-rose-700">{pendingConfirmation.data.fatG || 0}g</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : pendingConfirmation.action === "log_water" ? (
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="text-2xl font-black text-blue-600">
                                                            {pendingConfirmation.data.amountMl || 0}
                                                        </span>
                                                        <span className="text-sm font-bold text-gray-400">ml</span>
                                                    </div>
                                                ) : (
                                                    /* Activity Card */
                                                    <div className="space-y-2">
                                                        <div className="flex items-baseline gap-2 pb-2 border-b border-gray-100">
                                                            <span className="text-2xl font-black text-orange-600">
                                                                -{pendingConfirmation.data.estimatedCalories || 0}
                                                            </span>
                                                            <span className="text-sm font-bold text-gray-400">kcal {t("yakıldı")}</span>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-2 pt-1">
                                                            <div className="text-center p-2 bg-orange-50 rounded-lg">
                                                                <p className="text-xs font-bold text-orange-600 uppercase tracking-wide">{t("Süre")}</p>
                                                                <p className="text-sm font-black text-orange-700">{pendingConfirmation.data.durationMin || 0} dk</p>
                                                            </div>
                                                            <div className="text-center p-2 bg-purple-50 rounded-lg">
                                                                <p className="text-xs font-bold text-purple-600 uppercase tracking-wide">{t("Tür")}</p>
                                                                <p className="text-sm font-black text-purple-700 capitalize">{pendingConfirmation.data.activityType || "aktivite"}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => {
                                                setPendingConfirmation(null);
                                                const cancelMessage = pendingConfirmation.action === "request_web_search"
                                                    ? t("Tamam, arama yapmadım.")
                                                    : t("Tamam, eklemedim.");
                                                setMessages(prev => [...prev, { id: Date.now().toString(), role: "list", content: cancelMessage }]);
                                            }}
                                            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-white border border-gray-200 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95"
                                        >
                                            <X className="h-4 w-4" />
                                            {t("İptal")}
                                        </button>
                                        <button
                                            onClick={async () => {
                                                if (pendingConfirmation.action === "request_web_search") {
                                                    // Execute web search
                                                    const data = pendingConfirmation.data;
                                                    setPendingConfirmation(null);
                                                    setIsLoading(true);
                                                    setMessages(prev => [...prev, { id: Date.now().toString(), role: "list", content: `🔍 **"${data.query}"** ${t("için arama yapılıyor...")}` }]);

                                                    try {
                                                        const res = await fetch("/api/v1/chat", {
                                                            method: "POST",
                                                            headers: { "Content-Type": "application/json" },
                                                            body: JSON.stringify({
                                                                message: `Web araması sonuçlarını özetle: ${data.query}`,
                                                                history: messages.filter(m => m.id !== "welcome").map(m => ({ role: m.role, content: m.content })),
                                                                locale: getLocale(),
                                                                executeSearch: true,
                                                                searchQuery: data.query
                                                            }),
                                                        });

                                                        const responseData = await res.json();
                                                        if (responseData.reply) {
                                                            setMessages(prev => [...prev, { id: Date.now().toString(), role: "list", content: responseData.reply }]);
                                                        }
                                                    } catch {
                                                        setMessages(prev => [...prev, { id: Date.now().toString(), role: "list", content: t("Arama sırasında bir hata oluştu.") }]);
                                                    } finally {
                                                        setIsLoading(false);
                                                    }
                                                } else if (pendingConfirmation.action === "log_food") {
                                                    const data = pendingConfirmation.data;
                                                    await tracker.addFood({
                                                        ...data,
                                                        mealType: (data.mealType as MealType) || "snack"
                                                    });
                                                    setPendingConfirmation(null);
                                                    setMessages(prev => [...prev, { id: Date.now().toString(), role: "list", content: `✅ **${data.name}** ${t("günlüğe eklendi!")}` }]);
                                                } else if (pendingConfirmation.action === "log_water") {
                                                    const data = pendingConfirmation.data;
                                                    await tracker.addWater(data);
                                                    setPendingConfirmation(null);
                                                    setMessages(prev => [...prev, { id: Date.now().toString(), role: "list", content: `✅ **${t("Su")}** ${t("günlüğe eklendi!")}` }]);
                                                } else if (pendingConfirmation.action === "log_activity") {
                                                    const data = pendingConfirmation.data;
                                                    await tracker.addActivity({
                                                        ...data,
                                                        activityType: (data.activityType as ActivityType) || "walking"
                                                    });
                                                    setPendingConfirmation(null);
                                                    setMessages(prev => [...prev, { id: Date.now().toString(), role: "list", content: `✅ **${t("Aktivite")}** ${t("günlüğe eklendi!")}` }]);
                                                }
                                            }}
                                            className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white shadow-lg transition-all active:scale-95 hover:scale-[1.02] ${pendingConfirmation.action === "request_web_search"
                                                    ? "bg-blue-600 shadow-blue-200 hover:bg-blue-700"
                                                    : "bg-emerald-600 shadow-emerald-200 hover:bg-emerald-700"
                                                }`}
                                        >
                                            {pendingConfirmation.action === "request_web_search" ? (
                                                <>
                                                    <Search className="h-4 w-4" />
                                                    {t("Ara")}
                                                </>
                                            ) : (
                                                <>
                                                    <Check className="h-4 w-4 stroke-[3]" />
                                                    {t("Ekle")}
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={scrollAnchorRef} />
                    </div>

                    {/* Input Area */}
                    <div className="border-t border-emerald-50 bg-white p-4">
                        <form onSubmit={handleSubmit} className="relative flex items-center">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={isLimitReached ? t("Limit doldu...") : t("Bir şeyler sor...")}
                                disabled={isLoading || isLimitReached}
                                className="w-full rounded-2xl border-0 bg-gray-50 pl-5 pr-12 py-4 text-sm font-bold text-gray-900 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-50 transition-all outline-none"
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim() || isLimitReached}
                                className="absolute right-3 p-2 rounded-xl text-emerald-600 hover:bg-emerald-50 disabled:text-gray-300 disabled:hover:bg-transparent transition-all"
                            >
                                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5 stroke-[2.5px]" />}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setOpen(!open)}
                className={`group flex h-14 w-14 items-center justify-center rounded-[1.5rem] shadow-2xl transition-all duration-300 hover:scale-110 active:scale-90 sm:h-16 sm:w-16 ${launcherClassName} ${open ? "bg-white text-emerald-700 border border-emerald-100" : "bg-emerald-700 text-white hover:bg-emerald-800 shadow-emerald-200 hover:rotate-[360deg]"
                    }`}
            >
                {open ? (
                    <X className="h-7 w-7" />
                ) : (
                    <Bot className="h-8 w-8" />
                )}

                {/* Notification Dot */}
                {!open && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex h-5 w-5 rounded-full bg-emerald-500 border-2 border-white"></span>
                    </span>
                )}
            </button>
        </div>
    );
}
