import type { Metadata } from "next";

import Link from "next/link";
import { Suspense } from "react";

import { Divider } from "@/components/ui/divider";
import { LoginForm } from "@/app/(auth)/_components/login-form";
import { SocialAuthButtons } from "@/app/(auth)/_components/social-auth-buttons";

import { getSeo } from "@/lib/resources/seo/services";

export const generateMetadata = async (): Promise<Metadata> => {
	return getSeo({ metaTitle: "Login", shareTitle: "Login" });
};

const LoginPage = () => {
	return (
		<div className="py-20">
			<main className="mx-auto max-w-md">
				<section className="flex flex-col space-y-3">
					<h1 className="flex items-center space-x-2 text-xl leading-none font-bold">
						<span>Login</span>
						<span className="text-base font-normal italic">or</span>
						<span>Register</span>
					</h1>
					<p className="text-base leading-snug font-normal">
						Get access to your Orders and Wishlist
					</p>
				</section>
				<section className="mt-12 flex flex-col space-y-4">
					<Suspense fallback={<div>Loading...</div>}>
						<LoginForm />
					</Suspense>
					<p className="flex flex-wrap justify-center space-x-1 text-center text-sm font-light">
						<span>By continuing, I agree to the</span>
						<Link href="/" className="hover:text-primary-500 font-semibold">
							Terms of Use
						</Link>
						<span>and</span>
						<Link href="/" className="hover:text-primary-500 font-semibold">
							Privacy Policy
						</Link>
					</p>
				</section>
				<Divider className="my-8">or continue with</Divider>
				<Suspense fallback={<div>Loading...</div>}>
					<SocialAuthButtons />
				</Suspense>
			</main>
		</div>
	);
};

export default LoginPage;
