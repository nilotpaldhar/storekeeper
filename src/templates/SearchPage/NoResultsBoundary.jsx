import PropTypes from 'prop-types';
import { useInstantSearch } from 'react-instantsearch';

/**
 * Render the NoResultsBoundary component.
 *
 * @return {Element} The NoResultsBoundary component.
 */
const NoResultsBoundary = ({ children, fallback }) => {
	const { results } = useInstantSearch();

	// eslint-disable-next-line no-underscore-dangle
	if (!results.__isArtificial && results.nbHits === 0) {
		return (
			<>
				{fallback}
				<div hidden>{children}</div>
			</>
		);
	}

	return children;
};

/**
 * Default Props.
 */
NoResultsBoundary.defaultProps = {
	fallback: '',
};

/**
 * Prop Types.
 */
NoResultsBoundary.propTypes = {
	children: PropTypes.node.isRequired,
	fallback: PropTypes.node,
};

export default NoResultsBoundary;
