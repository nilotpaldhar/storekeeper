const assertValue = <T>(v: T | undefined, errorMessage: string): T => {
	if (v === undefined) throw new Error(errorMessage);
	return v;
};

const dataset = assertValue(
	process.env.NEXT_PUBLIC_SANITY_DATASET,
	"Missing environment variable: NEXT_PUBLIC_SANITY_DATASET"
);

const projectId = assertValue(
	process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	"Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID"
);

const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-05-26";

const projectTitle = process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || "storekeeper";

export { dataset, projectId, apiVersion, projectTitle };
