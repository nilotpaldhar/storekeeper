import "server-only";
import { PrismaClient } from "@prisma/client";

import { env } from "@/lib/config/env";

/**
 * PrismaClient is attached to the `global` object in development to prevent
 * exhausting your database connection limit.
 * Learn more: https://pris.ly/d/help/next-js-best-practices
 */

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
	globalForPrisma.prisma ||
	new PrismaClient({
		log: env.NODE_ENV === "development" ? ["query", "error"] : ["error"],
	});

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
