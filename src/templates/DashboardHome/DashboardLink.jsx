import PropTypes from 'prop-types';
import Anchor from '@ui/general/Anchor';
import { cva } from 'class-variance-authority';

const styles = cva([
	'flex flex-col items-center justify-center space-y-2 text-neutral-900 border border-neutral-50 bg-white',
	'hover:text-current hover:bg-neutral-50 transition-colors duration-300 focus-visible:outline-dashed',
	'md:space-y-4 h-32 md:h-40 xl:h-48',
]);

/**
 * Render the DashboardLink component.
 *
 * @return {Element} The DashboardLink component.
 */
const DashboardLink = ({ href, icon: Icon, children, className, ...props }) => {
	const content = (
		<>
			{Icon && <Icon className="!text-3xl md:!text-4xl xl:!text-5xl" />}
			<span className="text-sm md:text-base font-normal leading-none">{children}</span>
		</>
	);

	if (!href)
		return (
			<button type="button" className={styles({ className })} {...props}>
				{content}
			</button>
		);

	return (
		<Anchor href={href} className={styles({ className })} {...props}>
			{content}
		</Anchor>
	);
};

/**
 * Default Props.
 */
DashboardLink.defaultProps = {
	href: null,
	icon: null,
	children: '',
	className: '',
};

/**
 * Prop Types.
 */
DashboardLink.propTypes = {
	href: PropTypes.string,
	icon: PropTypes.elementType,
	children: PropTypes.node,
	className: PropTypes.string,
};

export default DashboardLink;
