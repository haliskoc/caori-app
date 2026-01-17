import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { t } from '@calai/shared';
import { Send, X, Mic, Sparkles } from 'lucide-react-native';
import { Text } from '../../src/components/atoms/Text';
import api from '../../src/api/axios-instance';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function AIAssistantModal() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: t("Merhaba! Bugün sana nasıl yardımcı olabilirim? Öğünlerini kaydedebilir veya sağlık sorularını sorabilirsin.") }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const router = useRouter();

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await api.post('/chat', { message: userMessage });
      setMessages(prev => [...prev, { role: 'assistant', content: response.data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: t("Üzgünüm, şu an bağlantı kuramıyorum.") }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
        <View className="flex-row items-center gap-2">
          <View className="bg-emerald-100 p-2 rounded-full">
            <Sparkles size={18} color="#10b981" />
          </View>
          <Text variant="h3">{t("Cal AI Asistan")}</Text>
        </View>
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <X size={24} color="#9ca3af" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView 
          ref={scrollViewRef}
          className="flex-1 px-4 py-4"
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {messages.map((msg, idx) => (
            <View 
              key={idx} 
              className={`mb-4 max-w-[85%] ${msg.role === 'user' ? 'self-end bg-emerald-600 rounded-2xl rounded-tr-none' : 'self-start bg-gray-100 rounded-2xl rounded-tl-none'}`}
            >
              <View className="p-4">
                <Text className={msg.role === 'user' ? 'text-white font-bold' : 'text-gray-900 font-bold'}>
                  {msg.content}
                </Text>
              </View>
            </View>
          ))}
          {loading && (
            <View className="self-start bg-gray-100 p-4 rounded-2xl rounded-tl-none mb-4">
              <Text className="text-gray-400 italic font-bold">{t("Düşünüyor...")}</Text>
            </View>
          )}
        </ScrollView>

        <View className="p-4 border-t border-gray-100 bg-white flex-row items-center gap-3">
          <TouchableOpacity className="h-12 w-12 bg-emerald-50 rounded-full items-center justify-center">
            <Mic size={24} color="#10b981" />
          </TouchableOpacity>
          <TextInput
            className="flex-1 h-12 bg-gray-50 border border-gray-100 rounded-2xl px-4 font-bold text-gray-900"
            placeholder={t("Mesajını yaz...")}
            value={input}
            onChangeText={setInput}
            onSubmitEditing={handleSend}
          />
          <TouchableOpacity 
            onPress={handleSend}
            disabled={!input.trim() || loading}
            className={`h-12 w-12 rounded-full items-center justify-center ${input.trim() ? 'bg-emerald-600' : 'bg-gray-200'}`}
          >
            <Send size={20} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
