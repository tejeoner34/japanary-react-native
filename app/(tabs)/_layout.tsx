import { Tabs } from 'expo-router';
import React, { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { AuthContext } from '@/context/auth-context';
import { DecksContextProvider } from '@/context/decks-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useDecks } from '@/hooks/use-decks';
import { Button } from 'tamagui';

function TabsContent() {
  const colorScheme = useColorScheme();
  const { isLoading } = useDecks();
  const { user, logout } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        headerRight: () =>
          user ? (
            <Button onPress={() => logout.mutate()} mr="$3" pressStyle={{ opacity: 0.6 }}>
              Log out
            </Button>
          ) : null,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="dictionary"
        options={{
          title: 'Dictionary',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="(private)/decks"
        options={{
          title: 'Decks',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}

export default function TabLayout() {
  return (
    <DecksContextProvider>
      <TabsContent />
    </DecksContextProvider>
  );
}
