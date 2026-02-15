import { ThemedView } from '@/components/themed-view';
import DeckListItem from '@/components/ui/deck-list-item';
import DeckOptionsButton from '@/components/ui/deck-options-button';
import { useDecks } from '@/hooks/use-decks';
import { useFormDialog } from '@/hooks/use-form-dialog';
import { useMemo } from 'react';
import { FlatList, StyleSheet } from 'react-native';

export default function TabTwoScreen() {
  const { decks, isLoading } = useDecks();
  const { openDeckForm } = useFormDialog();
  const moreOptions = useMemo(
    () => [
      {
        label: 'Create deck',
        isDestructive: false,
        action: () => {
          console.log('Create deck');
          openDeckForm();
        },
      },
      {
        label: 'Create flashcard',
        isDestructive: false,
        action: () => {
          console.log('Create flashcard');
        },
      },
    ],
    []
  );
  return (
    <ThemedView style={styles.page}>
      <FlatList
        style={styles.list}
        data={decks}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => <DeckListItem deck={item} />}
        refreshing={isLoading}
      />
      <DeckOptionsButton actions={moreOptions} />
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
  list: {
    flex: 1,
    width: '100%',
  },
  footer: {
    position: 'fixed',
    bottom: 60,
    width: '100%',
  },
});
