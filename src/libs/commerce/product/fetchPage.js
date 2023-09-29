import { groq } from 'next-sanity';
import client from '@config/sanity';
import isEmpty from 'lodash-es/isEmpty';
import SiteConfigQuery from '@libs/queries/SiteConfig';
import { parsePermalink } from '@utils/product/permalink';

/**
 * Fetch product page data.
 */
const fetchPage = async (preview = false, permalink = null) => {
	const options = { useCdn: !preview, useToken: preview };
	const { id, slug } = parsePermalink(permalink) ?? {};
	const query = groq`
    { 
      "page": *[_type == "product" && isActive == true && productID == $id && slug == $slug][0]{
        seo,
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
        categories[]->{ "id": _id, slug, title },
        "variants": variantGroups[]{
          id,
          name,
          options[]{ id, name, price, assets }
        },
        "gallery": assets[]{
          id,
          url,
          width,
          height,
          isImage,
          filename,
          fileSize,
          description,
          fileExtension
        },
        image {
          id,
          url,
          width,
          height,
          isImage,
          filename,
          fileSize,
          description,
          fileExtension
        },
        additionalInfo[]{
          'key': _key,
          name,
          value
        },
        relatedProducts[]-> {
          sku,
          name,
          slug,
          price,
          excerpt,
          inventory,
          "id": _id,
          displayName,
          "sanityId": _id,
          "checId": productID,
          categories[]->{ "id": _id, slug, title },
          image {
            id,
            url,
            width,
            height,
            isImage,
            filename,
            fileSize,
            description,
            fileExtension
          }
        }
      },
      "siteConfig": ${SiteConfigQuery}
    }
  `;

	if (isEmpty(id)) return null;

	/** Fatch page data. */
	const data = await client(options).fetch(query, { id, slug: slug ?? '' });
	return data?.page ? data : null;
};

export default fetchPage;
