import { Metadata } from "next";
import PricingPage from "./PricingClient";
import { applyEditedPageSeo } from "@/lib/pageEdits.server";

const metadata: Metadata = {
  title: "Digital Marketing Plans for US Businesses - Our Pricing",
  description:
    "Compare our digital marketing packages and pricing built for US businesses. Affordable, transparent plans covering SEO, PPC, and social media growth.",
  alternates: {
    canonical: "https://clickmastersdigitalmarketing.com/pricing",
  },
  openGraph: {
    title: "Digital Marketing Plans for US Businesses - Our Pricing",
    description:
      "Compare our digital marketing packages and pricing built for US businesses. Affordable, transparent plans covering SEO, PPC, and social media growth.",
    url: "https://clickmastersdigitalmarketing.com/pricing",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing Plans for US Businesses - Our Pricing",
    description:
      "Compare our digital marketing packages and pricing built for US businesses. Affordable, transparent plans covering SEO, PPC, and social media growth.",
  },
};

export default function Page() {
  return <PricingPage />;
}

export async function generateMetadata(): Promise<Metadata> {
  return applyEditedPageSeo("/pricing", metadata);
}
