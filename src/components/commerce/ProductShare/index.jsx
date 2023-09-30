import PropTypes from 'prop-types';
import useCopy from '@hooks/useCopy';

import Tooltip from '@ui/feedback/Tooltip';
import ShareItem from '@ui/commerce/ProductShare/ShareItem';
import { FacebookShareButton, TwitterShareButton, EmailShareButton } from 'next-share';

/** Icons. */
import LinkIcon from '@icons/regular/Link';
import TwitterIcon from '@icons/social/Twitter';
import FacebookIcon from '@icons/social/Facebook';
import EmailFilledIcon from '@icons/regular/EmailFilled';

/**
 * Render the ProductShare component.
 *
 * @return {Element} The ProductShare component.
 */
const ProductShare = ({ url, title, ...props }) => {
	const [copy] = useCopy(url);
	const titlePrefix = `I ❤ this product on StoreKeeper!`;
	const prefixedTitle = `${titlePrefix} ${title}`;

	return (
		<div className="flex gap-3 flex-wrap items-center" {...props}>
			{/* Twitter Share */}
			<Tooltip
				trigger={
					<ShareItem>
						<TwitterShareButton url={url} title={prefixedTitle}>
							<TwitterIcon className="!text-base" />
						</TwitterShareButton>
					</ShareItem>
				}
				side="bottom"
			>
				<span>Share on Twitter</span>
			</Tooltip>

			{/* Facebook Share */}
			<Tooltip
				trigger={
					<ShareItem>
						<FacebookShareButton url={url} quote={prefixedTitle}>
							<FacebookIcon className="!text-base" />
						</FacebookShareButton>
					</ShareItem>
				}
				side="bottom"
			>
				<span>Share on Facebook</span>
			</Tooltip>

			{/* Email Share */}
			<Tooltip
				trigger={
					<ShareItem>
						<EmailShareButton subject={titlePrefix} body={`${title}. Here's the link`} url={url}>
							<EmailFilledIcon className="!text-base" />
						</EmailShareButton>
					</ShareItem>
				}
				side="bottom"
			>
				<span>Share on Email</span>
			</Tooltip>

			{/* Share Link */}
			<Tooltip
				trigger={
					<ShareItem>
						<button
							type="button"
							onClick={() => copy()}
							className="text-current hover:text-current"
						>
							<LinkIcon className="!text-base" />
						</button>
					</ShareItem>
				}
				side="bottom"
			>
				<span>Copy Link</span>
			</Tooltip>
		</div>
	);
};

/**
 * Prop Types.
 */
ProductShare.propTypes = {
	url: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
};

export default ProductShare;
