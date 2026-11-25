import { serializeJsonLd } from "@/lib/cms";
import { getEditedPages } from "@/lib/pageEdits.server";

/**
 * Blocking inline <head> script that stops the "old content flash" on pages
 * with ERP visual edits. Before the body is parsed it:
 *  1. checks location.pathname (normalized like normalizeEditPath) against
 *     the list of edited paths, filled in on the server;
 *  2. if edited, hides <main> with a CSS animation that ends by itself after
 *     1.5 s (fail-safe when JS or the request fails). A plain
 *     `opacity:0!important` would beat the animation and never end;
 *  3. starts the request for that path's edits right away, so it runs in
 *     parallel with the JS bundle (window.__erpEditsPromise, used once by
 *     ErpPageEdits).
 * Unedited paths: nothing happens (no style, no request). The list is also
 * kept on window.__erpEditedPaths as ErpPageEdits' synchronous hint for
 * hiding before paint on client-side navigation.
 *
 * The list does not depend on the current path, so pages stay static. It is
 * cached with the edited-pages tag that POST /api/erp-revalidate expires.
 */

export const ANTI_FLICKER_STYLE_ID = "erp-anti-flicker";

const SCRIPT = `(function(){try{
var list=__PATHS__;
window.__erpEditedPaths=list;
var path=location.pathname.trim();
if(path.charAt(0)!=="/")path="/"+path;
path=path.replace(/\\/+$/,"")||"/";
if(path.length>512||!/^[A-Za-z0-9/_\\-.~%]*$/.test(path)||path.indexOf("//")!==-1)return;
if(list.indexOf(path)===-1)return;
var root=document.documentElement;
if(root.getAttribute("data-anti-flicker")!=="off"){
var style=document.createElement("style");
style.id="${ANTI_FLICKER_STYLE_ID}";
style.textContent="main{animation:erp-anti-flicker 1.5s step-end}@keyframes erp-anti-flicker{0%,100%{opacity:0}}";
document.head.appendChild(style);
}
window.__erpEditsPromise={path:path,promise:fetch("/api/erp-edits?path="+encodeURIComponent(path),{cache:"no-store",headers:{Accept:"application/json"}}).then(function(r){return r.ok?r.json():null}).catch(function(){return null})};
}catch(e){}})();`;

export async function ErpAntiFlickerScript() {
  const pages = await getEditedPages().catch(() => []);
  if (pages.length === 0) return null;
  const paths = serializeJsonLd(pages.map((page) => page.path));
  return (
    <script
      id="erp-anti-flicker-script"
      dangerouslySetInnerHTML={{ __html: SCRIPT.replace("__PATHS__", () => paths) }}
    />
  );
}
