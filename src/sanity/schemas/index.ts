import { type SchemaTypeDefinition } from "sanity";

import { page } from "@/sanity/schemas/documents/page";

const schema: { types: SchemaTypeDefinition[] } = {
	types: [page],
};

export { schema };
