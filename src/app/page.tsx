import Header from '@/app/components/Header';
import NewsList from '@/app/components/NewsList';
import ProblemList from '@/app/components/ProblemList';
import SuggestionForm from '@/app/components/SuggestionForm';

/**
 * The main page component that renders the HomePage component.
 *
 * @returns {JSX.Element} The rendered HomePage component.
 */
const Page = () => {
    return (
        <main className='min-h-screen bg-background text-foreground'>
            <div className='container mx-auto px-4 py-8'>
                <Header />
                <ProblemList />
                <SuggestionForm />
            </div>
        </main>
    );
};

export default Page;
