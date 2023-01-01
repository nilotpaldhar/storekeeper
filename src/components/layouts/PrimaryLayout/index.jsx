import PropTypes from 'prop-types';

/** Components. */
import Header from '@ui/navigation/Header';
import Footer from '@ui/navigation/Footer';

/**
 * Render the PrimaryLayout component.
 *
 * @return {Element} The PrimaryLayout component.
 */
const PrimaryLayout = ({ data, children, ...props }) => {
	if (!data) return null;

	const { header, footer } = data ?? {};

	return (
		<div className="flex flex-col min-h-full" {...props}>
			<Header data={header} />
			<div className="flex-1">{children}</div>
			<Footer data={footer} />
		</div>
	);
};

/**
 * Default Props.
 */
PrimaryLayout.defaultProps = {
	children: '',
};

/**
 * Prop Types.
 */
PrimaryLayout.propTypes = {
	data: PropTypes.shape({
		header: PropTypes.shape({}),
		footer: PropTypes.shape({}),
	}).isRequired,
	children: PropTypes.node,
};

export default PrimaryLayout;
