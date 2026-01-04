import { StyleSheet, TextInput, type TextInputProps } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextInputProps = TextInputProps & {
	lightColor?: string;
	darkColor?: string;
};

export function ThemedTextInput({
	style,
	lightColor,
	darkColor,
	...rest
}: ThemedTextInputProps) {
	const textColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		'text',
	);
	const backgroundColor = useThemeColor({}, 'inputBackground');
	const borderColor = useThemeColor({}, 'inputBorder');
	const placeHolderColor = useThemeColor({}, 'placeholder');

	return (
		<TextInput
			style={[
				styles.input,
				{
					color: textColor,
					backgroundColor,
					borderColor,
				},
				style,
			]}
			placeholderTextColor={placeHolderColor}
			{...rest}
		/>
	);
}

const styles = StyleSheet.create({
	input: {
		fontSize: 16,
		paddingHorizontal: 12,
		paddingVertical: 10,
		borderWidth: 1,
		borderRadius: 12,
	},
});
