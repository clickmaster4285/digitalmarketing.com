// src/app/products/[slug]/page.tsx

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetailPage from "./ProductDetailPage";
import {
  getAllProducts,
  getProductBySlug,
} from "@/content/product/productContent";
import { getRelatedProducts } from "@/content/product/relatedProducts";
import { CmsPageRenderer } from "@/components/cms/CmsPageRenderer";
import { cmsPageMetadata, getCmsPage } from "@/lib/cms";
import { applyEditedPageSeo } from "@/lib/pageEdits.server";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

// Keep titles within ~60 characters (the SERP display limit) by shortening
// only the brand suffix; the product name itself is never cut.
const productTitle = (name: string) =>
  [`${name} | ClickMasters Products`, `${name} | ClickMasters`, name].find(
    (title) => title.length <= 60,
  ) ?? name;

async function baseMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    const cmsPage = await getCmsPage(["products", slug]);
    return cmsPage ? cmsPageMetadata(cmsPage) : { title: "Product Not Found" };
  }

  return {
    title: productTitle(product.name),
    description: product.tagline,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.tagline,
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    const cmsPage = await getCmsPage(["products", slug]);
    if (!cmsPage) notFound();
    return <CmsPageRenderer page={cmsPage} />;
  }

  return (
    <ProductDetailPage
      product={product}
      related={getRelatedProducts(product.slug)}
    />
  );
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;
  return applyEditedPageSeo(`/products/${slug}`, await baseMetadata(props));
}
