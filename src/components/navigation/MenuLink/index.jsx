import { forwardRef } from 'react';
import PropTypes from 'prop-types';

/** Components. */
import Anchor from '@ui/general/Anchor';

/** Helpers. */
import isValidUrl from '@utils/general/isValidUrl';

/**
 * Render the MenuLink component.
 *
 * @return {Element} The MenuLink component.
 */
const MenuLink = forwardRef(({ data, elementType, ...props }, forwardedRef) => {
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

	/** Check if valid href. */
	if (elementType === 'link' && href === null) {
		return null;
	}

	if (elementType === 'button') {
		return (
			<button type="button" ref={forwardedRef} {...props}>
				{data?.title}
			</button>
		);
	}

	return (
		<Anchor href={href} ref={forwardedRef} external={external} newWindow={external} {...props}>
			{data?.title}
		</Anchor>
	);
});

/**
 * Default Props.
 */
MenuLink.defaultProps = {
	data: {},
	elementType: 'link',
	className: '',
};

/**
 * Prop Types.
 */
MenuLink.propTypes = {
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

export default MenuLink;
