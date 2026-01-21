import { useState } from "react";
import { ScrollView, StyleSheet, View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useTracker } from "@/providers/TrackerProvider";
import { t } from "@/lib/i18n";

export function FoodLibraryScreen() {
  const navigation = useNavigation<any>();
  const { foodLibrary, addFoodLibraryItem, toggleFoodLibraryFavorite, theme } = useTracker();
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");

  return (
    <LinearGradient colors={theme.gradient} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AppHeader title={t("Kütüphane")} subtitle={t("Kayıtlı ürünler")} theme={theme} />

        <Card theme={theme} style={styles.card}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{t("Yeni Ürün")}</Text>
          <Input value={name} onChangeText={setName} placeholder={t("Ürün adı")} theme={theme} />
          <Input value={calories} onChangeText={setCalories} placeholder={t("Kalori/100g")} keyboardType="numeric" theme={theme} />
          <Button
            label={t("Ürün Ekle")}
            onPress={async () => {
              await addFoodLibraryItem({ name, caloriesPer100: Number(calories || 0) });
              setName("");
              setCalories("");
            }}
            theme={theme}
          />
          <Button
            label={t("Gıda Ara")}
            onPress={() => navigation.navigate("FoodSearch")}
            theme={theme}
            variant="secondary"
          />
        </Card>

        <Card theme={theme} style={styles.card}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{t("Liste")}</Text>
          {foodLibrary.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <View>
                <Text style={[styles.itemTitle, { color: theme.text }]}>{item.name}</Text>
                <Text style={[styles.itemSub, { color: theme.muted }]}>
                  {t("{value} kcal", { value: item.caloriesPer100 })}
                </Text>
              </View>
              <Pressable onPress={() => toggleFoodLibraryFavorite(item.id, !item.favorite)}>
                <Text style={{ color: item.favorite ? theme.accent : theme.muted }}>
                  {item.favorite ? "★" : "☆"}
                </Text>
              </Pressable>
            </View>
          ))}
        </Card>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 120, gap: 12 },
  card: { gap: 12 },
  sectionTitle: { fontFamily: "SpaceGrotesk_700Bold", fontSize: 16 },
  itemRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  itemTitle: { fontFamily: "Archivo_600SemiBold", fontSize: 13 },
  itemSub: { fontFamily: "Archivo_400Regular", fontSize: 11 },
});
