"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/card";
import { useTracker } from "@/components/tracker-provider";
import { ActivityType, MealType } from "@/lib/types";
import { createId, formatShortDate, getDayKey } from "@/lib/utils";

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

type FilterType = "all" | "food" | "water" | "activity";
type MealFilter = "all" | MealType;
type RangeFilter = "all" | "7" | "30" | "90";
type SortOrder = "newest" | "oldest";

type FilterState = {
  query: string;
  type: FilterType;
  meal: MealFilter;
  range: RangeFilter;
  sort: SortOrder;
};

type SavedView = {
  id: string;
  name: string;
  filters: FilterState;
};

const SAVED_VIEWS_KEY = "calai.savedviews.v1";

function loadSavedViews(): SavedView[] {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(SAVED_VIEWS_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as SavedView[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function filtersMatch(a: FilterState, b: FilterState) {
  return (
    a.query === b.query &&
    a.type === b.type &&
    a.meal === b.meal &&
    a.range === b.range &&
    a.sort === b.sort
  );
}

export default function HistoryPage() {
  const { entries, removeEntry } = useTracker();
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<FilterType>("all");
  const [mealFilter, setMealFilter] = useState<MealFilter>("all");
  const [rangeFilter, setRangeFilter] = useState<RangeFilter>("30");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [savedViews, setSavedViews] = useState<SavedView[]>(() => loadSavedViews());
  const [viewName, setViewName] = useState("");
  const [activeViewId, setActiveViewId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(SAVED_VIEWS_KEY, JSON.stringify(savedViews));
  }, [savedViews]);

  const filteredEntries = useMemo(() => {
    let list = entries;
    if (rangeFilter !== "all") {
      const days = Number(rangeFilter);
      const since = new Date();
      since.setHours(0, 0, 0, 0);
      since.setDate(since.getDate() - days + 1);
      list = list.filter((entry) => new Date(entry.timestamp) >= since);
    }
    if (typeFilter !== "all") {
      list = list.filter((entry) => entry.type === typeFilter);
    }
    if (mealFilter !== "all") {
      list = list.filter((entry) => entry.type === "food" && entry.mealType === mealFilter);
    }
    if (query.trim()) {
      const normalized = query.toLowerCase();
      list = list.filter((entry) => {
        const label =
          entry.type === "food"
            ? entry.name
            : entry.type === "water"
              ? "Su"
              : activityLabels[entry.activityType];
        return label.toLowerCase().includes(normalized);
      });
    }
    const sorted = [...list].sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
    return sortOrder === "newest" ? sorted.reverse() : sorted;
  }, [entries, mealFilter, query, rangeFilter, sortOrder, typeFilter]);

  const groups = filteredEntries.reduce<Record<string, typeof filteredEntries>>((acc, entry) => {
    const dayKey = getDayKey(entry.timestamp);
    acc[dayKey] = acc[dayKey] ? [...acc[dayKey], entry] : [entry];
    return acc;
  }, {});

  const dayKeys = Object.keys(groups).sort((a, b) =>
    sortOrder === "newest" ? b.localeCompare(a) : a.localeCompare(b)
  );

  const hasFilters =
    query.trim() ||
    typeFilter !== "all" ||
    mealFilter !== "all" ||
    rangeFilter !== "all" ||
    sortOrder !== "newest";

  const currentFilters: FilterState = {
    query,
    type: typeFilter,
    meal: mealFilter,
    range: rangeFilter,
    sort: sortOrder,
  };

  const activeView =
    savedViews.find(
      (view) => view.id === activeViewId && filtersMatch(view.filters, currentFilters)
    ) ?? null;

  return (
    <div className="space-y-6">
      <Card className="space-y-4">
        <div>
          <p className="text-sm font-semibold">Geçmiş Kayıtlar</p>
          <p className="text-xs text-muted">Filtreleyip kayıtları hızlıca bulun.</p>
        </div>
        <div className="grid gap-3 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveViewId(null);
            }}
            placeholder="Ara: öğün, aktivite..."
            className="w-full rounded-xl border border-amber-100 bg-white px-3 py-2 text-sm"
          />
          <select
            value={typeFilter}
            onChange={(event) => {
              const nextType = event.target.value as FilterType;
              setTypeFilter(nextType);
              if (nextType !== "food") {
                setMealFilter("all");
              }
              setActiveViewId(null);
            }}
            className="w-full rounded-xl border border-amber-100 bg-white px-3 py-2 text-sm"
          >
            <option value="all">Tüm Tipler</option>
            <option value="food">Yemek</option>
            <option value="water">Su</option>
            <option value="activity">Aktivite</option>
          </select>
          <select
            value={mealFilter}
            onChange={(event) => {
              setMealFilter(event.target.value as MealFilter);
              setActiveViewId(null);
            }}
            className="w-full rounded-xl border border-amber-100 bg-white px-3 py-2 text-sm"
            disabled={typeFilter !== "food"}
          >
            <option value="all">Tüm Öğünler</option>
            {Object.entries(mealLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-3 md:grid-cols-[0.8fr_0.8fr_1fr]">
          <select
            value={rangeFilter}
            onChange={(event) => {
              setRangeFilter(event.target.value as RangeFilter);
              setActiveViewId(null);
            }}
            className="w-full rounded-xl border border-amber-100 bg-white px-3 py-2 text-sm"
          >
            <option value="all">Tüm Zamanlar</option>
            <option value="7">Son 7 Gün</option>
            <option value="30">Son 30 Gün</option>
            <option value="90">Son 90 Gün</option>
          </select>
          <select
            value={sortOrder}
            onChange={(event) => {
              setSortOrder(event.target.value as SortOrder);
              setActiveViewId(null);
            }}
            className="w-full rounded-xl border border-amber-100 bg-white px-3 py-2 text-sm"
          >
            <option value="newest">En Yeni</option>
            <option value="oldest">En Eski</option>
          </select>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <input
              value={viewName}
              onChange={(event) => setViewName(event.target.value)}
              placeholder="Görünüm adı"
              className="w-full flex-1 rounded-xl border border-amber-100 bg-white px-3 py-2 text-sm"
            />
            <button
              onClick={() => {
                if (!viewName.trim()) {
                  return;
                }
                const filters: FilterState = {
                  query,
                  type: typeFilter,
                  meal: mealFilter,
                  range: rangeFilter,
                  sort: sortOrder,
                };
                const nextView: SavedView = {
                  id: createId(),
                  name: viewName.trim(),
                  filters,
                };
                setSavedViews((prev) => [nextView, ...prev]);
                setActiveViewId(nextView.id);
                setViewName("");
              }}
              className="w-full rounded-xl bg-amber-600 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-700 sm:w-auto"
            >
              Görünüm Kaydet
            </button>
            {hasFilters && (
              <button
                onClick={() => {
                  setQuery("");
                  setTypeFilter("all");
                  setMealFilter("all");
                  setRangeFilter("all");
                  setSortOrder("newest");
                  setActiveViewId(null);
                }}
                className="w-full rounded-xl border border-amber-100 bg-white px-4 py-2 text-xs text-muted hover:text-ink sm:w-auto"
              >
                Filtreyi temizle
              </button>
            )}
          </div>
        </div>
        {savedViews.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
            {savedViews.map((view) => (
              <div
                key={view.id}
                className={`flex items-center gap-2 rounded-full border px-3 py-1 ${
                  activeView?.id === view.id
                    ? "border-amber-400 bg-amber-50 text-amber-700"
                    : "border-amber-100 bg-white"
                }`}
              >
                <button
                  onClick={() => {
                    setQuery(view.filters.query);
                    setTypeFilter(view.filters.type);
                    setMealFilter(view.filters.meal);
                    setRangeFilter(view.filters.range);
                    setSortOrder(view.filters.sort);
                    setActiveViewId(view.id);
                  }}
                >
                  {view.name}
                </button>
                <button
                  onClick={() => {
                    setSavedViews((prev) => prev.filter((item) => item.id !== view.id));
                    if (activeViewId === view.id) {
                      setActiveViewId(null);
                    }
                  }}
                  className="text-[11px] text-muted hover:text-ink"
                  aria-label={`${view.name} görünümünü sil`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </Card>

      {entries.length === 0 && (
        <Card className="text-center text-sm text-muted">
          Henüz kayıt yok. İlk girişinizi ekleyin.
        </Card>
      )}

      {entries.length > 0 && dayKeys.length === 0 && (
        <Card className="text-center text-sm text-muted">
          Filtrelere uygun kayıt bulunamadı.
        </Card>
      )}

      {dayKeys.map((day) => (
        <Card key={day} className="space-y-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold">{formatShortDate(day)}</p>
            <span className="rounded-full bg-amber-50 px-3 py-1 text-[11px] text-muted">
              {groups[day].length} kayıt
            </span>
          </div>
          <div className="space-y-2">
            {groups[day].map((entry) => (
              <div
                key={entry.id}
                className="flex flex-col gap-1 rounded-2xl border border-amber-100 bg-white px-3 py-2 text-xs sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  {entry.type === "food" && (
                    <div>
                      <p className="text-sm font-semibold text-ink">{entry.name}</p>
                      <p className="text-xs text-muted">
                        {mealLabels[entry.mealType]} • {entry.calories} kcal
                      </p>
                    </div>
                  )}
                  {entry.type === "water" && (
                    <div>
                      <p className="text-sm font-semibold text-ink">Su</p>
                      <p className="text-xs text-muted">{entry.amountMl} ml</p>
                    </div>
                  )}
                  {entry.type === "activity" && (
                    <div>
                      <p className="text-sm font-semibold text-ink">
                        {activityLabels[entry.activityType]}
                      </p>
                      <p className="text-xs text-muted">
                        {entry.durationMin} dk • {entry.estimatedCalories} kcal (tahmini)
                      </p>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => removeEntry(entry.id)}
                  className="mt-2 rounded-full border border-amber-100 px-3 py-1 text-[11px] text-muted hover:text-ink sm:mt-0"
                >
                  Sil
                </button>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
