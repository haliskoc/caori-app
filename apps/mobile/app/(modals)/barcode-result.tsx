import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { t, getDayKey } from "@calai/shared";
import { X, Barcode, Flame, Check, Beef, Wheat, Droplet } from "lucide-react-native";
import { Text } from "../../src/components/atoms/Text";
import { AnimatedBackground } from "../../src/components/atoms/AnimatedBackground";
import { LiquidGlassCard } from "../../src/components/atoms/LiquidGlassCard";
import { THEME } from "../../src/theme";
import { searchByBarcode, FoodData } from "../../src/api/open-food-facts";
import { useStore } from "../../src/store";

export default function BarcodeResultModal() {
  const router = useRouter();
  const params = useLocalSearchParams<{ code?: string }>();
  const code = params.code ? decodeURIComponent(String(params.code)) : "";
  const [product, setProduct] = useState<FoodData | null>(null);
  const [loading, setLoading] = useState(false);
  const [amountG, setAmountG] = useState("100");
  const { addEntry, fetchDailySummary, isLoading } = useStore();

  useEffect(() => {
    let active = true;
    const load = async () => {
      if (!code) return;
      setLoading(true);
      try {
        const result = await searchByBarcode(code);
        if (active) {
          setProduct(result);
        }
      } catch (error) {
        if (active) setProduct(null);
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, [code]);

  const parsedAmount = useMemo(() => {
    const normalized = amountG.trim().replace(",", ".");
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : 0;
  }, [amountG]);

  const multiplier = parsedAmount > 0 ? parsedAmount / 100 : 0;
  const totalCalories = product ? Math.round(product.calories * multiplier) : 0;
  const totalProtein = product ? Math.round(product.protein * multiplier * 10) / 10 : 0;
  const totalCarbs = product ? Math.round(product.carbs * multiplier * 10) / 10 : 0;
  const totalFat = product ? Math.round(product.fat * multiplier * 10) / 10 : 0;

  const handleAdd = async () => {
    if (!product || parsedAmount <= 0) return;
    
    await addEntry({
      type: "food",
      name: product.name,
      brand: product.brand,
      calories: totalCalories,
      proteinG: totalProtein,
      carbsG: totalCarbs,
      fatG: totalFat,
      amountG: Math.round(parsedAmount),
      barcode: product.barcode,
      timestamp: new Date().toISOString(),
    });
    
    await fetchDailySummary(getDayKey(new Date()));
    router.replace("/(tabs)");
  };

  return (
    <View style={styles.container}>
      <AnimatedBackground />
      
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.headerIcon}>
              <Barcode size={20} color={THEME.colors.primary[600]} />
            </View>
            <View>
              <Text style={styles.headerTitle}>{t("Barkod Sonucu")}</Text>
              <Text style={styles.headerCode}>{code}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
            <X size={22} color={THEME.colors.text.muted} />
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Loading State */}
          {loading && (
            <LiquidGlassCard style={styles.card}>
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={THEME.colors.primary[500]} />
                <Text style={styles.loadingText}>{t("Ürün aranıyor...")}</Text>
              </View>
            </LiquidGlassCard>
          )}

          {/* Not Found State */}
          {!loading && !product && (
            <LiquidGlassCard style={styles.card}>
              <View style={styles.notFoundContainer}>
                <View style={styles.notFoundIcon}>
                  <X size={40} color={THEME.colors.semantic.error} />
                </View>
                <Text style={styles.notFoundTitle}>{t("Ürün Bulunamadı")}</Text>
                <Text style={styles.notFoundText}>
                  {t("Bu barkod Open Food Facts veritabanında bulunamadı.")}
                </Text>
                <TouchableOpacity 
                  style={styles.retryButton}
                  onPress={() => router.back()}
                >
                  <Text style={styles.retryButtonText}>{t("Tekrar Dene")}</Text>
                </TouchableOpacity>
              </View>
            </LiquidGlassCard>
          )}

          {/* Product Found */}
          {!loading && product && (
            <>
              {/* Product Info Card */}
              <LiquidGlassCard variant="elevated" style={styles.card}>
                <View style={styles.productHeader}>
                  {product.imageUrl ? (
                    <Image 
                      source={{ uri: product.imageUrl }} 
                      style={styles.productImage}
                    />
                  ) : (
                    <View style={[styles.productImage, styles.placeholderImage]}>
                      <Flame size={32} color={THEME.colors.primary[300]} />
                    </View>
                  )}
                  <View style={styles.productInfo}>
                    <Text style={styles.productName}>{product.name}</Text>
                    {product.brand && (
                      <Text style={styles.productBrand}>{product.brand}</Text>
                    )}
                    {product.nutritionGrade && (
                      <View style={[styles.gradeBadge, getGradeStyle(product.nutritionGrade)]}>
                        <Text style={styles.gradeText}>
                          Nutri-Score {product.nutritionGrade}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>

                <View style={styles.per100Info}>
                  <Text style={styles.per100Label}>{t("100g için")}</Text>
                  <Text style={styles.per100Value}>{product.calories} kcal</Text>
                </View>
              </LiquidGlassCard>

              {/* Portion Input Card */}
              <LiquidGlassCard style={styles.card}>
                <Text style={styles.sectionLabel}>{t("Porsiyon (gram)")}</Text>
                
                <View style={styles.presetRow}>
                  {[50, 100, 150, 200].map((amount) => (
                    <TouchableOpacity
                      key={amount}
                      style={[
                        styles.presetButton,
                        amountG === String(amount) && styles.presetButtonActive,
                      ]}
                      onPress={() => setAmountG(String(amount))}
                    >
                      <Text style={[
                        styles.presetText,
                        amountG === String(amount) && styles.presetTextActive,
                      ]}>
                        {amount}g
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <View style={styles.inputRow}>
                  <TextInput
                    style={styles.input}
                    value={amountG}
                    onChangeText={setAmountG}
                    keyboardType="numeric"
                    placeholder="100"
                    placeholderTextColor={THEME.colors.text.muted}
                  />
                  <Text style={styles.inputUnit}>g</Text>
                </View>

                {/* Calculated Nutrition */}
                <View style={styles.nutritionGrid}>
                  <View style={[styles.nutritionItem, styles.calorieItem]}>
                    <Flame size={22} color={THEME.colors.semantic.warning} />
                    <Text style={styles.nutritionValue}>{totalCalories}</Text>
                    <Text style={styles.nutritionLabel}>kcal</Text>
                  </View>
                  <View style={styles.nutritionItem}>
                    <Beef size={18} color={THEME.colors.macro.protein} />
                    <Text style={styles.nutritionValue}>{totalProtein}g</Text>
                    <Text style={styles.nutritionLabel}>{t("Protein")}</Text>
                  </View>
                  <View style={styles.nutritionItem}>
                    <Wheat size={18} color={THEME.colors.macro.carbs} />
                    <Text style={styles.nutritionValue}>{totalCarbs}g</Text>
                    <Text style={styles.nutritionLabel}>{t("Karb")}</Text>
                  </View>
                  <View style={styles.nutritionItem}>
                    <Droplet size={18} color={THEME.colors.macro.fat} />
                    <Text style={styles.nutritionValue}>{totalFat}g</Text>
                    <Text style={styles.nutritionLabel}>{t("Yağ")}</Text>
                  </View>
                </View>
              </LiquidGlassCard>

              {/* Add Button */}
              <TouchableOpacity 
                style={styles.addButton}
                onPress={handleAdd}
                disabled={isLoading || parsedAmount <= 0}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <>
                    <Check size={22} color="#fff" />
                    <Text style={styles.addButtonText}>{t("Öğün Olarak Ekle")}</Text>
                  </>
                )}
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const getGradeStyle = (grade: string) => {
  const gradeColors: Record<string, any> = {
    'A': { backgroundColor: '#22c55e' },
    'B': { backgroundColor: '#84cc16' },
    'C': { backgroundColor: '#eab308' },
    'D': { backgroundColor: '#f97316' },
    'E': { backgroundColor: '#ef4444' },
  };
  return gradeColors[grade] || { backgroundColor: THEME.colors.text.muted };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background.primary,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: THEME.colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: THEME.colors.text.primary,
  },
  headerCode: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.text.muted,
    marginTop: 2,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    marginBottom: 16,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 16,
  },
  loadingText: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.colors.text.muted,
  },
  notFoundContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  notFoundIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  notFoundTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: THEME.colors.text.primary,
    marginBottom: 8,
  },
  notFoundText: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.colors.text.muted,
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: THEME.colors.primary[100],
  },
  retryButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: THEME.colors.primary[700],
  },
  productHeader: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: THEME.colors.primary[50],
  },
  placeholderImage: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: '800',
    color: THEME.colors.text.primary,
    marginBottom: 4,
  },
  productBrand: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.colors.text.muted,
    marginBottom: 8,
  },
  gradeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  gradeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#fff',
  },
  per100Info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.primary[100],
  },
  per100Label: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.colors.text.muted,
  },
  per100Value: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME.colors.primary[600],
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.text.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  presetRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  presetButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 1,
    borderColor: THEME.colors.glass.border,
    alignItems: 'center',
  },
  presetButtonActive: {
    backgroundColor: THEME.colors.primary[600],
    borderColor: THEME.colors.primary[600],
  },
  presetText: {
    fontSize: 14,
    fontWeight: '700',
    color: THEME.colors.text.primary,
  },
  presetTextActive: {
    color: '#fff',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: THEME.colors.glass.border,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: THEME.colors.text.primary,
    paddingVertical: 14,
  },
  inputUnit: {
    fontSize: 16,
    fontWeight: '600',
    color: THEME.colors.text.muted,
  },
  nutritionGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  nutritionItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 1,
    borderColor: THEME.colors.glass.border,
    gap: 4,
  },
  calorieItem: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderColor: 'rgba(245, 158, 11, 0.2)',
  },
  nutritionValue: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME.colors.text.primary,
  },
  nutritionLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: THEME.colors.text.muted,
    textTransform: 'uppercase',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.colors.primary[600],
    borderRadius: 16,
    paddingVertical: 18,
    gap: 10,
    marginTop: 8,
    ...THEME.shadow.lg,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
  },
});
