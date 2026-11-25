// Older webhook URL, kept so existing ERP configurations keep working.
// Same behaviour (and secret) as POST /api/erp-revalidate.
export { POST } from "../../erp-revalidate/route";

export const dynamic = "force-dynamic";
