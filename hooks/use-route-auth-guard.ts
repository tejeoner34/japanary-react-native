import { useRouter, useSegments } from 'expo-router';
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/context/auth-context';

export const useRouteAuthGuard = () => {
	const { user } = useContext(AuthContext);
	const segments = useSegments();
	const router = useRouter();

	useEffect(() => {
		const inAprivatePath = segments[1] === '(private)';
		const inAuthPath = segments[0] === '(auth)';

		if (!user && inAprivatePath) {
			router.replace('/(auth)/login');
		} else if (user && inAuthPath) {
			router.replace('/(tabs)/explore');
		}
	}, [user, segments]);
};
