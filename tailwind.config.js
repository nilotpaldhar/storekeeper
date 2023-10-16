const plugin = require('tailwindcss/plugin');
const { fontFamily } = require('tailwindcss/defaultTheme');
const tailwindForms = require('@tailwindcss/forms');
const tailwindTypography = require('@tailwindcss/typography');

/** Backface Visibility Plugin. */
const backfaceVisibility = plugin(({ addUtilities }) => {
	addUtilities({
		'.backface-visible': {
			'backface-visibility': 'visible',
		},
		'.backface-hidden': {
			'backface-visibility': 'hidden',
		},
	});
});

/**
 * Tailwind config object.
 */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/templates/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
		'./src/pages/**/*.{css,scss}',
		'./src/templates/**/*.{css,scss}',
		'./src/components/**/*.{css,scss}',
		'./src/styles/**/*.{css,scss}',
	],
	theme: {
		extend: {
			screens: {
				sm: '576px',
				md: '768px',
				lg: '992px',
				xl: '1200px',
				xxl: '1400px',
				xxxl: '1800px',
				'hover-hover': { raw: '(hover: hover) and (pointer: fine)' },
				'hover-none': { raw: '(hover: none) and (pointer: none)' },
			},
			colors: {
				primary: {
					50: '#DDF3FF',
					100: '#AEDAFF',
					200: '#91D5FF',
					300: '#4AA6FF',
					400: '#1A8CFE',
					500: '#0173E5',
					600: '#0059B3',
					700: '#004081',
					800: '#002650',
					900: '#000E20',
				},
				neutral: {
					50: '#F5F5F5',
					100: '#F0F0F0',
					200: '#D9D9D9',
					300: '#BFBFBF',
					400: '#8C8C8C',
					500: '#595959',
					600: '#434343',
					700: '#262626',
					800: '#1F1F1F',
					900: '#141414',
				},
				success: {
					50: '#F6FFED',
					100: '#D9F7BE',
					200: '#B7EB8F',
					300: '#95DE64',
					400: '#73D13D',
					500: '#52C41A',
					600: '#389E0D',
					700: '#237804',
					800: '#135200',
					900: '#092B00',
				},
				warning: {
					50: '#FEFFE6',
					100: '#FFFFB8',
					200: '#FFFB8F',
					300: '#FFF566',
					400: '#FFEC3D',
					500: '#FADB14',
					600: '#D4B106',
					700: '#AD8B00',
					800: '#876800',
					900: '#614700',
				},
				error: {
					50: '#FFF1F0',
					100: '#FFCCC7',
					200: '#FFA39E',
					300: '#FF7875',
					400: '#FF4D4F',
					500: '#F5222D',
					600: '#CF1322',
					700: '#A8071A',
					800: '#820014',
					900: '#5C0011',
				},
				social: {
					google: '#ea4335',
					facebook: '#1877f2',
					twitter: '#1da1f2',
					instagram: '#405de6',
					github: '#333333',
					linkedin: '#0077b5',
				},
			},
			fontFamily: {
				sans: ['var(--font-nunito)', ...fontFamily.sans],
			},
			boxShadow: {
				'product-card': '0px 14px 40px rgba(0, 0, 0, 0.04)',
				'newsletter-container':
					'0px 9px 28px 8px rgba(0, 0, 0, 0.04), 0px 6px 16px 0px rgba(0, 0, 0, 0.04), 0px 3px 6px -4px rgba(0, 0, 0, 0.04)',
			},
			keyframes: {
				// Generic
				'fade-in': { from: { opacity: 0 }, to: { opacity: 1 } },
				'fade-out': { from: { opacity: 1 }, to: { opacity: 0 } },

				// Collapsible
				'collapsible-slide-up': {
					from: { height: 'var(--radix-collapsible-content-height)' },
					to: { height: 0 },
				},
				'collapsible-slide-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-collapsible-content-height)' },
				},

				// Modal
				'modal-content-enter': {
					from: { opacity: 0, transform: 'translate(-50%, -10%) scale(0.96)' },
					to: { opacity: 1, transform: 'translate(-50%, 0%) scale(1)' },
				},
				'modal-content-exit': {
					from: { opacity: 1, transform: 'translate(-50%, 0%) scale(1)' },
					to: { opacity: 0, transform: 'translate(-50%, -10%) scale(0.96)' },
				},
			},
			animation: {
				// Generic
				'fade-in': 'fade-in 500ms cubic-bezier(0.4, 0, 0.2, 1)',
				'fade-out': 'fade-out 500ms cubic-bezier(0.4, 0, 0.2, 1)',

				// Collapsible
				'collapsible-slide-up': 'collapsible-slide-up 300ms cubic-bezier(0.4, 0, 0.2, 1)',
				'collapsible-slide-down': 'collapsible-slide-down 300ms cubic-bezier(0.4, 0, 0.2, 1)',

				// Modal
				'modal-overlay-enter': 'fade-in 300ms cubic-bezier(0.4, 0, 0.2, 1)',
				'modal-overlay-exit': 'fade-out 300ms cubic-bezier(0.4, 0, 0.2, 1)',
				'modal-content-enter': 'modal-content-enter 300ms cubic-bezier(0.4, 0, 0.2, 1)',
				'modal-content-exit': 'modal-content-exit 300ms cubic-bezier(0.4, 0, 0.2, 1)',
			},
		},
	},
	variants: {
		extend: {},
	},
	corePlugins: {
		container: false,
	},
	plugins: [
		backfaceVisibility,
		tailwindTypography,
		tailwindForms({
			strategy: 'class',
		}),
	],
};
