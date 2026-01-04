import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { StyleSheet, View } from 'react-native';

type Props = {
	title: string;
	children: React.ReactNode;
};

export default function Section({ title, children }: Props) {
	const borderColor = useThemeColor({}, 'inputBorder');

	return (
		<View style={[styles.container, { borderTopColor: borderColor }]}>
			<ThemedText style={styles.title}>{title}</ThemedText>
			<View style={styles.content}>{children}</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 24,
		paddingTop: 16,
		borderTopWidth: StyleSheet.hairlineWidth,
		gap: 8,
	},

	title: {
		fontSize: 18,
		fontWeight: '600',
	},

	content: {
		gap: 12,
	},
});
