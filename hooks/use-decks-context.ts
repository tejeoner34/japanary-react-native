import { useContext } from 'react';
import { DecksContext } from '@/context/decks-context';

export function useDecksContext() {
	const decksContext = useContext(DecksContext);
	if (!decksContext)
		throw new Error('useDecksContext must be used within DecksContextProvider');
	return decksContext;
}
