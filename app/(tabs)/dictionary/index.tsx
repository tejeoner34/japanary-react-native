import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import WordSearchForm from '@/components/ui/word-search-form';

export default function DictionaryScreen() {
	const router = useRouter();

	const handleSearch = (query: string) => {
		router.push({
			pathname: '/dictionary/search-results',
			params: { query },
		});
	};

	return (
		<ThemedView style={styles.page}>
			<div className="flex flex-col gap-3">
				<ThemedText>Japanese Dictionary</ThemedText>
				<ThemedText>
					Search for a word in Kanji, Hiragana or Katakana. Ex: 辞書
				</ThemedText>
			</div>

			<View style={styles.footer}>
				<WordSearchForm onSearch={handleSearch} />
			</View>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		gap: 16,
		padding: 16,
	},
	footer: {
		position: 'fixed',
		bottom: 60,
		width: '100%',
	},
});
