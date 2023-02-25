import { cva } from 'class-variance-authority';

export const btnStyles = cva([
	'w-full flex items-center justify-between px-5 py-4 bg-zinc-50 text-neutral-900 hover:text-current',
	'data-[state=open]:text-primary-600 [&>span.icon]:transform [&>span]:data-[state=open]:rotate-180',
	'focus-visible:outline-dashed focus-visible:outline-neutral-600',
	'data-[disabled]:opacity-60 data-[disabled]:cursor-not-allowed',
]);

export const textStyles = cva(['text-base font-normal leading-relaxed text-left pr-10']);
