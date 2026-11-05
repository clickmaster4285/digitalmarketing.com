// src/components/locations/LocationPage.tsx
import type { LocationData } from "@/content/locations/locationPagesData";
import LocationHero from "./Hero";
import LocationIntroduction from "./Introduction";
import LocationServices from "./Services";
import LocationChallenges from "./Challenges";
import LocationWhyChoose from "./WhyChoose";
import LocationProcess from "./Process";
import LocationIndustries from "./Industries";
import LocationTestimonials from "./Testimonials";
import LocationFAQ from "./FAQ";
import LocationCTA from "./CTA";
import LocationPackages from "./Packages";
import LocationTools from "./Tools";
import LocationStats from "./Stats";
import LocationCaseStudies from "./CaseStudy";
import LocationAreasServed from "./AreasServed";
import LocationReviews from "./Reviews";
import LocationAISearch from "./AiSearch";
import RegionalLocations from "./RegionalLocations";
import { getLocationPageHref } from "@/content/locations/serviceLocations";
import { SITE_URL, organizationRef } from "@/lib/organizationSchema";

interface LocationPageProps {
  data: LocationData;
}

const locationSchema = (data: LocationData) => {
  const url = `${SITE_URL}${getLocationPageHref(data)}`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Service",
      "@id": `${url}#service`,
      name: `Digital Marketing Services in ${data.name}, ${data.state}`,
      serviceType: "Digital Marketing",
      url,
      provider: organizationRef,
      areaServed: {
        "@type": "City",
        name: data.name,
        containedInPlace: { "@type": "State", name: data.state },
      },
    },
  ];
  const faqs = (data.faqs ?? []).filter((faq) => faq.question && faq.answer);
  if (faqs.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
};

export default function LocationPage({ data }: LocationPageProps) {
  return (
    <main className="bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locationSchema(data)) }}
      />
      {/* Grain texture overlay for the whole page */}
      <div className="grain fixed inset-0 pointer-events-none z-0" />

      <div className="relative z-10">
        <LocationHero
          heading={data.hero.heading}
          subheading={data.hero.subheading}
          ctaText={data.hero.ctaText}
          ctaLink={data.hero.ctaLink}
          locationName={data.name}
        />

        <LocationStats stats={data.stats} />

        <LocationIntroduction
          title={data.introduction.title}
          content={data.introduction.content}
        />

        <LocationServices
          title={data.servicesSection.title}
          description={data.servicesSection.description}
          items={data.servicesSection.items}
        />

        <RegionalLocations current={data} />

        {data.challengesSection && (
          <LocationChallenges
            title={data.challengesSection.title}
            description={data.challengesSection.description}
            items={data.challengesSection.items}
            locationName={data.name}
          />
        )}

        <LocationWhyChoose
          title={data.whyChooseSection.title}
          points={data.whyChooseSection.points}
        />

        <LocationProcess
          title={data.processSection.title}
          steps={data.processSection.steps}
        />

        <LocationIndustries
          title={data.industriesSection.title}
          description={data.industriesSection.description}
          items={data.industriesSection.items}
        />

         {data.caseStudies && (
          <LocationCaseStudies
            title={data.caseStudies.title}
            items={data.caseStudies.items}
          />
        )}

        {/* NEW: Areas Served */}
        {data.areasServed && (
          <LocationAreasServed
            title={data.areasServed.title}
            areas={data.areasServed.areas}
          />
        )}

        {/* NEW: Reviews Section */}
        {data.reviewsSection && (
          <LocationReviews
            title={data.reviewsSection.title}
            items={data.reviewsSection.items}
          />
        )}

        <LocationTestimonials items={data.testimonialsSection.items} />
        
         {data.aiSearchSection && (
          <LocationAISearch
            title={data.aiSearchSection.title}
            description={data.aiSearchSection.description}
            points={data.aiSearchSection.points}
          />
        )}

        {data.packagesSection && (
          <LocationPackages
            title={data.packagesSection.title}
            items={data.packagesSection.items}
            
          />
        )}

        {data.toolsSection && (
          <LocationTools
            title={data.toolsSection.title}
            tools={data.toolsSection.tools}
          />
        )}

        <LocationFAQ items={data.faqs} />

        <LocationCTA
          title={data.cta.title}
          description={data.cta.description}
          buttonText={data.cta.buttonText}
          buttonLink={data.cta.buttonLink}
          locationName={data.name}
        />
      </div>
    </main>
  );
}