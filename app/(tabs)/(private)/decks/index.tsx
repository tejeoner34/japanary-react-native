import { FlatList, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import DeckListItem from '@/components/ui/deck-list-item';
import { useDecks } from '@/hooks/use-decks';

export default function TabTwoScreen() {
	const { decks, isLoading } = useDecks();
	return (
		<ThemedView style={styles.page}>
			<FlatList
				data={decks}
				keyExtractor={(item) => item.id!}
				renderItem={({ item }) => <DeckListItem deck={item} />}
				refreshing={isLoading}
			/>
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
