import PropTypes from 'prop-types';

/** Components */
import Logo from '@ui/general/Logo';
import Container from '@ui/general/Container';
import HeaderNav from '@ui/navigation/Header/HeaderNav';
import HeaderSearch from '@ui/navigation/Header/HeaderSearch';
import HeaderActions from '@ui/navigation/Header/HeaderActions';
import HeaderNavToggle from '@ui/navigation/Header/HeaderNavToggle';

/** Seeder. */
import seedData from '@public/seeder/header';

/**
 * Render the Header component.
 *
 * @return {Element} The Header component.
 */
const Header = ({ data }) => {
	const { company, menus } = data;

	return (
		<header className="w-full h-20 border-b border-neutral-50">
			<Container className="flex items-center justify-start h-full xxl:justify-between">
				<Logo href="/" src={company?.logo?.src} alt={company?.logo?.alt} className="shrink-0" />
				{menus?.length > 0 && <HeaderNav className="hidden xxl:block" items={menus} />}
				<HeaderSearch className="ml-auto mr-2 sm:mr-4 lg:mx-auto xl:ml-auto xl:mr-14 xxl:mx-0" />
				<HeaderActions />
				<HeaderNavToggle />
			</Container>
		</header>
	);
};

/**
 * Default Props.
 */
Header.defaultProps = {
	data: seedData,
};

/**
 * Prop Types.
 */
Header.propTypes = {
	data: PropTypes.shape({
		company: PropTypes.shape({
			logo: PropTypes.shape({
				src: PropTypes.string,
				alt: PropTypes.string,
			}),
		}),
		menus: PropTypes.arrayOf(PropTypes.shape({})),
	}),
};

export default Header;
