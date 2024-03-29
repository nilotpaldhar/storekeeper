import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import Anchor from '@ui/general/Anchor';
import styles from './styles.cva';

/**
 * Render the MenuLink component.
 *
 * @return {Element} The MenuLink component.
 */
const MenuLink = ({ href, children, className, ...props }) => {
	const router = useRouter();
	const active = router.asPath === href;

	if (!href) {
		return (
			<button type="button" className={styles({ className })} {...props}>
				{children}
			</button>
		);
	}

	return (
		<Anchor href={href} className={styles({ active, className })} {...props}>
			{children}
		</Anchor>
	);
};

/**
 * Default Props.
 */
MenuLink.defaultProps = {
	href: null,
	children: '',
	className: '',
};

/**
 * Prop Types.
 */
MenuLink.propTypes = {
	href: PropTypes.string,
	children: PropTypes.node,
	className: PropTypes.string,
};

export default MenuLink;
