import {
	createUserWithEmailAndPassword,
	FIREBASE_AUTH,
	signInWithEmailAndPassword,
} from '@/firebase/firebase.config';

class FirebaseService {
	async createUser(email: string, password: string) {
		return createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
	}

	async signIn(email: string, password: string) {
		return signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
	}

	async signOut() {
		return FIREBASE_AUTH.signOut();
	}
}

export default new FirebaseService();

export interface AuthError {
	code: number;
	message: string;
	errors: Error[];
}

export interface Error {
	message: string;
	domain: string;
	reason: string;
}
