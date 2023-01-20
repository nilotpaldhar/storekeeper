import Anchor from '@ui/general/Anchor';
import Container from '@ui/general/Container';
import Divider from '@ui/data-display/Divider';

/**
 * Render the LoginVerificationTmpl component.
 *
 * @return {Element} The LoginVerificationTmpl component.
 */
const LoginVerificationTmpl = () => (
	<Container className="flex items-center h-full">
		<main className="max-w-md mx-auto flex-1 text-base font-normal leading-snug">
			<section className="text-center xl:text-left">
				<h1 className="text-2xl font-bold leading-none">Time to verify your email</h1>
				<p className="mt-6">A verification link has been sent to your email address</p>
				<p className="mt-2">Please verify your email to continue your shopping.</p>
			</section>
			<Divider className="my-8" />
			<section>
				<p className="flex flex-wrap justify-center space-x-1 text-center xl:justify-start xl:text-left">
					<span>Don&apos;t see it? Try checking your spam inbox or</span>
					<Anchor href="/login" className="font-semibold hover:text-primary-500">
						Login
					</Anchor>
					<span>again.</span>
				</p>
			</section>
		</main>
	</Container>
);

export default LoginVerificationTmpl;
