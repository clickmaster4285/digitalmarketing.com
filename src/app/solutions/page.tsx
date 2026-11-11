import { Metadata } from "next";
import SolutionsPage from "./SolutionClient";
import { applyEditedPageSeo } from "@/lib/pageEdits.server";

const metadata: Metadata = {
  title: "Digital Marketing Solutions for US Businesses | Get Results",
  description:
    "Looking for effective digital marketing solutions? We help US businesses boost visibility, traffic, and sales through SEO, PPC, and social media marketing.",
  alternates: {
    canonical:
      "https://clickmastersdigitalmarketing.com/solutions",
  },
  openGraph: {
    title: "Digital Marketing Solutions for US Businesses | Get Results",
    description:
      "Looking for effective digital marketing solutions? We help US businesses boost visibility, traffic, and sales through SEO, PPC, and social media marketing.",
    url: "https://clickmastersdigitalmarketing.com/solutions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing Solutions for US Businesses | Get Results",
    description:
      "Looking for effective digital marketing solutions? We help US businesses boost visibility, traffic, and sales through SEO, PPC, and social media marketing.",
  },
};

export default function Page() {
  return <SolutionsPage />;
}

export async function generateMetadata(): Promise<Metadata> {
  return applyEditedPageSeo("/solutions", metadata);
}
