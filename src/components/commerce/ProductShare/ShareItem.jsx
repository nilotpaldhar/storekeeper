import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import clsx from 'clsx';

/**
 * Render the ShareItem component.
 *
 * @return {Element} The ShareItem component.
 */
const ShareItem = forwardRef(({ children, ...props }, forwardedRef) => {
	const classNames = clsx(
		'w-8 h-8 bg-white text-neutral-500 border border-neutral-200 rounded-full overflow-hidden',
		'hover:border-neutral-500 hover:text-neutral-900 transition-all duration-150',
		'[&>button]:flex  [&>button]:items-center [&>button]:justify-center [&>button]:w-full [&>button]:h-full'
	);

	return (
		<div ref={forwardedRef} className={classNames} {...props}>
			{children}
		</div>
	);
});

/**
 * Default Props.
 */
ShareItem.defaultProps = {
	children: '',
};

/**
 * Prop Types.
 */
ShareItem.propTypes = {
	children: PropTypes.node,
};

export default ShareItem;
