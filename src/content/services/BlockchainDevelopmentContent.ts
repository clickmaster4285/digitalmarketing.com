export const BlockchainDevelopmentContent = {
  slug: "blockchain-development-services",
  metadata: {
    url: "/blockchain-development-services/",
    keyword: "blockchain development company",
    volume: "4,400/mo",
    cpc: "$58.60",
    formula: "AIDA",
    author: "Amjad Khan",
  },
  hero: {
    tag: "[ Service ] Blockchain Development",
    title: "Blockchain Development Company",
    titleHighlight: "Build on Infrastructure That Cannot Be Tampered With",
    subtitle: "",
    description:
      "Expert blockchain development  smart contracts, DeFi, NFT platforms, enterprise Hyperledger & tokenisation. USA, UK & UAE. Free blockchain consultation.",
    stats: [
      { k: "$18M", v: "TVL reached in 6 months" },
      { k: "$4.2M", v: "NFT trading volume" },
      { k: "82%", v: "Fraud claim reduction" },
      { k: "10+ yrs", v: "Blockchain depth" },
    ],
  },
  intro: {
    problem: [
      { text: "Why Blockchain  The Specific Problems It Solves", type: "normal" }
    ],
    solution:
      "PROGRAMMABLE SETTLEMENTS WITHOUT INTERMEDIARIES\nTraditional financial transactions require trusted intermediaries at every step: correspondent banks for cross-border transfers, clearing houses for securities settlements, escrow agents for conditional transactions. Each intermediary adds time (days for international wire transfers, two days for securities settlement), cost (fees that aggregate to significant amounts at scale), and counterparty risk (the risk that the intermediary fails or acts against the parties' interests).\n\nSmart contracts  self-executing code deployed on a blockchain  can replace specific intermediary functions with programmable logic: the escrow that releases funds automatically when delivery is confirmed, the financial instrument that pays coupon automatically when the trigger condition is met, the trading platform that settles transactions between parties instantly without a clearing house. The commercial value of removing intermediary cost and settlement delay is enormous at scale  and blockchain is the only infrastructure that makes it technically possible.\n\nSUPPLY CHAIN PROVENANCE AND AUTHENTICITY\nSupply chains are trust problems: the retailer trusts the distributor's certificate of origin, which trusts the manufacturer's quality attestation, which trusts the raw material supplier's documentation. Each trust relationship is a potential fraud point  and a potential liability point when a product recall or quality incident requires tracing responsibility back through the chain.\n\nBlockchain supply chain solutions create an immutable provenance record: each event in the product's journey (manufacturing, quality testing, shipment, customs clearance, distribution) is recorded as a transaction on the blockchain, linked to the physical product via NFC chip or QR code, and verifiable by any party in the chain  or by the end consumer  without requiring access to any single party's proprietary records. The record cannot be altered by any participant in the chain without invalidating all subsequent records.\n\nDIGITAL OWNERSHIP AND TOKENISATION\nBlockchain enables a new category of asset: the digital asset with verifiable, transferable ownership that is enforced by cryptography rather than by legal contract. NFTs (Non-Fungible Tokens) extend this to unique digital assets  art, music, virtual real estate, in-game items  where ownership of the underlying digital file is a specific commercial proposition. Tokenisation extends it to real-world assets  real estate fractions, private equity shares, commodity inventories, intellectual property royalty streams  making illiquid assets divisible, tradeable, and accessible to investors who would not have the capital to purchase the underlying asset whole.",
    promise: "",
  },
  problem: {
    title: "Our Blockchain Development Services",
    titleHighlight: "",
    items: [],
    afterTitle: "",
    afterHighlight: "",
    afterItems: [],
  },
  services: [
    {
      n: "01",
      icon: "FileCode",
      tag: "Smart Contracts",
      title: "Smart Contract Development",
      intro: "",
      blocks: [
        {
          h: "ETHEREUM AND EVM-COMPATIBLE SMART CONTRACTS",
          p: "We develop smart contracts on Ethereum and EVM-compatible blockchains (Polygon, Arbitrum, Optimism, BNB Chain, Avalanche) in Solidity  the primary language for EVM smart contract development. Smart contracts on these networks are immutable once deployed and execute exactly as written, without possibility of censorship, modification, or downtime.\n\nOur smart contract development practice covers: ERC-20 token contracts (fungible tokens for utility tokens, governance tokens, stablecoins, and payment tokens), ERC-721 and ERC-1155 NFT contracts (non-fungible and semi-fungible token standards for digital collectibles, gaming assets, and tokenised real-world assets), custom DeFi contracts (automated market makers, lending protocols, staking systems, yield vaults, and the specific financial logic each protocol requires), multisig wallets (contracts requiring multiple key-holders to authorise transactions  for DAOs, treasuries, and multi-party escrow), and the access control and upgrade patterns (OpenZeppelin Ownable, AccessControl, UUPS proxy) that give smart contract systems the governance capability they need.",
        },
        {
          h: "SOLANA PROGRAMS",
          p: "For applications requiring high throughput and low transaction costs that Ethereum mainnet cannot cost-effectively provide, we develop Solana programs in Rust  the native language for Solana's Sealevel parallel smart contract execution environment. Solana processes tens of thousands of transactions per second at sub-cent fees, making it the appropriate choice for applications where transaction volume or cost sensitivity makes Ethereum mainnet or EVM Layer-2 networks insufficient.",
        },
        {
          h: "SMART CONTRACT SECURITY AND AUDITING",
          p: "Smart contracts are immutable once deployed  a bug in a deployed contract cannot be patched without deploying a new contract, and the window between a vulnerability's discovery and its exploitation is measured in minutes on public blockchains. We write smart contracts with security as the primary engineering concern: using OpenZeppelin's audited contract libraries for standard implementations (rather than reimplementing standard patterns with unaudited custom code), following established security patterns (checks-effects-interactions for reentrancy prevention, pull payments for safer Ether transfers, access control patterns for privileged functions), and testing against known attack vectors (reentrancy, integer overflow, front-running, flash loan attacks). Before production deployment, we recommend third-party security auditing from established smart contract security firms for contracts handling significant value.",
        },
      ],
    },
    {
      n: "02",
      icon: "Coins",
      tag: "DeFi",
      title: "DeFi Protocol Development",
      intro: "",
      blocks: [
        {
          h: "AUTOMATED MARKET MAKERS AND LIQUIDITY PROTOCOLS",
          p: "Decentralised exchanges and liquidity protocols are built on AMM (Automated Market Maker) mathematics  the constant product formula (x*y=k) of Uniswap v2, the concentrated liquidity model of Uniswap v3, the stableswap invariant of Curve, or custom invariants designed for the specific token pair dynamics of the protocol. We develop AMM protocols, liquidity pool contracts, and the peripheral contract infrastructure (router contracts, position managers, liquidity mining incentive systems) that production DeFi protocols require.",
        },
        {
          h: "LENDING AND BORROWING PROTOCOLS",
          p: "DeFi lending protocols  Aave, Compound, and their derivatives  implement the over-collateralised lending model: borrowers deposit collateral worth more than the loan they receive, enabling trustless lending without credit checks or legal recourse. We develop lending protocol contracts: the core lending pool logic, the interest rate model (utilisation-based dynamic interest rates), the collateral oracle integration (Chainlink price feeds for on-chain price data), and the liquidation mechanism (the contract that allows liquidators to repay a borrower's debt and claim their discounted collateral when the health factor falls below the liquidation threshold).",
        },
        {
          h: "STAKING AND YIELD PROTOCOLS",
          p: "We develop staking and yield farming contracts: the staking pools that reward token holders for locking their tokens (implementing the dividend-bearing staking model where stakers receive proportional rewards from protocol fees), the yield vault contracts that automatically compound rewards on behalf of depositors (implementing the ERC-4626 Tokenized Vault Standard for composability with the broader DeFi ecosystem), and the vesting contracts that implement the token release schedules for team allocations, investor tranches, and ecosystem incentive programmes.",
        },
      ],
    },
    {
      n: "03",
      icon: "Image",
      tag: "NFTs",
      title: "NFT Platform Development",
      intro: "",
      blocks: [
        {
          h: "NFT MINTING AND MARKETPLACE INFRASTRUCTURE",
          p: "We develop the complete technical infrastructure for NFT platforms: the NFT smart contracts (ERC-721 for unique assets, ERC-1155 for semi-fungible assets with multiple editions), the metadata infrastructure (IPFS storage for NFT metadata and media with Pinata or Web3.Storage pinning services for content persistence), the minting mechanism (public mints, allowlist mints with Merkle proof verification, Dutch auction mints, and reveal mechanics for generative collection launches), and the royalty implementation (ERC-2981 standard royalty interface for compatible marketplace royalty enforcement).",
        },
        {
          h: "NFT MARKETPLACE DEVELOPMENT",
          p: "We develop NFT marketplaces: the listing, bidding, and settlement contracts that facilitate peer-to-peer NFT trading with on-chain settlement, the royalty distribution that automatically pays creators at every secondary sale, the collection management interface for creators to manage their listings, and the buyer-facing marketplace UI with filtering, search, and collection analytics.",
        },
        {
          h: "GENERATIVE NFT COLLECTIONS",
          p: "For NFT collection launches with generative art  collections where each token's visual appearance is algorithmically generated from a combination of traits at mint time  we develop the complete technical stack: the trait definition system and rarity configuration, the generative art script (p5.js, Processing, or custom algorithms), the pre-reveal metadata system (deploying the collection with placeholder metadata before the reveal transaction updates metadata to the generated art), and the provenance hash (a cryptographic commitment to the entire pre-generated collection that prevents post-mint manipulation of the art assignment).",
        },
      ],
    },
    {
      n: "04",
      icon: "Network",
      tag: "Enterprise",
      title: "Enterprise Blockchain and Permissioned Networks",
      intro: "",
      blocks: [
        {
          h: "HYPERLEDGER FABRIC DEVELOPMENT",
          p: "For enterprise blockchain deployments where public blockchain's openness, gas costs, and regulatory exposure are inappropriate  supply chain tracking, interbank settlement, cross-organisational data sharing  Hyperledger Fabric provides a permissioned blockchain framework: a private network with known participants, configurable consensus, channel-based privacy (where subsets of network members share specific data without exposing it to all members), and chaincode (Fabric's smart contract equivalent, written in Go, Node.js, or Java).\n\nWe develop Hyperledger Fabric networks: the network configuration (organisations, peers, orderers, and the membership service provider that manages identities), the channel configuration (defining which organisations participate in which data sharing channels), the chaincode (the business logic that governs what transactions are valid and how ledger state is updated), and the off-chain integration layer (the backend services that submit transactions to the Fabric network on behalf of application users and query the ledger for reporting).",
        },
        {
          h: "CONSORTIUM BLOCKCHAIN SOLUTIONS",
          p: "For industry consortiums  groups of competing organisations that want to share specific data or settle specific transactions on a common ledger without trusting any individual member to control it  we design and implement consortium blockchain solutions. The specific governance model (how decisions about the network's rules are made when no single party controls it), the privacy architecture (which data each participant can see), and the integration with each participant's existing systems are the primary design concerns in consortium blockchain engagements.",
        },
      ],
    },
    {
      n: "05",
      icon: "Link",
      tag: "Tokenisation",
      title: "Tokenisation and Web3 Infrastructure",
      intro: "",
      blocks: [
        {
          h: "REAL WORLD ASSET TOKENISATION",
          p: "Tokenisation  representing ownership of a real-world asset as a blockchain token  is one of the most commercially significant emerging applications of blockchain technology. Real estate tokenisation enables fractional ownership of commercial or residential property with on-chain settlement. Private equity tokenisation enables secondary market liquidity for illiquid private company shares. Commodity tokenisation enables ownership transfer of physical gold, commodities, or inventory without physical settlement.\n\nWe develop tokenisation infrastructure: the legal-technical interface (the smart contract representing the ownership interest, connected to the legal instrument that gives it legal enforceability), the compliance layer (the transfer restriction logic that enforces the regulatory requirements of the specific asset class  accredited investor restrictions, transfer lock-ups, jurisdiction-specific constraints), the investor portal (the web application where investors manage their tokenised holdings, initiate transfers, and receive distributions), and the oracle integration (connecting on-chain token state to the off-chain events  rental income payments, dividend distributions  that trigger on-chain distribution transactions).",
        },
        {
          h: "WEB3 WALLET INTEGRATION AND USER EXPERIENCE",
          p: "Web3 applications present specific UX challenges: connecting to and managing multiple wallet types (MetaMask, WalletConnect, Coinbase Wallet, hardware wallets), handling transaction signing (the user flow from action initiation to wallet signature to blockchain confirmation), and communicating blockchain state to users in terms they understand (transaction pending, transaction confirmed, gas cost, confirmation time). We implement wallet integration using RainbowKit and wagmi (for EVM applications) or Solana wallet-adapter (for Solana), providing the clean wallet connection UX that reduces the friction between Web2-familiar users and Web3 applications.",
        },
      ],
    },
    {
      n: "06",
      icon: "Plug",
      tag: "Integration",
      title: "Blockchain Integration with Existing Systems",
      intro: "",
      blocks: [
        {
          h: "OFF-CHAIN/ON-CHAIN BRIDGES",
          p: "Most blockchain applications require data exchange between the blockchain and off-chain systems: reading off-chain data in smart contracts (oracle integrations), writing on-chain events to off-chain databases (event listener services), and integrating blockchain transactions with traditional backend systems (order management, ERP, CRM). We develop the off-chain/on-chain integration layer: Chainlink oracle integrations for bringing off-chain data on-chain, blockchain event indexing using The Graph (for efficient querying of historical on-chain events), and the backend services that listen to contract events and update off-chain databases in real time.",
        },
        {
          h: "PAYMENT AND CUSTODY INFRASTRUCTURE",
          p: "For businesses accepting cryptocurrency payments or managing digital asset custody, we integrate with established custody and payment infrastructure: Fireblocks for institutional-grade asset custody and transaction signing, Coinbase Commerce and BitPay for cryptocurrency payment acceptance, and the compliance tooling (Chainalysis, Elliptic) for AML/KYC compliance on blockchain transactions. We do not build custom custody infrastructure for new assets without the regulatory and security infrastructure that custody responsibility requires.",
        },
      ],
    },
  ],
  cases: [
    {
      tag: "Fintech · DeFi Protocol",
      metric: "$18M",
      sub: "TVL in 6 months · $340K protocol revenue",
      title: "Fintech startup  DeFi staking protocol reaches $18M TVL in 6 months.",
      body: "A DeFi protocol founder wanted to build a yield-optimising staking system on Arbitrum  a protocol that would accept deposits of major ERC-20 tokens, automatically route them to the highest-yielding underlying DeFi protocols (Aave, Compound, and Convex), and distribute the blended yield to stakers, taking a protocol fee on yield generated. The protocol needed to be composable with the broader DeFi ecosystem, upgradeable via a transparent proxy pattern, and audited before handling significant user funds.\n\nOur engagement: Solidity smart contract development on Arbitrum (vault contracts implementing ERC-4626, yield routing logic with configurable strategy allocation, governance-controlled fee parameters), Chainlink price feed integration for accurate USD-denominated TVL reporting, comprehensive Hardhat test suite covering all contract functions and known attack vectors, Foundry fuzzing tests for edge case discovery, and pre-launch audit preparation (documentation, test coverage reporting, and NatSpec documentation for the auditing firm).",
      result: "Protocol launched following third-party security audit. TVL reached $18M in 6 months, driven by competitive yields and the transparent, audited smart contract architecture that DeFi users require before depositing significant funds. The protocol's fee mechanism generated $340,000 in protocol revenue in its first 6 months. Zero security incidents in the first year of operation  the pre-launch audit investment and the comprehensive test suite preventing the vulnerabilities that have drained significant user funds from competitor protocols.",
    },
    {
      tag: "Gaming · NFT Platform",
      metric: "$4.2M",
      sub: "trading volume · 42K NFTs minted",
      title: "NFT gaming studio  blockchain game items with real secondary market generates $4.2M in trading volume.",
      body: "A Web3 gaming studio was building a fantasy sports game where player cards  representing real-world sports players with performance-based attributes  were NFTs that players could trade in a peer-to-peer marketplace. The design required: NFT contracts that could update player attribute metadata based on real-world performance data, a royalty mechanism that paid the studio at every secondary market trade, and a marketplace contract that enabled the peer-to-peer trading without requiring a centralised order book operator.\n\nOur engagement: ERC-1155 contracts for player card NFTs (supporting multiple editions of the same player card at different rarity tiers), a Chainlink oracle integration for updating on-chain player performance attributes with real-world sports data, the ERC-2981 royalty implementation for automatic secondary market royalty enforcement, a custom marketplace contract with on-chain order matching and Ether settlement, and the reveal mechanism for pack opening (players buy packs that reveal their cards in a single transaction using block hash entropy).",
      result: "42,000 NFTs minted in the first 6 months. Secondary market trading volume of $4.2M through the studio's own marketplace in the first year, generating $210,000 in royalty revenue at the 5% royalty rate. The blockchain-based card ownership was cited by the game's player community as the primary differentiator from competing fantasy sports games  the ability to trade, sell, and verify ownership of earned cards was the engagement mechanic that drove both retention and word-of-mouth acquisition.",
    },
    {
      tag: "Supply Chain · Consortium",
      metric: "82%",
      sub: "fraud claim reduction · $2.4M saved per incident",
      title: "Supply chain consortium  blockchain provenance system reduces fraud claims by 82%.",
      body: "A consortium of four competing food manufacturers needed a shared provenance system for their shared distribution network  a system where each manufacturer's products could be tracked from production through the shared distributor to retail, with tamper-evident records that could be verified in the event of a product recall or fraud claim.\n\nOur engagement: Hyperledger Fabric network with four-organisation configuration (one peer per manufacturer, one peer for the distributor, one ordering service), channel architecture providing manufacturer-specific confidentiality (each manufacturer's production data visible only to themselves and the distributor, not to competing manufacturers), Node.js chaincode implementing the provenance transaction logic, QR code integration enabling end-to-end product tracking from production batch to retail shelf, and the investigation portal enabling trace-back queries for quality incident response.",
      result: "The consortium deployed the network and completed the integration of all four manufacturers' production systems within 12 months. In the first 18 months of operation, fraudulent product recall claims  where claimants alleged contamination or quality failures that could not be verified or disproven in the old system  decreased by 82% as the tamper-evident provenance records enabled rapid verification of the claim's validity. One specific incident where a contamination claim was verified as fraudulent within 2 hours (using the blockchain provenance record to demonstrate the product had not passed through the alleged contamination point) saved the consortium an estimated $2.4M in recall and liability costs.",
    },
  ],
  why: [
    {
      icon: "Search",
      h: "Honest Use Case Assessment",
      p: "We have turned down blockchain development engagements where the client's use case did not genuinely require blockchain  where a well-designed traditional database or API would solve the problem faster, cheaper, and more reliably. We are not advocates for blockchain as a universal solution. We are advocates for blockchain as the right solution for the specific problems it is genuinely suited to, and we tell clients when their use case belongs in that category and when it does not.",
    },
    {
      icon: "Shield",
      h: "Security as the Primary Engineering Concern",
      p: "Smart contracts deployed on public blockchains are immediately targets for the global community of security researchers  and attackers. Every vulnerability in every publicly deployed contract is a potential exploit that could drain user funds within hours. We treat smart contract security as the primary engineering concern, not as a testing afterthought: established security patterns, OpenZeppelin audited libraries for standard implementations, comprehensive test suites including fuzz testing, and third-party audit coordination for contracts handling significant value.",
    },
    {
      icon: "Layers",
      h: "Full-Stack Web3 Capability",
      p: "Blockchain applications are not just smart contracts  they are smart contracts plus backend event processing plus web frontends plus wallet integration plus oracle feeds plus IPFS storage plus compliance tooling. We deliver the complete stack: the smart contracts, the off-chain indexing infrastructure, the frontend dApp, the wallet integration, and the integration layer that connects the Web3 components to any existing traditional systems.",
    },
    {
      icon: "Gavel",
      h: "Regulatory Awareness",
      p: "The regulatory landscape for blockchain and digital assets is evolving rapidly across all jurisdictions  the USA (SEC/CFTC frameworks for digital assets), UK (FCA treatment of crypto assets), UAE (VARA framework for virtual assets), and globally. We are not lawyers and do not provide legal advice, but we are aware of the regulatory dimensions of blockchain applications and flag the specific areas  token issuance, financial services, custody  where legal counsel is essential before building and where the technical design choices have regulatory implications.",
    },
  ],
  faqs: [
    {
      q: "What can blockchain development help my business with?",
      a: "Blockchain is genuinely valuable for: financial applications where settlement without intermediaries reduces cost and time, supply chain provenance where an immutable shared record prevents fraud and enables instant trace-back, digital ownership platforms where verifiable transferable ownership of digital or tokenised real-world assets has commercial value, smart contract-based financial instruments that execute automatically on pre-defined conditions, and governance systems where transparent, tamper-evident voting is required. If your use case does not require trustless execution, immutability, or decentralisation, a traditional database is almost certainly the better technical choice. We help clients make this assessment before recommending blockchain development.",
    },
    {
      q: "What blockchain platforms do you develop on?",
      a: "We develop primarily on Ethereum and EVM-compatible networks (Polygon, Arbitrum, Optimism, BNB Chain, Avalanche, Base) for public blockchain applications; Solana for high-throughput, low-cost public blockchain applications; Hyperledger Fabric for permissioned enterprise blockchain deployments; and we are actively developing capability on emerging networks (Aptos, Sui) as their ecosystems mature. Platform selection depends on the specific application's requirements: throughput, transaction cost, ecosystem maturity, regulatory considerations, and the existing user base in the target market.",
    },
    {
      q: "How much does blockchain development cost?",
      a: "A simple smart contract deployment (a single ERC-20 token or basic NFT contract) typically costs $8,000 to $25,000 including development, testing, and deployment. A DeFi protocol or NFT marketplace (multiple interdependent contracts with complex logic) typically costs $80,000 to $300,000. An enterprise blockchain solution (Hyperledger Fabric network with multiple organisations and custom chaincode) typically costs $150,000 to $500,000. These costs do not include third-party security audits (typically $15,000 to $100,000 depending on scope for public contracts), which we recommend for any contract handling significant user funds.",
    },
    {
      q: "How long does blockchain development take?",
      a: "A simple smart contract deployment typically takes 4-8 weeks including testing. A DeFi protocol or NFT marketplace typically takes 12-24 weeks. An enterprise blockchain solution typically takes 24-52 weeks depending on the network configuration complexity and the number of integration points with existing systems. Third-party security audits add 4-8 weeks to the deployment timeline for public contracts.",
    },
    {
      q: "Do you conduct smart contract security audits?",
      a: "We write contracts with security as the primary engineering concern and prepare audit-ready code (complete NatSpec documentation, comprehensive test coverage, known vulnerability mitigation). We coordinate with third-party security audit firms  Trail of Bits, OpenZeppelin Security, Quantstamp, and others  for the independent security review that production contracts handling significant user funds require. We do not claim to provide security audits ourselves  the independent review by specialist audit firms is a separate engagement that we facilitate and prepare for.",
    },
    {
      q: "Is blockchain development regulated?",
      a: "Regulatory treatment of blockchain applications varies significantly by jurisdiction and application type. Token issuance (particularly tokens with financial return characteristics) is closely scrutinised by securities regulators in the USA (SEC), UK (FCA), and other jurisdictions. Cryptocurrency custody and exchange activities are regulated financial services in most jurisdictions. NFT platforms and DeFi protocols occupy a regulatory grey area that is actively being clarified in multiple jurisdictions. We strongly recommend engaging specialist legal counsel before launching any public blockchain application, particularly any application involving token issuance, financial services, or digital asset custody.",
    },
    {
      q: "What is the difference between a public blockchain and a permissioned blockchain?",
      a: "A public blockchain (Ethereum, Solana, Bitcoin) is open  anyone can participate as a node, submit transactions, and read the ledger without permission. Public blockchains are genuinely decentralised and trustless, but transactions are visible to all participants (with pseudonymity rather than privacy), transaction costs are variable and sometimes high, and throughput is constrained by the consensus mechanism. A permissioned blockchain (Hyperledger Fabric, Quorum) restricts participation to known, authorised entities  providing more control, privacy, and performance but at the cost of the genuine decentralisation that makes public blockchains trustless. The choice depends on whether the application needs genuine decentralisation (public) or controlled participation with privacy (permissioned).",
    },
    {
      q: "How do I get started?",
      a: "Book a free blockchain consultation. We discuss your use case, assess whether blockchain is genuinely the right technical choice for your specific requirements, recommend the appropriate blockchain platform and architecture, and provide a scope and cost estimate. We will tell you honestly if your use case would be better served by a traditional technical approach. No commitment required at the consultation stage.",
    },
  ],
  cta: {
    title: "Ready to Build on Infrastructure That Cannot Be Tampered With?",
    description:
      "Blockchain development is not right for every problem. For the specific problems it is right for  trustless settlement, immutable provenance, programmable digital ownership, decentralised governance  it is the only adequate solution.\n\nIf your use case belongs in that category, we are the development partner who will build it correctly.",
    contactLink: "https://clickmastersdigitalmarketing.com/contact",
    whatsappLink: "https://wa.me/",
    softwareLink: "https://clickmastersdigitalmarketing.com/custom-software-development/",
  },
  footer: {
    company: "Clickmasters Digital Marketing",
    url: "https://clickmastersdigitalmarketing.com",
    email: "marketing@clickmastersdigitalmarketing.com",
    regions: "USA, UK, UAE, Pakistan, Canada, Australia",
    author: "Amjad Khan  CEO, Clickmasters Digital Marketing | Blockchain development specialist | 10+ years",
  },schema: {
  Service: {
    serviceType: "Blockchain Development",
    provider: {
      name: "Clickmasters Digital Marketing",
      url: "https://clickmastersdigitalmarketing.com",
      logo: "https://clickmastersdigitalmarketing.com/logo.png"
    },
    areaServed: ["US", "UK", "UAE", "PK"]
  },

  FAQPage: {
    items: [
      "What can blockchain development help my business with?",
      "What blockchain platforms do you develop on?",
      "How much does blockchain development cost?",
      "How long does blockchain development take?",
      "Do you conduct smart contract security audits?",
      "Is blockchain development regulated?",
      "What is the difference between a public blockchain and a permissioned blockchain?",
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
        name: "Blockchain Development",
        url: "https://clickmastersdigitalmarketing.com/blockchain-development-services/"
      }
    ]
  }
}
};