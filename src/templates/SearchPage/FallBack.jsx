import Empty from '@ui/feedback/Empty';
import { useInstantSearch } from 'react-instantsearch';
import emptySearchImg from '@public/empty-search.svg';

/**
 * Render the FallBack component.
 *
 * @return {Element} The FallBack component.
 */
const FallBack = () => {
	const { indexUiState } = useInstantSearch();

	return (
		<Empty
			className="py-40"
			imgSrc={emptySearchImg}
			imgProps={{ alt: 'no results', width: 260, height: 211 }}
			title={`No results found for "${indexUiState.query}"`}
			description="We apologize, but our search did not find any results. Perhaps you could try searching for something else?"
		/>
	);
};

export default FallBack;
