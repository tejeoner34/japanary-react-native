import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Deck } from '@/models/decks.model';
import { FirebaseDecksService } from '@/services/firebase/firebase-decks.service';

const firebaseDecksService = new FirebaseDecksService();

export function useDecks() {
	const queryClient = useQueryClient();

	const {
		data: decks = [],
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['decks'],
		queryFn: async () => {
			const fetchedDecks = await firebaseDecksService.getDecks();
			return fetchedDecks;
		},
		staleTime: 5 * 60 * 1000,
		retry: 2,
	});

	const createDeckMutation = useMutation({
		mutationFn: (newDeck: Deck) => firebaseDecksService.createDeck(newDeck),
		onSuccess: () => {
			// ✅ ここで 'decks' キーのキャッシュを無効化
			// これにより、React Queryが自動的に getDecks() を再実行してくれます
			queryClient.invalidateQueries({ queryKey: ['decks'] });
		},
	});

	return {
		decks,
		isLoading,
		isError,
		error: error as Error | null,
		createDeck: createDeckMutation.mutate,
		isCreating: createDeckMutation.isPending,
	};
}
