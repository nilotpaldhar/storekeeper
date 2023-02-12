import { cva } from 'class-variance-authority';

export const rootStyles = cva(
	['flex items-center justify-center px-6 py-2 min-h-[40px] max-w-max border border-neutral-200'],
	{
		variants: {
			disabled: {
				true: 'opacity-40 pointer-events-none',
				false: '',
			},
		},
		defaultVariants: {
			disabled: false,
		},
	}
);

export const inputStyles = cva([
	'block w-10 leading-none outline-none text-neutral-900 font-medium',
]);

export const btnWrapperStyles = cva(['flex items-center'], {
	variants: {
		controls: {
			horizontal: 'space-x-2',
			vertical: 'flex-col space-y-px',
		},
	},
	defaultVariants: {
		controls: 'horizontal',
	},
});

export const btnStyles = cva(
	[
		'flex items-center justify-center transition duration-300 rounded-full',
		'disabled:opacity-40 disabled:pointer-events-none',
	],
	{
		variants: {
			controls: {
				horizontal: [
					'w-6 h-6 bg-neutral-100 text-neutral-500',
					'hover:bg-neutral-200 hover:text-current',
				],
				vertical: 'text-neutral-900 hover:text-current',
			},
		},
		defaultVariants: {
			controls: 'horizontal',
		},
	}
);

export default rootStyles;
