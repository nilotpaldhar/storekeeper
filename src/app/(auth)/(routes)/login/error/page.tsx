import type { Metadata } from "next";

import Link from "next/link";
import { XOctagon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { StatusMessage } from "@/app/(auth)/_components/status-message";

enum AuthError {
	Configuration = "Configuration",
	AccessDenied = "AccessDenied",
	Verification = "Verification",
	Default = "Default",
}

type LoginErrorPageProps = {
	searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

import { getSeo } from "@/lib/resources/seo/services";

export const generateMetadata = async (): Promise<Metadata> => {
	return getSeo({ metaTitle: "Login Error", shareTitle: "Login Error" });
};

const ErrorContent = ({ errorType }: { errorType: AuthError }) => {
	if (errorType === AuthError.Configuration) {
		return (
			<StatusMessage icon={XOctagon} heading="Server error!">
				<p>
					There was a problem when trying to authenticate. Please contact us if this error persists.
					Unique error code:
					<code className="ml-1 rounded-sm bg-neutral-100 p-1 text-xs">Configuration</code>
				</p>
			</StatusMessage>
		);
	}

	if (errorType === AuthError.AccessDenied) {
		return (
			<StatusMessage icon={XOctagon} heading="Access Denied!">
				<p>You do not have permission to login</p>
				<Button className="w-full" asChild>
					<Link href="/sign-in">Back to Sign In</Link>
				</Button>
			</StatusMessage>
		);
	}

	if (errorType === AuthError.Verification) {
		return (
			<StatusMessage icon={XOctagon} heading="Unable to login!">
				<p>
					The sign in link is no longer valid. It may have been used already or it may have expired
				</p>
				<Button className="w-full" asChild>
					<Link href="/sign-in">Back to Sign In</Link>
				</Button>
			</StatusMessage>
		);
	}

	return (
		<StatusMessage icon={XOctagon} heading="Something went wrong">
			<p>Please contact us if this error persists</p>
		</StatusMessage>
	);
};

const LoginErrorPage = async (props: LoginErrorPageProps) => {
	const searchParams = await props.searchParams;
	const error = searchParams?.error as AuthError;

	return (
		<div className="py-40">
			<main className="mx-auto max-w-sm">
				<div className="flex h-full items-center">
					<ErrorContent errorType={error} />
				</div>
			</main>
		</div>
	);
};

export default LoginErrorPage;
