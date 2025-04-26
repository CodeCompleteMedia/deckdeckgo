export interface Deck {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  owner_id: string;
  content: {
    title: string;
    slides: any[];
    description: string;
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
  is_published?: boolean;
} 