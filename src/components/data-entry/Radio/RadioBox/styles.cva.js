import { cva } from 'class-variance-authority';

export const rootStyles = cva(
	[
		'block bg-white text-sm font-medium px-3 py-1 border transition duration-300',
		'data-[state=checked]:border-primary-600 data-[state=checked]:text-primary-600',
		'data-[state=unchecked]:border-neutral-200 data-[state=unchecked]:text-neutral-500',
		'focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-primary-600 focus-visible:outline-none',
	],
	{
		variants: {
			disabled: {
				true: [
					'opacity-50',
					'data-[state=checked]:border-neutral-300 data-[state=checked]:bg-neutral-300',
					'data-[state=unchecked]:border-neutral-300 data-[state=unchecked]:bg-neutral-200',
				],
				false: [],
			},
		},
	}
);

// export const rootStyles = cva(
// 	[
// 		'flex justify-center items-center w-5 h-5 bg-white border-2 rounded transition duration-300',
// 		'data-[state=checked]:border-primary-600',
// 		'data-[state=unchecked]:border-neutral-200',
// 		'focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-primary-600 focus-visible:outline-none',
// 	],
// 	{
// 		variants: {
// 			disabled: {
// 				true: [
// 					/** Default State. */
// 					'opacity-50',
// 					/** Checked State. */
// 					'data-[state=checked]:border-neutral-300 data-[state=checked]:bg-neutral-300',
// 					/** Unchecked State. */
// 					'data-[state=unchecked]:border-neutral-300 data-[state=unchecked]:bg-neutral-200',
// 				],
// 				false: [],
// 			},
// 		},
// 		defaultVariants: {
// 			disabled: false,
// 		},
// 	}
// );

export default rootStyles;
