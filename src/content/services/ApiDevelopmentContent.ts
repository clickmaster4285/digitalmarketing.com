export const ApiDevelopmentContent = {
  slug: "api-development-integration",
  metadata: {
    url: "/api-development-integration/",
    keyword: "api development services",
    volume: "6,600/mo",
    cpc: "$38.80",
    formula: "BAB",
    author: "Amjad Khan",
  },
  hero: {
    tag: "[ Service ] API Development & Integration",
    title: "API Development & Integration Services",
    titleHighlight: "Connect Your Systems. Unlock Your Data. Automate Your Operations.",
    subtitle: "",
    description:
      "Expert API development & integration  REST, GraphQL, webhooks, event-driven, legacy systems, Salesforce/Shopify/ERP. USA, UK & UAE. Free consultation.",
    stats: [
      { k: "14 hrs", v: "Daily manual data entry eliminated" },
      { k: "$1.8M", v: "Partner-led revenue enabled" },
      { k: "99.6%", v: "Inventory accuracy achieved" },
      { k: "10+ yrs", v: "Integration depth" },
    ],
  },
  intro: {
    problem: [
      { text: "Why Siloed Systems Are an Operational Tax", type: "normal" }
    ],
    solution:
      "THE MANUAL DATA TRANSFER COST\nEvery time an employee manually copies data from one system to another  exporting from the CRM, reformatting for the accounting system, importing to the ERP  they are paying an operational tax that software integration would eliminate. The cost is not just the time spent on the transfer itself. It is the error rate (manual data entry produces errors at a rate of 1-4% per field), the latency (data is often hours or days behind reality in manually-reconciled systems), and the opportunity cost (the analytical and relationship work the employee could be doing instead of data transfer).\n\nFor a business with 5 employees each spending 2 hours per day on manual data transfer between systems, at an average loaded cost of $40 per hour, the annual operational tax is approximately $100,000. Integration that eliminates that transfer has a clear ROI  and that calculation does not include the value of the error reduction, the latency reduction, or the decisions that better real-time data enables.\n\nTHE DATA INCONSISTENCY PROBLEM\nWhen the same data exists in multiple systems and is synchronised manually, the data is guaranteed to be inconsistent. The customer's email address in the CRM is different from the email address in the accounting system because one was updated and the other was not. The inventory count in the ERP is different from the count shown in the e-commerce store because last night's sales have not been reconciled yet. The project status in the project management tool is different from the status in the client portal because nobody has updated it since the last billing cycle.\n\nInconsistent data is not just an operational annoyance  it is a customer experience problem (the customer who receives an email to the wrong address), a financial risk (the order that was fulfilled for inventory that the system showed as available but was actually sold), and a reporting integrity problem (the management dashboard that shows a different number depending on which system you look in).\n\nTHE INTEGRATION GAP AS A GROWTH CEILING\nManual data transfer scales linearly with business volume  double the transactions, double the data transfer work. API integration scales non-linearly  the same integration handles 10 transactions per day and 10,000 transactions per day at identical operational cost. For businesses where manual data transfer is embedded in their operational model, transaction volume growth means headcount growth, not operational leverage. The businesses that outgrow their manual processes without integrating them find themselves hiring to maintain operational capacity rather than hiring to grow capability.",
    promise: "",
  },
  problem: {
    title: "Our API Development and Integration Services",
    titleHighlight: "",
    items: [],
    afterTitle: "",
    afterHighlight: "",
    afterItems: [],
  },
  services: [
    {
      n: "01",
      icon: "Code2",
      tag: "Architecture",
      title: "API Architecture and Design",
      intro: "",
      blocks: [
        {
          h: "DESIGNING FOR LONGEVITY",
          p: "An API designed without foresight becomes a technical liability quickly  the API that cannot be versioned when requirements change, the API that has no authentication when a security audit reveals the gap, the API that was designed for internal use but is now needed externally. We design APIs with the longevity considerations that production APIs require: RESTful resource modelling (nouns not verbs, consistent naming conventions, predictable URL patterns), or GraphQL schema design (for APIs where flexible querying and reduced over-fetching are requirements.",
        },
        {
          h: "API VERSIONING STRATEGY",
          p: "APIs have consumers  internal systems, external integrations, partner APIs, and third-party developers  and those consumers depend on the API's contract remaining stable. When the API needs to evolve (new fields, changed response structures, removed endpoints), the versioning strategy determines whether existing consumers break. We design versioning strategies from the first API design: URL path versioning (the simplest approach, explicit and visible), header-based versioning (cleaner URLs, more complex routing), or the evolutionary API approach with backward-compatible field additions that avoids versioning for the majority of changes.",
        },
        {
          h: "AUTHENTICATION AND AUTHORISATION ARCHITECTURE",
          p: "API security is not optional  an unsecured API is an open door to every system the API can access. We design authentication for the specific consumption pattern of each API: API key authentication for server-to-server integrations where key rotation and secret management are manageable, JWT (JSON Web Token) bearer token authentication for user-context APIs where the requesting user's identity and permissions should govern data access, and OAuth 2.0 for third-party integrations where the API consumer acts on behalf of a user without that user sharing their credentials with the third party.",
        },
      ],
    },
    {
      n: "02",
      icon: "Plug",
      tag: "Third-Party",
      title: "Third-Party System Integration",
      intro: "",
      blocks: [
        {
          h: "CRM INTEGRATION",
          p: "We build CRM integrations for the most widely deployed CRM platforms: Salesforce (the dominant enterprise CRM, with its own integration ecosystem of AppExchange-listed connectors and custom REST/SOAP API implementations), HubSpot (the B2B SaaS and SMB CRM with a comprehensive API and native webhook support), Pipedrive (the sales-focused CRM with clean REST API), and Microsoft Dynamics (the enterprise CRM tightly integrated with the Microsoft 365 ecosystem). CRM integrations typically synchronise contact and company records, deal and opportunity data, activity logs, and the custom objects and properties specific to each business's CRM configuration.",
        },
        {
          h: "ERP AND ACCOUNTING INTEGRATION",
          p: "We build ERP and accounting integrations: QuickBooks Online and Xero (the dominant SMB accounting platforms, both with well-documented REST APIs), Sage 50, 200, and 300 (the mid-market accounting and ERP platforms used across the UK and European markets), NetSuite (the cloud ERP for mid-market to enterprise businesses requiring order management, inventory, and financial reporting in a single system), SAP and Microsoft Dynamics 365 Business Central (enterprise ERP integrations requiring ODATA API expertise and the specific data model knowledge that SAP's terminology demands).",
        },
        {
          h: "E-COMMERCE INTEGRATION",
          p: "We build e-commerce integrations: Shopify (comprehensive Admin API and Storefront API coverage, webhook integration for real-time event processing), WooCommerce (REST API integration with the specific WooCommerce data model), Magento (REST and GraphQL API integration for enterprise e-commerce), and the marketplace integrations (Amazon Seller Central, eBay, Etsy, Wayfair) that multi-channel e-commerce operations require.",
        },
      ],
    },
    {
      n: "03",
      icon: "Server",
      tag: "Custom API",
      title: "Custom API Development",
      intro: "",
      blocks: [
        {
          h: "BUILDING APIS FROM SCRATCH",
          p: "When no existing API serves the integration requirement  when the business's proprietary system needs to expose its data to external consumers, when a legacy system needs a modern API layer in front of its database, or when a new application needs the backend API that its frontend will consume  we design and build custom APIs.\n\nWe develop REST APIs using Node.js (Express, Fastify) and Python (FastAPI, Django REST Framework)  selecting the framework based on the performance requirements, the team's expertise, and the specific capabilities of each framework in the context of each API's use case. FastAPI for Python APIs requiring high throughput and automatic OpenAPI documentation generation. Express for Node.js APIs requiring flexibility and extensive middleware ecosystem access. Fastify for Node.js APIs requiring maximum performance.",
        },
        {
          h: "GRAPHQL API DEVELOPMENT",
          p: "GraphQL APIs are appropriate when the API's consumers have diverse data requirements  different consumers need different combinations of the same underlying data, and the over-fetching and under-fetching problems of REST APIs are significant enough to justify GraphQL's query flexibility. We build GraphQL APIs using Apollo Server (the most widely deployed GraphQL server for Node.js) and Strawberry or Ariadne for Python GraphQL implementations, with: schema-first design (defining the type system before implementation), DataLoader for N+1 query prevention (batching and caching database queries that naive GraphQL resolvers would multiply), and subscription support for real-time data push via WebSocket.",
        },
        {
          h: "OPENAPI DOCUMENTATION",
          p: "Every API we develop is documented with OpenAPI (formerly Swagger) specifications: the machine-readable description of every endpoint, every request parameter, every response schema, and every authentication requirement that enables API consumers to understand and test the API without requiring the original development team's involvement. OpenAPI documentation enables automatic client SDK generation (reducing the integration effort for consumers in any language), interactive API exploration through Swagger UI, and the automated contract testing that catches API breaking changes before they reach production.",
        },
      ],
    },
    {
      n: "04",
      icon: "Zap",
      tag: "Event-Driven",
      title: "Event-Driven Integration and Webhooks",
      intro: "",
      blocks: [
        {
          h: "WEBHOOKS  PUSH INSTEAD OF POLL",
          p: "Most API integrations are request-based: the consuming system polls the provider system on a schedule to check whether anything has changed. Polling is inefficient (most polls return no new data), adds latency (the consuming system only knows about changes as quickly as it polls), and creates unnecessary load on the provider system. Webhooks invert this model: the provider system pushes notifications to the consuming system the moment something changes  no polling, no latency, no unnecessary load.\n\nWe implement webhook systems: the webhook event model (defining which events trigger notifications), the delivery infrastructure (reliable HTTP delivery with retry on failure, exponential backoff for temporarily unavailable endpoints), the signature verification system (HMAC signatures that prevent webhook spoofing), and the webhook management interface (enabling API consumers to register, test, and manage their webhook subscriptions).",
        },
        {
          h: "EVENT-DRIVEN ARCHITECTURE WITH MESSAGE QUEUES",
          p: "For integration architectures where the volume of events is high, the processing is time-consuming, or the reliability requirements are stringent, we implement message queue-based integration: RabbitMQ or AWS SQS for point-to-point message delivery (ensuring every event is processed exactly once, even if the consumer is temporarily unavailable), Apache Kafka for high-throughput event streaming (enabling multiple consumers to process the same events independently), and the dead letter queue infrastructure that captures events that fail processing for investigation and reprocessing.",
        },
      ],
    },
    {
      n: "05",
      icon: "History",
      tag: "Legacy",
      title: "Legacy System Integration and Modernisation",
      intro: "",
      blocks: [
        {
          h: "THE LEGACY API LAYER",
          p: "Many businesses run operational data in legacy systems  ERP systems from the 1990s, proprietary databases with no documented API, or applications built in-house a decade ago that were not designed for integration. These systems hold critical operational data that modern applications and integrations need to access  but they do not expose an API that modern integration approaches can consume.\n\nWe build API layers in front of legacy systems: facade APIs that expose the legacy system's data through a clean, modern REST or GraphQL interface (without modifying the legacy system's internals), ETL pipelines that extract data from the legacy system's database or exports and make it available to consuming systems, and the reverse proxy patterns that add authentication, rate limiting, and monitoring to legacy systems that have none.",
        },
        {
          h: "DATABASE-LEVEL INTEGRATION",
          p: "When no API exists and no API can be built in front of a system, database-level integration is the approach: change data capture (CDC) using tools like Debezium (which reads the database transaction log to capture every change as it occurs, rather than polling the database for changes), scheduled database queries that extract changed records since the last extraction, and database triggers that fire when specific data changes and produce events that integration systems can consume.",
        },
      ],
    },
    {
      n: "06",
      icon: "Activity",
      tag: "Observability",
      title: "Integration Monitoring and Operational Management",
      intro: "",
      blocks: [
        {
          h: "INTEGRATION OBSERVABILITY",
          p: "An integration that runs silently is an integration that fails silently. Without observability  the ability to see what integrations are running, what they are processing, and what errors they are encountering  integration failures are discovered when a business process breaks, often long after the underlying failure occurred. We implement integration observability: structured logging for every integration event (what data was processed, what transformations were applied, what the outcome was), metrics collection (event throughput, processing latency, error rates), and alerting (real-time notifications when error rates exceed thresholds, when processing latency degrades, or when integrations stop processing entirely).",
        },
        {
          h: "ERROR HANDLING AND RETRY LOGIC",
          p: "Production integrations encounter errors  the downstream system is temporarily unavailable, the data received does not match the expected format, the API rate limit has been reached, or a transient network failure interrupts the request. We implement robust error handling: specific error type classification (transient errors that should be retried versus permanent errors that should be logged and alerted), exponential backoff retry logic (avoiding overwhelming a struggling system with immediate retries), dead letter queues (capturing events that fail all retry attempts for manual investigation), and the error notification infrastructure that ensures the right people are informed when integration failures require human intervention.",
        },
      ],
    },
  ],
  cases: [
    {
      tag: "Distribution · Multi-System",
      metric: "14 hrs",
      sub: "daily manual data entry eliminated · 99.6% inventory accuracy",
      title: "Distribution company  multi-system integration eliminates 14 hours of daily manual data entry.",
      body: "A wholesale distribution company with 22 employees was operating with four disconnected systems: a legacy ERP for inventory and purchasing, Shopify for their B2C e-commerce channel, QuickBooks Online for accounting, and a custom ordering system for their wholesale accounts. The operations team spent an average of 14 person-hours per day manually transferring data between these systems  order data from Shopify to the ERP, inventory updates from the ERP to Shopify, sales data from the ERP to QuickBooks, and wholesale orders from the custom system to the ERP.\n\nOur integration engagement: a custom integration layer connecting all four systems  Shopify webhook integration (processing order events in real time, creating ERP sales orders and updating inventory counts on order placement), QuickBooks Online integration (daily automated reconciliation of ERP sales data to QuickBooks invoices and payments), and wholesale order system integration (real-time synchronisation of wholesale orders to the ERP, with automated purchase order generation for back-ordered items).",
      result: "Manual data transfer time eliminated from 14 hours per day to approximately 45 minutes per day (for exception handling and integration monitoring review). The 13.25 hours of daily productivity recovered across the operations team was redeployed to customer service, account management, and the supplier relationship work that had been chronically under-resourced due to the data transfer burden. Inventory accuracy improved from 94% to 99.6% as automated synchronisation eliminated the manual entry errors that had been the source of the 6% inaccuracy. The integration paid for itself in recovered productivity within 4 months.",
    },
    {
      tag: "B2B SaaS · Public API",
      metric: "$1.8M",
      sub: "ARR from partner-led revenue · 28% of new trials",
      title: "B2B SaaS company  public API enables $1.8M in partner-led revenue.",
      body: "A B2B project management SaaS had a strong product but was growing primarily through direct sales  a channel that was scaling linearly with sales headcount. The product team identified that their target customers were also using a set of complementary tools (Slack, Salesforce, HubSpot, Jira, and Google Workspace) that could become distribution channels if the product provided official integrations with each.\n\nOur API engagement: design and development of a public REST API with OpenAPI documentation, OAuth 2.0 authorisation server implementation (enabling third-party developers to build integrations that act on behalf of their users without requiring their credentials), official Slack app (bi-directional task management within Slack channels, delivering task notifications and enabling quick status updates without leaving Slack), Salesforce AppExchange app (bi-directional deal and task synchronisation, enabling sales teams to manage project tasks from within Salesforce without switching context), and Zapier certified app (covering 24 trigger and action combinations, enabling the 5 million+ Zapier users to connect the product to their existing tool stack without developer involvement).",
      result: "Partner-led revenue  revenue attributable to customers who discovered or decided to purchase because of an integration  grew from $0 to $1.8M ARR in 24 months following the integration launches. The Zapier integration alone accounted for 28% of new trial sign-ups in its first year. The Salesforce AppExchange listing drove an average of 12 enterprise trial sign-ups per month at zero marginal customer acquisition cost. The public API enabled 34 third-party integrations built by external developers  each representing distribution into a new user community without additional investment from the product team.",
    },
    {
      tag: "Healthcare · FHIR API",
      metric: "47 min",
      sub: "to 8 seconds per record retrieval · 22% referral improvement",
      title: "Healthcare network  FHIR API integration connects 8 clinical systems in real time.",
      body: "A regional healthcare network with 8 affiliated clinics was operating across 8 independently-deployed clinical information systems  different EHR vendors, different laboratory systems, different imaging systems  with no shared patient record infrastructure. Clinicians treating patients across multiple affiliated clinics could not access complete patient records from within their primary system; records had to be requested by phone or fax from the clinic where the record resided.\n\nOur integration engagement: FHIR (Fast Healthcare Interoperability Resources) R4 API implementation  building a FHIR-compliant API layer that translated each clinic's system data into the standardised FHIR resource format, a patient identity matching service (resolving the same patient's records across systems where patient identifiers were inconsistent), a FHIR resource server aggregating patient records from all 8 systems into a unified patient timeline view, and secure access control implementing the specific patient consent and provider authorisation rules required by HIPAA and the network's governance policies.",
      result: "Clinicians could access complete cross-clinic patient records within 8 seconds of patient lookup  replacing the phone and fax process that had taken an average of 47 minutes for complete record retrieval. Clinical decision-making improved measurably: referral appropriateness (measured by specialist review rates of referred cases) improved by 22% as referring clinicians had access to complete diagnostic histories. The FHIR API implementation also enabled the network to participate in state-level health information exchange infrastructure  a prerequisite for federal quality improvement programme funding that the fragmented system had been preventing.",
    },
  ],
  why: [
    {
      icon: "GitBranch",
      h: "Integration as a Discipline, Not a Side Effect",
      p: "We treat integration as a first-class software discipline  with the same architectural rigour, the same testing standards, and the same operational observability that we apply to primary application development. Integration built as an afterthought produces the fragile, undocumented, unmonitored connections that fail silently and are discovered only when a business process breaks. Integration built as a discipline produces the reliable, monitored, documented data infrastructure that the business can depend on.",
    },
    {
      icon: "Grid",
      h: "Breadth of System Knowledge",
      p: "Every integration requires understanding the specific API, the specific data model, and the specific quirks of the system being integrated. We have integrated with Salesforce, HubSpot, QuickBooks, Xero, Sage, NetSuite, SAP, Shopify, WooCommerce, Stripe, Twilio, SendGrid, Google Workspace, Microsoft 365, Jira, Asana, Slack, and hundreds of other systems  and we bring the specific knowledge of each system's API to every integration, rather than discovering the system's quirks during the client's development project.",
    },
    {
      icon: "Pencil",
      h: "Design Before Implementation",
      p: "API architecture decisions made incorrectly at the start are expensive to fix later. We invest in design before implementation  API schema design, data model mapping, error handling strategy, authentication architecture, and the integration topology that determines which systems are the source of truth for which data  because the cost of getting these decisions right in design is a fraction of the cost of getting them wrong in production.",
    },
  ],
  faqs: [
    {
      q: "What is an API and why does my business need one?",
      a: "An API (Application Programming Interface) is a defined interface through which software systems exchange data and invoke each other's functionality. If your business uses multiple software products  a CRM, an accounting system, an e-commerce platform, an ERP  each of those products has an API that enables other systems to read and write its data programmatically. Building integrations between these APIs is what connects your systems so that data flows automatically between them, eliminating manual data transfer, reducing errors, and enabling real-time data consistency across your operational stack.",
    },
    {
      q: "What is the difference between REST and GraphQL, and which should I use?",
      a: "REST (Representational State Transfer) is the most widely adopted API design style  it organises API resources as URLs (endpoints) and uses standard HTTP methods (GET, POST, PUT, DELETE) to interact with them. GraphQL is a query language for APIs that enables consumers to request exactly the data they need in a single request, rather than making multiple REST requests for different resources. REST is the right choice for most API requirements  it is simpler to understand, simpler to cache, and has broader ecosystem support. GraphQL is the right choice when API consumers have diverse data requirements (different consumers need different combinations of the same data), when over-fetching is a performance concern, or when the API will serve a complex product with many interrelated data types.",
    },
    {
      q: "How long does API integration take?",
      a: "Simple point-to-point integrations between two systems with well-documented APIs typically take 2-4 weeks. Complex multi-system integration architectures (connecting 4-8 systems with bidirectional data flow, custom data transformation, and comprehensive error handling) typically take 6-16 weeks. Custom API development from scratch (designing and building a new API, including authentication, documentation, and testing) typically takes 4-12 weeks depending on the API's complexity. These timelines assume the systems being integrated have accessible, well-documented APIs  legacy systems without APIs or with poorly documented APIs add discovery time.",
    },
    {
      q: "How do you ensure data doesn't get lost or duplicated during integration?",
      a: "Data integrity in integration requires specific technical approaches: idempotency keys (unique identifiers for each operation that prevent duplicate processing if an operation is retried), exactly-once processing semantics (ensuring each event is processed precisely once, even if the integration infrastructure retries delivery), transaction management (ensuring that operations across multiple systems are committed atomically or rolled back consistently), and comprehensive error handling with dead letter queues (capturing events that fail processing for investigation rather than silently dropping them). We implement these patterns as standard practice rather than as optional additions.",
    },
    {
      q: "What happens when an integrated system goes down?",
      a: "Integration failures are inevitable  systems go down, APIs are temporarily unavailable, network failures interrupt requests. We design integrations for resilience: circuit breakers (preventing cascading failures by temporarily stopping requests to an unavailable system), retry logic with exponential backoff (retrying failed operations with increasing intervals to avoid overwhelming a recovering system), message queue buffering (storing events that cannot be immediately processed until the downstream system is available), and operational alerting (notifying the team when an integration is failing so the impact can be assessed and addressed promptly).",
    },
    {
      q: "Can you integrate with legacy systems that do not have an API?",
      a: "Yes  legacy system integration without an API is a common requirement. Our approaches depend on what access is available: database-level integration (direct database access with change data capture using tools like Debezium, or scheduled query-based extraction), file-based integration (processing exports from the legacy system and importing to target systems, automating what had previously been a manual export-import process), screen scraping (using browser automation to extract data from web-based legacy systems that do not expose a programmatic interface), and API façade patterns (building a modern API layer in front of the legacy system's database, enabling integration without modifying the legacy system).",
    },
    {
      q: "How do you handle security and data privacy in integrations?",
      a: "Integration security requires addressing several specific concerns: authentication (ensuring only authorised systems can invoke the integration), authorisation (ensuring each system can only access the specific data it is entitled to), data in transit encryption (TLS for all API calls), sensitive data handling (PII and financial data processed in compliance with applicable regulations  GDPR, CCPA, PCI DSS, HIPAA), and audit logging (maintaining a complete record of what data was transferred, when, and between which systems  the audit trail that compliance frameworks require). We implement these security controls as standard practice on every integration engagement.",
    },
    {
      q: "How do I get started?",
      a: "Book a free integration consultation. We discuss the systems you need to connect, the specific data flows you need to automate, the error handling and reliability requirements, and your timeline and budget. We provide an integration architecture recommendation and a scope estimate within 48 hours. No commitment required at the consultation stage.",
    },
  ],
  cta: {
    title: "Ready to Connect Your Systems and Reclaim Your Team's Time?",
    description:
      "Your software stack is already in place. The data exists in each system. The only thing preventing it from flowing automatically  eliminating the manual transfer, the reconciliation, and the errors  is the integration layer that connects each system to the others.\n\nWe build that layer. Reliably, securely, with the observability that makes it maintainable, and with the documentation that makes it understandable to every developer who touches it.",
    contactLink: "https://clickmastersdigitalmarketing.com/contact",
    whatsappLink: "https://wa.me/",
    softwareLink: "https://clickmastersdigitalmarketing.com/custom-software-development/",
  },
  footer: {
    company: "Clickmasters Digital Marketing",
    url: "https://clickmastersdigitalmarketing.com",
    email: "marketing@clickmastersdigitalmarketing.com",
    regions: "USA, UK, UAE, Pakistan, Canada, Australia",
    author: "Amjad Khan  CEO, Clickmasters Digital Marketing | API development and integration specialist | 10+ years",
  },
  schema: {
  Service: {
    serviceType: "API Development & Integration",
    provider: {
      name: "Clickmasters Digital Marketing",
      url: "https://clickmastersdigitalmarketing.com",
      logo: "https://clickmastersdigitalmarketing.com/logo.png"
    },
    areaServed: ["US", "UK", "UAE", "PK"]
  },

  FAQPage: {
    items: [
      "What is an API and why does my business need one?",
      "What is the difference between REST and GraphQL, and which should I use?",
      "How long does API integration take?",
      "How do you ensure data doesn't get lost or duplicated during integration?",
      "What happens when an integrated system goes down?",
      "Can you integrate with legacy systems that do not have an API?",
      "How do you handle security and data privacy in integrations?",
      "How do I get started?"
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
        name: "App & Software Development",
        url: "https://clickmastersdigitalmarketing.com/app-software-development/"
      },
      {
        position: 3,
        name: "API Development & Integration",
        url: "https://clickmastersdigitalmarketing.com/api-development-integration/"
      }
    ]
  }
}
};