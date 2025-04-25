"use client";

import { useState } from 'react';
import { Template } from '@/types/template';
import { Skeleton } from '@/components/ui/skeleton';

interface TemplateShowcaseProps {
  template: Template;
  author?: string;
  customTappable?: boolean;
  onClick?: () => void;
}

export function TemplateShowcase({ template, author, customTappable, onClick }: TemplateShowcaseProps) {
  const [loading, setLoading] = useState(true);

  return (
    <div 
      className={`group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md ${customTappable ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="aspect-video w-full">
        {loading && <Skeleton className="h-full w-full" />}
        <div
          className={`h-full w-full ${loading ? 'hidden' : 'block'}`}
          onLoad={() => setLoading(false)}
        >
          {/* Template preview content */}
          <div className="flex h-full items-center justify-center bg-gray-50 p-4">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900">{template.id}</h3>
              <p className="mt-1 text-sm text-gray-500">
                {template.data.slots?.length || 0} editable sections
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">{template.id}</h3>
            {author && <p className="text-xs text-gray-500">by {author}</p>}
          </div>
        </div>
      </div>
    </div>
  );
} 