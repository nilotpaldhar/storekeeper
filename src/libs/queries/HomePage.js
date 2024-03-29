import PageSeoQuery from '@libs/queries/PageSeo';
import { ProductCollectionQuery as ProductQuery } from '@libs/queries/Product';

const BannerQuery = `
  "id": _key,
  title,
  "desc": description,
  price,
  thumbnail,
  backdrop,
  contentAlignment,
  link {
    text,
    resource-> {
      "id": _id,
      "type": _type,
      "sanityId": _id,
      "checId": productID,
      "slug": select(
        defined(slug.current) => slug.current,
        !defined(slug.current) => slug
      )
    }
  }
`;

const OfferQuery = `
  "id": _key,
  title,
  content,
  thumbnail,
  contentAlignment,
  link {
    text,
    url-> {
      "id": _id,
      "type": _type,
      "sanityId": _id,
      "checId": productID,
      "slug": select(
        defined(slug.current) => slug.current,
        !defined(slug.current) => slug
      )
    }
  }
`;

const HomePageQuery = `
  title,
  slug,
  banners {
    hidden,
    collection[] {
      ${BannerQuery}
    }
  },
  categories {
    title,
    hidden,
    collection[]-> {
      "id": _id,
      title,
      slug,
      "image": assets[0]{
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
  specialOffer {
    title,
    description,
    thumbnail,
    date,
    price {
      original,
      discount,
      saved
    },
    product-> {
      "id": _id,
      "sanityId": _id,
      "checId": productID,
      name,
      displayName,
      slug,
      statistics,
      inventory
    },
    hidden
  },
  "collection": {
    newProducts {
      title,
      hidden,
      "link": linkedPage->{
        slug,
        "type": _type,
        "checId": productID
      },
      products[]->{
        ${ProductQuery}
      }
    },
    topRatedProducts {
      title,
      hidden,
      "link": linkedPage->{
        slug,
        "type": _type,
        "checId": productID
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
