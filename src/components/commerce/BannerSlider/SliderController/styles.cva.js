import { cva } from 'class-variance-authority';

export const rootStyles = cva('max-w-max flex items-center text-neutral-900', {
	variants: {
		orientation: {
			horizontal: 'flex-row space-x-4',
			vertical: 'flex-col space-y-4',
		},
	},
	defaultVariants: {
		orientation: 'horizontal',
	},
});

export const indicators = cva('block text-sm font-semibold leading-none transform translate-y-px');

export const controller = cva(['relative flex items-center select-none touch-none'], {
	variants: {
		orientation: {
			horizontal: 'flex-row w-36 h-3',
			vertical: 'flex-col h-36 w-3',
		},
	},
	defaultVariants: {
		orientation: 'horizontal',
	},
});

export const track = cva(['relative grow bg-neutral-200'], {
	variants: {
		orientation: { horizontal: 'h-1', vertical: 'w-1' },
	},
	defaultVariants: {
		orientation: 'horizontal',
	},
});

export const range = cva('absolute bg-transparent', {
	variants: {
		orientation: { horizontal: 'h-full', vertical: 'w-full' },
	},
	defaultVariants: {
		orientation: 'horizontal',
	},
});

export const thumb = cva(
	['block bg-primary-600 transition-colors duration-300 outline-none hover:bg-primary-500'],
	{
		variants: {
			orientation: {
				horizontal: 'w-10 h-2',
				vertical: 'w-2 h-10',
			},
		},
		defaultVariants: {
			orientation: 'horizontal',
		},
	}
);

export default rootStyles;
