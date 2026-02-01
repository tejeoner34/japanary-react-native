import { FIREBASE_AUTH } from '@/firebase/firebase.config';
import { useLogout } from '@/hooks/use-logout';
import { onAuthStateChanged, User } from 'firebase/auth';
import { createContext, ReactNode, useEffect, useState } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<{
  user: User | null;
  logout: ReturnType<typeof useLogout>;
}>({
  user: null,
  logout: undefined as any,
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const logout = useLogout();

  useEffect(() => {
    const unsub = onAuthStateChanged(FIREBASE_AUTH, (u) => {
      console.log('User changed:', u);
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  if (loading) return <div>loading</div>; // or splash

  return <AuthContext.Provider value={{ user, logout }}>{children}</AuthContext.Provider>;
}
