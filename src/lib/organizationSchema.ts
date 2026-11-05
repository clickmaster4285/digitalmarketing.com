// Business facts used in structured data. Keep in sync with the footer and
// contact page — these are the only verified details published on the site.
export const SITE_URL = "https://clickmastersdigitalmarketing.com";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const BUSINESS = {
  name: "Clickmasters Digital Marketing",
  logo: `${SITE_URL}/logo.png`,
  email: "sales@clickmastersdigitalmarketing.com",
  telephone: "+1-325-202-4074",
  // TODO(CDM-08): add the verified street address (streetAddress,
  // addressLocality, addressRegion, postalCode) once confirmed by the owner.
  address: {
    "@type": "PostalAddress",
    addressCountry: "US",
  },
  sameAs: [
    "https://www.linkedin.com/company/clickmasters-digital-marketing-agency-us/",
    "https://www.facebook.com/clickmastersdigitalmarketingagencyus",
    "https://www.instagram.com/clickmastersus/",
    "https://techbehemoths.com/company/clickmasters-digital-marketing-agency-us",
  ],
} as const;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: BUSINESS.name,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: BUSINESS.logo,
    width: 599,
    height: 125,
  },
  email: BUSINESS.email,
  telephone: BUSINESS.telephone,
  address: BUSINESS.address,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    areaServed: "US",
    availableLanguage: ["English"],
  },
  sameAs: BUSINESS.sameAs,
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: BUSINESS.name,
  url: SITE_URL,
  publisher: { "@id": ORGANIZATION_ID },
  inLanguage: "en-US",
};

/** Reference to the sitewide Organization for use as provider/publisher. */
export const organizationRef = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: BUSINESS.name,
  url: SITE_URL,
};
