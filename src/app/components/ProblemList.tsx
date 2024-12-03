import ProblemCard from './ProblemCard';

const problems = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    title: `Problema ${i + 1}: Lorem ipsum dolor sit amet`
}));

export default function ProblemList() {
    return (
        <div className='mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {problems.map((problem) => (
                <ProblemCard key={problem.id} {...problem} />
            ))}
        </div>
    );
}
