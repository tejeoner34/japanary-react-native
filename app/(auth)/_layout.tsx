import { Stack } from 'expo-router';
import { useRouteAuthGuard } from '@/hooks/use-route-auth-guard';

export default function AuthLayout() {
	useRouteAuthGuard();
	return <Stack screenOptions={{ headerShown: false }} />;
}
