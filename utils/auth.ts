import { FirebaseError } from 'firebase/app';
import { AUTH_ERROR_MESSAGES } from '@/constants/error-messages';

export function mapFirebaseAuthError(error: unknown): string {
	if (error instanceof FirebaseError) {
		return AUTH_ERROR_MESSAGES[error.code] ?? 'ログインに失敗しました';
	}
	return '予期しないエラーが発生しました';
}
