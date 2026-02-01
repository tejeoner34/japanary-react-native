import firebaseService from '@/services/firebase/firebase.service';
import { useMutation } from '@tanstack/react-query';

export function useLogout() {
  return useMutation({
    mutationFn: () => firebaseService.signOut(),
  });
}
