import Header from '@ui/navigation/Header';
import Footer from '@ui/navigation/Footer';

import headerData from '@public/seeder/header';
import footerData from '@public/seeder/footer';

/**
 * Render the Homepage component.
 *
 * @return {Element} The Homepage component.
 */
const Homepage = () => (
	<div>
		<Header data={headerData} />
		<div className="h-screen" />
		<Footer data={footerData} />
	</div>
);

export default Homepage;
