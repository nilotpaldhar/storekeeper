import { PoweredBy } from "react-instantsearch";

const SearchResultsAttribution = () => {
	return (
		<div className="w-28">
			<PoweredBy theme="light" classNames={{ root: "w-full", link: "block" }} />
		</div>
	);
};

export { SearchResultsAttribution };
