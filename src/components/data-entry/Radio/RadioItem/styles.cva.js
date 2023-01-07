import { cva } from 'class-variance-authority';

export const rootStyles = cva(
	[
		/** Default State. */
		'flex justify-center items-center w-5 h-5 bg-white border-2 rounded-full transition duration-300',
		/** Checked State. */
		'data-[state=checked]:border-primary-600',
		/** Unchecked State. */
		'data-[state=unchecked]:border-neutral-200',
		/** Focus State. */
		'focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-primary-600 focus-visible:outline-none',
	],
	{
		variants: {
			disabled: {
				true: [
					/** Default State. */
					'opacity-50',
					/** Checked State. */
					'data-[state=checked]:border-neutral-300 data-[state=checked]:bg-neutral-300',
					/** Unchecked State. */
					'data-[state=unchecked]:border-neutral-300 data-[state=unchecked]:bg-neutral-200',
				],
				false: [],
			},
		},
		defaultVariants: {
			disabled: false,
		},
	}
);

export const parentStyles = cva('flex items-center');

export const indicatorStyles = cva(
	[
		/** Default State. */
		'block w-3 h-3 rounded-full transition duration-300 delay-75 transform',
		/** Checked State. */
		'data-[state=checked]:bg-primary-600 data-[state=checked]:scale-100',
		/** Unchecked State. */
		'data-[state=unchecked]:bg-transparent data-[state=unchecked]:scale-0',
	],
	{
		variants: {
			disabled: {
				true: ['data-[state=checked]:bg-neutral-900'],
				false: [],
			},
		},
		defaultVariants: {
			disabled: false,
		},
	}
);

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

export default rootStyles;
