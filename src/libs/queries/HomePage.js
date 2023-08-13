import PageSeoQuery from '@libs/queries/PageSeo';

const ProductQuery = `
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
  'brand': brand->title,
  price {
    raw,
    formattedWithSymbol
  },
  slug,
  inventory,
  image { url, width, height },
  "variants": variantGroups[]{ id }
`;

const OfferQuery = `
  'id': _key,
  title,
  content,
  thumbnail,
  contentAlignment,
  link {
    text,
    url-> {
      "id": _id,
      'type': _type,
      "sanityId": _id,
      "checId": productID,
      'slug' : select(
        defined(slug.current) => slug.current,
        !defined(slug.current) => slug
      )
    }
  }
`;

const HomePageQuery = `
  title,
  slug,
  categories {
    title,
    hidden,
    collection[]-> {
      'id': _id,
      title,
      slug,
      'image': assets[0]{
        url,
        width,
        height,
        isImage
      }
    } 
  },
  offers {
    hidden,
    collection[] {
      ${OfferQuery}
    }
  },
  'collection': {
    newProducts {
      title,
      hidden,
      'link': linkedPage->{
        slug,
        'type': _type,
        'checId': productID
      },
      products[]->{
        ${ProductQuery}
      }
    },
    topRatedProducts {
      title,
      hidden,
      'link': linkedPage->{
        slug,
        'type': _type,
        'checId': productID
      },
      products[]->{
        ${ProductQuery}
      }
    },
    featuredProducts {
      hidden,
      products[]->{
        ${ProductQuery}
      }
    }
  },
  "seo": { ${PageSeoQuery} }
`;

export default HomePageQuery;
