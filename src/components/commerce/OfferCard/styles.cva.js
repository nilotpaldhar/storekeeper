import { cva } from 'class-variance-authority';

export const rootStyles = cva('relative max-w-max mx-auto bg-neutral-50');

export const wrapper = cva('absolute top-2/4 transform -translate-y-2/4 max-w-max px-6 py-4 z-10', {
	variants: {
		alignment: { left: 'left-0', right: 'right-0' },
	},
	defaultVariants: {
		alignment: 'left',
	},
});

export const contentBox = cva('h-full flex flex-col justify-center space-y-2 lg:space-y-3');

export const titleText = cva(
	'text-xs text-neutral-500 font-normal leading-tight truncate overflow-hidden'
);

export const contentText = cva('max-w-[20ch] text-sm text-neutral-900 font-normal leading-relaxed');

export const anchor = cva('flex items-center space-x-1 max-w-max');

export default rootStyles;
