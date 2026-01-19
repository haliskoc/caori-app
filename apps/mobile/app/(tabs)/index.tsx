import React, { useEffect, useState, useCallback } from 'react';
import { 
  View, 
  ScrollView, 
  RefreshControl, 
  StyleSheet, 
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { t, getDayKey } from '@calai/shared';
import { useStore } from '../../src/store';
import { AnimatedBackground } from '../../src/components/atoms/AnimatedBackground';
import { CalorieSummaryWidget } from '../../src/components/organisms/CalorieSummaryWidget';
import { QuickCalorieAddWidget } from '../../src/components/organisms/QuickCalorieAddWidget';
import { WaterTrackingWidget } from '../../src/components/organisms/WaterTrackingWidget';
import { WeeklyCalorieChart } from '../../src/components/organisms/WeeklyCalorieChart';
import { Text } from '../../src/components/atoms/Text';
import { THEME } from '../../src/theme';
import { Bot, Bell } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const router = useRouter();
  const { 
    dailySummary, 
    fetchDailySummary, 
    isLoading, 
    addEntry, 
    goals,
    fetchReportData,
  } = useStore();

  const today = getDayKey(new Date());
  const [weeklyData, setWeeklyData] = useState<any[]>([]);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting(t('Günaydın'));
    } else if (hour < 18) {
      setGreeting(t('İyi Günler'));
    } else {
      setGreeting(t('İyi Akşamlar'));
    }
  }, []);

  useEffect(() => {
    fetchDailySummary(today);
    loadWeeklyData();
  }, []);

  const loadWeeklyData = async () => {
    const reportData = await fetchReportData(7);
    if (reportData?.dailySummaries) {
      setWeeklyData(reportData.dailySummaries);
    } else {
      // Mock data for demonstration
      setWeeklyData([
        { date: '2026-01-13', caloriesIn: 1800, caloriesOut: 300 },
        { date: '2026-01-14', caloriesIn: 2100, caloriesOut: 450 },
        { date: '2026-01-15', caloriesIn: 1950, caloriesOut: 200 },
        { date: '2026-01-16', caloriesIn: 2200, caloriesOut: 500 },
        { date: '2026-01-17', caloriesIn: 1700, caloriesOut: 350 },
        { date: '2026-01-18', caloriesIn: 2000, caloriesOut: 400 },
        { date: '2026-01-19', caloriesIn: dailySummary?.caloriesIn || 0, caloriesOut: dailySummary?.caloriesOut || 0 },
      ]);
    }
  };

  const onRefresh = useCallback(() => {
    fetchDailySummary(today);
    loadWeeklyData();
  }, [today]);

  const handleAddWater = async (amount: number) => {
    await addEntry({
      type: 'water',
      amountMl: amount,
      timestamp: new Date().toISOString(),
    });
    fetchDailySummary(today);
  };

  const handleQuickCalorieAdd = async (amount: number) => {
    await addEntry({
      type: 'food',
      name: t('Hızlı Ekleme'),
      calories: amount,
      timestamp: new Date().toISOString(),
    });
    fetchDailySummary(today);
  };

  const formatDate = () => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    };
    return new Date().toLocaleDateString('tr-TR', options);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <AnimatedBackground />
      
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={onRefresh}
              tintColor={THEME.colors.primary[500]}
              colors={[THEME.colors.primary[500]]}
            />
          }
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.greeting}>{greeting}</Text>
              <Text style={styles.date}>{formatDate()}</Text>
            </View>
            <View style={styles.headerRight}>
              <TouchableOpacity 
                style={styles.headerButton}
                onPress={() => {/* Notifications */}}
              >
                <Bell size={22} color={THEME.colors.text.secondary} strokeWidth={2} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.headerButton, styles.aiButton]}
                onPress={() => router.push('/(modals)/ai-assistant')}
              >
                <Bot size={22} color={THEME.colors.primary[600]} strokeWidth={2} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Daily Summary Widget */}
          <View style={styles.section}>
            <CalorieSummaryWidget
              caloriesIn={dailySummary?.caloriesIn || 0}
              caloriesOut={dailySummary?.caloriesOut || 0}
              proteinG={dailySummary?.proteinG || 0}
              carbsG={dailySummary?.carbsG || 0}
              fatG={dailySummary?.fatG || 0}
              calorieGoal={goals?.calorieGoal || 2000}
              proteinGoalG={goals?.proteinGoalG || 150}
              carbsGoalG={goals?.carbsGoalG || 250}
              fatGoalG={goals?.fatGoalG || 65}
            />
          </View>

          {/* Quick Calorie Add */}
          <View style={styles.section}>
            <QuickCalorieAddWidget onAddCalories={handleQuickCalorieAdd} />
          </View>

          {/* Water Tracking */}
          <View style={styles.section}>
            <WaterTrackingWidget
              currentMl={dailySummary?.waterMl || 0}
              goalMl={goals?.waterGoalMl || 2500}
              onAddWater={handleAddWater}
            />
          </View>

          {/* Weekly Chart */}
          <View style={styles.section}>
            <WeeklyCalorieChart data={weeklyData} />
          </View>

          {/* Bottom spacing for tab bar */}
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '900',
    color: THEME.colors.text.primary,
    letterSpacing: -0.5,
  },
  date: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.colors.text.muted,
    marginTop: 4,
    textTransform: 'capitalize',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: THEME.colors.glass.border,
  },
  aiButton: {
    backgroundColor: THEME.colors.primary[100],
    borderColor: THEME.colors.primary[200],
  },
  section: {
    marginBottom: 20,
  },
  bottomSpacing: {
    height: 100,
  },
});
