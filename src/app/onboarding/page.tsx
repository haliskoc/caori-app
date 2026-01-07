"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/card";
import {
  isProfileComplete,
  loadProfile,
  saveProfile,
  type ProfileInfo,
} from "@/lib/profile";

type QuestionType = "number" | "text" | "single";

type Option = {
  value: string;
  label: string;
};

type Question = {
  id: keyof ProfileInfo;
  step: number;
  title: string;
  subtitle: string;
  prompt: string;
  type: QuestionType;
  options?: Option[];
  placeholder?: string;
  required?: boolean;
  hint?: string;
};

const steps = [
  { id: 1, label: "Seni tanıyalım" },
  { id: 2, label: "Hedefini seç" },
  { id: 3, label: "Spor geçmişin" },
  { id: 4, label: "Koşulların" },
  { id: 5, label: "Sağlık & güvenlik" },
  { id: 6, label: "Bizi nereden duydun" },
  { id: 7, label: "Beklentin" },
];

const questions: Question[] = [
  {
    id: "age",
    step: 1,
    title: "Seni tanıyalım",
    subtitle: "Temel ölçüleri öğrenelim",
    prompt: "Yaşın kaç?",
    type: "number",
    placeholder: "Örn: 26",
    required: true,
  },
  {
    id: "heightCm",
    step: 1,
    title: "Seni tanıyalım",
    subtitle: "Temel ölçüleri öğrenelim",
    prompt: "Boyun kaç cm?",
    type: "number",
    placeholder: "Örn: 175",
    required: true,
  },
  {
    id: "weightKg",
    step: 1,
    title: "Seni tanıyalım",
    subtitle: "Temel ölçüleri öğrenelim",
    prompt: "Kilon kaç kg?",
    type: "number",
    placeholder: "Örn: 70",
    required: true,
  },
  {
    id: "mainGoal",
    step: 2,
    title: "Hedefini seç",
    subtitle: "Ana odağını belirle",
    prompt: "Ana hedefin ne?",
    type: "single",
    required: true,
    options: [
      { value: "fat_burn", label: "Yağ yakmak" },
      { value: "muscle_gain", label: "Kas kazanmak" },
      { value: "fit_form", label: "Fit & form kalmak" },
      { value: "conditioning", label: "Kondisyon artırmak" },
      { value: "healthy", label: "Sağlıklı yaşamak" },
    ],
  },
  {
    id: "sportLevel",
    step: 3,
    title: "Spor geçmişin",
    subtitle: "Deneyimini öğrenelim",
    prompt: "Spor seviyeni nasıl tanımlarsın?",
    type: "single",
    required: true,
    options: [
      { value: "beginner", label: "Yeni başlıyorum" },
      { value: "sometimes", label: "Ara sıra yapıyorum" },
      { value: "regular", label: "Düzenli yapıyorum" },
      { value: "advanced", label: "İleri seviye" },
    ],
  },
  {
    id: "workoutDays",
    step: 3,
    title: "Spor geçmişin",
    subtitle: "Rutini netleştirelim",
    prompt: "Haftada kaç gün spor yapabilirsin?",
    type: "single",
    required: true,
    options: [
      { value: "1-2", label: "1–2 gün" },
      { value: "3-4", label: "3–4 gün" },
      { value: "5+", label: "5+ gün" },
    ],
  },
  {
    id: "workoutPlace",
    step: 4,
    title: "Koşulların",
    subtitle: "Antrenman ortamı",
    prompt: "Nerede spor yapacaksın?",
    type: "single",
    required: true,
    options: [
      { value: "home", label: "Ev" },
      { value: "gym", label: "Spor salonu" },
      { value: "outdoor", label: "Açık alan" },
    ],
  },
  {
    id: "equipmentLevel",
    step: 4,
    title: "Koşulların",
    subtitle: "Ekipman durumu",
    prompt: "Ekipman durumun nedir?",
    type: "single",
    required: true,
    options: [
      { value: "none", label: "Ekipman yok" },
      { value: "basic", label: "Temel ekipman (dumbbell vb.)" },
      { value: "full", label: "Tam ekipman" },
    ],
  },
  {
    id: "injury",
    step: 5,
    title: "Sağlık & güvenlik",
    subtitle: "Opsiyonel ama önerilir",
    prompt: "Bilinen bir sakatlığın var mı?",
    type: "single",
    options: [
      { value: "none", label: "Yok" },
      { value: "knee", label: "Diz" },
      { value: "back", label: "Bel" },
      { value: "shoulder", label: "Omuz" },
      { value: "other", label: "Diğer (yaz)" },
    ],
  },
  {
    id: "doctorRestriction",
    step: 5,
    title: "Sağlık & güvenlik",
    subtitle: "Opsiyonel ama önerilir",
    prompt: "Doktorun sporla ilgili bir kısıt koydu mu?",
    type: "single",
    options: [
      { value: "no", label: "Hayır" },
      { value: "yes", label: "Evet" },
    ],
  },
  {
    id: "referralSource",
    step: 6,
    title: "Bizi nereden duydun?",
    subtitle: "Tek soru, altın değerinde",
    prompt: "Uygulamamızı nereden duydun?",
    type: "single",
    required: true,
    options: [
      { value: "instagram", label: "Instagram" },
      { value: "tiktok", label: "TikTok" },
      { value: "youtube", label: "YouTube" },
      { value: "friend", label: "Arkadaş tavsiyesi" },
      { value: "search", label: "Google / App Store" },
      { value: "other", label: "Diğer" },
    ],
  },
  {
    id: "expectation",
    step: 7,
    title: "Beklentin",
    subtitle: "Opsiyonel (atlayabilirsin)",
    prompt: "Bu uygulamadan en büyük beklentin ne?",
    type: "text",
    placeholder: "Kısa not...",
    required: false,
  },
];

function getProgressValue(currentIndex: number) {
  return Math.round(((currentIndex + 1) / questions.length) * 100);
}

function getBmiSummary(profile: ProfileInfo) {
  const height = Number(profile.heightCm);
  const weight = Number(profile.weightKg);
  if (!Number.isFinite(height) || !Number.isFinite(weight) || height <= 0 || weight <= 0) {
    return null;
  }
  const bmi = weight / Math.pow(height / 100, 2);
  return bmi.toFixed(1);
}

export default function OnboardingPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileInfo>(() => loadProfile());
  const [questionIndex, setQuestionIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const question = questions[questionIndex];
  const progress = getProgressValue(questionIndex);
  const step = steps.find((item) => item.id === question.step);

  const answer = profile[question.id] ?? "";
  const bmi = useMemo(() => getBmiSummary(profile), [profile]);

  const isOptionalStep = question.step === 5 || question.id === "expectation";

  const isAnswerMissing =
    question.required &&
    (typeof answer !== "string" || answer.trim() === "");

  const needsOtherDetail = question.id === "injury" && profile.injury === "other";
  const hasOtherDetail = profile.injuryDetail.trim().length > 0;

  function updateProfile(key: keyof ProfileInfo, value: string) {
    setProfile((prev) => ({ ...prev, [key]: value }));
    setError(null);
  }

  function goNext() {
    if (isAnswerMissing) {
      setError("Lütfen bu soruyu yanıtla.");
      return;
    }
    if (needsOtherDetail && !hasOtherDetail) {
      setError("Lütfen sakatlık detayını yaz.");
      return;
    }
    const nextIndex = questionIndex + 1;
    const nextProfile = { ...profile };
    saveProfile(nextProfile);
    if (nextIndex >= questions.length) {
      if (!isProfileComplete(nextProfile)) {
        setError("Zorunlu soruları tamamla.");
        return;
      }
      router.replace("/dashboard");
      return;
    }
    setQuestionIndex(nextIndex);
  }

  function goBack() {
    if (questionIndex === 0) {
      return;
    }
    setQuestionIndex((prev) => Math.max(prev - 1, 0));
    setError(null);
  }

  function skip() {
    if (!isOptionalStep) {
      return;
    }
    setQuestionIndex((prev) => Math.min(prev + 1, questions.length - 1));
    setError(null);
  }

  return (
    <div className="space-y-6">
      <Card className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Onboarding</p>
        <h1 className="text-2xl font-semibold text-ink">
          {step?.label ?? "Seni tanıyalım"}
        </h1>
        <p className="text-sm text-muted">{question.subtitle}</p>
        <div className="flex items-center justify-between text-[11px] text-muted">
          <span>İlerleme</span>
          <span>%{progress}</span>
        </div>
        <div className="h-2 rounded-full bg-amber-100">
          <div className="h-2 rounded-full bg-accent" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex flex-wrap gap-2 text-[11px] text-muted">
          {steps.map((item) => (
            <span
              key={item.id}
              className={`rounded-full px-3 py-1 ${
                item.id === question.step
                  ? "bg-amber-100 text-amber-700"
                  : "bg-white/80 text-muted"
              }`}
            >
              {item.id}. {item.label}
            </span>
          ))}
        </div>
      </Card>

      <Card className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">{question.title}</p>
          <h2 className="mt-2 text-xl font-semibold text-ink">{question.prompt}</h2>
          {question.hint && <p className="mt-2 text-xs text-muted">{question.hint}</p>}
        </div>

        {question.type === "number" && (
          <input
            value={String(answer)}
            onChange={(event) => updateProfile(question.id, event.target.value)}
            className="w-full rounded-xl border border-amber-100 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-200"
            placeholder={question.placeholder}
            inputMode="numeric"
          />
        )}

        {question.type === "text" && (
          <textarea
            value={String(answer)}
            onChange={(event) => updateProfile(question.id, event.target.value)}
            className="min-h-[120px] w-full rounded-xl border border-amber-100 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-200"
            placeholder={question.placeholder}
          />
        )}

        {question.type === "single" && (
          <div className="grid gap-2 sm:grid-cols-2">
            {question.options?.map((option) => (
              <button
                key={option.value}
                onClick={() => updateProfile(question.id, option.value)}
                className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                  answer === option.value
                    ? "border-amber-300 bg-amber-50 text-amber-700"
                    : "border-amber-100 bg-white text-muted hover:text-ink"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}

        {question.id === "injury" && profile.injury === "other" && (
          <input
            value={profile.injuryDetail}
            onChange={(event) => updateProfile("injuryDetail", event.target.value)}
            className="w-full rounded-xl border border-amber-100 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-200"
            placeholder="Sakatlık detayını yaz"
          />
        )}

        {error && <p className="text-xs text-red-600">{error}</p>}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={goBack}
              className="rounded-xl border border-amber-100 bg-white px-4 py-2 text-sm text-muted hover:text-ink"
              disabled={questionIndex === 0}
            >
              Geri
            </button>
            <button
              onClick={goNext}
              className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-strong"
            >
              {questionIndex === questions.length - 1 ? "Bitir" : "İleri"}
            </button>
          </div>
          {isOptionalStep && (
            <button
              onClick={skip}
              className="rounded-xl border border-amber-100 bg-white px-4 py-2 text-sm text-muted hover:text-ink"
            >
              Atla
            </button>
          )}
        </div>
      </Card>

      <Card className="space-y-3">
        <p className="text-sm font-semibold">Önizleme</p>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-amber-100 bg-white px-3 py-3 text-xs">
            <p className="text-muted">Yaş</p>
            <p className="mt-1 text-lg font-semibold text-ink">
              {profile.age ? `${profile.age} yaş` : "-"}
            </p>
          </div>
          <div className="rounded-2xl border border-amber-100 bg-white px-3 py-3 text-xs">
            <p className="text-muted">Kilo</p>
            <p className="mt-1 text-lg font-semibold text-ink">
              {profile.weightKg ? `${profile.weightKg} kg` : "-"}
            </p>
          </div>
          <div className="rounded-2xl border border-amber-100 bg-white px-3 py-3 text-xs">
            <p className="text-muted">BMI</p>
            <p className="mt-1 text-lg font-semibold text-ink">{bmi ?? "-"}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
