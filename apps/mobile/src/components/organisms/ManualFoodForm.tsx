import React, { useState } from "react";
import { View, TextInput, ScrollView } from "react-native";
import { Text } from "../atoms/Text";
import { Button } from "../atoms/Button";
import { FoodLibraryItem } from "@calai/shared";
import { ChefHat, Scale, Flame } from "lucide-react-native";

interface Props {
  initialValues?: Partial<FoodLibraryItem>;
  onSubmit: (data: Omit<FoodLibraryItem, "id">) => void;
  isLoading?: boolean;
  onCancel?: () => void;
}

export function ManualFoodForm({
  initialValues,
  onSubmit,
  isLoading,
  onCancel,
}: Props) {
  const [name, setName] = useState(initialValues?.name || "");
  const [brand, setBrand] = useState(initialValues?.brand || "");
  const [servingSize, setServingSize] = useState(
    initialValues?.servingSize?.toString() || "100",
  );
  const [servingUnit, setServingUnit] = useState(
    initialValues?.servingUnit || "g",
  );
  const [calories, setCalories] = useState(
    initialValues?.calories?.toString() || "",
  );
  const [protein, setProtein] = useState(
    initialValues?.proteinG?.toString() || "",
  );
  const [carbs, setCarbs] = useState(initialValues?.carbsG?.toString() || "");
  const [fat, setFat] = useState(initialValues?.fatG?.toString() || "");

  const handleSubmit = () => {
    onSubmit({
      name,
      brand,
      servingSize: Number(servingSize) || 0,
      servingUnit,
      calories: Number(calories) || 0,
      proteinG: Number(protein) || 0,
      carbsG: Number(carbs) || 0,
      fatG: Number(fat) || 0,
      isCustom: true,
    });
  };

  return (
    <ScrollView className="bg-white rounded-[2.5rem] shadow-sm border border-emerald-50">
      <View className="p-6">
        <View className="flex-row items-center gap-3 mb-6">
          <View className="p-2 bg-emerald-100 rounded-xl">
            <ChefHat size={24} color="#059669" />
          </View>
          <Text variant="h2" className="text-emerald-900">
            Yemek Ekle
          </Text>
        </View>

        <View className="gap-4 mb-6">
          <View>
            <Text variant="caption" className="ml-1 mb-2">
              Yemek Adi
            </Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Orn: Izgara Tavuk"
              className="bg-gray-50 rounded-2xl p-4 border border-gray-100 text-base text-gray-900"
            />
          </View>

          <View>
            <Text variant="caption" className="ml-1 mb-2">
              Marka (Opsiyonel)
            </Text>
            <TextInput
              value={brand}
              onChangeText={setBrand}
              placeholder="Orn: Pinar"
              className="bg-gray-50 rounded-2xl p-4 border border-gray-100 text-base text-gray-900"
            />
          </View>
        </View>

        <View className="flex-row gap-4 mb-6">
          <View className="flex-1">
            <Text variant="caption" className="ml-1 mb-2">
              Miktar
            </Text>
            <View className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex-row items-center gap-2">
              <Scale size={16} className="text-gray-400" />
              <TextInput
                value={servingSize}
                onChangeText={setServingSize}
                keyboardType="numeric"
                className="flex-1 text-base text-gray-900 p-0"
              />
            </View>
          </View>

          <View className="flex-1">
            <Text variant="caption" className="ml-1 mb-2">
              Birim
            </Text>
            <TextInput
              value={servingUnit}
              onChangeText={setServingUnit}
              placeholder="g, ml, adet"
              className="bg-gray-50 rounded-2xl p-4 border border-gray-100 text-base text-gray-900"
            />
          </View>
        </View>

        <View className="mb-8">
          <Text variant="h3" className="text-gray-800 mb-4">
            Besin Degerleri
          </Text>

          <View className="gap-4">
            <MacroInput
              label="Kalori (kcal)"
              value={calories}
              onChange={setCalories}
              icon={<Flame size={16} className="text-orange-500" />}
              color="bg-orange-50 border-orange-100"
            />
            <MacroInput
              label="Protein (g)"
              value={protein}
              onChange={setProtein}
              color="bg-blue-50 border-blue-100"
              badge="P"
            />
            <MacroInput
              label="Karbonhidrat (g)"
              value={carbs}
              onChange={setCarbs}
              color="bg-amber-50 border-amber-100"
              badge="K"
            />
            <MacroInput
              label="Yag (g)"
              value={fat}
              onChange={setFat}
              color="bg-rose-50 border-rose-100"
              badge="Y"
            />
          </View>
        </View>

        <View className="gap-3">
          <Button label="Kaydet" onPress={handleSubmit} loading={isLoading} />
          {onCancel && (
            <Button
              label="Iptal"
              variant="ghost"
              onPress={onCancel}
              disabled={isLoading}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}

function MacroInput({
  label,
  value,
  onChange,
  icon,
  color,
  badge,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  icon?: React.ReactNode;
  color: string;
  badge?: string;
}) {
  return (
    <View
      className={`flex-row items-center justify-between p-4 rounded-2xl border ${color}`}
    >
      <View className="flex-row items-center gap-3">
        {icon}
        {badge && (
          <View className="w-6 h-6 rounded-full bg-white items-center justify-center shadow-sm">
            <Text className="text-xs font-bold text-gray-700">{badge}</Text>
          </View>
        )}
        <Text className="text-gray-700 font-medium">{label}</Text>
      </View>
      <TextInput
        value={value}
        onChangeText={onChange}
        keyboardType="numeric"
        placeholder="0"
        className="text-right text-lg font-bold text-gray-900 w-20 p-0"
      />
    </View>
  );
}
