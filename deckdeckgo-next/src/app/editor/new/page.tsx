"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { Template } from '@/types/template';

// This would typically come from your database or API
const defaultTemplates = [
  {
    id: 'title',
    data: {
      tag: 'deckgo-slide-title',
      slots: [
        {
          name: 'title',
          placeholder: 'Add a title',
          types: ['h1', 'h2', 'h3'],
        },
        {
          name: 'content',
          placeholder: 'Add some content',
          types: ['p', 'div'],
        },
      ],
    },
  },
  {
    id: 'content',
    data: {
      tag: 'deckgo-slide-content',
      slots: [
        {
          name: 'title',
          placeholder: 'Add a title',
          types: ['h1', 'h2', 'h3'],
        },
        {
          name: 'content',
          placeholder: 'Add some content',
          types: ['p', 'div'],
        },
      ],
    },
  },
  {
    id: 'split',
    data: {
      tag: 'deckgo-slide-split',
      slots: [
        {
          name: 'start',
          placeholder: 'Add content for the left side',
          types: ['p', 'div'],
        },
        {
          name: 'end',
          placeholder: 'Add content for the right side',
          types: ['p', 'div'],
        },
      ],
    },
  },
];

export default function NewEditorPage() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get('template');
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const checkAuth = async () => {
      const session = await getServerSession(authOptions);
      if (!session) {
        redirect('/auth/signin');
      }
    };
    checkAuth();

    // Find the selected template
    if (templateId) {
      const selectedTemplate = defaultTemplates.find(t => t.id === templateId);
      if (selectedTemplate) {
        setTemplate(selectedTemplate);
      }
    }
    setLoading(false);
  }, [templateId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!template) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Template not found</h1>
          <p className="mt-2 text-gray-500">The selected template could not be found.</p>
          <a
            href="/templates"
            className="mt-4 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            Back to Templates
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col">
      <header className="border-b border-gray-200 bg-white px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">New Presentation</h1>
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-auto p-4">
          <div className="mx-auto max-w-4xl">
            {/* Editor content will go here */}
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <h2 className="text-lg font-medium text-gray-900">{template.id}</h2>
              <div className="mt-4 space-y-4">
                {template.data.slots?.map((slot) => (
                  <div key={slot.name} className="rounded-md border border-gray-200 p-4">
                    <h3 className="text-sm font-medium text-gray-900">{slot.name}</h3>
                    <div className="mt-2">
                      <textarea
                        className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        placeholder={slot.placeholder}
                        rows={3}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 