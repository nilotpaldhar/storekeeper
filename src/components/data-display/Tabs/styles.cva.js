import { cva } from 'class-variance-authority';

export const listStyles = cva(['flex items-center space-x-2 md:space-x-4', 'xl:space-x-8'], {
	variants: {
		align: {
			left: 'justify-start',
			center: 'justify-center',
			right: 'justify-end',
		},
	},
	defaultVariants: {
		align: 'center',
	},
});

export const triggerStyles = cva([
	'block py-2 px-5 border-b border-transparent text-sm xl:text-base font-normal text-neutral-900 leading-snug transition duration-300',
	'hover:text-current focus-visible:outline-dashed focus-visible:outline-offset-0 focus-visible:outline-primary-600',
	'data-[state=active]:border-primary-600 data-[state=active]:text-primary-600 data-[disabled]:opacity-60',
	'whitespace-nowrap overflow-hidden text-ellipsis',
]);

export const contentStyles = cva('border border-neutral-200');
