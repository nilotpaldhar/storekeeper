import { cva } from 'class-variance-authority';

/** Root Styles. */
const rootStyles = cva('hover:opacity-90', {
	variants: {
		provider: {
			none: 'bg-neutral-900 hover:bg-neutral-900',
			google: '!bg-social-google hover:!bg-social-google',
			facebook: '!bg-social-facebook hover:!bg-social-facebook',
			twitter: '!bg-social-twitter hover:!bg-social-twitter',
			instagram: '!bg-social-instagram hover:!bg-social-instagram',
			github: '!bg-social-github hover:!bg-social-github',
			linkedin: '!bg-social-linkedin hover:!bg-social-linkedin',
		},
	},
	defaultVariants: {
		provider: 'none',
	},
});

export default rootStyles;
