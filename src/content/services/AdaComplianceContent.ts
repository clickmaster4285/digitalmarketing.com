export const AdaComplianceContent = {
  slug: "ada-compliance-web-accessibility",
  metadata: {
    url: "/ada-compliance-web-accessibility/",
    keyword: "ada compliance website",
    volume: "4,400/mo",
    cpc: "$38.60",
    formula: "FAB",
    author: "Amjad Khan",
  },
  hero: {
    tag: "[ Service ] ADA Compliance & Web Accessibility",
    title: "ADA Compliance & Web Accessibility Services",
    titleHighlight: "Protect Your Business, Include Every User",
    subtitle: "",
    description:
      "Expert ADA compliance & WCAG 2.1 AA accessibility  audit, remediation, ARIA, monitoring & VPAT. Legal protection + inclusive design. USA, UK & UAE. Free consultation.",
    stats: [
      { k: "4,600+", v: "ADA web lawsuits in 2023" },
      { k: "300%", v: "Increase since 2018" },
      { k: "$490B", v: "Disabled consumer purchasing power" },
      { k: "10+ yrs", v: "Accessibility depth" },
    ],
  },
  intro: {
    problem: [
      { text: "Understanding ADA Web Accessibility and WCAG 2.1", type: "normal" }
    ],
    solution:
      "THE LEGAL FRAMEWORK\nThe Americans with Disabilities Act (ADA), Title III, prohibits discrimination against people with disabilities in places of public accommodation. Courts have consistently held that websites constitute places of public accommodation  making website accessibility failures potential ADA violations. The UK's Equality Act 2010, the European Accessibility Act (effective 2025), and similar legislation in other jurisdictions create comparable accessibility requirements globally.\n\nThe technical standard that US courts reference when evaluating ADA website accessibility compliance is WCAG 2.1 (Web Content Accessibility Guidelines), published by the W3C. WCAG 2.1 defines accessibility requirements at three conformance levels: A (minimum), AA (the level US courts and most international regulations reference as the compliance standard), and AAA (enhanced). Most accessibility remediations and legal risk mitigation programs target WCAG 2.1 AA conformance.\n\nTHE FOUR WCAG PRINCIPLES\nWCAG 2.1 is organised around four principles that define what an accessible website must be:\n\nPerceivable: all users must be able to perceive the website's content  text alternatives for all non-text content (images, icons, charts), captions for video, sufficient colour contrast, and content that does not rely exclusively on sensory characteristics (colour, shape, sound) to convey meaning.\n\nOperable: all users must be able to operate the website's interface  full keyboard navigability (all functionality accessible without a mouse), sufficient time for time-sensitive content, no content that flashes at rates known to cause seizures, and clear navigation mechanisms that enable users to understand where they are and where they can go.\n\nUnderstandable: all users must be able to understand the website's content and interface  readable language, predictable behaviour, and input assistance that helps users avoid and correct mistakes when completing forms.\n\nRobust: the content must be robust enough to be interpreted by a wide variety of current and future assistive technologies  valid HTML, complete ARIA implementation, and the technical standards that ensure screen readers and other assistive technologies can parse and present the content correctly.",
    promise: "",
  },
  problem: {
    title: "Feature  Our ADA Compliance and Web Accessibility Services",
    titleHighlight: "",
    items: [],
    afterTitle: "",
    afterHighlight: "",
    afterItems: [],
  },
  services: [
    {
      n: "01",
      icon: "Search",
      tag: "Audit",
      title: "WCAG 2.1 AA Accessibility Audit",
      intro: "",
      blocks: [
        {
          h: "THE COMPREHENSIVE ACCESSIBILITY AUDIT",
          p: "We conduct accessibility audits that identify every WCAG 2.1 AA compliance gap on the website  not just the most common failures, but the complete set of issues across all four WCAG principles and all relevant success criteria. Accessibility audits that rely exclusively on automated scanning tools identify approximately 30% of accessibility failures  the other 70% require manual testing with assistive technologies (screen readers, keyboard-only navigation, voice control software) and the expert judgment to evaluate whether specific implementations meet the intent of the WCAG success criteria.",
        },
        {
          h: "AUDIT METHODOLOGY",
          p: "Our accessibility audit methodology combines: automated scanning (using axe, WAVE, and Lighthouse accessibility audit tools to identify the programmatically detectable accessibility failures efficiently), manual expert review (systematic review of all page types against WCAG 2.1 AA success criteria by an accessibility specialist with screen reader expertise), assistive technology testing (testing with NVDA and JAWS screen readers on Windows and VoiceOver on iOS/macOS to verify that the user experience with assistive technology is functional and intelligible), keyboard navigation testing (navigating all functionality using keyboard only  Tab, Shift+Tab, Enter, Space, arrow keys  to verify that every interactive element is reachable and operable), and colour contrast analysis (measuring foreground and background colour combinations against WCAG 2.1 AA contrast ratios  4.5:1 for normal text, 3:1 for large text and UI components).",
        },
        {
          h: "AUDIT DELIVERABLE",
          p: "The accessibility audit deliverable is a prioritised issue report: every identified accessibility failure listed with the specific WCAG success criterion it violates, the affected page and element, the specific impact on users with disabilities, the remediation required, and a priority level (critical, high, medium, low) based on the failure's legal exposure and impact on users with disabilities. The report is formatted as both a technical remediation specification (for the development team implementing fixes) and an executive summary (for the business decision-makers assessing the legal risk and remediation investment required).",
        },
      ],
    },
    {
      n: "02",
      icon: "Wrench",
      tag: "Remediation",
      title: "Accessibility Remediation Implementation",
      intro: "",
      blocks: [
        {
          h: "WCAG 2.1 AA REMEDIATION",
          p: "We implement the accessibility remediations identified in the audit: the technical changes to the website's HTML, CSS, and JavaScript that close the accessibility gaps and bring the website to WCAG 2.1 AA conformance. Accessibility remediation is a development discipline  it requires understanding of HTML semantics, ARIA (Accessible Rich Internet Applications) specification, and the specific patterns that assistive technologies use to interpret and present web content.",
        },
        {
          h: "KEY REMEDIATION CATEGORIES",
          p: "Image alternative text: every image on the website must have an appropriate text alternative  either a descriptive alt attribute for informative images, an empty alt attribute for decorative images (which screen readers should ignore), or an ARIA label for complex images (charts, graphs, infographics) that require descriptive captions rather than short alt text.\n\nKeyboard accessibility: all interactive elements (links, buttons, form controls, modal dialogs, dropdown menus, carousels, tabs, and custom widgets) must be fully operable using keyboard alone, with visible focus indicators that show keyboard users which element is currently focused, and logical focus order that follows the visual sequence of the content.\n\nForm accessibility: all form fields must have explicit labels (not just placeholder text, which disappears when the user begins typing and is not reliably interpreted by screen readers), error messages that identify specifically which field contains an error and what the correct input format is, and autocomplete attributes that enable autofill for common field types.\n\nColour contrast: all text must meet WCAG 2.1 AA contrast ratios against its background  4.5:1 for normal text (under 18pt or 14pt bold), 3:1 for large text (18pt or 14pt bold) and for UI component borders and focus indicators.\n\nSemantic HTML structure: headings (h1-h6) must create a logical, hierarchical document outline. Landmark roles (header, nav, main, aside, footer) must be present and correctly labelled. Lists must use list markup. Tables must use appropriate headers and scope attributes.\n\nVideo captions and audio description: all video content must have accurate closed captions. Videos with meaningful visual information not communicated in the audio track must have audio descriptions.",
        },
      ],
    },
    {
      n: "03",
      icon: "Code",
      tag: "ARIA",
      title: "ARIA Implementation and Screen Reader Optimisation",
      intro: "",
      blocks: [
        {
          h: "ARIA  ACCESSIBLE RICH INTERNET APPLICATIONS",
          p: "ARIA is the specification that extends HTML's semantic capabilities to cover interactive widgets and dynamic content patterns that native HTML does not provide semantics for  modal dialogs, autocomplete inputs, tab panels, accordions, carousels, live regions, and the range of dynamic UI patterns that modern web applications use. Incorrect or incomplete ARIA implementation is one of the most common accessibility failures in complex websites and web applications.\n\nWe implement ARIA correctly: adding role attributes that identify the type of widget for screen readers, state attributes (aria-expanded, aria-checked, aria-selected, aria-disabled) that communicate the current state of interactive elements, property attributes (aria-label, aria-labelledby, aria-describedby) that provide accessible names and descriptions for elements that visual presentation alone does not adequately label, and live region attributes (aria-live, aria-atomic, aria-relevant) that notify screen reader users when page content changes dynamically without a page reload.",
        },
        {
          h: "SCREEN READER USER EXPERIENCE REVIEW",
          p: "Beyond technical ARIA compliance, we review the screen reader user experience holistically: navigating the website as a screen reader user would  using headings to skim structure, using links to navigate, using landmarks to jump between page sections  and identifying experience failures that technically compliant implementations sometimes create. A website can be technically WCAG 2.1 AA conformant while still providing a poor user experience for screen reader users. We test and optimise for the experience, not just the compliance standard.",
        },
      ],
    },
    {
      n: "04",
      icon: "FileText",
      tag: "Documentation",
      title: "Accessibility Statement and Documentation",
      intro: "",
      blocks: [
        {
          h: "THE ACCESSIBILITY STATEMENT",
          p: "An accessibility statement is a published page on the website that: declares the organisation's commitment to web accessibility, identifies the accessibility standard the website aims to conform to (WCAG 2.1 AA), describes the current conformance status (fully conformant, partially conformant, or non-conformant), lists known accessibility limitations and planned remediation timelines, provides contact information for users who encounter accessibility barriers, and describes the alternative access mechanisms available to users who cannot access specific content.\n\nAn accessibility statement is a legal risk mitigation tool as well as a user-facing resource: it demonstrates that the organisation is aware of its accessibility obligations, has actively assessed its website's conformance, and has provided a mechanism for users to report accessibility barriers. The presence of a well-maintained accessibility statement is a factor that courts and regulatory bodies consider when assessing whether an organisation has made good-faith efforts toward accessibility compliance.\n\nWe draft and publish accessibility statements that are accurate, specific, and appropriately framed for both user-facing communication and legal risk management.",
        },
        {
          h: "VPAT AND CONFORMANCE REPORTING",
          p: "For businesses that sell software, SaaS products, or services to US federal government agencies, educational institutions, or enterprises with procurement accessibility requirements, a Voluntary Product Accessibility Template (VPAT)  a standardised conformance report format that documents how the product meets Section 508 and WCAG 2.1 requirements  is typically required. We produce VPATs and ACR (Accessibility Conformance Reports) for clients with procurement-driven accessibility documentation requirements.",
        },
      ],
    },
    {
      n: "05",
      icon: "Activity",
      tag: "Monitoring",
      title: "Ongoing Accessibility Monitoring",
      intro: "",
      blocks: [
        {
          h: "ACCESSIBILITY REGRESSION PREVENTION",
          p: "A website that achieves WCAG 2.1 AA conformance at a point in time will not maintain that conformance without ongoing monitoring. Every content update, design change, new feature, and plugin addition is a potential source of accessibility regression  new images added without alt text, new form fields added without labels, new interactive components added without keyboard accessibility. Accessibility is a maintenance discipline, not a one-time achievement.\n\nWe implement ongoing accessibility monitoring: automated scanning configured to run against the live website on a weekly or monthly schedule (identifying the programmatically detectable failures introduced by content changes), integration with the website's deployment pipeline (running accessibility scans as part of the release process for websites with active development), and periodic manual review cycles (reassessing the manual and assistive technology test cases that automated scanning cannot cover).",
        },
        {
          h: "TEAM TRAINING AND PROCESS INTEGRATION",
          p: "Sustained accessibility requires that the teams producing website content  content writers, designers, developers, and marketing managers  understand the accessibility requirements relevant to their specific role. We provide accessibility training for website teams: content editor training (alt text writing, heading structure, link text, document accessibility), designer training (colour contrast, focus indicator design, accessible component patterns), and developer training (semantic HTML, ARIA patterns, keyboard accessibility testing).",
        },
      ],
    },
    {
      n: "06",
      icon: "AlertTriangle",
      tag: "Overlays",
      title: "Accessibility Overlay Assessment",
      intro: "",
      blocks: [
        {
          h: "A NOTE ON ACCESSIBILITY OVERLAYS",
          p: "Accessibility overlay products  JavaScript widgets that claim to fix a website's accessibility problems by injecting code that attempts to modify the website's accessibility characteristics at runtime  have become a significant source of confusion in the web accessibility market. They are heavily marketed with claims of instant WCAG compliance, and they are increasingly the subject of ADA lawsuits from disabled users who find that the overlays interfere with their assistive technology rather than improving accessibility.\n\nOur assessment of accessibility overlays: they do not provide WCAG 2.1 AA conformance. The National Federation of the Blind, the American Council of the Blind, and the World Blind Union have published statements against accessibility overlays. Multiple federal court cases have held that the use of an overlay does not satisfy ADA accessibility obligations. Overlays add JavaScript overhead to every page load, can conflict with screen readers, and do not address the structural accessibility issues in the underlying HTML that genuine remediation requires.\n\nWe do not recommend accessibility overlays as a compliance solution. We provide genuine remediation  the actual changes to the website's HTML, CSS, and JavaScript that produce real accessibility improvements  not overlay products that create the appearance of compliance while perpetuating the underlying failures.",
        },
      ],
    },
  ],
  cases: [
    {
      tag: "Retail Chain · ADA Litigation Defence",
      metric: "$18K",
      sub: "remediation cost vs $35-60K litigation",
      title: "Regional retail chain  ADA audit and remediation avoids serial litigation exposure.",
      body: "A regional retail chain with 14 locations and a WooCommerce e-commerce website received a demand letter from a law firm representing a plaintiff with a visual impairment, alleging specific WCAG 2.1 AA failures on their website  missing image alt text, inadequate colour contrast, and inaccessible form elements. The demand letter gave the business 30 days to respond before filing a federal ADA complaint.\n\nOur engagement: emergency accessibility audit conducted within 5 business days of receiving the demand letter, identifying all WCAG 2.1 AA failures across the website (88 issues across 34 page templates), prioritised remediation of the 22 critical issues most directly relevant to the plaintiff's stated complaint within 14 days, full WCAG 2.1 AA remediation over the following 6 weeks, accessibility statement publication, and documentation package supporting the legal team's response to the demand letter.",
      result: "The demand letter was resolved without litigation. The legal team's response, supported by the audit documentation and the evidence of active remediation, led the plaintiff's attorneys to decline to file the federal complaint. The total cost of the accessibility audit, remediation, and legal response preparation was approximately $18,000  compared to the estimated $35,000-$60,000 that litigation through to settlement would have cost. The website now maintains WCAG 2.1 AA conformance with quarterly monitoring.",
    },
    {
      tag: "Financial Services · Federal Contract",
      metric: "$2.8M",
      sub: "contract enabled by VPAT compliance",
      title: "Financial services firm  accessibility compliance enables federal government contract.",
      body: "A financial services technology firm had developed a reporting platform they were pitching to a US federal agency. The procurement process required VPAT documentation demonstrating Section 508 compliance before the contract could be awarded. The platform had never been assessed for accessibility and had significant accessibility failures that would have disqualified it from the procurement.\n\nOur engagement: comprehensive accessibility audit of the platform, prioritised remediation roadmap, accessibility engineering over 10 weeks to bring the platform to WCAG 2.1 AA and Section 508 conformance, and production of the VPAT documentation required for the federal procurement process.",
      result: "The platform achieved WCAG 2.1 AA and Section 508 conformance and the VPAT was accepted by the federal agency procurement team. The federal contract  which the accessibility failures would have made impossible to win  was awarded at a value of $2.8M. The accessibility engineering investment of approximately $45,000 enabled a $2.8M contract that required it.",
    },
    {
      tag: "SaaS Platform · Conversion Improvement",
      metric: "183%",
      sub: "sign-up completion increase for screen reader users",
      title: "SaaS platform  accessibility remediation increases conversion among users with disabilities by 180%.",
      body: "A B2B SaaS project management platform conducted an accessibility audit as part of a broader UX improvement initiative. The audit identified that users with visual impairments were encountering 34 separate accessibility barriers in the sign-up and onboarding flow  barriers that were causing them to abandon the sign-up process at significantly higher rates than sighted users.\n\nOur engagement: accessibility audit of the sign-up and onboarding flow (and the full platform), remediation of all critical and high-priority issues in the sign-up and onboarding flow, screen reader user testing with 6 representative participants, and a second round of remediation addressing the issues identified in the user testing.",
      result: "Sign-up completion rate for users accessing the platform with a screen reader improved from 12% to 34%  a 183% improvement. The conversion improvement among the screen reader user segment represented an additional 8-12 trial sign-ups per month from a user group that had previously been essentially excluded from the platform's customer funnel. The platform's accessibility statement was cited by one enterprise procurement team as a factor in their vendor selection.",
    },
  ],
  why: [
    {
      icon: "Shield",
      h: "Genuine Remediation, Not Overlays",
      p: "We provide genuine accessibility remediation  the actual changes to the website's HTML, CSS, and JavaScript that produce real accessibility improvements and real legal risk reduction. We do not sell overlay products that misrepresent accessibility compliance.",
    },
    {
      icon: "Gavel",
      h: "Combined Legal and Technical Expertise",
      p: "Web accessibility requires understanding both the WCAG technical standards and the legal framework in which they operate. Our team brings both: the technical accessibility expertise to conduct rigorous audits and implement correct remediations, and the familiarity with the ADA web accessibility litigation landscape that enables us to prioritise remediations for legal risk reduction as well as technical conformance.",
    },
    {
      icon: "FileText",
      h: "Documentation That Supports Legal Defence",
      p: "The accessibility documentation we produce  audit reports, remediation records, accessibility statements, and VPATs  is specifically structured to support legal defence in the event of an accessibility complaint or lawsuit. Evidence of good-faith accessibility effort, documented systematically and accurately, is a critical component of any ADA web accessibility legal defence.",
    },
    {
      icon: "RefreshCw",
      h: "Ongoing Partnership, Not One-Time Projects",
      p: "Web accessibility is a maintenance discipline. A website that achieves conformance at a point in time requires ongoing monitoring and maintenance to sustain that conformance as the website evolves. We provide the ongoing monitoring, periodic review, and team training that make accessibility conformance sustainable rather than a one-time achievement that regresses over time.",
    },
  ],
  faqs: [
    {
      q: "Does the ADA apply to all websites, or only certain types of businesses?",
      a: "Courts have held that Title III of the ADA applies to the websites of businesses that are 'places of public accommodation'  a category that includes retail businesses, service businesses, financial services, healthcare, lodging, dining, and entertainment. In practice, courts have applied the ADA to websites of businesses of all sizes, across virtually all industries that serve the general public. The precise legal boundaries of ADA applicability to websites are still being defined through ongoing litigation, but the safest practical approach is to treat WCAG 2.1 AA compliance as the standard applicable to any business website that serves US customers.",
    },
    {
      q: "What are the most common ADA web accessibility failures?",
      a: "The most commonly identified failures in web accessibility audits are: missing or inadequate image alt text (informative images without text alternatives that screen readers can convey), insufficient colour contrast (text that does not meet the 4.5:1 contrast ratio against its background), missing form labels (form inputs without properly associated label elements), keyboard inaccessibility (interactive elements that cannot be reached or operated using keyboard alone), missing or incorrect focus indicators (keyboard users unable to determine which element is currently focused), and incorrect or missing heading structure (page content without semantic heading hierarchy that enables navigation by headings).",
    },
    {
      q: "How much does an accessibility audit and remediation cost?",
      a: "Costs depend on the size and complexity of the website. An accessibility audit for a standard business website (20-50 pages, standard content types) typically costs $1,500 to $4,000. A comprehensive audit of a complex web application or e-commerce platform with many interactive components typically costs $4,000 to $10,000. Remediation costs depend on the number and severity of issues identified  light remediation (relatively few issues, standard HTML and CMS) typically costs $3,000 to $8,000; comprehensive remediation of a website with significant accessibility debt typically costs $8,000 to $25,000. We provide a specific cost estimate after completing the audit.",
    },
    {
      q: "How long does accessibility remediation take?",
      a: "An accessibility audit for a standard website takes 1-2 weeks. Remediation timelines depend on the volume and complexity of issues identified. Light remediation (standard HTML changes, image alt text, colour contrast fixes) typically takes 2-4 weeks. Comprehensive remediation of a website with complex interactive components (JavaScript widgets, custom form implementations, dynamic content) typically takes 6-12 weeks. Emergency response engagements  where a demand letter has been received and rapid remediation is required  can complete critical issue remediation within 2-3 weeks.",
    },
    {
      q: "What is the difference between WCAG 2.1 AA and ADA compliance?",
      a: "The ADA is the US federal law that prohibits discrimination against people with disabilities. WCAG 2.1 is the technical standard published by the W3C that defines what an accessible website looks like. US courts reference WCAG 2.1 AA as the technical standard for evaluating ADA web accessibility compliance  but the ADA itself does not specify WCAG 2.1 as a formal regulatory standard. The Department of Justice has issued guidance supporting WCAG 2.1 AA as the appropriate standard, and in 2024 the DOJ published a final rule under Title II of the ADA requiring state and local government websites to meet WCAG 2.1 AA. WCAG 2.1 AA conformance is the most widely recognised and most legally defensible accessibility standard for websites.",
    },
    {
      q: "What is a VPAT and do I need one?",
      a: "A VPAT (Voluntary Product Accessibility Template) is a standardised document format used to report how a software product or digital service conforms to Section 508 of the Rehabilitation Act (the federal accessibility standard for government procurement) and WCAG 2.1. You need a VPAT if you sell software, SaaS, or digital services to: US federal government agencies (for whom Section 508 compliance is a procurement requirement), state and local government agencies (many of which have accessibility procurement requirements), educational institutions (which are subject to Section 504 of the Rehabilitation Act), or large enterprises with formal digital accessibility procurement policies. The completed VPAT is called an ACR (Accessibility Conformance Report).",
    },
    {
      q: "Can I be sued for ADA web accessibility even if my website is only partially inaccessible?",
      a: "Yes  ADA web accessibility lawsuits do not require that the website be completely inaccessible. A single accessibility barrier that prevents or significantly limits a user with a disability from accessing specific content or functionality is sufficient to form the basis of an ADA complaint. Serial accessibility litigation is typically based on specific, targeted failures  a screen reader user who cannot complete the checkout process, a keyboard-only user who cannot navigate the contact form  rather than wholesale inaccessibility. Even websites that are generally functional may have specific failure points that create legal exposure.",
    },
    {
      q: "Do accessibility improvements affect my website's SEO?",
      a: "Yes  positively. Many WCAG 2.1 AA compliance improvements directly benefit SEO: image alt text provides Google with text context for images it cannot visually interpret, semantic heading structure helps Google understand document hierarchy and content relevance, descriptive link text provides anchor text context, and accessible HTML is generally well-structured HTML that search engines can parse effectively. We document the SEO benefits of accessibility improvements alongside the compliance benefits in our remediation reports.",
    },
  ],
  cta: {
    title: "Ready to Protect Your Business and Include Every User?",
    description:
      "Web accessibility is not a compliance checkbox. It is the commitment to ensuring that every person who visits your website  regardless of how they access it, what device they use, or what assistive technology they rely on  can access, understand, and use what you have built.\n\nThat commitment protects your business from legal exposure. It expands your market to include users competitors have excluded. And it builds the reputation for inclusion that is increasingly a differentiator with customers, partners, and employees who care about the organisations they work with.",
    contactLink: "https://clickmastersdigitalmarketing.com/contact",
    whatsappLink: "https://wa.me/",
    softwareLink: "https://clickmastersdigitalmarketing.com/",
  },
  footer: {
    company: "Clickmasters Digital Marketing",
    url: "https://clickmastersdigitalmarketing.com",
    email: "marketing@clickmastersdigitalmarketing.com",
    regions: "USA, UK, UAE, Pakistan, Canada, Australia",
    author: "Amjad Khan  CEO, Clickmasters Digital Marketing | Web accessibility specialist | 10+ years",
  },schema: {
  Service: {
    serviceType: "ADA Compliance & Web Accessibility",
    provider: {
      name: "Clickmasters Digital Marketing",
      url: "https://clickmastersdigitalmarketing.com",
      logo: "https://clickmastersdigitalmarketing.com/logo.png"
    },
    areaServed: ["US", "UK", "UAE", "PK"]
  },

  FAQPage: {
    items: [
      "Does the ADA apply to all websites, or only certain types of businesses?",
      "What are the most common ADA web accessibility failures?",
      "How much does an accessibility audit and remediation cost?",
      "How long does accessibility remediation take?",
      "What is the difference between WCAG 2.1 AA and ADA compliance?",
      "What is a VPAT and do I need one?",
      "Can I be sued for ADA web accessibility even if my website is only partially inaccessible?",
      "Do accessibility improvements affect my website's SEO?"
    ]
  },

  Organization: {
    name: "Clickmasters Digital Marketing",
    url: "https://clickmastersdigitalmarketing.com",
    logo: "https://clickmastersdigitalmarketing.com/logo.png",
    sameAs: [
      "https://www.facebook.com/clickmasters",
      "https://www.instagram.com/clickmasters",
      "https://www.linkedin.com/company/clickmasters"
    ]
  },

  BreadcrumbList: {
    items: [
      {
        position: 1,
        name: "Home",
        url: "https://clickmastersdigitalmarketing.com"
      },
      {
        position: 2,
        name: "Web Design & Development",
        url: "https://clickmastersdigitalmarketing.com/web-design-development/"
      },
      {
        position: 3,
        name: "ADA Compliance & Web Accessibility",
        url: "https://clickmastersdigitalmarketing.com/ada-compliance-web-accessibility/"
      }
    ]
  }
}
};