import { cva } from 'class-variance-authority';

export const rootStyles = cva('relative flex items-center px-4 py-2', {
	variants: {
		type: {
			info: 'bg-primary-50 text-primary-600',
			success: 'bg-success-50 text-success-600',
			warning: 'bg-warning-50 text-warning-700',
			error: 'bg-error-50 text-error-600',
		},
		closable: {
			true: 'pr-14',
			false: 'pr-4',
		},
		align: {
			left: 'justify-start',
			center: 'justify-center',
			right: 'justify-end',
		},
	},
	defaultVariants: {
		type: 'info',
		closable: false,
	},
});

export const iconStyles = cva(
	'flex justify-center items-center w-[18px] h-[18px] rounded-full text-white shrink-0',
	{
		variants: {
			type: {
				info: 'bg-primary-600',
				success: 'bg-success-600',
				warning: 'bg-warning-600',
				error: 'bg-error-600',
			},
		},
		defaultVariants: {
			type: 'info',
		},
	}
);

export const contentStyles = cva('ml-3 text-sm font-semibold');

export const btnStyles = cva([
	'absolute top-1/2 right-4 transform -translate-y-2/4 flex items-center justify-center w-5 h-5 shrink-0 rounded-full text-current transition duration-300',
	'hover:opacity-70 hover:text-current',
	'focus-visible:outline-current focus-visible:outline-dashed',
]);

export default rootStyles;
