"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Mic, MicOff } from "lucide-react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Card } from "@/components/card";
import { Tooltip } from "@/components/tooltip";
import { useTracker } from "@/components/tracker-provider";
import { ActivityType, MealType } from "@/lib/types";
import { activityOptions, estimateActivityCalories } from "@/lib/activity";
import { OFFProduct } from "@/lib/off";
import {
  FoodLibraryItem,
  FoodLibrarySource,
  loadFoodLibrary,
  normalizeFoodLibraryItem,
  saveFoodLibrary,
} from "@/lib/food-library";
import { createId } from "@/lib/utils";
import { getIntlLocale, t } from "@/lib/i18n";
import { loadProfile } from "@/lib/profile";

type TabKey = "food" | "water" | "activity";

type BarcodeDetectorConstructor = new (options?: { formats?: string[] }) => {
  detect: (
    image: HTMLVideoElement | HTMLCanvasElement | HTMLImageElement | ImageBitmap
  ) => Promise<Array<{ rawValue: string }>>;
};

type SpeechRecognitionResultLike = { isFinal: boolean; 0: { transcript: string } };
type SpeechRecognitionEventLike = { results: SpeechRecognitionResultLike[] };
type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
};
type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;
type VoiceParsedEntry =
  | { kind: "food"; data: { name: string; calories: number; mealType: MealType; amountG?: number; proteinG?: number; carbsG?: number; fatG?: number }; missingCalories: boolean }
  | { kind: "water"; data: { amountMl: number } }
  | { kind: "activity"; data: { activityType: ActivityType; durationMin: number; estimatedCalories: number } };

const NUMBER_WORDS: Record<string, number> = {
  bir: 1,
  iki: 2,
  uc: 3,
  dort: 4,
  bes: 5,
  alti: 6,
  yedi: 7,
  sekiz: 8,
  dokuz: 9,
  on: 10,
  yarim: 0.5,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
};

const FOOD_VERBS = [
  "yedim",
  "yedi",
  "yedik",
  "yiyorum",
  "yemek",
  "yemis",
  "tukettim",
  "tukettik",
  "atistirdim",
  "atistirdik",
  "ictim",
  "iciyorum",
  "icmek",
  "ate",
  "eat",
  "eating",
  "drank",
  "drink",
  "drinking",
];

const WATER_KEYWORDS = ["su", "water"];

const MEAL_KEYWORDS: Array<{ type: MealType; keywords: string[] }> = [
  { type: "breakfast", keywords: ["kahvalti", "sabah", "breakfast"] },
  { type: "lunch", keywords: ["ogle", "oglen", "lunch"] },
  { type: "dinner", keywords: ["aksam", "dinner"] },
  { type: "snack", keywords: ["atistir", "ara", "snack", "gece"] },
];

const ACTIVITY_KEYWORDS: Array<{ type: ActivityType; keywords: string[] }> = [
  { type: "walking", keywords: ["yurudum", "yuruyus", "yurume", "walk", "walking"] },
  { type: "running", keywords: ["kostum", "kosu", "run", "running"] },
  { type: "gym", keywords: ["spor", "antrenman", "gym", "workout"] },
  { type: "cycling", keywords: ["bisiklet", "cycle", "cycling"] },
  { type: "swimming", keywords: ["yuzdum", "yuzme", "swim", "swimming"] },
  { type: "yoga", keywords: ["yoga"] },
  { type: "hiit", keywords: ["hiit"] },
  { type: "pilates", keywords: ["pilates"] },
  { type: "stairs", keywords: ["merdiven", "stairs"] },
];

const FOOD_STOPWORDS = new Set([
  ...Object.keys(NUMBER_WORDS),
  ...FOOD_VERBS,
  "su",
  "water",
  "bardak",
  "kupa",
  "fincan",
  "sise",
  "ml",
  "mililitre",
  "litre",
  "lt",
  "l",
  "gram",
  "gr",
  "g",
  "adet",
  "dilim",
  "porsiyon",
  "tabak",
  "kase",
  "kahvalti",
  "sabah",
  "ogle",
  "oglen",
  "aksam",
  "gece",
  "ara",
  "snack",
]);

const TURKISH_CHAR_MAP: Record<string, string> = {
  ç: "c",
  Ç: "c",
  ğ: "g",
  Ğ: "g",
  ı: "i",
  İ: "i",
  ö: "o",
  Ö: "o",
  ş: "s",
  Ş: "s",
  ü: "u",
  Ü: "u",
};

function stripDiacritics(value: string) {
  return value.replace(/[çğıöşüÇĞİÖŞÜ]/g, (char) => TURKISH_CHAR_MAP[char] ?? char);
}

function normalizeTextForMatch(value: string) {
  return stripDiacritics(value.toLowerCase());
}

function tokenizeSegment(value: string) {
  return value
    .replace(/[.,!?;:]/g, " ")
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);
}

function parseNumberFromTokens(tokens: string[]) {
  for (const token of tokens) {
    if (!token) continue;
    if (/^\d/.test(token)) {
      const parsed = Number.parseFloat(token.replace(",", "."));
      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }
    const wordValue = NUMBER_WORDS[token];
    if (typeof wordValue === "number") {
      return wordValue;
    }
  }
  return null;
}

function splitVoiceSegments(text: string) {
  return text
    .split(/(?:,|;|\s+ve\s+|\s+ile\s+|\s+and\s+)/i)
    .map((segment) => segment.trim())
    .filter(Boolean);
}

function resolveMealTypeFromSegment(segment: string) {
  const normalized = normalizeTextForMatch(segment);
  for (const group of MEAL_KEYWORDS) {
    if (group.keywords.some((keyword) => normalized.includes(keyword))) {
      return group.type;
    }
  }
  return null;
}

function resolveActivityType(segment: string) {
  const normalized = normalizeTextForMatch(segment);
  for (const group of ACTIVITY_KEYWORDS) {
    if (group.keywords.some((keyword) => normalized.includes(keyword))) {
      return group.type;
    }
  }
  return null;
}

function parseDurationFromSegment(segment: string, tokens: string[]) {
  const normalized = normalizeTextForMatch(segment);
  if (normalized.includes("yarim saat") || normalized.includes("half hour")) {
    return 30;
  }
  const hourMatch = normalized.match(/(\d+(?:[.,]\d+)?)\s*(saat|hour|hours|hrs)/);
  if (hourMatch) {
    const parsed = Number.parseFloat(hourMatch[1].replace(",", "."));
    return Number.isFinite(parsed) ? Math.round(parsed * 60) : null;
  }
  const minuteMatch = normalized.match(/(\d+(?:[.,]\d+)?)\s*(dk|dakika|min|minute|minutes)/);
  if (minuteMatch) {
    const parsed = Number.parseFloat(minuteMatch[1].replace(",", "."));
    return Number.isFinite(parsed) ? Math.round(parsed) : null;
  }
  if (normalized.includes("saat") || normalized.includes("hour")) {
    const parsed = parseNumberFromTokens(tokens);
    return parsed ? Math.round(parsed * 60) : null;
  }
  if (normalized.includes("dk") || normalized.includes("dakika") || normalized.includes("min")) {
    const parsed = parseNumberFromTokens(tokens);
    return parsed ? Math.round(parsed) : null;
  }
  return null;
}

function parseWaterAmount(segment: string, tokens: string[]) {
  const normalized = normalizeTextForMatch(segment);
  const literMatch = normalized.match(/(\d+(?:[.,]\d+)?)\s*(litre|lt|l)\b/);
  if (literMatch) {
    const parsed = Number.parseFloat(literMatch[1].replace(",", "."));
    return Number.isFinite(parsed) ? Math.round(parsed * 1000) : null;
  }
  const mlMatch = normalized.match(/(\d+(?:[.,]\d+)?)\s*(ml|mililitre)\b/);
  if (mlMatch) {
    const parsed = Number.parseFloat(mlMatch[1].replace(",", "."));
    return Number.isFinite(parsed) ? Math.round(parsed) : null;
  }
  if (normalized.includes("bardak") || normalized.includes("cup") || normalized.includes("glass")) {
    const parsed = parseNumberFromTokens(tokens) ?? 1;
    return Math.round(parsed * 200);
  }
  const parsed = parseNumberFromTokens(tokens);
  if (parsed) {
    return Math.round(parsed * 250);
  }
  return 250;
}

function parseFoodAmountG(segment: string) {
  const normalized = normalizeTextForMatch(segment);
  const gramMatch = normalized.match(/(\d+(?:[.,]\d+)?)\s*(gram|gr|g)\b/);
  if (gramMatch) {
    const parsed = Number.parseFloat(gramMatch[1].replace(",", "."));
    return Number.isFinite(parsed) ? Math.round(parsed) : undefined;
  }
  return undefined;
}

function extractFoodName(segment: string) {
  const tokens = tokenizeSegment(segment);
  const cleaned = tokens.filter((token) => {
    const normalized = normalizeTextForMatch(token);
    if (!normalized) {
      return false;
    }
    if (/^\d/.test(normalized)) {
      return false;
    }
    if (FOOD_STOPWORDS.has(normalized)) {
      return false;
    }
    if (MEAL_KEYWORDS.some((group) => group.keywords.some((keyword) => normalized.startsWith(keyword)))) {
      return false;
    }
    return true;
  });
  return cleaned.join(" ").trim();
}

function getSpeechRecognition() {
  if (typeof window === "undefined") {
    return null;
  }
  return (
    ((window as unknown as { SpeechRecognition?: SpeechRecognitionConstructor }).SpeechRecognition ??
      (window as unknown as { webkitSpeechRecognition?: SpeechRecognitionConstructor })
        .webkitSpeechRecognition) ||
    null
  );
}

export default function AddEntryPage() {
  const { addFood, addWater, addActivity, dataMode, measurements } = useTracker();
  const { user } = useUser();
  const [tab, setTab] = useState<TabKey>("food");
  const mealLabels: Record<MealType, string> = {
    breakfast: t("Kahvaltı"),
    lunch: t("Öğle"),
    dinner: t("Akşam"),
    snack: t("Atıştırmalık"),
  };
  const [profileWeightKg, setProfileWeightKg] = useState<number | null>(() => {
    const localProfile = loadProfile();
    const weight = Number(localProfile.weightKg);
    return Number.isFinite(weight) && weight > 0 ? weight : null;
  });

  const [foodName, setFoodName] = useState("");
  const [foodCalories, setFoodCalories] = useState("");
  const [mealType, setMealType] = useState<MealType>("lunch");
  const [foodAmount, setFoodAmount] = useState("100");
  const [foodImageUrl, setFoodImageUrl] = useState<string | null>(null);
  const [foodPer100, setFoodPer100] = useState<{
    kcal?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  } | null>(null);
  const [foodMacros, setFoodMacros] = useState<{
    proteinG?: number;
    carbsG?: number;
    fatG?: number;
  } | null>(null);

  const [searchResults, setSearchResults] = useState<OFFProduct[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedFromSearch, setSelectedFromSearch] = useState(false);
  const [barcodeInput, setBarcodeInput] = useState("");
  const [isBarcodeSearching, setIsBarcodeSearching] = useState(false);
  const [barcodeMessage, setBarcodeMessage] = useState<string | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [supportsBarcodeDetector, setSupportsBarcodeDetector] = useState(true);
  const [foodLibrary, setFoodLibrary] = useState<FoodLibraryItem[]>([]);
  const [libraryQuery, setLibraryQuery] = useState("");
  const [libraryMessage, setLibraryMessage] = useState<string | null>(null);
  const [libraryLoading, setLibraryLoading] = useState(false);
  const [libraryFavoritesOnly, setLibraryFavoritesOnly] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const skipSearchRef = useRef(false);
  const [voiceSupported, setVoiceSupported] = useState(true);
  const [voiceListening, setVoiceListening] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState("");
  const voiceTranscriptRef = useRef("");
  const [voiceMessage, setVoiceMessage] = useState<string | null>(null);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    if (!foodPer100) {
      setFoodMacros(null);
      return;
    }
    const grams = Number(foodAmount);
    if (!Number.isFinite(grams) || grams <= 0) {
      setFoodMacros(null);
      return;
    }
    const factor = grams / 100;
    const proteinG =
      typeof foodPer100.protein === "number"
        ? Math.round(foodPer100.protein * factor)
        : undefined;
    const carbsG =
      typeof foodPer100.carbs === "number"
        ? Math.round(foodPer100.carbs * factor)
        : undefined;
    const fatG =
      typeof foodPer100.fat === "number" ? Math.round(foodPer100.fat * factor) : undefined;
    const hasMacros =
      typeof proteinG === "number" || typeof carbsG === "number" || typeof fatG === "number";
    setFoodMacros(hasMacros ? { proteinG, carbsG, fatG } : null);
    const kcalPer100 =
      typeof foodPer100.kcal === "number"
        ? foodPer100.kcal
        : typeof foodPer100.protein === "number" ||
            typeof foodPer100.carbs === "number" ||
            typeof foodPer100.fat === "number"
          ? (foodPer100.protein ?? 0) * 4 +
            (foodPer100.carbs ?? 0) * 4 +
            (foodPer100.fat ?? 0) * 9
          : null;
    if (typeof kcalPer100 === "number") {
      setFoodCalories(String(Math.round(kcalPer100 * factor)));
    }
  }, [foodAmount, foodPer100]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (skipSearchRef.current) {
        skipSearchRef.current = false;
        return;
      }
      if (foodName.length > 2) {
        setIsSearching(true);
        try {
          const res = await fetch(`/api/v1/food-search?q=${encodeURIComponent(foodName)}`);
          const data = await res.json();
          setSearchResults(data);
        } catch (err) {
          console.error(err);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [foodName]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    setSupportsBarcodeDetector("BarcodeDetector" in window);
  }, []);

  useEffect(() => {
    setVoiceSupported(Boolean(getSpeechRecognition()));
    return () => {
      const recognition = recognitionRef.current;
      if (recognition) {
        recognition.onend = null;
        recognition.onerror = null;
        recognition.onresult = null;
        recognition.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (dataMode !== "remote" || !user?.sub) {
      const localProfile = loadProfile();
      const weight = Number(localProfile.weightKg);
      setProfileWeightKg(Number.isFinite(weight) && weight > 0 ? weight : null);
      return;
    }
    let active = true;
    fetch("/api/v1/profile", { credentials: "include", cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!active || !data) {
          return;
        }
        const weight = Number(data?.weightKg);
        setProfileWeightKg(Number.isFinite(weight) && weight > 0 ? weight : null);
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, [dataMode, user?.sub]);

  useEffect(() => {
    let active = true;
    const loadLibrary = async () => {
      setLibraryLoading(true);
      setLibraryMessage(null);
      try {
        if (dataMode === "remote") {
          const res = await fetch("/api/v1/food-library", {
            credentials: "include",
            cache: "no-store",
          });
          if (res.ok) {
            const data = (await res.json()) as FoodLibraryItem[];
            if (active) {
              setFoodLibrary(data.map((item) => normalizeFoodLibraryItem(item)));
            }
          }
        } else if (active) {
          setFoodLibrary(loadFoodLibrary());
        }
      } catch {
        if (active) {
          setLibraryMessage(t("Kütüphane yüklenemedi."));
        }
      } finally {
        if (active) {
          setLibraryLoading(false);
        }
      }
    };
    void loadLibrary();
    return () => {
      active = false;
    };
  }, [dataMode]);

  useEffect(() => {
    if (tab !== "food") {
      setScannerOpen(false);
    }
  }, [tab]);

  useEffect(() => {
    if (!scannerOpen) {
      setCameraActive(false);
      return;
    }
    if (typeof window === "undefined") {
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia) {
      setScanError(t("Kamera erişimi desteklenmiyor."));
      return;
    }
    setScanError(null);
    let active = true;
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        if (!active) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }
        streamRef.current = stream;
        const video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          video
            .play()
            .then(() => setCameraActive(true))
            .catch(() => undefined);
        }
      })
      .catch(() => {
        if (active) {
          setScanError(t("Kamera izni alınamadı."));
        }
      });
    return () => {
      active = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      setCameraActive(false);
    };
  }, [scannerOpen]);

  const applyLibraryItem = useCallback((item: FoodLibraryItem) => {
    skipSearchRef.current = true;
    setSearchResults([]);
    setFoodName(item.name);
    setFoodImageUrl(item.imageUrl ?? null);
    setSelectedFromSearch(true);
    setFoodPer100({
      kcal: item.caloriesPer100 || undefined,
      protein: item.proteinPer100,
      carbs: item.carbsPer100,
      fat: item.fatPer100,
    });
    setFoodAmount("100");
    if (item.caloriesPer100) {
      setFoodCalories(String(item.caloriesPer100));
    } else {
      setFoodCalories("");
    }
    if (item.barcode) {
      setBarcodeInput(item.barcode);
    }
  }, []);

  const persistLocalLibrary = useCallback((items: FoodLibraryItem[]) => {
    setFoodLibrary(items);
    saveFoodLibrary(items);
  }, []);

  const buildLibraryItemFromForm = useCallback(
    (favorite: boolean) => {
      const name = foodName.trim();
      if (!name) {
        setLibraryMessage(t("Kütüphane için ürün adı gerekli."));
        return null;
      }
      const amountValue = Number(foodAmount);
      const caloriesValue = Number(foodCalories);
      const caloriesPer100 =
        typeof foodPer100?.kcal === "number"
          ? Math.round(foodPer100.kcal)
          : amountValue > 0 && caloriesValue > 0
            ? Math.round((caloriesValue / amountValue) * 100)
            : 0;
      const factor = amountValue > 0 ? amountValue / 100 : null;
      const proteinPer100 =
        typeof foodPer100?.protein === "number"
          ? Math.round(foodPer100.protein)
          : factor && typeof foodMacros?.proteinG === "number"
            ? Math.round(foodMacros.proteinG / factor)
            : undefined;
      const carbsPer100 =
        typeof foodPer100?.carbs === "number"
          ? Math.round(foodPer100.carbs)
          : factor && typeof foodMacros?.carbsG === "number"
            ? Math.round(foodMacros.carbsG / factor)
            : undefined;
      const fatPer100 =
        typeof foodPer100?.fat === "number"
          ? Math.round(foodPer100.fat)
          : factor && typeof foodMacros?.fatG === "number"
            ? Math.round(foodMacros.fatG / factor)
            : undefined;
      const source: FoodLibrarySource = selectedFromSearch ? "off" : "manual";

      return {
        name,
        caloriesPer100,
        proteinPer100,
        carbsPer100,
        fatPer100,
        barcode: barcodeInput.trim() || undefined,
        imageUrl: foodImageUrl ?? undefined,
        source,
        favorite,
      };
    },
    [
      barcodeInput,
      foodAmount,
      foodCalories,
      foodImageUrl,
      foodMacros,
      foodName,
      foodPer100,
      selectedFromSearch,
    ]
  );

  const handleSaveLibrary = useCallback(
    async (favorite: boolean) => {
      const payload = buildLibraryItemFromForm(favorite);
      if (!payload) {
        return;
      }
      setLibraryMessage(null);
      if (dataMode === "remote") {
        try {
          const res = await fetch("/api/v1/food-library", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(payload),
          });
          if (res.ok) {
            const saved = (await res.json()) as FoodLibraryItem;
            setFoodLibrary((prev) => [
              normalizeFoodLibraryItem(saved),
              ...prev.filter((item) => item.id !== saved.id),
            ]);
            setLibraryMessage(t("Ürün kütüphaneye kaydedildi."));
            return;
          }
        } catch {
          // ignore
        }
        setLibraryMessage(t("Kütüphane kaydı başarısız."));
        return;
      }

      const now = new Date().toISOString();
      const item: FoodLibraryItem = {
        id: createId(),
        name: payload.name,
        caloriesPer100: payload.caloriesPer100,
        proteinPer100: payload.proteinPer100,
        carbsPer100: payload.carbsPer100,
        fatPer100: payload.fatPer100,
        barcode: payload.barcode,
        imageUrl: payload.imageUrl,
        source: payload.source,
        favorite: payload.favorite,
        createdAt: now,
        updatedAt: now,
      };
      persistLocalLibrary([item, ...foodLibrary]);
      setLibraryMessage(t("Ürün kütüphaneye kaydedildi."));
    },
    [buildLibraryItemFromForm, dataMode, foodLibrary, persistLocalLibrary]
  );

  const handleToggleFavorite = useCallback(
    async (item: FoodLibraryItem) => {
      const nextFavorite = !item.favorite;
      if (dataMode === "remote") {
        try {
          const res = await fetch(`/api/v1/food-library/${item.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ favorite: nextFavorite }),
          });
          if (res.ok) {
            const updated = (await res.json()) as FoodLibraryItem;
            setFoodLibrary((prev) =>
              prev.map((entry) =>
                entry.id === item.id ? normalizeFoodLibraryItem(updated) : entry
              )
            );
            return;
          }
        } catch {
          // ignore
        }
        setLibraryMessage(t("Favori güncellenemedi."));
        return;
      }
      const next = foodLibrary.map((entry) =>
        entry.id === item.id ? { ...entry, favorite: nextFavorite } : entry
      );
      persistLocalLibrary(next);
    },
    [dataMode, foodLibrary, persistLocalLibrary]
  );

  const handleRemoveLibraryItem = useCallback(
    async (item: FoodLibraryItem) => {
      if (dataMode === "remote") {
        try {
          const res = await fetch(`/api/v1/food-library/${item.id}`, {
            method: "DELETE",
            credentials: "include",
          });
          if (res.ok) {
            setFoodLibrary((prev) => prev.filter((entry) => entry.id !== item.id));
            return;
          }
        } catch {
          // ignore
        }
        setLibraryMessage(t("Ürün silinemedi."));
        return;
      }
      const next = foodLibrary.filter((entry) => entry.id !== item.id);
      persistLocalLibrary(next);
    },
    [dataMode, foodLibrary, persistLocalLibrary]
  );

  const handleBarcodeLookup = useCallback(
    async (rawCode: string) => {
      const code = rawCode.replace(/\D/g, "");
      if (!code) {
        setBarcodeMessage(t("Geçerli bir barkod girin."));
        return;
      }
      if (code !== rawCode) {
        setBarcodeInput(code);
      }
      const localMatch = foodLibrary.find((item) => item.barcode === code);
      if (localMatch) {
        applyLibraryItem(localMatch);
        setBarcodeMessage(t("Kütüphaneden bulundu: {name}", { name: localMatch.name }));
        return;
      }
      setBarcodeMessage(null);
      setIsBarcodeSearching(true);
      try {
        const res = await fetch(`/api/v1/food-search?barcode=${encodeURIComponent(code)}`);
        if (!res.ok) {
          setBarcodeMessage(t("Barkod bulunamadı."));
          setSearchResults([]);
          return;
        }
        const product = await res.json();
        if (!product || !product.product_name) {
          setBarcodeMessage(t("Barkod bulunamadı."));
          setSearchResults([]);
          return;
        }
        skipSearchRef.current = true;
        setSearchResults([]);
        setFoodName(product.product_name);
        setFoodImageUrl(product.image_url ?? null);
        setSelectedFromSearch(true);
        setFoodPer100({
          kcal: product.nutriments?.["energy-kcal_100g"],
          protein: product.nutriments?.proteins_100g,
          carbs: product.nutriments?.carbohydrates_100g,
          fat: product.nutriments?.fat_100g,
        });
        if (typeof product.serving_size_g === "number" && product.serving_size_g > 0) {
          setFoodAmount(String(Math.round(product.serving_size_g)));
        }
        const kcal = product.nutriments?.["energy-kcal_100g"];
        if (typeof kcal === "number") {
          setFoodCalories(String(Math.round(kcal)));
        } else {
          setFoodCalories("");
        }
        setBarcodeMessage(t("Bulunan ürün: {name}", { name: product.product_name }));
      } catch {
        setBarcodeMessage(t("Barkod aranamadı."));
      } finally {
        setIsBarcodeSearching(false);
      }
    },
    [applyLibraryItem, foodLibrary, setFoodCalories, setFoodName, setSearchResults]
  );

  useEffect(() => {
    if (!scannerOpen || !supportsBarcodeDetector) {
      return;
    }
    if (typeof window === "undefined") {
      return;
    }
    const Detector = (window as unknown as { BarcodeDetector?: BarcodeDetectorConstructor })
      .BarcodeDetector;
    if (!Detector) {
      return;
    }
    let cancelled = false;
    let isDetecting = false;
    const detector = new Detector({
      formats: ["ean_13", "ean_8", "upc_a", "upc_e", "code_128", "code_39", "qr_code"],
    });
    const interval = window.setInterval(async () => {
      if (cancelled || isDetecting) {
        return;
      }
      const video = videoRef.current;
      if (!video || video.readyState < 2) {
        return;
      }
      isDetecting = true;
      try {
        const barcodes = await detector.detect(video);
        const value = barcodes?.[0]?.rawValue;
        if (value) {
          setBarcodeInput(value);
          setScannerOpen(false);
          await handleBarcodeLookup(value);
        }
      } catch {
        // ignore detector errors
      } finally {
        isDetecting = false;
      }
    }, 700);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [handleBarcodeLookup, scannerOpen, supportsBarcodeDetector]);

  const filteredLibrary = useMemo(() => {
    const query = libraryQuery.trim().toLowerCase();
    return foodLibrary
      .filter((item) => (libraryFavoritesOnly ? item.favorite : true))
      .filter((item) => {
        if (!query) return true;
        return (
          item.name.toLowerCase().includes(query) ||
          (item.barcode ? item.barcode.includes(query) : false)
        );
      })
      .sort((a, b) => {
        if (a.favorite !== b.favorite) {
          return a.favorite ? -1 : 1;
        }
        return a.name.localeCompare(b.name, "tr-TR");
      });
  }, [foodLibrary, libraryFavoritesOnly, libraryQuery]);

  const [waterAmount, setWaterAmount] = useState("250");

  const latestWeight = useMemo(() => {
    const weights = measurements
      .filter((entry) => entry.type === "weight")
      .sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    return weights[0]?.value ?? null;
  }, [measurements]);
  const weightForCalc = latestWeight ?? profileWeightKg ?? null;

  const [activityType, setActivityType] = useState<ActivityType>("walking");
  const [activityDuration, setActivityDuration] = useState("30");
  const [activityCalories, setActivityCalories] = useState("150");
  const [activityAuto, setActivityAuto] = useState(true);
  const [activityIntensity, setActivityIntensity] = useState<"low" | "medium" | "high">("medium");
  const [activityNote, setActivityNote] = useState("");

  const findLibraryMatch = useCallback(
    (name: string) => {
      const normalizedName = normalizeTextForMatch(name);
      if (!normalizedName) {
        return null;
      }
      let best: FoodLibraryItem | null = null;
      for (const item of foodLibrary) {
        const normalizedItem = normalizeTextForMatch(item.name);
        if (!normalizedItem) {
          continue;
        }
        if (normalizedItem === normalizedName) {
          return item;
        }
        if (normalizedItem.includes(normalizedName) || normalizedName.includes(normalizedItem)) {
          if (!best || normalizedItem.length > normalizeTextForMatch(best.name).length) {
            best = item;
          }
        }
      }
      return best;
    },
    [foodLibrary]
  );

  const parseVoiceTranscript = useCallback(
    (transcript: string) => {
      const normalizedTranscript = normalizeTextForMatch(transcript);
      const segments = splitVoiceSegments(transcript);
      const hasFoodVerb = FOOD_VERBS.some((verb) => normalizedTranscript.includes(verb));
      const entries: VoiceParsedEntry[] = [];

      for (const segment of segments) {
        const normalized = normalizeTextForMatch(segment);
        if (!normalized) {
          continue;
        }
        const tokens = tokenizeSegment(segment).map((token) => normalizeTextForMatch(token));
        const hasWaterKeyword = WATER_KEYWORDS.some((keyword) => tokens.includes(keyword));

        if (hasWaterKeyword) {
          const amountMl = parseWaterAmount(segment, tokens);
          if (amountMl) {
            entries.push({ kind: "water", data: { amountMl } });
          }
          continue;
        }

        const activityType = resolveActivityType(segment);
        if (activityType) {
          const duration =
            (parseDurationFromSegment(segment, tokens) ?? Number(activityDuration)) || 30;
          const estimatedCalories = estimateActivityCalories({
            type: activityType,
            durationMin: duration,
            weightKg: weightForCalc,
            intensity: activityIntensity,
          });
          entries.push({
            kind: "activity",
            data: {
              activityType,
              durationMin: duration,
              estimatedCalories: Number.isFinite(estimatedCalories)
                ? Math.round(estimatedCalories)
                : 0,
            },
          });
          continue;
        }

        const segmentHasFoodVerb = FOOD_VERBS.some((verb) => normalized.includes(verb));
        const segmentMealType = resolveMealTypeFromSegment(segment);
        if (!hasFoodVerb && !segmentHasFoodVerb && !segmentMealType) {
          continue;
        }

        const name = extractFoodName(segment);
        if (!name) {
          continue;
        }
        const libraryMatch = findLibraryMatch(name);
        const amountG = parseFoodAmountG(segment);
        const resolvedAmountG = libraryMatch ? amountG ?? 100 : amountG;
        const factor = resolvedAmountG ? resolvedAmountG / 100 : 1;
        const calories = libraryMatch
          ? Math.round((libraryMatch.caloriesPer100 || 0) * factor)
          : 0;
        const proteinG =
          libraryMatch && typeof libraryMatch.proteinPer100 === "number"
            ? Math.round(libraryMatch.proteinPer100 * factor)
            : undefined;
        const carbsG =
          libraryMatch && typeof libraryMatch.carbsPer100 === "number"
            ? Math.round(libraryMatch.carbsPer100 * factor)
            : undefined;
        const fatG =
          libraryMatch && typeof libraryMatch.fatPer100 === "number"
            ? Math.round(libraryMatch.fatPer100 * factor)
            : undefined;

        entries.push({
          kind: "food",
          data: {
            name,
            calories,
            mealType: segmentMealType ?? mealType,
            amountG: resolvedAmountG,
            proteinG,
            carbsG,
            fatG,
          },
          missingCalories: calories === 0,
        });
      }

      return entries;
    },
    [
      activityDuration,
      activityIntensity,
      findLibraryMatch,
      mealType,
      weightForCalc,
    ]
  );

  const handleVoiceTranscript = useCallback(
    async (transcript: string) => {
      const entries = parseVoiceTranscript(transcript);
      if (entries.length === 0) {
        setVoiceMessage(null);
        setVoiceError(t("Sesli giriş anlaşılamadı."));
        return;
      }
      let addedCount = 0;
      let missingCaloriesCount = 0;
      for (const entry of entries) {
        if (entry.kind === "food") {
          await addFood(entry.data);
          if (entry.missingCalories) {
            missingCaloriesCount += 1;
          }
          addedCount += 1;
        } else if (entry.kind === "water") {
          await addWater(entry.data);
          addedCount += 1;
        } else if (entry.kind === "activity") {
          await addActivity(entry.data);
          addedCount += 1;
        }
      }
      let message = t("Sesli giriş: {count} kayıt eklendi.", { count: addedCount });
      if (missingCaloriesCount > 0) {
        message = `${message} ${t("{count} öğünde kalori bulunamadı.", {
          count: missingCaloriesCount,
        })}`;
      }
      setVoiceError(null);
      setVoiceMessage(message);
    },
    [addActivity, addFood, addWater, parseVoiceTranscript]
  );

  const startVoiceEntry = useCallback(() => {
    if (voiceListening) {
      return;
    }
    const Recognition = getSpeechRecognition();
    if (!Recognition) {
      setVoiceSupported(false);
      setVoiceMessage(null);
      setVoiceError(t("Sesli giriş desteklenmiyor."));
      return;
    }
    let hadError = false;
    const recognition = new Recognition();
    recognition.lang = getIntlLocale();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0]?.transcript ?? "")
        .join(" ")
        .trim();
      voiceTranscriptRef.current = transcript;
      setVoiceTranscript(transcript);
    };
    recognition.onerror = () => {
      hadError = true;
      setVoiceListening(false);
      setVoiceMessage(null);
      setVoiceError(t("Ses tanıma hatası oluştu."));
    };
    recognition.onend = () => {
      setVoiceListening(false);
      if (hadError) {
        return;
      }
      const transcript = voiceTranscriptRef.current.trim();
      if (!transcript) {
        setVoiceMessage(null);
        setVoiceError(t("Sesli giriş anlaşılamadı."));
        return;
      }
      void handleVoiceTranscript(transcript);
    };
    recognitionRef.current = recognition;
    voiceTranscriptRef.current = "";
    setVoiceTranscript("");
    setVoiceMessage(null);
    setVoiceError(null);
    setVoiceListening(true);
    try {
      recognition.start();
    } catch {
      setVoiceListening(false);
      setVoiceError(t("Mikrofon izni alınamadı."));
    }
  }, [handleVoiceTranscript, voiceListening]);

  const stopVoiceEntry = useCallback(() => {
    recognitionRef.current?.stop();
  }, []);

  useEffect(() => {
    if (!activityAuto) {
      return;
    }
    const durationMin = Number(activityDuration);
    const calculated = estimateActivityCalories({
      type: activityType,
      durationMin,
      weightKg: weightForCalc,
      intensity: activityIntensity,
    });
    if (!Number.isFinite(calculated) || calculated <= 0) {
      setActivityCalories("");
      return;
    }
    setActivityCalories(String(calculated));
  }, [activityAuto, activityDuration, activityIntensity, activityType, weightForCalc]);

  return (
    <div className="space-y-6">
      <Card className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold">{t("Sesli giriş")}</p>
            <p className="text-xs text-muted">{t("Bir elma yedim ve 2 bardak su içtim.")}</p>
          </div>
          <button
            type="button"
            onClick={voiceListening ? stopVoiceEntry : startVoiceEntry}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition ${
              voiceListening
                ? "bg-emerald-600 text-white"
                : "border border-emerald-100 bg-white text-emerald-700 hover:border-emerald-200"
            }`}
            disabled={!voiceSupported}
          >
            {voiceListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            {voiceListening ? t("Durdur") : t("Konuş")}
          </button>
        </div>
        <div
          className={`rounded-xl border px-3 py-2 text-xs ${
            voiceListening
              ? "border-emerald-200 bg-emerald-50/60"
              : "border-emerald-100 bg-white"
          }`}
        >
          {voiceTranscript ? (
            <p className="text-ink">{voiceTranscript}</p>
          ) : (
            <p className="text-muted">
              {voiceListening ? t("Dinleniyor...") : t("Söylediğin cümle burada görünecek.")}
            </p>
          )}
        </div>
        {!voiceSupported && (
          <p className="text-[11px] text-muted">{t("Sesli giriş desteklenmiyor.")}</p>
        )}
        {voiceError && <p className="text-[11px] text-red-600">{voiceError}</p>}
        {voiceMessage && <p className="text-[11px] text-muted">{voiceMessage}</p>}
      </Card>

      <div className="flex flex-wrap gap-2">
        {(
          [
            { key: "food", label: t("Yemek") },
            { key: "water", label: t("Su") },
            { key: "activity", label: t("Aktivite") },
          ] as const
        ).map((item) => (
          <button
            key={item.key}
            onClick={() => setTab(item.key)}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
              tab === item.key
                ? "bg-accent text-white"
                : "border border-emerald-100 bg-white text-muted"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === "food" && (
        <div className="space-y-6">
          <Card className="space-y-4">
            <div>
              <p className="text-sm font-semibold">{t("Yemek Girişi")}</p>
              <div className="flex items-center gap-2 text-xs text-muted">
                <span>{t("Manuel kalori girişi")}</span>
                <Tooltip label={t("Ürün araması için en az 3 harf yazın.")}>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border border-emerald-200 text-[10px] text-emerald-700">
                    ?
                  </span>
                </Tooltip>
              </div>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-white p-3 space-y-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold text-ink">{t("Barkod ile bul")}</p>
                  <p className="text-[11px] text-muted">{t("Kamera veya barkod numarası")}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setScannerOpen((prev) => !prev)}
                  className="rounded-full border border-emerald-100 bg-white px-3 py-1 text-[11px] font-semibold text-emerald-700 hover:border-emerald-200"
                  disabled={!supportsBarcodeDetector}
                >
                  {scannerOpen ? t("Kamerayı kapat") : t("Barkod tara")}
                </button>
              </div>
              {!supportsBarcodeDetector && (
                <p className="text-[11px] text-muted">
                  {t("Tarayıcı barkod taramayı desteklemiyor.")}
                </p>
              )}
              {scanError && <p className="text-[11px] text-red-600">{scanError}</p>}
              {scannerOpen && (
                <div className="space-y-2">
                  <div className="overflow-hidden rounded-xl border border-emerald-100 bg-black">
                    <video
                      ref={videoRef}
                      className="h-40 w-full object-cover sm:h-44"
                      playsInline
                      muted
                  />
                </div>
                <p className="text-[11px] text-muted">
                  {cameraActive ? t("Barkodu kadraja alın.") : t("Kamera açılıyor...")}
                </p>
              </div>
            )}
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                value={barcodeInput}
                onChange={(event) => setBarcodeInput(event.target.value.replace(/\D/g, ""))}
                className="w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-200"
                placeholder={t("Barkod numarası")}
                inputMode="numeric"
              />
              <button
                onClick={() => handleBarcodeLookup(barcodeInput)}
                className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
                disabled={isBarcodeSearching || !barcodeInput.trim()}
              >
                {isBarcodeSearching ? t("Aranıyor...") : t("Ara")}
              </button>
            </div>
            {barcodeMessage && <p className="text-[11px] text-muted">{barcodeMessage}</p>}
          </div>
          <input
              value={foodName}
              onChange={(event) => {
                setFoodName(event.target.value);
                setSelectedFromSearch(false);
                setFoodPer100(null);
                setFoodImageUrl(null);
            }}
            className="w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
            placeholder={t("Ürün Ara veya Manuel Gir...")}
          />

          {isSearching && (
            <p className="text-[10px] text-muted animate-pulse">{t("Aranıyor...")}</p>
          )}

            {searchResults.length > 0 && (
              <div className="max-h-40 overflow-y-auto rounded-xl border border-emerald-50 bg-emerald-50/30 p-1 space-y-1">
                {searchResults.map((product) => (
                  <button
                    key={product.code}
                    onClick={() => {
                      skipSearchRef.current = true;
                      setFoodName(product.product_name);
                      setFoodImageUrl(product.image_url ?? null);
                      setSelectedFromSearch(true);
                      setFoodPer100({
                        kcal: product.nutriments?.["energy-kcal_100g"],
                        protein: product.nutriments?.proteins_100g,
                        carbs: product.nutriments?.carbohydrates_100g,
                        fat: product.nutriments?.fat_100g,
                      });
                      if (
                        typeof product.serving_size_g === "number" &&
                        product.serving_size_g > 0
                      ) {
                        setFoodAmount(String(Math.round(product.serving_size_g)));
                      }
                      const kcal = product.nutriments["energy-kcal_100g"];
                      if (typeof kcal === "number") setFoodCalories(String(Math.round(kcal)));
                      setSearchResults([]);
                    }}
                    className="flex w-full items-center gap-3 rounded-lg bg-white p-2 text-left text-xs transition hover:bg-emerald-100/50"
                  >
                    {product.image_url && (
                      <Image
                        src={product.image_url}
                        alt=""
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded object-cover"
                        unoptimized
                      />
                    )}
                    <div className="flex-1 overflow-hidden">
                      <p className="truncate font-semibold text-emerald-900">{product.product_name}</p>
                      <p className="text-[10px] text-muted">
                        {t("{value} kcal / 100g", {
                          value: product.nutriments["energy-kcal_100g"] ?? "?",
                        })}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          {foodName.length > 2 &&
            !isSearching &&
            searchResults.length === 0 &&
            !selectedFromSearch && (
            <div className="rounded-xl border border-dashed border-emerald-100 bg-emerald-50/50 px-3 py-3 text-xs text-muted">
              {t("Sonuç bulunamadı. Manuel kalori girişi yapabilirsiniz.")}
            </div>
          )}
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              value={foodCalories}
              onChange={(event) => setFoodCalories(event.target.value)}
              className="w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
              placeholder={t("Kalori")}
              type="number"
              min="0"
            />
              <select
                value={mealType}
                onChange={(event) => setMealType(event.target.value as MealType)}
                className="w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
              >
                {Object.entries(mealLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          <div className="grid gap-3 sm:grid-cols-[1fr_1.5fr]">
            <input
              value={foodAmount}
              onChange={(event) => setFoodAmount(event.target.value)}
              className="w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
              placeholder={t("Miktar (g)")}
              type="number"
              min="0"
            />
            <div className="flex flex-col justify-center rounded-xl border border-emerald-100 bg-white px-3 py-2 text-xs text-muted">
              <span className="text-[11px] uppercase tracking-[0.2em]">
                {t("Makrolar (g)")}
              </span>
              <div className="mt-1 flex flex-wrap gap-2 text-xs font-semibold text-ink">
                <span>{t("P")}: {foodMacros?.proteinG ?? "-"}</span>
                <span>{t("K")}: {foodMacros?.carbsG ?? "-"}</span>
                <span>{t("Y")}: {foodMacros?.fatG ?? "-"}</span>
              </div>
            </div>
          </div>
            <button
              onClick={() => {
                if (!foodCalories) return;
                const amountValue = Number(foodAmount);
                const amountG =
                  Number.isFinite(amountValue) && amountValue > 0
                    ? Math.round(amountValue)
                    : undefined;
                addFood({
                  name: foodName || t("Belirtilmedi"),
                  calories: Number(foodCalories),
                  mealType,
                  amountG,
                  proteinG: foodMacros?.proteinG,
                  carbsG: foodMacros?.carbsG,
                  fatG: foodMacros?.fatG,
                });
                setFoodName("");
                setFoodCalories("");
                setSelectedFromSearch(false);
                setFoodPer100(null);
                setFoodMacros(null);
                setFoodAmount("100");
                setFoodImageUrl(null);
                setBarcodeInput("");
              }}
              className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-strong"
            >
              {t("Kaydet")}
            </button>
          </Card>

          <Card className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-sm font-semibold">{t("Ürün Kütüphanesi")}</p>
                <p className="text-xs text-muted">{t("Manuel ürünler ve favoriler")}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleSaveLibrary(false)}
                  className="rounded-full border border-emerald-100 bg-white px-3 py-1 text-[11px] font-semibold text-emerald-700 hover:border-emerald-200 disabled:opacity-60"
                  disabled={!foodName.trim()}
                >
                  {t("Kütüphaneye kaydet")}
                </button>
                <button
                  onClick={() => handleSaveLibrary(true)}
                  className="rounded-full bg-emerald-600 px-3 py-1 text-[11px] font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
                  disabled={!foodName.trim()}
                >
                  {t("Favoriye kaydet")}
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                value={libraryQuery}
                onChange={(event) => setLibraryQuery(event.target.value)}
                className="w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-xs"
                placeholder={t("Kütüphanede ara")}
              />
              <button
                onClick={() => setLibraryFavoritesOnly((prev) => !prev)}
                className="rounded-xl border border-emerald-100 bg-white px-3 py-2 text-[11px] font-semibold text-emerald-700"
              >
                {libraryFavoritesOnly ? t("Tüm ürünler") : t("Sadece favoriler")}
              </button>
            </div>
            {libraryMessage && <p className="text-[11px] text-muted">{libraryMessage}</p>}
            {libraryLoading ? (
              <p className="text-[11px] text-muted">{t("Kütüphane yükleniyor...")}</p>
            ) : filteredLibrary.length === 0 ? (
              <p className="text-[11px] text-muted">{t("Henüz kayıtlı ürün yok.")}</p>
            ) : (
              <div className="space-y-2">
                {filteredLibrary.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-wrap items-center gap-3 rounded-xl border border-emerald-100 bg-white px-3 py-2 text-xs"
                  >
                    {item.imageUrl && (
                      <Image
                        src={item.imageUrl}
                        alt=""
                        width={36}
                        height={36}
                        className="h-9 w-9 rounded object-cover"
                        unoptimized
                      />
                    )}
                    <div className="min-w-[120px] flex-1">
                      <p className="truncate font-semibold text-ink">{item.name}</p>
                      <p className="text-[10px] text-muted">
                        {t("{value} kcal / 100g", {
                          value: item.caloriesPer100 || "?",
                        })}
                        {item.barcode ? ` • ${item.barcode}` : ""}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => applyLibraryItem(item)}
                        className="rounded-full border border-emerald-100 bg-white px-3 py-1 text-[11px] font-semibold text-emerald-700"
                      >
                        {t("Kullan")}
                      </button>
                      <button
                        onClick={() => handleToggleFavorite(item)}
                        className="rounded-full border border-emerald-100 bg-white px-3 py-1 text-[11px] font-semibold text-emerald-700"
                      >
                        {item.favorite ? t("Favori") : t("Favori yap")}
                      </button>
                      <button
                        onClick={() => handleRemoveLibraryItem(item)}
                        className="rounded-full border border-emerald-100 bg-white px-3 py-1 text-[11px] font-semibold text-emerald-700"
                      >
                        {t("Sil")}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      )}

      {tab === "water" && (
        <Card className="space-y-4">
          <div>
            <p className="text-sm font-semibold">{t("Su Girişi")}</p>
            <p className="text-xs text-muted">{t("Preset veya özel miktar")}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[200, 500, 1000].map((amount) => (
              <button
                key={amount}
                onClick={() => {
                  addWater({ amountMl: amount });
                  setWaterAmount(String(amount));
                }}
                className="rounded-full border border-emerald-100 bg-white px-4 py-2 text-xs font-semibold text-emerald-700"
              >
                {t("+{value}", { value: amount === 1000 ? "1L" : `${amount}ml` })}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={waterAmount}
              onChange={(event) => setWaterAmount(event.target.value)}
              className="w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
              placeholder={t("Miktar (ml)")}
              type="number"
              min="0"
            />
            <button
              onClick={() => addWater({ amountMl: Number(waterAmount) })}
              className="w-full rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-strong sm:w-auto"
            >
              {t("Ekle")}
            </button>
          </div>
        </Card>
      )}

      {tab === "activity" && (
        <Card className="space-y-4">
          <div>
            <p className="text-sm font-semibold">{t("Aktivite Girişi")}</p>
            <p className="text-xs text-muted">{t("Kalori değeri tahminidir")}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <select
              value={activityType}
              onChange={(event) => setActivityType(event.target.value as ActivityType)}
              className="w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
            >
              {activityOptions.map((option) => (
                <option key={option.type} value={option.type}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              value={activityIntensity}
              onChange={(event) =>
                setActivityIntensity(event.target.value as "low" | "medium" | "high")
              }
              className="w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
            >
              <option value="low">{t("Düşük Yoğunluk")}</option>
              <option value="medium">{t("Orta Yoğunluk")}</option>
              <option value="high">{t("Yüksek Yoğunluk")}</option>
            </select>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              value={activityDuration}
              onChange={(event) => setActivityDuration(event.target.value)}
              className="w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
              placeholder={t("Süre (dk)")}
              type="number"
              min="0"
            />
            <input
              value={activityCalories}
              onChange={(event) => {
                setActivityCalories(event.target.value);
                setActivityAuto(false);
              }}
              className="w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
              placeholder={t("Tahmini kalori")}
              type="number"
              min="0"
            />
          </div>
          <input
            value={activityNote}
            onChange={(event) => setActivityNote(event.target.value)}
            className="w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
            placeholder={t("Not (opsiyonel)")}
            maxLength={120}
          />
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted">
            <span>
              {t("MET hesabı: {weight}", {
                weight:
                  weightForCalc !== null
                    ? t("{value} kg", { value: Math.round(weightForCalc) })
                    : t("varsayılan"),
              })}
            </span>
            <button
              type="button"
              onClick={() => {
                setActivityAuto(true);
                const calculated = estimateActivityCalories({
                  type: activityType,
                  durationMin: Number(activityDuration),
                  weightKg: weightForCalc,
                  intensity: activityIntensity,
                });
                if (calculated > 0) {
                  setActivityCalories(String(calculated));
                }
              }}
              className="rounded-full border border-emerald-100 bg-white px-3 py-1 text-[11px] font-semibold text-emerald-700"
            >
              {t("Oto hesapla")}
            </button>
            {!activityAuto && (
              <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] text-emerald-700">
                {t("Manuel")}
              </span>
            )}
          </div>
          <button
            onClick={() => {
              if (!activityDuration) return;
              addActivity({
                activityType,
                durationMin: Number(activityDuration),
                estimatedCalories: Number(activityCalories),
                note: activityNote.trim() || undefined,
              });
              setActivityNote("");
            }}
            className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-strong"
          >
            {t("Kaydet")}
          </button>
        </Card>
      )}
    </div>
  );
}
