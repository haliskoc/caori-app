import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { t, MealType } from '@calai/shared';
import { Text } from '../../../components/atoms/Text';
import { Button } from '../../../components/atoms/Button';

interface Props {
  onSubmit: (data: { name: string; calories: number; mealType: MealType }) => void;
  loading?: boolean;
}

export function FoodForm({ onSubmit, loading }: Props) {
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [mealType, setMealType] = useState<MealType>('breakfast');

  const handleSubmit = () => {
    if (!name || !calories) return;
    onSubmit({
      name,
      calories: Number(calories),
      mealType,
    });
    setName('');
    setCalories('');
  };

  const mealTypes: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack'];

  return (
    <View className="space-y-6">
      <View>
        <Text variant="caption" className="mb-2 uppercase font-black">{t("Öğün Türü")}</Text>
        <View className="flex-row flex-wrap gap-2">
          {mealTypes.map((type) => (
            <TouchableOpacity
              key={type}
              onPress={() => setMealType(type)}
              className={`px-4 py-2 rounded-2xl border ${mealType === type ? 'bg-emerald-600 border-emerald-600' : 'bg-white border-gray-100'}`}
            >
              <Text className={`${mealType === type ? 'text-white' : 'text-gray-600'} font-bold`}>
                {t(type.charAt(0).toUpperCase() + type.slice(1))}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View>
        <Text variant="caption" className="mb-2 uppercase font-black">{t("Yemek Adı")}</Text>
        <TextInput
          className="h-14 bg-white border border-gray-100 rounded-2xl px-4 font-bold text-gray-900"
          placeholder={t("Örn: Tavuklu Salata")}
          value={name}
          onChangeText={setName}
        />
      </View>

      <View>
        <Text variant="caption" className="mb-2 uppercase font-black">{t("Kalori (kcal)")}</Text>
        <TextInput
          className="h-14 bg-white border border-gray-100 rounded-2xl px-4 font-bold text-gray-900"
          placeholder="0"
          keyboardType="numeric"
          value={calories}
          onChangeText={setCalories}
        />
      </View>

      <Button 
        label={t("Kaydet")} 
        onPress={handleSubmit} 
        loading={loading}
      />
    </View>
  );
}

import { TouchableOpacity } from 'react-native';
