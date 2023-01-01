import PropTypes from 'prop-types';
import MenuLink from '@ui/navigation/MenuLink';

/**
 * Render the FooterMenu component.
 *
 * @return {Element} The FooterMenu component.
 */
const FooterMenu = ({ title, items, ...props }) => (
	<div {...props}>
		{title && (
			<h4 className="flex flex-col gap-2 text-lg font-semibold leading-none after:w-8 after:bg-white after:h-px after:block">
				{title}
			</h4>
		)}
		{items?.length > 0 && (
			<nav className="mt-5 lg:mt-8">
				<ul className="flex flex-col gap-5">
					{items?.map(({ icon, ...data }) => (
						<li key={data?.id} className="flex items-center gap-[6px]">
							{icon && <span className="inline-block leading-none">{icon}</span>}
							<MenuLink
								data={data}
								className="py-1 leading-none text-inherit hover:text-neutral-300 focus-visible:outline-neutral-600"
							/>
						</li>
					))}
				</ul>
			</nav>
		)}
	</div>
);

/**
 * Default Props.
 */
FooterMenu.defaultProps = {
	title: '',
	items: [],
};

/**
 * Prop Types.
 */
FooterMenu.propTypes = {
	title: PropTypes.string,
	items: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			label: PropTypes.string,
			href: PropTypes.string,
			isExternal: PropTypes.bool,
			icon: PropTypes.node,
		})
	),
};

export default FooterMenu;
