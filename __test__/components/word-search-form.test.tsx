/* eslint-disable @typescript-eslint/no-require-imports */
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import React from 'react';
import WordSearchForm from '../../components/ui/word-search-form';

jest.mock('@/hooks/use-theme-color', () => ({
  useThemeColor: jest.fn(() => '#007AFF'),
}));

jest.mock('@/components/themed-text', () => {
  const React = require('react');
  const { Text } = require('react-native');

  return {
    ThemedText: ({ children }: any) => <Text>{children}</Text>,
  };
});

jest.mock('@/components/themed-text-input', () => {
  const { TextInput } = require('react-native');
  return {
    ThemedTextInput: TextInput,
  };
});

describe('WordSearchForm', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  it('renders search input and button', () => {
    render(<WordSearchForm onSearch={mockOnSearch} />);
    expect(screen.getByPlaceholderText('言葉を検索（例：辞書）')).toBeTruthy();
    expect(screen.getByText('検索')).toBeTruthy();
  });

  it('calls onSearch with query and resets form on submit', async () => {
    render(<WordSearchForm onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText('言葉を検索（例：辞書）');
    const button = screen.getByText('検索');

    fireEvent.changeText(input, 'test query');
    fireEvent.press(button);

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('test query');
    });
  });

  it('clears input after search', async () => {
    render(<WordSearchForm onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText('言葉を検索（例：辞書）');
    const button = screen.getByText('検索');

    fireEvent.changeText(input, 'test');
    fireEvent.press(button);

    await waitFor(() => {
      expect(input.props.value).toBe('');
    });
  });
});
