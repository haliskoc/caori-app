import React from "react";
import { View } from "react-native";

export function BackgroundGlow() {
  return (
    <View pointerEvents="none" className="absolute inset-0">
      <View className="absolute -top-24 -right-20 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
      <View className="absolute bottom-0 -left-16 h-64 w-64 rounded-full bg-emerald-100/40 blur-3xl" />
    </View>
  );
}
