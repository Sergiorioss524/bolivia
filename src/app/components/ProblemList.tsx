import { CardData } from '@/lib/madx-utilts';

import ProblemCard from './ProblemCard';

interface ProblemListProps {
    cards: CardData[];
}

export default function ProblemList({ cards }: ProblemListProps) {
    return (
        <div className='mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {cards.map((card) => (
                <ProblemCard key={card.id} {...card} />
            ))}
        </div>
    );
}
