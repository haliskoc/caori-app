import React, { useMemo, useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { FoodLibraryItem, MealType, t } from "@calai/shared";
import { Text } from "../../../components/atoms/Text";
import { FoodLibraryList } from "../../../components/organisms/FoodLibraryList";
import api from "../../../api/axios-instance";
import { GlassCard } from "../../../components/atoms/GlassCard";
import { Search, Utensils, Info } from "lucide-react-native";

type FoodProduct = {
  product_name: string;
  nutriments?: {
    "energy-kcal_100g"?: number;
    proteins_100g?: number;
    fat_100g?: number;
    carbohydrates_100g?: number;
  };
  code: string;
  serving_size_g?: number;
};

interface Props {
  onAdd: (item: FoodLibraryItem, mealType: MealType) => void;
}

const MEAL_TYPES: MealType[] = ["breakfast", "lunch", "dinner", "snack"];

export function FoodSearchPanel({ onAdd }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<FoodLibraryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [mealType, setMealType] = useState<MealType>("snack");

  const normalizedQuery = query.trim();

  const handleSearch = async () => {
    if (!normalizedQuery) return;
    setLoading(true);
    try {
      const response = await api.get(
        `/food-search?q=${encodeURIComponent(normalizedQuery)}`,
      );
      const products = (response.data || []) as FoodProduct[];
      setResults(products.map(mapProductToItem));
    } catch (error) {
      try {
        const offUrl = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(normalizedQuery)}&search_simple=1&action=process&json=1`;
        const res = await fetch(offUrl);
        const data = await res.json();
        const products = (data?.products || []) as FoodProduct[];
        setResults(products.map(mapProductToItem));
      } catch {
        setResults([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const helperText = useMemo(() => {
    if (loading) return t("Aranıyor...");
    if (!normalizedQuery) return t("Ürün adıyla arama yapın.");
    if (results.length === 0) return t("Sonuç bulunamadı.");
    return "";
  }, [loading, normalizedQuery, results.length]);

  return (
    <GlassCard>
      <View className="flex-row items-center gap-3 mb-6">
        <View className="p-2 bg-emerald-100 rounded-xl">
          <Search size={24} color="#059669" />
        </View>
        <Text variant="h2" className="text-emerald-900">
          {t("Yemek Ara")}
        </Text>
      </View>

      <View className="gap-6">
        <View>
          <Text variant="caption" className="mb-3 uppercase font-black tracking-widest ml-1 text-emerald-800">
            {t("Öğün Türü")}
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {MEAL_TYPES.map((type) => (
              <TouchableOpacity
                key={type}
                onPress={() => setMealType(type)}
                className={`px-4 py-2.5 rounded-2xl border ${mealType === type
                    ? "bg-emerald-600 border-emerald-600 shadow-md shadow-emerald-100"
                    : "bg-white border-emerald-50"
                  }`}
                style={{ width: "48%" }}
              >
                <Text
                  className={`${mealType === type ? "text-white" : "text-emerald-700"
                    } font-black text-center text-xs`}
                >
                  {t(type.charAt(0).toUpperCase() + type.slice(1))}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View>
          <Text variant="caption" className="mb-2 uppercase font-black tracking-widest ml-1 text-emerald-800">
            {t("Ürün Adı")}
          </Text>
          <View className="flex-row items-center bg-white border border-emerald-50 rounded-2xl px-4 h-14 shadow-sm">
            <Utensils size={18} color="#059669" className="mr-3" />
            <TextInput
              className="flex-1 font-bold text-gray-900 h-full"
              placeholder={t("Örn: Yogurt, Tavuk, Salata")}
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={handleSearch}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={handleSearch}
          className="bg-emerald-600 rounded-[2rem] h-14 items-center justify-center shadow-lg shadow-emerald-200"
          disabled={loading}
        >
          <Text className="text-white font-black text-lg">
            {loading ? t("Aranıyor...") : t("Ara")}
          </Text>
        </TouchableOpacity>

        {helperText ? (
          <View className="flex-row items-center gap-2 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
            <Info size={16} color="#059669" />
            <Text className="text-emerald-800 font-bold text-xs">{helperText}</Text>
          </View>
        ) : (
          <View className="mt-2">
            <FoodLibraryList
              items={results}
              onItemAdd={(item) => onAdd(item, mealType)}
            />
          </View>
        )}
      </View>
    </GlassCard>
  );
}

function mapProductToItem(product: FoodProduct): FoodLibraryItem {
  const serving = product.serving_size_g || 100;
  const calories = Math.round(
    ((product.nutriments?.["energy-kcal_100g"] ?? 0) * serving) / 100,
  );
  const protein =
    Math.round((product.nutriments?.proteins_100g ?? 0) * serving) / 100;
  const carbs =
    Math.round((product.nutriments?.carbohydrates_100g ?? 0) * serving) / 100;
  const fat = Math.round((product.nutriments?.fat_100g ?? 0) * serving) / 100;

  return {
    id: product.code,
    name: product.product_name || t("Bilinmeyen Ürün"),
    servingSize: serving,
    servingUnit: "g",
    calories,
    proteinG: protein,
    carbsG: carbs,
    fatG: fat,
  };
}
