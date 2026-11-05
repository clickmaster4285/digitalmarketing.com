import { Metadata } from "next";
import AboutPageClient from "./AboutClient";
import { AboutPageContent } from "@/content/AboutPageContent";

export const metadata: Metadata = {
  title: "About Us - Clickmasters Digital Marketing Agency",
  description:
    "Meet the Clickmasters team and learn how our SEO, PPC, and data-driven marketing strategies help US businesses grow.",
  alternates: {
    canonical: "https://clickmastersdigitalmarketing.com/about",
  },
  openGraph: {
    title: "About Us - Clickmasters Digital Marketing Agency",
    description:
      "Meet the Clickmasters team and learn how our SEO, PPC, and data-driven marketing strategies help US businesses grow.",
    url: "https://clickmastersdigitalmarketing.com/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - Clickmasters Digital Marketing Agency",
    description:
      "Meet the Clickmasters team and learn how our SEO, PPC, and data-driven marketing strategies help US businesses grow.",
  },
};

export default function Page() {
  return <AboutPageClient />;
}