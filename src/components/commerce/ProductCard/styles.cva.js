import { cva } from 'class-variance-authority';

const rootStyles = cva(
	[
		'group bg-white overflow-hidden transition duration-300',
		'hover-hover:border-transparent hover:border-neutral-100 focus-within:border-neutral-100',
	],
	{
		variants: {
			layout: {
				vertical: [
					'border border-neutral-100',
					'hover-hover:border-transparent hover:border-neutral-100 focus-within:border-neutral-100',
				],
				horizontal: ['flex items-center space-x-3', 'pb-6 lg:pb-8 !border-b !border-b-neutral-100'],
			},
		},
		defaultVariants: {
			layout: 'vertical',
		},
	}
);

export const thubnailStyles = cva('relative', {
	variants: {
		layout: {
			vertical: '',
			horizontal: 'shrink-0 w-36 sm:w-40 md:w-56 xl:w-64',
		},
	},
	defaultVariants: {
		layout: 'vertical',
	},
});

export const contentStyles = cva('flex-1 flex flex-col leading-normal', {
	variants: {
		layout: {
			vertical: 'space-y-1.5 mb-3 md:mb-4 text-center',
			horizontal: 'space-y-2 mb-4 md:mb-4',
		},
	},
	defaultVariants: {
		layout: 'vertical',
	},
});

export const titleStyles = cva('text-neutral-900', {
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

export const btnWrapperStyles = cva('', {
	variants: {
		layout: {
			vertical: [
				'hover-hover:opacity-0 hover-hover:pointer-events-none hover-hover:translate-y-20 transition duration-300',
				'group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0',
				'group-focus-within:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0',
			],
			horizontal: ['w-full md:max-w-[175px]'],
		},
	},
	defaultVariants: {
		layout: 'vertical',
	},
});

export const wishlistWrapperStyles = cva([
	'absolute top-2.5 right-2.5 transition duration-300',
	'hover-hover:opacity-0 hover-hover:pointer-events-none hover-hover:scale-75',
	'group-hover:opacity-100 group-hover:pointer-events-auto group-hover:scale-100',
	'group-focus-within:opacity-100 group-focus-within:pointer-events-auto group-focus-within:scale-100',
]);

export const wishlistStyles = cva(
	[
		'w-7 h-7 flex justify-center items-center rounded-full transition-colors duration-300',
		'focus-visible:outline-dashed',
	],
	{
		variants: {
			active: {
				true: 'text-error-600 hover:text-error-600',
				false: 'text-neutral-900/30 hover:text-neutral-900/30',
			},
		},
		defaultVariants: {
			active: false,
		},
	}
);

export default rootStyles;
