import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { format, subDays } from 'date-fns';
import { tr, enUS } from 'date-fns/locale';
import { Text } from '../atoms/Text';
import { getDayKey } from '@calai/shared';

interface Props {
  selectedDate: string;
  onDateChange: (date: string) => void;
  locale?: string;
}

export function HorizontalCalendar({ selectedDate, onDateChange, locale = 'tr' }: Props) {
  const dateLocale = locale === 'tr' ? tr : enUS;
  const days = Array.from({ length: 14 }).map((_, i) => subDays(new Date(), i)).reverse();

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      className="flex-row py-4"
      contentContainerStyle={{ paddingHorizontal: 16 }}
    >
      {days.map((date) => {
        const dateKey = getDayKey(date);
        const isSelected = selectedDate === dateKey;
        const dayName = format(date, 'EEE', { locale: dateLocale });
        const dayNumber = format(date, 'd');

        return (
          <TouchableOpacity
            key={dateKey}
            onPress={() => onDateChange(dateKey)}
            className={`mr-3 items-center justify-center w-14 h-20 rounded-3xl border ${
              isSelected ? 'bg-emerald-600 border-emerald-600' : 'bg-white border-gray-100'
            }`}
          >
            <Text className={`text-[10px] font-black uppercase ${isSelected ? 'text-emerald-100' : 'text-gray-400'}`}>
              {dayName}
            </Text>
            <Text className={`text-lg font-black mt-1 ${isSelected ? 'text-white' : 'text-gray-900'}`}>
              {dayNumber}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
