import { cva } from 'class-variance-authority';

export const triggerStyles = cva([
	'form-input w-full flex items-center justify-between p-3 border border-neutral-200 transition duration-300 bg-white',
	'hover:border-neutral-900 hover:text-current focus:ring-primary-600 focus:border-primary-600',
	'text-sm text-neutral-700 font-normal leading-tight whitespace-nowrap overflow-hidden select-none',
	'data-[disabled]:bg-neutral-100 data-[disabled]:hover:border-neutral-200',
]);

export const contentStyles = cva([
	'bg-white shadow-lg border border-neutral-200',
	'w-[var(--radix-select-trigger-width)]',
	'max-h-[var(--radix-select-content-available-height)]',
]);

export const labelStyles = cva('flex items-center max-w-max text-neutral-900 mb-2');

export const labelTextStyles = cva([
	'text-sm font-medium select-none leading-none',
	'[&>sup]:text-xs [&>sup]:-top-[0.2em] [&>sup]:left-[0.2em]',
]);
