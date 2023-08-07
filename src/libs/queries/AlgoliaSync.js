/** Query to sync products with Algolia. */
const AlgoliaSyncQuery = `
  _type,
  _rev,
  "objectID": _id,
  "sanityId": _id,
  "checId": productID,
  _createdAt,
  isActive,
  name,
  displayName,
  excerpt,
  categories[]->{ 
    "id": _id, 
    title,
    slug
  },
  'brand': brand->title,
  'color': color->name + ';' + color->colorCode.hex,
  price {
    raw,
	  formattedWithSymbol
  },
  slug,
  inventory,
  image { url, width, height },
  "variants": variantGroups[]{ id }
`;

export default AlgoliaSyncQuery;
