import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import DictionaryEntry from '@/components/ui/dictionary-entry';
import ExampleItem from '@/components/ui/example.-item';
import Section from '@/components/ui/section';
import WordSearchForm from '@/components/ui/word-search-form';
import { useDictionary } from '@/hooks/use-dictionary';

export default function SearchResultsScreen() {
  const router = useRouter();
  const { query } = useLocalSearchParams<{ query?: string }>();

  const keyword = Array.isArray(query) ? query[0] : query ?? '';

  const { dictionary, ai, examples } = useDictionary(keyword);

  const handleSearch = (newQuery: string) => {
    if (!newQuery.trim()) return;

    router.replace({
      pathname: '/dictionary/search-results',
      params: { query: newQuery },
    });
  };

  return (
    <ThemedView style={styles.page}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Dictionary */}
        {dictionary.isLoading && <ThemedText>Loading...</ThemedText>}

        {dictionary.isError && <ThemedText>Error occurred</ThemedText>}

        {dictionary.data?.map((result) => (
          <DictionaryEntry key={result.slug} result={result} onSeeAlso={handleSearch} />
        ))}

        {/* Example Sentences */}
        {examples.data && (
          <Section title="Example Sentences">
            {examples.data.map((example, index) => (
              <ExampleItem key={index} example={example} />
            ))}
          </Section>
        )}
      </ScrollView>
      <WordSearchForm onSearch={handleSearch} initialValue={keyword} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 16,
  },
});
