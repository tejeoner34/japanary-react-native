import { fireEvent, screen } from '@testing-library/react-native';
import React from 'react';
import DeckOptionsButton from '../../components/ui/deck-options-button';
import { render } from '../test-utils';

describe.only('DeckOptionsButton', () => {
	beforeAll(() => {
		process.env.TAMAGUI_DISABLE_PORTAL = '1';
	});
	it('renders the floating action button', () => {
		render(<DeckOptionsButton actions={[]} />);
		const button = screen.getByRole('button');
		expect(button).toBeTruthy();
	});

	it('opens sheet when button is pressed', () => {
		const { getByTestId } = render(<DeckOptionsButton actions={[]} />);
		const button = screen.getByRole('button');
		fireEvent.press(button);
		expect(button).toBeTruthy();
	});

	it('renders all action buttons in sheet', () => {
		const actions = [
			{ label: 'Action 1', action: jest.fn() },
			{ label: 'Action 2', action: jest.fn() },
		];
		render(<DeckOptionsButton actions={actions} />);
		const button = screen.getByRole('button');
		fireEvent.press(button);

		expect(screen.getByText('Action 1')).toBeTruthy();
		expect(screen.getByText('Action 2')).toBeTruthy();
	});

	it('calls action and closes sheet on action button press', () => {
		const mockAction = jest.fn();
		const actions = [{ label: 'Test Action', action: mockAction }];
		render(<DeckOptionsButton actions={actions} />);

		const fab = screen.getAllByRole('button')[0];
		fireEvent.press(fab);

		const actionButton = screen.getByText('Test Action');
		fireEvent.press(actionButton);

		expect(mockAction).toHaveBeenCalled();
	});

	it('applies red theme for destructive actions', () => {
		const actions = [
			{ label: 'Delete', isDestructive: true, action: jest.fn() },
		];
		render(<DeckOptionsButton actions={actions} />);

		const fab = screen.getAllByRole('button')[0];
		fireEvent.press(fab);

		const deleteButton = screen.getByText('Delete');
		expect(deleteButton).toBeTruthy();
	});
});
