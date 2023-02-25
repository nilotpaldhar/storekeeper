import { cva } from 'class-variance-authority';

export const rootStyles = cva('w-full flex flex-col space-y-2');

export const labelStyles = cva('flex flex-col space-y-2 w-full text-neutral-900');

export const labelTextStyles = cva([
	'text-sm font-medium select-none leading-none',
	'[&>sup]:text-xs [&>sup]:-top-[0.2em] [&>sup]:left-[0.2em]',
]);

export const inputStyles = cva(
	[
		'form-input',
		'block',
		'w-full',
		'px-3',
		'py-3',
		'border',
		'text-sm',
		'transition',
		'font-normal',
		'duration-300',
		'leading-tight',
		'text-neutral-700',
		'placeholder:font-light',
		'placeholder:text-neutral-500',
	],
	{
		variants: {
			error: {
				true: [
					'border-error-600',
					'focus:ring-error-200',
					'focus:border-error-600',
					'hover:border-error-600',
				],
				false: [
					'border-neutral-200',
					'focus:ring-primary-600',
					'focus:border-primary-600',
					'hover:border-neutral-900',
				],
			},
			disabled: {
				true: '!bg-neutral-200 cursor-default hover:border-neutral-200',
				false: 'bg-white',
			},
			readOnly: {
				true: 'bg-neutral-100 hover:border-transparent focus:ring-transparent focus:border-transparent',
				false: 'bg-white',
			},
		},
		defaultVariants: {
			error: false,
			disabled: false,
			readOnly: false,
		},
	}
);

export const helperStyles = cva('px-px leading-tight text-xs');

export default rootStyles;
