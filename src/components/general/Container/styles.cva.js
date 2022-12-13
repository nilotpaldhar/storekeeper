import { cva } from 'class-variance-authority';

export default cva('px-4 mx-auto w-full', {
	variants: {
		fluid: {
			true: ['max-w-full'],
			false: [
				'sm:max-w-[540px]',
				'md:max-w-[720px]',
				'lg:max-w-[960px]',
				'xl:max-w-[1140px]',
				'xxl:max-w-[1320px]',
			],
		},
	},
	defaultVariants: {
		fluid: false,
	},
});
