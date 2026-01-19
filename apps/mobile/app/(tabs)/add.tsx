import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { getDayKey, t } from "@calai/shared";
import { useStore } from "../../src/store";
import { AnimatedBackground } from "../../src/components/atoms/AnimatedBackground";
import { LiquidGlassCard } from "../../src/components/atoms/LiquidGlassCard";
import { Text } from "../../src/components/atoms/Text";
import { THEME } from "../../src/theme";
import {
  Barcode,
  Search,
  ChevronLeft,
  Plus,
  X,
  Check,
  Flame,
  Beef,
  Wheat,
  Droplet,
} from "lucide-react-native";
import { searchByBarcode, searchByName, FoodData } from "../../src/api/open-food-facts";

export default function AddScreen() {
  const router = useRouter();
  const { addEntry, fetchDailySummary, isLoading } = useStore();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FoodData[]>([]);
  const [searching, setSearching] = useState(false);
  const [selectedFood, setSelectedFood] = useState<FoodData | null>(null);
  const [servingAmount, setServingAmount] = useState('100');
  const [addingFood, setAddingFood] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setSearching(true);
    try {
      const results = await searchByName(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setSearching(false);
    }
  };

  const handleBarcodeResult = async (barcode: string) => {
    setSearching(true);
    try {
      const product = await searchByBarcode(barcode);
      if (product) {
        setSelectedFood(product);
      }
    } catch (error) {
      console.error('Barcode error:', error);
    } finally {
      setSearching(false);
    }
  };

  const handleSelectFood = (food: FoodData) => {
    setSelectedFood(food);
    setServingAmount('100');
  };

  const calculateNutrition = (food: FoodData, amount: number) => {
    const multiplier = amount / 100;
    return {
      calories: Math.round(food.calories * multiplier),
      protein: Math.round(food.protein * multiplier * 10) / 10,
      carbs: Math.round(food.carbs * multiplier * 10) / 10,
      fat: Math.round(food.fat * multiplier * 10) / 10,
    };
  };

  const handleAddFood = async () => {
    if (!selectedFood) return;
    
    setAddingFood(true);
    const amount = parseFloat(servingAmount) || 100;
    const nutrition = calculateNutrition(selectedFood, amount);
    
    try {
      await addEntry({
        type: 'food',
        name: selectedFood.name,
        brand: selectedFood.brand,
        calories: nutrition.calories,
        proteinG: nutrition.protein,
        carbsG: nutrition.carbs,
        fatG: nutrition.fat,
        amountG: amount,
        barcode: selectedFood.barcode,
        timestamp: new Date().toISOString(),
      });
      
      const today = getDayKey(new Date());
      await fetchDailySummary(today);
      
      setSelectedFood(null);
      setSearchQuery('');
      setSearchResults([]);
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Add food error:', error);
    } finally {
      setAddingFood(false);
    }
  };

  const currentNutrition = selectedFood 
    ? calculateNutrition(selectedFood, parseFloat(servingAmount) || 100)
    : null;

  return (
    <View style={styles.container}>
      <AnimatedBackground />
      
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ChevronLeft size={24} color={THEME.colors.text.primary} />
            </TouchableOpacity>
            <View style={styles.headerTitle}>
              <Text style={styles.title}>{t('Yemek Ekle')}</Text>
              <Text style={styles.subtitle}>{t('Barkod tara veya ara')}</Text>
            </View>
            <TouchableOpacity
              style={styles.barcodeButton}
              onPress={() => router.push('/(modals)/barcode-scanner')}
            >
              <Barcode size={24} color={THEME.colors.primary[600]} />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <LiquidGlassCard variant="subtle" noPadding>
              <View style={styles.searchInputWrapper}>
                <Search size={20} color={THEME.colors.text.muted} />
                <TextInput
                  style={styles.searchInput}
                  placeholder={t('Yemek ara...')}
                  placeholderTextColor={THEME.colors.text.muted}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  onSubmitEditing={handleSearch}
                  returnKeyType="search"
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity onPress={() => setSearchQuery('')}>
                    <X size={18} color={THEME.colors.text.muted} />
                  </TouchableOpacity>
                )}
              </View>
            </LiquidGlassCard>
          </View>

          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Loading State */}
            {searching && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={THEME.colors.primary[500]} />
                <Text style={styles.loadingText}>{t('Aranıyor...')}</Text>
              </View>
            )}

            {/* Selected Food Detail */}
            {selectedFood && !searching && (
              <LiquidGlassCard variant="elevated" style={styles.selectedCard}>
                {/* Close Button */}
                <TouchableOpacity
                  style={styles.closeSelectedButton}
                  onPress={() => setSelectedFood(null)}
                >
                  <X size={20} color={THEME.colors.text.muted} />
                </TouchableOpacity>

                {/* Food Info */}
                <View style={styles.selectedHeader}>
                  {selectedFood.imageUrl ? (
                    <Image 
                      source={{ uri: selectedFood.imageUrl }} 
                      style={styles.selectedImage}
                    />
                  ) : (
                    <View style={[styles.selectedImage, styles.placeholderImage]}>
                      <Flame size={32} color={THEME.colors.primary[300]} />
                    </View>
                  )}
                  <View style={styles.selectedInfo}>
                    <Text style={styles.selectedName}>{selectedFood.name}</Text>
                    {selectedFood.brand && (
                      <Text style={styles.selectedBrand}>{selectedFood.brand}</Text>
                    )}
                    {selectedFood.nutritionGrade && (
                      <View style={[styles.gradeBadge, getGradeStyle(selectedFood.nutritionGrade)]}>
                        <Text style={styles.gradeText}>{selectedFood.nutritionGrade}</Text>
                      </View>
                    )}
                  </View>
                </View>

                {/* Serving Size Input */}
                <View style={styles.servingSection}>
                  <Text style={styles.servingLabel}>{t('Porsiyon (g)')}</Text>
                  <View style={styles.servingInputRow}>
                    {[50, 100, 150, 200].map((amount) => (
                      <TouchableOpacity
                        key={amount}
                        style={[
                          styles.servingPreset,
                          servingAmount === String(amount) && styles.servingPresetActive,
                        ]}
                        onPress={() => setServingAmount(String(amount))}
                      >
                        <Text style={[
                          styles.servingPresetText,
                          servingAmount === String(amount) && styles.servingPresetTextActive,
                        ]}>
                          {amount}g
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  <View style={styles.customServingRow}>
                    <TextInput
                      style={styles.servingInput}
                      value={servingAmount}
                      onChangeText={setServingAmount}
                      keyboardType="numeric"
                      placeholder="100"
                      placeholderTextColor={THEME.colors.text.muted}
                    />
                    <Text style={styles.servingUnit}>g</Text>
                  </View>
                </View>

                {/* Nutrition Info */}
                {currentNutrition && (
                  <View style={styles.nutritionGrid}>
                    <View style={[styles.nutritionItem, styles.calorieItem]}>
                      <Flame size={20} color={THEME.colors.semantic.warning} />
                      <Text style={styles.nutritionValue}>{currentNutrition.calories}</Text>
                      <Text style={styles.nutritionLabel}>kcal</Text>
                    </View>
                    <View style={styles.nutritionItem}>
                      <Beef size={18} color={THEME.colors.macro.protein} />
                      <Text style={styles.nutritionValue}>{currentNutrition.protein}g</Text>
                      <Text style={styles.nutritionLabel}>{t('Protein')}</Text>
                    </View>
                    <View style={styles.nutritionItem}>
                      <Wheat size={18} color={THEME.colors.macro.carbs} />
                      <Text style={styles.nutritionValue}>{currentNutrition.carbs}g</Text>
                      <Text style={styles.nutritionLabel}>{t('Karb')}</Text>
                    </View>
                    <View style={styles.nutritionItem}>
                      <Droplet size={18} color={THEME.colors.macro.fat} />
                      <Text style={styles.nutritionValue}>{currentNutrition.fat}g</Text>
                      <Text style={styles.nutritionLabel}>{t('Yağ')}</Text>
                    </View>
                  </View>
                )}

                {/* Add Button */}
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={handleAddFood}
                  disabled={addingFood}
                >
                  {addingFood ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <>
                      <Check size={20} color="#fff" />
                      <Text style={styles.addButtonText}>{t('Ekle')}</Text>
                    </>
                  )}
                </TouchableOpacity>
              </LiquidGlassCard>
            )}

            {/* Search Results */}
            {!selectedFood && searchResults.length > 0 && !searching && (
              <View style={styles.resultsContainer}>
                <Text style={styles.resultsTitle}>
                  {searchResults.length} {t('sonuç bulundu')}
                </Text>
                {searchResults.map((food, index) => (
                  <TouchableOpacity
                    key={`${food.barcode}-${index}`}
                    onPress={() => handleSelectFood(food)}
                  >
                    <LiquidGlassCard variant="subtle" style={styles.resultCard}>
                      <View style={styles.resultRow}>
                        {food.imageUrl ? (
                          <Image 
                            source={{ uri: food.imageUrl }} 
                            style={styles.resultImage}
                          />
                        ) : (
                          <View style={[styles.resultImage, styles.placeholderImage]}>
                            <Flame size={20} color={THEME.colors.primary[300]} />
                          </View>
                        )}
                        <View style={styles.resultInfo}>
                          <Text style={styles.resultName} numberOfLines={2}>
                            {food.name}
                          </Text>
                          {food.brand && (
                            <Text style={styles.resultBrand}>{food.brand}</Text>
                          )}
                          <View style={styles.resultNutrition}>
                            <Text style={styles.resultCalories}>
                              {food.calories} kcal
                            </Text>
                            <Text style={styles.resultServing}>/ 100g</Text>
                          </View>
                        </View>
                        <Plus size={24} color={THEME.colors.primary[500]} />
                      </View>
                    </LiquidGlassCard>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Empty State */}
            {!selectedFood && searchResults.length === 0 && !searching && searchQuery.length === 0 && (
              <View style={styles.emptyState}>
                <View style={styles.emptyIcon}>
                  <Search size={48} color={THEME.colors.primary[200]} />
                </View>
                <Text style={styles.emptyTitle}>{t('Yemek Ara')}</Text>
                <Text style={styles.emptySubtitle}>
                  {t('Yukarıdaki arama kutusunu kullan veya barkod tara')}
                </Text>
                
                <TouchableOpacity
                  style={styles.scanButton}
                  onPress={() => router.push('/(modals)/barcode-scanner')}
                >
                  <Barcode size={24} color="#fff" />
                  <Text style={styles.scanButtonText}>{t('Barkod Tara')}</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* No Results */}
            {!selectedFood && searchResults.length === 0 && !searching && searchQuery.length > 0 && (
              <View style={styles.emptyState}>
                <Text style={styles.emptyTitle}>{t('Sonuç bulunamadı')}</Text>
                <Text style={styles.emptySubtitle}>
                  {t('Başka bir arama terimi deneyin')}
                </Text>
              </View>
            )}

            <View style={styles.bottomSpacing} />
          </ScrollView>
        </KeyboardAvoidingView>
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
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: THEME.colors.glass.border,
  },
  headerTitle: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: THEME.colors.text.primary,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.colors.text.muted,
    marginTop: 2,
  },
  barcodeButton: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: THEME.colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: THEME.colors.primary[200],
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: THEME.colors.text.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.colors.text.muted,
  },
  selectedCard: {
    marginBottom: 20,
  },
  closeSelectedButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: THEME.colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedHeader: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  selectedImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: THEME.colors.primary[50],
  },
  placeholderImage: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  selectedName: {
    fontSize: 18,
    fontWeight: '800',
    color: THEME.colors.text.primary,
    marginBottom: 4,
  },
  selectedBrand: {
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
    fontSize: 12,
    fontWeight: '800',
    color: '#fff',
  },
  servingSection: {
    marginBottom: 20,
  },
  servingLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.text.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  servingInputRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  servingPreset: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 1,
    borderColor: THEME.colors.glass.border,
    alignItems: 'center',
  },
  servingPresetActive: {
    backgroundColor: THEME.colors.primary[600],
    borderColor: THEME.colors.primary[600],
  },
  servingPresetText: {
    fontSize: 14,
    fontWeight: '700',
    color: THEME.colors.text.primary,
  },
  servingPresetTextActive: {
    color: '#fff',
  },
  customServingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: THEME.colors.glass.border,
  },
  servingInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: THEME.colors.text.primary,
    paddingVertical: 12,
  },
  servingUnit: {
    fontSize: 16,
    fontWeight: '600',
    color: THEME.colors.text.muted,
  },
  nutritionGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
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
    paddingVertical: 16,
    gap: 8,
    ...THEME.shadow.md,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
  },
  resultsContainer: {
    gap: 12,
  },
  resultsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: THEME.colors.text.muted,
    marginBottom: 4,
  },
  resultCard: {
    marginBottom: 8,
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  resultImage: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: THEME.colors.primary[50],
  },
  resultInfo: {
    flex: 1,
  },
  resultName: {
    fontSize: 15,
    fontWeight: '700',
    color: THEME.colors.text.primary,
    marginBottom: 2,
  },
  resultBrand: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.text.muted,
    marginBottom: 4,
  },
  resultNutrition: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  resultCalories: {
    fontSize: 14,
    fontWeight: '800',
    color: THEME.colors.primary[600],
  },
  resultServing: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.text.muted,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: THEME.colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: THEME.colors.text.primary,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.colors.text.muted,
    textAlign: 'center',
    marginBottom: 24,
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.colors.primary[600],
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    gap: 10,
    ...THEME.shadow.md,
  },
  scanButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
  },
  bottomSpacing: {
    height: 120,
  },
});
