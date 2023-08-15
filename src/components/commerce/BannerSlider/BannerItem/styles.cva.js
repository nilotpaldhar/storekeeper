import { cva } from 'class-variance-authority';

export const rootStyles = cva('relative h-[600px] overflow-hidden');

export const contentWrapperOuter = cva('relative z-10 h-full flex items-center');

export const contentWrapperInner = cva(['flex flex-col items-center', 'lg:flex-row']);

export const contentBlock = cva(['order-2 max-w-xl mt-4', 'lg:max-w-md xl:max-w-xl lg:mt-0'], {
	variants: {
		alignment: { left: 'lg:order-1', right: 'lg:order-2 lg:ml-auto' },
	},
	defaultVariants: {
		alignment: 'left',
	},
});

export const imgBlock = cva(
	['order-1 max-w-xs shrink-0', 'md:max-w-sm lg:max-w-md xl:max-w-xl xxl:max-w-xl'],
	{
		variants: {
			alignment: { left: 'lg:order-2 lg:ml-auto', right: 'lg:order-1' },
		},
		defaultVariants: {
			alignment: 'left',
		},
	}
);

export default rootStyles;
