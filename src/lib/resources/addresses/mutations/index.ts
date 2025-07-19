import "server-only";

import type { AddressInput, AddressRecord } from "@/types/domain.types";

import { getCommerceLayerClient } from "@/lib/clients/commerce";
import { logEvent } from "@/lib/logging/log-event";
import { normalizeAddress } from "@/lib/utils/commerce/normalize-address";

/**
 *
 */
const createAddress = async (address: AddressInput): Promise<AddressRecord | null> => {
	const clClient = await getCommerceLayerClient();

	try {
		const newAddress = await clClient.addresses.create({
			first_name: address.firstName,
			last_name: address.lastName,
			phone: address.phone,
			line_1: address.street,
			city: address.city,
			zip_code: address.zip,
			country_code: address.country,
			state_code: address.state,
			notes: address.notes,
		});
		return normalizeAddress(newAddress);
	} catch (err) {
		logEvent({
			fn: "createAddress",
			level: "error",
			event: "fail",
			error: err,
		});
		return null;
	}
};

export { createAddress };
