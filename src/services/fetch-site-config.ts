import { defineQuery } from "next-sanity";
import { getClient } from "@/lib/sanity/client";

const GeneralSettings = defineQuery(`
    *[_type == "generalSettings"][0] {
        "domain": siteURL,
        "title": siteTitle,
        "logo": siteLogo.asset._ref,
        "description": siteDescription
    }
`);

const HeaderMenuLink = `
    "refKey": _key,
    "type": _type,
    label,
    "isExternal": coalesce(isExternal, false),
    "href": select(
        _type == "navLink" => coalesce(path, url, "/"),
        _type == "navPage" => page->slug.current,
        _type == "navProduct" => linkedProduct->slug.current,
        _type == "navTaxon" => linkedTaxon->slug.current,
        _type == "navTaxonomy" => linkedTaxonomy->slug.current,
        "#"
    )
`;

const HeaderMenu = `
    "id": _id,
    title,
    isMegaDropdown,
    "megaDropdownItems": megaDropdowns[] {
        "refKey": _key,
        label,
        columns[] {
            "refKey": _key,
            heading,
            items[] { ${HeaderMenuLink} }
        }
    },
    "menuItems": items[] {
        ${HeaderMenuLink},
        "dropDownItems": select(
            _type == "navDropdown" => items[] { ${HeaderMenuLink} },
            null
        )
    }
`;

const HeaderSettings = defineQuery(`
    *[_type == "headerSettings"][0] {
        "menuDesktop": menuDesktop-> { ${HeaderMenu} },
        "menuMobile": menuMobile-> { ${HeaderMenu} }
    }
`);

const FooterLink = `
    "key": _key,
    "type": _type,
    "isExternal": select(
        defined(isExternal) => isExternal,
        false
    ),
    "label": select(
        !defined(title) && _type == "navPage" => page->title,
        label
    ),
    "href": select(
        _type == "navLink" => select(
            defined(path) => path,
            defined(url) => url,
            null
        ),
        _type == "navPage" => page->slug.current,
        null
    )
`;

const FooterAndSocialSettings = defineQuery(`
    *[_type == "footerSettings"][0] {
        "site": {
            "copyright": copyrightText,
            "description": aboutCompany,
            "title": *[_type == "generalSettings"][0].siteTitle,
            "logo": *[_type == "generalSettings"][0].siteLogo.asset._ref,
            "readMore": {
                "label": readMoreLink.label,
                "link": readMoreLink.page->{ title, slug },
            }
        },
        "info": {
            "title": infoBlockTitle,
            "email": emailAddress,
            "phone": phoneNumber
        },
        "blockOne": {
            "title": navBlockTitle1, 
            "menus": navBlockMenuItems1[] { ${FooterLink} }
        },
        "blockTwo": {
            "title": navBlockTitle2, 
            "menus": navBlockMenuItems2[] { ${FooterLink} }
        },
        "blockThree": {
            "title": navBlockTitle3, 
            "menus": navBlockMenuItems3[] { ${FooterLink} }
        },
        "social": *[_type == "socialSettings"][0]{
            facebook,
            twitter,
            instagram,
            youtube
        }
    }
`);

const GlobalSeoSettings = defineQuery(`
    *[_type == "seoSettings"][0] {
        metaTitle,
        metaDesc,
        shareDesc,
        shareTitle,
        twitterCardType,
        twitterUsername,
        metaRobotsNoindex,
        metaRobotsNofollow,
        "favicon": favicon.asset->url,
        "touchIcon": touchIcon.asset->url,
        "shareGraphic": shareGraphic.asset->url,
        "faviconLegacy": faviconLegacy.asset->url
    }
`);

const getGeneralSettings = async () => {
	const generalSettings = await getClient({
		useCdn: true,
		useToken: true,
	}).fetch(GeneralSettings);
	return generalSettings;
};

const getHeaderSettings = async () => {
	const headerSettings = await getClient({
		useCdn: true,
		useToken: true,
	}).fetch(HeaderSettings);
	return headerSettings;
};

const getFooterAndSocialSettings = async () => {
	const footerAndSocialSettings = await getClient({
		useCdn: true,
		useToken: true,
	}).fetch(FooterAndSocialSettings);
	return footerAndSocialSettings;
};

const getGlobalSeoSettings = async () => {
	const globalSeoSettings = await getClient({
		useCdn: true,
		useToken: true,
	}).fetch(GlobalSeoSettings);
	return globalSeoSettings;
};

export { getGeneralSettings, getHeaderSettings, getFooterAndSocialSettings, getGlobalSeoSettings };
