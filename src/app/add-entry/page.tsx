"use client";

import { useState, useEffect } from "react";
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

export default function AddEntryPage() {
  const { addFood, addWater, addActivity } = useTracker();
  const [tab, setTab] = useState<TabKey>("food");

  const [foodName, setFoodName] = useState("");
  const [foodCalories, setFoodCalories] = useState("");
  const [mealType, setMealType] = useState<MealType>("lunch");

  const [searchResults, setSearchResults] = useState<OFFProduct[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
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
          <input
            value={foodName}
            onChange={(event) => setFoodName(event.target.value)}
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
                    setFoodName(product.product_name);
                    const kcal = product.nutriments["energy-kcal_100g"];
                    if (kcal) setFoodCalories(String(Math.round(kcal)));
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
          {foodName.length > 2 && !isSearching && searchResults.length === 0 && (
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
          <div className="flex gap-3">
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
              className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-strong"
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
