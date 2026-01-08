"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Card } from "@/components/card";
import { Tooltip } from "@/components/tooltip";
import { useTracker } from "@/components/tracker-provider";
import { ActivityType, MealType } from "@/lib/types";
import { OFFProduct } from "@/lib/off";

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
  const { addFood, addWater, addActivity } = useTracker();
  const [tab, setTab] = useState<TabKey>("food");

  const [foodName, setFoodName] = useState("");
  const [foodCalories, setFoodCalories] = useState("");
  const [mealType, setMealType] = useState<MealType>("lunch");

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
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const skipSearchRef = useRef(false);

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

  const handleBarcodeLookup = useCallback(
    async (rawCode: string) => {
      const code = rawCode.trim();
      if (!code) {
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
        setSelectedFromSearch(true);
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
    [setFoodCalories, setFoodName, setSearchResults]
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
                onChange={(event) => setBarcodeInput(event.target.value)}
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
                    setSelectedFromSearch(true);
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
          <button
            onClick={() => {
              if (!foodCalories) return;
              addFood({ name: foodName || "Belirtilmedi", calories: Number(foodCalories), mealType });
              setFoodName("");
              setFoodCalories("");
              setSelectedFromSearch(false);
            }}
            className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-strong"
          >
            Kaydet
          </button>
        </Card>
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
