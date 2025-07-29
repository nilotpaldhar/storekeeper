import { Fragment } from "react";

import { ILLUSTRATIONS } from "@/constants/media";

import { Empty, EmptyDescription, EmptyImage, EmptyTitle } from "@/components/ui/empty";

type SearchResultsEmptyStateProps = {
	title: string;
	description: string;
	examples?: string[];
	imageAlt?: string;
};

const SearchResultsEmptyState = ({
	title,
	description,
	imageAlt = "Empty State",
	examples = [],
}: SearchResultsEmptyStateProps) => {
	return (
		<Empty>
			<EmptyImage
				src={ILLUSTRATIONS.EMPTY_STATES.EMPTY_SEARCH}
				width={260}
				height={211}
				alt={imageAlt}
			/>
			<EmptyTitle>{title}</EmptyTitle>
			<EmptyDescription>
				<p>{description}</p>
				{examples.length > 0 ? (
					<p>
						Try searching for{" "}
						{examples.map((item, idx) => (
							<Fragment key={item}>
								<span className="font-medium">{item}</span>
								{idx < examples.length - 1 ? ", " : ""}
							</Fragment>
						))}
						.
					</p>
				) : null}
			</EmptyDescription>
		</Empty>
	);
};

export { SearchResultsEmptyState };
