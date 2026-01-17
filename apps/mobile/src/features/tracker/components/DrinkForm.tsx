import React, { useMemo, useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { t } from "@calai/shared";
import { Text } from "../../../components/atoms/Text";
import { Button } from "../../../components/atoms/Button";

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
    <View className="space-y-6">
      <View>
        <Text variant="caption" className="mb-2 uppercase font-black">
          {t("İçecek Adı")}
        </Text>
        <TextInput
          className="h-14 bg-white border border-gray-100 rounded-2xl px-4 font-bold text-gray-900"
          placeholder={t("Örn: Filtre Kahve")}
          value={name}
          onChangeText={setName}
        />
      </View>

      <View>
        <Text variant="caption" className="mb-2 uppercase font-black">
          {t("Miktar (ml)")}
        </Text>
        <TextInput
          className="h-14 bg-white border border-gray-100 rounded-2xl px-4 font-bold text-gray-900"
          placeholder="0"
          keyboardType="numeric"
          value={amountMl}
          onChangeText={setAmountMl}
        />
        <View className="flex-row flex-wrap gap-2 mt-3">
          {QUICK_AMOUNTS.map((amount) => (
            <TouchableOpacity
              key={amount}
              onPress={() => setAmountMl(String(amount))}
              className={`px-4 py-2 rounded-2xl border ${
                parsedAmount === amount
                  ? "bg-emerald-600 border-emerald-600"
                  : "bg-white border-gray-100"
              }`}
            >
              <Text
                className={`font-bold ${
                  parsedAmount === amount ? "text-white" : "text-gray-600"
                }`}
              >
                {amount} ml
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View>
        <Text variant="caption" className="mb-2 uppercase font-black">
          {t("Kalori (kcal)")}
        </Text>
        <TextInput
          className="h-14 bg-white border border-gray-100 rounded-2xl px-4 font-bold text-gray-900"
          placeholder="0"
          keyboardType="numeric"
          value={calories}
          onChangeText={setCalories}
        />
      </View>

      <View className="flex-row gap-3">
        <View className="flex-1">
          <Text variant="caption" className="mb-2 uppercase font-black">
            {t("Protein (g)")}
          </Text>
          <TextInput
            className="h-12 bg-white border border-gray-100 rounded-2xl px-4 font-bold text-gray-900"
            placeholder="0"
            keyboardType="numeric"
            value={proteinG}
            onChangeText={setProteinG}
          />
        </View>
        <View className="flex-1">
          <Text variant="caption" className="mb-2 uppercase font-black">
            {t("Karbonhidrat (g)")}
          </Text>
          <TextInput
            className="h-12 bg-white border border-gray-100 rounded-2xl px-4 font-bold text-gray-900"
            placeholder="0"
            keyboardType="numeric"
            value={carbsG}
            onChangeText={setCarbsG}
          />
        </View>
      </View>

      <View>
        <Text variant="caption" className="mb-2 uppercase font-black">
          {t("Yağ (g)")}
        </Text>
        <TextInput
          className="h-12 bg-white border border-gray-100 rounded-2xl px-4 font-bold text-gray-900"
          placeholder="0"
          keyboardType="numeric"
          value={fatG}
          onChangeText={setFatG}
        />
      </View>

      <Button label={t("Kaydet")} onPress={handleSubmit} loading={loading} />
    </View>
  );
}
