import React, { useState } from 'react';
import { View, SafeAreaView, TextInput, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { t } from '@calai/shared';
import { Text } from '../../src/components/atoms/Text';
import { Button } from '../../src/components/atoms/Button';
import { useStore } from '../../src/store';

export default function OnboardingScreen() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const { goals, updateGoals, saveGoalsToApi } = useStore();

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
    else finishOnboarding();
  };

  const finishOnboarding = async () => {
    await saveGoalsToApi();
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#fffcf9]">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6 py-8">
        <View className="mb-8">
          <Text variant="caption" className="text-emerald-600 font-black uppercase">
            {t("Adım {step}/3", { step })}
          </Text>
          <View className="flex-row gap-1 mt-2">
            {[1, 2, 3].map((s) => (
              <View 
                key={s} 
                className={`h-1.5 flex-1 rounded-full ${s <= step ? 'bg-emerald-500' : 'bg-emerald-100'}`} 
              />
            ))}
          </View>
        </View>

        {step === 1 && (
          <View className="flex-1">
            <Text variant="h2" className="mb-4">{t("Hedef Kilonuz Nedir?")}</Text>
            <Text className="text-gray-500 mb-8">{t("Sizin için en uygun kalori planını oluşturmamıza yardımcı olun.")}</Text>
            <TextInput
              keyboardType="numeric"
              className="h-16 bg-white border border-emerald-100 rounded-3xl px-6 text-xl font-black text-gray-900"
              placeholder="70 kg"
              value={goals.weightGoalKg?.toString() || ''}
              onChangeText={(text) => updateGoals({ weightGoalKg: Number(text) })}
            />
          </View>
        )}

        {step === 2 && (
          <View className="flex-1">
            <Text variant="h2" className="mb-4">{t("Günlük Su Hedefiniz?")}</Text>
            <Text className="text-gray-500 mb-8">{t("Sağlıklı bir yaşam için günde en az 2-3 litre su içilmesi önerilir.")}</Text>
            <TextInput
              keyboardType="numeric"
              className="h-16 bg-white border border-emerald-100 rounded-3xl px-6 text-xl font-black text-gray-900"
              placeholder="2500 ml"
              value={goals.waterGoalMl?.toString() || ''}
              onChangeText={(text) => updateGoals({ waterGoalMl: Number(text) })}
            />
          </View>
        )}

        {step === 3 && (
          <View className="flex-1">
            <Text variant="h2" className="mb-4">{t("Günlük Kalori Hedefi?")}</Text>
            <Text className="text-gray-500 mb-8">{t("Vücudunuzun ihtiyacı olan enerjiyi belirleyin.")}</Text>
            <TextInput
              keyboardType="numeric"
              className="h-16 bg-white border border-emerald-100 rounded-3xl px-6 text-xl font-black text-gray-900"
              placeholder="2200 kcal"
              value={goals.calorieGoal?.toString() || ''}
              onChangeText={(text) => updateGoals({ calorieGoal: Number(text) })}
            />
          </View>
        )}

        <View className="mt-auto pt-8">
          <Button 
            label={step === 3 ? t("Tamamla") : t("Devam Et")} 
            onPress={nextStep} 
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
