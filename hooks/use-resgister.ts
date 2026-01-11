import { useMutation } from '@tanstack/react-query';
import firebaseService from '@/services/firebase/firebase.service';

export function useRegister() {
	return useMutation({
		mutationFn: ({ email, password }: { email: string; password: string }) =>
			firebaseService.createUser(email, password),
	});
}
