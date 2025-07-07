import "server-only";
import type { UserProfile } from "@/types/domain.types";

import { unstable_cache as cache } from "next/cache";

import { auth } from "@/lib/auth/config";
import { prisma } from "@/lib/clients/db";

const getUserSession = async () => {
	const session = await auth();
	return session?.user ?? null;
};

const getUserById = async ({ id }: { id: string }): Promise<UserProfile | null> => {
	try {
		const user = await prisma.user.findUnique({ where: { id } });
		return user;
	} catch (error) {
		return null;
	}
};

const getUserByEmail = async ({ email }: { email: string }): Promise<UserProfile | null> => {
	try {
		const user = await prisma.user.findUnique({ where: { email } });
		return user;
	} catch (error) {
		return null;
	}
};

const getCachedUserById = cache(
	async ({ id }: { id: string }) => getUserById({ id }),
	["get-user-by-id"]
);

export { getUserSession, getUserById, getUserByEmail, getCachedUserById };
