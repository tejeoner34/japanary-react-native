export const EMAIL_OPTIONS = {
	required: 'メールアドレスは必須です',
	pattern: {
		value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
		message: 'メールアドレスの形式が正しくありません',
	},
};

export const PASSWORD_OPTIONS = { required: 'パスワードは必須です' };
