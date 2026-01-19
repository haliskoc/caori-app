import React, { useRef } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Alert,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Entry, t } from '@calai/shared';
import { Text } from '../atoms/Text';
import {
  Utensils,
  Droplets,
  Activity,
  Moon,
  Coffee,
  Trash2,
  Clock,
  Flame,
} from 'lucide-react-native';
import { THEME } from '../../theme';

interface Props {
  entries: Entry[];
  onDelete: (id: string) => void;
}

// Individual entry card component
function EntryCard({
  entry,
  onDelete,
}: {
  entry: Entry;
  onDelete: () => void;
}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleDelete = () => {
    Alert.alert(
      t('Kaydı Sil'),
      t('Bu kaydı silmek istediğinize emin misiniz?'),
      [
        { text: t('İptal'), style: 'cancel' },
        { text: t('Sil'), style: 'destructive', onPress: onDelete },
      ]
    );
  };

  const getTypeConfig = () => {
    switch (entry.type) {
      case 'food':
        return {
          icon: Utensils,
          color: THEME.colors.primary[500],
          bgColor: THEME.colors.primary[100],
          label: entry.name || t('Yemek'),
          detail: `${entry.calories || 0} kcal`,
          subDetail: entry.mealType ? t(entry.mealType) : null,
        };
      case 'water':
        return {
          icon: Droplets,
          color: '#3b82f6',
          bgColor: 'rgba(59, 130, 246, 0.1)',
          label: t('Su'),
          detail: `${entry.amountMl || 0} ml`,
          subDetail: null,
        };
      case 'activity':
        return {
          icon: Activity,
          color: '#f97316',
          bgColor: 'rgba(249, 115, 22, 0.1)',
          label: entry.activityType || t('Aktivite'),
          detail: `${entry.estimatedCalories || 0} kcal`,
          subDetail: `${entry.durationMin || 0} dk`,
        };
      case 'sleep':
        return {
          icon: Moon,
          color: '#a855f7',
          bgColor: 'rgba(168, 85, 247, 0.1)',
          label: t('Uyku'),
          detail: `${entry.durationMin || 0} dk`,
          subDetail: null,
        };
      case 'drink':
        return {
          icon: Coffee,
          color: THEME.colors.primary[600],
          bgColor: THEME.colors.primary[100],
          label: entry.name || t('İçecek'),
          detail: `${entry.calories || 0} kcal`,
          subDetail: `${entry.amountMl || 0} ml`,
        };
      default:
        return {
          icon: Utensils,
          color: THEME.colors.text.muted,
          bgColor: 'rgba(156, 163, 175, 0.1)',
          label: t('Kayıt'),
          detail: '',
          subDetail: null,
        };
    }
  };

  const config = getTypeConfig();
  const Icon = config.icon;

  // Format timestamp
  const formatTime = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString('tr-TR', {
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return '';
    }
  };

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.9}
    >
      <Animated.View
        style={[
          styles.cardContainer,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        <BlurView intensity={50} tint="light" style={styles.cardInner}>
          {/* Icon */}
          <View style={[styles.iconContainer, { backgroundColor: config.bgColor }]}>
            <Icon size={20} color={config.color} />
          </View>

          {/* Content */}
          <View style={styles.contentContainer}>
            <Text style={styles.entryLabel}>{config.label}</Text>
            <View style={styles.detailRow}>
              {entry.type === 'food' && (
                <View style={styles.detailBadge}>
                  <Flame size={12} color={THEME.colors.semantic.warning} />
                  <Text style={styles.detailText}>{config.detail}</Text>
                </View>
              )}
              {entry.type !== 'food' && (
                <Text style={styles.detailText}>{config.detail}</Text>
              )}
              {config.subDetail && (
                <>
                  <View style={styles.detailDot} />
                  <Text style={styles.subDetailText}>{config.subDetail}</Text>
                </>
              )}
            </View>
          </View>

          {/* Time */}
          <View style={styles.timeContainer}>
            <Clock size={12} color={THEME.colors.text.muted} />
            <Text style={styles.timeText}>{formatTime(entry.timestamp)}</Text>
          </View>

          {/* Delete Button */}
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Trash2 size={16} color={THEME.colors.semantic.error} />
          </TouchableOpacity>
        </BlurView>
      </Animated.View>
    </TouchableOpacity>
  );
}

export function EntryList({ entries, onDelete }: Props) {
  if (entries.length === 0) {
    return null; // Empty state handled by parent
  }

  // Group entries by meal type for food
  const groupedEntries = entries.reduce(
    (acc, entry) => {
      const key = entry.type === 'food' ? (entry.mealType || 'other') : entry.type;
      if (!acc[key]) acc[key] = [];
      acc[key].push(entry);
      return acc;
    },
    {} as Record<string, Entry[]>
  );

  // Define order
  const order = ['breakfast', 'lunch', 'dinner', 'snack', 'water', 'activity', 'drink', 'sleep', 'other'];

  return (
    <View style={styles.container}>
      {order.map((key) => {
        const group = groupedEntries[key];
        if (!group || group.length === 0) return null;

        const groupLabel =
          key === 'breakfast' ? t('Kahvaltı') :
          key === 'lunch' ? t('Öğle Yemeği') :
          key === 'dinner' ? t('Akşam Yemeği') :
          key === 'snack' ? t('Atıştırmalık') :
          key === 'water' ? t('Su') :
          key === 'activity' ? t('Aktivite') :
          key === 'drink' ? t('İçecekler') :
          key === 'sleep' ? t('Uyku') : t('Diğer');

        return (
          <View key={key} style={styles.groupContainer}>
            <Text style={styles.groupLabel}>{groupLabel}</Text>
            {group.map((entry) => (
              <EntryCard
                key={entry.id}
                entry={entry}
                onDelete={() => onDelete(entry.id)}
              />
            ))}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  groupContainer: {
    gap: 10,
  },
  groupLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: THEME.colors.text.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginLeft: 4,
    marginBottom: 4,
  },
  cardContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: THEME.colors.glass.border,
  },
  cardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    gap: 12,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  entryLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: THEME.colors.text.primary,
    marginBottom: 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.colors.text.secondary,
  },
  detailDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: THEME.colors.text.muted,
    marginHorizontal: 8,
  },
  subDetailText: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.colors.text.muted,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
  },
  timeText: {
    fontSize: 11,
    fontWeight: '600',
    color: THEME.colors.text.muted,
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
