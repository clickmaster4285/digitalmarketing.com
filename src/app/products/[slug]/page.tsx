// src/app/products/[slug]/page.tsx

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetailPage from "./ProductDetailPage";
import {
  getAllProducts,
  getProductBySlug,
} from "@/content/product/productContent";
import { CmsPageRenderer } from "@/components/cms/CmsPageRenderer";
import { cmsPageMetadata, getCmsPage } from "@/lib/cms";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    const cmsPage = await getCmsPage(["products", slug]);
    return cmsPage ? cmsPageMetadata(cmsPage) : { title: "Product Not Found" };
  }

  return {
    title: `${product.name} | ClickMasters Products`,
    description: product.tagline,
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

  return <ProductDetailPage product={product} />;
}