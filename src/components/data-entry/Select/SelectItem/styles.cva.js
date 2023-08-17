import { cva } from 'class-variance-authority';

export const rootStyles = cva([
	'px-3 py-2 flex items-center text-neutral-900 transition duration-300 cursor-pointer font-[nunito]',
	'data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed',
	'data-[highlighted]:bg-neutral-50 data-[highlighted]:outline-none',
	'data-[state=checked]:bg-neutral-100 data-[state=checked]:font-semibold',
]);

export const indicatorStyles = cva(['flex items-center pr-2']);

export default rootStyles;
