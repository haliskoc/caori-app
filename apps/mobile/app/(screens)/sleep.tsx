import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Animated,
    RefreshControl,
    Alert,
    TextInput,
    Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { t, SleepQuality } from '@calai/shared';
import {
    Moon,
    ChevronLeft,
    Plus,
    Clock,
    Star,
    Trash2,
    X,
    Sun,
    Bed,
    AlarmClock,
} from 'lucide-react-native';
import { Text } from '../../src/components/atoms/Text';
import { Button } from '../../src/components/atoms/Button';
import { AnimatedBackground } from '../../src/components/atoms/AnimatedBackground';
import { LiquidGlassCard } from '../../src/components/atoms/LiquidGlassCard';
import { THEME } from '../../src/theme';
import { useStore } from '../../src/store';

const QUALITY_OPTIONS: { value: SleepQuality; label: string; emoji: string; color: string }[] = [
    { value: 'poor', label: 'Kötü', emoji: '😫', color: '#ef4444' },
    { value: 'fair', label: 'Orta', emoji: '😐', color: '#f59e0b' },
    { value: 'good', label: 'İyi', emoji: '😊', color: '#10b981' },
    { value: 'excellent', label: 'Mükemmel', emoji: '😴', color: '#3b82f6' },
];

// Sleep duration calculator
function calculateDuration(start: string, end: string): string {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffMs = endDate.getTime() - startDate.getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}s ${minutes}dk`;
}

// Format time for display
function formatTime(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
}

// Format date for display
function formatDate(isoString: string): string {
    const date = new Date(isoString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
        return t('Bugün');
    } else if (date.toDateString() === yesterday.toDateString()) {
        return t('Dün');
    }
    return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
}

// Sleep log item component
function SleepLogItem({
    log,
    onDelete,
}: {
    log: { id: string; sleepStart: string; sleepEnd: string; quality: SleepQuality; note?: string };
    onDelete: (id: string) => void;
}) {
    const quality = QUALITY_OPTIONS.find((q) => q.value === log.quality) || QUALITY_OPTIONS[2];
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, { toValue: 0.98, useNativeDriver: true }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();
    };

    return (
        <Animated.View style={[styles.logItem, { transform: [{ scale: scaleAnim }] }]}>
            <LiquidGlassCard style={styles.logCard}>
                <View style={styles.logHeader}>
                    <View style={styles.logDateRow}>
                        <Moon size={16} color={THEME.colors.primary[500]} />
                        <Text style={styles.logDate}>{formatDate(log.sleepStart)}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() =>
                            Alert.alert(t('Sil'), t('Bu uyku kaydını silmek istiyor musunuz?'), [
                                { text: t('İptal'), style: 'cancel' },
                                { text: t('Sil'), style: 'destructive', onPress: () => onDelete(log.id) },
                            ])
                        }
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Trash2 size={18} color={THEME.colors.semantic.error} />
                    </TouchableOpacity>
                </View>

                <View style={styles.logContent}>
                    <View style={styles.timeRow}>
                        <View style={styles.timeBlock}>
                            <Bed size={14} color={THEME.colors.text.muted} />
                            <Text style={styles.timeLabel}>{t('Yatış')}</Text>
                            <Text style={styles.timeValue}>{formatTime(log.sleepStart)}</Text>
                        </View>
                        <View style={styles.timeDivider}>
                            <View style={styles.timeLine} />
                            <Clock size={14} color={THEME.colors.primary[500]} />
                            <View style={styles.timeLine} />
                        </View>
                        <View style={styles.timeBlock}>
                            <AlarmClock size={14} color={THEME.colors.text.muted} />
                            <Text style={styles.timeLabel}>{t('Kalkış')}</Text>
                            <Text style={styles.timeValue}>{formatTime(log.sleepEnd)}</Text>
                        </View>
                    </View>

                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Text style={styles.statLabel}>{t('Süre')}</Text>
                            <Text style={styles.statValue}>{calculateDuration(log.sleepStart, log.sleepEnd)}</Text>
                        </View>
                        <View style={[styles.qualityBadge, { backgroundColor: `${quality.color}15` }]}>
                            <Text style={styles.qualityEmoji}>{quality.emoji}</Text>
                            <Text style={[styles.qualityText, { color: quality.color }]}>{t(quality.label)}</Text>
                        </View>
                    </View>

                    {log.note && (
                        <View style={styles.noteContainer}>
                            <Text style={styles.noteText}>{log.note}</Text>
                        </View>
                    )}
                </View>
            </LiquidGlassCard>
        </Animated.View>
    );
}

// Add sleep modal
function AddSleepModal({
    visible,
    onClose,
    onAdd,
    loading,
}: {
    visible: boolean;
    onClose: () => void;
    onAdd: (data: { sleepStart: string; sleepEnd: string; quality: SleepQuality; note?: string }) => void;
    loading: boolean;
}) {
    const [sleepHour, setSleepHour] = useState('23');
    const [sleepMinute, setSleepMinute] = useState('00');
    const [wakeHour, setWakeHour] = useState('07');
    const [wakeMinute, setWakeMinute] = useState('00');
    const [quality, setQuality] = useState<SleepQuality>('good');
    const [note, setNote] = useState('');

    const handleAdd = () => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        // Create sleep start time (yesterday if sleep hour > wake hour)
        const sleepDate = new Date(yesterday);
        sleepDate.setHours(parseInt(sleepHour), parseInt(sleepMinute), 0, 0);

        // Create wake time (today)
        const wakeDate = new Date(today);
        wakeDate.setHours(parseInt(wakeHour), parseInt(wakeMinute), 0, 0);

        onAdd({
            sleepStart: sleepDate.toISOString(),
            sleepEnd: wakeDate.toISOString(),
            quality,
            note: note.trim() || undefined,
        });
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <LiquidGlassCard variant="elevated" style={styles.modalCard}>
                        {/* Header */}
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>{t('Uyku Kaydı Ekle')}</Text>
                            <TouchableOpacity onPress={onClose} style={styles.modalClose}>
                                <X size={24} color={THEME.colors.text.muted} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            {/* Sleep Time */}
                            <View style={styles.inputSection}>
                                <View style={styles.inputLabelRow}>
                                    <Bed size={16} color={THEME.colors.primary[600]} />
                                    <Text style={styles.inputLabel}>{t('Yatış Saati')}</Text>
                                </View>
                                <View style={styles.timeInputRow}>
                                    <TextInput
                                        style={styles.timeInput}
                                        value={sleepHour}
                                        onChangeText={setSleepHour}
                                        keyboardType="number-pad"
                                        maxLength={2}
                                        placeholder="23"
                                        placeholderTextColor={THEME.colors.text.muted}
                                    />
                                    <Text style={styles.timeSeparator}>:</Text>
                                    <TextInput
                                        style={styles.timeInput}
                                        value={sleepMinute}
                                        onChangeText={setSleepMinute}
                                        keyboardType="number-pad"
                                        maxLength={2}
                                        placeholder="00"
                                        placeholderTextColor={THEME.colors.text.muted}
                                    />
                                </View>
                            </View>

                            {/* Wake Time */}
                            <View style={styles.inputSection}>
                                <View style={styles.inputLabelRow}>
                                    <Sun size={16} color={THEME.colors.semantic.warning} />
                                    <Text style={styles.inputLabel}>{t('Kalkış Saati')}</Text>
                                </View>
                                <View style={styles.timeInputRow}>
                                    <TextInput
                                        style={styles.timeInput}
                                        value={wakeHour}
                                        onChangeText={setWakeHour}
                                        keyboardType="number-pad"
                                        maxLength={2}
                                        placeholder="07"
                                        placeholderTextColor={THEME.colors.text.muted}
                                    />
                                    <Text style={styles.timeSeparator}>:</Text>
                                    <TextInput
                                        style={styles.timeInput}
                                        value={wakeMinute}
                                        onChangeText={setWakeMinute}
                                        keyboardType="number-pad"
                                        maxLength={2}
                                        placeholder="00"
                                        placeholderTextColor={THEME.colors.text.muted}
                                    />
                                </View>
                            </View>

                            {/* Quality */}
                            <View style={styles.inputSection}>
                                <View style={styles.inputLabelRow}>
                                    <Star size={16} color={THEME.colors.primary[600]} />
                                    <Text style={styles.inputLabel}>{t('Uyku Kalitesi')}</Text>
                                </View>
                                <View style={styles.qualityGrid}>
                                    {QUALITY_OPTIONS.map((option) => (
                                        <TouchableOpacity
                                            key={option.value}
                                            style={[
                                                styles.qualityOption,
                                                quality === option.value && {
                                                    backgroundColor: `${option.color}20`,
                                                    borderColor: option.color,
                                                },
                                            ]}
                                            onPress={() => setQuality(option.value)}
                                        >
                                            <Text style={styles.qualityOptionEmoji}>{option.emoji}</Text>
                                            <Text
                                                style={[
                                                    styles.qualityOptionLabel,
                                                    quality === option.value && { color: option.color },
                                                ]}
                                            >
                                                {t(option.label)}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            {/* Note */}
                            <View style={styles.inputSection}>
                                <Text style={styles.inputLabel}>{t('Not (İsteğe bağlı)')}</Text>
                                <TextInput
                                    style={styles.noteInput}
                                    value={note}
                                    onChangeText={setNote}
                                    placeholder={t('Uyku hakkında not ekleyin...')}
                                    placeholderTextColor={THEME.colors.text.muted}
                                    multiline
                                    numberOfLines={3}
                                />
                            </View>

                            {/* Submit Button */}
                            <Button
                                label={loading ? t('Kaydediliyor...') : t('Kaydet')}
                                onPress={handleAdd}
                                variant="primary"
                                disabled={loading}
                                style={styles.submitButton}
                            />
                        </ScrollView>
                    </LiquidGlassCard>
                </View>
            </View>
        </Modal>
    );
}

export default function SleepScreen() {
    const router = useRouter();
    const { sleepLogs, fetchSleepLogs, addSleepLog, deleteSleepLog, sleepLoading } = useStore();
    const [showAddModal, setShowAddModal] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        fetchSleepLogs();
        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
            Animated.spring(slideAnim, { toValue: 0, tension: 80, friction: 12, useNativeDriver: true }),
        ]).start();
    }, [fetchSleepLogs]);

    const handleRefresh = useCallback(() => {
        fetchSleepLogs();
    }, [fetchSleepLogs]);

    const handleAddSleep = async (data: {
        sleepStart: string;
        sleepEnd: string;
        quality: SleepQuality;
        note?: string;
    }) => {
        await addSleepLog(data);
        setShowAddModal(false);
    };

    const handleDeleteSleep = (id: string) => {
        deleteSleepLog(id);
    };

    // Calculate average sleep duration
    const averageSleep = sleepLogs.length > 0
        ? sleepLogs.reduce((sum, log) => {
            const start = new Date(log.sleepStart);
            const end = new Date(log.sleepEnd);
            return sum + (end.getTime() - start.getTime());
        }, 0) / sleepLogs.length
        : 0;

    const avgHours = Math.floor(averageSleep / (1000 * 60 * 60));
    const avgMinutes = Math.floor((averageSleep % (1000 * 60 * 60)) / (1000 * 60));

    return (
        <View style={styles.container}>
            <AnimatedBackground />

            <SafeAreaView style={styles.safeArea} edges={['top']}>
                {/* Header */}
                <Animated.View
                    style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
                >
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <ChevronLeft size={24} color={THEME.colors.text.primary} />
                    </TouchableOpacity>
                    <View style={styles.headerCenter}>
                        <View style={styles.headerIcon}>
                            <Moon size={22} color={THEME.colors.primary[600]} />
                        </View>
                        <View>
                            <Text style={styles.headerTitle}>{t('Uyku Takibi')}</Text>
                            <Text style={styles.headerSubtitle}>
                                {sleepLogs.length} {t('kayıt')}
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.addButton} onPress={() => setShowAddModal(true)}>
                        <Plus size={22} color="#fff" />
                    </TouchableOpacity>
                </Animated.View>

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={sleepLoading}
                            onRefresh={handleRefresh}
                            tintColor={THEME.colors.primary[500]}
                            colors={[THEME.colors.primary[500]]}
                        />
                    }
                >
                    {/* Stats Card */}
                    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
                        <LiquidGlassCard variant="elevated" style={styles.statsCard}>
                            <View style={styles.statsHeader}>
                                <Text style={styles.statsTitle}>{t('Uyku Özeti')}</Text>
                                <Text style={styles.statsSubtitle}>{t('Son 7 gün')}</Text>
                            </View>
                            <View style={styles.statsGrid}>
                                <View style={styles.statBlock}>
                                    <Text style={styles.statBlockValue}>
                                        {avgHours}s {avgMinutes}dk
                                    </Text>
                                    <Text style={styles.statBlockLabel}>{t('Ortalama Süre')}</Text>
                                </View>
                                <View style={styles.statDivider} />
                                <View style={styles.statBlock}>
                                    <Text style={styles.statBlockValue}>{sleepLogs.length}</Text>
                                    <Text style={styles.statBlockLabel}>{t('Toplam Kayıt')}</Text>
                                </View>
                            </View>
                        </LiquidGlassCard>
                    </Animated.View>

                    {/* Sleep Logs */}
                    {sleepLogs.length === 0 ? (
                        <LiquidGlassCard style={styles.emptyCard}>
                            <Moon size={48} color={THEME.colors.text.muted} />
                            <Text style={styles.emptyTitle}>{t('Henüz kayıt yok')}</Text>
                            <Text style={styles.emptyText}>{t('İlk uyku kaydını eklemek için + butonuna tıkla')}</Text>
                        </LiquidGlassCard>
                    ) : (
                        sleepLogs.map((log) => (
                            <SleepLogItem key={log.id} log={log} onDelete={handleDeleteSleep} />
                        ))
                    )}

                    <View style={styles.bottomSpacing} />
                </ScrollView>
            </SafeAreaView>

            {/* Add Modal */}
            <AddSleepModal
                visible={showAddModal}
                onClose={() => setShowAddModal(false)}
                onAdd={handleAddSleep}
                loading={sleepLoading}
            />
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
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
    headerCenter: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginLeft: 16,
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
        fontSize: 22,
        fontWeight: '900',
        color: THEME.colors.text.primary,
    },
    headerSubtitle: {
        fontSize: 13,
        fontWeight: '600',
        color: THEME.colors.text.muted,
        marginTop: 2,
    },
    addButton: {
        width: 48,
        height: 48,
        borderRadius: 16,
        backgroundColor: THEME.colors.primary[600],
        alignItems: 'center',
        justifyContent: 'center',
        ...THEME.shadow.md,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 8,
    },
    statsCard: {
        marginBottom: 20,
    },
    statsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    statsTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: THEME.colors.text.primary,
    },
    statsSubtitle: {
        fontSize: 12,
        fontWeight: '600',
        color: THEME.colors.text.muted,
    },
    statsGrid: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statBlock: {
        flex: 1,
        alignItems: 'center',
    },
    statBlockValue: {
        fontSize: 24,
        fontWeight: '900',
        color: THEME.colors.primary[600],
    },
    statBlockLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: THEME.colors.text.muted,
        marginTop: 4,
    },
    statDivider: {
        width: 1,
        height: 40,
        backgroundColor: THEME.colors.glass.border,
        marginHorizontal: 16,
    },
    logItem: {
        marginBottom: 12,
    },
    logCard: {
        padding: 16,
    },
    logHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    logDateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    logDate: {
        fontSize: 14,
        fontWeight: '700',
        color: THEME.colors.text.primary,
    },
    logContent: {},
    timeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    timeBlock: {
        flex: 1,
        alignItems: 'center',
        gap: 4,
    },
    timeLabel: {
        fontSize: 11,
        fontWeight: '600',
        color: THEME.colors.text.muted,
    },
    timeValue: {
        fontSize: 18,
        fontWeight: '800',
        color: THEME.colors.text.primary,
    },
    timeDivider: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    timeLine: {
        width: 20,
        height: 2,
        backgroundColor: THEME.colors.glass.border,
        borderRadius: 1,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statItem: {},
    statLabel: {
        fontSize: 11,
        fontWeight: '600',
        color: THEME.colors.text.muted,
    },
    statValue: {
        fontSize: 16,
        fontWeight: '800',
        color: THEME.colors.text.primary,
        marginTop: 2,
    },
    qualityBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    qualityEmoji: {
        fontSize: 16,
    },
    qualityText: {
        fontSize: 13,
        fontWeight: '700',
    },
    noteContainer: {
        marginTop: 12,
        padding: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 10,
    },
    noteText: {
        fontSize: 13,
        fontWeight: '600',
        color: THEME.colors.text.secondary,
        fontStyle: 'italic',
    },
    emptyCard: {
        alignItems: 'center',
        paddingVertical: 40,
        marginTop: 20,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: THEME.colors.text.primary,
        marginTop: 16,
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 14,
        fontWeight: '600',
        color: THEME.colors.text.muted,
        textAlign: 'center',
    },
    bottomSpacing: {
        height: 100,
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        maxHeight: '90%',
    },
    modalCard: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        padding: 24,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: '900',
        color: THEME.colors.text.primary,
    },
    modalClose: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputSection: {
        marginBottom: 24,
    },
    inputLabelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: THEME.colors.text.primary,
    },
    timeInputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    timeInput: {
        width: 70,
        height: 56,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: THEME.colors.glass.border,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '800',
        color: THEME.colors.text.primary,
    },
    timeSeparator: {
        fontSize: 24,
        fontWeight: '800',
        color: THEME.colors.text.muted,
    },
    qualityGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    qualityOption: {
        flex: 1,
        minWidth: '45%',
        padding: 14,
        borderRadius: 14,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderWidth: 1,
        borderColor: THEME.colors.glass.border,
        alignItems: 'center',
        gap: 6,
    },
    qualityOptionEmoji: {
        fontSize: 24,
    },
    qualityOptionLabel: {
        fontSize: 13,
        fontWeight: '700',
        color: THEME.colors.text.secondary,
    },
    noteInput: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: THEME.colors.glass.border,
        padding: 14,
        fontSize: 15,
        fontWeight: '600',
        color: THEME.colors.text.primary,
        minHeight: 80,
        textAlignVertical: 'top',
    },
    submitButton: {
        marginTop: 8,
        marginBottom: 20,
    },
});
