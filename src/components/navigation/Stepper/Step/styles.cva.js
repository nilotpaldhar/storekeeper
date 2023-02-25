import { cva } from 'class-variance-authority';

const rootStyles = cva(['flex flex-col', 'md:flex-row md:items-center'], {
	variants: {
		lastStep: {
			true: 'w-max',
			false: 'lg:w-full',
		},
	},
	defaultVariants: {
		lastStep: false,
	},
});

export const contentStyles = cva(['flex items-center space-x-2']);

export const iconStyles = cva(
	['shrink-0 flex items-center justify-center w-5 h-5 rounded-full text-xs'],
	{
		variants: {
			status: {
				wait: 'bg-neutral-100 text-neutral-400 font-light',
				finish: 'bg-primary-600 text-white font-semibold',
				process: 'bg-primary-600 text-white font-semibold',
			},
		},
		defaultVariants: {
			status: 'wait',
		},
	}
);

export const labelStyles = cva(
	['overflow-hidden shrink-0 whitespace-nowrap text-ellipsis leading-relaxed select-none'],
	{
		variants: {
			status: {
				wait: 'text-neutral-400 font-light',
				finish: 'text-neutral-900 font-medium',
				process: 'text-neutral-900 font-medium',
			},
		},
		defaultVariants: {
			status: 'wait',
		},
	}
);

export const lineStyles = cva(
	[
		'w-[2px] h-8 my-2 ml-[10px]',
		'md:w-[2px] md:h-5 md:mx-4 md:transform md:rotate-12',
		'lg:w-full lg:h-[2px] lg:rotate-0 lg:mx-6 xxl:mx-10',
	],
	{
		variants: {
			lastStep: {
				true: 'hidden',
				false: 'block',
			},
			status: {
				wait: 'bg-neutral-100',
				finish: 'bg-primary-600',
				process: 'bg-neutral-100',
			},
		},
		defaultVariants: {
			lastStep: false,
			status: 'wait',
		},
	}
);

export default rootStyles;
