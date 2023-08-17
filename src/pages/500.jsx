import Seo from '@ui/general/Seo';
import Container from '@ui/general/Container';

/**
 * Render the Error500 component.
 *
 * @return {Element} The Error500 component.
 */
const Error500 = () => (
	<>
		<Seo title="Internal Server Error" />
		<div className="h-full py-10">
			<Container className="flex items-center justify-center h-full">
				<div className="max-w-xl mx-auto text-center">
					<h1 className="text-3xl font-black leading-normal text-primary-600 lg:text-4xl">
						Opps! Something went wrong
					</h1>
					<p className="text-base font-light leading-relaxed text-neutral-900 mt-2">
						The page you are trying to access is temporarily unavailable due to an internal server
						error. Please try again later or reload the page.
					</p>
				</div>
			</Container>
		</div>
	</>
);

export default Error500;
