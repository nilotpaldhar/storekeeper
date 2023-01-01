import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

/** Components */
import Logo from '@ui/data-display/Logo';
import Container from '@ui/general/Container';
import HeaderNav from '@ui/navigation/Header/HeaderNav';
import HeaderSearch from '@ui/navigation/Header/HeaderSearch';
import HeaderActions from '@ui/navigation/Header/HeaderActions';

const MobileNav = dynamic(() => import('@ui/navigation/MobileNav'));

/**
 * Render the Header component.
 *
 * @return {Element} The Header component.
 */
const Header = ({ data }) => {
	const { site, desktop, mobile } = data;

	/** Logo Config. */
	const logoConf = {
		href: '/',
		srcSanity: true,
		src: site?.logo,
		alt: site?.title,
		className: 'shrink-0',
	};

	return (
		<header className="w-full h-20 border-b border-neutral-100">
			<Container className="flex items-center justify-start h-full xxl:justify-between">
				<Logo {...logoConf} />
				{desktop && <HeaderNav className="hidden xxl:block" items={desktop?.menu} />}
				<HeaderSearch className="ml-auto mr-2 sm:mr-4 lg:mx-auto xl:ml-auto xl:mr-14 xxl:mx-0" />
				<HeaderActions />
				<MobileNav
					data={{ site, menus: mobile?.menu }}
					rootClassName="block order-first mr-4 xxl:hidden"
					triggerClassName="flex items-center p-2 rounded text-neutral-900 hover:text-current focus-visible:outline-primary-600 focus-visible:text-primary-600"
				/>
			</Container>
		</header>
	);
};

/**
 * Default Props.
 */
Header.defaultProps = {
	data: {},
};

/**
 * Prop Types.
 */
Header.propTypes = {
	data: PropTypes.shape({
		site: PropTypes.shape({
			title: PropTypes.string,
			logo: PropTypes.string,
		}),
		desktop: PropTypes.shape({
			menu: PropTypes.arrayOf(PropTypes.shape({})),
		}),
		mobile: PropTypes.shape({
			menu: PropTypes.arrayOf(PropTypes.shape({})),
		}),
	}),
};

export default Header;
