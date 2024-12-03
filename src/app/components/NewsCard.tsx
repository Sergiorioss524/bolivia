import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';

interface NewsCardProps {
    id: number;
    title: string;
    slug: string;
}

export default function NewsCard({ id, title, slug }: NewsCardProps) {
    return (
        <Card className='border-primary/10 transition-shadow duration-300 hover:shadow-lg'>
            <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                    <span className='flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground'>
                        {id}
                    </span>
                    <Typography variant='h3' className='text-lg font-semibold text-primary'>
                        {title}
                    </Typography>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Typography variant='p' className='line-clamp-2 text-muted-foreground'>
                    {slug}
                </Typography>
            </CardContent>
        </Card>
    );
}
