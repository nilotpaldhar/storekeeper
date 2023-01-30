import PropTypes from 'prop-types';

/** Icons. */
import ChevronUpIcon from '@icons/regular/ChevronUp';
import ChevronDownIcon from '@icons/regular/ChevronDown';

/** Helpers */
import { clsx } from 'clsx';
import useToggle from '@hooks/useToggle';
import truncateStr from '@utils/general/truncateStr';

/**
 * Render the ReadMoreLess component.
 *
 * @return {Element} The ReadMoreLess component.
 */
const ReadMoreLess = ({ text, limit, btnClassName, iconClassName }) => {
	const [show, toggleShow] = useToggle(false);
	const shortText = truncateStr(text, limit);

	/** Class Names. */
	const btnClassNames = clsx(
		'inline-flex items-center space-x-1 ml-1 px-1 rounded-sm',
		'text-sm font-semibold text-neutral-900',
		'hover:text-current hover:opacity-80',
		'focus-visible:outline-dashed focus-visible:outline-current',
		btnClassName
	);
	const iconClassNames = clsx('!text-xs', iconClassName);

	/** Toggle text. */
	const handleClick = () => {
		toggleShow();
	};

	return text === shortText ? (
		text
	) : (
		<>
			{show ? text : shortText}
			{show ? (
				<button type="button" className={btnClassNames} onClick={handleClick}>
					<span>Read Less</span>
					<ChevronUpIcon className={iconClassNames} />
				</button>
			) : (
				<button type="button" className={btnClassNames} onClick={handleClick}>
					<span>Read More</span>
					<ChevronDownIcon className={iconClassNames} />
				</button>
			)}
		</>
	);
};

/**
 * Default Props.
 */
ReadMoreLess.defaultProps = {
	limit: 150,
	btnClassName: '',
	iconClassName: '',
};

/**
 * Prop Types.
 */
ReadMoreLess.propTypes = {
	text: PropTypes.string.isRequired,
	limit: PropTypes.number,
	btnClassName: PropTypes.string,
	iconClassName: PropTypes.string,
};

export default ReadMoreLess;
