import { cva } from 'class-variance-authority';

export const rootStyles = cva('flex items-center max-w-max');

export const labelStyles = cva('text-sm font-medium transition-opacity duration-300', {
	variants: {
		placement: { right: 'pl-2', left: 'pr-2' },
		disabled: { true: 'opacity-70 select-none pointer-events-none cursor-none', false: '' },
	},
	defaultVariants: {
		disabled: false,
		placement: 'right',
	},
});

export const switchStyles = cva(
	[
		/** Default State. */
		'relative flex items-center bg-neutral-200 w-9 h-5 rounded-full transition duration-300',
		/** Checked State. */
		'data-[state=checked]:bg-primary-600',
		/** Focus State. */
		'focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-primary-600 focus-visible:outline-none',
	],
	{
		variants: {
			disabled: { true: 'opacity-50 !bg-neutral-300', false: '' },
		},
		defaultVariants: {
			disabled: false,
		},
	}
);

export const thumbStyles = cva([
	/** Default State. */
	'block bg-white w-3 h-3 rounded-full transition duration-300 transform translate-x-1',
	/** Checked State. */
	'data-[state=checked]:translate-x-5',
]);

export default rootStyles;
