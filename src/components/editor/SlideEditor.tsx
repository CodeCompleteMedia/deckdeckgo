import { useState, useRef } from 'react';
import { Slide } from '@/types/slide';
import { Toolbar } from './Toolbar';

interface SlideEditorProps {
  slide: Slide;
  onChange: (updatedSlide: Slide) => void;
}

export function SlideEditor({ slide, onChange }: SlideEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const updateContent = (updates: Partial<Slide['content']>) => {
    onChange({
      ...slide,
      content: {
        ...slide.content,
        ...updates,
      },
    });
  };

  const handleFormatText = (format: { type: string; value?: string }) => {
    if (!selectedElement) return;

    switch (format.type) {
      case 'bold':
        document.execCommand('bold', false);
        break;
      case 'italic':
        document.execCommand('italic', false);
        break;
      case 'underline':
        document.execCommand('underline', false);
        break;
      case 'color':
        document.execCommand('foreColor', false, format.value);
        break;
      case 'fontSize':
        document.execCommand('fontSize', false, format.value);
        break;
      case 'align':
        document.execCommand(
          format.value === 'left'
            ? 'justifyLeft'
            : format.value === 'center'
            ? 'justifyCenter'
            : 'justifyRight',
          false
        );
        break;
    }

    // Update content after formatting
    if (contentRef.current) {
      updateContent({ content: contentRef.current.innerHTML });
    }
  };

  const handleInsertElement = (elementType: string) => {
    switch (elementType) {
      case 'image':
        const imageUrl = prompt('Enter image URL:');
        if (imageUrl) {
          updateContent({ imageUrl });
        }
        break;
      case 'code':
        updateContent({
          code: {
            language: 'javascript',
            content: '// Your code here',
          },
        });
        break;
      case 'chart':
        updateContent({
          chart: {
            type: 'bar',
            data: {
              labels: ['A', 'B', 'C'],
              datasets: [
                {
                  label: 'Dataset 1',
                  data: [1, 2, 3],
                  backgroundColor: ['#FF0000', '#00FF00', '#0000FF'],
                },
              ],
            },
          },
        });
        break;
      case 'poll':
        updateContent({
          poll: {
            question: 'Your question here',
            options: ['Option 1', 'Option 2', 'Option 3'],
          },
        });
        break;
    }
  };

  const renderTitleSlide = () => (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center">
      <div
        ref={contentRef}
        contentEditable
        onFocus={(e) => setSelectedElement(e.currentTarget)}
        onBlur={() => setSelectedElement(null)}
        dangerouslySetInnerHTML={{ __html: slide.content.title || '' }}
        className="text-4xl font-bold w-full bg-transparent border-none focus:outline-none text-center mb-4 empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400"
        data-placeholder="Slide Title"
      />
      <div
        contentEditable
        onFocus={(e) => setSelectedElement(e.currentTarget)}
        onBlur={() => setSelectedElement(null)}
        dangerouslySetInnerHTML={{ __html: slide.content.content || '' }}
        className="text-xl w-full bg-transparent border-none focus:outline-none text-center resize-none empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400"
        data-placeholder="Slide Content"
      />
    </div>
  );

  const renderContentSlide = () => (
    <div className="h-full flex flex-col p-8">
      <div
        ref={contentRef}
        contentEditable
        onFocus={(e) => setSelectedElement(e.currentTarget)}
        onBlur={() => setSelectedElement(null)}
        dangerouslySetInnerHTML={{ __html: slide.content.title || '' }}
        className="text-3xl font-bold w-full bg-transparent border-none focus:outline-none mb-4 empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400"
        data-placeholder="Slide Title"
      />
      <div
        contentEditable
        onFocus={(e) => setSelectedElement(e.currentTarget)}
        onBlur={() => setSelectedElement(null)}
        dangerouslySetInnerHTML={{ __html: slide.content.content || '' }}
        className="text-xl flex-1 w-full bg-transparent border-none focus:outline-none resize-none empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400"
        data-placeholder="Slide Content"
      />
    </div>
  );

  const renderSplitSlide = () => (
    <div className="h-full grid grid-cols-2 gap-8 p-8">
      <div
        ref={contentRef}
        contentEditable
        onFocus={(e) => setSelectedElement(e.currentTarget)}
        onBlur={() => setSelectedElement(null)}
        dangerouslySetInnerHTML={{ __html: slide.content.leftContent || '' }}
        className="text-xl w-full h-full bg-transparent border-none focus:outline-none resize-none empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400"
        data-placeholder="Left Content"
      />
      <div
        contentEditable
        onFocus={(e) => setSelectedElement(e.currentTarget)}
        onBlur={() => setSelectedElement(null)}
        dangerouslySetInnerHTML={{ __html: slide.content.rightContent || '' }}
        className="text-xl w-full h-full bg-transparent border-none focus:outline-none resize-none empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400"
        data-placeholder="Right Content"
      />
    </div>
  );

  const renderImageSlide = () => (
    <div className="h-full flex flex-col items-center justify-center p-8">
      <input
        type="text"
        value={slide.content.imageUrl || ''}
        onChange={(e) => updateContent({ imageUrl: e.target.value })}
        className="w-full bg-transparent border-none focus:outline-none mb-4"
        placeholder="Image URL"
      />
      {slide.content.imageUrl && (
        <img
          src={slide.content.imageUrl}
          alt="Slide"
          className="max-h-[80%] object-contain"
        />
      )}
    </div>
  );

  const renderCodeSlide = () => (
    <div className="h-full flex flex-col p-8">
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          value={slide.content.code?.language || ''}
          onChange={(e) =>
            updateContent({
              code: {
                ...slide.content.code,
                language: e.target.value,
                content: slide.content.code?.content || '',
              },
            })
          }
          className="text-sm w-32 bg-transparent border rounded px-2 py-1"
          placeholder="Language"
        />
      </div>
      <div
        ref={contentRef}
        contentEditable
        onFocus={(e) => setSelectedElement(e.currentTarget)}
        onBlur={() => setSelectedElement(null)}
        dangerouslySetInnerHTML={{ __html: slide.content.code?.content || '' }}
        className="font-mono text-sm flex-1 w-full bg-transparent border rounded p-4 resize-none empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400"
        data-placeholder="Code"
      />
    </div>
  );

  const renderSlideContent = () => {
    switch (slide.template) {
      case 'title':
        return renderTitleSlide();
      case 'content':
        return renderContentSlide();
      case 'split':
      case 'two-column':
        return renderSplitSlide();
      case 'image':
        return renderImageSlide();
      case 'code':
        return renderCodeSlide();
      default:
        return renderContentSlide();
    }
  };

  return (
    <div
      className="h-full flex flex-col relative"
      style={{
        backgroundColor: slide.content.style?.backgroundColor,
        color: slide.content.style?.color,
        fontSize: slide.content.style?.fontSize,
        fontFamily: slide.content.style?.fontFamily,
      }}
    >
      <Toolbar
        onFormatText={handleFormatText}
        onInsertElement={handleInsertElement}
      />
      
      <div className="flex-1 overflow-auto">
        {renderSlideContent()}
      </div>
      
      {/* Style Editor Button */}
      <button
        onClick={() => setIsEditing(!isEditing)}
        className="absolute top-2 right-2 p-2 rounded-full bg-gray-100 hover:bg-gray-200"
      >
        <span className="sr-only">Edit Style</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Style Editor Panel */}
      {isEditing && (
        <div className="absolute top-12 right-2 w-64 bg-white rounded-lg shadow-lg p-4">
          <h3 className="font-bold mb-2">Style Editor</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Background Color
              </label>
              <input
                type="color"
                value={slide.content.style?.backgroundColor || '#ffffff'}
                onChange={(e) =>
                  updateContent({
                    style: {
                      ...slide.content.style,
                      backgroundColor: e.target.value,
                    },
                  })
                }
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Text Color
              </label>
              <input
                type="color"
                value={slide.content.style?.color || '#000000'}
                onChange={(e) =>
                  updateContent({
                    style: {
                      ...slide.content.style,
                      color: e.target.value,
                    },
                  })
                }
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Font Size
              </label>
              <select
                value={slide.content.style?.fontSize || '16px'}
                onChange={(e) =>
                  updateContent({
                    style: {
                      ...slide.content.style,
                      fontSize: e.target.value,
                    },
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              >
                <option value="12px">Small</option>
                <option value="16px">Medium</option>
                <option value="20px">Large</option>
                <option value="24px">Extra Large</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Font Family
              </label>
              <select
                value={slide.content.style?.fontFamily || 'sans-serif'}
                onChange={(e) =>
                  updateContent({
                    style: {
                      ...slide.content.style,
                      fontFamily: e.target.value,
                    },
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              >
                <option value="sans-serif">Sans Serif</option>
                <option value="serif">Serif</option>
                <option value="monospace">Monospace</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 