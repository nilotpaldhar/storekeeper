import PropTypes from 'prop-types';
import { Item, Trigger, Content } from '@radix-ui/react-navigation-menu';

/** Components */
import HeaderLink from '@ui/navigation/Header/HeaderLink';
import ContentArea from './ContentArea';

/**
 * Render the HeaderDropdown component.
 *
 * @return {Element} The HeaderDropdown component.
 */
const HeaderDropdown = ({ data }) => (
	<Item className="relative flex items-center">
		<Trigger asChild>
			<HeaderLink elementType="button" data={{ title: data?.title }} />
		</Trigger>
		<Content className="z-10 w-[200%] max-w-4xl absolute top-full -translate-x-10 border bg-white border-neutral-100 rounded rounded-t-none shadow">
			<ContentArea items={data?.items} />
		</Content>
	</Item>
);

/**
 * Default Props.
 */
HeaderDropdown.defaultProps = {
	data: {},
};

/**
 * Prop Types.
 */
HeaderDropdown.propTypes = {
	data: PropTypes.shape({
		title: PropTypes.string,
		items: PropTypes.arrayOf(PropTypes.shape({})),
	}),
};

export default HeaderDropdown;
