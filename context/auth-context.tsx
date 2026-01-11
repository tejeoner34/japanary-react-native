import { onAuthStateChanged, User } from 'firebase/auth';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { FIREBASE_AUTH } from '@/firebase/firebase.config';

interface AuthProviderProps {
	children: ReactNode;
}

const AuthContext = createContext<{ user: User | null }>({ user: null });

export function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsub = onAuthStateChanged(FIREBASE_AUTH, (u) => {
			console.log('User changed:', u);
			setUser(u);
			setLoading(false);
		});
		return unsub;
	}, []);

	if (loading) return null; // or splash

	return (
		<AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
	);
}
