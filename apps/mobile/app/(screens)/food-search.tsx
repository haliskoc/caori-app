import React, { useState, useEffect, useRef } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { t } from "@calai/shared";
import { useFoodLibraryStore, FoodLibraryItem } from "../../src/store/slices/foodLibrary.slice";
import { useStore } from "../../src/store";
import { AnimatedBackground } from "../../src/components/atoms/AnimatedBackground";
import { Text } from "../../src/components/atoms/Text";
import { THEME } from "../../src/theme";
import { haptic } from "../../src/utils/haptics";
import {
  X,
  Search,
  Clock,
  Star,
  TrendingUp,
  Flame,
  Plus,
  Heart,
  ChevronRight,
} from "lucide-react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function FoodSearchScreen() {
  const router = useRouter();
  const { addEntry } = useStore();
  const {
    getRecents,
    getFavorites,
    addRecent,
    addSearchHistory,
    getSearchHistory,
    clearSearchHistory,
    toggleFavorite,
    isFavorite,
  } = useFoodLibraryStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<FoodLibraryItem[]>([]);
  const [selectedTab, setSelectedTab] = useState<"recent" | "favorites">("recent");
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  // Mock food database
  const mockFoodDatabase: FoodLibraryItem[] = [
    { id: "1", name: "Elma", calories: 95, proteinG: 0.5, carbsG: 25, fatG: 0.3, category: "snack", isFavorite: false, createdAt: new Date().toISOString() },
    { id: "2", name: "Muz", calories: 105, proteinG: 1.3, carbsG: 27, fatG: 0.4, category: "snack", isFavorite: false, createdAt: new Date().toISOString() },
    { id: "3", name: "Yulaf Ezmesi", calories: 150, proteinG: 5, carbsG: 27, fatG: 3, category: "breakfast", isFavorite: false, createdAt: new Date().toISOString() },
    { id: "4", name: "Tavuk Göğsü", calories: 165, proteinG: 31, carbsG: 0, fatG: 3.6, category: "dinner", isFavorite: false, createdAt: new Date().toISOString() },
    { id: "5", name: "Pilav", calories: 130, proteinG: 2.7, carbsG: 28, fatG: 0.3, category: "lunch", isFavorite: false, createdAt: new Date().toISOString() },
    { id: "6", name: "Yumurta", calories: 78, proteinG: 6, carbsG: 0.6, fatG: 5, category: "breakfast", isFavorite: false, createdAt: new Date().toISOString() },
    { id: "7", name: "Yoğurt", calories: 59, proteinG: 10, carbsG: 3.6, fatG: 0.4, category: "breakfast", isFavorite: false, createdAt: new Date().toISOString() },
    { id: "8", name: "Kahve", calories: 5, proteinG: 0.3, carbsG: 0, fatG: 0, category: "drink", isFavorite: false, createdAt: new Date().toISOString() },
    { id: "9", name: "Et Döner", calories: 250, proteinG: 20, carbsG: 5, fatG: 18, category: "lunch", isFavorite: false, createdAt: new Date().toISOString() },
    { id: "10", name: "Salata", calories: 45, proteinG: 2, carbsG: 8, fatG: 0.5, category: "dinner", isFavorite: false, createdAt: new Date().toISOString() },
  ];

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim()) {
      const results = mockFoodDatabase.filter((food) =>
        food.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      addSearchHistory(query);
    }
  };

  const handleAddFood = (food: FoodLibraryItem) => {
    haptic.success();
    addEntry({
      type: "food",
      name: food.name,
      calories: food.calories,
      proteinG: food.proteinG,
      carbsG: food.carbsG,
      fatG: food.fatG,
      mealType: food.category || "snack",
      timestamp: new Date().toISOString(),
    } as any);

    // Add to recents
    addRecent(food);

    // Go back
    router.back();
  };

  const handleToggleFavorite = (food: FoodLibraryItem) => {
    haptic.light();
    toggleFavorite(food);
  };

  const recentFoods = getRecents();
  const favoriteFoods = getFavorites();
  const searchHistory = getSearchHistory();

  const displayFoods = searchQuery.trim()
    ? searchResults
    : selectedTab === "recent"
    ? recentFoods.length > 0
    ? recentFoods
    : mockFoodDatabase.slice(0, 5)
    : favoriteFoods.length > 0
    ? favoriteFoods
    : mockFoodDatabase.slice(0, 5);

  return (
    <View style={styles.container}>
      <AnimatedBackground />
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
            <X size={24} color={THEME.colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t("Gıda Arama")}</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color={THEME.colors.text.muted} />
          <TextInput
            style={styles.searchInput}
            placeholder={t("Gıda ara...")}
            placeholderTextColor={THEME.colors.text.muted}
            value={searchQuery}
            onChangeText={handleSearch}
            autoFocus
          />
          {searchQuery ? (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => {
                haptic.light();
                setSearchQuery("");
              }}
            >
              <X size={16} color={THEME.colors.text.muted} />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Tabs */}
        {!searchQuery && (
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[styles.tab, selectedTab === "recent" && styles.tabActive]}
              onPress={() => {
                haptic.tabSwitch();
                setSelectedTab("recent");
              }}
            >
              <Clock size={16} color={selectedTab === "recent" ? THEME.colors.primary[600] : THEME.colors.text.muted} />
              <Text style={[styles.tabText, selectedTab === "recent" && styles.tabTextActive]}>
                {t("Son Kullanılanlar")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, selectedTab === "favorites" && styles.tabActive]}
              onPress={() => {
                haptic.tabSwitch();
                setSelectedTab("favorites");
              }}
            >
              <Star size={16} color={selectedTab === "favorites" ? THEME.colors.primary[600] : THEME.colors.text.muted} />
              <Text style={[styles.tabText, selectedTab === "favorites" && styles.tabTextActive]}>
                {t("Favoriler")}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Search History */}
        {searchQuery && searchHistory.length > 0 && (
          <View style={styles.searchHistoryContainer}>
            <Text style={styles.sectionTitle}>{t("Son Aramalar")}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.historyScroll}>
              {searchHistory.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.historyChip}
                  onPress={() => {
                    haptic.light();
                    setSearchQuery(item.query);
                  }}
                >
                  <Text style={styles.historyChipText}>{item.query}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.historyClearButton}
                onPress={() => {
                  haptic.medium();
                  clearSearchHistory();
                }}
              >
                <Text style={styles.historyClearText}>{t("Temizle")}</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        )}

        {/* Food List */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {displayFoods.length === 0 ? (
            <View style={styles.emptyState}>
              <Search size={48} color={THEME.colors.text.muted} />
              <Text style={styles.emptyTitle}>{t("Sonuç Bulunamadı")}</Text>
              <Text style={styles.emptyText}>
                {t("Başka bir arama terimi deneyin")}
              </Text>
            </View>
          ) : (
            displayFoods.map((food, index) => (
              <Animated.View
                key={food.id}
                style={[
                  styles.foodItem,
                  { opacity: fadeAnim, transform: [{ translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20 * (index % 5), 0],
                  })}] },
                ]}
              >
                <TouchableOpacity
                  style={styles.foodContent}
                  onPress={() => handleAddFood(food)}
                  activeOpacity={0.7}
                >
                  <View style={styles.foodInfo}>
                    <Text style={styles.foodName}>{food.name}</Text>
                    <View style={styles.foodMacros}>
                      <View style={styles.macroItem}>
                        <Flame size={12} color={THEME.colors.semantic.error} />
                        <Text style={styles.macroText}>{food.calories} kcal</Text>
                      </View>
                      {food.proteinG && (
                        <View style={styles.macroItem}>
                          <TrendingUp size={12} color={THEME.colors.primary[500]} />
                          <Text style={styles.macroText}>{food.proteinG}g P</Text>
                        </View>
                      )}
                    </View>
                  </View>
                  <ChevronRight size={20} color={THEME.colors.text.muted} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.favoriteButton}
                  onPress={() => handleToggleFavorite(food)}
                >
                  <Heart
                    size={20}
                    color={isFavorite(food.id) ? THEME.colors.semantic.error : THEME.colors.text.muted}
                    fill={isFavorite(food.id) ? THEME.colors.semantic.error : "none"}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => handleAddFood(food)}
                >
                  <Plus size={20} color="#fff" />
                </TouchableOpacity>
              </Animated.View>
            ))
          )}
          <View style={styles.bottomSpacing} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background.primary,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: THEME.colors.text.primary,
  },
  headerSpacer: {
    width: 40,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: THEME.colors.primary[100],
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: THEME.colors.text.primary,
  },
  clearButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: THEME.colors.primary[50],
    alignItems: "center",
    justifyContent: "center",
  },
  tabsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 8,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: THEME.colors.primary[100],
  },
  tabActive: {
    backgroundColor: THEME.colors.primary[50],
    borderColor: THEME.colors.primary[300],
  },
  tabText: {
    fontSize: 13,
    fontWeight: "700",
    color: THEME.colors.text.muted,
  },
  tabTextActive: {
    color: THEME.colors.primary[700],
  },
  searchHistoryContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: THEME.colors.text.muted,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  historyScroll: {
    flexDirection: "row",
    gap: 8,
  },
  historyChip: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: THEME.colors.primary[100],
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  historyChipText: {
    fontSize: 13,
    fontWeight: "600",
    color: THEME.colors.text.secondary,
  },
  historyClearButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: THEME.colors.semantic.error + "15",
  },
  historyClearText: {
    fontSize: 13,
    fontWeight: "700",
    color: THEME.colors.semantic.error,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  foodItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: THEME.colors.primary[50],
    marginBottom: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  foodContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 16,
    fontWeight: "700",
    color: THEME.colors.text.primary,
    marginBottom: 4,
  },
  foodMacros: {
    flexDirection: "row",
    gap: 12,
  },
  macroItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  macroText: {
    fontSize: 12,
    fontWeight: "600",
    color: THEME.colors.text.secondary,
  },
  favoriteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: THEME.colors.primary[50],
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: THEME.colors.primary[600],
    alignItems: "center",
    justifyContent: "center",
    shadowColor: THEME.colors.primary[500],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: THEME.colors.text.primary,
    marginTop: 16,
  },
  emptyText: {
    fontSize: 14,
    fontWeight: "500",
    color: THEME.colors.text.secondary,
    marginTop: 8,
  },
  bottomSpacing: {
    height: 20,
  },
});
