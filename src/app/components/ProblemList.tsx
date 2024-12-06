'use client';

import { useEffect, useState } from 'react';

import { supabase } from '@/lib/supabase';

import ProblemCard from './ProblemCard';

interface Card {
    id: number;
    title: string;
    causes: string[];
    culpables: string[];
    solutions: string[];
    votes: number;
}

interface ProblemListProps {
    cards: Card[];
}

export default function ProblemList({ cards: initialCards }: ProblemListProps) {
    const [cards, setCards] = useState<Card[]>(initialCards);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Initial fetch
        const fetchCards = async () => {
            try {
                const { data, error } = await supabase.from('cards').select('*').order('votes', { ascending: false });

                if (error) throw error;
                setCards(data || []);
            } catch (err) {
                console.error('Error fetching cards:', err);
                setError(err instanceof Error ? err.message : 'Failed to fetch cards');
            } finally {
                setLoading(false);
            }
        };

        fetchCards();

        // Real-time subscription
        const channel = supabase
            .channel('cards')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'cards' }, (payload) => {
                if (!payload || typeof payload.eventType !== 'string') {
                    console.error('Invalid payload received:', payload);
                    return;
                }

                switch (payload.eventType) {
                    case 'INSERT':
                        if (payload.new && isValidCard(payload.new)) {
                            setCards((current) => [...current, payload.new as Card].sort((a, b) => b.votes - a.votes));
                        }
                        break;
                    case 'UPDATE':
                        if (payload.new && isValidCard(payload.new)) {
                            setCards((current) =>
                                current
                                    .map((card) => (card.id === payload.new.id ? (payload.new as Card) : card))
                                    .sort((a, b) => b.votes - a.votes)
                            );
                        }
                        break;
                    case 'DELETE':
                        if (payload.old?.id) {
                            setCards((current) => current.filter((card) => card.id !== payload.old.id));
                        }
                        break;
                }
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!cards.length) return <div>No problems found</div>;

    return (
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {cards.map((card) => (
                <ProblemCard key={card.id} {...card} />
            ))}
        </div>
    );
}

// Helper to validate card shape
function isValidCard(card: any): card is Card {
    return (
        typeof card === 'object' &&
        typeof card.id === 'number' &&
        typeof card.title === 'string' &&
        Array.isArray(card.causes) &&
        Array.isArray(card.culpables) &&
        Array.isArray(card.solutions) &&
        typeof card.votes === 'number'
    );
}
