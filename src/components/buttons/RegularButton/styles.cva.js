import { cva } from 'class-variance-authority';

export const rootStyles = cva(
	[
		'px-4',
		'py-2',
		'text-sm',
		'space-x-2',
		'min-h-[40px]',
		'text-center',
		'items-center',
		'justify-center',
		'font-normal',
		'leading-none',
		'overflow-hidden',
		'backface-hidden',
		'transition',
		'tranform',
		'duration-300',
		'hover:shadow-md',
		'focus-visible:outline-offset-[3px]',
		'focus-visible:outline-dashed',
		'focus-visible:outline-1',
	],
	{
		variants: {
			intent: {
				primary: [
					'text-white',
					'bg-primary-600',
					'hover:text-white',
					'hover:bg-primary-500',
					'active:bg-primary-500',
					'focus-visible:outline-primary-600',
				],
				dark: [
					'text-white',
					'bg-neutral-900',
					'hover:text-white',
					'hover:bg-neutral-600',
					'active:bg-neutral-600',
					'focus-visible:outline-neutral-900',
				],
				light: [
					'bg-neutral-50',
					'text-neutral-900',
					'hover:bg-neutral-100',
					'hover:text-neutral-900',
					'active:text-neutral-900',
					'focus-visible:outline-neutral-300',
				],
				success: [
					'text-white',
					'bg-success-600',
					'hover:text-white',
					'hover:bg-success-500',
					'active:bg-success-500',
					'focus-visible:outline-success-600',
				],
				warning: [
					'text-white',
					'bg-warning-600',
					'hover:text-white',
					'hover:bg-warning-500',
					'active:bg-warning-500',
					'focus-visible:outline-warning-600',
				],
				error: [
					'text-white',
					'bg-error-600',
					'hover:text-white',
					'hover:bg-error-500',
					'active:bg-error-500',
					'focus-visible:outline-error-600',
				],
				'primary-ghost': [
					'text-primary-600',
					'hover:shadow-none',
					'hover:text-primary-400',
					'active:text-primary-400',
					'focus-visible:outline-primary-600',
				],
				'dark-ghost': [
					'text-neutral-900',
					'hover:shadow-none',
					'hover:text-neutral-600',
					'active:text-neutral-600',
					'focus-visible:outline-neutral-900',
				],
				'light-ghost': [
					'text-neutral-600',
					'hover:shadow-none',
					'hover:text-neutral-400',
					'active:text-neutral-400',
					'focus-visible:outline-neutral-300',
				],
				'success-ghost': [
					'text-success-600',
					'hover:shadow-none',
					'hover:text-success-400',
					'active:text-success-400',
					'focus-visible:outline-success-600',
				],
				'warning-ghost': [
					'text-warning-600',
					'hover:shadow-none',
					'hover:text-warning-400',
					'active:text-warning-400',
					'focus-visible:outline-warning-600',
				],
				'error-ghost': [
					'text-error-600',
					'hover:shadow-none',
					'hover:text-error-400',
					'active:text-error-400',
					'focus-visible:outline-error-600',
				],
			},
			fullWidth: {
				true: ['flex', 'w-full', 'text-center'],
				false: ['inline-flex'],
			},
			disabled: {
				true: [
					'opacity-50',
					'cursor-none',
					'select-none',
					'focus:outline-none',
					'pointer-events-none',
					'focus-visible:outline-none',
				],
				false: '',
			},
			loading: {
				true: ['opacity-70', 'cursor-none', 'select-none', 'pointer-events-none'],
				false: '',
			},
		},
		defaultVariants: {
			intent: 'primary',
			fullWidth: false,
			disabled: false,
			loading: false,
		},
	}
);

export const iconStyles = cva('!text-sm leading-none');

export default rootStyles;
