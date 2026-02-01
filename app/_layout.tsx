import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import '@tamagui/native/setup-teleport';
import { ToastProvider, ToastViewport } from '@tamagui/toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { AppToast } from '@/components/ui/app-toast';
import { AuthProvider } from '@/context/auth-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { config } from '@/tamagui.config';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { TamaguiProvider } from 'tamagui';

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
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <ToastProvider>
              <AppToast />
              <ToastViewport flexDirection="column" top={20} left={0} right={0} />
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
              </Stack>
              <StatusBar style="auto" />
            </ToastProvider>
          </ThemeProvider>
        </TamaguiProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
