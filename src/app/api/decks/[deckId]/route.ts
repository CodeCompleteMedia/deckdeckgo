import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { UpdateDeckInput } from '@/types/deck';

export async function PUT(
  request: Request,
  { params }: { params: { deckId: string } }
) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: UpdateDeckInput = await request.json();
    
    const { data: existingDeck } = await supabase
      .from('decks')
      .select('content, is_published')
      .eq('id', params.deckId)
      .eq('owner_id', user.id)
      .single();

    if (!existingDeck) {
      return NextResponse.json({ error: 'Deck not found' }, { status: 404 });
    }

    // Merge the existing content with the updates
    const updatedContent = {
      ...existingDeck.content,
      title: body.title ?? existingDeck.content.title,
      description: body.description ?? existingDeck.content.description,
      slides: body.content?.slides ?? existingDeck.content.slides,
      theme: body.content?.theme ?? existingDeck.content.theme,
      settings: {
        ...existingDeck.content.settings,
        ...body.content?.settings,
      },
    };

    const { data, error } = await supabase
      .from('decks')
      .update({
        content: updatedContent,
        updated_at: new Date().toISOString(),
        is_published: body.is_published ?? existingDeck.is_published,
      })
      .eq('id', params.deckId)
      .eq('owner_id', user.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating deck:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in PUT /api/decks/[deckId]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 