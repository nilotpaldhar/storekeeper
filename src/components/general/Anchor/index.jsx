import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import NextLink from 'next/link';

/**
 * Render the Anchor component.
 *
 * @return {Element} The Anchor component.
 */
const Anchor = forwardRef(({ href, external, newWindow, children, ...props }, forwardedRef) => {
	/** Link config */
	const linkConf = {
		href,
		ref: forwardedRef,
		target: newWindow ? '_black' : undefined,
		rel: newWindow ? 'noopener noreferrer' : undefined,
		...props,
	};

	if (external) {
		return <a {...linkConf}>{children}</a>;
	}

	return <NextLink {...linkConf}>{children}</NextLink>;
});

/**
 * Default Props.
 */
Anchor.defaultProps = {
	children: '',
	newWindow: false,
	external: false,
};

/**
 * Prop Types.
 */
Anchor.propTypes = {
	href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
	external: PropTypes.bool,
	newWindow: PropTypes.bool,
	children: PropTypes.node,
};

export default Anchor;
