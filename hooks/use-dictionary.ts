import { dictionaryApi } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

export const useDictionary = (query: string) => {
  const enabled = !!query.trim();

  const dictionaryQuery = useQuery({
    queryKey: ['dictionary', 'search', query],
    queryFn: () => dictionaryApi.search(query),
    enabled,
    staleTime: 1000 * 60 * 5,
  });

  const aiQuery = useQuery({
    queryKey: ['dictionary', 'ai', query],
    queryFn: () => dictionaryApi.aiQuery(query),
    enabled: false,
    staleTime: 1000 * 60 * 30,
  });

  const examplesQuery = useQuery({
    queryKey: ['dictionary', 'examples', query],
    queryFn: () => dictionaryApi.sampleSentences(query),
    enabled,
    staleTime: 1000 * 60 * 10,
  });

  return {
    dictionary: dictionaryQuery,
    ai: aiQuery,
    examples: examplesQuery,
    fetchAi: aiQuery.refetch,
  };
};
