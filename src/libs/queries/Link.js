/** Link Query. */
const LinkQuery = `
  "id": _key,
  "type": _type,
  "isExternal": select(
    defined(isExternal) => isExternal,
    false
  ),
  "label": select(
    !defined(title) && _type == "navPage" => page->title,
    !defined(title) && _type == "navProduct" => linkedProduct->name,
    !defined(title) && _type == "navCategory" => linkedCategory->title,
    title
  ),
  "href": url.current,
  "resource": select(
    _type == "navPage" => page->{
      "slug": select(
        defined(slug.current) => slug.current, slug
      )
    },
    _type == "navProduct" => linkedProduct->{ 
      "checId": productID, slug 
    },
    _type == "navCategory" => linkedCategory->{ 
      slug
    },
  ),
`;

export default LinkQuery;
