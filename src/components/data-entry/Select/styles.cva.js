import { cva } from 'class-variance-authority';

const rootStyles = cva(['w-full flex flex-col space-y-2']);

export const triggerStyles = cva(
	[
		'form-input w-full flex items-center justify-between p-3 border transition duration-300 bg-white',
		'text-sm text-neutral-700 hover:text-neutral-700 font-normal leading-tight whitespace-nowrap overflow-hidden select-none',
		'data-[disabled]:bg-neutral-100 data-[disabled]:hover:border-neutral-200 data-[placeholder]:text-neutral-500',
	],
	{
		variants: {
			error: {
				true: [
					'border-error-600',
					'focus:ring-error-200',
					'focus:border-error-600',
					'hover:border-error-600 data-[disabled]:hover:border-error-600',
				],
				false: [
					'border-neutral-200',
					'focus:ring-primary-600',
					'focus:border-primary-600',
					'hover:border-neutral-900',
				],
			},
		},
		defaultVariants: {
			error: false,
		},
	}
);

export const contentStyles = cva([
	'bg-white shadow-lg border border-neutral-200',
	'w-[var(--radix-select-trigger-width)]',
	'max-h-[var(--radix-select-content-available-height)]',
]);

export const labelStyles = cva('flex items-center max-w-max text-neutral-900');

export const labelTextStyles = cva([
	'text-sm font-medium select-none leading-none',
	'[&>sup]:text-xs [&>sup]:-top-[0.2em] [&>sup]:left-[0.2em]',
]);

export default rootStyles;
