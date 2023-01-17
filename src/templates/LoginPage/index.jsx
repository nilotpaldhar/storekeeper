import PropTypes from 'prop-types';
import { useState } from 'react';
import { signIn } from 'next-auth/react';

/** Components. */
import Anchor from '@ui/general/Anchor';
import Container from '@ui/general/Container';
import Divider from '@ui/data-display/Divider';
import AuthButton from '@ui/buttons/AuthButton';
import TextField from '@ui/data-entry/TextField';
import RegularButton from '@ui/buttons/RegularButton';

/**
 * Render the LoginPageTmpl component.
 *
 * @return {Element} The LoginPageTmpl component.
 */
const LoginPageTmpl = ({ providers, callbackUrl }) => {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);

	/** Email login handler. */
	const onSubmit = async (evt) => {
		evt.preventDefault();
		setLoading(true);
		await signIn('email', { email, callbackUrl });
	};

	return (
		<main className="max-w-md mx-auto mt-20">
			<Container>
				<section className="flex flex-col space-y-3">
					<h1 className="flex items-center space-x-2 text-xl font-bold leading-none">
						<span>Login</span>
						<span className="text-base italic font-normal">or</span>
						<span>Register</span>
					</h1>
					<p className="text-base font-normal leading-snug">
						Get access to your Orders and Wishlist
					</p>
				</section>
				<section className="flex flex-col mt-12 space-y-4">
					<form onSubmit={onSubmit}>
						<div className="flex flex-col space-y-4">
							<TextField
								required
								id="email"
								type="email"
								value={email}
								label="Email Address"
								onChange={(evt) => setEmail(evt.target.value)}
							/>
							<RegularButton fullWidth type="submit" loading={loading}>
								Continue
							</RegularButton>
						</div>
					</form>
					<p className="flex flex-wrap justify-center space-x-1 text-sm font-light text-center">
						<span>By continuing, I agree to the</span>
						<Anchor href="/" className="font-semibold hover:text-primary-500">
							Terms of Use
						</Anchor>
						<span>and</span>
						<Anchor href="/" className="font-semibold hover:text-primary-500">
							Privacy Policy
						</Anchor>
					</p>
				</section>
				<Divider className="my-8">or continue with</Divider>
				<div className="flex flex-col md:flex-row items-center space-y-2 md:space-x-2 md:space-y-0">
					{providers?.map(({ id, name }) => (
						<AuthButton key={id} className="flex-1" id={id} name={name} callbackUrl={callbackUrl} />
					))}
				</div>
			</Container>
		</main>
	);
};

/**
 * Default Props.
 */
LoginPageTmpl.defaultProps = {
	providers: [],
	callbackUrl: '/',
};

/**
 * Prop Types.
 */
LoginPageTmpl.propTypes = {
	providers: PropTypes.arrayOf(PropTypes.shape({})),
	callbackUrl: PropTypes.string,
};

export default LoginPageTmpl;
