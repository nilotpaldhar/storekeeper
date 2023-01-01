/** Link Query. */
const LinkQuery = `
  "id": _key,
  isExternal,
  "type": _type,
  "label": title,
  "href": url.current,
  "page": page-> { "type": _type, title, slug },
`;

export default LinkQuery;
