import PropTypes from 'prop-types';

/** Components. */
import SummaryTitle from '@ui/data-display/Summary/SummaryTitle';
import SummarySubTitle from '@ui/data-display/Summary/SummarySubTitle';
import SummaryList from '@ui/data-display/Summary/SummaryList';
import SummaryListItem from '@ui/data-display/Summary/SummaryListItem';
import SummaryDivider from '@ui/data-display/Summary/SummaryDivider';

/** Helpers. */
import { clsx } from 'clsx';

/**
 * Render the Summary component.
 *
 * @return {Element} The Summary component.
 */
const Summary = ({ children, className, ...props }) => (
	<div className={clsx('border border-neutral-50 p-5')} {...props}>
		{children}
	</div>
);

/**
 * Sub-Components.
 */
Summary.Title = SummaryTitle;
Summary.SubTitle = SummarySubTitle;
Summary.List = SummaryList;
Summary.ListItem = SummaryListItem;
Summary.Divider = SummaryDivider;

/**
 * Default Props.
 */
Summary.defaultProps = {
	children: '',
	className: '',
};

/**
 * Prop Types.
 */
Summary.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
};

export default Summary;
