import React from "react";
import { FlatList, View, ActivityIndicator } from "react-native";
import { FoodLibraryCard } from "../molecules/FoodLibraryCard";
import { FoodLibraryItem } from "@calai/shared";
import { Text } from "../atoms/Text";
import { Search } from "lucide-react-native";

interface Props {
  items: FoodLibraryItem[];
  isLoading?: boolean;
  onItemPress?: (item: FoodLibraryItem) => void;
  onItemAdd?: (item: FoodLibraryItem) => void;
  ListHeaderComponent?: React.ReactElement;
  emptyMessage?: string;
}

export function FoodLibraryList({
  items,
  isLoading,
  onItemPress,
  onItemAdd,
  ListHeaderComponent,
  emptyMessage = "Sonuc bulunamadi",
}: Props) {
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center py-10">
        <ActivityIndicator size="large" color="#10b981" />
      </View>
    );
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <FoodLibraryCard item={item} onPress={onItemPress} onAdd={onItemAdd} />
      )}
      contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={
        <View className="items-center justify-center py-10 px-4">
          <View className="w-16 h-16 bg-gray-50 rounded-full items-center justify-center mb-4">
            <Search size={24} className="text-gray-400" />
          </View>
          <Text className="text-gray-500 text-center">{emptyMessage}</Text>
        </View>
      }
    />
  );
}
