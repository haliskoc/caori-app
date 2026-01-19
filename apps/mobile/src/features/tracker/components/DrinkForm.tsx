import React, { useMemo, useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { t } from "@calai/shared";
import { Text } from "../../../components/atoms/Text";
import { Button } from "../../../components/atoms/Button";
import { GlassCard } from "../../../components/atoms/GlassCard";
import { Coffee, Droplets, Flame, Database } from "lucide-react-native";

interface Props {
  onSubmit: (data: {
    name: string;
    amountMl: number;
    calories: number;
    proteinG?: number;
    carbsG?: number;
    fatG?: number;
  }) => void;
  loading?: boolean;
}

const QUICK_AMOUNTS = [200, 300, 500, 750];

const parseNumber = (value: string) => {
  const normalized = value.trim();
  if (!normalized) return NaN;
  const parsed = Number(normalized.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : NaN;
};

export function DrinkForm({ onSubmit, loading }: Props) {
  const [name, setName] = useState("");
  const [amountMl, setAmountMl] = useState("");
  const [calories, setCalories] = useState("");
  const [proteinG, setProteinG] = useState("");
  const [carbsG, setCarbsG] = useState("");
  const [fatG, setFatG] = useState("");

  const parsedAmount = useMemo(() => parseNumber(amountMl), [amountMl]);
  const canSubmit =
    Number.isFinite(parsedAmount) && parsedAmount > 0 && !loading;

  const handleSubmit = () => {
    if (!canSubmit) return;
    const parsedCalories = parseNumber(calories);
    const parsedProtein = parseNumber(proteinG);
    const parsedCarbs = parseNumber(carbsG);
    const parsedFat = parseNumber(fatG);

    onSubmit({
      name: name.trim() ? name.trim() : t("İçecek"),
      amountMl: Math.round(parsedAmount),
      calories: Number.isFinite(parsedCalories) ? Math.round(parsedCalories) : 0,
      proteinG: Number.isFinite(parsedProtein) ? parsedProtein : undefined,
      carbsG: Number.isFinite(parsedCarbs) ? parsedCarbs : undefined,
      fatG: Number.isFinite(parsedFat) ? parsedFat : undefined,
    });

    setName("");
    setAmountMl("");
    setCalories("");
    setProteinG("");
    setCarbsG("");
    setFatG("");
  };

  return (
    <GlassCard>
      <View className="flex-row items-center gap-3 mb-6">
        <View className="p-2 bg-emerald-100 rounded-xl">
          <Coffee size={24} color="#059669" />
        </View>
        <Text variant="h2" className="text-emerald-900">
          {t("İçecek Ekle")}
        </Text>
      </View>

      <View className="gap-6">
        <View>
          <Text variant="caption" className="mb-2 uppercase font-black tracking-widest ml-1 text-emerald-800">
            {t("İçecek Adı")}
          </Text>
          <View className="flex-row items-center bg-white border border-emerald-50 rounded-2xl px-4 h-14 shadow-sm">
            <Coffee size={18} color="#059669" className="mr-3" />
            <TextInput
              className="flex-1 font-bold text-gray-900 h-full"
              placeholder={t("Örn: Filtre Kahve")}
              value={name}
              onChangeText={setName}
            />
          </View>
        </View>

        <View>
          <Text variant="caption" className="mb-2 uppercase font-black tracking-widest ml-1 text-emerald-800">
            {t("Miktar (ml)")}
          </Text>
          <View className="flex-row items-center bg-white border border-emerald-50 rounded-2xl px-4 h-14 shadow-sm mb-3">
            <Droplets size={18} color="#3b82f6" className="mr-3" />
            <TextInput
              className="flex-1 font-bold text-gray-900 h-full text-lg"
              placeholder="0"
              keyboardType="numeric"
              value={amountMl}
              onChangeText={setAmountMl}
            />
          </View>
          <View className="flex-row flex-wrap gap-2">
            {QUICK_AMOUNTS.map((amount) => (
              <TouchableOpacity
                key={amount}
                onPress={() => setAmountMl(String(amount))}
                className={`px-4 py-2 rounded-xl border ${parsedAmount === amount
                    ? "bg-emerald-600 border-emerald-600 shadow-sm"
                    : "bg-white border-emerald-50"
                  }`}
              >
                <Text
                  className={`font-black text-xs ${parsedAmount === amount ? "text-white" : "text-emerald-700"
                    }`}
                >
                  {amount} ml
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View>
          <Text variant="caption" className="mb-2 uppercase font-black tracking-widest ml-1 text-emerald-800">
            {t("Kalori (kcal)")}
          </Text>
          <View className="flex-row items-center bg-white border border-emerald-50 rounded-2xl px-4 h-14 shadow-sm">
            <Flame size={18} color="#ef4444" className="mr-3" />
            <TextInput
              className="flex-1 font-bold text-gray-900 h-full"
              placeholder="0"
              keyboardType="numeric"
              value={calories}
              onChangeText={setCalories}
            />
          </View>
        </View>

        <View>
          <Text variant="caption" className="mb-3 uppercase font-black tracking-widest ml-1 text-emerald-800">
            {t("Besin Değerleri (İsteğe Bağlı)")}
          </Text>
          <View className="flex-row gap-3">
            <View className="flex-1">
              <View className="bg-white border border-emerald-50 rounded-2xl px-3 h-12 shadow-sm flex-row items-center">
                <Text className="text-[10px] font-black text-emerald-400 mr-2">P</Text>
                <TextInput
                  className="flex-1 font-bold text-gray-900 h-full text-xs"
                  placeholder="0g"
                  keyboardType="numeric"
                  value={proteinG}
                  onChangeText={setProteinG}
                />
              </View>
            </View>
            <View className="flex-1">
              <View className="bg-white border border-emerald-50 rounded-2xl px-3 h-12 shadow-sm flex-row items-center">
                <Text className="text-[10px] font-black text-amber-500 mr-2">C</Text>
                <TextInput
                  className="flex-1 font-bold text-gray-900 h-full text-xs"
                  placeholder="0g"
                  keyboardType="numeric"
                  value={carbsG}
                  onChangeText={setCarbsG}
                />
              </View>
            </View>
            <View className="flex-1">
              <View className="bg-white border border-emerald-50 rounded-2xl px-3 h-12 shadow-sm flex-row items-center">
                <Text className="text-[10px] font-black text-rose-400 mr-2">F</Text>
                <TextInput
                  className="flex-1 font-bold text-gray-900 h-full text-xs"
                  placeholder="0g"
                  keyboardType="numeric"
                  value={fatG}
                  onChangeText={setFatG}
                />
              </View>
            </View>
          </View>
        </View>

        <Button label={t("Kaydet")} onPress={handleSubmit} loading={loading} className="mt-2" />
      </View>
    </GlassCard>
  );
}
