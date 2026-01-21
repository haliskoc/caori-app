import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useTracker } from "@/providers/TrackerProvider";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { MealType, ActivityType } from "@calai/shared/types";
import { parseQuickText } from "@/lib/voice";
import { t } from "@/lib/i18n";

const TABS = ["food", "water", "drink", "activity", "sleep"] as const;

export function AddEntryScreen() {
  const navigation = useNavigation<any>();
  const { addFood, addWater, addDrink, addActivity, addSleep, theme } = useTracker();
  const [tab, setTab] = useState<(typeof TABS)[number]>("food");
  const [foodName, setFoodName] = useState("");
  const [foodCalories, setFoodCalories] = useState("");
  const [foodAmount, setFoodAmount] = useState("");
  const [foodProtein, setFoodProtein] = useState("");
  const [foodCarbs, setFoodCarbs] = useState("");
  const [foodFat, setFoodFat] = useState("");
  const [foodMeal, setFoodMeal] = useState<MealType>("snack");
  const [waterAmount, setWaterAmount] = useState("250");
  const [drinkName, setDrinkName] = useState("");
  const [drinkAmount, setDrinkAmount] = useState("");
  const [drinkCalories, setDrinkCalories] = useState("");
  const [activityType, setActivityType] = useState<ActivityType>("walking");
  const [activityDuration, setActivityDuration] = useState("");
  const [activityCalories, setActivityCalories] = useState("");
  const [sleepStart, setSleepStart] = useState("");
  const [sleepEnd, setSleepEnd] = useState("");
  const [sleepNote, setSleepNote] = useState("");
  const [quickText, setQuickText] = useState("");

  const mealLabels: Record<MealType, string> = {
    breakfast: t("Kahvaltı"),
    lunch: t("Öğle"),
    dinner: t("Akşam"),
    snack: t("Atıştırmalık"),
  };

  const activityLabels: Record<ActivityType, string> = {
    walking: t("Yürüyüş"),
    running: t("Koşu"),
    gym: t("Spor"),
    cycling: t("Bisiklet"),
    swimming: t("Yüzme"),
    yoga: t("Yoga"),
    hiit: t("HIIT"),
    pilates: t("Pilates"),
    stairs: t("Merdiven"),
  };

  const handleQuickParse = async () => {
    const parsed = parseQuickText(quickText);
    if (!parsed) return;
    if (parsed.kind === "water") {
      await addWater({ amountMl: parsed.data.amountMl });
    } else if (parsed.kind === "activity") {
      await addActivity(parsed.data);
    } else if (parsed.kind === "food") {
      await addFood(parsed.data);
    }
    setQuickText("");
  };

  const handleAddFood = async () => {
    await addFood({
      name: foodName,
      calories: Number(foodCalories || 0),
      mealType: foodMeal,
      amountG: Number(foodAmount || 0) || undefined,
      proteinG: Number(foodProtein || 0) || undefined,
      carbsG: Number(foodCarbs || 0) || undefined,
      fatG: Number(foodFat || 0) || undefined,
    });
    setFoodName("");
    setFoodCalories("");
    setFoodAmount("");
    setFoodProtein("");
    setFoodCarbs("");
    setFoodFat("");
  };

  const handleAddWater = async () => {
    await addWater({ amountMl: Number(waterAmount || 0) });
    setWaterAmount("250");
  };

  const handleAddDrink = async () => {
    await addDrink({
      name: drinkName,
      amountMl: Number(drinkAmount || 0),
      calories: Number(drinkCalories || 0),
    });
    setDrinkName("");
    setDrinkAmount("");
    setDrinkCalories("");
  };

  const handleAddActivity = async () => {
    await addActivity({
      activityType,
      durationMin: Number(activityDuration || 0),
      estimatedCalories: Number(activityCalories || 0),
    });
    setActivityDuration("");
    setActivityCalories("");
  };

  const handleAddSleep = async () => {
    await addSleep({
      sleepStart: sleepStart || new Date().toISOString(),
      sleepEnd: sleepEnd || new Date().toISOString(),
      note: sleepNote,
    });
    setSleepStart("");
    setSleepEnd("");
    setSleepNote("");
  };

  return (
    <LinearGradient colors={theme.gradient} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AppHeader title={t("Kayıt Ekle")} subtitle={t("Hızlı giriş")} theme={theme} onAction={() => navigation.navigate("Chat")} />

        <Card theme={theme} style={styles.quickCard}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{t("Hızlı Komut")}</Text>
          <Text style={[styles.sectionSub, { color: theme.muted }]}>{t("\"2 bardak su\" veya \"30 dk yürüdüm\"")}</Text>
          <Input
            value={quickText}
            onChangeText={setQuickText}
            placeholder={t("Komut yaz")}
            theme={theme}
          />
          <Button label={t("Analiz Et ve Kaydet")} onPress={handleQuickParse} theme={theme} />
        </Card>

        <View style={styles.tabRow}>
          {TABS.map((key) => (
            <Pressable
              key={key}
              onPress={() => setTab(key)}
              style={[
                styles.tabChip,
                { borderColor: theme.border },
                tab === key && { backgroundColor: theme.accentSoft, borderColor: theme.accent },
              ]}
            >
              <Text style={{ color: tab === key ? theme.accentText : theme.muted }}>{key.toUpperCase()}</Text>
            </Pressable>
          ))}
        </View>

        {tab === "food" && (
          <Card theme={theme} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>{t("Yemek Kaydı")}</Text>
              <Pressable onPress={() => navigation.navigate("FoodSearch")}>
                <Text style={[styles.link, { color: theme.accent }]}>{t("Ara")}</Text>
              </Pressable>
            </View>
            <Input value={foodName} onChangeText={setFoodName} placeholder={t("Yemek adı")} theme={theme} />
            <Input
              value={foodCalories}
              onChangeText={setFoodCalories}
              placeholder={t("Kalori")}
              keyboardType="numeric"
              theme={theme}
            />
            <Input
              value={foodAmount}
              onChangeText={setFoodAmount}
              placeholder={t("Miktar (g)")}
              keyboardType="numeric"
              theme={theme}
            />
            <View style={styles.macroRow}>
              <Input
                value={foodProtein}
                onChangeText={setFoodProtein}
                placeholder={t("Protein")}
                keyboardType="numeric"
                theme={theme}
                style={styles.macroInput}
              />
              <Input
                value={foodCarbs}
                onChangeText={setFoodCarbs}
                placeholder={t("Karb")}
                keyboardType="numeric"
                theme={theme}
                style={styles.macroInput}
              />
              <Input
                value={foodFat}
                onChangeText={setFoodFat}
                placeholder={t("Yağ")}
                keyboardType="numeric"
                theme={theme}
                style={styles.macroInput}
              />
            </View>
            <View style={styles.mealRow}>
              {Object.entries(mealLabels).map(([value, label]) => (
                <Pressable
                  key={value}
                  onPress={() => setFoodMeal(value as MealType)}
                  style={[
                    styles.mealChip,
                    { borderColor: theme.border },
                    foodMeal === value && { backgroundColor: theme.accentSoft, borderColor: theme.accent },
                  ]}
                >
                  <Text style={{ color: foodMeal === value ? theme.accentText : theme.muted }}>{label}</Text>
                </Pressable>
              ))}
            </View>
            <Button label={t("Yemek Kaydet")} onPress={handleAddFood} theme={theme} />
          </Card>
        )}

        {tab === "water" && (
          <Card theme={theme} style={styles.card}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>{t("Su Kaydı")}</Text>
            <Input
              value={waterAmount}
              onChangeText={setWaterAmount}
              placeholder={t("ml")}
              keyboardType="numeric"
              theme={theme}
            />
            <Button label={t("Su Ekle")} onPress={handleAddWater} theme={theme} />
          </Card>
        )}

        {tab === "drink" && (
          <Card theme={theme} style={styles.card}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>{t("İçecek Kaydı")}</Text>
            <Input value={drinkName} onChangeText={setDrinkName} placeholder={t("İçecek adı")} theme={theme} />
            <Input
              value={drinkAmount}
              onChangeText={setDrinkAmount}
              placeholder={t("Miktar (ml)")}
              keyboardType="numeric"
              theme={theme}
            />
            <Input
              value={drinkCalories}
              onChangeText={setDrinkCalories}
              placeholder={t("Kalori")}
              keyboardType="numeric"
              theme={theme}
            />
            <Button label={t("İçecek Kaydet")} onPress={handleAddDrink} theme={theme} />
          </Card>
        )}

        {tab === "activity" && (
          <Card theme={theme} style={styles.card}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>{t("Aktivite Kaydı")}</Text>
            <View style={styles.mealRow}>
              {Object.entries(activityLabels).map(([value, label]) => (
                <Pressable
                  key={value}
                  onPress={() => setActivityType(value as ActivityType)}
                  style={[
                    styles.mealChip,
                    { borderColor: theme.border },
                    activityType === value && { backgroundColor: theme.accentSoft, borderColor: theme.accent },
                  ]}
                >
                  <Text style={{ color: activityType === value ? theme.accentText : theme.muted }}>{label}</Text>
                </Pressable>
              ))}
            </View>
            <Input
              value={activityDuration}
              onChangeText={setActivityDuration}
              placeholder={t("Süre (dk)")}
              keyboardType="numeric"
              theme={theme}
            />
            <Input
              value={activityCalories}
              onChangeText={setActivityCalories}
              placeholder={t("Tahmini kalori")}
              keyboardType="numeric"
              theme={theme}
            />
            <Button label={t("Aktivite Kaydet")} onPress={handleAddActivity} theme={theme} />
          </Card>
        )}

        {tab === "sleep" && (
          <Card theme={theme} style={styles.card}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>{t("Uyku Kaydı")}</Text>
            <Input value={sleepStart} onChangeText={setSleepStart} placeholder={t("Başlangıç (2024-09-21T23:00)")} theme={theme} />
            <Input value={sleepEnd} onChangeText={setSleepEnd} placeholder={t("Bitiş (2024-09-22T07:00)")} theme={theme} />
            <Input value={sleepNote} onChangeText={setSleepNote} placeholder={t("Not")} theme={theme} />
            <Button label={t("Uyku Kaydet")} onPress={handleAddSleep} theme={theme} />
          </Card>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 120, gap: 16 },
  quickCard: { gap: 10 },
  tabRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  tabChip: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, borderWidth: 1 },
  card: { gap: 12 },
  sectionTitle: { fontSize: 16, fontFamily: "SpaceGrotesk_700Bold" },
  sectionSub: { fontSize: 12, fontFamily: "Archivo_400Regular" },
  mealRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  mealChip: { borderWidth: 1, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  macroRow: { flexDirection: "row", gap: 8 },
  macroInput: { flex: 1 },
  link: { fontFamily: "Archivo_600SemiBold" },
  cardHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
});
