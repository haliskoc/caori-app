import "../global.css";
import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "../src/providers/AuthProvider";
import { View, ActivityIndicator, StatusBar } from "react-native";
import { useEffect } from "react";
import { useStore } from "../src/store";
import { setLocale } from "@calai/shared";
import { THEME } from "../src/theme";

// Custom transition animation config
const fadeTransition = {
  animation: 'fade' as const,
  config: {
    duration: 200,
  },
};

const slideFromRight = {
  animation: 'slide_from_right' as const,
  config: {
    duration: 250,
  },
};

const slideFromBottom = {
  animation: 'slide_from_bottom' as const,
  config: {
    duration: 300,
  },
};

function RootLayoutNav() {
  const { isLoading } = useAuth();
  const user = useStore((state) => state.user);
  const fetchGoals = useStore((state) => state.fetchGoals);
  const fetchProfile = useStore((state) => state.fetchProfile);
  const fetchSettings = useStore((state) => state.fetchSettings);
  const syncPendingEntries = useStore((state) => state.syncPendingEntries);
  const locale = useStore((state) => state.settings.locale);
  const darkMode = useStore((state) => state.settings.flags.darkMode);

  useEffect(() => {
    if (user) {
      fetchGoals();
      fetchProfile();
      fetchSettings();
      syncPendingEntries();
    }
  }, [user, fetchGoals, fetchProfile, fetchSettings, syncPendingEntries]);

  useEffect(() => {
    setLocale(locale);
  }, [locale]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: THEME.colors.background.primary,
        }}
      >
        <ActivityIndicator size="large" color={THEME.colors.primary[500]} />
      </View>
    );
  }

  return (
    <>
      <StatusBar
        barStyle={darkMode ? "light-content" : "dark-content"}
        backgroundColor={darkMode ? "#0f172a" : THEME.colors.background.primary}
        translucent
      />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: THEME.colors.background.primary },
          animation: "slide_from_right",
          animationDuration: 250,
          gestureEnabled: true,
          gestureDirection: "horizontal",
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            animation: "fade",
            animationDuration: 200,
          }}
        />
        <Stack.Screen
          name="(auth)"
          options={{
            animation: "fade",
            animationDuration: 300,
          }}
        />
        <Stack.Screen
          name="(modals)/ai-assistant"
          options={{
            presentation: "modal",
            animation: "slide_from_bottom",
            animationDuration: 350,
            gestureEnabled: true,
            gestureDirection: "vertical",
          }}
        />
        <Stack.Screen
          name="(modals)/barcode-scanner"
          options={{
            presentation: "fullScreenModal",
            animation: "slide_from_bottom",
            animationDuration: 300,
          }}
        />
        <Stack.Screen
          name="(modals)/barcode-result"
          options={{
            presentation: "modal",
            animation: "slide_from_bottom",
            animationDuration: 300,
            gestureEnabled: true,
            gestureDirection: "vertical",
          }}
        />
        <Stack.Screen
          name="(screens)/profile"
          options={{
            animation: "slide_from_right",
            animationDuration: 250,
          }}
        />
        <Stack.Screen
          name="(screens)/goals"
          options={{
            animation: "slide_from_right",
            animationDuration: 250,
          }}
        />
        <Stack.Screen
          name="(screens)/measurements"
          options={{
            animation: "slide_from_right",
            animationDuration: 250,
          }}
        />
        <Stack.Screen
          name="(screens)/premium"
          options={{
            animation: "slide_from_right",
            animationDuration: 250,
          }}
        />
        <Stack.Screen
          name="(screens)/reminders"
          options={{
            animation: "slide_from_right",
            animationDuration: 250,
          }}
        />
        <Stack.Screen
          name="(screens)/language"
          options={{
            animation: "slide_from_right",
            animationDuration: 250,
          }}
        />
        <Stack.Screen
          name="(screens)/theme"
          options={{
            animation: "slide_from_right",
            animationDuration: 250,
          }}
        />
        <Stack.Screen
          name="(screens)/faq"
          options={{
            animation: "slide_from_right",
            animationDuration: 250,
          }}
        />
        <Stack.Screen
          name="(screens)/contact"
          options={{
            animation: "slide_from_right",
            animationDuration: 250,
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
