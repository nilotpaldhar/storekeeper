import { cva } from 'class-variance-authority';

/** Root Styles. */
export const root = cva('relative inline-block leading-none');

/** Count Styles. */
export const count = cva(
	[
		'absolute',
		'top-0',
		'left-full',
		'overflow-hidden',
		'whitespace-nowrap',
		'rounded-full',
		'text-center',
		'text-white',
		'font-normal',
	],
	{
		variants: {
			size: {
				sm: 'min-w-[16px] h-[16px] leading-[16px] text-[10px]',
				md: 'min-w-[20px] h-[20px] leading-[20px] text-xs',
				lg: 'min-w-[24px] h-[24px] leading-[24px] text-sm',
			},
			variant: {
				primary: 'bg-primary-600',
				neutral: 'bg-neutral-900',
				success: 'bg-success-600',
				warning: 'bg-warning-600',
				error: 'bg-error-600',
			},
			singleDigit: {
				true: 'p-0',
				false: 'px-2',
			},
		},
		defaultVariants: {
			size: 'md',
			variant: 'primary',
		},
	}
);

export default { root, count };
