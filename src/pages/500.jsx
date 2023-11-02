import { useRouter } from 'next/router';

import Seo from '@ui/general/Seo';
import Container from '@ui/general/Container';
import RegularButton from '@ui/buttons/RegularButton';

import Reloadcon from '@icons/regular/Reload';

/**
 * Render the Error500 component.
 *
 * @return {Element} The Error500 component.
 */
const Error500 = () => {
	const router = useRouter();

	return (
		<>
			<Seo title="Internal Server Error" />
			<div className="flex items-center justify-center h-full max-h-screen overflow-hidden">
				<Container>
					<div className="max-w-3xl mx-auto text-neutral-900">
						<h1 className="text-3xl md:text-4xl xl:text-5xl font-normal text-center leading-tight capitalize">
							Opps! Something went wrong
						</h1>
						<p className="text-lg md:text-xl font-light text-center max-w-2xl mx-auto leading-relaxed mt-4">
							The page you are trying to access is temporarily unavailable due to an internal server
							error. Please <strong>try again later</strong> or <strong>reload the page</strong>
						</p>
						<div className="flex justify-center mt-8">
							<RegularButton
								intent="light"
								startIcon={Reloadcon}
								className="!px-6 md:!px-14"
								onClick={() => router.reload()}
							>
								Reload
							</RegularButton>
						</div>
					</div>
				</Container>
			</div>
		</>
	);
};

export default Error500;
