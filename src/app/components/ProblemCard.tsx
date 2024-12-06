'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { supabase } from '@/lib/supabase';

import { EyeIcon, ThumbsUp } from 'lucide-react';

interface ProblemCardProps {
    id: number;
    title: string;
    causes: string[];
    culpables: string[];
    solutions: string[];
    votes: number;
}
export default function ProblemCard({
    id,
    title,
    causes,
    culpables,
    solutions,
    votes: initialVotes
}: ProblemCardProps) {
    const [votes, setVotes] = useState(initialVotes);
    const [hasVoted, setHasVoted] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const checkUserVote = async () => {
            const {
                data: { user }
            } = await supabase.auth.getUser();
            setUser(user);

            if (user) {
                const { data } = await supabase.from('user_votes').select('*').eq('user_id', user.id).eq('card_id', id);

                if (data && data.length > 0) {
                    setHasVoted(true);
                }
            }
        };

        checkUserVote();
    }, [id]);

    const handleVote = async () => {
        if (!user) {
            alert('You must log in to vote.');
            return;
        }

        if (hasVoted) {
            alert('You have already voted for this card.');
            return;
        }

        setIsLoading(true);
        try {
            const { data, error } = await supabase.rpc('vote_for_card', {
                card_id: id,
                user_id: user.id
            });

            if (error) throw error;

            setVotes(votes + 1);
            setHasVoted(true);
        } catch (error: any) {
            alert(`Error voting: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className='space-y-4'>
                    <div>
                        <Typography variant='h4'>Causes:</Typography>
                        <ul className='list-disc pl-5'>
                            {causes.map((cause, index) => (
                                <li key={index}>{cause}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <Typography variant='h4'>Culpables:</Typography>
                        <ul className='list-disc pl-5'>
                            {culpables.map((culpable, index) => (
                                <li key={index}>{culpable}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <Typography variant='h4'>Solutions:</Typography>
                        <ul className='list-disc pl-5'>
                            {solutions.map((solution, index) => (
                                <li key={index}>{solution}</li>
                            ))}
                        </ul>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Button
                            onClick={handleVote}
                            disabled={hasVoted || isLoading || !user}
                            variant={hasVoted ? 'secondary' : 'default'}>
                            <ThumbsUp className='mr-2 h-4 w-4' />
                            {votes} votes
                        </Button>
                    </div>
                </div>
            </CardContent>
            {isHovered && (
                <div className='absolute bottom-4 right-4'>
                    <Button variant='secondary' size='sm'>
                        <EyeIcon className='mr-2 h-4 w-4' />
                        View Details
                    </Button>
                </div>
            )}
        </Card>
    );
}
