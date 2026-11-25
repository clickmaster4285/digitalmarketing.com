// ERP dashboard origins allowed to frame /erp-preview and to message it.
// Plain CommonJS so next.config.js (headers) and the app share one parser.
// Not secret. Set ERP_ADMIN_ORIGINS (comma-separated) at build AND run time:
// next.config.js headers are computed when the app is built.

const DEFAULT_ERP_ADMIN_ORIGINS = "https://erp.clickmasters.pk";

/** @returns {string[]} normalized `scheme://host[:port]` origins */
function erpAdminOrigins(value = process.env.ERP_ADMIN_ORIGINS) {
  const raw = value && value.trim() ? value : DEFAULT_ERP_ADMIN_ORIGINS;
  const origins = [];
  for (const entry of raw.split(",")) {
    try {
      const url = new URL(entry.trim());
      if ((url.protocol === "https:" || url.protocol === "http:") && !origins.includes(url.origin)) {
        origins.push(url.origin);
      }
    } catch {
      // Ignore malformed entries.
    }
  }
  return origins;
}

module.exports = { erpAdminOrigins, DEFAULT_ERP_ADMIN_ORIGINS };
