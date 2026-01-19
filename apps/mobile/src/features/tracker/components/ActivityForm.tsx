import React, { useMemo, useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { ActivityType, t } from "@calai/shared";
import { Text } from "../../../components/atoms/Text";
import { Button } from "../../../components/atoms/Button";
import { GlassCard } from "../../../components/atoms/GlassCard";
import { Activity, Clock, Flame, FileText } from "lucide-react-native";

interface Props {
  onSubmit: (data: {
    activityType: ActivityType;
    durationMin: number;
    estimatedCalories: number;
    note?: string;
  }) => void;
  loading?: boolean;
  weightKg?: number | null;
}

const ACTIVITY_OPTIONS: { type: ActivityType; label: string; met: number }[] = [
  { type: "walking", label: t("Yürüyüş"), met: 3.3 },
  { type: "running", label: t("Koşu"), met: 8.0 },
  { type: "gym", label: t("Ağırlık"), met: 6.0 },
  { type: "cycling", label: t("Bisiklet"), met: 6.8 },
  { type: "swimming", label: t("Yüzme"), met: 7.0 },
  { type: "yoga", label: t("Yoga"), met: 2.5 },
  { type: "hiit", label: t("HIIT"), met: 9.0 },
  { type: "pilates", label: t("Pilates"), met: 3.0 },
  { type: "stairs", label: t("Merdiven"), met: 8.8 },
];

const parseNumber = (value: string) => {
  const normalized = value.trim();
  if (!normalized) return NaN;
  const parsed = Number(normalized.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : NaN;
};

const estimateCalories = (input: {
  type: ActivityType;
  durationMin: number;
  weightKg?: number | null;
}) => {
  if (!Number.isFinite(input.durationMin) || input.durationMin <= 0) {
    return 0;
  }
  const weight =
    Number.isFinite(input.weightKg ?? NaN) && (input.weightKg ?? 0) > 0
      ? Number(input.weightKg)
      : 70;
  const config = ACTIVITY_OPTIONS.find((option) => option.type === input.type);
  const met = config?.met ?? 3;
  const hours = input.durationMin / 60;
  return Math.round(met * weight * hours);
};

export function ActivityForm({ onSubmit, loading, weightKg }: Props) {
  const [activityType, setActivityType] = useState<ActivityType>("walking");
  const [durationMin, setDurationMin] = useState("");
  const [calories, setCalories] = useState("");
  const [note, setNote] = useState("");

  const parsedDuration = useMemo(() => parseNumber(durationMin), [durationMin]);
  const estimatedCalories = useMemo(
    () =>
      estimateCalories({
        type: activityType,
        durationMin: Number.isFinite(parsedDuration) ? parsedDuration : 0,
        weightKg,
      }),
    [activityType, parsedDuration, weightKg],
  );

  const canSubmit =
    Number.isFinite(parsedDuration) && parsedDuration > 0 && !loading;

  const handleSubmit = () => {
    if (!canSubmit) return;
    const parsedCalories = parseNumber(calories);
    const finalCalories = Number.isFinite(parsedCalories)
      ? Math.round(parsedCalories)
      : estimatedCalories;

    onSubmit({
      activityType,
      durationMin: Math.round(parsedDuration),
      estimatedCalories: Math.max(0, finalCalories),
      note: note.trim() ? note.trim() : undefined,
    });

    setDurationMin("");
    setCalories("");
    setNote("");
  };

  return (
    <GlassCard>
      <View className="flex-row items-center gap-3 mb-6">
        <View className="p-2 bg-emerald-100 rounded-xl">
          <Activity size={24} color="#059669" />
        </View>
        <Text variant="h2" className="text-emerald-900">
          {t("Egzersiz Ekle")}
        </Text>
      </View>

      <View className="gap-6">
        <View>
          <Text variant="caption" className="mb-3 uppercase font-black tracking-widest ml-1 text-emerald-800">
            {t("Aktivite Türü")}
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {ACTIVITY_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.type}
                onPress={() => setActivityType(option.type)}
                className={`px-3 py-2.5 rounded-2xl border ${activityType === option.type
                    ? "bg-emerald-600 border-emerald-600 shadow-sm"
                    : "bg-white border-emerald-50"
                  }`}
              >
                <Text
                  className={`font-black text-xs ${activityType === option.type ? "text-white" : "text-emerald-700"
                    }`}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="flex-row gap-4">
          <View className="flex-1">
            <Text variant="caption" className="mb-2 uppercase font-black tracking-widest ml-1 text-emerald-800">
              {t("Süre (dk)")}
            </Text>
            <View className="flex-row items-center bg-white border border-emerald-50 rounded-2xl px-4 h-14 shadow-sm">
              <Clock size={18} color="#059669" className="mr-3" />
              <TextInput
                className="flex-1 font-bold text-gray-900 h-full text-lg"
                placeholder="0"
                keyboardType="numeric"
                value={durationMin}
                onChangeText={setDurationMin}
              />
            </View>
          </View>

          <View className="flex-1">
            <Text variant="caption" className="mb-2 uppercase font-black tracking-widest ml-1 text-emerald-800">
              {t("Kalori (kcal)")}
            </Text>
            <View className="flex-row items-center bg-white border border-emerald-50 rounded-2xl px-4 h-14 shadow-sm">
              <Flame size={18} color="#ef4444" className="mr-3" />
              <TextInput
                className="flex-1 font-bold text-gray-900 h-full text-lg"
                placeholder={String(estimatedCalories || 0)}
                keyboardType="numeric"
                value={calories}
                onChangeText={setCalories}
              />
            </View>
          </View>
        </View>

        <View>
          <Text variant="caption" className="mb-2 uppercase font-black tracking-widest ml-1 text-emerald-800">
            {t("Not (isteğe bağlı)")}
          </Text>
          <View className="flex-row items-start bg-white border border-emerald-50 rounded-2xl px-4 py-3 min-h-[100px] shadow-sm">
            <FileText size={18} color="#6b7280" className="mr-3 mt-1" />
            <TextInput
              className="flex-1 font-bold text-gray-900 text-base"
              placeholder={t("Örn: Koşu bandında tempolu yürüyüş")}
              value={note}
              onChangeText={setNote}
              multiline
              textAlignVertical="top"
            />
          </View>
        </View>

        <Button label={t("Kaydet")} onPress={handleSubmit} loading={loading} className="mt-2" />
      </View>
    </GlassCard>
  );
}
