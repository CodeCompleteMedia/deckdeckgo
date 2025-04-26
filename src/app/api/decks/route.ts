import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { Deck, CreateDeckInput } from '@/types/deck';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    console.log('Creating deck for user:', user);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: CreateDeckInput = await request.json();
    console.log('Create deck input:', body);
    
    const { data, error } = await supabase
      .from('decks')
      .insert([
        {
          name: body.title,
          owner_id: user.id,
          content: {
            title: body.title,
            description: body.description,
            slides: []
          },
          is_published: false
        }
      ])
      .select()
      .single();

    console.log('Create deck result:', { data, error });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating deck:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('decks')
      .select('*')
      .eq('owner_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 