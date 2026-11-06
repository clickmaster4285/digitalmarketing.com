// Hand-picked "Related products" for each product page.
//
// Products are grouped by what they actually share, not cross-linked at random:
//   - Pet care suite: pet shop, pharmacy, hospital, diagnostics, and the Pet
//     Super Store POS that combines those dashboards.
//   - Retail POS: supermarket POS, pet super store POS, pet shop (POS/checkout).
//   - Service-business management systems: real estate, car services, gym,
//     restaurant.
// Every product appears in at least two other products' lists, so each
// detail page is reachable from more than just the /products catalogue.
import { getProductBySlug, type ProductContent } from "./productContent";

const RELATED_PRODUCT_SLUGS: Record<string, string[]> = {
  "real-estate-management-system": [
    "car-services-management-system",
    "gym-management-system",
    "restaurant-management-system",
  ],
  "car-services-management-system": [
    "real-estate-management-system",
    "gym-management-system",
    "restaurant-management-system",
  ],
  "gym-management-system": [
    "restaurant-management-system",
    "car-services-management-system",
    "real-estate-management-system",
  ],
  "restaurant-management-system": [
    "pos-supermarket",
    "gym-management-system",
    "car-services-management-system",
  ],
  "pos-supermarket": [
    "pos-pet-super-store",
    "pet-shop",
    "restaurant-management-system",
  ],
  "pos-pet-super-store": ["pet-shop", "pet-pharmacy", "pet-hospital"],
  "pet-shop": ["pos-pet-super-store", "pet-pharmacy", "pos-supermarket"],
  "pet-pharmacy": ["pet-hospital", "pet-diagnostics", "pos-pet-super-store"],
  "pet-hospital": ["pet-diagnostics", "pet-pharmacy", "pos-pet-super-store"],
  "pet-diagnostics": ["pet-hospital", "pet-pharmacy", "pos-pet-super-store"],
};

/** The small, serializable slice of a product the related-products cards need. */
export type RelatedProductSummary = Pick<
  ProductContent,
  "slug" | "name" | "shortName" | "tagline" | "category"
> & { cover?: { src: string; alt: string } };

export const getRelatedProducts = (slug: string): RelatedProductSummary[] =>
  (RELATED_PRODUCT_SLUGS[slug] ?? []).flatMap((relatedSlug) => {
    const product = getProductBySlug(relatedSlug);
    if (!product || product.slug === slug) return [];
    const cover = product.images[0];
    return [
      {
        slug: product.slug,
        name: product.name,
        shortName: product.shortName,
        tagline: product.tagline,
        category: product.category,
        cover: cover ? { src: cover.src, alt: cover.alt } : undefined,
      },
    ];
  });
