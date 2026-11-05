import type { Metadata } from "next";
import LandingPage from "@/components/site/LandingPage";

export const metadata: Metadata = {
  title: "Digital Marketing Agency in the US | ClickMasters",
  description:
    "Grow leads and revenue with Clickmasters' SEO, PPC, web design, and performance marketing services. Request a free consultation today.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return <LandingPage />;
}