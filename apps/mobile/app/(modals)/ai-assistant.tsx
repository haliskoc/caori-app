import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { t } from '@calai/shared';
import { Send, X, Mic, Sparkles, Bot, User, Heart } from 'lucide-react-native';
import { Text } from '../../src/components/atoms/Text';
import { AnimatedBackground } from '../../src/components/atoms/AnimatedBackground';
import { THEME } from '../../src/theme';
import api from '../../src/api/axios-instance';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

const GREETING_MESSAGES = [
  t("Merhaba! Sağlıklı beslenme konusunda sana yardımcı olabilirim."),
  t("Kalori hesaplama, besin değerleri veya diyet önerileri hakkında sorabilirsin."),
  t("Bugünkü hedeflerine ulaşman için buradayım!"),
];

// Animated thinking dots
function ThinkingDots() {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateDot = (dot: Animated.Value, delay: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, {
            toValue: 1,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animateDot(dot1, 0);
    animateDot(dot2, 150);
    animateDot(dot3, 300);
  }, []);

  return (
    <View style={styles.thinkingContainer}>
      {[dot1, dot2, dot3].map((dot, idx) => (
        <Animated.View
          key={idx}
          style={[
            styles.thinkingDot,
            {
              transform: [
                {
                  translateY: dot.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -6],
                  }),
                },
              ],
              opacity: dot.interpolate({
                inputRange: [0, 1],
                outputRange: [0.4, 1],
              }),
            },
          ]}
        />
      ))}
    </View>
  );
}

// Message bubble component
function MessageBubble({ message, isLast }: { message: Message; isLast: boolean }) {
  const isUser = message.role === 'user';
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 100,
        friction: 10,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.messageWrapper,
        isUser ? styles.userMessageWrapper : styles.assistantMessageWrapper,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      {/* Avatar */}
      {!isUser && (
        <View style={styles.avatarContainer}>
          <View style={styles.botAvatar}>
            <Bot size={16} color={THEME.colors.primary[600]} />
          </View>
        </View>
      )}

      {/* Message Bubble */}
      <View style={[styles.messageBubble, isUser ? styles.userBubble : styles.assistantBubble]}>
        {isUser ? (
          <View style={styles.userBubbleInner}>
            <Text style={styles.userMessageText}>{message.content}</Text>
          </View>
        ) : (
          <BlurView intensity={60} tint="light" style={styles.assistantBubbleInner}>
            <Text style={styles.assistantMessageText}>{message.content}</Text>
          </BlurView>
        )}
      </View>

      {/* User Avatar */}
      {isUser && (
        <View style={styles.avatarContainer}>
          <View style={styles.userAvatar}>
            <User size={16} color="#fff" />
          </View>
        </View>
      )}
    </Animated.View>
  );
}

// Quick suggestion chips
function SuggestionChips({ onSelect }: { onSelect: (text: string) => void }) {
  const suggestions = [
    t("Bugün ne yemeliyim?"),
    t("Protein kaynakları"),
    t("Kalori hesapla"),
    t("Su içmeyi hatırlat"),
  ];

  return (
    <View style={styles.suggestionsContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.suggestionsScroll}>
        {suggestions.map((text, idx) => (
          <TouchableOpacity key={idx} style={styles.suggestionChip} onPress={() => onSelect(text)}>
            <Text style={styles.suggestionText}>{text}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

export default function AIAssistantModal() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: GREETING_MESSAGES[Math.floor(Math.random() * GREETING_MESSAGES.length)],
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const router = useRouter();

  const handleSend = async (text?: string) => {
    const messageText = (text || input).trim();
    if (!messageText || loading) return;

    setInput('');
    const userMessage: Message = {
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      // Call the Groq API through the backend
      const response = await api.post('/chat', {
        message: messageText,
        context: 'nutrition_assistant',
      });

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.data.reply || t("Üzgünüm, anlayamadım."),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: t("Bağlantı hatası oluştu. Lütfen tekrar dene."),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
    return () => clearTimeout(timer);
  }, [messages, loading]);

  const showSuggestions = messages.length <= 2;

  return (
    <View style={styles.container}>
      <AnimatedBackground />

      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <BlurView intensity={80} tint="light" style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.headerIcon}>
              <Sparkles size={20} color={THEME.colors.primary[600]} />
            </View>
            <View>
              <Text style={styles.headerTitle}>{t("Cal AI Asistan")}</Text>
              <View style={styles.statusBadge}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>{t("Çevrimiçi")}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
            <X size={22} color={THEME.colors.text.muted} />
          </TouchableOpacity>
        </BlurView>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          {/* Messages */}
          <ScrollView
            ref={scrollViewRef}
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Welcome Card */}
            <View style={styles.welcomeCard}>
              <BlurView intensity={60} tint="light" style={styles.welcomeInner}>
                <View style={styles.welcomeIconRow}>
                  <View style={styles.welcomeIcon}>
                    <Heart size={24} color={THEME.colors.primary[500]} />
                  </View>
                </View>
                <Text style={styles.welcomeTitle}>{t("Sağlık Asistanın")}</Text>
                <Text style={styles.welcomeText}>
                  {t("Beslenme, kalori ve sağlıklı yaşam hakkında sorularını yanıtlayayım.")}
                </Text>
              </BlurView>
            </View>

            {/* Messages */}
            {messages.map((msg, idx) => (
              <MessageBubble key={idx} message={msg} isLast={idx === messages.length - 1} />
            ))}

            {/* Thinking Indicator */}
            {loading && (
              <View style={[styles.messageWrapper, styles.assistantMessageWrapper]}>
                <View style={styles.avatarContainer}>
                  <View style={styles.botAvatar}>
                    <Bot size={16} color={THEME.colors.primary[600]} />
                  </View>
                </View>
                <BlurView intensity={60} tint="light" style={styles.thinkingBubble}>
                  <ThinkingDots />
                </BlurView>
              </View>
            )}

            {/* Suggestions */}
            {showSuggestions && !loading && (
              <SuggestionChips onSelect={(text) => handleSend(text)} />
            )}
          </ScrollView>

          {/* Input Area */}
          <BlurView intensity={80} tint="light" style={styles.inputArea}>
            <TouchableOpacity style={styles.micButton}>
              <Mic size={22} color={THEME.colors.primary[600]} />
            </TouchableOpacity>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder={t("Mesajını yaz...")}
                placeholderTextColor={THEME.colors.text.muted}
                value={input}
                onChangeText={setInput}
                onSubmitEditing={() => handleSend()}
                multiline
                maxLength={500}
              />
            </View>

            <TouchableOpacity
              style={[styles.sendButton, input.trim() ? styles.sendButtonActive : styles.sendButtonInactive]}
              onPress={() => handleSend()}
              disabled={!input.trim() || loading}
            >
              <Send size={20} color={input.trim() ? '#fff' : THEME.colors.text.muted} />
            </TouchableOpacity>
          </BlurView>
        </KeyboardAvoidingView>
      </SafeAreaView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.glass.border,
    overflow: 'hidden',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
    fontSize: 18,
    fontWeight: '800',
    color: THEME.colors.text.primary,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: THEME.colors.semantic.success,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.semantic.success,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyboardView: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 24,
  },
  welcomeCard: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  welcomeInner: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  welcomeIconRow: {
    marginBottom: 16,
  },
  welcomeIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: THEME.colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: THEME.colors.text.primary,
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  messageWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 12,
    gap: 8,
  },
  userMessageWrapper: {
    justifyContent: 'flex-end',
  },
  assistantMessageWrapper: {
    justifyContent: 'flex-start',
  },
  avatarContainer: {
    width: 32,
    height: 32,
  },
  botAvatar: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: THEME.colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: THEME.colors.primary[600],
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageBubble: {
    maxWidth: '75%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  userBubble: {
    borderBottomRightRadius: 6,
  },
  assistantBubble: {
    borderBottomLeftRadius: 6,
  },
  userBubbleInner: {
    backgroundColor: THEME.colors.primary[600],
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  assistantBubbleInner: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  userMessageText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
    lineHeight: 22,
  },
  assistantMessageText: {
    fontSize: 15,
    fontWeight: '600',
    color: THEME.colors.text.primary,
    lineHeight: 22,
  },
  thinkingBubble: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 20,
    borderBottomLeftRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    overflow: 'hidden',
  },
  thinkingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  thinkingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: THEME.colors.primary[500],
  },
  suggestionsContainer: {
    marginTop: 8,
  },
  suggestionsScroll: {
    paddingVertical: 8,
    gap: 8,
  },
  suggestionChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: THEME.colors.glass.border,
  },
  suggestionText: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.colors.primary[700],
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: Platform.OS === 'ios' ? 28 : 12,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.glass.border,
    gap: 12,
    overflow: 'hidden',
  },
  micButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: THEME.colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: THEME.colors.glass.border,
    minHeight: 44,
    maxHeight: 120,
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 12,
    fontSize: 15,
    fontWeight: '600',
    color: THEME.colors.text.primary,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonActive: {
    backgroundColor: THEME.colors.primary[600],
    ...THEME.shadow.md,
  },
  sendButtonInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
});
