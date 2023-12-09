import { cva } from 'class-variance-authority';

export const rootStyles = cva(['block text-sm leading-none', 'focus-visible:outline-dashed'], {
	variants: {
		active: {
			true: ['text-primary-600 font-semibold hover:text-primary-600'],
			false: ['text-neutral-900 font-normal hover:text-neutral-900'],
		},
	},
	defaultVariants: {
		active: false,
	},
});

export default rootStyles;
