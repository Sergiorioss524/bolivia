'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Typography } from '@/components/ui/typography';

export default function SuggestionForm() {
    const [suggestion, setSuggestion] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the suggestion to your backend
        console.log('Suggestion submitted:', { suggestion, description });
        setSuggestion('');
        setDescription('');
        alert('¡Gracias por tu sugerencia!');
    };

    return (
        <Card className='mt-12'>
            <CardHeader>
                <CardTitle>Sugerir un nuevo problema</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                        <label htmlFor='suggestion' className='mb-2 block'>
                            Problema:
                        </label>
                        <Input
                            id='suggestion'
                            value={suggestion}
                            onChange={(e) => setSuggestion(e.target.value)}
                            placeholder='Escribe aquí el problema que quieres sugerir'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='description' className='mb-2 block'>
                            Descripción:
                        </label>
                        <Textarea
                            id='description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder='Describe brevemente el problema, sus causas y posibles soluciones'
                            required
                        />
                    </div>
                    <Button type='submit'>Enviar sugerencia</Button>
                </form>
            </CardContent>
        </Card>
    );
}
