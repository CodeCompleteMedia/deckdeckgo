'use client';

import { Deck } from '@/types/deck';
import { useState, useRef, useEffect } from 'react';
import { Slide, SlideTemplate } from '@/types/slide';
import { SlideEditor } from './SlideEditor';
import { v4 as uuidv4 } from 'uuid';

interface DeckEditorProps {
  deck: Deck;
}

type SlideDirection = 'horizontal' | 'vertical' | 'papyrus';
type SlideAnimation = 'slide' | 'fade' | 'none';

interface RawSlide {
  id?: string;
  template?: string;
  content?: Record<string, unknown>;
}

export function DeckEditor({ deck }: DeckEditorProps) {
  const [title, setTitle] = useState(deck.content.title);
  const [description, setDescription] = useState(deck.content.description);
  const [slides, setSlides] = useState<Slide[]>(
    deck.content.slides?.map((slide: RawSlide, index: number) => ({
      id: slide.id || uuidv4(),
      template: (slide.template as SlideTemplate) || 'content',
      content: slide.content || {},
      order: index,
    })) || []
  );
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [direction, setDirection] = useState<SlideDirection>('horizontal');
  const [animation, setAnimation] = useState<SlideAnimation>('slide');
  
  const editorRef = useRef<HTMLDivElement>(null);

  // Handle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      editorRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Handle slide deletion
  const deleteSlide = (index: number) => {
    const newSlides = slides.filter((_, i) => i !== index);
    setSlides(newSlides);
    if (activeSlideIndex >= newSlides.length) {
      setActiveSlideIndex(newSlides.length - 1);
    }
  };

  // Handle slide addition
  const addSlide = (template: SlideTemplate = 'content') => {
    const newSlide: Slide = {
      id: uuidv4(),
      template,
      content: {},
      order: slides.length,
    };
    setSlides([...slides, newSlide]);
    setActiveSlideIndex(slides.length);
  };

  // Handle slide update
  const updateSlide = (updatedSlide: Slide) => {
    const newSlides = slides.map((slide) =>
      slide.id === updatedSlide.id ? updatedSlide : slide
    );
    setSlides(newSlides);
  };

  // Save changes
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
          content: {
            ...deck.content,
            title,
            description,
            slides,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save deck');
      }
    } catch (error) {
      console.error('Error saving deck:', error);
    }
  };

  // Auto-save on changes
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      handleSave();
    }, 2000);

    return () => clearTimeout(saveTimeout);
  }, [title, description, slides]);

  return (
    <div ref={editorRef} className="flex flex-col h-full">
      {/* Editor Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex-1">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-2xl font-bold w-full bg-transparent border-none focus:outline-none"
            placeholder="Deck Title"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-transparent border-none focus:outline-none mt-2 resize-none"
            placeholder="Deck Description"
            rows={2}
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowThumbnails(!showThumbnails)}
            className="p-2 rounded hover:bg-gray-100"
          >
            {showThumbnails ? 'Hide' : 'Show'} Thumbnails
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded hover:bg-gray-100"
          >
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
        </div>
      </div>

      {/* Editor Main Area */}
      <div className="flex-1 flex">
        {/* Thumbnails Sidebar */}
        {showThumbnails && (
          <div className="w-64 border-r p-4 overflow-y-auto">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`p-2 mb-2 rounded cursor-pointer ${
                  activeSlideIndex === index ? 'bg-blue-100' : 'hover:bg-gray-100'
                }`}
                onClick={() => setActiveSlideIndex(index)}
              >
                <div className="font-medium">Slide {index + 1}</div>
                <div className="text-sm text-gray-500">{slide.template}</div>
              </div>
            ))}
            <div className="mt-4 space-y-2">
              <button
                onClick={() => addSlide('title')}
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Title Slide
              </button>
              <button
                onClick={() => addSlide('content')}
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Content Slide
              </button>
              <button
                onClick={() => addSlide('split')}
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Split Slide
              </button>
              <button
                onClick={() => addSlide('image')}
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Image Slide
              </button>
              <button
                onClick={() => addSlide('code')}
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Code Slide
              </button>
            </div>
          </div>
        )}

        {/* Slide Editor */}
        <div className="flex-1 p-4">
          {slides.length > 0 ? (
            <SlideEditor
              slide={slides[activeSlideIndex]}
              onChange={updateSlide}
            />
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="space-y-4 text-center">
                <h2 className="text-xl font-medium">Create Your First Slide</h2>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => addSlide('title')}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Title Slide
                  </button>
                  <button
                    onClick={() => addSlide('content')}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Content Slide
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Editor Footer */}
      <div className="border-t p-4 flex justify-between items-center">
        <div className="flex gap-4">
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value as SlideDirection)}
            className="p-2 border rounded"
          >
            <option value="horizontal">Horizontal</option>
            <option value="vertical">Vertical</option>
            <option value="papyrus">Papyrus</option>
          </select>
          <select
            value={animation}
            onChange={(e) => setAnimation(e.target.value as SlideAnimation)}
            className="p-2 border rounded"
          >
            <option value="slide">Slide</option>
            <option value="fade">Fade</option>
            <option value="none">None</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => deleteSlide(activeSlideIndex)}
            className="p-2 text-red-500 rounded hover:bg-red-50"
            disabled={slides.length === 0}
          >
            Delete Slide
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
} 