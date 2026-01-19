import React, { useRef, useEffect } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  StyleSheet,
  Animated,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { format, subDays, isToday } from 'date-fns';
import { tr, enUS } from 'date-fns/locale';
import { Text } from '../atoms/Text';
import { getDayKey } from '@calai/shared';
import { THEME } from '../../theme';

interface Props {
  selectedDate: string;
  onDateChange: (date: string) => void;
  locale?: string;
}

// Individual day item component with animation
function DayItem({
  date,
  isSelected,
  onPress,
  locale,
}: {
  date: Date;
  isSelected: boolean;
  onPress: () => void;
  locale: Locale;
}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const dayName = format(date, 'EEE', { locale });
  const dayNumber = format(date, 'd');
  const isTodayDate = isToday(date);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.92,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.9}
    >
      <Animated.View
        style={[
          styles.dayContainer,
          isSelected && styles.dayContainerSelected,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        {isSelected ? (
          <View style={styles.selectedInner}>
            <Text style={styles.dayNameSelected}>{dayName}</Text>
            <Text style={styles.dayNumberSelected}>{dayNumber}</Text>
            {isTodayDate && <View style={styles.todayDotSelected} />}
          </View>
        ) : (
          <BlurView intensity={40} tint="light" style={styles.blurInner}>
            <Text style={styles.dayName}>{dayName}</Text>
            <Text style={styles.dayNumber}>{dayNumber}</Text>
            {isTodayDate && <View style={styles.todayDot} />}
          </BlurView>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
}

export function HorizontalCalendar({ selectedDate, onDateChange, locale = 'tr' }: Props) {
  const dateLocale = locale === 'tr' ? tr : enUS;
  const days = Array.from({ length: 14 })
    .map((_, i) => subDays(new Date(), i))
    .reverse();

  const scrollViewRef = useRef<ScrollView>(null);

  // Auto-scroll to selected date on mount
  useEffect(() => {
    const selectedIndex = days.findIndex((d) => getDayKey(d) === selectedDate);
    if (selectedIndex >= 0 && scrollViewRef.current) {
      const scrollX = Math.max(0, selectedIndex * 62 - 100); // 52 width + 10 margin
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({ x: scrollX, animated: true });
      }, 100);
    }
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {days.map((date) => {
          const dateKey = getDayKey(date);
          const isSelected = selectedDate === dateKey;

          return (
            <DayItem
              key={dateKey}
              date={date}
              isSelected={isSelected}
              onPress={() => onDateChange(dateKey)}
              locale={dateLocale}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 10,
  },
  dayContainer: {
    width: 52,
    height: 76,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: THEME.colors.glass.border,
  },
  dayContainerSelected: {
    borderColor: THEME.colors.primary[600],
    ...THEME.shadow.md,
  },
  blurInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  selectedInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.colors.primary[600],
  },
  dayName: {
    fontSize: 10,
    fontWeight: '800',
    color: THEME.colors.text.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dayNameSelected: {
    fontSize: 10,
    fontWeight: '800',
    color: THEME.colors.primary[200],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: '900',
    color: THEME.colors.text.primary,
    marginTop: 4,
  },
  dayNumberSelected: {
    fontSize: 18,
    fontWeight: '900',
    color: '#fff',
    marginTop: 4,
  },
  todayDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: THEME.colors.primary[500],
    marginTop: 6,
  },
  todayDotSelected: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#fff',
    marginTop: 6,
  },
});
