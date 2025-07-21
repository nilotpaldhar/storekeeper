import { defineQuery } from "next-sanity";

const HeaderMenuLinkFragment = `
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

const HeaderMenuFragment = `
    "id": _id,
    title,
    isMegaDropdown,
    "megaDropdownItems": megaDropdowns[] {
        "refKey": _key,
        label,
        columns[] {
            "refKey": _key,
            heading,
            items[] { ${HeaderMenuLinkFragment} }
        }
    },
    "menuItems": items[] {
        ${HeaderMenuLinkFragment},
        "dropDownItems": select(
            _type == "navDropdown" => items[] { ${HeaderMenuLinkFragment} },
            null
        )
    }
`;

const FooterLinkFragment = `
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

const GeneralSiteSettings = defineQuery(`
    *[_type == "generalSettings"][0] {
        "domain": siteURL,
        "title": siteTitle,
        "logo": siteLogo.asset._ref,
        "description": siteDescription
    }
`);

const HeaderSettings = defineQuery(`
    *[_type == "headerSettings"][0] {
        "menuDesktop": menuDesktop-> { ${HeaderMenuFragment} },
        "menuMobile": menuMobile-> { ${HeaderMenuFragment} }
    }
`);

const FooterSettings = defineQuery(`
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
            "menus": navBlockMenuItems1[] { ${FooterLinkFragment} }
        },
        "blockTwo": {
            "title": navBlockTitle2, 
            "menus": navBlockMenuItems2[] { ${FooterLinkFragment} }
        },
        "blockThree": {
            "title": navBlockTitle3, 
            "menus": navBlockMenuItems3[] { ${FooterLinkFragment} }
        },
        "social": *[_type == "socialSettings"][0]{
            facebook,
            twitter,
            instagram,
            youtube
        }
    }
`);

export { GeneralSiteSettings, HeaderSettings, FooterSettings };
