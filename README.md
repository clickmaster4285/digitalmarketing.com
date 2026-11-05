# ClickMasters Digital Marketing Website

## CMS pages

The site can render published pages from the ERP/CMS public API without adding
a route file for each page. Configure these server-side environment variables:

```env
CMS_API_URL=https://your-erp-host.example
CMS_SITE_DOMAIN=clickmastersdigitalmarketing.com
```

`CMS_API_URL` must be reachable from the website server. The integration makes
unauthenticated GET requests to:

```text
{CMS_API_URL}/public/{URL-encoded-domain}/pages/{slug}
```

For example, `/about` requests
`/public/clickmastersdigitalmarketing.com/pages/about`; a nested path such as
`/abc/xyz` requests `.../pages/abc/xyz`. The public endpoint must return
published pages and use HTTP 404 for missing or unpublished pages. A successful
response must contain `data.page` with `title`, `slug`, `sections`, and optional
`seo`. Each section needs a string `type` and object `content`; sections are
rendered in `order`. Unsupported section types are ignored.

Pages are revalidated after five minutes. Existing code-defined service,
location, and product pages take precedence; a CMS page is checked only when
the corresponding dynamic route has no code-defined page. The homepage and
other static routes remain unchanged.

CMS content is rendered as React text rather than raw HTML. Links and image
URLs are restricted to safe HTTP(S) or local paths, and CMS scripts/HTML are
never executed or injected.
