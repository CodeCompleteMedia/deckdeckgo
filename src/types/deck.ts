import { Slide } from './slide';

export interface Deck {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  owner_id: string;
  content: {
    title: string;
    description: string;
    slides: Slide[];
    theme?: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
    };
    settings?: {
      direction: 'horizontal' | 'vertical' | 'papyrus';
      animation: 'slide' | 'fade' | 'none';
      transition: {
        type: string;
        duration: number;
      };
      header?: {
        enabled: boolean;
        content: string;
      };
      footer?: {
        enabled: boolean;
        content: string;
        showSlideNumber: boolean;
      };
    };
  };
  is_published: boolean;
  published_at: string | null;
  published_url: string | null;
}

export interface CreateDeckInput {
  title: string;
  description: string;
  userId: string;
}

export interface UpdateDeckInput {
  title?: string;
  description?: string;
  content?: Deck['content'];
  is_published?: boolean;
} 