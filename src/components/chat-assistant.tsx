"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, X, Sparkles, User, Loader2 } from "lucide-react";
import Link from "next/link";
import { t } from "@/lib/i18n";

type Message = {
    id: string;
    role: "user" | "list";
    content: string;
};

export function ChatAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            role: "list",
            content: t("Merhaba! Ben Calmet AI. Beslenme veya antrenmanla ilgili ne sormak istersin?"),
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isLimitReached, setIsLimitReached] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

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
                body: JSON.stringify({ message: userMessage.content, history }),
            });

            const data = await res.json();

            if (res.status === 403 && data.limitReached) {
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
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now().toString(),
                    role: "list",
                    content: t("Bir bağlantı hatası oluştu. Lütfen tekrar dene."),
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
            {/* Chat Window */}
            {isOpen && (
                <div className="w-[360px] overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-2xl animate-[fade-up_0.2s_ease-out]">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-amber-50 bg-gradient-to-r from-amber-50 to-white px-4 py-3">
                        <div className="flex items-center gap-2.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 shadow-sm">
                                <Bot className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-900">{t("Calmet AI")}</h3>
                                <p className="text-[10px] text-amber-600 font-medium tracking-wide uppercase">
                                    {t("Sağlık Asistanı")}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div ref={scrollRef} className="h-[400px] overflow-y-auto bg-[#fffbf7] p-4 space-y-4">
                        {messages.map((m) => (
                            <div
                                key={m.id}
                                className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                            >
                                <div
                                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-sm ${m.role === "user" ? "bg-gray-900 text-white" : "bg-white text-amber-600 border border-amber-100"
                                        }`}
                                >
                                    {m.role === "user" ? <User className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
                                </div>
                                <div
                                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${m.role === "user"
                                            ? "bg-gray-900 text-white rounded-tr-none"
                                            : "bg-white text-gray-700 border border-amber-100/50 rounded-tl-none"
                                        }`}
                                >
                                    {m.content}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex gap-3">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-amber-600 border border-amber-100 shadow-sm">
                                    <Sparkles className="h-4 w-4 animate-pulse" />
                                </div>
                                <div className="flex items-center gap-1 rounded-2xl bg-white px-4 py-3 border border-amber-100/50 shadow-sm rounded-tl-none">
                                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:-0.3s]" />
                                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:-0.15s]" />
                                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-bounce" />
                                </div>
                            </div>
                        )}

                        {/* Upgrade Prompt if Limit Reached */}
                        {isLimitReached && (
                            <div className="mt-4 rounded-xl border border-rose-100 bg-rose-50 p-4 text-center">
                                <p className="text-xs font-medium text-rose-800 mb-3">
                                    {t("Sınırsız sohbet ve kişisel koçluk için Premium'a geçin.")}
                                </p>
                                <Link
                                    href="/pricing"
                                    className="block w-full rounded-lg bg-rose-600 py-2 text-xs font-bold text-white shadow-sm hover:bg-rose-700 transition-colors"
                                >
                                    {t("Paketleri İncele")}
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="border-t border-amber-100 bg-white p-3">
                        <form onSubmit={handleSubmit} className="relative flex items-center">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={isLimitReached ? t("Limit doldu...") : t("Bir şeyler sor...")}
                                disabled={isLoading || isLimitReached}
                                className="w-full rounded-xl border-0 bg-gray-50 pl-4 pr-12 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-amber-500/20 disabled:opacity-50 transition-all"
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim() || isLimitReached}
                                className="absolute right-2 p-1.5 rounded-lg text-amber-600 hover:bg-amber-50 disabled:text-gray-300 disabled:hover:bg-transparent transition-colors"
                            >
                                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`group flex h-14 w-14 items-center justify-center rounded-full shadow-[0_8px_30px_rgba(255,122,0,0.3)] transition-all hover:scale-105 active:scale-95 ${isOpen ? "bg-white text-gray-600" : "bg-gradient-to-tr from-amber-500 to-orange-600 text-white"
                    }`}
            >
                {isOpen ? (
                    <X className="h-6 w-6 transition-transform group-hover:rotate-90" />
                ) : (
                    <Bot className="h-7 w-7" />
                )}

                {/* Notification Dot */}
                {!isOpen && (
                    <span className="absolute -right-1 -top-1 flex h-4 w-4">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75"></span>
                        <span className="relative inline-flex h-4 w-4 rounded-full bg-rose-500 border-2 border-white"></span>
                    </span>
                )}
            </button>
        </div>
    );
}
