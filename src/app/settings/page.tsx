"use client";

import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Card } from "@/components/card";
import { useTracker } from "@/components/tracker-provider";

export default function SettingsPage() {
  const { user, isLoading } = useUser();
  const { goals, updateGoals, flags, updateFlags, dataMode, importLocalEntries } = useTracker();
  const [waterGoal, setWaterGoal] = useState(String(goals.waterGoalMl));
  const [calorieGoal, setCalorieGoal] = useState(String(goals.calorieGoal));
  const [importedCount, setImportedCount] = useState<number | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  useEffect(() => {
    setWaterGoal(String(goals.waterGoalMl));
    setCalorieGoal(String(goals.calorieGoal));
  }, [goals]);

  return (
    <div className="space-y-6">
      <Card className="space-y-3">
        <div>
          <p className="text-sm font-semibold">Hesap</p>
          <p className="text-xs text-muted">
            {dataMode === "remote" ? "Bulut (Neon) aktif" : "Yerel cihaz modu"}
          </p>
        </div>
        <div className="rounded-2xl border border-amber-100 bg-white px-4 py-3 text-xs text-muted">
          {isLoading && "Oturum kontrol ediliyor..."}
          {!isLoading && !user && "Giriş yaparak verilerinizi buluta taşıyabilirsiniz."}
          {user && `Giriş yapan: ${user.email ?? user.name ?? "Kullanıcı"}`}
        </div>
        <div className="flex flex-wrap gap-2">
          {!isLoading && !user && (
            <a
              href="/auth/login"
              className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-strong"
            >
              Giriş Yap
            </a>
          )}
          {user && (
            <a
              href="/auth/logout"
              className="rounded-xl border border-amber-100 bg-white px-4 py-2 text-sm font-semibold text-amber-700"
            >
              Çıkış Yap
            </a>
          )}
          {dataMode === "remote" && (
            <button
              onClick={async () => {
                setIsImporting(true);
                const count = await importLocalEntries();
                setImportedCount(count);
                setIsImporting(false);
              }}
              className="rounded-xl border border-amber-100 bg-white px-4 py-2 text-sm font-semibold text-amber-700"
            >
              {isImporting ? "Taşınıyor..." : "Cihazdaki kayıtları taşı"}
            </button>
          )}
        </div>
        {importedCount !== null && (
          <p className="text-xs text-muted">{importedCount} kayıt taşındı.</p>
        )}
      </Card>

      <Card className="space-y-3">
        <div>
          <p className="text-sm font-semibold">Hedefler</p>
          <p className="text-xs text-muted">Yerel cihazınızda saklanır</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs text-muted">Günlük Su Hedefi (ml)</label>
            <input
              value={waterGoal}
              onChange={(event) => setWaterGoal(event.target.value)}
              className="w-full rounded-xl border border-amber-100 bg-white px-3 py-2 text-sm"
              type="number"
              min="0"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-muted">Günlük Kalori Hedefi</label>
            <input
              value={calorieGoal}
              onChange={(event) => setCalorieGoal(event.target.value)}
              className="w-full rounded-xl border border-amber-100 bg-white px-3 py-2 text-sm"
              type="number"
              min="0"
            />
          </div>
        </div>
        <button
          onClick={() => {
            updateGoals({
              waterGoalMl: Number(waterGoal),
              calorieGoal: Number(calorieGoal),
            });
          }}
          className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-strong"
        >
          Hedefleri Güncelle
        </button>
      </Card>

      {/* Google Fit Integration Temporarily Disabled
      {user && (
        <Card className="space-y-4">
          <div>
            <p className="text-sm font-semibold">Google Fit Entegrasyonu</p>
            <p className="text-xs text-muted">Salt okunur. Yazma izni yoktur.</p>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-xs text-muted">
            <span>Bağlantı Durumu</span>
            <span className="rounded-full bg-white px-3 py-1 text-[11px] text-amber-700">
              {flags.googleFit ? "Aktif" : "Pasif"}
            </span>
          </div>
          <a
            href="/api/integrations/google/auth"
            className={`block w-full text-center rounded-xl px-4 py-2 text-sm font-semibold ${
              flags.googleFit
                ? "bg-accent text-white hover:bg-accent-strong"
                : "cursor-not-allowed bg-amber-100 text-amber-400 pointer-events-none"
            }`}
          >
            Google Fit ile Bağlan
          </a>
          <p className="text-xs text-muted">
            Adım, aktif kalori ve temel aktivite verileri çekilir. Kullanıcı istediği zaman
            bağlantıyı kesebilir.
          </p>
        </Card>
      )}
      */}

      <Card className="space-y-4">
        <div>
          <p className="text-sm font-semibold">Özellik Bayrakları</p>
          <p className="text-xs text-muted">AI özellikleri varsayılan olarak kapalı</p>
        </div>
        <div className="space-y-3">
          <label className="flex items-center justify-between rounded-2xl border border-amber-100 bg-white px-4 py-3 text-xs">
            <span className="text-muted">AI Görsel Tanıma</span>
            <input
              type="checkbox"
              checked={flags.aiVisual}
              onChange={(event) => updateFlags({ aiVisual: event.target.checked })}
              className="h-5 w-5 accent-orange-500"
            />
          </label>
          {/*
          <label className="flex items-center justify-between rounded-2xl border border-amber-100 bg-white px-4 py-3 text-xs">
            <span className="text-muted">Google Fit (read-only)</span>
            <input
              type="checkbox"
              checked={flags.googleFit}
              onChange={(event) => updateFlags({ googleFit: event.target.checked })}
              className="h-5 w-5 accent-orange-500"
            />
          </label>
          */}
          <label className="flex items-center justify-between rounded-2xl border border-amber-100 bg-white px-4 py-3 text-xs">
            <span className="text-muted">Karanlık Mod (opsiyonel)</span>
            <input
              type="checkbox"
              checked={flags.darkMode}
              onChange={(event) => updateFlags({ darkMode: event.target.checked })}
              className="h-5 w-5 accent-orange-500"
            />
          </label>
        </div>
      </Card>
    </div>
  );
}
