import PropTypes from 'prop-types';

/** Components */
import ScrollArea from '@ui/general/ScrollArea';
import HeaderLink from '@ui/navigation/Header/HeaderLink';

/**
 * Render the ContentArea component.
 *
 * @return {Element} The ContentArea component.
 */
const ContentArea = ({ items, ...props }) => (
	<div {...props}>
		<ScrollArea thumbSize={10} height={320} className="p-5">
			<div className="flex">
				{items?.map((item) => (
					<div key={item?.id} className="flex flex-col flex-shrink-0 w-1/4 px-5 space-y-3">
						<h4 className="text-sm font-semibold text-primary-600">{item.title}</h4>
						{item?.items?.length > 0 && (
							<ul className="flex flex-col space-y-2">
								{item?.items?.map((childItem) => (
									<li key={childItem?.id}>
										<HeaderLink data={childItem} className="!font-light text-neutral-700" />
									</li>
								))}
							</ul>
						)}
					</div>
				))}
			</div>
		</ScrollArea>
	</div>
);

/**
 * Default Props.
 */
ContentArea.defaultProps = {
	items: [],
};

/**
 * Prop Types.
 */
ContentArea.propTypes = {
	items: PropTypes.arrayOf(PropTypes.shape({})),
};

export default ContentArea;
