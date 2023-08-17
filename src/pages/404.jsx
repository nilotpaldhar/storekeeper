import PropTypes from 'prop-types';

/** Components & Icons. */
import Anchor from '@ui/general/Anchor';
import Container from '@ui/general/Container';
import RegularButton from '@ui/buttons/RegularButton';
import LayoutWrapper from '@ui/layouts/LayoutWrapper';
import ArrowLeftIcon from '@icons/regular/ArrowLeft';

/** Functions. */
import fetchPage from '@libs/general/dynamic-page/fetchPage';

/**
 * Render the Error404 component.
 *
 * @return {Element} The Error404 component.
 */
const Error404 = ({ page: { title, description } }) => (
	<div className="py-28">
		<Container>
			<div className="flex flex-col items-center max-w-xl mx-auto">
				<div className="text-center">
					<h1 className="text-3xl font-black leading-normal text-primary-600 lg:text-4xl">
						{title}
					</h1>
					<div className="flex flex-col space-y-1 text-base font-light text-neutral-900 mt-2">
						{description && <p>{description}</p>}
						<p className="flex flex-wrap justify-center text-center items-center space-x-1">
							<span>Visit the</span>
							<Anchor href="/">Homepage</Anchor>
							<span>or</span>
							<Anchor href="/contact">Contact Us</Anchor>
							<span>about the problem</span>
						</p>
					</div>
				</div>
				<RegularButton as="anchor" href="/" startIcon={ArrowLeftIcon} className="!px-8 mt-5">
					Back To Home
				</RegularButton>
			</div>
		</Container>
	</div>
);

/**
 * Prop Types.
 */
Error404.propTypes = {
	page: PropTypes.shape({
		title: PropTypes.string,
		description: PropTypes.string,
	}).isRequired,
};

/** Page Layout. */
Error404.getLayout = (page, data) => <LayoutWrapper data={data}>{page}</LayoutWrapper>;

/**
 * Get page props.
 *
 * @return {object} Page props.
 */
export const getStaticProps = async ({ preview }) => {
	const data = await fetchPage(preview, 'errorpage');
	return { props: { data }, revalidate: 10 };
};

export default Error404;
