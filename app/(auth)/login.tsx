import { useRouter } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedTextInput } from '@/components/themed-text-input';
import { EMAIL_OPTIONS, PASSWORD_OPTIONS } from '@/constants/form-validation';
import { useLogin } from '@/hooks/use-login';
import { mapFirebaseAuthError } from '@/utils/auth';

type FormData = {
	email: string;
	password: string;
};

export default function LoginScreen() {
	const { control, handleSubmit, setError } = useForm<FormData>({
		defaultValues: { email: '', password: '' },
	});
	const router = useRouter();
	const loginMutation = useLogin();

	const onSubmit = (data: FormData) => {
		const { email, password } = data;
		if (!email || !password) return;

		loginMutation.mutate(
			{ email, password },
			{
				onSuccess: () => {
					router.replace('/dictionary');
				},
				onError: (error) => {
					console.error('Login failed:', error.name);
					setError('password', { message: mapFirebaseAuthError(error) });
				},
			},
		);
	};

	return (
		<View style={styles.container}>
			<ThemedText style={styles.title} accessibilityRole="header">
				ログイン
			</ThemedText>

			{/* Email */}
			<Controller
				control={control}
				name="email"
				rules={EMAIL_OPTIONS}
				render={({ field: { onChange, value }, fieldState }) => (
					<View style={styles.field}>
						<ThemedTextInput
							placeholder="メールアドレス"
							value={value}
							onChangeText={onChange}
							keyboardType="email-address"
							autoCapitalize="none"
							textContentType="emailAddress"
							returnKeyType="next"
							accessibilityLabel="メールアドレス"
						/>
						{fieldState.error && (
							<ThemedText style={styles.error} accessibilityLiveRegion="polite">
								{fieldState.error.message}
							</ThemedText>
						)}
					</View>
				)}
			/>

			{/* Password */}
			<Controller
				control={control}
				name="password"
				rules={PASSWORD_OPTIONS}
				render={({ field: { onChange, value }, fieldState }) => (
					<View style={styles.field}>
						<ThemedTextInput
							placeholder="パスワード"
							value={value}
							onChangeText={onChange}
							secureTextEntry
							textContentType="password"
							returnKeyType="done"
							accessibilityLabel="パスワード"
						/>
						{fieldState.error && (
							<ThemedText style={styles.error} accessibilityLiveRegion="polite">
								{fieldState.error.message}
							</ThemedText>
						)}
					</View>
				)}
			/>

			{/* Submit */}
			<Pressable
				style={[styles.button]}
				onPress={handleSubmit(onSubmit)}
				disabled={loginMutation.isPending}
				accessibilityRole="button"
				accessibilityLabel="ログイン"
			>
				<ThemedText style={styles.buttonText}>
					{loginMutation.isPending ? 'ログイン中…' : 'ログイン'}
					{loginMutation.isPending && <ActivityIndicator />}
				</ThemedText>
			</Pressable>

			<Pressable
				onPress={() => router.push('/(auth)/register')}
				style={styles.link}
				accessibilityRole="link"
			>
				<ThemedText>アカウントを作成する</ThemedText>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		gap: 12,
	},
	title: {
		fontSize: 24,
		fontWeight: '700',
	},
	field: {
		gap: 6,
	},
	error: {
		color: 'crimson',
		fontSize: 12,
	},
	button: {
		backgroundColor: '#0a7ea4',
		paddingVertical: 12,
		borderRadius: 6,
		alignItems: 'center',
		marginTop: 8,
	},
	buttonText: {
		color: '#fff',
		fontWeight: '600',
	},
	link: {
		marginTop: 12,
		alignItems: 'center',
	},
});
