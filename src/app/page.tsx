import Header from '@/app/components/Header';
import ProblemList from '@/app/components/ProblemList';
import SuggestionForm from '@/app/components/SuggestionForm';
import { supabase } from '@/lib/supabase';

// Add error boundaries and loading states
export default async function Page() {
    try {
        const { data: cards, error } = await supabase.from('cards').select('*').order('votes', { ascending: false });

        if (error) throw error;

        return (
            <main className='min-h-screen bg-background text-foreground'>
                <div className='container mx-auto px-4 py-8'>
                    <Header />
                    <ProblemList cards={cards || []} />
                    <SuggestionForm />
                </div>
            </main>
        );
    } catch (error) {
        console.error('Error:', error);
        return <div>Error loading problems</div>;
    }
}
