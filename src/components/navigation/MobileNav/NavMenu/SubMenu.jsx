import { useState } from 'react';
import PropTypes from 'prop-types';
import * as Collapsible from '@radix-ui/react-collapsible';

/** Components. */
import MenuLink from '@ui/navigation/MenuLink';

/** Icons. */
import ChevronRightIcon from '@icons/regular/ChevronRight';
import ChevronDown from '@icons/regular/ChevronDown';

/** Helpers. */
import clsx from 'clsx';

/**
 * Render the SubMenu component.
 *
 * @return {Element} The SubMenu component.
 */
const SubMenu = ({ data, collapsible }) => {
	const [open, setOpen] = useState(false);
	const itemClassNames =
		'w-full px-5 py-2 text-neutral-900 hover:bg-neutral-50 hover:text-current focus-visible:outline-primary-600 focus-visible:text-primary-600';

	return collapsible ? (
		<Collapsible.Root open={open} onOpenChange={setOpen}>
			<Collapsible.Trigger asChild>
				<button
					type="button"
					className={clsx('flex items-center justify-between text-sm font-medium', itemClassNames)}
				>
					<span>{data?.label}</span>
					{open ? <ChevronDown className="!text-xs" /> : <ChevronRightIcon className="!text-xs" />}
				</button>
			</Collapsible.Trigger>
			<Collapsible.Content>
				{data?.items?.length > 0 && (
					<ul className="flex flex-col space-y-2">
						{data?.items?.map((item) => (
							<li key={item?.id}>
								<span className="block px-8 py-2 text-sm font-medium border-b text-neutral-900 border-neutral-50">
									{item?.label}
								</span>
								<ul className="">
									{item?.items?.map((childItem) => (
										<li key={childItem?.id}>
											<MenuLink
												data={childItem}
												className={clsx(
													'block !px-12 text-sm font-light text-neutral-700',
													itemClassNames
												)}
											/>
										</li>
									))}
								</ul>
							</li>
						))}
					</ul>
				)}
			</Collapsible.Content>
		</Collapsible.Root>
	) : (
		<MenuLink data={data} className={clsx('block text-sm font-medium', itemClassNames)} />
	);
};

/**
 * Default Props.
 */
SubMenu.defaultProps = {
	data: {},
	collapsible: false,
};

/**
 * Prop Types.
 */
SubMenu.propTypes = {
	data: PropTypes.shape({
		label: PropTypes.string,
		items: PropTypes.arrayOf(PropTypes.shape({})),
	}),
	collapsible: PropTypes.bool,
};

export default SubMenu;
