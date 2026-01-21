import { NavigationContainer, createNavigationContainerRef } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/providers/AppProvider";
import { useTracker } from "@/providers/TrackerProvider";
import { DashboardScreen } from "@/screens/DashboardScreen";
import { AddEntryScreen } from "@/screens/AddEntryScreen";
import { HistoryScreen } from "@/screens/HistoryScreen";
import { ReportScreen } from "@/screens/ReportScreen";
import { SettingsScreen } from "@/screens/SettingsScreen";
import { ProfileScreen } from "@/screens/ProfileScreen";
import { GoalsScreen } from "@/screens/GoalsScreen";
import { MeasurementsScreen } from "@/screens/MeasurementsScreen";
import { FoodLibraryScreen } from "@/screens/FoodLibraryScreen";
import { FoodSearchScreen } from "@/screens/FoodSearchScreen";
import { SleepScreen } from "@/screens/SleepScreen";
import { ChatScreen } from "@/screens/ChatScreen";
import { HelpScreen } from "@/screens/HelpScreen";
import { FaqScreen } from "@/screens/FaqScreen";
import { ContactScreen } from "@/screens/ContactScreen";
import { LegalScreen } from "@/screens/LegalScreen";
import { PricingScreen } from "@/screens/PricingScreen";
import { PremiumScreen } from "@/screens/PremiumScreen";
import { OnboardingScreen } from "@/screens/OnboardingScreen";
import { useEffect, useState } from "react";
import { getProfile, isProfileComplete } from "@/lib/profile";
import { LoadingScreen } from "@/components/LoadingScreen";

const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const navigationRef = createNavigationContainerRef();

function MainTabs() {
  const { theme } = useTracker();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.surface,
          borderTopColor: theme.border,
          height: 64,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: theme.accent,
        tabBarInactiveTintColor: theme.muted,
        tabBarIcon: ({ color, size }) => {
          let icon = "home" as keyof typeof Ionicons.glyphMap;
          if (route.name === "Add") icon = "add-circle";
          if (route.name === "History") icon = "time";
          if (route.name === "Report") icon = "bar-chart";
          if (route.name === "Settings") icon = "settings";
          return <Ionicons name={icon} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Add" component={AddEntryScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Report" component={ReportScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function AuthedNavigator() {
  const { theme } = useTracker();
  const { user } = useAuth();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ready || !user?.id || !navigationRef.isReady()) return;
    getProfile(user.id)
      .then((profile) => {
        if (!isProfileComplete(profile)) {
          navigationRef.navigate("Onboarding" as never);
        }
      })
      .catch(() => undefined);
  }, [ready, user?.id]);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => setReady(true)}
      theme={{
        dark: false,
        colors: {
          primary: theme.accent,
          background: theme.background,
          card: theme.surface,
          text: theme.text,
          border: theme.border,
          notification: theme.accent,
        },
      }}
    >
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Main" component={MainTabs} />
        <RootStack.Screen name="Profile" component={ProfileScreen} />
        <RootStack.Screen name="Goals" component={GoalsScreen} />
        <RootStack.Screen name="Measurements" component={MeasurementsScreen} />
        <RootStack.Screen name="FoodLibrary" component={FoodLibraryScreen} />
        <RootStack.Screen name="FoodSearch" component={FoodSearchScreen} />
        <RootStack.Screen name="Sleep" component={SleepScreen} />
        <RootStack.Screen name="Chat" component={ChatScreen} />
        <RootStack.Screen name="Onboarding" component={OnboardingScreen} />
        <RootStack.Screen name="Help" component={HelpScreen} />
        <RootStack.Screen name="FAQ" component={FaqScreen} />
        <RootStack.Screen name="Contact" component={ContactScreen} />
        <RootStack.Screen name="Legal" component={LegalScreen} />
        <RootStack.Screen name="Pricing" component={PricingScreen} />
        <RootStack.Screen name="Premium" component={PremiumScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export function AppNavigator() {
  const { user } = useAuth();
  if (!user) {
    return <LoadingScreen />;
  }
  return <AuthedNavigator />;
}
