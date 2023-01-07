import { cva } from 'class-variance-authority';

export const rootStyles = cva('max-w-max flex items-center');

export const labelStyles = cva(
	'text-sm font-medium cursor-pointer transition-opacity duration-300',
	{
		variants: {
			placement: { right: 'pl-2', left: 'pr-2' },
			disabled: { true: 'opacity-70 select-none pointer-events-none cursor-none', false: '' },
		},
		defaultVariants: {
			disabled: false,
			placement: 'right',
		},
	}
);

export const checkboxStyles = cva(
	[
		/** Default State. */
		'flex w-5 h-5 bg-white text-neutral-900 border-2 border-neutral-200 rounded-sm transition duration-300',
		/** Checked State. */
		'data-[state=checked]:bg-primary-600 data-[state=checked]:border-primary-600 data-[state=checked]:text-white',
		/** Focus State. */
		'focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-primary-600 focus-visible:outline-none',
	],
	{
		variants: {
			disabled: {
				true: [
					/** Default State. */
					'opacity-50 bg-neutral-200 border-neutral-300',
					/** Checked State. */
					'data-[state=checked]:bg-neutral-300 data-[state=checked]:border-neutral-300 data-[state=checked]:text-neutral-900',
				],
				false: [],
			},
		},
		defaultVariants: {
			disabled: false,
		},
	}
);

export const indicatorStyles = cva([
	/** Default State. */
	'flex items-center justify-center w-full h-full leading-none transition-opacity duration-300',
	/** Checked State. */
	'data-[state=checked]:opacity-100',
	/** Unchecked State. */
	'data-[state=unchecked]:opacity-0',
]);

export default rootStyles;
