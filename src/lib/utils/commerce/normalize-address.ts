import "server-only";

import type { AddressRecord } from "@/types/domain.types";
import type { Address as CLAddress } from "@commercelayer/sdk";

/**
 * Normalize a commerce layer address into the internal Address format.
 */
const normalizeAddress = async (clAddress: CLAddress): Promise<AddressRecord> => {
	return {
		id: clAddress.id,
		type: clAddress.type,
		firstName: clAddress.first_name ?? "",
		lastName: clAddress.last_name ?? "",
		phone: clAddress.phone,
		street: clAddress.state_code,
		city: clAddress.city,
		zip: clAddress.zip_code ?? "",
		country: clAddress.country_code,
		state: clAddress.state_code,
		notes: clAddress.notes ?? undefined,
	};
};

export { normalizeAddress };
