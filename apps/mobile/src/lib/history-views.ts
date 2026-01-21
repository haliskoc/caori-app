import AsyncStorage from "@react-native-async-storage/async-storage";

export type HistoryView = {
  id: string;
  name: string;
  filters: {
    type: string;
    rangeDays: number;
    query: string;
    mealType: string;
    sort: "desc" | "asc";
  };
};

function keyFor(userId: string) {
  return `calai.history.views.${userId}`;
}

export async function loadHistoryViews(userId: string): Promise<HistoryView[]> {
  try {
    const raw = await AsyncStorage.getItem(keyFor(userId));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as HistoryView[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveHistoryViews(userId: string, views: HistoryView[]) {
  await AsyncStorage.setItem(keyFor(userId), JSON.stringify(views));
}
