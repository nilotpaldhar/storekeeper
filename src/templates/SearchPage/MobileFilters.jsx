import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import Filters from '@ui/commerce/Filters';
import RegularButton from '@ui/buttons/RegularButton';
import FilterIcon from '@icons/regular/Filter';

const DrawerRoot = dynamic(() =>
	import('react-burger-menu').then((reactBurgerMenu) => reactBurgerMenu.slide)
);

/**
 * Render the MobileFilters component.
 *
 * @return {Element} The MobileFilters component.
 */
const MobileFilters = ({ className }) => {
	const [open, setOpen] = useState(false);
	const handleToggle = () => setOpen((prevState) => !prevState);
	const handleStateChange = (state) => setOpen(state.isOpen);

	return (
		<div className={className}>
			<RegularButton startIcon={FilterIcon} onClick={handleToggle}>
				Filters
			</RegularButton>
			<DrawerRoot
				right={false}
				width={300}
				isOpen={open}
				customCrossIcon={false}
				customBurgerIcon={false}
				onStateChange={handleStateChange}
				menuClassName="bg-white shadow-xl"
				className="fixed top-0 left-0 h-full"
				overlayClassName="!bg-black !bg-opacity-10 top-0 left-0"
			>
				<div className="py-6 px-8">
					<Filters headerTitle="Filters:" />
				</div>
			</DrawerRoot>
		</div>
	);
};

/**
 * Default Props.
 */
MobileFilters.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
MobileFilters.propTypes = {
	className: PropTypes.string,
};

export default MobileFilters;
