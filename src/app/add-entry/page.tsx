"use client";

import { useState } from "react";
import { Card } from "@/components/card";
import { useTracker } from "@/components/tracker-provider";
import { ActivityType, MealType } from "@/lib/types";

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
            <p className="text-xs text-muted">Manuel kalori girişi</p>
          </div>
          <input
            value={foodName}
            onChange={(event) => setFoodName(event.target.value)}
            className="w-full rounded-xl border border-amber-100 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-200"
            placeholder="Örn: Izgara tavuk"
          />
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
