import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Text } from "../atoms/Text";
import { Button } from "../atoms/Button";
import { SleepQuality, t } from "@calai/shared";
import { Moon, Sun, FileText, Info } from "lucide-react-native";
import { GlassCard } from "../atoms/GlassCard";

interface SleepFormData {
  sleepStart: string;
  sleepEnd: string;
  quality: SleepQuality;
  note: string;
}

interface Props {
  initialValues?: Partial<SleepFormData>;
  onSubmit: (data: SleepFormData) => void;
  isLoading?: boolean;
}

const QUALITY_OPTIONS: { value: SleepQuality; label: string; color: string }[] =
  [
    { value: "poor", label: t("Kötü"), color: "#ef4444" },
    { value: "fair", label: t("Orta"), color: "#f59e0b" },
    { value: "good", label: t("İyi"), color: "#10b981" },
    { value: "excellent", label: t("Mükemmel"), color: "#3b82f6" },
  ];

export function SleepEntryForm({ initialValues, onSubmit, isLoading }: Props) {
  const [startTime, setStartTime] = useState(
    initialValues?.sleepStart || "23:00",
  );
  const [endTime, setEndTime] = useState(initialValues?.sleepEnd || "07:00");
  const [quality, setQuality] = useState<SleepQuality>(
    initialValues?.quality || "good",
  );
  const [note, setNote] = useState(initialValues?.note || "");

  const handleSubmit = () => {
    onSubmit({
      sleepStart: startTime,
      sleepEnd: endTime,
      quality,
      note,
    });
  };

  return (
    <GlassCard>
      <View className="flex-row items-center gap-3 mb-6">
        <View className="p-2 bg-emerald-100 rounded-xl">
          <Moon size={24} color="#059669" />
        </View>
        <Text variant="h2" className="text-emerald-900">
          {t("Uyku Ekle")}
        </Text>
      </View>

      <View className="gap-6">
        <View className="flex-row gap-4">
          <View className="flex-1">
            <Text variant="caption" className="mb-2 uppercase font-black tracking-widest ml-1 text-emerald-800">
              {t("Yatma")}
            </Text>
            <View className="flex-row items-center bg-white border border-emerald-50 rounded-2xl px-4 h-14 shadow-sm">
              <Moon size={18} color="#059669" className="mr-3" />
              <TextInput
                className="flex-1 font-bold text-gray-900 h-full text-lg"
                placeholder="23:00"
                value={startTime}
                onChangeText={setStartTime}
                maxLength={5}
                keyboardType="numbers-and-punctuation"
              />
            </View>
          </View>

          <View className="flex-1">
            <Text variant="caption" className="mb-2 uppercase font-black tracking-widest ml-1 text-emerald-800">
              {t("Uyanma")}
            </Text>
            <View className="flex-row items-center bg-white border border-emerald-50 rounded-2xl px-4 h-14 shadow-sm">
              <Sun size={18} color="#f59e0b" className="mr-3" />
              <TextInput
                className="flex-1 font-bold text-gray-900 h-full text-lg"
                placeholder="07:00"
                value={endTime}
                onChangeText={setEndTime}
                maxLength={5}
                keyboardType="numbers-and-punctuation"
              />
            </View>
          </View>
        </View>

        <View>
          <Text variant="caption" className="mb-3 uppercase font-black tracking-widest ml-1 text-emerald-800">
            {t("Uyku Kalitesi")}
          </Text>
          <View className="flex-row gap-2">
            {QUALITY_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => setQuality(option.value)}
                className={`flex-1 p-3 rounded-2xl items-center justify-center border ${quality === option.value
                  ? "border-emerald-500 bg-emerald-600 shadow-md shadow-emerald-100"
                  : "border-emerald-50 bg-white"
                  }`}
              >
                <View
                  className={`w-2 h-2 rounded-full mb-1`}
                  style={{ backgroundColor: quality === option.value ? "white" : option.color }}
                />
                <Text
                  className={`text-[10px] font-black ${quality === option.value ? "text-white" : "text-emerald-700"
                    }`}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View>
          <Text variant="caption" className="mb-2 uppercase font-black tracking-widest ml-1 text-emerald-800">
            {t("Notlar")}
          </Text>
          <View className="flex-row items-start bg-white border border-emerald-50 rounded-2xl px-4 py-3 min-h-[100px] shadow-sm">
            <FileText size={18} color="#6b7280" className="mr-3 mt-1" />
            <TextInput
              className="flex-1 font-bold text-gray-900 text-base"
              placeholder={t("Uyku nasıldı?")}
              value={note}
              onChangeText={setNote}
              multiline
              textAlignVertical="top"
            />
          </View>
        </View>

        <View className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex-row items-center gap-3">
          <Info size={18} color="#059669" />
          <View className="flex-1">
            <Text className="text-emerald-900 font-black text-xs">{t("Uyku Analizi")}</Text>
            <Text className="text-emerald-700 text-[10px] font-bold">
              {t("Derin uyku ve REM analizi yakında aktif edilecek.")}
            </Text>
          </View>
        </View>

        <Button label={t("Kaydet")} onPress={handleSubmit} loading={isLoading} className="mt-2" />
      </View>
    </GlassCard>
  );
}
