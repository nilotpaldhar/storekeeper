import Facebook from '@icons/social/Facebook';
import Instagram from '@icons/social/Instagram';
import Linkedin from '@icons/social/Linkedin';
import Twitter from '@icons/social/Twitter';

/**
 * Maps social icons by name.
 *
 * @param {string} name Icon name.
 *
 * @return {Element} Icon element.
 */
const mapSocialIcons = (name = '') => {
	const SocialIconsMap = {
		twitter: Twitter,
		instagram: Instagram,
		facebook: Facebook,
		linkedin: Linkedin,
	};

	if (name in SocialIconsMap) {
		return SocialIconsMap[name];
	}

	return null;
};

export default mapSocialIcons;
