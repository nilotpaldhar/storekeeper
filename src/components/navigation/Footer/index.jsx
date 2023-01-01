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

/**
 * Render the Footer component.
 *
 * @return {Element} The Footer component.
 */
const Footer = ({ data: { site, blockOne, blockTwo, blockThree, info, social } }) => {
	/** Read More Link. */
	const readMore = {
		title: site?.readMore?.title ?? 'Read More',
		// eslint-disable-next-line react/prop-types
		href: site?.readMore?.link?.slug?.current ?? site?.readMore?.link?.slug,
	};

	/** Info Menu Items. */
	const infoMenuItems = [
		{
			id: nanoid(),
			custom: true,
			type: 'navLink',
			isExternal: true,
			label: `Email: ${info?.email}`,
			icon: <Email className="!text-base" />,
			href: info?.email ? `mailto:${info?.email}` : '#',
		},
		{
			id: nanoid(),
			custom: true,
			type: 'navLink',
			isExternal: true,
			label: `Call Us: ${info?.phoneNumber}`,
			icon: <Phone className="!text-base" />,
			href: info?.phoneNumber ? `tel:${info?.phoneNumber}` : '#',
		},
	];

	/** Logo Config. */
	const logoConf = {
		href: '/',
		src: site?.logo,
		alt: site?.title,
		width: 220,
		height: 30,
		srcSanity: true,
	};

	return (
		<footer className="w-full py-10 text-neutral-100 bg-neutral-900 lg:pt-16 lg:pb-10">
			<Container>
				<div className="flex flex-col gap-10 justify-between xl:flex-row xl:gap-0">
					<div>
						<Logo {...logoConf} />
						<p className="max-w-[40ch] font-normal mt-5">{site?.description}</p>
						{readMore.href && (
							<Anchor
								href={readMore.href}
								className="flex items-center gap-2 mt-4 max-w-max text-inherit font-medium hover:text-neutral-300 focus:outline-neutral-600"
							>
								<span>{readMore.title}</span>
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
					{site?.copyright && (
						<p className="text-center font-normal text-inherit">{site?.copyright}</p>
					)}
					<SocialHandles handles={social} />
				</div>
			</Container>
		</footer>
	);
};

/**
 * Default Props.
 */
Footer.defaultProps = {
	data: {},
};

/**
 * Prop Types.
 */
Footer.propTypes = {
	data: PropTypes.shape({
		site: PropTypes.shape({
			title: PropTypes.string,
			logo: PropTypes.string,
			description: PropTypes.string,
			copyright: PropTypes.string,
			readMore: PropTypes.shape({
				title: PropTypes.string,
				link: PropTypes.shape({}),
			}),
		}),
		blockOne: PropTypes.shape({
			title: PropTypes.string,
			menus: PropTypes.arrayOf(PropTypes.shape({})),
		}),
		blockTwo: PropTypes.shape({
			title: PropTypes.string,
			menus: PropTypes.arrayOf(PropTypes.shape({})),
		}),
		blockThree: PropTypes.shape({
			title: PropTypes.string,
			menus: PropTypes.arrayOf(PropTypes.shape({})),
		}),
		info: PropTypes.shape({
			title: PropTypes.string,
			email: PropTypes.string,
			phoneNumber: PropTypes.string,
		}),
		social: PropTypes.shape({}),
	}),
};

export default Footer;
