import { Redirect } from "expo-router";
import { useStore } from "../src/store";

export default function Index() {
  const user = useStore((state) => state.user);
  const onboardingCompleted = useStore(
    (state) => state.settings.onboardingCompleted,
  );

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  if (!onboardingCompleted) {
    return <Redirect href="/onboarding" />;
  }

  return <Redirect href="/(tabs)" />;
}
