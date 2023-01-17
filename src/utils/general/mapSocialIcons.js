import Facebook from '@icons/social/Facebook';
import Github from '@icons/social/Github';
import Google from '@icons/social/Google';
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
		facebook: Facebook,
		github: Github,
		google: Google,
		instagram: Instagram,
		linkedin: Linkedin,
		twitter: Twitter,
	};

	if (name in SocialIconsMap) {
		return SocialIconsMap[name];
	}

	return null;
};

export default mapSocialIcons;
