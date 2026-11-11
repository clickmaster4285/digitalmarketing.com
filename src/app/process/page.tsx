import { Metadata } from "next";
import ProcessPage from "./ProcessClient";
import { applyEditedPageSeo } from "@/lib/pageEdits.server";

const metadata: Metadata = {
  title: "Our Digital Marketing Process - Proven Growth Strategy",
  description:
    "Discover our proven digital marketing processfrom strategy and planning to execution and reportingdesigned to help US businesses grow online.",
  alternates: {
    canonical: "https://clickmastersdigitalmarketing.com/process",
  },
  openGraph: {
    title: "Our Digital Marketing Process - Proven Growth Strategy",
    description:
      "Discover our proven digital marketing processfrom strategy and planning to execution and reportingdesigned to help US businesses grow online.",
    url: "https://clickmastersdigitalmarketing.com/process",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Digital Marketing Process - Proven Growth Strategy",
    description:
      "Discover our proven digital marketing processfrom strategy and planning to execution and reportingdesigned to help US businesses grow online.",
  },
};

export default function Page() {
  return <ProcessPage />;
}

export async function generateMetadata(): Promise<Metadata> {
  return applyEditedPageSeo("/process", metadata);
}
