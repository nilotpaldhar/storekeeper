import PropTypes from 'prop-types';

/** Components. */
import Container from '@ui/general/Container';
import RegularButton from '@ui/buttons/RegularButton';

/** Icons. */
import ArrowLeftIcon from '@icons/regular/ArrowLeft';

/**
 * Render the LoginErrorTmpl component.
 *
 * @return {Element} The LoginErrorTmpl component.
 */
const LoginErrorTmpl = ({ errorType }) => {
	const errorTypes = ['Configuration', 'AccessDenied', 'Verification'];
	const headingClassName = 'text-2xl font-bold leading-none';
	const btnLink = (
		<RegularButton as="anchor" href="/login" startIcon={ArrowLeftIcon} fullWidth>
			Back to Login
		</RegularButton>
	);

	return (
		<Container className="flex items-center h-full">
			<main className="max-w-md mx-auto flex-1 text-base font-normal leading-snug text-center xl:text-left">
				{errorType === 'Configuration' && (
					<section>
						<h1 className={headingClassName}>Server error!</h1>
						<div className="flex flex-col space-y-4 mt-5">
							<p>There is a problem with the server configuration.</p>
							<p>Check the server logs for more information.</p>
						</div>
					</section>
				)}
				{errorType === 'AccessDenied' && (
					<section>
						<h1 className={headingClassName}>Access Denied!</h1>
						<p className="mt-5 mb-6">You do not have permission to login.</p>
						{btnLink}
					</section>
				)}
				{errorType === 'Verification' && (
					<section>
						<h1 className={headingClassName}>Unable to login!</h1>
						<div className="flex flex-col space-y-4 mt-5 mb-6">
							<p>The sign in link is no longer valid.</p>
							<p>It may have been used already or it may have expired.</p>
						</div>
						{btnLink}
					</section>
				)}
				{!errorTypes.includes(errorType) && (
					<section>
						<h1 className={headingClassName}>Oops! Something went wrong</h1>
						<p className="mt-5">Check the server logs for more information.</p>
					</section>
				)}
			</main>
		</Container>
	);
};

/**
 * Default Props.
 */
LoginErrorTmpl.defaultProps = {
	errorType: 'Default',
};

/**
 * Prop Types.
 */
LoginErrorTmpl.propTypes = {
	errorType: PropTypes.string,
};

export default LoginErrorTmpl;
