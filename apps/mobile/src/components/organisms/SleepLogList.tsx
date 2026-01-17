import React from "react";
import { View } from "react-native";
import { Text } from "../atoms/Text";
import { SleepEntry } from "@calai/shared";
import { SleepLogItem } from "../molecules/SleepLogItem";

interface Props {
  entries: SleepEntry[];
  onEntryPress?: (entry: SleepEntry) => void;
}

export function SleepLogList({ entries, onEntryPress }: Props) {
  if (!entries || entries.length === 0) {
    return (
      <View className="p-8 items-center justify-center bg-gray-50 rounded-[2rem] border border-dashed border-gray-200">
        <Text className="text-gray-400 text-center">Henuz uyku kaydi yok</Text>
      </View>
    );
  }

  return (
    <View className="gap-2">
      <Text variant="h3" className="mb-2 ml-1 text-gray-900">
        Gecmis Kayitlar
      </Text>
      {entries.map((entry) => (
        <View key={entry.id} onTouchEnd={() => onEntryPress?.(entry)}>
          <SleepLogItem entry={entry} />
        </View>
      ))}
    </View>
  );
}
