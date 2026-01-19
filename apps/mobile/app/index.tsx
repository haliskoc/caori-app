import { Redirect } from "expo-router";
import { useStore } from "../src/store";

export default function Index() {
  const user = useStore((state) => state.user);

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Redirect href="/(tabs)" />;
}
