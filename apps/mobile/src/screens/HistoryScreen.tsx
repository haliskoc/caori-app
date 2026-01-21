import { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Modal } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTracker } from "@/providers/TrackerProvider";
import { useAuth } from "@/providers/AppProvider";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { getDayKey } from "@calai/shared/utils";
import type { Entry, ActivityType, MealType, SleepQuality } from "@calai/shared/types";
import { loadHistoryViews, saveHistoryViews, HistoryView } from "@/lib/history-views";
import { createId } from "@/lib/id";
import { t } from "@/lib/i18n";

const FILTERS = ["all", "food", "water", "drink", "activity", "sleep"] as const;
const RANGE_OPTIONS = [7, 30, 90];

const MEAL_LABELS: Record<MealType, string> = {
  breakfast: t("Kahvaltı"),
  lunch: t("Öğle"),
  dinner: t("Akşam"),
  snack: t("Atıştırmalık"),
};

const ACTIVITY_LABELS: Record<ActivityType, string> = {
  walking: t("Yürüyüş"),
  running: t("Koşu"),
  gym: t("Spor"),
  cycling: t("Bisiklet"),
  swimming: t("Yüzme"),
  yoga: t("Yoga"),
  hiit: t("HIIT"),
  pilates: t("Pilates"),
  stairs: t("Merdiven"),
};

const SLEEP_QUALITIES: SleepQuality[] = ["poor", "fair", "good", "excellent"];

export function HistoryScreen() {
  const { user } = useAuth();
  const { entries, removeEntry, addEntries, updateEntry, theme } = useTracker();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("all");
  const [search, setSearch] = useState("");
  const [rangeDays, setRangeDays] = useState(30);
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [mealFilter, setMealFilter] = useState<MealType | "all">("all");
  const [views, setViews] = useState<HistoryView[]>([]);
  const [viewName, setViewName] = useState("");
  const [lastDeleted, setLastDeleted] = useState<Entry | null>(null);
  const [editing, setEditing] = useState<Entry | null>(null);
  const [editValues, setEditValues] = useState<Record<string, any>>({});

  useEffect(() => {
    if (!user?.id) return;
    loadHistoryViews(user.id).then(setViews).catch(() => undefined);
  }, [user?.id]);

  useEffect(() => {
    if (!editing) {
      setEditValues({});
      return;
    }
    setEditValues({ ...editing });
  }, [editing]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    const since = new Date(Date.now() - (rangeDays - 1) * 24 * 60 * 60 * 1000);

    return entries
      .filter((entry) => {
        if (filter !== "all" && entry.type !== filter) return false;
        if (mealFilter !== "all") {
          if (entry.type !== "food") return false;
          if (entry.mealType !== mealFilter) return false;
        }
        if (new Date(entry.timestamp) < since) return false;
        if (!query) return true;
        const haystack = [
          entry.type,
          "name" in entry ? entry.name : "",
          "activityType" in entry ? entry.activityType : "",
          "note" in entry ? entry.note : "",
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(query);
      })
      .sort((a, b) => {
        const delta = new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        return sortOrder === "asc" ? delta : -delta;
      });
  }, [entries, filter, mealFilter, rangeDays, search, sortOrder]);

  const grouped = useMemo(() => {
    return filtered.reduce((acc, entry) => {
      const key = getDayKey(entry.timestamp);
      if (!acc[key]) acc[key] = [];
      acc[key].push(entry);
      return acc;
    }, {} as Record<string, Entry[]>);
  }, [filtered]);

  const dateKeys = Object.keys(grouped).sort((a, b) => (a < b ? 1 : -1));

  const handleDelete = async (entry: Entry) => {
    await removeEntry(entry.id, entry.type);
    setLastDeleted(entry);
  };

  const handleUndo = async () => {
    if (!lastDeleted) return;
    await addEntries([lastDeleted]);
    setLastDeleted(null);
  };

  const handleSaveView = async () => {
    if (!user?.id || !viewName.trim()) return;
    const next: HistoryView[] = [
      ...views,
      {
        id: createId("view"),
        name: viewName.trim(),
        filters: {
          type: filter,
          rangeDays,
          query: search,
          mealType: mealFilter,
          sort: sortOrder,
        },
      },
    ];
    setViews(next);
    setViewName("");
    await saveHistoryViews(user.id, next);
  };

  const applyView = (view: HistoryView) => {
    setFilter(view.filters.type as any);
    setRangeDays(view.filters.rangeDays);
    setSearch(view.filters.query);
    setMealFilter(view.filters.mealType as any);
    setSortOrder(view.filters.sort);
  };

  const handleSaveEdit = async () => {
    if (!editing) return;
    let updated: Entry = { ...editing, ...editValues } as Entry;

    if (updated.type === "food") {
      updated = {
        ...updated,
        name: editValues.name ?? updated.name,
        calories: Number(editValues.calories ?? updated.calories ?? 0),
        mealType: (editValues.mealType ?? updated.mealType) as MealType,
      };
    }

    if (updated.type === "drink") {
      updated = {
        ...updated,
        name: editValues.name ?? updated.name,
        calories: Number(editValues.calories ?? updated.calories ?? 0),
        amountMl: Number(editValues.amountMl ?? updated.amountMl ?? 0),
      };
    }

    if (updated.type === "water") {
      updated = {
        ...updated,
        amountMl: Number(editValues.amountMl ?? updated.amountMl ?? 0),
      };
    }

    if (updated.type === "activity") {
      updated = {
        ...updated,
        activityType: (editValues.activityType ?? updated.activityType) as ActivityType,
        durationMin: Number(editValues.durationMin ?? updated.durationMin ?? 0),
        estimatedCalories: Number(editValues.estimatedCalories ?? updated.estimatedCalories ?? 0),
        note: editValues.note ?? updated.note,
      };
    }

    if (updated.type === "sleep") {
      updated = {
        ...updated,
        sleepStart: editValues.sleepStart ?? updated.sleepStart,
        sleepEnd: editValues.sleepEnd ?? updated.sleepEnd,
        quality: (editValues.quality ?? updated.quality) as SleepQuality,
        note: editValues.note ?? updated.note,
      };
    }

    await updateEntry(updated);
    setEditing(null);
  };

  return (
    <LinearGradient colors={theme.gradient} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AppHeader title={t("Geçmiş")} subtitle={t("Kayıtlar")} theme={theme} />

        {lastDeleted ? (
          <Card theme={theme} style={styles.undoCard}>
            <Text style={[styles.undoText, { color: theme.text }]}>{t("Kayıt silindi.")}</Text>
            <Button label={t("Geri Al")} onPress={handleUndo} theme={theme} variant="secondary" />
          </Card>
        ) : null}

        <Card theme={theme} style={styles.card}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{t("Filtreler")}</Text>
          <Input value={search} onChangeText={setSearch} placeholder={t("Ara")} theme={theme} />
          <View style={styles.filterRow}>
            {FILTERS.map((key) => (
              <Pressable
                key={key}
                onPress={() => setFilter(key)}
                style={[
                  styles.filterChip,
                  { borderColor: theme.border },
                  filter === key && { backgroundColor: theme.accentSoft, borderColor: theme.accent },
                ]}
              >
                  <Text style={{ color: filter === key ? theme.accentText : theme.muted }}>{key.toUpperCase()}</Text>
                </Pressable>
            ))}
          </View>
          <View style={styles.filterRow}>
            {RANGE_OPTIONS.map((range) => (
              <Pressable
                key={range}
                onPress={() => setRangeDays(range)}
                style={[
                  styles.filterChip,
                  { borderColor: theme.border },
                  rangeDays === range && { backgroundColor: theme.accentSoft, borderColor: theme.accent },
                ]}
              >
                <Text style={{ color: rangeDays === range ? theme.accentText : theme.muted }}>{t("{value} gün", { value: range })}</Text>
              </Pressable>
            ))}
          </View>
          <View style={styles.filterRow}>
            <Pressable
              onPress={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              style={[styles.filterChip, { borderColor: theme.border }]}
            >
              <Text style={{ color: theme.muted }}>
                {sortOrder === "asc" ? t("En eski") : t("En yeni")}
              </Text>
            </Pressable>
            {Object.entries(MEAL_LABELS).map(([key, label]) => (
              <Pressable
                key={key}
                onPress={() => setMealFilter(key as MealType)}
                style={[
                  styles.filterChip,
                  { borderColor: theme.border },
                  mealFilter === key && { backgroundColor: theme.accentSoft, borderColor: theme.accent },
                ]}
              >
                <Text style={{ color: mealFilter === key ? theme.accentText : theme.muted }}>{label}</Text>
              </Pressable>
            ))}
            <Pressable
              onPress={() => setMealFilter("all")}
              style={[
                styles.filterChip,
                { borderColor: theme.border },
                mealFilter === "all" && { backgroundColor: theme.accentSoft, borderColor: theme.accent },
              ]}
            >
              <Text style={{ color: mealFilter === "all" ? theme.accentText : theme.muted }}>{t("Tümü")}</Text>
            </Pressable>
          </View>
        </Card>

        <Card theme={theme} style={styles.card}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{t("Kayıtlı Görünümler")}</Text>
          <Input value={viewName} onChangeText={setViewName} placeholder={t("Görünüm adı")} theme={theme} />
          <Button label={t("Görünümü Kaydet")} onPress={handleSaveView} theme={theme} />
          <View style={styles.filterRow}>
            {views.map((view) => (
              <Pressable
                key={view.id}
                onPress={() => applyView(view)}
                style={[styles.filterChip, { borderColor: theme.border }]}
              >
                <Text style={{ color: theme.muted }}>{view.name}</Text>
              </Pressable>
            ))}
          </View>
        </Card>

        {dateKeys.length === 0 ? (
          <Card theme={theme}>
            <Text style={[styles.empty, { color: theme.muted }]}>{t("Kayıt bulunamadı.")}</Text>
          </Card>
        ) : (
          dateKeys.map((date) => (
            <View key={date} style={styles.group}>
              <Text style={[styles.dateLabel, { color: theme.text }]}>{date}</Text>
              {grouped[date].map((entry) => {
                const title =
                  entry.type === "food" || entry.type === "drink"
                    ? entry.name
                    : entry.type === "water"
                      ? `${entry.amountMl} ml su`
                      : entry.type === "activity"
                        ? `${entry.activityType} • ${entry.durationMin} dk`
                        : entry.type === "sleep"
                          ? `Uyku • ${Math.round(entry.durationMin / 60)} saat`
                          : entry.type;

                return (
                  <Card key={entry.id} theme={theme} style={styles.entryCard}>
                    <View style={styles.entryRow}>
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.entryTitle, { color: theme.text }]}>
                          [{entry.type.toUpperCase()}] {title}
                        </Text>
                        <Text style={[styles.entrySub, { color: theme.muted }]}>{entry.timestamp}</Text>
                      </View>
                      <View style={styles.entryActions}>
                        <Button label={t("Düzenle")} onPress={() => setEditing(entry)} theme={theme} variant="secondary" />
                        <Button label={t("Sil")} onPress={() => handleDelete(entry)} theme={theme} variant="ghost" />
                      </View>
                    </View>
                  </Card>
                );
              })}
            </View>
          ))
        )}
      </ScrollView>

      <Modal visible={Boolean(editing)} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <Card theme={theme} style={styles.modalCard}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>{t("Kayıt Düzenle")}</Text>
            {editing?.type === "food" && (
              <>
                <Input
                  value={String(editValues.name ?? "")}
                  onChangeText={(value) => setEditValues((prev) => ({ ...prev, name: value }))}
                  placeholder={t("Yemek adı")}
                  theme={theme}
                />
                <Input
                  value={String(editValues.calories ?? "")}
                  onChangeText={(value) => setEditValues((prev) => ({ ...prev, calories: value }))}
                  placeholder={t("Kalori")}
                  keyboardType="numeric"
                  theme={theme}
                />
                <View style={styles.filterRow}>
                  {Object.entries(MEAL_LABELS).map(([key, label]) => (
                    <Pressable
                      key={key}
                      onPress={() => setEditValues((prev) => ({ ...prev, mealType: key }))}
                      style={[
                        styles.filterChip,
                        { borderColor: theme.border },
                        editValues.mealType === key && { backgroundColor: theme.accentSoft, borderColor: theme.accent },
                      ]}
                    >
                      <Text style={{ color: editValues.mealType === key ? theme.accentText : theme.muted }}>{label}</Text>
                    </Pressable>
                  ))}
                </View>
              </>
            )}

            {editing?.type === "drink" && (
              <>
                <Input
                  value={String(editValues.name ?? "")}
                  onChangeText={(value) => setEditValues((prev) => ({ ...prev, name: value }))}
                  placeholder={t("İçecek adı")}
                  theme={theme}
                />
                <Input
                  value={String(editValues.amountMl ?? "")}
                  onChangeText={(value) => setEditValues((prev) => ({ ...prev, amountMl: value }))}
                  placeholder={t("Miktar (ml)")}
                  keyboardType="numeric"
                  theme={theme}
                />
                <Input
                  value={String(editValues.calories ?? "")}
                  onChangeText={(value) => setEditValues((prev) => ({ ...prev, calories: value }))}
                  placeholder={t("Kalori")}
                  keyboardType="numeric"
                  theme={theme}
                />
              </>
            )}

            {editing?.type === "water" && (
              <Input
                value={String(editValues.amountMl ?? "")}
                onChangeText={(value) => setEditValues((prev) => ({ ...prev, amountMl: value }))}
                placeholder={t("Miktar (ml)")}
                keyboardType="numeric"
                theme={theme}
              />
            )}

            {editing?.type === "activity" && (
              <>
                <View style={styles.filterRow}>
                  {Object.entries(ACTIVITY_LABELS).map(([key, label]) => (
                    <Pressable
                      key={key}
                      onPress={() => setEditValues((prev) => ({ ...prev, activityType: key }))}
                      style={[
                        styles.filterChip,
                        { borderColor: theme.border },
                        editValues.activityType === key && { backgroundColor: theme.accentSoft, borderColor: theme.accent },
                      ]}
                    >
                      <Text style={{ color: editValues.activityType === key ? theme.accentText : theme.muted }}>{label}</Text>
                    </Pressable>
                  ))}
                </View>
                <Input
                  value={String(editValues.durationMin ?? "")}
                  onChangeText={(value) => setEditValues((prev) => ({ ...prev, durationMin: value }))}
                  placeholder={t("Süre (dk)")}
                  keyboardType="numeric"
                  theme={theme}
                />
                <Input
                  value={String(editValues.estimatedCalories ?? "")}
                  onChangeText={(value) => setEditValues((prev) => ({ ...prev, estimatedCalories: value }))}
                  placeholder={t("Tahmini kalori")}
                  keyboardType="numeric"
                  theme={theme}
                />
                <Input
                  value={String(editValues.note ?? "")}
                  onChangeText={(value) => setEditValues((prev) => ({ ...prev, note: value }))}
                  placeholder={t("Not")}
                  theme={theme}
                />
              </>
            )}

            {editing?.type === "sleep" && (
              <>
                <Input
                  value={String(editValues.sleepStart ?? "")}
                  onChangeText={(value) => setEditValues((prev) => ({ ...prev, sleepStart: value }))}
                  placeholder={t("Başlangıç (ISO)")}
                  theme={theme}
                />
                <Input
                  value={String(editValues.sleepEnd ?? "")}
                  onChangeText={(value) => setEditValues((prev) => ({ ...prev, sleepEnd: value }))}
                  placeholder={t("Bitiş (ISO)")}
                  theme={theme}
                />
                <View style={styles.filterRow}>
                  {SLEEP_QUALITIES.map((item) => (
                    <Pressable
                      key={item}
                      onPress={() => setEditValues((prev) => ({ ...prev, quality: item }))}
                      style={[
                        styles.filterChip,
                        { borderColor: theme.border },
                        editValues.quality === item && { backgroundColor: theme.accentSoft, borderColor: theme.accent },
                      ]}
                    >
                      <Text style={{ color: editValues.quality === item ? theme.accentText : theme.muted }}>{item.toUpperCase()}</Text>
                    </Pressable>
                  ))}
                </View>
                <Input
                  value={String(editValues.note ?? "")}
                  onChangeText={(value) => setEditValues((prev) => ({ ...prev, note: value }))}
                  placeholder={t("Not")}
                  theme={theme}
                />
              </>
            )}

            <View style={styles.modalActions}>
              <Button label={t("İptal")} onPress={() => setEditing(null)} theme={theme} variant="ghost" />
              <Button label={t("Kaydet")} onPress={handleSaveEdit} theme={theme} />
            </View>
          </Card>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 120, gap: 12 },
  card: { gap: 12 },
  filterRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  filterChip: { borderWidth: 1, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  group: { gap: 8 },
  dateLabel: { fontFamily: "SpaceGrotesk_700Bold", fontSize: 14, marginTop: 8 },
  entryCard: { padding: 12 },
  entryRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 },
  entryTitle: { fontFamily: "Archivo_600SemiBold", fontSize: 13 },
  entrySub: { fontFamily: "Archivo_400Regular", fontSize: 11 },
  entryActions: { gap: 6 },
  empty: { textAlign: "center", fontFamily: "Archivo_400Regular" },
  sectionTitle: { fontFamily: "SpaceGrotesk_700Bold", fontSize: 16 },
  undoCard: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  undoText: { fontFamily: "Archivo_400Regular", fontSize: 12 },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "rgba(15,23,42,0.45)",
  },
  modalCard: { gap: 12 },
  modalActions: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
});
