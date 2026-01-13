"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, X, Sparkles, User, Loader2 } from "lucide-react";
import Link from "next/link";
import { t, getLocale } from "@/lib/i18n";
import ReactMarkdown from "react-markdown";

type Message = {
    id: string;
    role: "user" | "list";
    content: string;
};

export function ChatAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isLimitReached, setIsLimitReached] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Her açıldığında sohbeti sıfırla
    useEffect(() => {
        if (isOpen) {
            setMessages([
                {
                    id: "welcome",
                    role: "list",
                    content: t("Merhaba! Ben Calmet AI Sağlık Koçunuz. Bugün beslenme veya antrenman hedefleriniz için size nasıl yardımcı olabilirim?"),
                },
            ]);
            setIsLimitReached(false);
        }
    }, [isOpen]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen, isLoading]);

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
                setMessages((prev) => [
                    ...prev,
                    {
                        id: Date.now().toString(),
                        role: "list",
                        content: t(
                            "Üzgünüm, bugünkü ücretsiz soru hakkın doldu. Daha fazla yardım almak için limitlerini kaldır."
                        ),
                    },
                ]);
            } else if (data.reply) {
                setMessages((prev) => [
                    ...prev,
                    {
                        id: Date.now().toString(),
                        role: "list",
                        content: data.reply,
                    },
                ]);
            } else {
                throw new Error(data.error || "Unknown error");
            }
        } catch (error: any) {
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now().toString(),
                    role: "list",
                    content: t(error.message || "Bir bağlantı hatası oluştu. Lütfen tekrar dene."),
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="fixed bottom-24 left-1/2 z-50 flex flex-col items-center gap-4 -translate-x-1/2 sm:bottom-6 sm:right-6 sm:left-auto sm:translate-x-0 sm:items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="w-[min(92vw,380px)] overflow-hidden rounded-[2rem] border border-emerald-100 bg-white shadow-2xl animate-[fade-up_0.2s_ease-out] flex flex-col max-h-[70vh] sm:max-h-none sm:w-[380px]">
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
                            onClick={() => setIsOpen(false)}
                            className="rounded-xl p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto bg-[#fffcf9] p-5 space-y-6">
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
                                    {m.role === "list" ? (
                                        <article className="prose prose-sm prose-emerald max-w-none prose-p:leading-relaxed prose-li:my-1 font-medium">
                                            <ReactMarkdown>{m.content}</ReactMarkdown>
                                        </article>
                                    ) : (
                                        m.content
                                    )}
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
                                    {t("Günlük ücretsiz limitin doldu. Sınırsız AI koçluğu için Plus'a geç!")}
                                </p>
                                <Link
                                    href="/pricing"
                                    className="block w-full rounded-2xl bg-emerald-600 py-3 text-sm font-black text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all hover:scale-105 active:scale-95"
                                >
                                    {t("Planları Gör")}
                                </Link>
                            </div>
                        )}
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
                onClick={() => setIsOpen(!isOpen)}
                className={`group flex h-14 w-14 items-center justify-center rounded-[1.5rem] shadow-2xl transition-all duration-300 hover:scale-110 active:scale-90 sm:h-16 sm:w-16 ${isOpen ? "bg-white text-emerald-700 border border-emerald-100" : "bg-emerald-700 text-white hover:bg-emerald-800 shadow-emerald-200 hover:rotate-[360deg]"
                    }`}
            >
                {isOpen ? (
                    <X className="h-7 w-7" />
                ) : (
                    <Bot className="h-8 w-8" />
                )}

                {/* Notification Dot */}
                {!isOpen && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex h-5 w-5 rounded-full bg-emerald-500 border-2 border-white"></span>
                    </span>
                )}
            </button>
        </div>
    );
}
