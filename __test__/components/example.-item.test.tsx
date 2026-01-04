import ExampleItem from '@/components/ui/example.-item';
import { ExampleSentence } from '@/services/api';
import React from 'react';
import { render } from '../test-utils';

describe('ExampleItem', () => {
	it('renders japanese and english sentence', () => {
		const example: ExampleSentence = {
			english: 'This is a test sentence',
			japanese: [
				{ word: 'これは', furigana: 'これは' },
				{ word: 'テストです', furigana: 'テストです' },
			],
		};

		const { getByText } = render(<ExampleItem example={example} />);

		expect(getByText('これはテストです')).toBeTruthy();
		expect(getByText('This is a test sentence')).toBeTruthy();
	});

	it('joins japanese words correctly', () => {
		const example: ExampleSentence = {
			english: 'Hello world',
			japanese: [
				{ word: 'こんにちは', furigana: 'こんにちは' },
				{ word: '世界', furigana: 'せかい' },
			],
		};

		const { getByText } = render(<ExampleItem example={example} />);

		expect(getByText('こんにちは世界')).toBeTruthy();
	});

	it('renders with a single japanese word', () => {
		const example: ExampleSentence = {
			english: 'Single word',
			japanese: [{ word: '単語', furigana: 'たんご' }],
		};

		const { getByText } = render(<ExampleItem example={example} />);

		expect(getByText('単語')).toBeTruthy();
	});
});
