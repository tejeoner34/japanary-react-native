import { Tabs } from 'expo-router';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { DecksContextProvider } from '@/context/decks-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useDecks } from '@/hooks/use-decks';

function TabsContent() {
	const colorScheme = useColorScheme();
	const { isLoading } = useDecks();

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
				tabBarButton: HapticTab,
			}}
		>
			<Tabs.Screen
				name="dictionary"
				options={{
					title: 'Dictionary',
					tabBarIcon: ({ color }) => (
						<IconSymbol size={28} name="house.fill" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="(private)/decks"
				options={{
					title: 'Decks',
					tabBarIcon: ({ color }) => (
						<IconSymbol size={28} name="paperplane.fill" color={color} />
					),
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
