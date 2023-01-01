import LinkQuery from '@libs/queries/Link';
import MenuQuery from '@libs/queries/Menu';
import SiteSeoQuery from '@libs/queries/SiteSeo';

/** Site Configuration Query.*/
const SiteConfigQuery = `
{
  "root": *[_type == "generalSettings"][0] {
    "domain": siteURL,
    "title": siteTitle,
    "logo": siteLogo.asset._ref,
    "description": siteDescription,
  },
  "header": *[_type == "headerSettings"][0] {
    "mobile": menuMobile->{ ${MenuQuery} },
    "desktop": menuDesktop->{ ${MenuQuery} },
    "site": { 
      "title": *[_type == "generalSettings"][0].siteTitle,
      "logo": *[_type == "generalSettings"][0].siteLogo.asset._ref 
    },
  },
  "footer": *[_type == "footerSettings"][0]{
    "site": {
      "copyright": copyrightText,
      "description": aboutCompany,
      "title": *[_type == "generalSettings"][0].siteTitle,
      "logo": *[_type == "generalSettings"][0].siteLogo.asset._ref,
      "readMore": {
        "title": readMoreLink.title,
        "link": readMoreLink.page->{ title, slug },
      }
    },
    "info": {
      "title": infoBlockTitle,
      "email": emailAddress,
      "phoneNumber": phoneNumber
    },
    "blockOne": {
      "title": navBlockTitle1, 
      "menus": navBlockMenuItems1[]{ ${LinkQuery} }
    },
    "blockTwo": {
      "title": navBlockTitle2, 
      "menus": navBlockMenuItems2[]{ ${LinkQuery} }
    },
    "blockThree": {
      "title": navBlockTitle3, 
      "menus": navBlockMenuItems3[]{ ${LinkQuery} }
    },
    "social": *[_type == "socialSettings"][0]{
      facebook, twitter, instagram, linkedin
    }
  },
  "cookie": *[_type == "cookieSettings"][0]{
    enabled,
    message,
    "link": link->{ title, "href": slug.current }
  },
  "promo": *[_type == "promoSettings"][0]{
    text,
    enabled,
    displayLocation,
    "expiry": expiryDate,
    "link": { "title": link.title, "href": link.page->slug }
  },
  "seo": *[_type == "seoSettings"][0]{ ${SiteSeoQuery} }
}
`;

export default SiteConfigQuery;
