import { useRouter } from 'next/router';

import Seo from '@ui/general/Seo';
import Image from '@ui/data-display/Image';
import Container from '@ui/general/Container';
import RegularButton from '@ui/buttons/RegularButton';

import ArrowLeftIcon from '@icons/regular/ArrowLeft';
import error404Img from '@public/404.svg';

/**
 * Render the Error404 component.
 *
 * @return {Element} The Error404 component.
 */
const Error404 = () => {
	const router = useRouter();

	return (
		<>
			<Seo title="404 Not Found" />
			<div className="flex items-center justify-center h-full max-h-screen overflow-hidden">
				<Container>
					<div className="flex items-center flex-col space-y-6 md:space-y-8 max-w-2xl mx-auto">
						<div>
							<Image src={error404Img} alt="404 Not Found" />
						</div>
						<div className="text-neutral-900">
							<h1 className="text-3xl md:text-4xl xl:text-5xl font-normal text-center leading-tight capitalize">
								Sorry Something is Missing
							</h1>
							<p className="text-lg md:text-xl font-light text-center max-w-md mx-auto leading-relaxed mt-4">
								The link you clicked may be broken or the page may have been removed.
							</p>
							<div className="flex items-center flex-wrap justify-center gap-4 mt-8">
								<RegularButton as="anchor" href="/" className="!px-6 md:!px-14">
									Go Home
								</RegularButton>
								<RegularButton
									intent="light"
									startIcon={ArrowLeftIcon}
									className="!px-6 md:!px-14"
									onClick={() => router.back()}
								>
									Go Back
								</RegularButton>
							</div>
						</div>
					</div>
				</Container>
			</div>
		</>
	);
};

export default Error404;
