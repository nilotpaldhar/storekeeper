import { cva } from 'class-variance-authority';

export const rootStyles = cva(
	[
		'hidden absolute top-4 right-4 sm:flex flex-col items-center justify-center space-y-1 transition-opacity duration-500',
	],
	{
		variants: {
			open: {
				true: 'opacity-100 pointer-events-auto',
				false: 'opacity-100 pointer-events-auto',
				// true: 'opacity-100 pointer-events-auto',
				// false: ['hover-hover:opacity-0 hover-hover:pointer-events-none'],
			},
		},
		defaultVariants: {
			open: false,
		},
	}
);

export const btnStyles = cva(['w-8 h-8 flex items-center justify-center transition duration-300'], {
	variants: {
		active: {
			true: 'bg-primary-600 text-white hover:bg-primary-500 hover:text-white',
			false: 'bg-white text-neutral-900 hover:text-neutral-900',
		},
	},
	defaultVariants: {
		active: false,
	},
});

export default rootStyles;
