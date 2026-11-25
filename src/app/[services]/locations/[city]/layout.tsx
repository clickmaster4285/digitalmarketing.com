import { ErpEditsData } from "@/components/cms/ErpEditsData";

// Adds no DOM wrapper: only the page's embedded ERP edits (if it has any).
export default async function ServiceCityLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ services: string; city: string }>;
}) {
  const { services, city } = await params;
  return (
    <>
      {children}
      <ErpEditsData path={`/${services}/locations/${city}`} />
    </>
  );
}
