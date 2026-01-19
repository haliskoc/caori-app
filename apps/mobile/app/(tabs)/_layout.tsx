import React, { useRef, useEffect } from "react";
import { Tabs, useRouter } from "expo-router";
import { 
  View, 
  StyleSheet, 
  Platform, 
  Animated, 
  Dimensions,
  Pressable,
} from "react-native";
import { BlurView } from "expo-blur";
import { 
  LayoutDashboard, 
  PlusCircle, 
  User, 
  Settings,
  Sparkles,
} from "lucide-react-native";
import { t } from "@calai/shared";
import { THEME } from "../../src/theme";
import Svg, { Defs, LinearGradient, Stop, Rect, RadialGradient } from "react-native-svg";

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 64; // Daha kompakt yükseklik
const TAB_BAR_MARGIN = 24; // Kenarlardan daha fazla boşluk
const AI_BUTTON_SIZE = 52; // Daha küçük ve zarif AI butonu

// Modern likit cam efektli animasyonlu tab ikonu
function AnimatedTabIcon({ 
  focused, 
  children, 
  color 
}: { 
  focused: boolean; 
  children: React.ReactNode;
  color: string;
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const backgroundOpacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: focused ? 1.2 : 1,
        useNativeDriver: true,
        damping: 12,
        stiffness: 180,
      }),
      Animated.timing(backgroundOpacity, {
        toValue: focused ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: focused ? -4 : 0,
        useNativeDriver: true,
        damping: 15,
        stiffness: 200,
      }),
    ]).start();
  }, [focused]);

  return (
    <Animated.View 
      style={[
        styles.iconWrapper,
        { transform: [{ scale }, { translateY }] }
      ]}
    >
      <Animated.View 
        style={[
          styles.focusDot,
          { 
            opacity: backgroundOpacity, 
            transform: [{ scale: backgroundOpacity }],
            backgroundColor: color
          }
        ]} 
      />
      {children}
    </Animated.View>
  );
}

// Orta kısımda yer alan yüzen AI butonu
function FloatingAIButton() {
  const router = useRouter();
  const scale = useRef(new Animated.Value(1)).current;
  const glowOpacity = useRef(new Animated.Value(0.5)).current;
  const rotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Parlama animasyonu
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowOpacity, {
          toValue: 0.8,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(glowOpacity, {
          toValue: 0.4,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // AI ikonu için hafif dönüş
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.9,
      useNativeDriver: true,
      damping: 15,
      stiffness: 200,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      damping: 12,
      stiffness: 180,
    }).start();
  };

  const spin = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View style={styles.aiButtonContainer}>
      <Animated.View 
        style={[
          styles.aiButtonGlow,
          { 
            opacity: glowOpacity, 
            transform: [{ scale: glowOpacity.interpolate({
              inputRange: [0.4, 0.8],
              outputRange: [1, 1.3]
            }) }] 
          }
        ]} 
      />
      
      <Pressable
        onPress={() => router.push('/(modals)/ai-assistant')}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.aiButtonPressable}
      >
        <Animated.View style={[styles.aiButton, { transform: [{ scale }] }]}>
          <BlurView intensity={60} tint="light" style={styles.aiButtonBlur}>
            <View style={styles.aiButtonGradient}>
              <Svg width="100%" height="100%" style={StyleSheet.absoluteFill}>
                <Defs>
                  <LinearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <Stop offset="0%" stopColor={THEME.colors.primary[400]} stopOpacity="1" />
                    <Stop offset="100%" stopColor={THEME.colors.primary[600]} stopOpacity="1" />
                  </LinearGradient>
                </Defs>
                <Rect width="100%" height="100%" fill="url(#aiGradient)" />
              </Svg>
            </View>
            
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <Sparkles size={22} color="#fff" strokeWidth={2.5} />
            </Animated.View>
          </BlurView>
        </Animated.View>
      </Pressable>
    </View>
  );
}

// Likit cam efektli özel tab bar arka planı
function LiquidGlassTabBar() {
  return (
    <View style={styles.tabBarBackground}>
      <BlurView intensity={45} tint="light" style={styles.tabBarBlur}>
        <Svg width="100%" height="100%" style={StyleSheet.absoluteFill}>
          <Defs>
            <RadialGradient id="bottomGlow" cx="50%" cy="100%" rx="50%" ry="100%">
              <Stop offset="0%" stopColor={THEME.colors.primary[500]} stopOpacity="0.18" />
              <Stop offset="100%" stopColor={THEME.colors.primary[500]} stopOpacity="0" />
            </RadialGradient>
            <LinearGradient id="topShine" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
              <Stop offset="35%" stopColor="#ffffff" stopOpacity="0.15" />
              <Stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </LinearGradient>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#bottomGlow)" />
          <Rect width="100%" height="100%" fill="url(#topShine)" />
        </Svg>
        <View style={styles.tabBarGlassOverlay} />
      </BlurView>
    </View>
  );
}

export default function TabLayout() {
  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: THEME.colors.primary[600],
          tabBarInactiveTintColor: THEME.colors.text.muted,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
          tabBarItemStyle: styles.tabBarItem,
          tabBarIconStyle: styles.tabBarIcon,
          tabBarBackground: () => <LiquidGlassTabBar />,
          headerShown: false,
          animation: 'shift',
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: t("Panel"),
            tabBarIcon: ({ color, focused }) => (
              <AnimatedTabIcon focused={focused} color={color}>
                <LayoutDashboard 
                  size={20} 
                  color={color} 
                  strokeWidth={focused ? 2.5 : 2} 
                />
              </AnimatedTabIcon>
            ),
          }}
        />

        <Tabs.Screen
          name="add"
          options={{
            title: t("Ekle"),
            tabBarIcon: ({ color, focused }) => (
              <AnimatedTabIcon focused={focused} color={color}>
                <PlusCircle 
                  size={20} 
                  color={color} 
                  strokeWidth={focused ? 2.5 : 2} 
                />
              </AnimatedTabIcon>
            ),
          }}
        />

        <Tabs.Screen
          name="report"
          options={{
            title: t("AI"),
            tabBarIcon: () => null,
            tabBarButton: () => <FloatingAIButton />,
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: t("Profil"),
            tabBarIcon: ({ color, focused }) => (
              <AnimatedTabIcon focused={focused} color={color}>
                <User 
                  size={20} 
                  color={color} 
                  strokeWidth={focused ? 2.5 : 2} 
                />
              </AnimatedTabIcon>
            ),
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            title: t("Ayarlar"),
            tabBarIcon: ({ color, focused }) => (
              <AnimatedTabIcon focused={focused} color={color}>
                <Settings 
                  size={20} 
                  color={color} 
                  strokeWidth={focused ? 2.5 : 2} 
                />
              </AnimatedTabIcon>
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
    left: TAB_BAR_MARGIN,
    right: TAB_BAR_MARGIN,
    height: TAB_BAR_HEIGHT,
    borderRadius: 20,
    backgroundColor: "transparent",
    borderTopWidth: 0,
    elevation: 0,
    shadowColor: THEME.colors.primary[500],
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    paddingBottom: 0,
  },
  tabBarItem: {
    height: TAB_BAR_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarIcon: {
    marginTop: 0,
  },
  tabBarBackground: {
    flex: 1,
    borderRadius: 20,
    overflow: "hidden",
  },
  tabBarBlur: {
    flex: 1,
    borderRadius: 20,
    overflow: "hidden",
  },
  tabBarGlassOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.35)", 
    borderRadius: 20,
    borderWidth: 1.2,
    borderColor: "rgba(16, 185, 129, 0.2)",
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 38,
    height: 38,
  },
  focusDot: {
    position: 'absolute',
    bottom: -6,
    width: 4,
    height: 4,
    borderRadius: 2,
    shadowColor: THEME.colors.primary[500],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 3,
  },
  aiButtonContainer: {
    position: 'relative',
    width: AI_BUTTON_SIZE + 8,
    height: TAB_BAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiButtonGlow: {
    position: 'absolute',
    width: AI_BUTTON_SIZE + 10,
    height: AI_BUTTON_SIZE + 10,
    borderRadius: (AI_BUTTON_SIZE + 10) / 2,
    backgroundColor: THEME.colors.primary[400],
    opacity: 0.2,
  },
  aiButtonPressable: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiButton: {
    width: AI_BUTTON_SIZE,
    height: AI_BUTTON_SIZE,
    borderRadius: AI_BUTTON_SIZE / 2,
    overflow: 'hidden',
    shadowColor: THEME.colors.primary[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  aiButtonBlur: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: AI_BUTTON_SIZE / 2,
    overflow: 'hidden',
  },
  aiButtonGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: AI_BUTTON_SIZE / 2,
    overflow: 'hidden',
  },
});
