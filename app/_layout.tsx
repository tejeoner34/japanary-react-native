import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native';
import '@tamagui/native/setup-teleport';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { TamaguiProvider } from 'tamagui';
import { AuthProvider } from '@/context/auth-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { config } from '@/tamagui.config';

export const unstable_settings = {
	anchor: '(tabs)',
};

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded] = useFonts({
		Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
		InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
	});
	const colorScheme = useColorScheme();

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<TamaguiProvider config={config} defaultTheme={colorScheme!}>
					<ThemeProvider
						value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
					>
						<Stack>
							<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
							<Stack.Screen name="(auth)" options={{ headerShown: false }} />
							<Stack.Screen
								name="modal"
								options={{ presentation: 'modal', title: 'Modal' }}
							/>
						</Stack>
						<StatusBar style="auto" />
					</ThemeProvider>
				</TamaguiProvider>
			</AuthProvider>
		</QueryClientProvider>
	);
}
