"use client";

import { useEffect, useState } from "react";
import { useTracker } from "@/components/tracker-provider";
import { getDemoEntries } from "@/lib/demo-data";

const ONBOARDING_KEY = "calai.onboarding.v1";

const steps = [
  {
    title: "Hedeflerini belirle",
    description: "Günlük kalori ve su hedefini ayarlayıp takibi kişiselleştir.",
  },
  {
    title: "Girişleri ekle",
    description: "Öğün, su ve aktiviteleri ekleyerek günlük dengeyi gör.",
  },
  {
    title: "İlerlemeni takip et",
    description: "Grafikler ve geçmiş ekranı ile trendleri yakala.",
  },
];

export function Onboarding() {
  const { addEntries, entries } = useTracker();
  const [open, setOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [demoLoaded, setDemoLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const seen = window.localStorage.getItem(ONBOARDING_KEY);
    if (!seen) {
      setOpen(true);
    }
  }, []);

  function close() {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(ONBOARDING_KEY, "seen");
    }
    setOpen(false);
  }

  if (!open) {
    return null;
  }

  const step = steps[stepIndex];
  const isLast = stepIndex === steps.length - 1;

  return (
    <div className="fixed inset-0 z-[55] flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-3xl border border-amber-100 bg-white/95 p-6 shadow-strong backdrop-blur">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Başlangıç</p>
            <h2 className="mt-2 text-2xl font-semibold text-ink">{step.title}</h2>
            <p className="mt-3 text-sm text-muted">{step.description}</p>
          </div>
          <button
            onClick={close}
            className="rounded-full border border-amber-100 bg-white px-3 py-1 text-xs text-muted hover:text-ink"
          >
            Atla
          </button>
        </div>

        <div className="mt-6 space-y-3 rounded-2xl border border-amber-100 bg-amber-50/60 p-4 text-xs text-muted">
          <p>İpucu: Ctrl/Cmd + K ile komut paletini açabilirsiniz.</p>
          <p>Örnek veri yüklerseniz grafikler hemen dolacaktır.</p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={async () => {
              await addEntries(getDemoEntries(), { mode: "merge", source: "onboarding" });
              setDemoLoaded(true);
            }}
            className="rounded-xl border border-amber-200 bg-white px-4 py-2 text-sm font-semibold text-amber-700 hover:border-amber-300"
            disabled={demoLoaded}
          >
            {demoLoaded ? "Örnek veri yüklendi" : "Örnek veriyi yükle"}
          </button>
          {entries.length > 0 && (
            <span className="text-[11px] text-muted">
              Mevcut verilerin üzerine eklenir.
            </span>
          )}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {steps.map((item, index) => (
              <span
                key={item.title}
                className={`h-2 w-2 rounded-full ${
                  index === stepIndex ? "bg-amber-600" : "bg-amber-200"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setStepIndex((prev) => Math.max(prev - 1, 0))}
              className="rounded-xl border border-amber-100 bg-white px-4 py-2 text-xs text-muted hover:text-ink"
              disabled={stepIndex === 0}
            >
              Geri
            </button>
            <button
              onClick={() => {
                if (isLast) {
                  close();
                } else {
                  setStepIndex((prev) => prev + 1);
                }
              }}
              className="rounded-xl bg-amber-600 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-700"
            >
              {isLast ? "Başla" : "İleri"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
