import { useState } from "react";
import { ScrollView, StyleSheet, View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useTracker } from "@/providers/TrackerProvider";
import { measurementLabels, measurementUnits } from "@/lib/measurements";
import { t } from "@/lib/i18n";

export function MeasurementsScreen() {
  const { measurements, addMeasurement, removeMeasurement, theme } = useTracker();
  const [type, setType] = useState<keyof typeof measurementLabels>("weight");
  const [value, setValue] = useState("");

  return (
    <LinearGradient colors={theme.gradient} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AppHeader title={t("Ölçümler")} subtitle={t("Vücut takibi")} theme={theme} />

        <Card theme={theme} style={styles.card}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{t("Yeni Ölçüm")}</Text>
          <View style={styles.typeRow}>
            {Object.entries(measurementLabels).map(([key, label]) => (
              <Pressable
                key={key}
                onPress={() => setType(key as keyof typeof measurementLabels)}
                style={[
                  styles.typeChip,
                  { borderColor: theme.border },
                  type === key && { backgroundColor: theme.accentSoft, borderColor: theme.accent },
                ]}
              >
                <Text style={{ color: type === key ? theme.accentText : theme.muted }}>{label}</Text>
              </Pressable>
            ))}
          </View>
          <Input
            value={value}
            onChangeText={setValue}
            placeholder={t("{value} değer", { value: measurementUnits[type] })}
            keyboardType="numeric"
            theme={theme}
          />
          <Button
            label={t("Ölçüm Ekle")}
            onPress={async () => {
              await addMeasurement({ type, value: Number(value || 0), unit: measurementUnits[type] });
              setValue("");
            }}
            theme={theme}
          />
        </Card>

        <Card theme={theme} style={styles.card}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{t("Geçmiş")}</Text>
          {measurements.map((entry) => (
            <View key={entry.id} style={styles.measureRow}>
              <View>
                <Text style={[styles.measureTitle, { color: theme.text }]}>{measurementLabels[entry.type]}</Text>
                <Text style={[styles.measureSub, { color: theme.muted }]}>{entry.timestamp}</Text>
              </View>
              <View style={styles.measureValueWrap}>
                <Text style={[styles.measureValue, { color: theme.text }]}>{entry.value}{entry.unit}</Text>
                <Button label={t("Sil")} onPress={() => removeMeasurement(entry.id)} theme={theme} variant="ghost" />
              </View>
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
  typeRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  typeChip: { borderWidth: 1, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  measureRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  measureTitle: { fontFamily: "Archivo_600SemiBold", fontSize: 13 },
  measureSub: { fontFamily: "Archivo_400Regular", fontSize: 11 },
  measureValueWrap: { alignItems: "flex-end" },
  measureValue: { fontFamily: "SpaceGrotesk_700Bold", fontSize: 16 },
});
