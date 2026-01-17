import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Text } from "../atoms/Text";
import { Button } from "../atoms/Button";
import { SleepQuality } from "@calai/shared";
import { Moon, Sun, FileText } from "lucide-react-native";

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
    { value: "poor", label: "Kotu", color: "bg-red-500" },
    { value: "fair", label: "Orta", color: "bg-yellow-500" },
    { value: "good", label: "Iyi", color: "bg-emerald-500" },
    { value: "excellent", label: "Mukemmel", color: "bg-blue-500" },
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
    <View className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-emerald-50">
      <View className="flex-row items-center gap-3 mb-6">
        <View className="p-2 bg-emerald-100 rounded-xl">
          <Moon size={24} color="#059669" />
        </View>
        <Text variant="h2" className="text-emerald-900">
          Uyku Ekle
        </Text>
      </View>

      <View className="flex-row gap-4 mb-6">
        <View className="flex-1 gap-2">
          <Text variant="caption" className="ml-1">
            Uyku Baslangici
          </Text>
          <View className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex-row items-center gap-2">
            <Moon size={16} className="text-gray-400" />
            <TextInput
              value={startTime}
              onChangeText={setStartTime}
              placeholder="HH:mm"
              className="flex-1 font-bold text-lg text-gray-900 p-0"
              maxLength={5}
              keyboardType="numbers-and-punctuation"
            />
          </View>
        </View>

        <View className="flex-1 gap-2">
          <Text variant="caption" className="ml-1">
            Uyanis Zamani
          </Text>
          <View className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex-row items-center gap-2">
            <Sun size={16} className="text-gray-400" />
            <TextInput
              value={endTime}
              onChangeText={setEndTime}
              placeholder="HH:mm"
              className="flex-1 font-bold text-lg text-gray-900 p-0"
              maxLength={5}
              keyboardType="numbers-and-punctuation"
            />
          </View>
        </View>
      </View>

      <View className="mb-6 gap-2">
        <Text variant="caption" className="ml-1">
          Uyku Kalitesi
        </Text>
        <View className="flex-row gap-2">
          {QUALITY_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.value}
              onPress={() => setQuality(option.value)}
              className={`flex-1 p-3 rounded-2xl items-center justify-center border-2 ${
                quality === option.value
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-transparent bg-gray-50"
              }`}
            >
              <View className={`w-3 h-3 rounded-full mb-1 ${option.color}`} />
              <Text
                className={`text-xs font-bold ${
                  quality === option.value
                    ? "text-emerald-900"
                    : "text-gray-500"
                }`}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View className="mb-8 gap-2">
        <Text variant="caption" className="ml-1">
          Notlar
        </Text>
        <View className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex-row gap-2 min-h-[100px]">
          <FileText size={16} className="text-gray-400 mt-1" />
          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder="Uyku nasildi? Ruyalar, uyanmalar..."
            className="flex-1 text-base text-gray-900 p-0 leading-6"
            multiline
            textAlignVertical="top"
          />
        </View>
      </View>

      <Button label="Kaydet" onPress={handleSubmit} loading={isLoading} />
    </View>
  );
}
