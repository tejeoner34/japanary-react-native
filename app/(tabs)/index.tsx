import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import WordSearchForm from '@/components/ui/word-search-form';

export default function DictionaryScreen() {
  return (
    <ThemedView style={styles.page}>
      <div className="z-100 fixed bottom-0 right-0 left-0 p-5 bg-backgroundSecondary max-w-md w-full md:relative md:p-0"></div>
      <div className="flex flex-col gap-3">
        <ThemedText>Japanese Dictionary</ThemedText>
        <ThemedText>Search for a word in Kanji, Hiragana or Katakana. Ex: 辞書</ThemedText>
      </div>
      <View style={styles.footer}>
        <WordSearchForm />
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
