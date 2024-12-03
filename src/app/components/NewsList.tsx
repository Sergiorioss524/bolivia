import NewsCard from './NewsCard';

const placeholderNews = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    title: `Noticia ${i + 1}: Lorem ipsum dolor sit amet`,
    slug: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
}));

export default function NewsList() {
    return (
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {placeholderNews.map((news) => (
                <NewsCard key={news.id} {...news} />
            ))}
        </div>
    );
}
