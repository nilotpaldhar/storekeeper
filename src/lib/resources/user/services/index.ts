import "server-only";
import { getCommerceLayerClient } from "@/lib/clients/commerce";
import { prisma } from "@/lib/clients/db";
import {
	getCachedUserById,
	getUserByEmail,
	getUserById,
	getUserSession,
} from "@/lib/resources/user/fetch";

const getCurrentUser = async ({ cached }: { cached?: true } = {}) => {
	const session = await getUserSession();

	const id = session?.id;
	if (!id) return null;

	if (cached) {
		const user = await getCachedUserById({ id });
		return user;
	}

	const user = await getUserById({ id });
	return user;
};

const syncCommerceLayerCustomer = async ({ email }: { email: string }): Promise<boolean> => {
	const clClient = await getCommerceLayerClient();

	const user = await getUserByEmail({ email });
	if (!user) return false;

	// 1) If already have an ID, confirm it exists in CL
	if (user.commerceCustomerId) {
		try {
			const existingCustomer = await clClient.customers.retrieve(user.commerceCustomerId);
			if (existingCustomer) return true;
		} catch (error) {
			console.warn(
				`Stale commerceCustomerId for user ${email}: ${user.commerceCustomerId}. Will resync.`
			);
		}
	}

	try {
		// 2) Try to find customer by email in CL
		const foundCustomers = await clClient.customers.list({
			filters: { email_eq: email },
		});

		let commerceCustomerId: string;

		if (foundCustomers.length > 0) {
			commerceCustomerId = foundCustomers[0].id;
		} else {
			const newCustomer = await clClient.customers.create({
				email,
				password: null,
			});
			commerceCustomerId = newCustomer.id;
		}

		// 3) Update DB with fresh ID
		await prisma.user.update({
			where: { id: user.id },
			data: { commerceCustomerId },
		});

		return true;
	} catch (error) {
		return false;
	}
};

export { getCurrentUser, syncCommerceLayerCustomer };
