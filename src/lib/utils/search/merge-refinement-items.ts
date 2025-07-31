export type RefinementItem = {
	label: string;
	value: string;
	count: number;
	isRefined: boolean;
	attribute: string;
};

/**
 * Merges refinement items from two different attributes (`taxonomy` and `taxon`)
 * into a single list for UI display purposes.
 */
const mergeRefinementItems = (
	listA: RefinementItem[],
	listB: RefinementItem[]
): RefinementItem[] => {
	// Using a Map to merge items keyed by their label
	const merged = new Map<string, RefinementItem>();

	// First, add all taxonomy items to the map
	listA.forEach((item) => {
		merged.set(item.label, { ...item, attribute: "taxonomy" });
	});

	// Then process taxon items
	listB.forEach((item) => {
		if (merged.has(item.label)) {
			// If this label already exists (from taxonomy), merge counts and refinement status
			const existing = merged.get(item.label)!;
			merged.set(item.label, {
				...existing,
				count: existing.count + item.count,
				isRefined: existing.isRefined || item.isRefined,
			});
		} else {
			// If label does not exist yet, add it with attribute "taxon"
			merged.set(item.label, { ...item, attribute: "taxon" });
		}
	});

	// Convert merged Map back to an array for rendering
	return Array.from(merged.values());
};

export { mergeRefinementItems };
