import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Moon, ChevronRight, Bed, Clock } from 'lucide-react-native';
import { Text } from '../atoms/Text';
import { LiquidGlassCard } from '../atoms/LiquidGlassCard';
import { THEME } from '../../theme';
import { useStore } from '../../store';
import { t } from '@calai/shared';

export function SleepWidget() {
    const router = useRouter();
    const { sleepLogs, fetchSleepLogs } = useStore();
    const [lastSleep, setLastSleep] = useState<{
        duration: string;
        quality: string;
        date: string;
    } | null>(null);

    useEffect(() => {
        fetchSleepLogs();
    }, [fetchSleepLogs]);

    useEffect(() => {
        if (sleepLogs.length > 0) {
            const latest = sleepLogs[0];
            const start = new Date(latest.sleepStart);
            const end = new Date(latest.sleepEnd);
            const diffMs = end.getTime() - start.getTime();
            const hours = Math.floor(diffMs / (1000 * 60 * 60));
            const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

            const qualityMap: Record<string, string> = {
                poor: '😫',
                fair: '😐',
                good: '😊',
                excellent: '😴',
            };

            setLastSleep({
                duration: `${hours}s ${minutes}dk`,
                quality: qualityMap[latest.quality] || '😊',
                date: new Date(latest.sleepEnd).toLocaleDateString('tr-TR', {
                    day: 'numeric',
                    month: 'short',
                }),
            });
        }
    }, [sleepLogs]);

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => router.push('/(screens)/sleep' as any)}
        >
            <LiquidGlassCard style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.iconContainer}>
                        <Moon size={20} color={THEME.colors.primary[600]} />
                    </View>
                    <Text style={styles.title}>{t('Uyku')}</Text>
                    <ChevronRight size={18} color={THEME.colors.text.muted} />
                </View>

                {lastSleep ? (
                    <View style={styles.content}>
                        <View style={styles.statRow}>
                            <View style={styles.statItem}>
                                <Bed size={14} color={THEME.colors.text.muted} />
                                <Text style={styles.statValue}>{lastSleep.duration}</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Text style={styles.qualityEmoji}>{lastSleep.quality}</Text>
                            </View>
                        </View>
                        <Text style={styles.dateText}>
                            {t('Son kayıt')}: {lastSleep.date}
                        </Text>
                    </View>
                ) : (
                    <View style={styles.emptyContent}>
                        <Text style={styles.emptyText}>{t('Uyku kaydı ekle')}</Text>
                    </View>
                )}
            </LiquidGlassCard>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 12,
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 12,
        backgroundColor: THEME.colors.primary[100],
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        flex: 1,
        fontSize: 15,
        fontWeight: '800',
        color: THEME.colors.text.primary,
    },
    content: {},
    statRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    statValue: {
        fontSize: 18,
        fontWeight: '900',
        color: THEME.colors.text.primary,
    },
    qualityEmoji: {
        fontSize: 24,
    },
    dateText: {
        fontSize: 12,
        fontWeight: '600',
        color: THEME.colors.text.muted,
    },
    emptyContent: {
        paddingVertical: 8,
    },
    emptyText: {
        fontSize: 13,
        fontWeight: '600',
        color: THEME.colors.text.muted,
    },
});
