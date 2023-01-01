/** Page SEO Query. */
const PageSeoQuery = `
  "metaTitle": seo.metaTitle,
  "metaDesc": seo.metaDesc,
  "shareTitle": seo.shareTitle,
  "shareDesc": seo.shareDesc,
  "shareGraphic": seo.shareGraphic.asset->url,
`;

export default PageSeoQuery;
