import { fireEvent, render, screen, waitFor } from '@/__test__/test-utils';
import WordSearchForm from '@/components/ui/word-search-form';
import React from 'react';

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

  it('calls onSearch with query when submitted', async () => {
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
