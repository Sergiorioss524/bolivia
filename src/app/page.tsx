import Header from '@/app/components/Header';
import ProblemList from '@/app/components/ProblemList';
import SuggestionForm from '@/app/components/SuggestionForm';
import { getAllCardData } from '@/lib/madx-utilts';

export default async function Page() {
    // Fetch data at runtime (Server-Side Rendering)
    const cards = getAllCardData();

    return (
        <main className='min-h-screen bg-background text-foreground'>
            <div className='container mx-auto px-4 py-8'>
                <Header />
                <ProblemList cards={cards} />
                <SuggestionForm />
            </div>
        </main>
    );
}
