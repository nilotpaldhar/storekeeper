import { cva } from 'class-variance-authority';

const rootStyles = cva('flex', {
	variants: {
		orientation: {
			vertical: 'flex-col space-y-2.5',
			horizontal: ['flex-col space-y-2.5', 'sm:flex-row sm:space-x-4 sm:space-y-0 sm:items-center'],
		},
	},
	defaultVariants: { orientation: 'vertical' },
});

export const labelStyles = cva('flex-1', {
	variants: { orientation: { vertical: '', horizontal: 'max-w-[120px]' } },
	defaultVariants: { orientation: 'vertical' },
});

export const optionsStyles = cva('', {
	variants: { orientation: { vertical: '', horizontal: 'flex-1' } },
	defaultVariants: { orientation: 'vertical' },
});

export default rootStyles;
