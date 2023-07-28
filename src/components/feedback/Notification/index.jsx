import PropTypes from 'prop-types';
import { Toaster } from 'react-hot-toast';

/**
 * Render the Notification component.
 *
 * @return {Element} The Notification component.
 */
const Notification = ({ position, gutter, duration }) => {
	const options = {
		position,
		gutter,
		toastOptions: {
			duration,
			className: 'text-sm',
			style: {
				border: '1px solid #D9D9D9',
				borderRadius: 0,
				lineHeight: 1.625,
				padding: '8px 12px',
				color: '#141414',
				boxShadow: 'none',
			},
			success: {
				iconTheme: {
					primary: '#389E0D',
					secondary: '#ffffff',
				},
			},
			error: {
				iconTheme: {
					primary: '#CF1322',
					secondary: '#ffffff',
				},
			},
		},
	};

	return <Toaster {...options} />;
};

/**
 * Default Props.
 */
Notification.defaultProps = {
	position: 'bottom-left',
	gutter: 12,
	duration: 6000,
};

/**
 * Prop Types.
 */
Notification.propTypes = {
	position: PropTypes.oneOf([
		'bottom-center',
		'bottom-left',
		'bottom-right',
		'top-center',
		'top-left',
		'top-right',
	]),
	gutter: PropTypes.number,
	duration: PropTypes.number,
};

export default Notification;
