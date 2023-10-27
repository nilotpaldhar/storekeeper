import { cva } from 'class-variance-authority';

export const rootStyles = cva(['flex pb-5 border-b border-neutral-100'], {
	variants: {
		align: {
			default: ['flex-col items-center space-y-4', 'md:flex-row md:justify-between md:space-y-0'],
			left: 'flex-col items-start space-y-4',
			right: 'flex-col items-end space-y-4',
			center: 'flex-col items-center space-y-4',
		},
	},
	defaultVariants: {
		align: 'default',
	},
});

export const titleStyles = cva(
	[
		'relative text-base md:text-lg text-neutral-900 font-medium capitalize leading-tight tracking-widest',
		'after:block after:absolute after:top-[73px] after:left-0 after:w-full after:h-px after:bg-primary-600',
	],
	{
		variants: {
			align: {
				default: 'text-center md:text-left md:after:top-12',
				left: 'text-left md:after:top-[81px]',
				right: 'text-right md:after:top-[81px]',
				center: 'text-center md:after:top-[81px]',
			},
			highlight: {
				true: 'after:content-[""]',
				false: 'after:hidden',
			},
		},
		defaultVariants: {
			align: 'default',
			highlight: true,
		},
	}
);

export const linkStyles = cva([
	'flex items-center space-x-2 text-sm text-neutral-900 font-normal',
	'hover:text-current hover:opacity-80 focus-visible:outline-dashed leading-tight',
]);

export default rootStyles;
