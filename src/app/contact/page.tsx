import { Metadata } from "next";
import React from "react";
import ContactClient from "./ContactClient";
import { applyEditedPageSeo } from "@/lib/pageEdits.server";

const metadata: Metadata = {
  title: "Get in Touch with Our Digital Marketing Agency  Contact Us",
  description:
    "Contact our digital marketing agency today to discuss your business goals. Get a free consultation and start growing your online presence with us. ",
  keywords: [
    "contact us",
    "contact",
    "support",
    "business inquiry",
    "free consultation",
  ],
    alternates: {
    canonical: "https://clickmastersdigitalmarketing.com/contact",
  },
  openGraph: {
    title: "Contact Us | Your Company Name",
    description:
      "Reach out to our team for project inquiries, support, or a free consultation.",
    url: "https://yourdomain.com/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Your Company Name",
    description:
      "Reach out to our team for project inquiries, support, or a free consultation.",
  },
};

export default function Page() {
  return <ContactClient />;
}

export async function generateMetadata(): Promise<Metadata> {
  return applyEditedPageSeo("/contact", metadata);
}
