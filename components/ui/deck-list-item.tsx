import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDecks } from '@/hooks/use-decks';
import { Deck } from '@/models/decks.model';

export default function DeckListItem({ deck }: { deck: Deck }) {
	const { createDeck } = useDecks();

	return (
		<View style={styles.deckItem}>
			<Text style={styles.deckName}>{deck.name}</Text>
			{deck.isDefault && <Text style={styles.defaultBadge}>デフォルト</Text>}
		</View>
	);
}

const styles = StyleSheet.create({
	deckItem: {
		height: 70,
		backgroundColor: 'gray',
		paddingHorizontal: 20,
		justifyContent: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#eee',
		marginBottom: 10,
		borderRadius: 8,
	},
	deckName: { fontSize: 18, fontWeight: '500' },
	rightActionContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		width: 100,
		height: '100%',
	},
	actionText: { color: 'white', fontWeight: 'bold' },
	defaultBadge: { color: '#343a40', fontSize: 12, marginTop: 4 },
});
