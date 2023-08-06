import PropTypes from 'prop-types';
import { useState } from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';

/** Icons. */
import PlusIcon from '@icons/regular/Plus';
import MinusIcon from '@icons/regular/Minus';

import clsx from 'clsx';

/**
 * Render the FilterWrapper component.
 *
 * @return {Element} The FilterWrapper component.
 */
const FilterWrapper = ({ title, defaultCollapsed, hasDivider, className, children, ...props }) => {
	const [open, setOpen] = useState(!defaultCollapsed);

	return (
		<div
			className={clsx('pb-6', hasDivider && 'border-b border-neutral-100', className)}
			{...props}
		>
			<Collapsible.Root className="" open={open} onOpenChange={setOpen}>
				<Collapsible.Trigger asChild>
					<button
						type="button"
						className="flex items-center justify-between w-full text-neutral-900 hover:text-current"
					>
						<span className="block font-semibold text-base leading-snug">{title}</span>
						{open ? <MinusIcon className="!text-sm" /> : <PlusIcon className="!text-sm" />}
					</button>
				</Collapsible.Trigger>
				<Collapsible.Content>
					<div className="pt-6 px-px">{children}</div>
				</Collapsible.Content>
			</Collapsible.Root>
		</div>
	);
};

/**
 * Default Props.
 */
FilterWrapper.defaultProps = {
	hasDivider: true,
	defaultCollapsed: false,
	children: '',
	className: '',
};

/**
 * Prop Types.
 */
FilterWrapper.propTypes = {
	title: PropTypes.string.isRequired,
	hasDivider: PropTypes.bool,
	defaultCollapsed: PropTypes.bool,
	children: PropTypes.node,
	className: PropTypes.string,
};

export default FilterWrapper;
