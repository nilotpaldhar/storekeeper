import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Anchor from '@ui/general/Anchor';
import ArrowRightIcon from '@icons/regular/ArrowRight';
import styles from '@ui/dashboard/DashboardNav/DashboardNavMenu/styles.cva';

/**
 * Render the DashboardNavMenu component.
 *
 * @return {Element} The DashboardNavMenu component.
 */
const DashboardNavMenu = ({ href, children, className, ...props }) => {
	const router = useRouter();
	const active = router.asPath === href;
	const content = (
		<>
			<ArrowRightIcon className="!text-xs transform transition duration-300" />
			<span className="xxx transform transition duration-300 backface-hidden">{children}</span>
		</>
	);

	if (!href)
		return (
			<button type="button" className={styles({ active, className })} {...props}>
				{content}
			</button>
		);

	return (
		<Anchor href={href} className={styles({ active, className })} {...props}>
			{content}
		</Anchor>
	);
};

/**
 * Default Props.
 */
DashboardNavMenu.defaultProps = {
	href: '/',
	children: '',
	className: '',
};

/**
 * Prop Types.
 */
DashboardNavMenu.propTypes = {
	href: PropTypes.string,
	children: PropTypes.node,
	className: PropTypes.string,
};

export default DashboardNavMenu;
