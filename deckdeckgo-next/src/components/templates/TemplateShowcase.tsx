"use client";

import { TemplateShowcaseProps } from '@/types/template';
import { Skeleton } from './ui/skeleton';

export function TemplateShowcase({ template, author, customTappable, onClick }: TemplateShowcaseProps) {
  const Element = template.data.tag;

  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-white shadow transition-all hover:shadow-md ${
        customTappable ? 'cursor-pointer' : ''
      }`}
      onClick={onClick}
    >
      <div className="aspect-video w-full">
        <div className="h-full w-full">
          <Element>
            {template.data.slots?.map((slot) => (
              <Skeleton key={slot.name} className="h-4 w-3/5" slot={slot.name} />
            ))}
          </Element>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900">{template.data.tag}</h3>
        {author && template.data.author && (
          <p className="mt-1 text-xs text-gray-500">
            by{' '}
            <a
              href={template.data.author.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-500"
            >
              {template.data.author.name}
            </a>
          </p>
        )}
      </div>
    </div>
  );
} 