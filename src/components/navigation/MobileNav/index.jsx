import dynamic from 'next/dynamic';
import { useState } from 'react';
import PropTypes from 'prop-types';

/** Components. */
import NavBody from '@ui/navigation/MobileNav/NavBody';
import NavTrigger from '@ui/navigation/MobileNav/NavTrigger';

/** Helpers. */
import clsx from 'clsx';

const DrawerRoot = dynamic(() =>
	import('react-burger-menu').then((reactBurgerMenu) => reactBurgerMenu.slide)
);

/**
 * Render the MobileNav component.
 *
 * @return {Element} The MobileNav component.
 */
const MobileNav = ({ data, className, rootClassName, triggerClassName }) => {
	const { site, menus } = data;
	const [open, setOpen] = useState(false);
	const handleToggle = () => setOpen((prevState) => !prevState);
	const handleStateChange = (state) => setOpen(state.isOpen);

	return (
		<div className={rootClassName}>
			<NavTrigger onOpen={handleToggle} className={triggerClassName} />
			<DrawerRoot
				right={false}
				width={360}
				isOpen={open}
				customCrossIcon={false}
				customBurgerIcon={false}
				onStateChange={handleStateChange}
				menuClassName="bg-white shadow-xl"
				className={clsx('fixed top-0 left-0 h-full', className)}
				overlayClassName="!bg-black !bg-opacity-10 top-0 left-0"
			>
				<NavBody
					menus={menus}
					onClose={handleToggle}
					logo={{ src: site?.logo, alt: site?.title }}
				/>
			</DrawerRoot>
		</div>
	);
};

/**
 * Default Props.
 */
MobileNav.defaultProps = {
	data: {},
	className: '',
	rootClassName: '',
	triggerClassName: '',
};

/**
 * Prop Types.
 */
MobileNav.propTypes = {
	data: PropTypes.shape({
		site: PropTypes.shape({
			logo: PropTypes.string,
			title: PropTypes.string,
		}),
		menus: PropTypes.arrayOf(PropTypes.shape({})),
	}),
	className: PropTypes.string,
	rootClassName: PropTypes.string,
	triggerClassName: PropTypes.string,
};

export default MobileNav;
