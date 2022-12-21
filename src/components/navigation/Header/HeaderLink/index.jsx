import { forwardRef } from 'react';
import PropTypes from 'prop-types';

/** Components. */
import MenuLink from '@ui/navigation/MenuLink';

/** Helpers. */
import clsx from 'clsx';

/**
 * Render the HeaderLink component.
 *
 * @return {Element} The HeaderLink component.
 */
const HeaderLink = forwardRef(({ data, className, ...props }, forwardedRef) => {
	/** ClassNames. */
	const classNames = clsx(
		'flex items-center h-full p-px text-sm font-medium text-neutral-900 hover:text-current focus-visible:text-primary-600 focus-visible:outline-primary-600 data-[state=open]:after:opacity-100',
		'after:opacity-0 after:block after:w-[120%] after:h-[2px] after:bg-primary-600 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:transition-opacity after:duration-75',
		className
	);

	return <MenuLink ref={forwardedRef} data={data} className={classNames} {...props} />;
});

/**
 * Default Props.
 */
HeaderLink.defaultProps = {
	data: {},
	className: '',
};

/**
 * Prop Types.
 */
HeaderLink.propTypes = {
	data: PropTypes.shape({}),
	className: PropTypes.string,
};

export default HeaderLink;
