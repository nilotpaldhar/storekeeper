import { cva } from 'class-variance-authority';

const rootStyles = cva('');

export const wrapperStyles = cva('grid', {
	variants: {
		grid: {
			true: [
				'grid-cols-2 gap-x-4 gap-y-6',
				'md:grid-cols-3 md:gap-x-4 md:gap-y-8',
				'lg:gap-y-10',
				'xxl:grid-cols-4 xxxl:gap-x-5',
			],
			false: ['grid-cols-1 gap-y-6', 'md:gap-y-8'],
		},
	},
	defaultVariants: {
		grid: true,
	},
});

export default rootStyles;
