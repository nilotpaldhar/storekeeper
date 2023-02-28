import { cva } from 'class-variance-authority';

export const rootStyles = cva(
	[
		'flex items-center p-5 text-base text-neutral-900 capitalize overflow-hidden transition duration-300',
		'hover:text-current hover:font-semibold focus-visible:outline-none focus-visible:font-semibold',
	],
	{
		variants: {
			active: {
				true: [
					'text-primary-600 font-semibold [&>span.icon]:-translate-x-0 [&>span.icon]:opacity-100 [&>span.xxx]:translate-x-3',
				],
				false: [
					'font-light [&>span.icon]:-translate-x-10 [&>span.icon]:opacity-0 [&>span.xxx]:-translate-x-3',
				],
			},
		},
		defaultVariants: {
			active: false,
		},
	}
);

export default rootStyles;
