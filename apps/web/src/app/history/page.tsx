"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { useTracker } from "@/components/providers/tracker-provider";
import { ActivityType, Entry, MealType } from "@/lib/core/types";
import { createId, formatShortDate, getDayKey } from "@/lib/core/utils";
import { t } from "@/lib/core/i18n";
import { activityLabels } from "@/lib/features/activity";

type FilterType = "all" | "food" | "drink" | "water" | "activity";
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
  const { entries, removeEntry, addEntries, updateEntry } = useTracker();
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<FilterType>("all");
  const [mealFilter, setMealFilter] = useState<MealFilter>("all");
  const [rangeFilter, setRangeFilter] = useState<RangeFilter>("30");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [savedViews, setSavedViews] = useState<SavedView[]>(() => loadSavedViews());
  const [viewName, setViewName] = useState("");
  const [activeViewId, setActiveViewId] = useState<string | null>(null);
  const [lastDeleted, setLastDeleted] = useState<Entry | null>(null);
  const [undoTimeoutId, setUndoTimeoutId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<Entry | null>(null);
  const mealLabels: Record<MealType, string> = {
    breakfast: t("Kahvaltı"),
    lunch: t("Öğle"),
    dinner: t("Akşam"),
    snack: t("Atıştırmalık"),
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(SAVED_VIEWS_KEY, JSON.stringify(savedViews));
  }, [savedViews]);

  const toDateTimeLocal = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return "";
    }
    const offset = date.getTimezoneOffset();
    const local = new Date(date.getTime() - offset * 60000);
    return local.toISOString().slice(0, 16);
  };

  const fromDateTimeLocal = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return new Date().toISOString();
    }
    return date.toISOString();
  };

  const handleDelete = (entry: Entry) => {
    void removeEntry(entry.id);
    setLastDeleted(entry);
    if (undoTimeoutId) {
      window.clearTimeout(undoTimeoutId);
    }
    const timeout = window.setTimeout(() => {
      setLastDeleted(null);
    }, 6000);
    setUndoTimeoutId(timeout);
  };

  const handleUndo = () => {
    if (!lastDeleted) {
      return;
    }
    void addEntries([lastDeleted], { mode: "merge", source: "undo" });
    setLastDeleted(null);
    if (undoTimeoutId) {
      window.clearTimeout(undoTimeoutId);
    }
    setUndoTimeoutId(null);
  };

  const startEdit = (entry: Entry) => {
    setEditingId(entry.id);
    setEditDraft(entry);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditDraft(null);
  };

  const saveEdit = async () => {
    if (!editDraft) {
      return;
    }
    await updateEntry(editDraft.id, editDraft);
    cancelEdit();
  };

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
            : entry.type === "drink"
              ? entry.name
              : entry.type === "water"
                ? t("Su")
                : entry.type === "activity"
                  ? activityLabels[entry.activityType] ?? t("Aktivite")
                  : t("Aktivite");
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
          <p className="text-sm font-semibold">{t("Geçmiş Kayıtlar")}</p>
          <p className="text-xs text-muted">{t("Filtreleyip kayıtları hızlıca bulun.")}</p>
        </div>
        <div className="grid gap-3 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveViewId(null);
            }}
            placeholder={t("Ara: öğün, aktivite...")}
            className="w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-sm"
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
            className="w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-sm"
          >
            <option value="all">{t("Tüm Tipler")}</option>
            <option value="food">{t("Yemek")}</option>
            <option value="drink">{t("İçecek")}</option>
            <option value="water">{t("Su")}</option>
            <option value="activity">{t("Aktivite")}</option>
          </select>
          <select
            value={mealFilter}
            onChange={(event) => {
              setMealFilter(event.target.value as MealFilter);
              setActiveViewId(null);
            }}
            className="w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-sm"
            disabled={typeFilter !== "food"}
          >
            <option value="all">{t("Tüm Öğünler")}</option>
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
            className="w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-sm"
          >
            <option value="all">{t("Tüm Zamanlar")}</option>
            <option value="7">{t("Son {value} Gün", { value: 7 })}</option>
            <option value="30">{t("Son {value} Gün", { value: 30 })}</option>
            <option value="90">{t("Son {value} Gün", { value: 90 })}</option>
          </select>
          <select
            value={sortOrder}
            onChange={(event) => {
              setSortOrder(event.target.value as SortOrder);
              setActiveViewId(null);
            }}
            className="w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-sm"
          >
            <option value="newest">{t("En Yeni")}</option>
            <option value="oldest">{t("En Eski")}</option>
          </select>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <input
              value={viewName}
              onChange={(event) => setViewName(event.target.value)}
              placeholder={t("Görünüm adı")}
              className="w-full flex-1 rounded-xl border border-emerald-100 bg-white px-3 py-2 text-sm"
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
              className="w-full rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 sm:w-auto"
            >
              {t("Görünüm Kaydet")}
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
                className="w-full rounded-xl border border-emerald-100 bg-white px-4 py-2 text-xs text-muted hover:text-ink sm:w-auto"
              >
                {t("Filtreyi temizle")}
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
                    ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                    : "border-emerald-100 bg-white"
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
                  aria-label={t("{name} görünümünü sil", { name: view.name })}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </Card>

      {lastDeleted && (
        <Card className="flex flex-col items-start justify-between gap-2 text-xs sm:flex-row sm:items-center">
          <span className="text-muted">
            {t("Kayıt silindi: {label}", {
              label: (() => {
                switch (lastDeleted.type) {
                  case "food":
                  case "drink":
                    return lastDeleted.name;
                  case "water":
                    return t("Su");
                  case "activity":
                    return activityLabels[lastDeleted.activityType] ?? t("Aktivite");
                  default:
                    return t("Aktivite");
                }
              })(),
            })}
          </span>
          <button
            onClick={handleUndo}
            className="rounded-full border border-emerald-100 bg-white px-3 py-1 text-xs font-semibold text-emerald-700"
          >
            {t("Geri al")}
          </button>
        </Card>
      )}

      {entries.length === 0 && (
        <Card className="text-center text-sm text-muted">
          {t("Henüz kayıt yok. İlk girişinizi ekleyin.")}
        </Card>
      )}

      {entries.length > 0 && dayKeys.length === 0 && (
        <Card className="text-center text-sm text-muted">
          {t("Filtrelere uygun kayıt bulunamadı.")}
        </Card>
      )}

      {dayKeys.map((day) => (
        <Card key={day} className="space-y-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold">{formatShortDate(day)}</p>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] text-muted">
              {t("{value} kayıt", { value: groups[day].length })}
            </span>
          </div>
          <div className="space-y-2">
            {groups[day].map((entry) => (
              <div
                key={entry.id}
                className="flex flex-col gap-2 rounded-2xl border border-emerald-100 bg-white px-3 py-2 text-xs"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    {entry.type === "food" && (
                      <div>
                        <p className="text-sm font-semibold text-ink">{entry.name}</p>
                        <p className="text-xs text-muted">
                          {t("{meal} • {calorie} kcal", {
                            meal: mealLabels[entry.mealType],
                            calorie: entry.calories,
                          })}
                        </p>
                      </div>
                    )}
                    {entry.type === "drink" && (
                      <div>
                        <p className="text-sm font-semibold text-ink">{entry.name}</p>
                        <p className="text-xs text-muted">
                          {t("{amount} ml • {calorie} kcal", {
                            amount: entry.amountMl,
                            calorie: entry.calories,
                          })}
                        </p>
                      </div>
                    )}
                    {entry.type === "water" && (
                      <div>
                        <p className="text-sm font-semibold text-ink">{t("Su")}</p>
                        <p className="text-xs text-muted">
                          {t("{value} ml", { value: entry.amountMl })}
                        </p>
                      </div>
                    )}
                    {entry.type === "activity" && (
                      <div>
                        <p className="text-sm font-semibold text-ink">
                          {activityLabels[entry.activityType] ?? t("Aktivite")}
                        </p>
                        <p className="text-xs text-muted">
                          {t("{duration} dk • {calorie} kcal (tahmini)", {
                            duration: entry.durationMin,
                            calorie: entry.estimatedCalories,
                          })}
                        </p>
                        {"note" in entry && entry.note && (
                          <p className="text-[11px] text-muted">{entry.note}</p>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => startEdit(entry)}
                      className="rounded-full border border-emerald-100 px-3 py-1 text-[11px] text-muted hover:text-ink"
                    >
                      {t("Düzenle")}
                    </button>
                    <button
                      onClick={() => handleDelete(entry)}
                      className="rounded-full border border-emerald-100 px-3 py-1 text-[11px] text-muted hover:text-ink"
                    >
                      {t("Sil")}
                    </button>
                  </div>
                </div>
                {editingId === entry.id && editDraft?.id === entry.id && (
                  <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-3">
                    <div className="grid gap-2 sm:grid-cols-2">
                      <div className="space-y-1">
                        <label className="text-[11px] text-muted">{t("Tarih/Saat")}</label>
                        <input
                          type="datetime-local"
                          value={toDateTimeLocal(editDraft.timestamp)}
                          onChange={(event) =>
                            setEditDraft((prev) =>
                              prev ? { ...prev, timestamp: fromDateTimeLocal(event.target.value) } : prev
                            )
                          }
                          className="w-full rounded-lg border border-emerald-100 bg-white px-2 py-1 text-xs"
                        />
                      </div>
                      {editDraft.type === "food" && (
                        <div className="space-y-1">
                          <label className="text-[11px] text-muted">{t("Öğün")}</label>
                          <select
                            value={editDraft.mealType}
                            onChange={(event) =>
                              setEditDraft((prev) =>
                                prev && prev.type === "food"
                                  ? { ...prev, mealType: event.target.value as MealType }
                                  : prev
                              )
                            }
                            className="w-full rounded-lg border border-emerald-100 bg-white px-2 py-1 text-xs"
                          >
                            {Object.entries(mealLabels).map(([value, label]) => (
                              <option key={value} value={value}>
                                {label}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                      {editDraft.type === "activity" && (
                        <div className="space-y-1">
                          <label className="text-[11px] text-muted">{t("Aktivite")}</label>
                          <select
                            value={editDraft.activityType}
                            onChange={(event) =>
                              setEditDraft((prev) =>
                                prev && prev.type === "activity"
                                  ? { ...prev, activityType: event.target.value as ActivityType }
                                  : prev
                              )
                            }
                            className="w-full rounded-lg border border-emerald-100 bg-white px-2 py-1 text-xs"
                          >
                            {Object.entries(activityLabels).map(([value, label]) => (
                              <option key={value} value={value}>
                                {label}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                    {editDraft.type === "food" && (
                      <div className="mt-2 grid gap-2 sm:grid-cols-2">
                        <input
                          value={editDraft.name}
                          onChange={(event) =>
                            setEditDraft((prev) =>
                              prev && prev.type === "food" ? { ...prev, name: event.target.value } : prev
                            )
                          }
                          className="w-full rounded-lg border border-emerald-100 bg-white px-2 py-1 text-xs"
                          placeholder={t("Yemek adı")}
                        />
                        <input
                          value={editDraft.calories}
                          onChange={(event) =>
                            setEditDraft((prev) =>
                              prev && prev.type === "food"
                                ? { ...prev, calories: Number(event.target.value) || 0 }
                                : prev
                            )
                          }
                          className="w-full rounded-lg border border-emerald-100 bg-white px-2 py-1 text-xs"
                          placeholder={t("Kalori")}
                          type="number"
                          min="0"
                        />
                        <input
                          value={editDraft.proteinG ?? ""}
                          onChange={(event) =>
                            setEditDraft((prev) =>
                              prev && prev.type === "food"
                                ? {
                                    ...prev,
                                    proteinG: event.target.value ? Number(event.target.value) : undefined,
                                  }
                                : prev
                            )
                          }
                          className="w-full rounded-lg border border-emerald-100 bg-white px-2 py-1 text-xs"
                          placeholder={t("Protein (g)")}
                          type="number"
                          min="0"
                        />
                        <input
                          value={editDraft.carbsG ?? ""}
                          onChange={(event) =>
                            setEditDraft((prev) =>
                              prev && prev.type === "food"
                                ? {
                                    ...prev,
                                    carbsG: event.target.value ? Number(event.target.value) : undefined,
                                  }
                                : prev
                            )
                          }
                          className="w-full rounded-lg border border-emerald-100 bg-white px-2 py-1 text-xs"
                          placeholder={t("Karbonhidrat (g)")}
                          type="number"
                          min="0"
                        />
                        <input
                          value={editDraft.fatG ?? ""}
                          onChange={(event) =>
                            setEditDraft((prev) =>
                              prev && prev.type === "food"
                                ? {
                                    ...prev,
                                    fatG: event.target.value ? Number(event.target.value) : undefined,
                                  }
                                : prev
                            )
                          }
                          className="w-full rounded-lg border border-emerald-100 bg-white px-2 py-1 text-xs"
                          placeholder={t("Yağ (g)")}
                          type="number"
                          min="0"
                        />
                        <input
                          value={editDraft.amountG ?? ""}
                          onChange={(event) =>
                            setEditDraft((prev) =>
                              prev && prev.type === "food"
                                ? {
                                    ...prev,
                                    amountG: event.target.value ? Number(event.target.value) : undefined,
                                  }
                                : prev
                            )
                          }
                          className="w-full rounded-lg border border-emerald-100 bg-white px-2 py-1 text-xs"
                          placeholder={t("Miktar (g)")}
                          type="number"
                          min="0"
                        />
                      </div>
                    )}
                    {editDraft.type === "water" && (
                      <div className="mt-2">
                        <input
                          value={editDraft.amountMl}
                          onChange={(event) =>
                            setEditDraft((prev) =>
                              prev && prev.type === "water"
                                ? { ...prev, amountMl: Number(event.target.value) || 0 }
                                : prev
                            )
                          }
                          className="w-full rounded-lg border border-emerald-100 bg-white px-2 py-1 text-xs"
                          placeholder={t("Miktar (ml)")}
                          type="number"
                          min="0"
                        />
                      </div>
                    )}
                    {editDraft.type === "activity" && (
                      <div className="mt-2 grid gap-2 sm:grid-cols-2">
                        <input
                          value={editDraft.durationMin}
                          onChange={(event) =>
                            setEditDraft((prev) =>
                              prev && prev.type === "activity"
                                ? { ...prev, durationMin: Number(event.target.value) || 0 }
                                : prev
                            )
                          }
                          className="w-full rounded-lg border border-emerald-100 bg-white px-2 py-1 text-xs"
                          placeholder={t("Süre (dk)")}
                          type="number"
                          min="0"
                        />
                        <input
                          value={editDraft.estimatedCalories}
                          onChange={(event) =>
                            setEditDraft((prev) =>
                              prev && prev.type === "activity"
                                ? {
                                    ...prev,
                                    estimatedCalories: Number(event.target.value) || 0,
                                  }
                                : prev
                            )
                          }
                          className="w-full rounded-lg border border-emerald-100 bg-white px-2 py-1 text-xs"
                          placeholder={t("Tahmini kalori")}
                          type="number"
                          min="0"
                        />
                        <input
                          value={editDraft.note ?? ""}
                          onChange={(event) =>
                            setEditDraft((prev) =>
                              prev && prev.type === "activity"
                                ? { ...prev, note: event.target.value || undefined }
                                : prev
                            )
                          }
                          className="w-full rounded-lg border border-emerald-100 bg-white px-2 py-1 text-xs sm:col-span-2"
                          placeholder={t("Not (opsiyonel)")}
                        />
                      </div>
                    )}
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <button
                        onClick={saveEdit}
                        className="rounded-full bg-emerald-600 px-3 py-1 text-[11px] font-semibold text-white"
                      >
                        {t("Kaydet")}
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="rounded-full border border-emerald-100 px-3 py-1 text-[11px] text-muted"
                      >
                        {t("Vazgeç")}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
