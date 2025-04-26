'use client';

import { Deck } from '@/types/deck';
import { useState } from 'react';

interface DeckEditorProps {
  deck: Deck;
}

export function DeckEditor({ deck }: DeckEditorProps) {
  const [title, setTitle] = useState(deck.content.title);
  const [description, setDescription] = useState(deck.content.description);

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/decks/${deck.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save deck');
      }
    } catch (error) {
      console.error('Error saving deck:', error);
    }
  };

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Edit Deck</h1>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={4}
          />
        </div>
      </div>
    </div>
  );
} 