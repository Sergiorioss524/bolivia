/* eslint-disable newline-before-return */
import React, { forwardRef } from 'react';

import { cn } from '@/lib/utils';

import { VariantProps, cva } from 'class-variance-authority';

const typographyVariants = cva('text-foreground', {
    variants: {
        variant: {
            h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
            h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
            h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
            h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
            p: 'leading-7 [&:not(:first-child)]:mt-6',
            blockquote: 'mt-6 border-l-2 pl-6 italic',
            list: 'my-6 ml-6 list-disc [&>li]:mt-2'
        },
        size: {
            sm: 'text-sm',
            base: 'text-base',
            lg: 'text-lg',
            xl: 'text-xl',
            '2xl': 'text-2xl',
            '3xl': 'text-3xl'
        }
    },
    defaultVariants: {
        variant: 'p',
        size: 'base'
    }
});

export interface TypographyProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof typographyVariants> {
    as?: keyof JSX.IntrinsicElements;
}

const Typography = forwardRef<HTMLElement, TypographyProps>(({ className, variant, size, as, ...props }, ref) => {
    const Comp = (as ||
        (variant === 'blockquote'
            ? 'blockquote'
            : variant === 'list'
              ? 'ul'
              : variant || 'p')) as keyof JSX.IntrinsicElements;
    const classes = cn(typographyVariants({ variant, size }), className);

    return React.createElement(Comp, { className: classes, ref, ...props });
});
Typography.displayName = 'Typography';

export { Typography, typographyVariants };
