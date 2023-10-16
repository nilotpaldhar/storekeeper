import { cva } from 'class-variance-authority';

export const overlayStyles = cva([
	'fixed inset-0 bg-black/20 backdrop-blur-sm transition-all duration-1000 ease',
	'data-[state=open]:animate-modal-overlay-enter data-[state=closed]:animate-modal-overlay-exit',
]);

export const contentStyles = cva([
	'fixed top-1/4 left-1/2 -translate-x-1/2 translate-y-0 max-h-[85vh] w-[90vw] max-w-md p-6 bg-white text-neutral-900 border shadow-lg rounded',
	'data-[state=open]:animate-modal-content-enter data-[state=closed]:animate-modal-content-exit',
]);

export const closeBtnStyles = cva([
	'absolute top-4 right-4 flex items-center justify-center w-6 h-6 rounded-full bg-transparent text-neutral-900',
	'hover:text-current hover:bg-neutral-50',
]);

export const titleStyles = cva(['font-medium leading-snug text-xl py-2']);

export const descStyles = cva(['font-light text-sm text-neutral-500 leading-relaxed']);
