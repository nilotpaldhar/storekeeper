import { cva } from 'class-variance-authority';

export const rootStyles = cva(
	[
		'absolute top-4 right-4 flex flex-col items-center justify-center space-y-1 transition-opacity duration-500',
	],
	{
		variants: {
			open: {
				true: 'opacity-100 pointer-events-auto',
				false: 'opacity-0 pointer-events-none',
			},
		},
		defaultVariants: {
			open: false,
		},
	}
);

export const btnStyles = cva([
	'w-8 h-8 flex items-center justify-center bg-white text-neutral-900 transition duration-300',
	'hover:bg-primary-600 hover:text-white',
]);

export default rootStyles;
