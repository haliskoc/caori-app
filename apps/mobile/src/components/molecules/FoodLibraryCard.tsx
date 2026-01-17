import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "../atoms/Text";
import { FoodLibraryItem } from "@calai/shared";
import { Plus, Flame } from "lucide-react-native";

interface Props {
  item: FoodLibraryItem;
  onPress?: (item: FoodLibraryItem) => void;
  onAdd?: (item: FoodLibraryItem) => void;
}

export function FoodLibraryCard({ item, onPress, onAdd }: Props) {
  return (
    <TouchableOpacity
      onPress={() => onPress?.(item)}
      activeOpacity={0.7}
      className="bg-white rounded-2xl p-4 mb-3 border border-gray-100 shadow-sm flex-row items-center justify-between"
    >
      <View className="flex-1 mr-4">
        <Text variant="h3" className="text-gray-900 mb-1" numberOfLines={1}>
          {item.name}
        </Text>
        {item.brand && (
          <Text variant="caption" className="text-gray-500 mb-2">
            {item.brand}
          </Text>
        )}

        <View className="flex-row items-center gap-3">
          <View className="flex-row items-center gap-1">
            <Flame size={14} className="text-orange-500" />
            <Text variant="caption" className="text-gray-600 font-medium">
              {item.calories} kcal
            </Text>
          </View>

          <View className="w-[1px] h-3 bg-gray-200" />

          <Text variant="caption" className="text-gray-500">
            {item.servingSize} {item.servingUnit}
          </Text>
        </View>

        <View className="flex-row gap-2 mt-3">
          <MacroBadge
            label="P"
            value={item.proteinG}
            color="bg-blue-50 text-blue-700"
          />
          <MacroBadge
            label="K"
            value={item.carbsG}
            color="bg-amber-50 text-amber-700"
          />
          <MacroBadge
            label="Y"
            value={item.fatG}
            color="bg-rose-50 text-rose-700"
          />
        </View>
      </View>

      {onAdd && (
        <TouchableOpacity
          onPress={() => onAdd(item)}
          className="w-10 h-10 rounded-full bg-emerald-50 items-center justify-center border border-emerald-100"
        >
          <Plus size={20} className="text-emerald-600" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

function MacroBadge({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <View className={`px-2 py-0.5 rounded-md ${color.split(" ")[0]}`}>
      <Text className={`text-[10px] font-bold ${color.split(" ")[1]}`}>
        {label}: {value}g
      </Text>
    </View>
  );
}
