"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Card } from "@/components/card";
import { Tooltip } from "@/components/tooltip";
import { useTracker } from "@/components/tracker-provider";
import { ActivityType, MealType } from "@/lib/types";
import { OFFProduct } from "@/lib/off";
import {
  FoodLibraryItem,
  loadFoodLibrary,
  normalizeFoodLibraryItem,
  saveFoodLibrary,
} from "@/lib/food-library";
import { createId } from "@/lib/utils";

const mealLabels: Record<MealType, string> = {
  breakfast: "Kahvaltı",
  lunch: "Öğle",
  dinner: "Akşam",
  snack: "Atıştırmalık",
};

const activityLabels: Record<ActivityType, string> = {
  walking: "Yürümek",
  running: "Koşu",
  gym: "Salon",
};

type TabKey = "food" | "water" | "activity";

type BarcodeDetectorConstructor = new (options?: { formats?: string[] }) => {
  detect: (
    image: HTMLVideoElement | HTMLCanvasElement | HTMLImageElement | ImageBitmap
  ) => Promise<Array<{ rawValue: string }>>;
};

export default function AddEntryPage() {
  const { addFood, addWater, addActivity, dataMode } = useTracker();
  const [tab, setTab] = useState<TabKey>("food");

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
          setLibraryMessage("Kütüphane yüklenemedi.");
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
      setScanError("Kamera erişimi desteklenmiyor.");
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
          setScanError("Kamera izni alınamadı.");
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
        setLibraryMessage("Kütüphane için ürün adı gerekli.");
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

      return {
        name,
        caloriesPer100,
        proteinPer100,
        carbsPer100,
        fatPer100,
        barcode: barcodeInput.trim() || undefined,
        imageUrl: foodImageUrl ?? undefined,
        source: selectedFromSearch ? "off" : "manual",
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
            setLibraryMessage("Ürün kütüphaneye kaydedildi.");
            return;
          }
        } catch {
          // ignore
        }
        setLibraryMessage("Kütüphane kaydı başarısız.");
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
      setLibraryMessage("Ürün kütüphaneye kaydedildi.");
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
        setLibraryMessage("Favori güncellenemedi.");
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
        setLibraryMessage("Ürün silinemedi.");
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
        setBarcodeMessage("Geçerli bir barkod girin.");
        return;
      }
      if (code !== rawCode) {
        setBarcodeInput(code);
      }
      const localMatch = foodLibrary.find((item) => item.barcode === code);
      if (localMatch) {
        applyLibraryItem(localMatch);
        setBarcodeMessage(`Kütüphaneden bulundu: ${localMatch.name}`);
        return;
      }
      setBarcodeMessage(null);
      setIsBarcodeSearching(true);
      try {
        const res = await fetch(`/api/v1/food-search?barcode=${encodeURIComponent(code)}`);
        if (!res.ok) {
          setBarcodeMessage("Barkod bulunamadı.");
          setSearchResults([]);
          return;
        }
        const product = await res.json();
        if (!product || !product.product_name) {
          setBarcodeMessage("Barkod bulunamadı.");
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
        const kcal = product.nutriments?.["energy-kcal_100g"];
        if (typeof kcal === "number") {
          setFoodCalories(String(Math.round(kcal)));
        } else {
          setFoodCalories("");
        }
        setBarcodeMessage(`Bulunan ürün: ${product.product_name}`);
      } catch {
        setBarcodeMessage("Barkod aranamadı.");
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

  const [activityType, setActivityType] = useState<ActivityType>("walking");
  const [activityDuration, setActivityDuration] = useState("30");
  const [activityCalories, setActivityCalories] = useState("150");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {(
          [
            { key: "food", label: "Yemek" },
            { key: "water", label: "Su" },
            { key: "activity", label: "Aktivite" },
          ] as const
        ).map((item) => (
          <button
            key={item.key}
            onClick={() => setTab(item.key)}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
              tab === item.key
                ? "bg-accent text-white"
                : "border border-amber-100 bg-white text-muted"
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
              <p className="text-sm font-semibold">Yemek Girişi</p>
              <div className="flex items-center gap-2 text-xs text-muted">
                <span>Manuel kalori girişi</span>
                <Tooltip label="Ürün araması için en az 3 harf yazın.">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border border-amber-200 text-[10px] text-amber-700">
                    ?
                  </span>
                </Tooltip>
              </div>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-white p-3 space-y-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold text-ink">Barkod ile bul</p>
                  <p className="text-[11px] text-muted">Kamera veya barkod numarası</p>
                </div>
                <button
                  type="button"
                  onClick={() => setScannerOpen((prev) => !prev)}
                  className="rounded-full border border-amber-100 bg-white px-3 py-1 text-[11px] font-semibold text-amber-700 hover:border-amber-200"
                  disabled={!supportsBarcodeDetector}
                >
                  {scannerOpen ? "Kamerayı kapat" : "Barkod tara"}
                </button>
              </div>
              {!supportsBarcodeDetector && (
                <p className="text-[11px] text-muted">
                  Tarayıcı barkod taramayı desteklemiyor.
                </p>
              )}
              {scanError && <p className="text-[11px] text-red-600">{scanError}</p>}
              {scannerOpen && (
                <div className="space-y-2">
                  <div className="overflow-hidden rounded-xl border border-amber-100 bg-black">
                    <video
                      ref={videoRef}
                      className="h-40 w-full object-cover sm:h-44"
                      playsInline
                      muted
                    />
                  </div>
                  <p className="text-[11px] text-muted">
                    {cameraActive ? "Barkodu kadraja alın." : "Kamera açılıyor..."}
                  </p>
                </div>
              )}
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  value={barcodeInput}
                  onChange={(event) => setBarcodeInput(event.target.value.replace(/\D/g, ""))}
                  className="w-full rounded-xl border border-amber-100 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-200"
                  placeholder="Barkod numarası"
                  inputMode="numeric"
                />
                <button
                  onClick={() => handleBarcodeLookup(barcodeInput)}
                  className="rounded-xl bg-amber-600 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-700 disabled:opacity-60"
                  disabled={isBarcodeSearching || !barcodeInput.trim()}
                >
                  {isBarcodeSearching ? "Aranıyor..." : "Ara"}
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
              className="w-full rounded-xl border border-amber-100 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-200"
              placeholder="Ürün Ara veya Manuel Gir..."
            />

            {isSearching && <p className="text-[10px] text-muted animate-pulse">Aranıyor...</p>}

            {searchResults.length > 0 && (
              <div className="max-h-40 overflow-y-auto rounded-xl border border-amber-50 bg-amber-50/30 p-1 space-y-1">
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
                      const kcal = product.nutriments["energy-kcal_100g"];
                      if (typeof kcal === "number") setFoodCalories(String(Math.round(kcal)));
                      setSearchResults([]);
                    }}
                    className="flex w-full items-center gap-3 rounded-lg bg-white p-2 text-left text-xs transition hover:bg-amber-100/50"
                  >
                    {product.image_url && (
                      <img src={product.image_url} alt="" className="h-8 w-8 rounded object-cover" />
                    )}
                    <div className="flex-1 overflow-hidden">
                      <p className="truncate font-semibold text-amber-900">{product.product_name}</p>
                      <p className="text-[10px] text-muted">
                        {product.nutriments["energy-kcal_100g"] ?? "?"} kcal / 100g
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
              <div className="rounded-xl border border-dashed border-amber-100 bg-amber-50/50 px-3 py-3 text-xs text-muted">
                Sonuç bulunamadı. Manuel kalori girişi yapabilirsiniz.
              </div>
            )}
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                value={foodCalories}
                onChange={(event) => setFoodCalories(event.target.value)}
                className="w-full rounded-xl border border-amber-100 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-200"
                placeholder="Kalori"
                type="number"
                min="0"
              />
              <select
                value={mealType}
                onChange={(event) => setMealType(event.target.value as MealType)}
                className="w-full rounded-xl border border-amber-100 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-200"
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
                className="w-full rounded-xl border border-amber-100 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-200"
                placeholder="Miktar (g)"
                type="number"
                min="0"
              />
              <div className="flex flex-col justify-center rounded-xl border border-amber-100 bg-white px-3 py-2 text-xs text-muted">
                <span className="text-[11px] uppercase tracking-[0.2em]">Makrolar (g)</span>
                <div className="mt-1 flex flex-wrap gap-2 text-xs font-semibold text-ink">
                  <span>P: {foodMacros?.proteinG ?? "-"}</span>
                  <span>K: {foodMacros?.carbsG ?? "-"}</span>
                  <span>Y: {foodMacros?.fatG ?? "-"}</span>
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
                  name: foodName || "Belirtilmedi",
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
              Kaydet
            </button>
          </Card>

          <Card className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-sm font-semibold">Ürün Kütüphanesi</p>
                <p className="text-xs text-muted">Manuel ürünler ve favoriler</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleSaveLibrary(false)}
                  className="rounded-full border border-amber-100 bg-white px-3 py-1 text-[11px] font-semibold text-amber-700 hover:border-amber-200 disabled:opacity-60"
                  disabled={!foodName.trim()}
                >
                  Kütüphaneye kaydet
                </button>
                <button
                  onClick={() => handleSaveLibrary(true)}
                  className="rounded-full bg-amber-600 px-3 py-1 text-[11px] font-semibold text-white hover:bg-amber-700 disabled:opacity-60"
                  disabled={!foodName.trim()}
                >
                  Favoriye kaydet
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                value={libraryQuery}
                onChange={(event) => setLibraryQuery(event.target.value)}
                className="w-full rounded-xl border border-amber-100 bg-white px-3 py-2 text-xs"
                placeholder="Kütüphanede ara"
              />
              <button
                onClick={() => setLibraryFavoritesOnly((prev) => !prev)}
                className="rounded-xl border border-amber-100 bg-white px-3 py-2 text-[11px] font-semibold text-amber-700"
              >
                {libraryFavoritesOnly ? "Tüm ürünler" : "Sadece favoriler"}
              </button>
            </div>
            {libraryMessage && <p className="text-[11px] text-muted">{libraryMessage}</p>}
            {libraryLoading ? (
              <p className="text-[11px] text-muted">Kütüphane yükleniyor...</p>
            ) : filteredLibrary.length === 0 ? (
              <p className="text-[11px] text-muted">Henüz kayıtlı ürün yok.</p>
            ) : (
              <div className="space-y-2">
                {filteredLibrary.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-wrap items-center gap-3 rounded-xl border border-amber-100 bg-white px-3 py-2 text-xs"
                  >
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt=""
                        className="h-9 w-9 rounded object-cover"
                      />
                    )}
                    <div className="min-w-[120px] flex-1">
                      <p className="truncate font-semibold text-ink">{item.name}</p>
                      <p className="text-[10px] text-muted">
                        {item.caloriesPer100 || "?"} kcal / 100g
                        {item.barcode ? ` • ${item.barcode}` : ""}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => applyLibraryItem(item)}
                        className="rounded-full border border-amber-100 bg-white px-3 py-1 text-[11px] font-semibold text-amber-700"
                      >
                        Kullan
                      </button>
                      <button
                        onClick={() => handleToggleFavorite(item)}
                        className="rounded-full border border-amber-100 bg-white px-3 py-1 text-[11px] font-semibold text-amber-700"
                      >
                        {item.favorite ? "Favori" : "Favori yap"}
                      </button>
                      <button
                        onClick={() => handleRemoveLibraryItem(item)}
                        className="rounded-full border border-amber-100 bg-white px-3 py-1 text-[11px] font-semibold text-amber-700"
                      >
                        Sil
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
            <p className="text-sm font-semibold">Su Girişi</p>
            <p className="text-xs text-muted">Preset veya özel miktar</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[200, 500, 1000].map((amount) => (
              <button
                key={amount}
                onClick={() => {
                  addWater({ amountMl: amount });
                  setWaterAmount(String(amount));
                }}
                className="rounded-full border border-amber-100 bg-white px-4 py-2 text-xs font-semibold text-amber-700"
              >
                +{amount === 1000 ? "1L" : `${amount}ml`}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={waterAmount}
              onChange={(event) => setWaterAmount(event.target.value)}
              className="w-full rounded-xl border border-amber-100 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-200"
              placeholder="Miktar (ml)"
              type="number"
              min="0"
            />
            <button
              onClick={() => addWater({ amountMl: Number(waterAmount) })}
              className="w-full rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-strong sm:w-auto"
            >
              Ekle
            </button>
          </div>
        </Card>
      )}

      {tab === "activity" && (
        <Card className="space-y-4">
          <div>
            <p className="text-sm font-semibold">Aktivite Girişi</p>
            <p className="text-xs text-muted">Kalori değeri tahminidir</p>
          </div>
          <select
            value={activityType}
            onChange={(event) => setActivityType(event.target.value as ActivityType)}
            className="w-full rounded-xl border border-amber-100 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-200"
          >
            {Object.entries(activityLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              value={activityDuration}
              onChange={(event) => setActivityDuration(event.target.value)}
              className="w-full rounded-xl border border-amber-100 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-200"
              placeholder="Süre (dk)"
              type="number"
              min="0"
            />
            <input
              value={activityCalories}
              onChange={(event) => setActivityCalories(event.target.value)}
              className="w-full rounded-xl border border-amber-100 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-200"
              placeholder="Tahmini kalori"
              type="number"
              min="0"
            />
          </div>
          <button
            onClick={() => {
              if (!activityDuration) return;
              addActivity({
                activityType,
                durationMin: Number(activityDuration),
                estimatedCalories: Number(activityCalories),
              });
            }}
            className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-strong"
          >
            Kaydet
          </button>
        </Card>
      )}
    </div>
  );
}
