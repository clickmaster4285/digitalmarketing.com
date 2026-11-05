"use client";

import { organizationRef } from "@/lib/organizationSchema";

type Faq = { q?: unknown; a?: unknown };

type Props = {
  schema: any;
  slug?: string;
  /** The FAQs rendered on the page; FAQPage markup uses their real answers. */
  faqs?: Faq[];
};

const plainText = (value: unknown): string =>
  typeof value === "string"
    ? value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
    : "";

const buildSchemas = (schema: any, faqs: Faq[] = []) => {
  if (!schema) return [];

  const schemas: any[] = [];

  /* ---------------- SERVICE ---------------- */
  if (schema.Service) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: schema.Service.serviceType,
      provider: organizationRef,
      areaServed: schema.Service.areaServed,
    });
  }

  /* ---------------- WEB PAGE ---------------- */
  if (schema.WebPage) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: schema.WebPage.name,
      description: schema.WebPage.description,
      url: schema.WebPage.url,
      publisher: organizationRef,
      author: schema.WebPage.author,
    });
  }

  /* ---------------- ARTICLE ---------------- */
  if (schema.Article) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: schema.Article.headline,
      description: schema.Article.description,
      author: schema.Article.author,
      publisher: schema.Article.publisher,
      datePublished: schema.Article.datePublished,
      dateModified: schema.Article.dateModified,
      mainEntityOfPage: schema.Article.mainEntityOfPage,
    });
  }

  /* ---------------- DEFINED TERM SET ---------------- */
  if (schema.DefinedTermSet) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "DefinedTermSet",
      name: schema.DefinedTermSet.name,
      description: schema.DefinedTermSet.description,
      url: schema.DefinedTermSet.url,
      hasDefinedTerm: schema.DefinedTermSet.hasDefinedTerm,
    });
  }

  /* ---------------- WEB APPLICATION ---------------- */
  if (schema.WebApplication) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: schema.WebApplication.name,
      description: schema.WebApplication.description,
      applicationCategory: schema.WebApplication.applicationCategory,
      offers: schema.WebApplication.offers,
      url: schema.WebApplication.url,
      provider: schema.WebApplication.provider,
    });
  }

  /* ---------------- HOW TO ---------------- */
  if (schema.HowTo) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: schema.HowTo.name,
      description: schema.HowTo.description,
      step: schema.HowTo.step,
    });
  }

  /* ---------------- FAQ PAGE ---------------- */
  // Only questions actually answered on the page; never placeholder answers.
  const answered = faqs
    .map((faq) => ({ q: plainText(faq.q), a: plainText(faq.a) }))
    .filter((faq) => faq.q && faq.a);
  if (answered.length) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: answered.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    });
  }

  // BreadcrumbList is emitted sitewide by components/seo/BreadcrumbJsonLd.

  return schemas;
};

export default function SchemaMarkup({ schema, faqs }: Props) {
  const schemas = buildSchemas(schema, faqs);

  if (!schemas.length) return null;

  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(s),
          }}
        />
      ))}
    </>
  );
}