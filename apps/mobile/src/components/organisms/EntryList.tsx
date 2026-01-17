import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Entry, t } from '@calai/shared';
import { Text } from '../atoms/Text';
import { Utensils, Droplets, Activity, Moon, Coffee, Trash2 } from 'lucide-react-native';

interface Props {
  entries: Entry[];
  onDelete: (id: string) => void;
}

export function EntryList({ entries, onDelete }: Props) {
  if (entries.length === 0) {
    return (
      <View className="items-center justify-center py-20">
        <Text className="text-gray-400 font-bold">{t("Bu gün için kayıt bulunamadı.")}</Text>
      </View>
    );
  }

  return (
    <View className="space-y-3 px-4">
      {entries.map((entry) => (
        <View 
          key={entry.id}
          className="bg-white p-4 rounded-3xl border border-gray-50 flex-row items-center justify-between shadow-sm mb-3"
        >
          <View className="flex-row items-center gap-4">
            <View className={`p-3 rounded-2xl ${
              entry.type === 'food' ? 'bg-emerald-50' : 
              entry.type === 'water' ? 'bg-blue-50' : 
              entry.type === 'activity' ? 'bg-orange-50' : 'bg-purple-50'
            }`}>
              {entry.type === 'food' && <Utensils size={20} color="#10b981" />}
              {entry.type === 'water' && <Droplets size={20} color="#3b82f6" />}
              {entry.type === 'activity' && <Activity size={20} color="#f97316" />}
              {entry.type === 'sleep' && <Moon size={20} color="#a855f7" />}
              {entry.type === 'drink' && <Coffee size={20} color="#10b981" />}
            </View>
            
            <View>
              <Text className="font-black text-gray-900">
                {entry.type === 'food' ? entry.name : 
                 entry.type === 'water' ? t("Su") : 
                 entry.type === 'activity' ? entry.activityType : 
                 entry.type === 'drink' ? entry.name : t("Uyku")}
              </Text>
              <Text variant="caption">
                {entry.type === 'food' ? `${entry.calories} kcal • ${t(entry.mealType)}` : 
                 entry.type === 'water' ? `${entry.amountMl} ml` : 
                 entry.type === 'activity' ? `${entry.estimatedCalories} kcal • ${entry.durationMin} dk` : 
                 entry.type === 'drink' ? `${entry.calories} kcal • ${entry.amountMl} ml` : 
                 `${entry.durationMin} dk`}
              </Text>
            </View>
          </View>

          <TouchableOpacity 
            onPress={() => onDelete(entry.id)}
            className="p-2 bg-rose-50 rounded-xl"
          >
            <Trash2 size={16} color="#f43f5e" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}
