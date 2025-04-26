import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { UpdateDeckInput } from '@/types/deck';

export async function PUT(
  request: Request,
  { params }: { params: { deckId: string } }
) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: UpdateDeckInput = await request.json();
    
    const { data: existingDeck } = await supabase
      .from('decks')
      .select('content')
      .eq('id', params.deckId)
      .eq('owner_id', user.id)
      .single();

    if (!existingDeck) {
      return NextResponse.json({ error: 'Deck not found' }, { status: 404 });
    }

    const { data, error } = await supabase
      .from('decks')
      .update({
        content: {
          ...existingDeck.content,
          title: body.title,
          description: body.description,
        },
        updated_at: new Date().toISOString(),
      })
      .eq('id', params.deckId)
      .eq('owner_id', user.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 