import type { Metadata } from "next";

import Link from "next/link";
import { MailCheck } from "lucide-react";
import { StatusMessage } from "@/app/(auth)/_components/status-message";

import { getSeo } from "@/lib/resources/seo/services";

export const generateMetadata = async (): Promise<Metadata> => {
	return getSeo({ metaTitle: "Email Verification", shareTitle: "Email Verification" });
};

const LoginVerificationPage = () => {
	return (
		<div className="py-40">
			<main className="mx-auto max-w-md">
				<div className="flex h-full items-center">
					<StatusMessage icon={MailCheck} heading="Verify your email">
						<p>
							We&apos;ve sent a verification link to your email address. Please click the link to
							confirm your account and start shopping. If you don&apos;t see it, check your spam or
							junk folder — or{" "}
							<Link href="/login" className="text-primary-600 hover:text-primary-500">
								log in
							</Link>{" "}
							again to resend it.
						</p>
					</StatusMessage>
				</div>
			</main>
		</div>
	);
};

export default LoginVerificationPage;
