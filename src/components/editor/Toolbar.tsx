import { useState } from 'react';

interface ToolbarProps {
  onFormatText: (format: TextFormat) => void;
  onInsertElement: (element: ElementType) => void;
}

type TextFormat = {
  type: 'bold' | 'italic' | 'underline' | 'color' | 'fontSize' | 'align';
  value?: string;
};

type ElementType = 'image' | 'code' | 'chart' | 'poll';

export function Toolbar({ onFormatText, onInsertElement }: ToolbarProps) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showFontSizePicker, setShowFontSizePicker] = useState(false);

  return (
    <div className="flex items-center gap-2 p-2 bg-white border-b">
      {/* Text Formatting */}
      <div className="flex items-center gap-1 border-r pr-2">
        <button
          onClick={() => onFormatText({ type: 'bold' })}
          className="p-1 rounded hover:bg-gray-100"
          title="Bold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.5 10a3.5 3.5 0 01-3.5 3.5H7v-7h3a3.5 3.5 0 013.5 3.5zM7 15h3.5a3.5 3.5 0 003.5-3.5V10a3.5 3.5 0 00-3.5-3.5H7v7z" />
          </svg>
        </button>
        <button
          onClick={() => onFormatText({ type: 'italic' })}
          className="p-1 rounded hover:bg-gray-100"
          title="Italic"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 4.5l1.5-.5-2 12-1.5.5 2-12z" />
          </svg>
        </button>
        <button
          onClick={() => onFormatText({ type: 'underline' })}
          className="p-1 rounded hover:bg-gray-100"
          title="Underline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M7 3.5v7a3 3 0 006 0v-7h1.5v7a4.5 4.5 0 01-9 0v-7H7zM5 15h10v1.5H5V15z" />
          </svg>
        </button>
        
        {/* Color Picker */}
        <div className="relative">
          <button
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="p-1 rounded hover:bg-gray-100"
            title="Text Color"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M4 4h12v2H4V4zm0 3h12v2H4V7zm0 3h12v2H4v-2zm0 3h12v2H4v-2z" />
            </svg>
          </button>
          {showColorPicker && (
            <div className="absolute top-full left-0 mt-1 p-2 bg-white rounded shadow-lg grid grid-cols-5 gap-1">
              {['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00'].map(
                (color) => (
                  <button
                    key={color}
                    onClick={() => {
                      onFormatText({ type: 'color', value: color });
                      setShowColorPicker(false);
                    }}
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                )
              )}
            </div>
          )}
        </div>

        {/* Font Size Picker */}
        <div className="relative">
          <button
            onClick={() => setShowFontSizePicker(!showFontSizePicker)}
            className="p-1 rounded hover:bg-gray-100"
            title="Font Size"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
            </svg>
          </button>
          {showFontSizePicker && (
            <div className="absolute top-full left-0 mt-1 p-2 bg-white rounded shadow-lg">
              {['12px', '14px', '16px', '18px', '20px', '24px', '32px'].map(
                (size) => (
                  <button
                    key={size}
                    onClick={() => {
                      onFormatText({ type: 'fontSize', value: size });
                      setShowFontSizePicker(false);
                    }}
                    className="block w-full text-left px-2 py-1 hover:bg-gray-100"
                  >
                    {size}
                  </button>
                )
              )}
            </div>
          )}
        </div>

        {/* Text Alignment */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onFormatText({ type: 'align', value: 'left' })}
            className="p-1 rounded hover:bg-gray-100"
            title="Align Left"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3 4h14v2H3V4zm0 5h8v2H3V9zm0 5h14v2H3v-2z" />
            </svg>
          </button>
          <button
            onClick={() => onFormatText({ type: 'align', value: 'center' })}
            className="p-1 rounded hover:bg-gray-100"
            title="Align Center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3 4h14v2H3V4zm2 5h10v2H5V9zm-2 5h14v2H3v-2z" />
            </svg>
          </button>
          <button
            onClick={() => onFormatText({ type: 'align', value: 'right' })}
            className="p-1 rounded hover:bg-gray-100"
            title="Align Right"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3 4h14v2H3V4zm6 5h8v2H9V9zm-6 5h14v2H3v-2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Insert Elements */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onInsertElement('image')}
          className="p-1 rounded hover:bg-gray-100"
          title="Insert Image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          onClick={() => onInsertElement('code')}
          className="p-1 rounded hover:bg-gray-100"
          title="Insert Code"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          onClick={() => onInsertElement('chart')}
          className="p-1 rounded hover:bg-gray-100"
          title="Insert Chart"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
        </button>
        <button
          onClick={() => onInsertElement('poll')}
          className="p-1 rounded hover:bg-gray-100"
          title="Insert Poll"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
          </svg>
        </button>
      </div>
    </div>
  );
} 