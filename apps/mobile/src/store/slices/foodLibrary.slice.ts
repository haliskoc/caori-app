import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface FoodLibraryItem {
  id: string;
  name: string;
  calories: number;
  proteinG?: number;
  carbsG?: number;
  fatG?: number;
  servingSize?: string;
  brand?: string;
  barcode?: string;
  category?: "breakfast" | "lunch" | "dinner" | "snack" | "drink" | "other";
  isFavorite: boolean;
  lastUsedAt?: string;
  createdAt: string;
}

export interface FoodSearchHistory {
  id: string;
  query: string;
  timestamp: string;
}

interface FoodLibraryState {
  // Favorites
  favorites: FoodLibraryItem[];
  addFavorite: (item: Omit<FoodLibraryItem, "id" | "isFavorite" | "createdAt">) => void;
  removeFavorite: (id: string) => void;
  toggleFavorite: (item: FoodLibraryItem) => void;
  getFavorites: () => FoodLibraryItem[];
  getFavoritesByCategory: (category: string) => FoodLibraryItem[];
  isFavorite: (id: string) => boolean;

  // Recent foods
  recentFoods: FoodLibraryItem[];
  addRecent: (item: FoodLibraryItem) => void;
  getRecents: () => FoodLibraryItem[];

  // Search history
  searchHistory: FoodSearchHistory[];
  addSearchHistory: (query: string) => void;
  clearSearchHistory: () => void;
  getSearchHistory: () => FoodSearchHistory[];

  // Custom foods
  customFoods: FoodLibraryItem[];
  addCustomFood: (item: Omit<FoodLibraryItem, "id" | "createdAt">) => void;
  updateCustomFood: (id: string, updates: Partial<FoodLibraryItem>) => void;
  deleteCustomFood: (id: string) => void;
  getCustomFoods: () => FoodLibraryItem[];
}

const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const useFoodLibraryStore = create<FoodLibraryState>()(
  persist(
    (set, get) => ({
      // Initial state
      favorites: [],
      recentFoods: [],
      searchHistory: [],
      customFoods: [],

      // Favorites
      addFavorite: (item) => {
        const favorite: FoodLibraryItem = {
          ...item,
          id: generateId(),
          isFavorite: true,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          favorites: [...state.favorites, favorite],
        }));
      },

      removeFavorite: (id) => {
        set((state) => ({
          favorites: state.favorites.filter((f) => f.id !== id),
        }));
      },

      toggleFavorite: (item) => {
        const isFav = get().isFavorite(item.id);
        if (isFav) {
          get().removeFavorite(item.id);
        } else {
          // Add as favorite, omitting isFavorite and createdAt from input
          const { isFavorite: _, createdAt: __, ...itemToAdd } = item;
          get().addFavorite(itemToAdd);
        }
      },

      getFavorites: () => {
        return get().favorites.sort((a, b) => {
          if (!a.lastUsedAt && !b.lastUsedAt) return 0;
          if (!a.lastUsedAt) return 1;
          if (!b.lastUsedAt) return -1;
          return new Date(b.lastUsedAt).getTime() - new Date(a.lastUsedAt).getTime();
        });
      },

      getFavoritesByCategory: (category) => {
        return get()
          .favorites.filter((f) => f.category === category)
          .sort((a, b) => {
            if (!a.lastUsedAt && !b.lastUsedAt) return 0;
            if (!a.lastUsedAt) return 1;
            if (!b.lastUsedAt) return -1;
            return new Date(b.lastUsedAt).getTime() - new Date(a.lastUsedAt).getTime();
          });
      },

      isFavorite: (id) => {
        return get().favorites.some((f) => f.id === id);
      },

      // Recent foods
      addRecent: (item) => {
        // Update last used time for favorites
        const existingFavorite = get().favorites.find((f) => f.id === item.id);
        if (existingFavorite) {
          set((state) => ({
            favorites: state.favorites.map((f) =>
              f.id === item.id ? { ...f, lastUsedAt: new Date().toISOString() } : f
            ),
          }));
        }

        // Add to recents (keep only last 20)
        set((state) => {
          const filtered = state.recentFoods.filter((f) => f.id !== item.id);
          return {
            recentFoods: [item, ...filtered].slice(0, 20),
          };
        });
      },

      getRecents: () => {
        return get().recentFoods.slice(0, 10);
      },

      // Search history
      addSearchHistory: (query) => {
        if (!query.trim()) return;

        const historyItem: FoodSearchHistory = {
          id: generateId(),
          query: query.trim(),
          timestamp: new Date().toISOString(),
        };

        set((state) => {
          const filtered = state.searchHistory.filter((h) => h.query !== query);
          return {
            searchHistory: [historyItem, ...filtered].slice(0, 10),
          };
        });
      },

      clearSearchHistory: () => {
        set({ searchHistory: [] });
      },

      getSearchHistory: () => {
        return get().searchHistory;
      },

      // Custom foods
      addCustomFood: (item) => {
        const customFood: FoodLibraryItem = {
          ...item,
          id: generateId(),
          createdAt: new Date().toISOString(),
          isFavorite: item.isFavorite ?? false,
        };
        set((state) => ({
          customFoods: [...state.customFoods, customFood],
        }));
      },

      updateCustomFood: (id, updates) => {
        set((state) => ({
          customFoods: state.customFoods.map((f) =>
            f.id === id ? { ...f, ...updates } : f
          ),
        }));
      },

      deleteCustomFood: (id) => {
        set((state) => ({
          customFoods: state.customFoods.filter((f) => f.id !== id),
          favorites: state.favorites.filter((f) => f.id !== id),
        }));
      },

      getCustomFoods: () => {
        return get().customFoods;
      },
    }),
    {
      name: "food-library-storage",
      partialize: (state) => ({
        favorites: state.favorites,
        recentFoods: state.recentFoods,
        searchHistory: state.searchHistory,
        customFoods: state.customFoods,
      }),
    }
  )
);

// Selectors
export const selectFavorites = (state: FoodLibraryState) => state.getFavorites();
export const selectRecents = (state: FoodLibraryState) => state.getRecents();
export const selectCustomFoods = (state: FoodLibraryState) => state.getCustomFoods();
