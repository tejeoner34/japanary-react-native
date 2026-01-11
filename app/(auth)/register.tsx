import { useRouter } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedTextInput } from '@/components/themed-text-input';
import { EMAIL_OPTIONS, PASSWORD_OPTIONS } from '@/constants/form-validation';
import { useRegister } from '@/hooks/use-resgister';
import { mapFirebaseAuthError } from '@/utils/auth';

type FormData = {
	email: string;
	password: string;
	confirmPassword: string;
};

export default function RegisterScreen() {
	const { control, handleSubmit, watch, setError } = useForm<FormData>({
		defaultValues: { email: '', password: '', confirmPassword: '' },
	});
	const router = useRouter();
	const registerMutation = useRegister();

	const onSubmit = (data: FormData) => {
		console.log('register', data);
		router.replace('/dictionary');
		registerMutation.mutate(data, {
			onSuccess: () => {
				router.replace('/dictionary');
			},
			onError: (error) => {
				console.error('Login failed:', error.name);
				setError('password', { message: mapFirebaseAuthError(error) });
			},
		});
	};

	const password = watch('password');

	return (
		<View style={styles.container}>
			<ThemedText style={styles.title}>アカウント作成</ThemedText>

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
						/>
						{fieldState.error && (
							<ThemedText style={styles.error}>
								{fieldState.error.message}
							</ThemedText>
						)}
					</View>
				)}
			/>

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
						/>
						{fieldState.error && (
							<ThemedText style={styles.error}>
								{fieldState.error.message}
							</ThemedText>
						)}
					</View>
				)}
			/>

			<Controller
				control={control}
				name="confirmPassword"
				rules={{
					required: '確認用パスワードは必須です',
					validate: (v) => v === password || 'パスワードが一致しません',
				}}
				render={({ field: { onChange, value }, fieldState }) => (
					<View style={styles.field}>
						<ThemedTextInput
							placeholder="確認用パスワード"
							value={value}
							onChangeText={onChange}
							secureTextEntry
						/>
						{fieldState.error && (
							<ThemedText style={styles.error}>
								{fieldState.error.message}
							</ThemedText>
						)}
					</View>
				)}
			/>

			<Pressable
				style={styles.button}
				onPress={handleSubmit(onSubmit)}
				disabled={registerMutation.isPending}
			>
				<ThemedText style={styles.buttonText}>
					登録
					{registerMutation.isPending && <ActivityIndicator />}
				</ThemedText>
			</Pressable>

			<Pressable
				onPress={() => router.push('/(auth)/login')}
				style={styles.link}
			>
				<ThemedText>既にアカウントを持っている</ThemedText>
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
