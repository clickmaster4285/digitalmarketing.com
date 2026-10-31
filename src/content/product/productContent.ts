export type ProductImage = {
  src: string;
  alt: string;
  caption?: string;
  type: "dashboard" | "screenshot" | "mockup";
};

export type ProductFeature = {
  title: string;
  description: string;
  icon?: string;
};

export type ProductHighlight = {
  label: string;
  value: string;
};

export type CodeSnippet = {
  id: string;
  title: string;
  description: string;
  language: "ts" | "tsx" | "js" | "jsx" | "css" | "json" | "bash" | "sql";
  file: string;
  code: string;
};

export type ProductContent = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  category: string;
  badge: string;
  icon: string; // ✅ string key, resolved client-side
  accent: string;
  overview: string;
  longDescription: string;
  highlights: ProductHighlight[];
  images: ProductImage[];
  features: ProductFeature[];
  codeSnippets?: CodeSnippet[]; // ← new
  modules: { title: string; items: string[] }[];
  techStack: string[];
  useCases: { title: string; description: string }[];
  ctaHeading: string;
  ctaDescription: string;
  demoUrl?: string;
};

// ────────────────────────────────────────────────────────────────────────────
// PRODUCT 1 — Real-Estate Management System (UI Kit)
// ────────────────────────────────────────────────────────────────────────────
const realEstate: ProductContent = {
  slug: "real-estate-management-system",
  name: "Real-Estate Management System",
  shortName: "Real-Estate UI Kit",
  tagline: "A complete UI kit for modern property management and agent portals.",
  category: "Property & Real Estate",
  badge: "UI Kit",
  icon: "Home",
  accent: "from-violet-600 to-indigo-700",
  overview:
    "A production-ready UI kit built for real estate agencies, property managers, and individual agents. It includes polished screens for agents, projects, analytics, and reporting — everything you need to manage properties and teams effectively.",
  longDescription:
    "The Real-Estate Management System UI Kit gives your team a fully designed system of dashboards, agent directories, project tracking, and detailed analytics. Every component is built with modern, accessible design tokens so you can ship a real estate management MVP in days instead of months. Whether you're building an agency portal or an internal property CRM, this kit gives you the exact screens and states you need.",
  highlights: [
    { label: "Screens Included", value: "48+" },
    { label: "Components", value: "120+" },
    { label: "Design Tokens", value: "Light + Dark" },
    { label: "Figma + Code", value: "Ready" },
  ],
  images: [
    {
      src: "/products/real-estate-cover.png",
      alt: "Real-Estate Management System cover",
      caption: "Complete Estate Management System",
      type: "dashboard",
    },
    {
      src: "/products/real-estate-dashboard.png",
      alt: "Real-Estate admin dashboard",
      caption: "Dashboard overview with revenue and analytics",
      type: "screenshot",
    },
    {
      src: "/products/real-estate-agents-team.png",
      alt: "Agents and team directory",
      caption: "Agents & Team directory",
      type: "screenshot",
    },
    {
      src: "/products/real-estate-projects.png",
      alt: "Property projects list",
      caption: "Projects and property listings",
      type: "screenshot",
    },
    {
      src: "/products/real-estate-analytics.png",
      alt: "Analytics and charts view",
      caption: "Analytics with sales and lead charts",
      type: "screenshot",
    },
    {
      src: "/products/real-estate-reports.png",
      alt: "Reports and document management",
      caption: "Reports and document management",
      type: "screenshot",
    },
  ],
  features: [
    {
      title: "Agent Management",
      description:
        "Dedicated directory for agents with profiles, active projects, and performance metrics.",
    },
    {
      title: "Project Tracking",
      description:
        "Visual cards for property listings and development projects with status updates.",
    },
    {
      title: "Analytics Dashboard",
      description:
        "In-depth charts for revenue, lead conversion, and team performance.",
    },
    {
      title: "Reports & Documents",
      description:
        "Centralized hub for generating and managing property and financial reports.",
    },
    {
      title: "Lead Tracking",
      description:
        "Track incoming inquiries and assign them to specific agents.",
    },
    {
      title: "Property Listings",
      description:
        "Beautiful listing cards with gallery, price, location, and status badges.",
    },
    {
      title: "Task Management",
      description:
        "Assign tasks to agents and track their progress across different properties.",
    },
    {
      title: "Role-Based Access",
      description:
        "Secure login for admins, managers, and agents with tailored views.",
    },
  ],
  modules: [
    {
      title: "Management",
      items: ["Dashboard", "Agents & Team", "Projects", "Reports"],
    },
    {
      title: "Analytics",
      items: ["Revenue", "Lead Conversion", "Agent Performance", "Traffic"],
    },
    {
      title: "Admin",
      items: ["User Roles", "Settings", "Billing", "Integrations"],
    },
  ],
  techStack: ["Next.js", "React", "Tailwind CSS", "Figma", "TypeScript", "Framer Motion"],
  useCases: [
    {
      title: "PropTech Startups",
      description: "Launch your MVP with a polished, investor-ready interface in weeks.",
    },
    {
      title: "Agencies & Brokerages",
      description: "Ship an internal CRM and public listing site with one consistent UI system.",
    },
    {
      title: "Marketplaces",
      description: "Use as the foundation for a multi-agent property marketplace.",
    },
  ],
  codeSnippets: [
    {
      id: "agent-card",
      title: "Agent Profile Card",
      description:
        "The primary card component used in the Agents & Team directory. It cleanly displays the agent's avatar, contact info, and current performance metric, allowing managers to quickly scan their team.",
      language: "tsx",
      file: "components/AgentCard.tsx",
      code: `type Agent = {
  name: string;
  role: string;
  avatarUrl: string;
  activeProjects: number;
  email: string;
};

export function AgentCard({ agent }: { agent: Agent }) {
  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <img
          src={agent.avatarUrl}
          alt={agent.name}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold text-gray-900">{agent.name}</h3>
          <p className="text-sm text-gray-500">{agent.role}</p>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
        <span className="text-sm text-gray-500">Active Projects</span>
        <span className="font-medium text-indigo-600">{agent.activeProjects}</span>
      </div>
    </div>
  );
}`,
    },
    {
      id: "project-status",
      title: "Project Status Badge",
      description:
        "A visual indicator used in the Projects list to track the lifecycle of a property. It maps states like Planning, Active, and Sold to distinct colors, ensuring quick readability across the dashboard.",
      language: "tsx",
      file: "components/ProjectStatusBadge.tsx",
      code: `const STATUS_STYLES = {
  planning: "bg-gray-100 text-gray-700 ring-gray-200",
  active: "bg-blue-50 text-blue-700 ring-blue-200",
  "in-negotiation": "bg-amber-50 text-amber-700 ring-amber-200",
  sold: "bg-emerald-50 text-emerald-700 ring-emerald-200",
} as const;

type ProjectStatus = keyof typeof STATUS_STYLES;

export function ProjectStatusBadge({
  status,
}: {
  status: ProjectStatus;
}) {
  return (
    <span
      className={\`inline-flex items-center rounded-full px-2.5 py-0.5
        text-xs font-medium ring-1 ring-inset \${STATUS_STYLES[status]}\`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
    </span>
  );
}`,
    },
  ],
  ctaHeading: "Manage your properties effortlessly",
  ctaDescription:
    "Get the full Real-Estate UI Kit with agent directories, project tracking, and analytics dashboards.",
  demoUrl: "/contact",
};
// ────────────────────────────────────────────────────────────────────────────
// PRODUCT 2 — Car Services Website & Management System (UI Kit)
// ────────────────────────────────────────────────────────────────────────────
const carServices: ProductContent = {
  slug: "car-services-management-system",
  name: "Car Services Website & Management System",
  shortName: "Car Services UI Kit",
  tagline: "Everything you need to run a modern auto service business online.",
  category: "Automotive & Services",
  badge: "UI Kit",
  icon: "Car",
  accent: "from-red-600 to-rose-700",
  overview:
    "A complete UI kit for auto repair shops, car washes, detailing studios, and roadside assistance businesses. Includes service catalog management, booking schedules, project tracking, and a comprehensive customer dashboard.",
  longDescription:
    "The Car Services Management System UI Kit is a complete interface library for automotive service businesses. From a professional customer portal to a powerful staff management dashboard, every screen is designed with the workflow of a real auto shop in mind. Manage bookings, track ongoing projects, and oversee service inventory all from one unified interface.",
  highlights: [
    { label: "Screens Included", value: "42+" },
    { label: "Components", value: "110+" },
    { label: "Booking Flow", value: "Included" },
    { label: "Admin Panel", value: "Included" },
  ],
  images: [
    {
      src: "/products/car-services-cover.png",
      alt: "Apex Studio Car Services cover",
      caption: "Complete Car Services Management System",
      type: "dashboard",
    },
    {
      src: "/products/car-services-dashboard.png",
      alt: "Service center dashboard with charts",
      caption: "Dashboard overview with revenue and active jobs",
      type: "screenshot",
    },
    {
      src: "/products/car-services-booking-management.png",
      alt: "Booking management list",
      caption: "Booking Management & scheduling",
      type: "screenshot",
    },
    {
      src: "/products/car-services-projects.png",
      alt: "Projects and job tracking",
      caption: "Project tracking and vehicle status",
      type: "screenshot",
    },
    {
      src: "/products/car-services-service-management.png",
      alt: "Service catalog management",
      caption: "Service Management with visual cards",
      type: "screenshot",
    },
    {
      src: "/products/car-services-customer-management.png",
      alt: "Customer database list",
      caption: "Customer Management & profiles",
      type: "screenshot",
    },
  ],
  features: [
    {
      title: "Booking Management",
      description:
        "Comprehensive view of all upcoming and past appointments with status tracking.",
    },
    {
      title: "Service Catalog",
      description:
        "Visual management of service packages, pricing, and estimated duration.",
    },
    {
      title: "Project Tracking",
      description:
        "Monitor ongoing vehicle jobs with kanban-style status updates and images.",
    },
    {
      title: "Customer Profiles",
      description:
        "View full customer history, contact details, and associated vehicles.",
    },
    {
      title: "Technician Assignment",
      description:
        "Assign mechanics to specific jobs and track their daily capacity.",
    },
    {
      title: "Invoicing & Payments",
      description:
        "Generate invoices, accept cards online, and send receipts automatically.",
    },
    {
      title: "Vehicle Profiles",
      description:
        "Store make, model, VIN, mileage, and service history for each customer vehicle.",
    },
    {
      title: "Admin Dashboard",
      description:
        "Revenue, upcoming jobs, and staff performance at a glance.",
    },
  ],
  modules: [
    {
      title: "Management",
      items: ["Dashboard", "Bookings", "Projects", "Customers"],
    },
    {
      title: "Operations",
      items: ["Services", "Technicians", "Inventory", "Invoicing"],
    },
    {
      title: "Customer Portal",
      items: ["My bookings", "Vehicle profiles", "Invoices", "History"],
    },
  ],
  techStack: ["Next.js", "React", "Tailwind CSS", "Figma", "TypeScript"],
  useCases: [
    {
      title: "Auto Repair Shops",
      description: "Digitize booking, job tracking, and customer communication.",
    },
    {
      title: "Car Wash & Detailing",
      description: "Sell service packages and manage walk-ins with a clean booking UI.",
    },
    {
      title: "Roadside Assistance",
      description: "Rapid dispatch UI with live ETA screens and driver views.",
    },
  ],
  codeSnippets: [
    {
      id: "booking-status",
      title: "Booking Status Badge",
      description:
        "A clear, color-coded indicator for the Booking Management list. It maps statuses like Scheduled, In Progress, and Completed to distinct colors, helping shop managers track daily workflow at a glance.",
      language: "tsx",
      file: "components/BookingStatusBadge.tsx",
      code: `const STATUS_STYLES = {
  scheduled: "bg-blue-50 text-blue-700 ring-blue-200",
  "in-progress": "bg-amber-50 text-amber-700 ring-amber-200",
  completed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  cancelled: "bg-red-50 text-red-700 ring-red-200",
} as const;

type BookingStatus = keyof typeof STATUS_STYLES;

export function BookingStatusBadge({
  status,
}: {
  status: BookingStatus;
}) {
  return (
    <span
      className={\`inline-flex items-center rounded-full px-2.5 py-0.5
        text-xs font-medium ring-1 ring-inset \${STATUS_STYLES[status]}\`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
    </span>
  );
}`,
    },
    {
      id: "service-card-data",
      title: "Service Catalog Data Shape",
      description:
        "The typed data structure powering the visual Service Management cards. It ensures that every service package includes the necessary details for both the admin panel and the customer booking flow.",
      language: "ts",
      file: "types/service.ts",
      code: `export type ServicePackage = {
  id: string;
  title: string;
  description: string;
  price: number;
  estimatedDuration: number; // in minutes
  imageUrl: string;
  category: "repair" | "maintenance" | "detailing" | "wash";
};

// Example usage in the Service Management grid
const services: ServicePackage[] = [
  {
    id: "srv_01",
    title: "Full Synthetic Oil Change",
    description: "Includes up to 5 quarts of synthetic oil and filter replacement.",
    price: 89.99,
    estimatedDuration: 30,
    imageUrl: "/images/services/oil-change.jpg",
    category: "maintenance",
  },
  // ... additional services
];`,
    },
  ],
  ctaHeading: "Launch your auto service brand online",
  ctaDescription:
    "Get the full Car Services UI Kit with booking management, project tracking, and admin screens — ready to build on.",
  demoUrl: "/contact",
};

// ────────────────────────────────────────────────────────────────────────────
// PRODUCT 3 — POS Supermarket (UI Kit)
// ────────────────────────────────────────────────────────────────────────────
const posSupermarket: ProductContent = {
  slug: "pos-supermarket",
  name: "POS Supermarket",
  shortName: "Supermarket POS UI Kit",
  tagline: "A modern point-of-sale UI kit for supermarkets and grocery stores.",
  category: "Retail & POS",
  badge: "UI Kit",
  icon: "Store",
  accent: "from-orange-500 to-red-600",
  overview:
    "A clean, fast point-of-sale interface built for supermarket checkout, inventory, and daily operations. Optimized for touch, barcode scanners, and multi-register setups.",
  longDescription:
    "The POS Supermarket UI Kit provides every screen a modern grocery store needs: a fast touch-optimized checkout, customer database, visual inventory management, and a manager dashboard for daily sales and analytics.",
  highlights: [
    { label: "Screens Included", value: "38+" },
    { label: "Components", value: "95+" },
    { label: "Touch-Optimized", value: "Yes" },
    { label: "Multi-Register", value: "Supported" },
  ],
  images: [
    {
      src: "/products/pos-supermarket-cover.png",
      alt: "Supermarket POS UI Kit cover",
      caption: "Complete Supermarket Management UI Kit",
      type: "dashboard",
    },
    {
      src: "/products/pos-supermarket-dashboard.png",
      alt: "Supermarket dashboard with charts",
      caption: "Dashboard with daily sales & top products",
      type: "screenshot",
    },
    {
      src: "/products/pos-supermarket-pos.png",
      alt: "Point of sale product entry",
      caption: "Fast POS and checkout system",
      type: "screenshot",
    },
    {
      src: "/products/pos-supermarket-inventory.png",
      alt: "Inventory management list",
      caption: "Inventory & stock alerts",
      type: "screenshot",
    },
    {
      src: "/products/pos-supermarket-customer-database.png",
      alt: "Customer database list",
      caption: "Customer database & profiles",
      type: "screenshot",
    },
    {
      src: "/products/pos-supermarket-sales-summary.png",
      alt: "Sales summary and analytics",
      caption: "Sales summary & analytics",
      type: "screenshot",
    },
  ],
  features: [
    {
      title: "Touch Checkout",
      description:
        "Large tap targets, quick-add tiles, and a numeric keypad built for speed at the counter.",
    },
    {
      title: "Barcode Support",
      description:
        "Scanner-first input flow with fallback manual entry and instant product lookup.",
    },
    {
      title: "Customer Database",
      description:
        "Manage customer profiles, purchase history, and loyalty points.",
    },
    {
      title: "Inventory Management",
      description:
        "Real-time stock counts, low-stock alerts, and reorder suggestions.",
    },
    {
      title: "Sales Summary",
      description:
        "Detailed revenue reports, top products, and daily breakdowns.",
    },
    {
      title: "Discounts & Promos",
      description:
        "Apply item-level or cart-level discounts, coupons, and loyalty points.",
    },
    {
      title: "Manager Dashboard",
      description:
        "Daily sales, top products, cashier performance, and till reconciliation.",
    },
    {
      title: "Returns & Refunds",
      description:
        "Quick return flow with reason codes, partial refunds, and receipt lookup.",
    },
  ],
  modules: [
    {
      title: "Register",
      items: ["Checkout", "POS Entry", "Payment", "Receipt", "Hold/Resume"],
    },
    {
      title: "Back Office",
      items: ["Products", "Inventory", "Customers", "Users & roles"],
    },
    {
      title: "Reports",
      items: ["Dashboard", "Sales Summary", "Top products", "Till close"],
    },
  ],
  techStack: ["Next.js", "React", "Tailwind CSS", "Figma", "TypeScript"],
  useCases: [
    {
      title: "Supermarkets",
      description: "Speed-first checkout for high-volume grocery environments.",
    },
    {
      title: "Convenience Stores",
      description: "Compact layout for smaller footprints and single-cashier shifts.",
    },
    {
      title: "Multi-Branch Retail",
      description: "Central inventory with per-register sales and stock alerts.",
    },
  ],
  codeSnippets: [
    {
      id: "pos-cart-total",
      title: "POS Cart Total Calculator",
      description:
        "The core math behind the Point of Sale module. It handles line items, quantities, and calculates the subtotal and final total, ensuring quick and accurate checkout processing for cashiers.",
      language: "ts",
      file: "lib/pos/calculateTotal.ts",
      code: `type CartItem = {
  id: string;
  price: number;
  quantity: number;
};

export function calculateCartTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => {
    const lineTotal = item.price * item.quantity;
    return sum + lineTotal;
  }, 0);
}`,
    },
    {
      id: "inventory-status",
      title: "Inventory Stock Alert Badge",
      description:
        "A visual badge used in the Inventory list to quickly flag items that need attention. It clearly distinguishes between healthy stock and items that are running low or completely out, helping managers restock in time.",
      language: "tsx",
      file: "components/InventoryStatusBadge.tsx",
      code: `const STATUS_STYLES = {
  "in-stock": "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "low-stock": "bg-amber-50 text-amber-700 ring-amber-200",
  "out-of-stock": "bg-red-50 text-red-700 ring-red-200",
} as const;

type StockStatus = keyof typeof STATUS_STYLES;

export function InventoryStatusBadge({
  status,
}: {
  status: StockStatus;
}) {
  return (
    <span
      className={\`inline-flex items-center rounded-full px-2.5 py-0.5
        text-xs font-medium ring-1 ring-inset \${STATUS_STYLES[status]}\`}
    >
      {status.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
    </span>
  );
}`,
    },
  ],
  ctaHeading: "Speed up every checkout",
  ctaDescription:
    "Get a fast, touch-first POS UI kit with every screen your registers need — ready to wire to your backend.",
  demoUrl: "/contact",
};

// ────────────────────────────────────────────────────────────────────────────
// PRODUCT 4 — POS Pet Super Store (UI Kit)
// ────────────────────────────────────────────────────────────────────────────
const posPetStore: ProductContent = {
  slug: "pos-pet-super-store",
  name: "POS Pet Super Store",
  shortName: "Pet Super Store POS UI Kit",
  tagline: "A complete point-of-sale and management UI kit for pet super stores.",
  category: "Retail & POS",
  badge: "UI Kit",
  icon: "ShoppingCart",
  accent: "from-emerald-500 to-green-600",
  overview:
    "A unified point-of-sale and management system designed for large pet retail stores — integrating shop, pharmacy, hospital, and diagnostic workflows into one dashboard.",
  longDescription:
    "The POS Pet Super Store UI Kit is built for large pet retail environments that offer more than just products. It includes a fast POS for daily checkout, a comprehensive retail dashboard, and unified navigation to manage the Pet Shop, Pet Pharmacy, Pet Hospital, and Pet Diagnostics departments all from a single system.",
  highlights: [
    { label: "Screens Included", value: "40+" },
    { label: "Components", value: "100+" },
    { label: "Unified Modules", value: "Included" },
    { label: "POS System", value: "Built-in" },
  ],
  images: [
    {
      src: "/products/pos-pet-store-cover.png",
      alt: "Pet Super Store Management System cover",
      caption: "Complete Pet Super Store Management System",
      type: "dashboard",
    },
    {
      src: "/products/pos-pet-store-shop-dashboard.png",
      alt: "Pet shop dashboard with charts",
      caption: "Super Store Dashboard with revenue & metrics",
      type: "screenshot",
    },
    {
      src: "/products/pos-pet-store-pharmacy-dashboard.png",
      alt: "Pet pharmacy dashboard view",
      caption: "Integrated Pet Pharmacy module",
      type: "screenshot",
    },
    {
      src: "/products/pos-pet-store-hospital-dashboard.png",
      alt: "Pet hospital dashboard view",
      caption: "Integrated Pet Hospital module",
      type: "screenshot",
    },
    {
      src: "/products/pos-pet-store-diagnostics.png",
      alt: "Pet diagnostics dashboard view",
      caption: "Integrated Pet Diagnostics module",
      type: "screenshot",
    },
    {
      src: "/products/pos-pet-store-product-entry.png",
      alt: "Point of sale product entry",
      caption: "Fast POS and checkout system",
      type: "screenshot",
    },
  ],
  features: [
    {
      title: "Unified Dashboard",
      description:
        "Switch seamlessly between Shop, Pharmacy, Hospital, and Diagnostics modules.",
    },
    {
      title: "Point of Sale (POS)",
      description:
        "Lightning-fast product lookup and checkout for in-store purchases.",
    },
    {
      title: "Cross-Department Sales",
      description:
        "Process retail products, prescriptions, and services in a single transaction.",
    },
    {
      title: "Multi-Module Navigation",
      description:
        "A persistent sidebar for quick access to all super store operations.",
    },
    {
      title: "Pet Parent Profiles",
      description:
        "Link customers to their pets, purchase history, and medical records.",
    },
    {
      title: "Inventory Sync",
      description:
        "Real-time stock tracking across the shop, pharmacy, and hospital.",
    },
    {
      title: "Manager Analytics",
      description:
        "Sales by category, department utilization, and reorder alerts.",
    },
    {
      title: "Returns & Refunds",
      description:
        "Handle returns seamlessly across retail, pharmacy, and service line items.",
    },
  ],
  modules: [
    {
      title: "Super Store Modules",
      items: ["Pet Shop", "Pharmacy", "Hospital", "Diagnostics", "POS"],
    },
    {
      title: "Register",
      items: ["Checkout", "Service add-ons", "Receipts", "Returns"],
    },
    {
      title: "Reports",
      items: ["Dashboard", "Category sales", "Department metrics", "Till close"],
    },
  ],
  techStack: ["Next.js", "React", "Tailwind CSS", "Figma", "TypeScript"],
  useCases: [
    {
      title: "Pet Super Stores",
      description: "Run food, supplies, grooming, and medical services from one system.",
    },
    {
      title: "Pet Boutiques",
      description: "Smaller footprint with curated products and grooming services.",
    },
    {
      title: "Multi-Branch Pet Retail",
      description: "Central catalog with per-store service calendars.",
    },
  ],
  codeSnippets: [
    {
      id: "pos-product-entry",
      title: "POS Product Entry Item",
      description:
        "The primary row component for the POS product entry screen. It displays the product, handles quantity adjustments, and shows the real-time total for that line item before checkout.",
      language: "tsx",
      file: "components/POSProductRow.tsx",
      code: `export function POSProductRow({
  product,
  quantity,
  onUpdateQuantity,
}: {
  product: { name: string; price: number };
  quantity: number;
  onUpdateQuantity: (q: number) => void;
}) {
  return (
    <div className="flex items-center justify-between p-3 border-b border-gray-100">
      <div>
        <p className="font-medium text-sm text-gray-900">{product.name}</p>
        <p className="text-xs text-gray-500">\${product.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-3">
        <button 
          onClick={() => onUpdateQuantity(quantity - 1)}
          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50"
        >
          -
        </button>
        <span className="text-sm font-medium w-6 text-center">{quantity}</span>
        <button 
          onClick={() => onUpdateQuantity(quantity + 1)}
          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50"
        >
          +
        </button>
      </div>
    </div>
  );
}`,
    },
    {
      id: "dashboard-department-switcher",
      title: "Department Switcher Config",
      description:
        "The configuration array that powers the unified sidebar navigation. It maps the different super store modules (Shop, Pharmacy, Hospital, Diagnostics) to their respective routes and icons.",
      language: "ts",
      file: "lib/config/departments.ts",
      code: `import { Store, Pill, Stethoscope, ScanLine } from "lucide-react";

export const SUPER_STORE_DEPARTMENTS = [
  {
    id: "shop",
    name: "Pet Shop",
    icon: Store,
    route: "/dashboard/shop",
  },
  {
    id: "pharmacy",
    name: "Pharmacy",
    icon: Pill,
    route: "/dashboard/pharmacy",
  },
  {
    id: "hospital",
    name: "Hospital",
    icon: Stethoscope,
    route: "/dashboard/hospital",
  },
  {
    id: "diagnostics",
    name: "Diagnostics",
    icon: ScanLine,
    route: "/dashboard/diagnostics",
  },
] as const;`,
    },
  ],
  ctaHeading: "Run your super store from one system",
  ctaDescription:
    "Get the POS Pet Super Store UI Kit with unified modules, POS, and cross-department dashboards.",
  demoUrl: "/contact",
};

// ────────────────────────────────────────────────────────────────────────────
// PRODUCT 5 — Pet Shop (UI Kit)
// ────────────────────────────────────────────────────────────────────────────
const petShop: ProductContent = {
  slug: "pet-shop",
  name: "Pet Shop Management System",
  shortName: "Pet Shop UI Kit",
  tagline: "A complete management UI kit for pet shops, retail, and boutiques.",
  category: "Ecommerce & Retail",
  badge: "UI Kit",
  icon: "PawPrint",
  accent: "from-emerald-500 to-green-600",
  overview:
    "A comprehensive retail management UI kit for pet shops — covering inventory, POS, customers, orders, and cash management.",
  longDescription:
    "The Pet Shop UI Kit is a complete back-office system for pet retailers. From the fast-paced Point of Sale (POS) for daily checkouts to detailed inventory management, customer profiles, and daily cash flow reports, it's the ultimate operational toolkit for keeping a pet store running smoothly.",
  highlights: [
    { label: "Screens Included", value: "44+" },
    { label: "Components", value: "105+" },
    { label: "POS System", value: "Included" },
    { label: "Inventory", value: "Included" },
  ],
  images: [
    {
      src: "/products/pet-shop-cover.png",
      alt: "ClickMasters Dog Shop UI Kit cover",
      caption: "Complete Retail & Management UI Kit",
      type: "dashboard",
    },
    {
      src: "/products/pet-shop-dashboard.png",
      alt: "Pet shop admin dashboard with charts",
      caption: "Dashboard with revenue and active orders",
      type: "screenshot",
    },
    {
      src: "/products/pet-shop-customers-pet.png",
      alt: "Customers and pets directory",
      caption: "Customer profiles and pet details",
      type: "screenshot",
    },
    {
      src: "/products/pet-shop-inventory.png",
      alt: "Inventory management list",
      caption: "Inventory with stock levels and alerts",
      type: "screenshot",
    },
    {
      src: "/products/pet-shop-pos.png",
      alt: "Point of sale product entry",
      caption: "Fast POS and checkout system",
      type: "screenshot",
    },
    {
      src: "/products/pet-shop-cash-management.png",
      alt: "Cash management and daily revenue",
      caption: "Cash management tracking",
      type: "screenshot",
    },
  ],
  features: [
    {
      title: "Point of Sale (POS)",
      description:
        "Lightning-fast product lookup and checkout for in-store purchases.",
    },
    {
      title: "Inventory Management",
      description:
        "Real-time stock tracking with alerts for low items and expiry dates.",
    },
    {
      title: "Customers & Pets",
      description:
        "Unified directory linking pet owners with their pets' profiles and history.",
    },
    {
      title: "Order Management",
      description:
        "View, track, and process customer orders from a single dashboard.",
    },
    {
      title: "Cash Management",
      description:
        "Track daily revenue, expenses, and overall cash flow.",
    },
    {
      title: "Analytics Dashboard",
      description:
        "High-level metrics, revenue charts, and daily activity overview.",
    },
    {
      title: "Staff & Shifts",
      description:
        "Manage employee schedules and assign role-based access.",
    },
    {
      title: "Supplier Management",
      description:
        "Track vendors and automate reordering for popular stock.",
    },
  ],
  modules: [
    {
      title: "Management",
      items: ["Dashboard", "Customers & Pets", "Inventory", "Orders"],
    },
    {
      title: "Operations",
      items: ["POS", "Cash Management", "Staff", "Suppliers"],
    },
    {
      title: "Admin",
      items: ["Reports", "Store Settings", "Discounts", "Users"],
    },
  ],
  techStack: ["Next.js", "React", "Tailwind CSS", "Figma", "TypeScript"],
  useCases: [
    {
      title: "Independent Pet Shops",
      description: "Replace outdated registers with a modern POS and inventory system.",
    },
    {
      title: "Pet Boutiques",
      description: "Manage high-end inventory and loyal customer profiles.",
    },
    {
      title: "Small Pet Chains",
      description: "Standardize operations and track cash flow across locations.",
    },
  ],
  codeSnippets: [
    {
      id: "pos-cart-total",
      title: "POS Cart Total Calculator",
      description:
        "The core math behind the Point of Sale module. It handles line items, quantities, and calculates the subtotal and final total, ensuring quick and accurate checkout processing.",
      language: "ts",
      file: "lib/pos/calculateTotal.ts",
      code: `type CartItem = {
  id: string;
  price: number;
  quantity: number;
};

export function calculateCartTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => {
    const lineTotal = item.price * item.quantity;
    return sum + lineTotal;
  }, 0);
}`,
    },
    {
      id: "inventory-status",
      title: "Inventory Stock Alert Badge",
      description:
        "A visual badge used in the Inventory list to quickly flag items that need attention. It clearly distinguishes between healthy stock and items that are running low or completely out, helping shop owners restock in time.",
      language: "tsx",
      file: "components/InventoryStatusBadge.tsx",
      code: `const STATUS_STYLES = {
  "in-stock": "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "low-stock": "bg-amber-50 text-amber-700 ring-amber-200",
  "out-of-stock": "bg-red-50 text-red-700 ring-red-200",
} as const;

type StockStatus = keyof typeof STATUS_STYLES;

export function InventoryStatusBadge({
  status,
}: {
  status: StockStatus;
}) {
  return (
    <span
      className={\`inline-flex items-center rounded-full px-2.5 py-0.5
        text-xs font-medium ring-1 ring-inset \${STATUS_STYLES[status]}\`}
    >
      {status.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
    </span>
  );
}`,
    },
  ],
  ctaHeading: "Manage your pet shop with ease",
  ctaDescription:
    "Get the Pet Shop UI Kit with POS, inventory management, and customer profiles.",
  demoUrl: "/contact",
};

// ────────────────────────────────────────────────────────────────────────────
// PRODUCT 6 — Pet Pharmacy (UI Kit)
// ────────────────────────────────────────────────────────────────────────────
const petPharmacy: ProductContent = {
  slug: "pet-pharmacy",
  name: "Pet Pharmacy",
  shortName: "Pet Pharmacy UI Kit",
  tagline: "A trustworthy management UI kit for pet pharmacies and vet clinics.",
  category: "Healthcare & Ecommerce",
  badge: "UI Kit",
  icon: "Pill",
  accent: "from-emerald-500 to-green-600",
  overview:
    "A clean, trust-first pharmacy UI kit for managing pet medications, inventory, and point-of-sale operations — designed for vet clinics and pet pharmacies.",
  longDescription:
    "The Pet Pharmacy UI Kit is designed with the clarity and compliance a pharmacy system requires. It includes customer and pet profiles, inventory management, a fast point-of-sale interface, and detailed sales history. Everything is tuned for clinic staff who need to process orders and manage stock confidently.",
  highlights: [
    { label: "Screens Included", value: "40+" },
    { label: "Components", value: "98+" },
    { label: "POS System", value: "Included" },
    { label: "Inventory", value: "Included" },
  ],
  images: [
    {
      src: "/products/pet-pharmacy-cover.png",
      alt: "Pet Pharmacy dashboard overview",
      caption: "Pharmacy dashboard with sales and inventory overview",
      type: "dashboard",
    },
    {
      src: "/products/pet-pharmacy-customer-and-pets.png",
      alt: "Customers and pets directory",
      caption: "Customers & Pets — profiles and medication history",
      type: "screenshot",
    },
    {
      src: "/products/pet-pharmacy-inventory.png",
      alt: "Inventory management list",
      caption: "Inventory — stock levels, expiry dates, and alerts",
      type: "screenshot",
    },
    {
      src: "/products/pet-pharmacy-dashboard.png",
      alt: "Pharmacy operational dashboard",
      caption: "Dashboard — daily operations and active orders",
      type: "screenshot",
    },
    {
      src: "/products/pet-pharmacy-pos.png",
      alt: "Point of sale product entry",
      caption: "POS — fast product entry and checkout",
      type: "screenshot",
    },
    {
      src: "/products/pet-pharmacy-sales-history.png",
      alt: "Sales history and reports",
      caption: "Sales History — revenue, trends, and breakdowns",
      type: "screenshot",
    },
  ],
  features: [
    {
      title: "Customers & Pets",
      description:
        "Unified directory of pet owners and their pets with medical history.",
    },
    {
      title: "Inventory Management",
      description:
        "Real-time stock tracking with expiry alerts and reorder points.",
    },
    {
      title: "Point of Sale (POS)",
      description:
        "Fast product lookup and checkout tailored for clinic front desks.",
    },
    {
      title: "Sales History",
      description:
        "Detailed revenue reports, trends, and category breakdowns.",
    },
    {
      title: "Prescription Tracking",
      description:
        "Link medications directly to pet profiles with active status flags.",
    },
    {
      title: "Low Stock Alerts",
      description:
        "Visual indicators for items running low or nearing expiry.",
    },
    {
      title: "Trust Signals",
      description:
        "Licensing, pharmacy credentials, and support contacts built-in.",
    },
    {
      title: "Order Tracking",
      description:
        "Track completed and pending sales across the pharmacy.",
    },
  ],
  modules: [
    {
      title: "Management",
      items: ["Dashboard", "Customers", "Inventory", "Sales"],
    },
    {
      title: "Point of Sale",
      items: ["Checkout", "Product Lookup", "Cart", "Payment"],
    },
    {
      title: "Admin",
      items: ["Users", "Settings", "Reports", "Alerts"],
    },
  ],
  techStack: ["Next.js", "React", "Tailwind CSS", "Figma", "TypeScript"],
  useCases: [
    {
      title: "Online Pet Pharmacies",
      description: "Manage orders, inventory, and customers in one place.",
    },
    {
      title: "Vet Clinics",
      description: "Ship a fast POS and inventory system for the front desk.",
    },
    {
      title: "Pet Health Brands",
      description: "Track stock and sales for OTC supplies with ease.",
    },
  ],
  
  codeSnippets: [
    {
      id: "inventory-alert",
      title: "Inventory Stock Alert",
      description:
        "A precise component for flagging low stock or expiring medications. Instead of a generic table, it renders inline alerts based on the quantity remaining and the expiry date. Used in the Inventory module to keep clinic staff ahead of stockouts without overwhelming them.",
      language: "tsx",
      file: "components/InventoryStatusBadge.tsx",
      code: `const ALERT_STYLES = {
  "in-stock": "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "low-stock": "bg-amber-50 text-amber-700 ring-amber-200",
  "out-of-stock": "bg-red-50 text-red-700 ring-red-200",
  expiring: "bg-orange-50 text-orange-700 ring-orange-200",
} as const;

type StockStatus = keyof typeof ALERT_STYLES;

export function InventoryStatusBadge({
  status,
  quantity,
}: {
  status: StockStatus;
  quantity: number;
}) {
  return (
    <span
      className={\`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5
        text-xs font-medium ring-1 ring-inset \${ALERT_STYLES[status]}\`}
    >
      {status !== "in-stock" && (
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      )}
      {status === "low-stock" ? \`\${quantity} left\` : status.replace("-", " ")}
    </span>
  );
}`,
    },
    {
      id: "pos-cart-total",
      title: "POS Cart Total Calculator",
      description:
        "The logic driving the fast checkout flow in the POS module. It handles item quantities, applies tiered tax logic for medications, and calculates the final total. It's kept pure so it can be used both on the client cart and in the backend order creation endpoint.",
      language: "ts",
      file: "lib/pos/calculateTotal.ts",
      code: `type CartItem = {
  id: string;
  price: number;
  quantity: number;
  isMedication: boolean;
};

export function calculateCartTotal(
  items: CartItem[],
  taxRate: number = 0.08
): number {
  return items.reduce((sum, item) => {
    const lineTotal = item.price * item.quantity;
    
    // Medications might have different tax rules
    const appliedTax = item.isMedication ? 0 : taxRate;
    
    return sum + lineTotal * (1 + appliedTax);
  }, 0);
}`,
    },
  ],

  ctaHeading: "Manage your pharmacy with trust",
  ctaDescription:
    "Get the Pet Pharmacy UI Kit with full customer, inventory, and POS screens.",
  demoUrl: "/contact",
};

// ────────────────────────────────────────────────────────────────────────────
// PRODUCT 7 — Pet Diagnostics (UI Kit)
// ────────────────────────────────────────────────────────────────────────────
const petDiagnostics: ProductContent = {
  slug: "pet-diagnostics",
  name: "Pet Diagnostics",
  shortName: "Pet Diagnostics UI Kit",
  tagline: "A lab-grade UI kit for veterinary diagnostics and testing services.",
  category: "Healthcare & Diagnostics",
  badge: "UI Kit",
  icon: "ScanLine",
  accent: "from-emerald-500 to-green-600",
  overview:
    "A clinical, data-dense UI kit for veterinary diagnostic labs — from test ordering to sample tracking and result delivery — with clarity-first dashboards.",
  longDescription:
    "The Pet Diagnostics UI Kit is built for veterinary labs, in-clinic diagnostics, and at-home testing services. It covers test catalogs, patient diagnostics, cash management, and advanced reporting — with a clinical-but-friendly interface that both vets and lab admins can read.",
  highlights: [
    { label: "Screens Included", value: "42+" },
    { label: "Components", value: "110+" },
    { label: "Reports", value: "Included" },
    { label: "Charts", value: "Trend + Range" },
  ],
  images: [
    {
      src: "/products/pet-diagnostics-cover.png",
      alt: "Diagnostics and Lab Management UI Kit cover",
      caption: "Lab Management UI Kit overview",
      type: "dashboard",
    },
    {
      src: "/products/pet-diagnostics-diagnostics.png",
      alt: "Diagnostics test catalog with pricing",
      caption: "Test catalog with panels & pricing",
      type: "screenshot",
    },
    {
      src: "/products/pet-diagnostics-customers.png",
      alt: "Customers and pets directory",
      caption: "Customer and pet management",
      type: "screenshot",
    },
    {
      src: "/products/pet-diagnostics-dashboard.png",
      alt: "Pet shop diagnostics dashboard",
      caption: "Dashboard with revenue and active orders",
      type: "screenshot",
    },
    {
      src: "/products/pet-diagnostics-cash-management.png",
      alt: "Cash management and daily revenue",
      caption: "Cash management with daily revenue tracking",
      type: "screenshot",
    },
    {
      src: "/products/pet-diagnostics-reports-and-analytics.png",
      alt: "Reports and analytics view",
      caption: "Reports & Analytics with revenue charts",
      type: "screenshot",
    },
  ],
  features: [
    {
      title: "Test Catalog",
      description:
        "Panels, individual tests, and bundles with turnaround times and pricing.",
    },
    {
      title: "Patient Diagnostics",
      description:
        "Barcode-driven sample state tracking from collection to result.",
    },
    {
      title: "Result Dashboards",
      description:
        "Normal / abnormal highlighting with reference range bands.",
    },
    {
      title: "Trend Charts",
      description:
        "Historical trend lines per biomarker with range shading.",
    },
    {
      title: "Cash Management",
      description:
        "Track daily revenue, expenses, and cash flow directly in the admin panel.",
    },
    {
      title: "Reports & Analytics",
      description:
        "Detailed revenue graphs, category breakdowns, and shareable PDFs.",
    },
    {
      title: "At-Home Kits",
      description:
        "Kit order flow with registration, return labels, and status updates.",
    },
    {
      title: "Vet Notes",
      description:
        "Annotations and case notes attached to each result set.",
    },
  ],
  modules: [
    {
      title: "Diagnostics",
      items: ["Test Catalog", "Sample tracking", "Results", "Reports", "Reorder"],
    },
    {
      title: "Management",
      items: ["Dashboard", "Customers", "Cash Management", "Analytics"],
    },
    {
      title: "Lab Admin",
      items: ["Queue", "Samples", "Results entry", "Quality control"],
    },
  ],
  techStack: ["Next.js", "React", "Tailwind CSS", "Figma", "TypeScript", "Recharts"],
  useCases: [
    {
      title: "Veterinary Labs",
      description: "Modern ordering and result-delivery UI for clinic partners.",
    },
    {
      title: "In-Clinic Diagnostics",
      description: "In-house test ordering and result viewing for vets.",
    },
    {
      title: "At-Home Testing",
      description: "Ship at-home kits with registration and result portals.",
    },
  ],
  codeSnippets: [
    {
      id: "test-status-badge",
      title: "Diagnostic Status Badge",
      description:
        "A color-coded pill for tracking lab test progress. It maps specific states (completed, in-progress, pending) to distinct colors and icons. Used in the Diagnostics and Dashboard views to give lab technicians immediate visual feedback on sample status.",
      language: "tsx",
      file: "components/TestStatusBadge.tsx",
      code: `import { CheckCircle2, Clock, AlertCircle } from "lucide-react";

const STATUS_MAP = {
  completed: {
    style: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    icon: CheckCircle2,
  },
  "in-progress": {
    style: "bg-blue-50 text-blue-700 ring-blue-200",
    icon: Clock,
  },
  pending: {
    style: "bg-amber-50 text-amber-700 ring-amber-200",
    icon: AlertCircle,
  },
} as const;

type TestStatus = keyof typeof STATUS_MAP;

export function TestStatusBadge({ status }: { status: TestStatus }) {
  const config = STATUS_MAP[status];
  const Icon = config.icon;

  return (
    <span
      className={\`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5
        text-xs font-medium ring-1 ring-inset \${config.style}\`}
    >
      <Icon className="w-3.5 h-3.5" />
      {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
    </span>
  );
}`,
    },
    {
      id: "daily-cash-total",
      title: "Daily Cash Management Calculator",
      description:
        "The logic driving the Cash Management screen. It aggregates all transactions for the day, separates income from expenses, and calculates the net cash flow. Kept as a pure function so it can be reused across the dashboard widgets and the detailed financial reports.",
      language: "ts",
      file: "lib/finance/calculateDailyCash.ts",
      code: `type Transaction = {
  id: string;
  amount: number;
  type: "income" | "expense";
  category: string;
};

export function calculateDailyCash(transactions: Transaction[]) {
  return transactions.reduce(
    (acc, tx) => {
      if (tx.type === "income") {
        acc.income += tx.amount;
        acc.net += tx.amount;
      } else {
        acc.expenses += tx.amount;
        acc.net -= tx.amount;
      }
      return acc;
    },
    { income: 0, expenses: 0, net: 0 }
  );
}`,
    },
  ],
  ctaHeading: "Deliver diagnostics with clarity",
  ctaDescription:
    "Get the Pet Diagnostics UI Kit with sample tracking, cash management, and shareable reports.",
  demoUrl: "/contact",
};


// ────────────────────────────────────────────────────────────────────────────
// PRODUCT 8 — Pet Hospital (UI Kit)
// ────────────────────────────────────────────────────────────────────────────
const petHospital: ProductContent = {
  slug: "pet-hospital",
  name: "Pet Hospital",
  shortName: "Pet Hospital UI Kit",
  tagline: "A complete hospital UI kit for veterinary clinics and animal hospitals.",
  category: "Healthcare",
  badge: "UI Kit",
  icon: "Stethoscope",
  accent: "from-emerald-500 to-green-600",
  overview:
    "A comprehensive veterinary hospital UI kit covering patient profiles, cash management, billing, and settings — built for clinical staff and hospital administrators.",
  longDescription:
    "The Pet Hospital UI Kit is a complete design system for veterinary hospitals and clinics. It supports the full management journey: tracking patient profiles, managing daily cash flow, viewing hospital dashboards, and configuring store settings. Designed to keep clinical data legible and administrative tasks efficient.",
  highlights: [
    { label: "Screens Included", value: "56+" },
    { label: "Components", value: "140+" },
    { label: "Patient Profiles", value: "Included" },
    { label: "Billing", value: "Included" },
  ],
  images: [
    {
      src: "/products/pet-hospital-cover.png",
      alt: "Pet Hospital UI Kit cover",
      caption: "Hospital & Clinic Management UI Kit",
      type: "dashboard",
    },
    {
      src: "/products/pet-hospital-dashboard.png",
      alt: "Pet hospital dashboard with charts",
      caption: "Dashboard with revenue and active patients",
      type: "screenshot",
    },
    {
      src: "/products/pet-hospital-patients.png",
      alt: "Patients directory list",
      caption: "Patients list with status and contact info",
      type: "screenshot",
    },
    {
      src: "/products/pet-hospital-patient-profile.png",
      alt: "Patient profile detail view",
      caption: "Patient profile with medical history",
      type: "screenshot",
    },
    {
      src: "/products/pet-hospital-cash-management.png",
      alt: "Cash management and revenue",
      caption: "Cash management and daily revenue tracking",
      type: "screenshot",
    },
    {
      src: "/products/pet-hospital-settings.png",
      alt: "Store settings configuration",
      caption: "Store settings and configuration",
      type: "screenshot",
    },
  ],
  features: [
    {
      title: "Patient Profiles",
      description:
        "Comprehensive patient records with owner details, history, and status.",
    },
    {
      title: "Patient Directory",
      description:
        "Searchable list of all patients with quick access to profiles.",
    },
    {
      title: "Cash Management",
      description:
        "Track daily revenue, expenses, and cash flow directly in the admin panel.",
    },
    {
      title: "Hospital Dashboard",
      description:
        "High-level metrics, revenue charts, and daily activity overview.",
    },
    {
      title: "Store Settings",
      description:
        "Configure hospital details, payment methods, and operational settings.",
    },
    {
      title: "Billing & Invoices",
      description:
        "Generate invoices and track payments for treatments and products.",
    },
    {
      title: "Staff Access",
      description:
        "Role-based views for front-desk, vets, and administrators.",
    },
    {
      title: "Pet Parent Portal",
      description:
        "Allow owners to view basic records and manage appointments.",
    },
  ],
  modules: [
    {
      title: "Management",
      items: ["Dashboard", "Patients", "Cash Management", "Store Settings"],
    },
    {
      title: "Clinical",
      items: ["Patient Profiles", "Medical History", "Treatment Notes"],
    },
    {
      title: "Admin",
      items: ["Staff", "Billing", "Reports", "Settings"],
    },
  ],
  techStack: ["Next.js", "React", "Tailwind CSS", "Figma", "TypeScript"],
  useCases: [
    {
      title: "Veterinary Hospitals",
      description: "Full-stack clinic management UI from front desk to surgery.",
    },
    {
      title: "Animal Clinics",
      description: "Leaner workflows for smaller clinic teams.",
    },
    {
      title: "24/7 Emergency Vets",
      description: "Triage-first UI for emergency intake and handoffs.",
    },
  ],
  codeSnippets: [
    {
      id: "patient-status",
      title: "Patient Status Badge",
      description:
        "A clear, color-coded indicator for patient status in the directory. It maps conditions like Active, Critical, or Discharged to distinct colors, giving front-desk staff and vets an immediate visual cue without reading through rows of text.",
      language: "tsx",
      file: "components/PatientStatusBadge.tsx",
      code: `const STATUS_STYLES = {
  active: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  critical: "bg-red-50 text-red-700 ring-red-200",
  discharged: "bg-gray-50 text-gray-700 ring-gray-200",
  scheduled: "bg-blue-50 text-blue-700 ring-blue-200",
} as const;

type PatientStatus = keyof typeof STATUS_STYLES;

export function PatientStatusBadge({
  status,
}: {
  status: PatientStatus;
}) {
  return (
    <span
      className={\`inline-flex items-center rounded-full px-2.5 py-0.5
        text-xs font-medium ring-1 ring-inset \${STATUS_STYLES[status]}\`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}`,
    },
    {
      id: "invoice-total",
      title: "Invoice Total Calculator",
      description:
        "The core logic behind the Billing module. It sums up line items, applies any hospital-wide discounts, and calculates the final total with tax. Kept as a pure function so it can be used both in the UI and on the backend when generating the final receipt.",
      language: "ts",
      file: "lib/billing/calculateInvoice.ts",
      code: `type LineItem = {
  description: string;
  amount: number;
  quantity: number;
};

export function calculateInvoiceTotal(
  items: LineItem[],
  discountRate: number = 0,
  taxRate: number = 0.08
) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.amount * item.quantity,
    0
  );
  
  const discount = subtotal * discountRate;
  const taxableAmount = subtotal - discount;
  const tax = taxableAmount * taxRate;
  
  return {
    subtotal,
    discount,
    tax,
    total: taxableAmount + tax,
  };
}`,
    },
  ],
  ctaHeading: "Run your clinic from one UI kit",
  ctaDescription:
    "Get the Pet Hospital UI Kit with patient profiles, cash management, and store settings.",
  demoUrl: "/contact",
};

// ────────────────────────────────────────────────────────────────────────────
// PRODUCT 9 — GYM Management System (UI Kit)
// ────────────────────────────────────────────────────────────────────────────
const gymManagement: ProductContent = {
  slug: "gym-management-system",
  name: "GYM Management System",
  shortName: "Gym Management UI Kit",
  tagline: "A modern UI kit for gyms, fitness studios, and personal trainers.",
  category: "Fitness & SaaS",
  badge: "UI Kit",
  icon: "Dumbbell",
  accent: "from-lime-500 to-green-600",
  overview:
    "A complete gym management UI kit — memberships, class schedules, trainer bookings, attendance, and revenue dashboards — designed for gyms and fitness studios.",
  longDescription:
    "The GYM Management System UI Kit covers the full operations of a gym or fitness studio: member onboarding, membership plans, class bookings, trainer scheduling, attendance, payments, and growth analytics. Designed to be used by front desk, trainers, and owners with role-based views and clean dashboards.",
  highlights: [
    { label: "Screens Included", value: "50+" },
    { label: "Components", value: "125+" },
    { label: "Class Booking", value: "Included" },
    { label: "Trainer App", value: "Included" },
  ],


images: [
  {
    src: "/products/gym-management-cover.png",
    alt: "Gym management dashboard with revenue and active members overview",
    caption: "Gym dashboard — members, revenue & growth",
    type: "screenshot",
  },

    {
    src: "/products/gym-management-dashboard.png",
    alt: "Gym management dashboard with revenue and active members overview",
    caption: "Gym dashboard — members, revenue & growth",
    type: "screenshot",
  },


  {
    src: "/products/Diet-and-Plans.png",
    alt: "Diet and workout plan builder for gym members",
    caption: "Diet & plans — customized workout and nutrition programs",
    type: "screenshot",
  },
  {
    src: "/products/Gym-classes-and-Schedules.png",
    alt: "Gym class schedule with booking and capacity management",
    caption: "Classes & schedules — book, manage, and fill every session",
    type: "screenshot",
  },
  {
    src: "/products/gym-management-trainers.png",
    alt: "Trainer management view with schedules and client lists",
    caption: "Trainers — schedules, clients & session tracking",
    type: "screenshot",
  },
  {
    src: "/products/gym-management-members.png",
    alt: "Gym members directory with membership plans and status",
    caption: "Members — profiles, plans, and check-in history",
    type: "screenshot",    // ← was "mockup", this is a real screen
  },
],
codeSnippets: [
  {
    id: "membership-badge",
    title: "Membership Status Badge",
    description:
      "Colored status pill for member plans — active, paused, expiring, cancelled.",
    language: "tsx",
    file: "components/MembershipStatusBadge.tsx",
    code: `const STATUS_STYLES = {
  active: "bg-lime-100 text-lime-800 ring-lime-300",
  paused: "bg-amber-100 text-amber-800 ring-amber-300",
  expiring: "bg-orange-100 text-orange-800 ring-orange-300",
  cancelled: "bg-red-100 text-red-700 ring-red-300",
} as const;

type MembershipStatus = keyof typeof STATUS_STYLES;

export function MembershipStatusBadge({
  status,
}: {
  status: MembershipStatus;
}) {
  return (
    <span
      className={\`inline-flex items-center rounded-full px-2.5 py-0.5
        text-xs font-medium ring-1 ring-inset \${STATUS_STYLES[status]}\`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}`,
  },
  {
    id: "checkin-query",
    title: "Today's Check-ins Query",
    description:
      "Fetch today's attendance with member and class details — powers the front-desk check-in screen.",
    language: "ts",
    file: "lib/queries/checkins.ts",
    code: `import { db } from "@/lib/db";
import { startOfDay, endOfDay } from "date-fns";

export async function getTodayCheckins(gymId: string) {
  const now = new Date();

  return db.checkin.findMany({
    where: {
      gymId,
      checkedInAt: {
        gte: startOfDay(now),
        lte: endOfDay(now),
      },
    },
    include: {
      member: {
        select: { id: true, name: true, avatarUrl: true },
      },
      class: {
        select: { id: true, title: true, startsAt: true },
      },
    },
    orderBy: { checkedInAt: "desc" },
  });
}`,
  },
  {
    id: "class-capacity",
    title: "Class Capacity Meter",
    description:
      "Shows how full a class is and disables booking when the session is at capacity.",
    language: "tsx",
    file: "components/ClassCapacityMeter.tsx",
    code: `export function ClassCapacityMeter({
  booked,
  capacity,
}: {
  booked: number;
  capacity: number;
}) {
  const pct = Math.min(100, Math.round((booked / capacity) * 100));
  const isFull = booked >= capacity;

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">
          {booked} / {capacity} booked
        </span>
        <span className={isFull ? "text-red-600" : "text-muted-foreground"}>
          {isFull ? "Full" : \`\${pct}%\`}
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-muted">
        <div
          className={\`h-2 rounded-full \${isFull ? "bg-red-500" : "bg-lime-500"}\`}
          style={{ width: \`\${pct}%\` }}
        />
      </div>
    </div>
  );
}`,
  },

],



  features: [
    {
      title: "Memberships",
      description:
        "Plan tiers, add-ons, freeze/pause, and cancellation flows.",
    },
    {
      title: "Class Scheduling",
      description:
        "Weekly class calendar with capacity, waitlists, and instructor assignment.",
    },
    {
      title: "Trainer Bookings",
      description:
        "1:1 personal training booking with trainer availability and session packs.",
    },
    {
      title: "Attendance & Check-in",
      description:
        "QR, PIN, or manual check-in with real-time attendance dashboards.",
    },
    {
      title: "Payments",
      description:
        "Recurring billing, invoices, failed-payment recovery, and refunds.",
    },
    {
      title: "Member Portal",
      description:
        "Book classes, track workouts, and manage membership from mobile.",
    },
    {
      title: "Trainer App",
      description:
        "Client list, session notes, and program builder for trainers.",
    },
    {
      title: "Growth Analytics",
      description:
        "MRR, churn, retention cohorts, and class utilization.",
    },
  ],
  modules: [
    {
      title: "Member Portal",
      items: ["Dashboard", "Classes", "Trainer", "Billing", "Profile"],
    },
    {
      title: "Front Desk",
      items: ["Check-in", "Members", "Bookings", "Payments"],
    },
    {
      title: "Admin",
      items: ["Plans", "Classes", "Trainers", "Reports", "Settings"],
    },
    {
      title: "Trainer",
      items: ["Schedule", "Clients", "Session notes", "Programs"],
    },
  ],
  techStack: ["Next.js", "React", "Tailwind CSS", "Figma", "TypeScript"],
  useCases: [
    {
      title: "Gyms",
      description: "Run memberships, classes, and staff from one UI kit.",
    },
    {
      title: "Fitness Studios",
      description: "Class-first experience with waitlists and trainer bookings.",
    },
    {
      title: "Personal Trainers",
      description: "1:1 trainer app with client management and programs.",
    },
  ],
  ctaHeading: "Run your gym, not your spreadsheets",
  ctaDescription:
    "Get the GYM Management UI Kit with memberships, classes, trainer tools, and growth analytics.",
  demoUrl: "/contact",
};

// ────────────────────────────────────────────────────────────────────────────
// PRODUCT 10 — Restaurant Management Website & Management System (UI Kit)
// ────────────────────────────────────────────────────────────────────────────
const restaurantManagement: ProductContent = {
  slug: "restaurant-management-system",
  name: "Restaurant Management Website & Management System",
  shortName: "Restaurant Management UI Kit",
  tagline: "A full UI kit for restaurants — orders, reservations, kitchen, and staff.",
  category: "Food & Hospitality",
  badge: "UI Kit",
  icon: "UtensilsCrossed",
  accent: "from-orange-500 to-red-600",
  overview:
    "A complete restaurant management UI kit covering online ordering, reservations, menu management, messaging, and analytics for front-of-house and back-of-house teams.",
  longDescription:
    "The Restaurant Management UI Kit is a complete design system for modern restaurants. It covers the full operational journey: a beautifully visual menu builder, a robust reservation calendar, a direct messaging hub for staff and guests, detailed order tracking, and an owner analytics dashboard. Designed for real restaurant workflows: peak-hour speed, allergy notes, split bills, and staff coordination.",
  highlights: [
    { label: "Screens Included", value: "62+" },
    { label: "Components", value: "160+" },
    { label: "Messaging", value: "Included" },
    { label: "Reservations", value: "Included" },
  ],
  images: [
    {
      src: "/products/restaurant-cover.png",
      alt: "Savora Restaurant Management cover",
      caption: "Savora — Restaurant Management UI Kit",
      type: "dashboard",
    },
    {
      src: "/products/restaurant-dashboard.png",
      alt: "Restaurant dashboard with charts and live orders",
      caption: "Owner dashboard with live orders & revenue",
      type: "screenshot",
    },
    {
      src: "/products/restaurant-orders.png",
      alt: "Order management list and analytics",
      caption: "Order management and history",
      type: "screenshot",
    },
    {
      src: "/products/restaurant-calendar.png",
      alt: "Reservation calendar view",
      caption: "Reservations & table management calendar",
      type: "screenshot",
    },
    {
      src: "/products/restaurant-menu.png",
      alt: "Visual menu management",
      caption: "Menu management with visual items",
      type: "screenshot",
    },
    {
      src: "/products/restaurant-messages.png",
      alt: "Messaging interface for staff",
      caption: "Staff & customer messaging hub",
      type: "screenshot",
    },
  ],
  features: [
    {
      title: "Order Management",
      description:
        "Track live, completed, and cancelled orders with detailed revenue analytics.",
    },
    {
      title: "Reservation Calendar",
      description:
        "Visual month/week calendar for managing table bookings and party sizes.",
    },
    {
      title: "Menu Management",
      description:
        "Visual menu editor with photos, categories, allergens, and pricing.",
    },
    {
      title: "Direct Messaging",
      description:
        "Built-in chat interface for staff coordination and customer inquiries.",
    },
    {
      title: "Analytics Dashboard",
      description:
        "Revenue charts, top-selling items, and daily performance metrics.",
    },
    {
      title: "Staff & Shifts",
      description:
        "Roles, schedules, tip pooling, and shift handover notes.",
    },
    {
      title: "POS & Billing",
      description:
        "Split bills, tips, discounts, and receipt handling for peak hours.",
    },
    {
      title: "Website",
      description:
        "Beautiful marketing front-end to showcase the restaurant.",
    },
  ],
  modules: [
    {
      title: "Management",
      items: ["Dashboard", "Orders", "Menu", "Analytics"],
    },
    {
      title: "Operations",
      items: ["Calendar", "Messages", "POS", "Staff"],
    },
    {
      title: "Website",
      items: ["Home", "Menu", "Order online", "Reservations"],
    },
  ],
  techStack: ["Next.js", "React", "Tailwind CSS", "Figma", "TypeScript"],
  useCases: [
    {
      title: "Restaurants",
      description: "Run front-of-house and back-of-house from one UI kit.",
    },
    {
      title: "Cloud Kitchens",
      description: "Lean delivery-first flows with order tracking.",
    },
    {
      title: "Multi-Location Groups",
      description: "Central menu and per-location operations dashboards.",
    },
  ],
  codeSnippets: [
    {
      id: "order-status-badge",
      title: "Order Status Badge",
      description:
        "A color-coded pill for tracking order progress in the Orders and Dashboard views. It maps states (Completed, In Progress, Cancelled) to distinct colors and icons, giving staff an immediate visual cue during peak hours.",
      language: "tsx",
      file: "components/OrderStatusBadge.tsx",
      code: `import { CheckCircle2, Clock, XCircle } from "lucide-react";

const STATUS_MAP = {
  completed: {
    style: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    icon: CheckCircle2,
  },
  "in-progress": {
    style: "bg-orange-50 text-orange-700 ring-orange-200",
    icon: Clock,
  },
  cancelled: {
    style: "bg-red-50 text-red-700 ring-red-200",
    icon: XCircle,
  },
} as const;

type OrderStatus = keyof typeof STATUS_MAP;

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const config = STATUS_MAP[status];
  const Icon = config.icon;

  return (
    <span
      className={\`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5
        text-xs font-medium ring-1 ring-inset \${config.style}\`}
    >
      <Icon className="w-3.5 h-3.5" />
      {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
    </span>
  );
}`,
    },
    {
      id: "menu-item-price",
      title: "Menu Item Price Formatter",
      description:
        "The utility function used across the Menu and POS screens. It handles currency formatting, applies discounts safely, and ensures the visual menu always displays clean, localized pricing.",
      language: "ts",
      file: "lib/format/formatPrice.ts",
      code: `type MenuItem = {
  price: number;
  discountPercent?: number;
};

export function formatMenuItemPrice(
  item: MenuItem,
  currency: string = "USD",
  locale: string = "en-US"
): string {
  const finalPrice = item.discountPercent
    ? item.price * (1 - item.discountPercent / 100)
    : item.price;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(finalPrice);
}`,
    },
  ],
  ctaHeading: "Serve faster, operate smarter",
  ctaDescription:
    "Get the Restaurant Management UI Kit with ordering, reservations, messaging, and analytics.",
  demoUrl: "/contact",
};
// ────────────────────────────────────────────────────────────────────────────
// Registry
// ────────────────────────────────────────────────────────────────────────────
export const productContent: Record<string, ProductContent> = {
  [realEstate.slug]: realEstate,
  [carServices.slug]: carServices,
  [posSupermarket.slug]: posSupermarket,
  [posPetStore.slug]: posPetStore,
  [petShop.slug]: petShop,
  [petPharmacy.slug]: petPharmacy,
  [petDiagnostics.slug]: petDiagnostics,
  [petHospital.slug]: petHospital,
  [gymManagement.slug]: gymManagement,
  [restaurantManagement.slug]: restaurantManagement,
};

export const allProductSlugs = Object.keys(productContent);

export const getAllProducts = () => Object.values(productContent);

export const getProductBySlug = (slug: string): ProductContent | null =>
  productContent[slug] ?? null;