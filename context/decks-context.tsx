import { createContext, ReactNode, useState } from 'react';
import { Deck } from '@/models/decks.model';

type contextType = {
	decks: Deck[];
	setDecks: React.Dispatch<React.SetStateAction<Deck[]>>;
};
export const DecksContext = createContext<contextType | null>(null);

interface DecksContextProviderProps {
	children: ReactNode;
}
export function DecksContextProvider({ children }: DecksContextProviderProps) {
	const [decks, setDecks] = useState<Deck[]>([]);

	return (
		<DecksContext.Provider value={{ decks, setDecks }}>
			{children}
		</DecksContext.Provider>
	);
}
