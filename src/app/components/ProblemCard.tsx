'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';

import { ThumbsUp } from 'lucide-react';

interface ProblemCardProps {
    id: number;
    title: string;
}

export default function ProblemCard({ id, title }: ProblemCardProps) {
    const [votes, setVotes] = useState(0);
    const [showDetails, setShowDetails] = useState(false);

    const handleVote = () => {
        setVotes(votes + 1);
    };

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <Card className='border-primary/10 transition-shadow duration-300 hover:shadow-lg'>
            <CardHeader>
                <CardTitle className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <span className='flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground'>
                            {id}
                        </span>
                        <Typography variant='h3' className='text-lg font-semibold text-primary'>
                            {title}
                        </Typography>
                    </div>
                    <Button variant='outline' size='sm' onClick={handleVote}>
                        <ThumbsUp className='mr-2 h-4 w-4' />
                        {votes}
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Button variant='link' onClick={toggleDetails}>
                    {showDetails ? 'Ocultar detalles' : 'Ver detalles'}
                </Button>
                {showDetails && (
                    <div className='mt-4'>
                        <Typography variant='h4' className='font-semibold'>
                            Causas:
                        </Typography>
                        <Typography>Información sobre las causas del problema...</Typography>
                        <Typography variant='h4' className='mt-2 font-semibold'>
                            Culpables:
                        </Typography>
                        <Typography>Información sobre los responsables...</Typography>
                        <Typography variant='h4' className='mt-2 font-semibold'>
                            Posibles soluciones:
                        </Typography>
                        <Typography>Propuestas de soluciones al problema...</Typography>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
