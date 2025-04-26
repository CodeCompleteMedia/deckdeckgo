import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { v5 as uuidv5 } from 'uuid';

// Use a fixed namespace UUID for GitHub user IDs
const GITHUB_NAMESPACE = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      console.error('No session or user ID found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, description } = await request.json();
    console.log('Creating deck with:', { title, description, userId: session.user.id });
    
    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    // Convert GitHub user ID to UUID
    const ownerId = uuidv5(session.user.id, GITHUB_NAMESPACE);

    const supabase = createClient();
    
    const { data, error } = await supabase
      .from('decks')
      .insert({
        name: title,
        owner_id: ownerId,
        content: {
          title,
          description,
          slides: []
        }
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error creating deck:', {
        error,
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      return NextResponse.json({ 
        error: 'Failed to create deck',
        details: error.message 
      }, { status: 500 });
    }

    console.log('Successfully created deck:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Unexpected error in create deck route:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 