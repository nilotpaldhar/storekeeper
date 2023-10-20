export const AssetQuery = `
  id,
  url,
  width,
  height,
  isImage,
  filename,
  fileSize,
  description,
  fileExtension
`;

export const ProductCollectionQuery = `
  "id": _id,
  "sanityId": _id,
  "checId": productID,
  isActive,
  name,
  displayName,
  categories[]->{ 
    "id": _id, 
    title,
    slug
  },
  "brand": brand->title,
  price {
    raw,
    formattedWithSymbol
  },
  slug,
  inventory,
  image { 
    url,
    width,
    height
  },
  "variants": variantGroups[]{
    id,
    name,
    options[]{ 
      id, 
      name, 
      price, 
      assets 
    }
  }
`;

export const ProductQuery = `
  sku,
  name,
  slug,
  price,
  excerpt,
  inventory,
  displayName,
  description,
  conditionals,
  "sanityId": _id,
  "checId": productID,
  categories[]->{ 
    "id": _id, 
    slug, 
    title 
  },
  "variants": variantGroups[]{
    id,
    name,
    options[]{ 
      id, 
      name,
      price, 
      assets 
    }
  },
  "gallery": assets[]{
    ${AssetQuery}
  },
  image {
    ${AssetQuery}
  },
  additionalInfo[]{
    'key': _key,
    name,
    value
  },
  relatedProducts[]-> {
    ${ProductCollectionQuery}
  },
  seo {
    metaTitle,
    metaDesc,
    shareTitle,
    shareDesc,
    "shareGraphic": shareGraphic.asset->url,
  }
`;
