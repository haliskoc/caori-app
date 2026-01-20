import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { THEME, DARK_THEME, getTheme } from '../theme';
import { useStore } from '../store';

type ThemeContextType = {
    theme: typeof THEME;
    isDark: boolean;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const systemColorScheme = useColorScheme();
    const { settings, updateSettings } = useStore();

    // Use manual setting if available, otherwise use system preference
    const isDark = settings.flags?.darkMode ?? (systemColorScheme === 'dark');

    const toggleTheme = () => {
        updateSettings({
            flags: {
                ...settings.flags,
                darkMode: !isDark,
            },
        });
    };

    const theme = useMemo(() => getTheme(isDark), [isDark]);

    const value = useMemo(
        () => ({
            theme,
            isDark,
            toggleTheme,
        }),
        [theme, isDark, toggleTheme]
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
}

// Hook for getting current theme colors directly
export function useThemeColors() {
    const { theme } = useTheme();
    return theme.colors;
}
