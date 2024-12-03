import { Typography } from '@/components/ui/typography';

export default function Header() {
    return (
        <header className='mb-12 text-center'>
            <Typography
                as='h1'
                variant='h1'
                className='rounded-lg bg-gradient-to-r from-primary to-primary/70 bg-clip-text p-4 text-4xl font-extrabold tracking-tight text-transparent md:text-5xl lg:text-6xl'>
                MEMORIA PARA EL BICENTENARIO
            </Typography>
            <Typography as='h2' variant='h2' className='mt-4 text-2xl font-bold text-primary md:text-3xl lg:text-4xl'>
                LOS 25 PROBLEMAS MAS GRANDES DE BOLIVIA
            </Typography>
            <Typography className='mt-4 text-muted-foreground'>
                *Haz clic en cualquiera de las opciones para conocer las causas, los culpables y posibles soluciones.
                <br />
                *Vota por los que crees que son los problemas más grandes en el país.
                <br />
                *Sugiere otro problema y puede estar la semana que viene en el ranking.
            </Typography>
        </header>
    );
}
