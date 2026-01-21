import { useState } from "react";
import { ScrollView, StyleSheet, View, Text, Switch } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Speech from "expo-speech";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useTracker } from "@/providers/TrackerProvider";
import { generateAssistantReply, ChatMessage } from "@/lib/ai";
import { createId } from "@/lib/id";
import { t } from "@/lib/i18n";

export function ChatScreen() {
  const { addFood, addWater, addActivity, theme } = useTracker();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState("");
  const [pendingAction, setPendingAction] = useState<any>(null);
  const [ttsEnabled, setTtsEnabled] = useState(true);

  const sendMessage = () => {
    if (!text.trim()) return;
    const userMessage: ChatMessage = {
      id: createId("msg"),
      role: "user",
      content: text.trim(),
      createdAt: new Date().toISOString(),
    };

    const reply = generateAssistantReply(text.trim());
    const assistantMessage: ChatMessage = {
      id: createId("msg"),
      role: "assistant",
      content: reply.message,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [assistantMessage, userMessage, ...prev]);
    setPendingAction(reply.action ?? null);
    if (ttsEnabled) {
      Speech.speak(reply.message, { language: "tr-TR" });
    }
    setText("");
  };

  const applyAction = async () => {
    if (!pendingAction) return;
    if (pendingAction.kind === "water") {
      await addWater(pendingAction.data);
    } else if (pendingAction.kind === "activity") {
      await addActivity(pendingAction.data);
    } else if (pendingAction.kind === "food") {
      await addFood(pendingAction.data);
    }
    setPendingAction(null);
  };

  return (
    <LinearGradient colors={theme.gradient} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AppHeader title={t("AI Asistan")} subtitle={t("Yerel yardımcı")} theme={theme} />

        <Card theme={theme} style={styles.card}>
          <Input value={text} onChangeText={setText} placeholder={t("Mesaj yaz")} theme={theme} />
          <Button label={t("Gönder")} onPress={sendMessage} theme={theme} />
          {pendingAction ? (
            <Button label={t("Öneriyi Uygula")} onPress={applyAction} theme={theme} variant="secondary" />
          ) : null}
          <View style={styles.toggleRow}>
            <Text style={[styles.toggleLabel, { color: theme.muted }]}>{t("Sesli yanıt")}</Text>
            <Switch value={ttsEnabled} onValueChange={setTtsEnabled} />
          </View>
        </Card>

        {messages.map((msg) => (
          <Card key={msg.id} theme={theme} style={msg.role === "assistant" ? styles.assistant : styles.user}>
            <Text style={[styles.messageText, { color: theme.text }]}>{msg.content}</Text>
          </Card>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 120, gap: 12 },
  card: { gap: 10 },
  toggleRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  toggleLabel: { fontFamily: "Archivo_400Regular", fontSize: 12 },
  assistant: { backgroundColor: "#f0fdf4" },
  user: { backgroundColor: "#ecfeff" },
  messageText: { fontFamily: "Archivo_400Regular", fontSize: 13 },
});
