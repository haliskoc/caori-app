import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { BlurView } from 'expo-blur';
import { X, FileText, Download } from 'lucide-react-native';
import { t } from '@calai/shared';
import { Text } from '../atoms/Text';
import { THEME } from '../../theme';
import { exportEntries, ExportOptions } from '../../utils/export';

interface ExportModalProps {
  visible: boolean;
  onClose: () => void;
  entries: any[];
}

export function ExportModal({ visible, onClose, entries }: ExportModalProps) {
  const [format, setFormat] = useState<'csv' | 'pdf'>('csv');
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      const options: ExportOptions = { format, includeSummary: true };
      await exportEntries(entries, options);
      onClose();
    } catch (error) {
      console.error('Export error:', error);
    } finally {
      setExporting(false);
    }
  };

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <BlurView intensity={80} tint="light" style={styles.modal}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{t('Dışa Aktar')}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={24} color={THEME.colors.text.muted} />
            </TouchableOpacity>
          </View>

          {/* Info */}
          <Text style={styles.infoText}>
            {t('{count} kayıt dışa aktarılacak', { count: entries.length })}
          </Text>

          {/* Format Selector */}
          <Text style={styles.sectionTitle}>{t('Format Seçin')}</Text>
          <View style={styles.formatSelector}>
            <TouchableOpacity
              style={[styles.formatOption, format === 'csv' && styles.formatOptionActive]}
              onPress={() => setFormat('csv')}
              activeOpacity={0.8}
            >
              <View style={styles.formatIcon}>
                <FileText size={24} color={format === 'csv' ? '#fff' : THEME.colors.primary[600]} />
              </View>
              <Text style={[styles.formatName, format === 'csv' && styles.formatNameActive]}>CSV</Text>
              <Text style={styles.formatDesc}>{t('Excel uyumlu')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.formatOption, format === 'pdf' && styles.formatOptionActive]}
              onPress={() => setFormat('pdf')}
              activeOpacity={0.8}
            >
              <View style={styles.formatIcon}>
                <Download size={24} color={format === 'pdf' ? '#fff' : THEME.colors.primary[600]} />
              </View>
              <Text style={[styles.formatName, format === 'pdf' && styles.formatNameActive]}>PDF</Text>
              <Text style={styles.formatDesc}>{t('Rapor formatı')}</Text>
            </TouchableOpacity>
          </View>

          {/* Export Button */}
          <TouchableOpacity
            style={[styles.exportButton, exporting && styles.exportButtonDisabled]}
            onPress={handleExport}
            disabled={exporting}
            activeOpacity={0.9}
          >
            {exporting ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <>
                <Download size={20} color="#fff" />
                <Text style={styles.exportButtonText}>
                  {t('Dışa Aktar')}
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    width: '90%',
    maxWidth: 400,
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: THEME.colors.glass.border,
  },
  content: {
    gap: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: THEME.colors.text.primary,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.colors.text.secondary,
    textAlign: 'center',
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: THEME.colors.text.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  formatSelector: {
    flexDirection: 'row',
    gap: 12,
  },
  formatOption: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 2,
    borderColor: 'transparent',
    gap: 8,
  },
  formatOptionActive: {
    backgroundColor: THEME.colors.primary[600],
    borderColor: THEME.colors.primary[500],
    ...THEME.shadow.md,
  },
  formatIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: THEME.colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  formatName: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME.colors.text.primary,
  },
  formatNameActive: {
    color: '#fff',
  },
  formatDesc: {
    fontSize: 11,
    fontWeight: '600',
    color: THEME.colors.text.muted,
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.colors.primary[600],
    borderRadius: 16,
    paddingVertical: 18,
    gap: 10,
    ...THEME.shadow.lg,
  },
  exportButtonDisabled: {
    opacity: 0.6,
  },
  exportButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
});
