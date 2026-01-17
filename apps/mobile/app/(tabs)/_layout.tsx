import { Tabs } from 'expo-router';
import { Home, History, PieChart, Settings, PlusCircle } from 'lucide-react-native';
import { t } from '@calai/shared';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#10b981',
      tabBarInactiveTintColor: '#9ca3af',
      tabBarStyle: {
        backgroundColor: '#fffcf9',
        borderTopWidth: 1,
        borderTopColor: '#f3f4f6',
        height: 60,
        paddingBottom: 8,
      },
      tabBarLabelStyle: {
        fontWeight: 'bold',
        fontSize: 10,
      },
      headerShown: false,
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t('Panel'),
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: t('Geçmiş'),
          tabBarIcon: ({ color }) => <History size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: t('Ekle'),
          tabBarIcon: ({ color }) => <PlusCircle size={32} color={color} />,
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: t('Rapor'),
          tabBarIcon: ({ color }) => <PieChart size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('Ayarlar'),
          tabBarIcon: ({ color }) => <Settings size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
