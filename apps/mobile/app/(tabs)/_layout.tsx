import React, { useRef, useEffect } from "react";
import { Tabs, useRouter, usePathname } from "expo-router";
import {
  View,
  StyleSheet,
  Platform,
  Animated,
  Pressable,
  Text,
  useWindowDimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import {
  Home,
  Plus,
  User,
  Settings,
  Bot,
} from "lucide-react-native";
import { t } from "@calai/shared";
import { THEME } from "../../src/theme";

const TAB_BAR_HEIGHT = 70;
const AI_BUTTON_SIZE = 56;

// Tek bir tab ikonu bileşeni
function TabIcon({
  icon,
  label,
  focused,
  color,
}: {
  icon: string;
  label: string;
  focused: boolean;
  color: string;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: focused ? 1.05 : 1,
      useNativeDriver: true,
      damping: 15,
      stiffness: 200,
    }).start();
  }, [focused]);

  const IconComponent = icon === 'home' ? Home :
    icon === 'plus' ? Plus :
      icon === 'user' ? User : Settings;

  return (
    <Animated.View
      style={[
        styles.tabItem,
        focused && styles.tabItemActive,
        { transform: [{ scale }] }
      ]}
    >
      <IconComponent
        size={20}
        color={focused ? '#fff' : color}
        strokeWidth={focused ? 2.5 : 2}
      />
      <Text style={[
        styles.tabLabel,
        { color: focused ? '#fff' : color }
      ]}>
        {label}
      </Text>
    </Animated.View>
  );
}

// Ortada yükseltilmiş AI butonu - Web'deki gibi
function AIButton() {
  const router = useRouter();
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.92,
      useNativeDriver: true,
      damping: 15,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      damping: 12,
    }).start();
  };

  return (
    <View style={styles.aiButtonWrapper}>
      <Pressable
        onPress={() => router.push('/(modals)/ai-assistant')}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View style={[styles.aiButton, { transform: [{ scale }] }]}>
          <Bot size={24} color="#fff" strokeWidth={2} />
        </Animated.View>
      </Pressable>
    </View>
  );
}

// Web'deki gibi floating nav bar
function CustomTabBar() {
  return (
    <View style={styles.tabBarOuter}>
      <BlurView intensity={60} tint="light" style={styles.tabBarBlur}>
        <View style={styles.tabBarInner} />
      </BlurView>
    </View>
  );
}

export default function TabLayout() {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  // Barın genişliğini ekranın %88'i yap, ama 340px'i geçmesin (daha estetik bir boşluk için)
  const TAB_BAR_WIDTH = Math.min(SCREEN_WIDTH * 0.88, 340);
  // Yanlardan bırakılacak eşit boşluk
  const horizontalMargin = (SCREEN_WIDTH - TAB_BAR_WIDTH) / 2;

  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: THEME.colors.primary[600],
          tabBarInactiveTintColor: '#9ca3af',
          tabBarShowLabel: false,
          tabBarStyle: [
            styles.tabBar,
            {
              left: horizontalMargin,
              right: horizontalMargin,
            }
          ],
          tabBarItemStyle: styles.tabBarItem,
          tabBarBackground: () => <CustomTabBar />,
          headerShown: false,
          animation: 'shift',
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: t("Panel"),
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon="home" label={t("Panel")} focused={focused} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="add"
          options={{
            title: t("Ekle"),
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon="plus" label={t("Ekle")} focused={focused} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="report"
          options={{
            title: t("AI"),
            tabBarIcon: () => null,
            tabBarButton: () => <AIButton />,
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: t("Profil"),
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon="user" label={t("Profil")} focused={focused} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            title: t("Ayarlar"),
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon="settings" label={t("Ayar")} focused={focused} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="history"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 24 : 16,
    height: TAB_BAR_HEIGHT,
    borderRadius: 28,
    backgroundColor: "transparent",
    borderTopWidth: 0,
    elevation: 0,
    shadowColor: THEME.colors.primary[500],
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.18,
    shadowRadius: 40,
    paddingBottom: 0,
    paddingTop: 12, // Dikey ortalama için biraz düşürdük
  },
  tabBarItem: {
    height: TAB_BAR_HEIGHT - 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarOuter: {
    flex: 1,
    borderRadius: 28,
    overflow: 'hidden',
  },
  tabBarBlur: {
    flex: 1,
    borderRadius: 28,
    overflow: 'hidden',
  },
  tabBarInner: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.12)',
  },
  tabItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 56,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 12,
    gap: 2,
  },
  tabItemActive: {
    backgroundColor: THEME.colors.primary[600],
    shadowColor: THEME.colors.primary[500],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
  },
  aiButtonWrapper: {
    position: 'relative',
    width: 60,
    height: TAB_BAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: -28,
  },
  aiButton: {
    width: AI_BUTTON_SIZE,
    height: AI_BUTTON_SIZE,
    borderRadius: AI_BUTTON_SIZE / 2,
    backgroundColor: THEME.colors.primary[700],
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: THEME.colors.primary[400],
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
});
