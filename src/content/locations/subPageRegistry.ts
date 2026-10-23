// src/content/locations/subPageRegistry.ts
// Maps location sub-page slugs to their fully-custom content.
// The /{service}/locations/[city] route checks this registry first:
// a match renders the custom page (e.g. the Atlanta SEO page); otherwise it
// falls back to the generic city page built from locationPagesData.

import { atlantaSeoSubPage, type SubPageContent } from "./subpage-atlanta-seo";
import { baltimoreSeoSubPage } from "./subpage-baltimore-seo";
import { birminghamSeoSubPage } from "./subpage-birmingham-seo";
import { boiseSeoSubPage } from "./subpage-boise-seo";
import { bostonSeoSubPage } from "./subpage-boston-seo";
import { charlotteSeoSubPage } from "./subpage-charlotte-seo";
import { chattanoogaSeoSubPage } from "./subpage-chattanooga-seo";
import { chicagoSeoSubPage } from "./subpage-chicago-seo";
import { dallasSeoSubPage } from "./subpage-dallas-seo";
import { denverSeoSubPage } from "./subpage-denver-seo";
import { cincinnatiSeoSubPage } from "./subpage-cincinnati-seo";
import { greenvilleSeoSubPage } from "./subpage-greenville-seo";
import { huntsvilleSeoSubPage } from "./subpage-huntsville-seo";
import { indianapolisSeoSubPage } from "./subpage-indianapolis-seo";
import { louisvilleSeoSubPage } from "./subpage-louisville-seo";
import { knoxvilleSeoSubPage } from "./subpage-knoxville-seo";
import { memphisSeoSubPage } from "./subpage-memphis-seo";
import { oklahomaCitySeoSubPage } from "./subpage-oklahoma-city-seo";
import { tulsaSeoSubPage } from "./subpage-tulsa-seo";
import { wichitaSeoSubPage } from "./subpage-wichita-seo";
import { stLouisSeoSubPage } from "./subpage-st-louis-seo";
import { sanJoseSeoSubPage } from "./subpage-san-jose-seo";
import { pittsburghSeoSubPage } from "./subpage-pittsburgh-seo";
import { minneapolisSeoSubPage } from "./subpage-minneapolis-seo";
import { newOrleansSeoSubPage } from "./subpage-new-orleans-seo";
import { sacramentoSeoSubPage } from "./subpage-sacramento-seo";
import { portlandSeoSubPage } from "./subpage-portland-seo";
import { saltLakeCitySeoSubPage } from "./subpage-salt-lake-city-seo";
import { houstonSeoSubPage } from "./subpage-houston-seo";
import { jacksonvilleSeoSubPage } from "./subpage-jacksonville-seo";
import { kansasCitySeoSubPage } from "./subpage-kansas-city-seo";
import { lasVegasSeoSubPage } from "./subpage-las-vegas-seo";
import { losAngelesSeoSubPage } from "./subpage-los-angeles-seo";
import { miamiSeoSubPage } from "./subpage-miami-seo";
import { nashvilleSeoSubPage } from "./subpage-nashville-seo";
import { newYorkSeoSubPage } from "./subpage-new-york-seo";
import { raleighSeoSubPage } from "./subpage-raleigh-seo";

export const SUB_PAGE_REGISTRY: Record<string, SubPageContent> = {
  "seo-services-atlanta": atlantaSeoSubPage,
  "seo-services-baltimore": baltimoreSeoSubPage,
  "seo-services-birmingham": birminghamSeoSubPage,
  "seo-services-boise": boiseSeoSubPage,
  "seo-services-boston": bostonSeoSubPage,
  "seo-services-charlotte": charlotteSeoSubPage,
  "seo-services-chattanooga": chattanoogaSeoSubPage,
  "seo-services-chicago": chicagoSeoSubPage,
  "seo-services-dallas": dallasSeoSubPage,
  "seo-services-denver": denverSeoSubPage,
  "seo-services-cincinnati": cincinnatiSeoSubPage,
  "seo-services-greenville": greenvilleSeoSubPage,
  "seo-services-huntsville": huntsvilleSeoSubPage,
  "seo-services-indianapolis": indianapolisSeoSubPage,
  "seo-services-louisville": louisvilleSeoSubPage,
  "seo-services-knoxville": knoxvilleSeoSubPage,
  "seo-services-memphis": memphisSeoSubPage,
  "seo-services-oklahoma-city": oklahomaCitySeoSubPage,
  "seo-services-tulsa": tulsaSeoSubPage,
  "seo-services-wichita": wichitaSeoSubPage,
  "seo-services-st-louis": stLouisSeoSubPage,
  "seo-services-san-jose": sanJoseSeoSubPage,
  "seo-services-pittsburgh": pittsburghSeoSubPage,
  "seo-services-minneapolis": minneapolisSeoSubPage,
  "seo-services-new-orleans": newOrleansSeoSubPage,
  "seo-services-sacramento": sacramentoSeoSubPage,
  "seo-services-portland": portlandSeoSubPage,
  "seo-services-salt-lake-city": saltLakeCitySeoSubPage,
  "seo-services-houston": houstonSeoSubPage,
  "seo-services-jacksonville": jacksonvilleSeoSubPage,
  "seo-services-kansas-city": kansasCitySeoSubPage,
  "seo-services-las-vegas": lasVegasSeoSubPage,
  "seo-services-los-angeles": losAngelesSeoSubPage,
  "seo-services-miami": miamiSeoSubPage,
  "seo-services-nashville": nashvilleSeoSubPage,
  "seo-services-new-york": newYorkSeoSubPage,
    "seo-services-raleigh": raleighSeoSubPage,
};

export const getSubPageBySlug = (slug: string): SubPageContent | undefined =>
  SUB_PAGE_REGISTRY[slug];
