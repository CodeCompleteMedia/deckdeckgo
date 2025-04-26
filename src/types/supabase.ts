export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      decks: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          owner_id: string
          content: Json
          is_published: boolean
          published_at: string | null
          published_url: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          owner_id: string
          content?: Json
          is_published?: boolean
          published_at?: string | null
          published_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          owner_id?: string
          content?: Json
          is_published?: boolean
          published_at?: string | null
          published_url?: string | null
        }
      }
      published_decks: {
        Row: {
          id: string
          created_at: string
          deck_id: string
          name: string
          owner_id: string
          content: Json
          published_url: string
        }
        Insert: {
          id?: string
          created_at?: string
          deck_id: string
          name: string
          owner_id: string
          content: Json
          published_url: string
        }
        Update: {
          id?: string
          created_at?: string
          deck_id?: string
          name?: string
          owner_id?: string
          content?: Json
          published_url?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 