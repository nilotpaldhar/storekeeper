import { cva } from 'class-variance-authority';

export const rootStyles = cva(
	[
		'overflow-hidden transition-shadow duration-300',
		'hover:shadow-product-card focus-within:shadow-product-card',
	],
	{
		variants: {
			layout: {
				vertical: 'w-full sm:max-w-xs',
				horizontal: 'flex w-full h-40 md:h-56 xl:h-64',
			},
		},
		defaultVariants: {
			layout: 'vertical',
		},
	}
);

export const thumbnailStyles = cva(['relative'], {
	variants: {
		layout: {
			vertical: '',
			horizontal: 'shrink-0 w-40 md:w-56 xl:w-64',
		},
	},
	defaultVariants: {
		layout: 'vertical',
	},
});

export const contentStyles = cva(['overflow-hidden'], {
	variants: {
		layout: {
			vertical: 'px-2 py-3 sm:pl-3 sm:pr-5 sm:py-4 leading-none',
			horizontal: 'flex flex-col justify-center px-5 py-2 lg:px-8 lg:py-4',
		},
	},
	defaultVariants: {
		layout: 'vertical',
	},
});

export const titleStyles = cva([''], {
	variants: {
		layout: {
			vertical: 'text-sm mt-1',
			horizontal: 'text-base lg:text-lg mt-2',
		},
	},
	defaultVariants: {
		layout: 'vertical',
	},
});

export const priceStyles = cva(['font-bold mt-1'], {
	variants: {
		layout: {
			vertical: 'text-sm',
			horizontal: 'text-base',
		},
	},
	defaultVariants: {
		layout: 'vertical',
	},
});

export const stockStyles = cva([
	'absolute top-4 left-0 bg-error-600 text-white text-xs font-bold capitalize py-1 leading-none pl-2 pr-3 rounded-r-full',
]);

export default rootStyles;
