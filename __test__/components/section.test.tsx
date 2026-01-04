import React from 'react';
import { Text } from 'react-native';
import Section from '@/components/ui/section';
import * as themeHook from '@/hooks/use-theme-color';
import { render } from '../test-utils';

describe('Section', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('renders title and children', () => {
		const { getByText } = render(
			<Section title="My Title">
				<Text>Child content</Text>
			</Section>,
		);

		expect(getByText('My Title')).toBeTruthy();
		expect(getByText('Child content')).toBeTruthy();
	});

	it('applies border color from useThemeColor', () => {
		jest.spyOn(themeHook, 'useThemeColor').mockReturnValue('hotpink' as any);

		const { toJSON } = render(
			<Section title="Title">
				<Text>Child</Text>
			</Section>,
		);

		const tree = toJSON();
		expect(tree).toBeTruthy();
		expect(tree?.props.style).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ borderTopColor: 'hotpink' }),
			]),
		);
	});
});
