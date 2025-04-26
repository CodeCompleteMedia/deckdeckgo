import { notFound } from 'next/navigation';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { DeckEditor } from '@/components/editor/DeckEditor';

interface PageProps {
  params: {
    deckId: string;
  };
}

export default async function EditorPage({ params }: PageProps) {
  console.log('Editor page params:', params);
  
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  console.log('User:', user);

  if (!user) {
    console.log('No user found');
    return notFound();
  }

  const { data: deck, error } = await supabase
    .from('decks')
    .select('*')
    .eq('id', params.deckId)
    .eq('owner_id', user.id)
    .single();

  console.log('Deck query result:', { deck, error });

  if (error || !deck) {
    console.log('Deck not found or error:', error);
    return notFound();
  }

  return (
    <div className="flex flex-col h-screen">
      <DeckEditor deck={deck} />
    </div>
  );
} 