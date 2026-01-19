import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { t, MealType } from "@calai/shared";
import { Text } from "../../../components/atoms/Text";
import { Button } from "../../../components/atoms/Button";
import { GlassCard } from "../../../components/atoms/GlassCard";
import { Utensils, Flame, Info } from "lucide-react-native";

interface Props {
  onSubmit: (data: {
    name: string;
    calories: number;
    mealType: MealType;
  }) => void;
  loading?: boolean;
}

const MEAL_OPTIONS: { id: MealType; label: string }[] = [
  { id: "breakfast", label: t("Kahvaltı") },
  { id: "lunch", label: t("Öğle") },
  { id: "dinner", label: t("Akşam") },
  { id: "snack", label: t("Atıştırmalık") },
];

export function FoodForm({ onSubmit, loading }: Props) {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [mealType, setMealType] = useState<MealType>("breakfast");

  const handleSubmit = () => {
    if (!name || !calories) return;
    onSubmit({
      name,
      calories: Number(calories),
      mealType,
    });
    setName("");
    setCalories("");
  };

  return (
    <GlassCard>
      <View className="flex-row items-center gap-3 mb-6">
        <View className="p-2 bg-emerald-100 rounded-xl">
          <Utensils size={24} color="#059669" />
        </View>
        <Text variant="h2" className="text-emerald-900">
          {t("Manuel Yemek Ekle")}
        </Text>
      </View>

      <View className="gap-6">
        <View>
          <Text variant="caption" className="mb-3 uppercase font-black tracking-widest ml-1 text-emerald-800">
            {t("Öğün Türü")}
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {MEAL_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.id}
                onPress={() => setMealType(option.id)}
                className={`px-4 py-2.5 rounded-2xl border ${mealType === option.id
                    ? "bg-emerald-600 border-emerald-600 shadow-md shadow-emerald-100"
                    : "bg-white border-emerald-50"
                  }`}
                style={{ width: "48%" }}
              >
                <Text
                  className={`${mealType === option.id ? "text-white" : "text-emerald-700"
                    } font-black text-center text-xs`}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View>
          <Text variant="caption" className="mb-2 uppercase font-black tracking-widest ml-1 text-emerald-800">
            {t("Yemek Adı")}
          </Text>
          <View className="flex-row items-center bg-white border border-emerald-50 rounded-2xl px-4 h-14 shadow-sm">
            <Info size={18} color="#059669" className="mr-3" />
            <TextInput
              className="flex-1 font-bold text-gray-900 h-full"
              placeholder={t("Örn: Tavuklu Salata")}
              value={name}
              onChangeText={setName}
            />
          </View>
        </View>

        <View>
          <Text variant="caption" className="mb-2 uppercase font-black tracking-widest ml-1 text-emerald-800">
            {t("Kalori (kcal)")}
          </Text>
          <View className="flex-row items-center bg-white border border-emerald-50 rounded-2xl px-4 h-14 shadow-sm">
            <Flame size={18} color="#ef4444" className="mr-3" />
            <TextInput
              className="flex-1 font-bold text-gray-900 h-full text-lg"
              placeholder="0"
              keyboardType="numeric"
              value={calories}
              onChangeText={setCalories}
            />
          </View>
        </View>

        <Button
          label={t("Kaydet")}
          onPress={handleSubmit}
          loading={loading}
          className="mt-2"
        />
      </View>
    </GlassCard>
  );
}
