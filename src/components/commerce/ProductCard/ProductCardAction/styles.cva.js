import { cva } from 'class-variance-authority';

export const rootStyles = cva(
	[
		'hidden absolute top-4 right-4 sm:flex flex-col items-center justify-center space-y-1 transition-opacity duration-500',
	],
	{
		variants: {
			open: {
				true: 'opacity-100 pointer-events-auto',
				false: [
					'hover-hover:opacity-0 hover-hover:pointer-events-none',
					// 'hover-none:opacity-100 hover-none:pointer-events-auto',
				],
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
