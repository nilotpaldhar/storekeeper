import PropTypes from 'prop-types';

import Box from '@ui/data-display/Box';
import Anchor from '@ui/general/Anchor';
import Image from '@ui/data-display/Image';

import { clsx } from 'clsx';

/**
 * Render the ProductBox component.
 *
 * @return {Element} The ProductBox component.
 */
const ProductBox = ({ data, className, blockClassName }) => {
	const title = data?.displayName ?? data?.name;
	const href = `/product/${data?.permalink}`;

	return (
		<Box className={clsx('hover:bg-neutral-50/50 transition-colors duration-300', className)}>
			<Box.Block className={clsx('!p-3', blockClassName)}>
				<div className="flex items-start space-x-4">
					<div className="shrink-0 bg-neutral-50">
						{data?.image?.url && (
							<Image src={data?.image?.url} alt={title} width={56} height={56} />
						)}
					</div>
					<div className="flex-1 pt-1">
						<h3 className="text-sm">
							<Anchor
								href={href}
								title={title}
								target="_blank"
								rel="noopener noreferrer"
								className="block text-neutral-900 font-normal hover:text-current"
							>
								<span className="line-clamp-2 md:line-clamp-1">{title}</span>
							</Anchor>
						</h3>
						<div className="flex flex-wrap items-center gap-x-4 gap-y-3 mt-2">
							<div className="flex items-center space-x-1 text-xs">
								<span className="inline-block text-neutral-500 font-light uppercase">Qty:</span>
								<span className="inline-block text-neutral-900 font-semibold uppercase">
									{data?.quantity}
								</span>
							</div>
							{data?.selectedOptions?.length > 0 &&
								data?.selectedOptions?.map((option) => (
									<div key={option?.id} className="flex items-center space-x-1 text-xs">
										<span className="inline-block text-neutral-500 font-light uppercase">
											{option?.group?.name}:
										</span>
										<span className="inline-block text-neutral-900 font-semibold uppercase">
											{option?.name}
										</span>
									</div>
								))}
						</div>
					</div>
				</div>
			</Box.Block>
		</Box>
	);
};

/**
 * Default Props.
 */
ProductBox.defaultProps = {
	className: '',
	blockClassName: '',
};

/**
 * Prop Types.
 */
ProductBox.propTypes = {
	data: PropTypes.shape({
		name: PropTypes.string,
		displayName: PropTypes.string,
		permalink: PropTypes.string,
		quantity: PropTypes.number,
		image: PropTypes.shape({
			url: PropTypes.string,
		}),
		selectedOptions: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string,
				name: PropTypes.string,
				group: PropTypes.shape({
					id: PropTypes.string,
					name: PropTypes.string,
				}),
			})
		),
	}).isRequired,
	className: PropTypes.string,
	blockClassName: PropTypes.string,
};

export default ProductBox;
