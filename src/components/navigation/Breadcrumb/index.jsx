import PropTypes from 'prop-types';
import BreadcrumbItem from '@ui/navigation/Breadcrumb/BreadcrumbItem';

/**
 * Render the Breadcrumb component.
 *
 * @return {Element} The Breadcrumb component.
 */
const Breadcrumb = ({ items, showRoot, ...props }) => (
	<ul className="flex items-center flex-wrap" {...props}>
		{showRoot && (
			<li>
				<BreadcrumbItem label="Home" href="/" />
			</li>
		)}
		{items.map(({ id, label, href }, idx) => {
			const isLast = idx === items.length - 1;
			return (
				<li key={id}>
					<BreadcrumbItem label={label} href={href} currentPage={isLast} />
				</li>
			);
		})}
	</ul>
);

/**
 * Default Props.
 */
Breadcrumb.defaultProps = {
	items: [],
	showRoot: true,
};

/**
 * Prop Types.
 */
Breadcrumb.propTypes = {
	items: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string,
			href: PropTypes.string,
		})
	),
	showRoot: PropTypes.bool,
};

export default Breadcrumb;
