/** Site SEO Query. */
const SiteSeoQuery = `
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
  "faviconLegacy": faviconLegacy.asset->url,
`;

export default SiteSeoQuery;
