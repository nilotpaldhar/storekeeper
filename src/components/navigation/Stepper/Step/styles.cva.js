import { cva } from 'class-variance-authority';

const rootStyles = cva(
	[
		'flex items-center select-none',
		'after:border-t after:border-dashed after:border-neutral-300 after:w-5 sm:after:w-10 after:h-px after:ml-3 after:-translate-y-0.5',
	],
	{
		variants: {
			lastStep: {
				true: 'after:hidden',
				false: 'after:block',
			},
		},
		defaultVariants: {},
		lastStep: false,
	}
);

export const btnStyles = cva(
	[
		'text-[8px] sm:text-xs font-semibold leading-none uppercase tracking-normal transition duration-300',
		'after:block after:w-full after:h-px after:mt-1 after:origin-left after:transition after:duration-300',
	],
	{
		variants: {
			active: {
				true: [
					'text-primary-600 hover:text-primary-600 pointer-events-none',
					'after:opacity-100 after:scale-100 after:bg-primary-600',
				],
				false: [
					'text-neutral-900 hover:text-neutral-900',
					'after:opacity-0 after:scale-0 after:bg-transparent',
				],
			},
			disabled: {
				true: 'opacity-50',
				false: 'opacity-100',
			},
		},
		defaultVariants: {
			active: false,
		},
	}
);

export default rootStyles;
