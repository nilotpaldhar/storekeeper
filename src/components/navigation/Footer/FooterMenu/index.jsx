import PropTypes from 'prop-types';
import Link from '@ui/general/Link';

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
					{items?.map((item) => {
						const href = item?.isExternal ? item?.externalUrl : item?.internalUrl;

						return (
							<li key={item?.id} className="flex items-center gap-[6px]">
								{item?.icon && <span className="inline-block leading-none">{item?.icon}</span>}
								<Link
									href={href}
									external={item?.isExternal}
									className="py-1 leading-none text-inherit hover:text-neutral-300 focus-visible:outline-neutral-600"
								>
									<span className="inline-block">{item?.title}</span>
								</Link>
							</li>
						);
					})}
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
			title: PropTypes.string,
			externalUrl: PropTypes.string,
			internalUrl: PropTypes.string,
			isExternal: PropTypes.bool,
			icon: PropTypes.node,
		})
	),
};

export default FooterMenu;
