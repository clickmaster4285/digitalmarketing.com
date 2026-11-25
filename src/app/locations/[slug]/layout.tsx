import { ErpEditsData } from "@/components/cms/ErpEditsData";

// Adds no DOM wrapper: only the page's embedded ERP edits (if it has any).
export default async function LocationLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <>
      {children}
      <ErpEditsData path={`/locations/${slug}`} />
    </>
  );
}
