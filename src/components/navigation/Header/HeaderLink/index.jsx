import { forwardRef } from 'react';
import PropTypes from 'prop-types';

/** Components. */
import Link from '@ui/general/Link';

/** Helpers. */
import clsx from 'clsx';
import isValidUrl from '@utils/general/isValidUrl';

/**
 * Render the HeaderLink component.
 *
 * @return {Element} The HeaderLink component.
 */
const HeaderLink = forwardRef((props, ref) => {
	const { data, elementType, className, ...rest } = props;

	/** Get link href. */
	const getHref = ({ type, url, page, isExternal }) => {
		/** Type "Page". */
		if (type === 'navPage') {
			return page?.type === 'page' ? page?.slug?.current : page?.slug;
		}

		/** Type "Link". */
		if (type === 'navLink') {
			return isExternal && isValidUrl(url) ? url : `/${url}`;
		}

		return null;
	};
	const href = getHref(data);
	const external = data?.isExternal;

	/** ClassNames. */
	const classNames = clsx(
		'flex items-center h-full p-px text-sm font-semibold text-neutral-900 hover:text-current focus-visible:text-primary-600 focus-visible:outline-primary-600 data-[state=open]:after:opacity-100',
		'after:opacity-0 after:block after:w-[120%] after:h-[2px] after:bg-primary-600 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:transition-opacity after:duration-75',
		className
	);

	/** Check if valid href. */
	if (elementType === 'link' && href === null) {
		return null;
	}

	if (elementType === 'button') {
		return (
			<button type="button" ref={ref} className={classNames} {...rest}>
				{data?.title}
			</button>
		);
	}

	return (
		<Link
			ref={ref}
			href={href}
			external={external}
			newWindow={external}
			className={classNames}
			{...rest}
		>
			{data?.title}
		</Link>
	);
});

/**
 * Default Props.
 */
HeaderLink.defaultProps = {
	data: {},
	elementType: 'link',
	className: '',
};

/**
 * Prop Types.
 */
HeaderLink.propTypes = {
	data: PropTypes.shape({
		type: PropTypes.oneOf(['navPage', 'navLink']),
		title: PropTypes.string,
		isExternal: PropTypes.bool,
		url: PropTypes.string,
		page: PropTypes.shape({}),
	}),
	elementType: PropTypes.oneOf(['link', 'button']),
	className: PropTypes.string,
};

export default HeaderLink;
