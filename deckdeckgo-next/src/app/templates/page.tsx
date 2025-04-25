import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { TemplateShowcase } from '@/components/templates/TemplateShowcase';
import Link from 'next/link';

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

export default async function TemplatesPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Presentation Templates</h1>
        <p className="mt-1 text-sm text-gray-500">
          Choose a template to start creating your presentation.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {defaultTemplates.map((template) => (
          <Link
            key={template.id}
            href={`/editor/new?template=${template.id}`}
            className="block"
          >
            <TemplateShowcase
              template={template}
              customTappable
            />
          </Link>
        ))}
      </div>
    </div>
  );
} 