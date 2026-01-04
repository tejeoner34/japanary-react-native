/**
 * API Service Layer
 * Centralized API configuration and requests for the Japanary app
 */

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.example.com';
const API_TIMEOUT = 10000; // 10 seconds

interface APIError extends Error {
  status?: number;
  data?: unknown;
}

/**
 * Generic fetch wrapper with error handling and timeout
 */
async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const error: APIError = new Error(`API Error: ${response.statusText}`);
      error.status = response.status;
      try {
        error.data = await response.json();
      } catch {
        error.data = response.statusText;
      }
      throw error;
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
    }
    throw error;
  }
}

/**
 * Dictionary API endpoints
 */
export const dictionaryApi = {
  /**
   * Search for a word in the dictionary
   * @param query - The word to search for (Japanese text)
   */
  search: async (query: string) => {
    if (!query.trim()) {
      return [];
    }
    return apiCall<SearchResult[]>(`/dictionary?keyword=${encodeURIComponent(query)}`);
  },
  sampleSentences: async (query: string) => {
    return apiCall<ExampleSentence[]>(
      `/dictionary/sample-sentence?keyword=${encodeURIComponent(query)}`
    );
  },
  aiQuery: async (query: string) => {
    return apiCall<AiResponse>(`/dictionary/search-ai?keyword=${encodeURIComponent(query)}`);
  },
};

export interface SearchResult {
  slug: string;
  isCommon: boolean;
  jlptLevels: string[];
  japaneseReadings: JapaneseReading[];
  senses: Sense[];
}

export interface JapaneseReading {
  word?: string;
  reading: string;
}

export interface Sense {
  englishDefinitions: string[];
  wordTypes: string[];
  tags: string[];
  seeAlso: string[];
  sentences?: string[];
}

export interface JapaneseSentence {
  furigana: string;
  word: string;
}

export interface ExampleSentence {
  english: string;
  japanese: JapaneseSentence[];
}

export type AiResponse = string;
