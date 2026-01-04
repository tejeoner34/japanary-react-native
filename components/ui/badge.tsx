import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

type BadgeVariant = 'common' | 'jlpt';

type Props = {
	variant: BadgeVariant;
	children: string | string[];
};

export default function Badge({ variant, children }: Props) {
	const backgroundColor = useThemeColor(
		{},
		variant === 'common' ? 'badge1' : 'inputBackground',
	);
	const textColor = useThemeColor(
		{},
		variant === 'common' ? 'background' : 'text',
	);

	return (
		<View style={[styles.badge, { backgroundColor }]}>
			<ThemedText style={[styles.text, { color: textColor }]}>
				{children}
			</ThemedText>
		</View>
	);
}

const styles = StyleSheet.create({
	badge: {
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 4,
	},

	text: {
		fontSize: 12,
		fontWeight: '500',
	},
});
