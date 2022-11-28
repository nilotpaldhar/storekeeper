import PropTypes from 'prop-types';
import cx from 'classnames';
import { AiOutlineDashboard } from 'react-icons/ai';

/**
 * Render the Dashboard icon.
 *
 * @return {Element} The Dashboard icon.
 */
const Dashboard = ({ className, ...props }) => (
	<span className={cx('icon', className && className)} {...props}>
		<AiOutlineDashboard />
	</span>
);

/**
 * Default Props.
 */
Dashboard.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
Dashboard.propTypes = {
	className: PropTypes.string,
};

export default Dashboard;
