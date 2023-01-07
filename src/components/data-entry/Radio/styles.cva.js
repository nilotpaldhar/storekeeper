import { cva } from 'class-variance-authority';

export const rootStyles = cva('flex max-w-max transition-opacity duration-300', {
	variants: {
		disabled: { true: 'opacity-50', false: 'opacity-100' },
		orientation: {
			horizontal: 'items-center space-x-4',
			vertical: 'flex-col justify-center space-y-4',
		},
	},
	defaultVariants: {
		disabled: false,
		orientation: 'horizontal',
	},
});

export default rootStyles;
