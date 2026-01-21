import { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, View, Text, Pressable, Image } from "react-native";
import { CameraView, useCameraPermissions, type BarcodeScanningResult } from "expo-camera";
import { LinearGradient } from "expo-linear-gradient";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useTracker } from "@/providers/TrackerProvider";
import { searchLocalFoods } from "@/lib/food-search";
import { getFoodByBarcode, searchFood, OFFProduct } from "@/lib/food/off";
import { t } from "@/lib/i18n";

export function FoodSearchScreen() {
  const { addFoodLibraryItem, addFood, theme } = useTracker();
  const [query, setQuery] = useState("");
  const [scanning, setScanning] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [remoteResults, setRemoteResults] = useState<OFFProduct[]>([]);
  const [barcodeResult, setBarcodeResult] = useState<OFFProduct | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formatPer100 = (value: number) => t("{value} kcal / 100g", { value: Math.round(value) });
  const permissionGranted = permission?.granted ?? false;

  useEffect(() => {
    let active = true;
    if (query.trim().length < 2) {
      setRemoteResults([]);
      setError(null);
      return;
    }
    const handle = setTimeout(async () => {
      try {
        setLoading(true);
        const data = await searchFood(query.trim());
        if (active) {
          setRemoteResults(data);
          setError(null);
        }
      } catch {
        if (active) {
          setError(t("Bağlantı hatası. Sonra tekrar deneyin."));
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }, 500);
    return () => {
      active = false;
      clearTimeout(handle);
    };
  }, [query]);

  const results = useMemo(() => searchLocalFoods(query), [query]);

  return (
    <LinearGradient colors={theme.gradient} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AppHeader title={t("Yemek Ara")} subtitle={t("Yerel katalog")} theme={theme} />

        <Card theme={theme} style={styles.card}>
          <Input value={query} onChangeText={setQuery} placeholder={t("Ürün ara")} theme={theme} />
          <Button
            label={scanning ? t("Taramayı Durdur") : t("Barkod Tara")}
            onPress={async () => {
              if (!permissionGranted) {
                const nextPermission = await requestPermission();
                if (!nextPermission.granted) {
                  return;
                }
              }
              setScanning((prev) => !prev);
            }}
            theme={theme}
          />
          {permission && !permissionGranted && (
            <Text style={[styles.notice, { color: theme.muted }]}>
              {t("Kamera izni verilmedi. Ayarlardan izin verin.")}
            </Text>
          )}
          {scanning && permissionGranted && (
            <View style={styles.scannerWrap}>
              <CameraView
                onBarcodeScanned={({ data }: BarcodeScanningResult) => {
                  setQuery(data);
                  setScanning(false);
                  setBarcodeResult(null);
                  getFoodByBarcode(data)
                    .then((product) => {
                      if (product) {
                        setBarcodeResult(product);
                      } else {
                        setBarcodeResult(null);
                      }
                    })
                    .catch(() => undefined);
                }}
                style={StyleSheet.absoluteFillObject}
              />
            </View>
          )}
        </Card>

        <Card theme={theme} style={styles.card}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{t("Open Food Facts")}</Text>
          {loading && (
            <Text style={[styles.notice, { color: theme.muted }]}>{t("Yükleniyor...")}</Text>
          )}
          {error && <Text style={[styles.notice, { color: theme.muted }]}>{error}</Text>}
          {barcodeResult && (
            <View style={styles.resultRow}>
              <View style={styles.resultInfo}>
                {barcodeResult.image_url ? (
                  <Image source={{ uri: barcodeResult.image_url }} style={styles.thumb} />
                ) : null}
                <View>
                  <Text style={[styles.resultTitle, { color: theme.text }]}>{barcodeResult.product_name}</Text>
                  <Text style={[styles.resultSub, { color: theme.muted }]}>
                    {formatPer100(barcodeResult.nutriments["energy-kcal_100g"] ?? 0)}
                  </Text>
                </View>
              </View>
              <View style={styles.actions}>
                <Pressable
                  onPress={() =>
                    addFoodLibraryItem({
                      name: barcodeResult.product_name,
                      caloriesPer100: Math.round(barcodeResult.nutriments["energy-kcal_100g"] ?? 0),
                      proteinPer100: barcodeResult.nutriments.proteins_100g ?? undefined,
                      carbsPer100: barcodeResult.nutriments.carbohydrates_100g ?? undefined,
                      fatPer100: barcodeResult.nutriments.fat_100g ?? undefined,
                      source: "off",
                      barcode: barcodeResult.code,
                      imageUrl: barcodeResult.image_url,
                    })
                  }
                >
                  <Text style={{ color: theme.accent }}>{t("Kaydet")}</Text>
                </Pressable>
                <Pressable
                  onPress={() =>
                    addFood({
                      name: barcodeResult.product_name,
                      calories: Math.round(barcodeResult.nutriments["energy-kcal_100g"] ?? 0),
                      mealType: "snack",
                      proteinG: barcodeResult.nutriments.proteins_100g ?? undefined,
                      carbsG: barcodeResult.nutriments.carbohydrates_100g ?? undefined,
                      fatG: barcodeResult.nutriments.fat_100g ?? undefined,
                    })
                  }
                >
                  <Text style={{ color: theme.accent }}>{t("Ekle")}</Text>
                </Pressable>
              </View>
            </View>
          )}
          {remoteResults.map((item) => (
            <View key={item.code} style={styles.resultRow}>
              <View style={styles.resultInfo}>
                {item.image_url ? <Image source={{ uri: item.image_url }} style={styles.thumb} /> : null}
                <View>
                  <Text style={[styles.resultTitle, { color: theme.text }]}>{item.product_name}</Text>
                  <Text style={[styles.resultSub, { color: theme.muted }]}>
                    {formatPer100(item.nutriments["energy-kcal_100g"] ?? 0)}
                  </Text>
                </View>
              </View>
              <View style={styles.actions}>
                <Pressable
                  onPress={() =>
                    addFoodLibraryItem({
                      name: item.product_name,
                      caloriesPer100: Math.round(item.nutriments["energy-kcal_100g"] ?? 0),
                      proteinPer100: item.nutriments.proteins_100g ?? undefined,
                      carbsPer100: item.nutriments.carbohydrates_100g ?? undefined,
                      fatPer100: item.nutriments.fat_100g ?? undefined,
                      source: "off",
                      barcode: item.code,
                      imageUrl: item.image_url,
                    })
                  }
                >
                  <Text style={{ color: theme.accent }}>{t("Kaydet")}</Text>
                </Pressable>
                <Pressable
                  onPress={() =>
                    addFood({
                      name: item.product_name,
                      calories: Math.round(item.nutriments["energy-kcal_100g"] ?? 0),
                      mealType: "snack",
                      proteinG: item.nutriments.proteins_100g ?? undefined,
                      carbsG: item.nutriments.carbohydrates_100g ?? undefined,
                      fatG: item.nutriments.fat_100g ?? undefined,
                    })
                  }
                >
                  <Text style={{ color: theme.accent }}>{t("Ekle")}</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </Card>

        <Card theme={theme} style={styles.card}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{t("Yerel Katalog")}</Text>
          {results.map((item) => (
            <View key={item.id} style={styles.resultRow}>
              <View style={styles.resultInfo}>
                <View>
                  <Text style={[styles.resultTitle, { color: theme.text }]}>{item.name}</Text>
                  <Text style={[styles.resultSub, { color: theme.muted }]}>{formatPer100(item.caloriesPer100)}</Text>
                </View>
              </View>
              <View style={styles.actions}>
                <Pressable
                  onPress={() =>
                    addFoodLibraryItem({
                      name: item.name,
                      caloriesPer100: item.caloriesPer100,
                      proteinPer100: item.proteinPer100,
                      carbsPer100: item.carbsPer100,
                      fatPer100: item.fatPer100,
                      source: item.source,
                      barcode: item.barcode,
                      imageUrl: item.imageUrl,
                    })
                  }
                >
                  <Text style={{ color: theme.accent }}>{t("Kaydet")}</Text>
                </Pressable>
                <Pressable
                  onPress={() =>
                    addFood({
                      name: item.name,
                      calories: Math.round(item.caloriesPer100),
                      mealType: "snack",
                    })
                  }
                >
                  <Text style={{ color: theme.accent }}>{t("Ekle")}</Text>
                </Pressable>
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
  scannerWrap: {
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
  },
  sectionTitle: { fontFamily: "SpaceGrotesk_700Bold", fontSize: 16 },
  resultRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  resultTitle: { fontFamily: "Archivo_600SemiBold", fontSize: 13 },
  resultSub: { fontFamily: "Archivo_400Regular", fontSize: 11 },
  actions: { gap: 6, alignItems: "flex-end" },
  resultInfo: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1 },
  thumb: { width: 40, height: 40, borderRadius: 8, backgroundColor: "#e2e8f0" },
  notice: { fontFamily: "Archivo_400Regular", fontSize: 12 },
});
