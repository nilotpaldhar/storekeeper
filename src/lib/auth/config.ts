import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import ResendProvider from "next-auth/providers/resend";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

import { prisma } from "@/lib/clients/db";
import { env } from "@/lib/config/env";

export const {
	handlers: { GET, POST },
	signIn,
	signOut,
	auth,
} = NextAuth({
	pages: {
		signIn: "/login",
		error: "/login/error",
		verifyRequest: "/login/verification",
	},
	adapter: PrismaAdapter(prisma),
	providers: [
		ResendProvider({
			apiKey: env.EMAIL_PROVIDER_API_KEY,
			from: env.EMAIL_FROM,
		}),
		GoogleProvider({
			clientId: env.AUTH_GOOGLE_ID,
			clientSecret: env.AUTH_GOOGLE_SECRET,
		}),
		FacebookProvider({
			clientId: env.AUTH_FACEBOOK_ID,
			clientSecret: env.AUTH_FACEBOOK_SECRET,
		}),
	],
	callbacks: {},
	session: { strategy: "jwt" },
	debug: env.NODE_ENV === "development",
});
