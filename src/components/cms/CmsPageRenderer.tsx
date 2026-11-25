import React from "react";
import Image from "next/image";
import { cmsPageSchema, serializeJsonLd, type CmsPage, type CmsSection } from "../../lib/cms";
import { hasRichContent, looksLikeHtml, sanitizeRichHtml } from "../../lib/richText";
import { CmsRichText } from "./CmsRichText";

type Content = Record<string, unknown>;

function isContent(value: unknown): value is Content {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function text(value: unknown): string {
  if (typeof value !== "string" && typeof value !== "number") return "";
  return String(value);
}

function plainText(value: unknown): string {
  return text(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function safeLink(value: unknown): string | null {
  const href = text(value).trim();
  if (/^\/(?!\/)/.test(href)) return href;
  if (/^(mailto:|tel:)/i.test(href)) return href;
  try {
    const url = new URL(href);
    return ["http:", "https:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

function safeImage(value: unknown): string | null {
  const src = text(value).trim();
  if (/^\/(?!\/)/.test(src)) return src;
  try {
    const url = new URL(src);
    return url.protocol === "https:" || url.protocol === "http:"
      ? url.href
      : null;
  } catch {
    return null;
  }
}

function items(content: Content): Content[] {
  const validItems = Array.isArray(content.items)
    ? content.items.filter(
        (item): item is Content =>
          typeof item === "object" && item !== null && !Array.isArray(item),
      )
    : [];
  return typeof content.limit === "number"
    ? validItems.slice(0, Math.max(0, Math.min(20, content.limit)))
    : validItems;
}

function LinkButton({
  href,
  children,
}: {
  href: unknown;
  children: unknown;
}) {
  const safeHref = safeLink(href);
  const label = text(children);
  if (!safeHref || !label) return null;
  return (
    <a
      href={safeHref}
      className="inline-flex rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-[#FF2E86] hover:text-white"
      rel={safeHref.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {label}
    </a>
  );
}

function SectionHeading({ content }: { content: Content }) {
  const eyebrow = text(content.eyebrow);
  const heading = text(content.heading);
  const description = plainText(content.description);
  return (
    <>
      {eyebrow && (
        <p className="mb-4 text-xs uppercase tracking-[0.3em] opacity-60">
          {eyebrow}
        </p>
      )}
      {heading && (
        <h2 className="font-display text-3xl leading-tight tracking-tight md:text-5xl">
          {heading}
        </h2>
      )}
      {description && (
        <p className="mt-5 max-w-3xl text-base leading-relaxed opacity-70 md:text-lg">
          {description}
        </p>
      )}
    </>
  );
}

/** HTML fields go through the rich-text sanitizer; plain text keeps its line breaks. */
function RichOrPlain({ value, className }: { value: unknown; className: string }) {
  if (looksLikeHtml(value)) {
    return hasRichContent(sanitizeRichHtml(value)) ? (
      <CmsRichText html={value} className={className} />
    ) : null;
  }
  const plain = text(value).trim();
  return plain ? <p className={`whitespace-pre-line ${className}`}>{plain}</p> : null;
}

function formatDate(value: unknown): string {
  const raw = text(value);
  if (!raw) return "";
  const date = new Date(raw);
  return Number.isNaN(date.getTime())
    ? raw
    : date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

/** ERP `settings.background` hint -> the site's own section variants. */
function sectionTone(settings: Content): string {
  const background = text(settings.background);
  if (background === "dark" || background === "gradient") return "bg-[#0a0a0a] text-white";
  if (background === "muted") return "bg-muted";
  return "";
}

function CmsSectionView({ section, page }: { section: CmsSection; page: CmsPage }) {
  const { type, content, settings = {} } = section;
  const heading = text(content.heading);
  const body = plainText(content.body ?? content.bodyHtml ?? content.description);
  const image = safeImage(
    content.image ??
      content.backgroundImage ??
      (type === "hero" && page.pageType === "blog" ? page.featuredImage : undefined),
  );
  const primaryUrl = content.primaryUrl ?? content.primaryLink;
  const primaryLabel =
    content.primaryLabel ?? content.primaryButton ?? content.buttonLabel;
  const secondaryUrl = content.secondaryUrl ?? content.secondaryLink;
  const secondaryLabel =
    content.secondaryLabel ?? content.secondaryButton;
  const sectionClass =
    settings.width === "wide" || settings.width === "superWide" || settings.width === "full"
      ? "container max-w-7xl"
      : settings.width === "narrow"
        ? "container max-w-3xl"
        : "container max-w-5xl";
  const splitHero = type === "hero" && settings.layout === "split";

  if (["header", "navbar", "footer"].includes(type)) return null;

  if (type === "hero") {
    return (
      <section className="relative overflow-hidden bg-[#0a0a0a] py-28 text-white md:py-40">
        {image && !splitHero && (
          <Image
            src={image}
            alt={text(content.imageAlt)}
            width={1600}
            height={900}
            unoptimized
            className="absolute inset-0 h-full w-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
        )}
        <div
          className={`${sectionClass} relative ${
            splitHero ? "grid items-center gap-12 md:grid-cols-2" : ""
          }`}
        >
          <div>
          {text(content.eyebrow ?? content.subtitle) && (
            <p className="mb-6 text-xs uppercase tracking-[0.35em] opacity-60">
              {text(content.eyebrow ?? content.subtitle)}
            </p>
          )}
          {text(content.meta) && (
            <p className="mb-5 text-xs uppercase tracking-[0.3em] opacity-60">
              {text(content.meta)}
            </p>
          )}
          <h1 className="max-w-5xl font-display text-5xl font-bold leading-[0.98] tracking-tight md:text-8xl">
            {text(content.heading ?? content.title)}
          </h1>
          {body && (
            <p className="mt-8 max-w-3xl text-lg leading-relaxed opacity-75 md:text-xl">
              {body}
            </p>
          )}
          <div className="mt-9 flex flex-wrap gap-3">
            <LinkButton href={primaryUrl}>
              {primaryLabel || "Learn more"}
            </LinkButton>
            <LinkButton href={secondaryUrl}>
              {secondaryLabel}
            </LinkButton>
          </div>
          </div>
          {splitHero && image && (
            <Image
              src={image}
              alt={text(content.imageAlt)}
              width={1200}
              height={900}
              unoptimized
              className="max-h-[34rem] w-full rounded-3xl object-cover"
              referrerPolicy="no-referrer"
            />
          )}
        </div>
      </section>
    );
  }

  if (type === "text" || type === "richText" || type === "customContent") {
    const isArticle = page.pageType === "blog";
    return (
      <section className={`py-16 md:py-24 ${sectionTone(settings)}`}>
        <div className={isArticle && settings.width !== "wide" ? "container max-w-3xl" : sectionClass}>
          <SectionHeading content={content} />
          <RichOrPlain
            value={content.bodyHtml ?? content.body ?? content.html}
            className="mt-8 text-base leading-8 md:text-lg"
          />
        </div>
      </section>
    );
  }

  if (type === "image" || type === "imageText" || type === "author") {
    const bio = content.bioHtml ?? content.bodyHtml ?? content.body;
    const name = text(content.name);
    const role = text(content.role);
    return (
      <section className={`py-16 md:py-24 ${sectionTone(settings)}`}>
        <div className={`${sectionClass} grid items-center gap-10 ${image ? "md:grid-cols-2" : ""}`}>
          <div>
            <SectionHeading content={content} />
            <RichOrPlain value={bio} className="mt-6 leading-8" />
            {name && (
              <p className="mt-5 font-medium">{name}</p>
            )}
            {role && (
              <p className="text-sm opacity-60">{role}</p>
            )}
            <div className="mt-6">
              <LinkButton href={primaryUrl}>
                {primaryLabel || "Learn more"}
              </LinkButton>
            </div>
          </div>
          {image && (
            <figure>
              <Image
                src={image}
                alt={text(content.alt ?? content.name)}
                width={1200}
                height={900}
                unoptimized
                className="max-h-[34rem] w-full rounded-3xl object-cover"
                referrerPolicy="no-referrer"
              />
              {text(content.caption) && (
                <figcaption className="mt-3 text-sm opacity-60">
                  {text(content.caption)}
                </figcaption>
              )}
            </figure>
          )}
        </div>
      </section>
    );
  }

  if (type === "stats") {
    return (
      <section className="bg-[#0a0a0a] py-16 text-white md:py-24">
        <div className={sectionClass}>
          <SectionHeading content={content} />
          <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
            {items(content).map((item, index) => (
              <div key={text(item.id) || index} className="border-t border-white/20 pt-5">
                <p className="font-display text-4xl md:text-6xl">
                  {text(item.value)}
                </p>
                <p className="mt-2 text-sm opacity-65">{text(item.label)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (
    [
      "features",
      "services",
      "benefits",
      "process",
      "cards",
      "bento",
      "testimonials",
      "team",
      "timeline",
      "gallery",
      "logos",
      "pricing",
      "blogPosts",
      "relatedPosts",
    ].includes(type)
  ) {
    const list = items(content);
    const columns =
      type === "testimonials" || type === "team" || type === "blogPosts" || type === "relatedPosts"
        ? "md:grid-cols-3"
        : "md:grid-cols-2";
    if (list.length === 0 && (type === "blogPosts" || type === "relatedPosts")) return null;
    return (
      <section className={`py-16 md:py-24 ${sectionTone(settings)}`}>
        <div className={sectionClass}>
          <SectionHeading content={content} />
          <div className={`mt-10 grid gap-5 ${columns}`}>
            {list.map((item, index) => {
              const href = safeLink(item.url ?? item.buttonUrl);
              const itemImage = safeImage(item.image);
              const title = text(item.title ?? item.name ?? item.question);
              const value = text(item.value ?? item.price);
              const period = text(item.period);
              const description = plainText(
                item.description ??
                  item.body ??
                  item.quote ??
                  item.answer ??
                  item.excerpt ??
                  item.caption ??
                  item.bio,
              );
              const date = formatDate(item.date ?? item.publishedAt);
              const role = text(item.role);
              const featureList =
                typeof item.features === "string"
                  ? item.features.split(/\r?\n/).map((feature) => feature.trim()).filter(Boolean)
                  : [];
              return (
                <article
                  key={text(item.id) || index}
                  className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6 md:p-8"
                >
                  {itemImage && (
                    <Image
                      src={itemImage}
                      alt={text(item.alt ?? title)}
                      width={1200}
                      height={900}
                      unoptimized
                      className="mb-6 max-h-72 w-full rounded-xl object-cover"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  {title && (
                    <h3 className="font-display text-xl md:text-2xl">{title}</h3>
                  )}
                  {date && <p className="mt-2 text-xs uppercase tracking-wider opacity-55">{date}</p>}
                  {role && <p className="mt-2 text-sm opacity-60">{role}</p>}
                  {description && (
                    <p className="mt-3 whitespace-pre-line text-sm leading-7 opacity-70">
                      {description}
                    </p>
                  )}
                  {featureList.length > 0 && (
                    <ul className="mt-4 list-disc space-y-1 pl-5 text-sm opacity-70">
                      {featureList.map((feature, featureIndex) => (
                        <li key={`${featureIndex}-${feature}`}>{feature}</li>
                      ))}
                    </ul>
                  )}
                  {value && (
                    <p className="mt-4 text-2xl font-semibold">
                      {value}
                      {period && (
                        <span className="text-sm font-normal opacity-60">
                          {" "}{period}
                        </span>
                      )}
                    </p>
                  )}
                  {href && (
                    <a
                      href={href}
                      className="mt-5 inline-block text-sm underline underline-offset-4"
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {text(item.linkLabel ?? item.buttonLabel) || "Learn more"}
                    </a>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  if (type === "faq") {
    return (
      <section className={`py-16 md:py-24 ${sectionTone(settings)}`}>
        <div className={sectionClass}>
          <SectionHeading content={content} />
          <div className="mt-8 divide-y divide-foreground/10">
            {items(content).map((item, index) => (
              <details key={text(item.id) || index} className="py-5">
                <summary className="cursor-pointer font-medium">
                  {text(item.question ?? item.q)}
                </summary>
                <RichOrPlain value={item.answer ?? item.a} className="mt-3 leading-7 opacity-80" />
              </details>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (type === "video") {
    const videoUrl = safeLink(content.videoUrl);
    if (!videoUrl) return null;
    return (
      <section className="py-16 md:py-24">
        <div className={sectionClass}>
          <SectionHeading content={content} />
          <a
            href={videoUrl}
            rel="noopener noreferrer"
            className="mt-8 inline-flex rounded-full border border-foreground/20 px-6 py-3 underline underline-offset-4"
          >
            Watch video
          </a>
        </div>
      </section>
    );
  }

  if (type === "contact" || type === "cta") {
    return (
      <section className="bg-[#0a0a0a] py-16 text-white md:py-24">
        <div className={`${sectionClass} text-center`}>
          <SectionHeading content={content} />
          {text(content.email) && (
            <p className="mt-5">
              <a href={`mailto:${text(content.email)}`} className="underline">
                {text(content.email)}
              </a>
            </p>
          )}
          {text(content.phone) && (
            <p className="mt-2">
              <a
                href={`tel:${text(content.phone).replace(/[^\d+]/g, "")}`}
                className="underline"
              >
                {text(content.phone)}
              </a>
            </p>
          )}
          {text(content.address) && (
            <p className="mt-2 opacity-70">{text(content.address)}</p>
          )}
          <div className="mt-8 flex justify-center">
            <LinkButton href={primaryUrl ?? content.buttonUrl}>
              {primaryLabel || "Get in touch"}
            </LinkButton>
          </div>
        </div>
      </section>
    );
  }

  return null;
}

/** One ld+json script per `seo.schema` object, for this page only. */
export function CmsPageJsonLd({ page }: { page: CmsPage }) {
  return (
    <>
      {cmsPageSchema(page).map((entry, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(entry) }}
        />
      ))}
    </>
  );
}

export function CmsPageRenderer({ page }: { page: CmsPage }) {
  return (
    <>
    <CmsPageJsonLd page={page} />
    <main>
      {page.sections.map((section, index) => {
        const defaults = page.design?.sectionDefaults?.[section.type];
        const defaultSettings = isContent(defaults) ? defaults : {};
        const manualItems =
          section.content.mode === "manual" &&
          Array.isArray(section.content.items) &&
          section.content.items.length > 0;
        const content =
          ["blogPosts", "relatedPosts"].includes(section.type) &&
          !manualItems &&
          page.context?.posts
            ? {
                ...section.content,
                items: page.context.posts.slice(
                  0,
                  typeof section.content.limit === "number"
                    ? Math.max(0, Math.min(20, section.content.limit))
                    : 6,
                ),
              }
            : section.content;
        return (
          <CmsSectionView
            key={section.id || `${section.type}-${index}`}
            page={page}
            section={{
              ...section,
              content,
              settings: { ...defaultSettings, ...section.settings },
            }}
          />
        );
      })}
    </main>
    </>
  );
}
