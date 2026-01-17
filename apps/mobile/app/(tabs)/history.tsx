import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import { t, getDayKey } from '@calai/shared';
import { useStore } from '../../src/store';
import { HorizontalCalendar } from '../../src/components/organisms/HorizontalCalendar';
import { EntryList } from '../../src/components/organisms/EntryList';
import { Text } from '../../src/components/atoms/Text';

export default function HistoryScreen() {
  const [selectedDate, setSelectedDate] = useState(getDayKey(new Date()));
  const { entries, fetchEntries, deleteEntry, isLoading } = useStore();

  useEffect(() => {
    fetchEntries(selectedDate);
  }, [selectedDate]);

  const onRefresh = () => {
    fetchEntries(selectedDate);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#fffcf9]">
      <View className="px-4 pt-6">
        <Text variant="h1">{t("Geçmiş")}</Text>
      </View>

      <HorizontalCalendar 
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />

      <ScrollView 
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} tintColor="#10b981" />
        }
      >
        <View className="py-4">
          <EntryList 
            entries={entries} 
            onDelete={deleteEntry} 
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
