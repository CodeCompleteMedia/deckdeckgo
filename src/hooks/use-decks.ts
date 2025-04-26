import { useState } from 'react';
import { Deck, CreateDeckInput } from '@/types/deck';

export function useDecks() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDecks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/decks');
      if (!response.ok) {
        throw new Error('Failed to fetch decks');
      }
      const data = await response.json();
      setDecks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createDeck = async (input: CreateDeckInput) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/decks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });
      if (!response.ok) {
        throw new Error('Failed to create deck');
      }
      const newDeck = await response.json();
      setDecks((prev) => [newDeck, ...prev]);
      return newDeck;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    decks,
    loading,
    error,
    fetchDecks,
    createDeck,
  };
} 