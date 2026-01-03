import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import WordSearchForm from '@/components/ui/word-search-form';
import { useDictionary } from '@/hooks/use-dictionary';

export default function DictionaryScreen() {
  const [query, setQuery] = useState('');

  const { dictionary, ai, examples } = useDictionary(query);

  const handleSearch = (search: string) => {
    setQuery(search);
  };

  return (
    <ThemedView style={styles.page}>
      <div className="flex flex-col gap-3">
        <ThemedText>Japanese Dictionary</ThemedText>
        <ThemedText>Search for a word in Kanji, Hiragana or Katakana. Ex: 辞書</ThemedText>
      </div>

      {/* 検索結果 */}
      {dictionary.isLoading && <ThemedText>Loading...</ThemedText>}
      {dictionary.isError && <ThemedText>Error occurred</ThemedText>}

      {dictionary.data && <ThemedText>{JSON.stringify(dictionary.data)}</ThemedText>}

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
