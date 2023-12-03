import PropTypes from 'prop-types';
import Container from '@ui/general/Container';
import PrimaryLayout from '@ui/layouts/PrimaryLayout';

/**
 * Render the DashboardLayout component.
 *
 * @return {Element} The DashboardLayout component.
 */
const DashboardLayout = ({ data, children, ...props }) => (
	<PrimaryLayout data={data} {...props}>
		<Container className="py-10 lg:py-14">
			<div className="flex flex-col space-y-10 lg:flex-row lg:space-x-8 lg:space-y-0">
				<div className="hidden flex-1 lg:max-w-xs">DashboardNav</div>
				<div className="flex-1">{children}</div>
			</div>
		</Container>
	</PrimaryLayout>
);

/**
 * Default Props.
 */
DashboardLayout.defaultProps = {
	children: '',
};

/**
 * Prop Types.
 */
DashboardLayout.propTypes = {
	data: PropTypes.shape({
		header: PropTypes.shape({}),
		footer: PropTypes.shape({}),
	}).isRequired,
	children: PropTypes.node,
};

export default DashboardLayout;
