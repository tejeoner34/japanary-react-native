export interface DeckModel {
	id: string;
	name: string;
	description?: string;
	cards: FlashCardsData;
	isDefault?: boolean;
}

export interface FlashCardsData {
	totalAmount?: number;
	pendingStudyAmount: number;
	allCards?: FlashCardModel[];
	pedingStudyCards: FlashCardModel[];
}

export interface FlashCardModel {
	id: string;
	front: string;
	back: string;
	interval: number;
	repetitions: number;
	easeFactor: number;
	nextReview: Date;
	deckId: string;
	imagesUrl: Image[];
	updateWithGrade: (grade: Grade) => void;
}

export interface Image {
	id: string;
	url: string;
}

export enum Grade {
	Again = 0,
	Hard = 1,
	Medium = 2,
	Easy = 3,
}

interface NewDeckConfig {
	name: string;
	description?: string;
	cards?: FlashCardsData;
	id?: string | null;
	isDefault?: boolean;
}

export class Deck {
	id: string | null;
	name: string;
	description: string;
	cards: FlashCardsData;
	isDefault?: boolean;

	constructor({
		name,
		description,
		cards,
		id,
		isDefault = false,
	}: NewDeckConfig) {
		this.id = id || null;
		this.name = name;
		this.cards = cards || {
			allCards: [],
			pedingStudyCards: [],
			pendingStudyAmount: 0,
			totalAmount: 0,
		};
		this.description = description || '';
		this.isDefault = isDefault;
	}

	static createDefaultDeck(): Deck {
		return new Deck({
			name: 'Default',
			description: 'This is a default deck, you can modify or create new ones',
		});
	}

	addId(id: string) {
		this.id = id;
	}

	addFlashCard(flashCard: FlashCardModel): void {
		console.log(flashCard);
		// this.cards.allCards.push(flashCard);
		// this.cards.pedingStudyCards.push(flashCard);
		// this.cards.pendingStudyAmount++;
		// this.cards.totalAmount++;
	}

	updateFlashCard(flashCard: FlashCardModel): void {
		const pendingCardsIndex = this.cards.pedingStudyCards.findIndex(
			(card) => card.id === flashCard.id,
		);
		if (pendingCardsIndex !== -1)
			this.cards.pedingStudyCards[pendingCardsIndex] = flashCard;
	}

	deleteFlashCard(flashCard: FlashCardModel) {
		const { id } = flashCard;
		this.cards.pedingStudyCards = this.cards.pedingStudyCards.filter(
			(card) => card.id !== id,
		);
	}

	editDeck(deck: Deck): void {
		this.name = deck.name;
		this.description = deck.description || '';
	}

	setPendingStudyCards(pendingCards: FlashCardModel[]) {
		this.cards.pedingStudyCards = pendingCards;
	}
}

export const createDeckInstance = (rawDecks: DeckModel[]) => {
	return rawDecks.map((deck: DeckModel) => {
		const deckInstance = new Deck(deck);
		deckInstance.addId(deck.id || '');
		return deckInstance;
	});
};
