import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

/** Components */
import Anchor from '@ui/general/Anchor';
import Logo from '@ui/data-display/Logo';
import Container from '@ui/general/Container';
import SocialHandles from '@ui/general/SocialHandles';
import FooterMenu from '@ui/navigation/Footer/FooterMenu';

/** Icons. */
import ArrowRight from '@icons/regular/ArrowRight';
import Email from '@icons/regular/Email';
import Phone from '@icons/regular/Phone';

/** Seeder. */
import seedData from '@public/seeder/footer';

/**
 * Render the Footer component.
 *
 * @return {Element} The Footer component.
 */
const Footer = ({ data }) => {
	const { company, blockOne, blockTwo, blockThree, info } = data;

	/** Info Menu Items. */
	const infoMenuItems = [
		{
			id: nanoid(),
			icon: <Email className="!text-base" />,
			isExternal: true,
			title: `Email: ${info?.email}`,
			externalUrl: info?.email ? `mailto:${info?.email}` : '#',
		},
		{
			id: nanoid(),
			icon: <Phone className="!text-base" />,
			isExternal: true,
			title: `Call Us: ${info?.phoneNumber}`,
			externalUrl: info?.phoneNumber ? `tel::${info?.phoneNumber}` : '#',
		},
	];

	return (
		<footer className="w-full py-10 text-neutral-100 bg-neutral-900 lg:pt-16 lg:pb-10">
			<Container>
				<div className="flex flex-col gap-10 justify-between xl:flex-row xl:gap-0">
					<div>
						<Logo
							href="/"
							width={220}
							height={30}
							src={company?.logo?.src}
							alt={company?.logo?.alt}
						/>
						<p className="max-w-[40ch] font-normal mt-5">{company?.about}</p>
						{company?.readMore?.href && (
							<Anchor
								href={company?.readMore?.href}
								className="flex items-center gap-2 mt-4 max-w-max text-inherit font-semibold hover:text-neutral-300 focus:outline-neutral-600"
							>
								<span>{company?.readMore?.title || 'Read More'}</span>
								<ArrowRight className="!text-xs" />
							</Anchor>
						)}
					</div>
					<FooterMenu title={blockOne?.title} items={blockOne?.menus} />
					<FooterMenu title={blockTwo?.title} items={blockTwo?.menus} />
					<FooterMenu title={blockThree?.title} items={blockThree?.menus} />
					<FooterMenu title={info?.title} items={infoMenuItems} />
				</div>
				<hr className="border-t border-neutral-800 my-10 lg:mt-14 lg:mb-10" />
				<div className="flex flex-col gap-5 items-center xl:flex-row xl:gap-0 xl:justify-between">
					{company?.copyright && (
						<p className="text-center font-normal text-inherit">{company?.copyright}</p>
					)}
					<SocialHandles />
				</div>
			</Container>
		</footer>
	);
};

/**
 * Default Props.
 */
Footer.defaultProps = {
	data: seedData,
};

/**
 * Prop Types.
 */
Footer.propTypes = {
	data: PropTypes.shape({
		company: PropTypes.shape({
			logo: PropTypes.shape({
				src: PropTypes.string,
				alt: PropTypes.string,
			}),
			about: PropTypes.string,
			readMore: PropTypes.shape({
				title: PropTypes.string,
				href: PropTypes.string,
			}),
			copyright: PropTypes.string,
		}),
		blockOne: PropTypes.shape({
			title: PropTypes.string,
			menus: PropTypes.arrayOf(
				PropTypes.shape({
					id: PropTypes.string,
					title: PropTypes.string,
					externalUrl: PropTypes.string,
					internalUrl: PropTypes.string,
					isExternal: PropTypes.bool,
				})
			),
		}),
		blockTwo: PropTypes.shape({
			title: PropTypes.string,
			menus: PropTypes.arrayOf(
				PropTypes.shape({
					id: PropTypes.string,
					title: PropTypes.string,
					externalUrl: PropTypes.string,
					internalUrl: PropTypes.string,
					isExternal: PropTypes.bool,
				})
			),
		}),
		blockThree: PropTypes.shape({
			title: PropTypes.string,
			menus: PropTypes.arrayOf(
				PropTypes.shape({
					id: PropTypes.string,
					title: PropTypes.string,
					externalUrl: PropTypes.string,
					internalUrl: PropTypes.string,
					isExternal: PropTypes.bool,
				})
			),
		}),
		info: PropTypes.shape({
			title: PropTypes.string,
			email: PropTypes.string,
			phoneNumber: PropTypes.string,
		}),
	}),
};

export default Footer;
