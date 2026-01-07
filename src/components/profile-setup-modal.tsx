"use client";

import { useMemo, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  getAgeFromBirthYear,
  isProfileComplete,
  loadProfile,
  saveProfile,
  type ProfileInfo,
} from "@/lib/profile";

const activityOptions = [
  { value: "low", label: "Düşük" },
  { value: "moderate", label: "Orta" },
  { value: "high", label: "Yüksek" },
] as const;

const goalOptions = [
  { value: "lose", label: "Kilo ver" },
  { value: "maintain", label: "Koru" },
  { value: "gain", label: "Kilo al" },
] as const;

const dietOptions = [
  { value: "balanced", label: "Dengeli" },
  { value: "vegetarian", label: "Vejetaryen" },
  { value: "vegan", label: "Vegan" },
  { value: "lowcarb", label: "Düşük karbonhidrat" },
] as const;

function getBmiLabel(bmi: number) {
  if (bmi < 18.5) return "Zayıf";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Fazla";
  return "Yüksek";
}

type ProfileSetupModalProps = {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
};

export function ProfileSetupModal({ open, onClose, onSaved }: ProfileSetupModalProps) {
  const { user } = useUser();
  const [profile, setProfile] = useState<ProfileInfo>(() => loadProfile());
  const [error, setError] = useState<string | null>(null);

  const age = getAgeFromBirthYear(profile.birthYear);
  const heightCm = Number(profile.heightCm);
  const weightKg = Number(profile.weightKg);
  const targetKg = Number(profile.targetWeightKg);

  const bmi =
    Number.isFinite(heightCm) && heightCm > 0 && Number.isFinite(weightKg) && weightKg > 0
      ? weightKg / Math.pow(heightCm / 100, 2)
      : null;

  const targetDelta =
    Number.isFinite(targetKg) && Number.isFinite(weightKg) && targetKg > 0 && weightKg > 0
      ? Number((weightKg - targetKg).toFixed(1))
      : null;

  const canContinue = isProfileComplete(profile);
  const completion = useMemo(() => (canContinue ? 100 : 65), [canContinue]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-3xl rounded-3xl border border-amber-100 bg-white/95 p-6 shadow-strong backdrop-blur">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Profil Soruları</p>
            <h2 className="mt-2 text-2xl font-semibold text-ink">
              {user?.name ? `${user.name}, profilini tamamla` : "Profilini tamamla"}
            </h2>
            <p className="mt-2 text-sm text-muted">
              Kilo, boy ve yaş bilgisi ile kişisel istatistikleri çıkarıyoruz.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-amber-100 bg-white px-3 py-1 text-xs text-muted hover:text-ink"
          >
            Daha sonra
          </button>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-[11px] text-muted">
            <span>Tamamlama</span>
            <span>%{completion}</span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-amber-100">
            <div className="h-2 rounded-full bg-accent" style={{ width: `${completion}%` }} />
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-[11px] text-muted">Ad Soyad</label>
                <input
                  value={profile.fullName}
                  onChange={(event) => {
                    setProfile((prev) => ({ ...prev, fullName: event.target.value }));
                    setError(null);
                  }}
                  className="w-full rounded-xl border border-amber-100 bg-white px-3 py-2 text-sm"
                  placeholder="İsmin"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-muted">Doğum yılı</label>
                <input
                  value={profile.birthYear}
                  onChange={(event) => {
                    setProfile((prev) => ({ ...prev, birthYear: event.target.value }));
                    setError(null);
                  }}
                  className="w-full rounded-xl border border-amber-100 bg-white px-3 py-2 text-sm"
                  placeholder="1998"
                  inputMode="numeric"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-muted">Boy (cm)</label>
                <input
                  value={profile.heightCm}
                  onChange={(event) => {
                    setProfile((prev) => ({ ...prev, heightCm: event.target.value }));
                    setError(null);
                  }}
                  className="w-full rounded-xl border border-amber-100 bg-white px-3 py-2 text-sm"
                  placeholder="175"
                  inputMode="numeric"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-muted">Kilo (kg)</label>
                <input
                  value={profile.weightKg}
                  onChange={(event) => {
                    setProfile((prev) => ({ ...prev, weightKg: event.target.value }));
                    setError(null);
                  }}
                  className="w-full rounded-xl border border-amber-100 bg-white px-3 py-2 text-sm"
                  placeholder="70"
                  inputMode="numeric"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-muted">Hedef kilo (kg)</label>
                <input
                  value={profile.targetWeightKg}
                  onChange={(event) => {
                    setProfile((prev) => ({ ...prev, targetWeightKg: event.target.value }));
                    setError(null);
                  }}
                  className="w-full rounded-xl border border-amber-100 bg-white px-3 py-2 text-sm"
                  placeholder="65"
                  inputMode="numeric"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-muted">Aktivite düzeyi</label>
                <select
                  value={profile.activityLevel}
                  onChange={(event) => {
                    setProfile((prev) => ({
                      ...prev,
                      activityLevel: event.target.value as ProfileInfo["activityLevel"],
                    }));
                  }}
                  className="w-full rounded-xl border border-amber-100 bg-white px-3 py-2 text-sm"
                >
                  {activityOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-muted">Hedef</label>
                <select
                  value={profile.goal}
                  onChange={(event) => {
                    setProfile((prev) => ({
                      ...prev,
                      goal: event.target.value as ProfileInfo["goal"],
                    }));
                  }}
                  className="w-full rounded-xl border border-amber-100 bg-white px-3 py-2 text-sm"
                >
                  {goalOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-muted">Beslenme tercihi</label>
                <select
                  value={profile.dietPreference}
                  onChange={(event) => {
                    setProfile((prev) => ({
                      ...prev,
                      dietPreference: event.target.value as ProfileInfo["dietPreference"],
                    }));
                  }}
                  className="w-full rounded-xl border border-amber-100 bg-white px-3 py-2 text-sm"
                >
                  {dietOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {error && <p className="text-xs text-red-600">{error}</p>}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  if (!canContinue) {
                    setError("Lütfen doğum yılı, boy ve kilo alanlarını doldurun.");
                    return;
                  }
                  saveProfile(profile);
                  onSaved();
                }}
                className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-strong"
              >
                Kaydet ve Devam Et
              </button>
              <span className="text-xs text-muted">Sonradan profil sayfasından düzenlenir.</span>
            </div>
          </div>

          <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-4 text-xs text-amber-900">
            <p className="text-sm font-semibold text-ink">Önizleme</p>
            <div className="mt-3 grid gap-2">
              <div className="flex items-center justify-between">
                <span>Yaş</span>
                <span className="font-semibold">{age !== null ? `${age} yaş` : "-"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>BMI</span>
                <span className="font-semibold">{bmi !== null ? bmi.toFixed(1) : "-"}</span>
              </div>
              {bmi !== null && <span className="text-[11px]">{getBmiLabel(bmi)} aralık</span>}
              <div className="flex items-center justify-between">
                <span>Hedefe kalan</span>
                <span className="font-semibold">{targetDelta !== null ? `${targetDelta} kg` : "-"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Aktivite</span>
                <span className="font-semibold">
                  {activityOptions.find((option) => option.value === profile.activityLevel)?.label}
                </span>
              </div>
            </div>
            <p className="mt-3 text-[11px] text-amber-700">
              Kişisel plan önerileri sonraki sürümde aktive edilecek.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
