export const CloudSolutionsContent = {
  slug: "cloud-solutions-services",
  metadata: {
    url: "/cloud-solutions-services/",
    keyword: "cloud solutions company",
    volume: "9,900/mo",
    cpc: "$48.80",
    formula: "FAB",
    author: "Amjad Khan",
  },
  hero: {
    tag: "[ Service ] Cloud Solutions",
    title: "Cloud Solutions Company",
    titleHighlight: "The Infrastructure That Scales With Your Business",
    subtitle: "",
    description:
      "Expert cloud solutions  AWS, GCP, Azure, Kubernetes, serverless & FinOps. Cloud migration, re-architecture & cost optimisation. USA, UK & UAE. Free consultation.",
    stats: [
      { k: "62%", v: "Infrastructure cost reduction" },
      { k: "99.97%", v: "Post-migration availability" },
      { k: "4x", v: "Deployment frequency improvement" },
      { k: "10+ yrs", v: "Cloud architecture depth" },
    ],
  },
  intro: {
    problem: [
      { text: "Feature  Our Cloud Solutions Capabilities", type: "normal" }
    ],
    solution: "",
    promise: "",
  },
  problem: {
    title: "",
    titleHighlight: "",
    items: [],
    afterTitle: "",
    afterHighlight: "",
    afterItems: [],
  },
  services: [
    {
      n: "01",
      icon: "Cloud",
      tag: "Migration",
      title: "Cloud Migration Services",
      intro: "",
      blocks: [
        {
          h: "MIGRATION ASSESSMENT AND STRATEGY",
          p: "A cloud migration without a strategy is infrastructure roulette. Every migration begins with assessment: cataloguing the current application portfolio (what systems exist, what they do, what they depend on), evaluating each workload for cloud suitability (which applications can be lifted and shifted, which benefit from re-platforming on managed cloud services, which require re-architecting for cloud-native patterns to realise cloud economics), and defining the migration sequence (which workloads to move first to deliver early value, which to defer until dependencies are resolved).\n\nWe use the 6Rs migration framework: Retire (decommission workloads that no longer serve a business purpose), Retain (keep workloads on-premises where cloud migration is not yet justified), Rehost (lift-and-shift to cloud VMs for speed with lower optimisation), Replatform (move to managed cloud services with moderate changes for operational benefits), Refactor (re-architect for cloud-native patterns for maximum cloud economics), and Repurchase (replace with SaaS alternatives where appropriate). Each workload in the migration portfolio is assigned the most appropriate strategy.",
        },
        {
          h: "APPLICATION MIGRATION EXECUTION",
          p: "We execute cloud migrations with the discipline that minimises business risk: parallel-run periods (running old and new infrastructure simultaneously during cut-over to enable instant rollback), incremental migration (moving workloads in sequence rather than big-bang migrations that create a single large-risk moment), data migration with integrity verification (confirming data completeness and accuracy before decommissioning source systems), and performance baseline validation (confirming that migrated workloads meet performance requirements before decommissioning on-premises equivalents).",
        },
      ],
    },
    {
      n: "02",
      icon: "Server",
      tag: "AWS",
      title: "AWS Architecture and Services",
      intro: "",
      blocks: [
        {
          h: "AWS AS THE MARKET-LEADING CLOUD PLATFORM",
          p: "Amazon Web Services holds approximately 31% of the cloud infrastructure market and offers the broadest service catalogue of any cloud provider: over 200 services spanning compute, storage, databases, networking, security, machine learning, analytics, IoT, and application development. For businesses starting cloud adoption, AWS's depth and ecosystem maturity make it the default choice in most cases.\n\nWe design and implement AWS architectures: EC2 and Auto Scaling groups for compute workloads requiring direct VM control, ECS and EKS for containerised application deployment, Lambda and API Gateway for serverless application architectures, RDS and Aurora for managed relational database deployment, DynamoDB for serverless NoSQL at any scale, S3 and CloudFront for object storage and global content delivery, VPC architecture for network security and isolation, IAM for identity and access management, and the AWS security services (GuardDuty, Security Hub, Config, CloudTrail) that provide the security monitoring and compliance reporting that enterprise workloads require.",
        },
        {
          h: "AWS WELL-ARCHITECTED REVIEW",
          p: "AWS's Well-Architected Framework defines the five pillars of sound cloud architecture: Operational Excellence, Security, Reliability, Performance Efficiency, and Cost Optimisation. We conduct Well-Architected Reviews for existing AWS deployments  assessing the current architecture against each pillar's best practices, identifying the specific gaps that create operational risk or unnecessary cost, and prioritising the remediation actions that produce the highest improvement per unit of effort.",
        },
      ],
    },
    {
      n: "03",
      icon: "Layers",
      tag: "Multi-Cloud",
      title: "Google Cloud Platform and Microsoft Azure",
      intro: "",
      blocks: [
        {
          h: "GOOGLE CLOUD PLATFORM",
          p: "GCP is the preferred cloud platform for organisations with significant data and analytics workloads  BigQuery (Google's serverless data warehouse, which handles petabyte-scale analytics at costs and speeds that on-premises equivalents cannot match), Vertex AI (the unified ML platform that benefits from Google's AI research advantages), and the Kubernetes platform that Google invented and continues to lead in operational maturity (GKE  Google Kubernetes Engine). We design GCP architectures leveraging GCP's specific strengths: BigQuery for analytics, GKE for Kubernetes workloads, Cloud Run for containerised serverless deployments, and Cloud Spanner for globally distributed relational databases.",
        },
        {
          h: "MICROSOFT AZURE",
          p: "Azure is the natural cloud choice for organisations with significant Microsoft ecosystem dependencies: Azure Active Directory integration with existing on-premises AD infrastructure, Microsoft 365 integration, .NET and C# workload support, and the enterprise Microsoft relationships that provide commercial alignment between the organisation's existing Microsoft spend and cloud infrastructure. We design Azure architectures: Azure Kubernetes Service for containerised deployments, Azure SQL and Cosmos DB for managed database services, Azure Functions for serverless compute, Azure API Management for API gateway and developer portal, and Azure Sentinel for security information and event management.",
        },
        {
          h: "MULTI-CLOUD ARCHITECTURES",
          p: "Organisations with specific requirements  avoiding cloud vendor lock-in, serving customers in regions where a single provider has inadequate coverage, or leveraging best-of-breed services across providers  benefit from multi-cloud architectures. We design multi-cloud deployments with the data portability, workload portability, and identity federation that make multi-cloud operationally manageable rather than operationally complex.",
        },
      ],
    },
    {
      n: "04",
      icon: "Box",
      tag: "Kubernetes",
      title: "Kubernetes and Container Orchestration",
      intro: "",
      blocks: [
        {
          h: "CONTAINERISATION AS THE FOUNDATION OF CLOUD-NATIVE ARCHITECTURE",
          p: "Containers  the packaging format that bundles an application with its dependencies into a portable, consistent execution environment  are the foundation of modern cloud-native application deployment. Containerised applications run identically across development, testing, and production environments; they start faster than VMs; they use resources more efficiently through bin-packing; and they enable the deployment patterns (blue-green deployments, canary releases, rolling updates) that reduce deployment risk without requiring maintenance windows.\n\nWe containerise applications: Dockerfiles that produce minimal, secure container images (following the multi-stage build patterns that separate build dependencies from runtime images), Docker Compose for local development environments, and the CI/CD pipeline integration that automatically builds and pushes images on code changes.",
        },
        {
          h: "KUBERNETES FOR PRODUCTION CONTAINER ORCHESTRATION",
          p: "Kubernetes has become the de facto standard for production container orchestration  managing the deployment, scaling, networking, and health of containerised applications across clusters of nodes. We design and implement Kubernetes deployments: cluster architecture (node pools sized for the specific workload mix), workload configuration (Deployments, StatefulSets, DaemonSets), service and ingress configuration (exposing applications to external traffic with appropriate load balancing and TLS termination), autoscaling (Horizontal Pod Autoscaler for demand-based scaling, Cluster Autoscaler for node-level scaling), and the GitOps deployment workflow (ArgoCD or Flux) that makes Kubernetes deployments auditable, version-controlled, and self-healing.",
        },
      ],
    },
    {
      n: "05",
      icon: "Zap",
      tag: "Serverless",
      title: "Serverless Architecture",
      intro: "",
      blocks: [
        {
          h: "THE SERVERLESS ECONOMICS",
          p: "Serverless computing  where the cloud provider manages the underlying server infrastructure and charges only for the compute actually consumed during function execution  eliminates the cost of idle capacity. A traditional application server provisioned for peak load runs at 10-30% utilisation during off-peak periods, paying for capacity that generates no business value. A serverless equivalent charges only for the milliseconds of execution time during actual requests  producing dramatically lower costs for workloads with variable or unpredictable traffic patterns.\n\nWe design serverless architectures: AWS Lambda (event-driven serverless compute for API backends, data processing, and scheduled tasks), Google Cloud Run (containerised serverless for applications with longer execution times or specific runtime requirements), Vercel and Netlify Functions (serverless for frontend-adjacent workloads and Next.js/Nuxt.js API routes), and the event-driven architecture patterns (message queues, event buses, step functions) that compose serverless functions into reliable business workflows.",
        },
        {
          h: "SERVERLESS LIMITATIONS AND WHEN NOT TO USE IT",
          p: "Serverless is not universally appropriate. Cold start latency (the delay on first invocation when a function container must be initialised) affects latency-sensitive applications. Execution time limits (15 minutes for Lambda) affect long-running processes. Stateless execution models require external state management for applications that maintain session state. We advise on the serverless suitability assessment for each workload and design hybrid architectures where serverless handles the variable components and persistent compute handles the workloads that serverless cannot adequately serve.",
        },
      ],
    },
    {
      n: "06",
      icon: "DollarSign",
      tag: "FinOps",
      title: "Cloud Cost Optimisation (FinOps)",
      intro: "",
      blocks: [
        {
          h: "THE CLOUD COST PROBLEM",
          p: "Cloud billing is notoriously difficult to understand and control. The combination of hundreds of service types, multiple pricing dimensions (compute hours, storage GB, data transfer GB, request counts, provisioned IOPS), and the ease of provisioning new resources without procurement approval creates cloud bills that grow faster than usage  because unused or underutilised resources accumulate without the natural friction of hardware procurement.\n\nFinOps  the combination of financial operations and cloud operations  is the discipline that brings engineering, finance, and business stakeholders together around shared accountability for cloud cost efficiency. We implement FinOps programmes: cost visibility (tagging strategy for cost attribution to teams and products, cost dashboards that show spending by service, team, and application), waste elimination (identifying and decommissioning unused resources  idle EC2 instances, unattached EBS volumes, unused RDS instances, orphaned load balancers), right-sizing (identifying over-provisioned resources and recommending the smaller instance types that meet the workload's actual resource requirements), and commitment optimisation (Reserved Instances and Savings Plans for predictable workloads, Spot Instances for fault-tolerant workloads  typically producing 30-70% savings on compute costs).",
        },
        {
          h: "CLOUD COST MONITORING AND ALERTING",
          p: "Cloud cost optimisation is not a one-time engagement  it is a continuous programme. Resources that are right-sized today may be over-provisioned tomorrow as workloads change. We implement cost monitoring infrastructure: AWS Cost Explorer and Cost Anomaly Detection, Google Cloud Billing alerts, and third-party FinOps tools (CloudHealth, Apptio Cloudability) for multi-cloud cost management. Budget alerts trigger when spending exceeds defined thresholds, cost anomaly detection identifies unusual spending patterns before they compound into large bills, and monthly cost reviews maintain commercial accountability for cloud investment.",
        },
      ],
    },
  ],
  cases: [
    {
      tag: "E-Commerce · AWS Migration",
      metric: "62%",
      sub: "infrastructure cost reduction · 99.97% availability",
      title: "E-commerce platform  AWS migration and re-architecture reduces infrastructure cost by 62% and enables Black Friday scaling.",
      body: "A B2C e-commerce platform with 200,000 monthly active users was running on a dedicated server estate  12 physical servers in a colocation facility with a fixed monthly cost of $18,400. The infrastructure was provisioned for peak load (Black Friday traffic spikes of 8-10x normal) meaning it ran at 12-15% utilisation for 11 months of the year. Every Black Friday, the servers were insufficient anyway  the infrastructure could not handle the traffic spike, producing 4-6 hours of degraded performance at the worst commercial moment of the year.\n\nOur cloud engagement: migration from colocation to AWS (EC2 with Auto Scaling groups for the application tier, RDS Aurora for the database tier, ElastiCache for session management and caching, CloudFront for static asset delivery and DDoS protection), re-architecture of the application tier for stateless horizontal scaling (sessions moved from in-memory to Redis, static assets moved to S3 and CloudFront), and load testing to validate Auto Scaling configuration before the first Black Friday on the new infrastructure.",
      result: "Monthly infrastructure cost reduced from $18,400 to $7,100 at normal load  a 62% reduction. The first Black Friday on AWS infrastructure: 9.4x normal traffic handled without degradation, with Auto Scaling adding 22 additional EC2 instances within 4 minutes of traffic onset and scaling back within 20 minutes of peak passing. The platform achieved 99.97% availability in the 12 months following migration.",
    },
    {
      tag: "Fintech · GCP BigQuery",
      metric: "3 days → 4 hours",
      sub: "reporting time reduction · $280 vs $3,200 monthly",
      title: "Fintech startup  GCP BigQuery analytics reduces reporting time from 3 days to 4 hours.",
      body: "A B2B fintech company was generating 40GB of transaction and user behaviour data per month  data that the business intelligence team was processing in a PostgreSQL database that had been designed for transactional workloads, not analytical queries. Complex analytical queries were taking 6-12 hours to complete, making the weekly management reports a 3-day exercise as the team waited for queries, fixed query failures, and assembled the results manually.\n\nOur cloud engagement: Google BigQuery implementation (migrating the analytical data warehouse from PostgreSQL to BigQuery's serverless columnar analytics engine), Dataflow pipeline (streaming new transaction data to BigQuery in near-real-time rather than batch ETL), Looker Studio dashboard (connecting the management team directly to BigQuery through a self-service reporting interface, eliminating the analyst-in-the-middle model), and dbt (data build tool) for the data transformation and modelling layer that produced the clean, documented analytical tables the dashboards queried.",
      result: "Complex analytical queries that had taken 6-12 hours in PostgreSQL completed in 8-40 seconds in BigQuery. Management reporting time decreased from 3 days to 4 hours  as the Looker Studio dashboards served most standard reports directly without analyst intervention. Monthly BigQuery cost for the 40GB analytical workload: $280  compared to the $3,200 monthly cost of the PostgreSQL analytical instance. The BI team's capacity freed by the reporting automation was redirected to proactive analysis and insight generation.",
    },
    {
      tag: "SaaS · Kubernetes",
      metric: "4x",
      sub: "deployment frequency improvement · 58% incident reduction",
      title: "SaaS company  Kubernetes migration improves deployment frequency by 4x and reduces incident rate by 58%.",
      body: "A B2B SaaS company with 12 engineers was deploying application updates twice per month  the deployment cadence was limited by the risk of the manual deployment process (scripted server updates that occasionally produced mid-deployment failures requiring 2-4 hour incident responses) and the lack of rollback capability (a failed deployment required the reverse of the deployment script, which sometimes introduced additional failures).\n\nOur cloud engagement: Kubernetes migration on AWS EKS (containerising all application components, deploying to EKS with Deployment and Service configurations), GitOps deployment workflow with ArgoCD (declarative configuration in Git, continuous reconciliation that automatically deploys configuration changes), blue-green deployment strategy (deploying new versions alongside existing versions, routing traffic after health validation, retaining the previous version for instant rollback), Horizontal Pod Autoscaler (scaling application replicas in response to CPU and request metrics), and Prometheus and Grafana for metrics and alerting.",
      result: "Deployment frequency increased from 2 per month to 8 per month  a 4x improvement  as the lower-risk GitOps deployment process removed the engineering team's conservatism about frequent releases. Production incidents attributable to deployment failures decreased from 3.4 per month to 1.4 per month  a 58% reduction  as blue-green deployments with automatic health checks caught issues before they reached production traffic. The engineering team's deployment-related on-call burden decreased significantly as the self-healing Kubernetes deployment model replaced the manual intervention model.",
    },
  ],
  why: [
    {
      icon: "Pencil",
      h: "Architecture Before Implementation",
      p: "Cloud projects that begin with implementation rather than architecture accumulate the technical debt that makes cloud expensive and operationally complex. We invest in architecture design before any provisioning: understanding the specific workload requirements, the scale profile, the resilience requirements, the compliance constraints, and the cost targets that the architecture must satisfy. The architecture document that precedes implementation is the decision record that prevents the expensive revisions that post-hoc cloud architecture produces.",
    },
    {
      icon: "Rocket",
      h: "Cloud-Native Patterns, Not Lift-and-Shift",
      p: "Lift-and-shift migrations produce cloud bills that exceed on-premises costs  because cloud VMs running legacy application patterns are more expensive than on-premises hardware amortised over five years. Cloud-native patterns  managed services, serverless, containerised microservices, auto-scaling  produce the cloud economics that justify the migration investment. We design for cloud-native from the first architecture decision.",
    },
    {
      icon: "DollarSign",
      h: "FinOps as Continuous Practice",
      p: "Cloud cost optimisation is not a project  it is a continuous operating discipline. We implement the cost visibility, the alerting, and the monthly review processes that maintain commercial accountability for cloud investment over time, not just at the point of deployment.",
    },
    {
      icon: "Globe",
      h: "Multi-Cloud and Vendor-Neutral Expertise",
      p: "Our cloud expertise spans AWS, GCP, and Azure  enabling genuine best-platform recommendations rather than platform-biased advice. We recommend the platform (or platform combination) most appropriate for each client's specific workload characteristics, team expertise, vendor relationships, and commercial requirements.",
    },
  ],
  faqs: [
    {
      q: "How do I know if my business is ready to move to the cloud?",
      a: "Most businesses are ready to benefit from cloud migration if they experience any of: unpredictable infrastructure costs that scale with hardware refresh cycles rather than business value, difficulty scaling infrastructure to meet demand peaks, engineering team time consumed by server management rather than product development, security or compliance gaps in on-premises infrastructure, disaster recovery or business continuity gaps, or geographic expansion requirements that on-premises infrastructure cannot serve cost-effectively. The more of these factors apply, the stronger the migration case. We conduct cloud readiness assessments that map the specific migration opportunities and their expected business impact before any commitment is made.",
    },
    {
      q: "How much can cloud migration reduce my infrastructure costs?",
      a: "Cost outcomes vary significantly based on the current infrastructure model and the cloud architecture design. Organisations migrating from dedicated on-premises servers typically see total infrastructure cost reductions of 30-60% when the migration includes right-sizing, managed services adoption, and Reserved Instance commitments. Organisations already on cloud infrastructure but without FinOps practices in place typically see 20-40% cost reductions from right-sizing, waste elimination, and commitment optimisation without any architectural changes. We model expected cost outcomes as part of the migration assessment before any commitment is made.",
    },
    {
      q: "What is the difference between cloud migration and cloud-native development?",
      a: "Cloud migration moves existing applications and data from on-premises or legacy hosting to cloud infrastructure. Cloud-native development is building new applications specifically designed to run on cloud infrastructure  using managed services, containerisation, serverless computing, and the architectural patterns that produce cloud economics rather than mapping legacy patterns onto cloud platforms. Many organisations do both: migrating existing workloads as part of modernisation programmes while building new products on cloud-native architecture from the start.",
    },
    {
      q: "How long does a cloud migration take?",
      a: "Migration timelines depend on the portfolio size and complexity. A single application migration (one web application, its database, and its storage) typically takes 4-8 weeks. A portfolio migration (10-30 applications across a business) typically takes 3-9 months depending on the complexity of interdependencies and the degree of re-architecture required. Large enterprise portfolio migrations (100+ applications) typically take 12-36 months, delivered in waves rather than simultaneously. We design migration plans that prioritise delivering value early  moving the highest-impact, lowest-risk workloads first to demonstrate ROI while more complex migrations are in progress.",
    },
    {
      q: "Which cloud provider should I use  AWS, GCP, or Azure?",
      a: "The right choice depends on specific factors. AWS is the most versatile choice for most workloads  the broadest service catalogue, the largest ecosystem, and the largest talent market. GCP is the strongest choice for data and analytics workloads (BigQuery's serverless analytics is genuinely category-leading) and for Kubernetes-heavy deployments (GKE's maturity reflects Google's 15-year Kubernetes operating experience). Azure is the strongest choice for organisations with significant Microsoft ecosystem dependencies (Active Directory, Microsoft 365, .NET/C# development teams, existing Microsoft enterprise agreements). For most new workloads without strong existing vendor relationships, we recommend AWS as the starting point.",
    },
    {
      q: "What is FinOps and why does my business need it?",
      a: "FinOps is the practice of bringing financial accountability to cloud spending  making cloud costs visible, attributable to the teams and products that incur them, and continuously optimised through the collaboration of engineering, finance, and business stakeholders. Without FinOps, cloud bills grow unpredictably as resources are provisioned without accountability and never decommissioned. With FinOps, cloud costs are tied to business outcomes  each pound or dollar of cloud spending is justified by the value it produces, waste is systematically identified and eliminated, and committed spend discounts are maximised for predictable workloads.",
    },
    {
      q: "Do you provide ongoing cloud management after migration?",
      a: "Yes  we offer ongoing cloud management retainers that cover: security patching and compliance monitoring, cost optimisation (monthly FinOps reviews, reserved instance management, right-sizing), capacity planning and scaling management, incident response, and continuous architecture improvement. Cloud management retainers are appropriate for organisations that want cloud expertise on-demand without the cost of a full-time internal cloud team.",
    },
    {
      q: "How do you ensure cloud security during and after migration?",
      a: "Cloud security is addressed at the architecture level from the first design decision, not added as a layer after deployment. Our standard security implementation: VPC network isolation with least-privilege security group rules, IAM with principle of least privilege (no overly-permissive IAM policies), encryption at rest and in transit for all data stores, security monitoring via cloud-native services (AWS GuardDuty, Azure Sentinel, GCP Security Command Centre), vulnerability scanning for container images in the CI/CD pipeline, and the infrastructure-as-code practices (Terraform) that make security configuration version-controlled and auditable.",
    },
  ],
  cta: {
    title: "Ready to Make Cloud Work for Your Business?",
    description:
      "Cloud infrastructure designed correctly is the most commercially efficient infrastructure available to modern businesses. It scales when you need it, costs what it should at the load you are actually running, and provides the security and compliance foundation that on-premises infrastructure requires significant additional investment to match.\n\nWe design cloud solutions that deliver this  the architecture, the migration, the optimisation, and the ongoing management that transforms cloud from a cost line into a genuine competitive advantage.",
    contactLink: "https://clickmastersdigitalmarketing.com/contact",
    whatsappLink: "https://wa.me/",
    softwareLink: "https://clickmastersdigitalmarketing.com/custom-software-development/",
  },
  footer: {
    company: "Clickmasters Digital Marketing",
    url: "https://clickmastersdigitalmarketing.com",
    email: "marketing@clickmastersdigitalmarketing.com",
    regions: "USA, UK, UAE, Pakistan, Canada, Australia",
    author: "Amjad Khan  CEO, Clickmasters Digital Marketing | Cloud solutions architect | 10+ years",
  },schema: {
  Service: {
    serviceType: "Cloud Solutions",
    provider: {
      name: "Clickmasters Digital Marketing",
      url: "https://clickmastersdigitalmarketing.com",
      logo: "https://clickmastersdigitalmarketing.com/logo.png"
    },
    areaServed: ["US", "UK", "UAE", "PK"]
  },

  FAQPage: {
    items: [
      "How do I know if my business is ready to move to the cloud?",
      "How much can cloud migration reduce my infrastructure costs?",
      "What is the difference between cloud migration and cloud-native development?",
      "How long does a cloud migration take?",
      "Which cloud provider should I use  AWS, GCP, or Azure?",
      "What is FinOps and why does my business need it?",
      "Do you provide ongoing cloud management after migration?",
      "How do you ensure cloud security during and after migration?"
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
        name: "Cloud Solutions",
        url: "https://clickmastersdigitalmarketing.com/cloud-solutions-services/"
      }
    ]
  }
}
};