import {
  Building2,
  Factory,
  Home,
  Hotel,
  Landmark,
  ShieldCheck,
  Signal,
  Store,
  Warehouse,
  Wrench,
  ClipboardCheck,
  PhoneCall,
  Radio,
  Layers,
  Hospital,
  School,
  UtensilsCrossed,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------

export interface ServiceContent {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  icon: keyof typeof serviceIcons;
  highlights: string[];
  suitableFor: string[];
}

export const serviceIcons = {
  signal: Signal,
  home: Home,
  building: Building2,
  factory: Factory,
  warehouse: Warehouse,
  wrench: Wrench,
  survey: ClipboardCheck,
  radio: Radio,
};

export const services: ServiceContent[] = [
  {
    slug: "mobile-network-booster",
    name: "Mobile Network Booster",
    shortDescription:
      "End-to-end mobile network booster solutions engineered for your building.",
    description:
      "A mobile network booster picks up existing outdoor signal, amplifies it, and redistributes it indoors through a cabled antenna system. We assess your building's construction, existing signal strength and usage pattern before recommending a system, rather than selling a one-size-fits-all box.",
    icon: "signal",
    highlights: [
      "Site-specific system design",
      "Multi-network compatible options",
      "Professional cabling and antenna placement",
      "Post-installation signal verification",
    ],
    suitableFor: ["Home", "Office", "Commercial Building", "Industrial"],
  },
  {
    slug: "mobile-signal-booster-installation",
    name: "Mobile Signal Booster Installation",
    shortDescription:
      "Careful, code-aware installation from outdoor antenna to indoor coverage.",
    description:
      "Installation involves mounting an outdoor donor antenna where signal is strongest, routing low-loss cable to an amplifier unit, and distributing coverage through one or more indoor antennas. Our installers plan cable runs and antenna placement to minimise visual impact while maximising indoor coverage.",
    icon: "wrench",
    highlights: [
      "Structured cable routing",
      "Antenna placement planning",
      "Minimal disruption installation",
      "Testing across multiple indoor zones",
    ],
    suitableFor: ["Home", "Office", "Hotel", "Hospital", "Commercial Building"],
  },
  {
    slug: "4g-signal-booster",
    name: "4G Signal Booster",
    shortDescription:
      "Solutions targeting 4G voice and data coverage indoors.",
    description:
      "4G coverage indoors depends heavily on building material, distance from the nearest tower, and network congestion. A 4G-focused booster setup targets the specific frequency bands used for 4G LTE by your operator to improve indoor call quality and data reliability, subject to a proper site assessment.",
    icon: "radio",
    highlights: [
      "Frequency-band aware system selection",
      "Improved indoor voice and data reliability",
      "Suitable for concrete and glass-heavy buildings",
    ],
    suitableFor: ["Home", "Office", "Basement", "Commercial Building"],
  },
  {
    slug: "5g-signal-booster",
    name: "5G Signal Booster",
    shortDescription:
      "Assessment-led solutions for 5G-ready buildings and networks.",
    description:
      "5G compatibility depends on the frequency bands used by your operator in your specific locality and the capability of the booster hardware. We evaluate whether your building and location are suited to a 5G-capable system, and are transparent when a 4G-focused solution is the more reliable near-term option.",
    icon: "radio",
    highlights: [
      "Band-compatibility assessment",
      "Future-ready system recommendations",
      "Honest guidance on current 5G rollout limitations",
    ],
    suitableFor: ["Office", "Commercial Building", "Industrial"],
  },
  {
    slug: "home-signal-booster",
    name: "Home Signal Booster",
    shortDescription: "Compact solutions sized for apartments and independent homes.",
    description:
      "Homes typically need smaller, single-antenna systems that cover two to four rooms. We size the system to your apartment or house layout, keeping the outdoor antenna and cabling as unobtrusive as possible.",
    icon: "home",
    highlights: [
      "Compact indoor units",
      "Apartment and independent-home layouts",
      "Discreet cabling",
    ],
    suitableFor: ["Home"],
  },
  {
    slug: "office-signal-booster",
    name: "Office Signal Booster",
    shortDescription: "Coverage planning for open-plan offices and cabins.",
    description:
      "Offices bring challenges like partitioned cabins, meeting rooms and dense occupancy. We plan indoor antenna placement to cover work areas evenly, factoring in walls, server rooms and glass partitions.",
    icon: "building",
    highlights: [
      "Multi-zone coverage planning",
      "Meeting room and cabin coverage",
      "Minimal disruption to a working office",
    ],
    suitableFor: ["Office", "Commercial Building"],
  },
  {
    slug: "commercial-signal-booster",
    name: "Commercial Building Signal Booster",
    shortDescription: "Larger-area systems for malls, business centres and towers.",
    description:
      "Commercial buildings often need multi-antenna distributed systems, sometimes across multiple floors. We work with facility teams to plan cable risers, shared infrastructure and phased installation with minimal downtime.",
    icon: "building",
    highlights: [
      "Multi-floor distributed antenna planning",
      "Facility-team coordination",
      "Phased, low-disruption rollout",
    ],
    suitableFor: ["Commercial Building", "Hotel", "Hospital"],
  },
  {
    slug: "industrial-signal-booster",
    name: "Industrial & Warehouse Signal Booster",
    shortDescription: "Coverage solutions for large-span factories and warehouses.",
    description:
      "Factories and warehouses have large open spans, metal structures and machinery that can block signal. We recommend higher-gain systems and multiple indoor antennas positioned to cover work floors, control rooms and loading areas.",
    icon: "warehouse",
    highlights: [
      "Large open-span coverage planning",
      "Metal-structure signal assessment",
      "Control room and floor coverage",
    ],
    suitableFor: ["Factory", "Warehouse"],
  },
  {
    slug: "signal-booster-repair",
    name: "Signal Booster Repair & Maintenance",
    shortDescription: "Troubleshooting and upkeep for existing booster systems.",
    description:
      "If your existing signal booster system is underperforming, we diagnose whether the issue is with the outdoor antenna, cabling, amplifier unit, or a change in outdoor signal conditions, and recommend the appropriate fix or upgrade.",
    icon: "wrench",
    highlights: [
      "System diagnostics",
      "Cable and antenna inspection",
      "Amplifier servicing and replacement guidance",
    ],
    suitableFor: ["Home", "Office", "Commercial Building", "Industrial"],
  },
  {
    slug: "site-survey",
    name: "Site Survey & Consultation",
    shortDescription: "On-site signal assessment before any recommendation.",
    description:
      "Every project starts with understanding your building and current signal conditions. Our site survey measures outdoor and indoor signal strength across relevant bands and identifies the most practical booster configuration for your space.",
    icon: "survey",
    highlights: [
      "Outdoor and indoor signal measurement",
      "Building construction assessment",
      "Written recommendation before purchase",
    ],
    suitableFor: ["Home", "Office", "Factory", "Warehouse", "Hotel", "Hospital"],
  },
];

// ---------------------------------------------------------------------------
// Industries
// ---------------------------------------------------------------------------

export interface IndustryContent {
  slug: string;
  name: string;
  description: string;
  icon: keyof typeof industryIcons;
  intro: string;
  challenges: string[];
  relevantServiceSlugs: string[];
}

export const industryIcons = {
  home: Home,
  building: Building2,
  factory: Factory,
  warehouse: Warehouse,
  hotel: Hotel,
  hospital: Hospital,
  restaurant: UtensilsCrossed,
  store: Store,
  landmark: Landmark,
  school: School,
};

export const industries: IndustryContent[] = [
  {
    slug: "homes",
    name: "Homes",
    description: "Apartments, bungalows and residential societies.",
    icon: "home",
    intro:
      "Homes are usually the simplest properties to assess, but signal conditions still vary widely based on floor, orientation and building material.",
    challenges: [
      "Weak signal in inner rooms away from windows",
      "Thick concrete walls in older buildings",
      "Reduced coverage on ground and lower floors",
      "Basement parking or lower-ground utility areas",
    ],
    relevantServiceSlugs: ["home-signal-booster", "site-survey", "signal-booster-repair"],
  },
  {
    slug: "offices",
    name: "Offices",
    description: "Corporate offices, co-working spaces and business parks.",
    icon: "building",
    intro:
      "Offices combine partitioned cabins, meeting rooms, open floors and server rooms — each with different coverage needs during working hours.",
    challenges: [
      "Meeting rooms and cabins with poor reception",
      "Deep floor plates far from exterior walls",
      "Glass partitions affecting signal distribution",
      "Consistent coverage needed across all working hours",
    ],
    relevantServiceSlugs: ["office-signal-booster", "commercial-signal-booster", "site-survey"],
  },
  {
    slug: "factories",
    name: "Factories",
    description: "Manufacturing units with dense equipment and large floors.",
    icon: "factory",
    intro:
      "Factories present large open spans, metal machinery and structural elements that can significantly interfere with indoor signal propagation.",
    challenges: [
      "Metal structures and machinery blocking signal",
      "Large floor areas requiring wider coverage",
      "Control rooms needing dependable connectivity",
      "Distance from nearest mobile towers in industrial zones",
    ],
    relevantServiceSlugs: ["industrial-signal-booster", "site-survey", "signal-booster-repair"],
  },
  {
    slug: "warehouses",
    name: "Warehouses",
    description: "Storage and logistics facilities with wide open spans.",
    icon: "warehouse",
    intro:
      "Warehouses need coverage across long, open floor areas and loading zones, often with racking and stored goods affecting signal paths.",
    challenges: [
      "Long open spans exceeding standard indoor antenna range",
      "Racking and stored inventory blocking signal paths",
      "Loading dock and yard connectivity",
      "Handheld scanner and communication device reliability",
    ],
    relevantServiceSlugs: ["industrial-signal-booster", "site-survey"],
  },
  {
    slug: "hotels",
    name: "Hotels",
    description: "Guest rooms, lobbies and banquet areas.",
    icon: "hotel",
    intro:
      "Hotels need consistent coverage across guest rooms, lobbies, banquet halls and back-of-house areas, often across multiple floors.",
    challenges: [
      "Guest room coverage across many floors",
      "Banquet and event spaces with variable occupancy",
      "Basement and parking area connectivity",
      "Minimal visual impact on interior design",
    ],
    relevantServiceSlugs: ["commercial-signal-booster", "site-survey", "signal-booster-repair"],
  },
  {
    slug: "hospitals",
    name: "Hospitals",
    description: "Patient wards, OPDs and administrative blocks.",
    icon: "hospital",
    intro:
      "Hospitals require careful planning around patient wards, OPD areas and equipment-sensitive zones, coordinated with facility management.",
    challenges: [
      "Multi-floor ward coverage",
      "Coordination required around sensitive medical equipment areas",
      "Basement and diagnostic area connectivity",
      "Minimal disruption to ongoing hospital operations",
    ],
    relevantServiceSlugs: ["commercial-signal-booster", "site-survey"],
  },
  {
    slug: "restaurants",
    name: "Restaurants",
    description: "Dining areas, basements and semi-outdoor seating.",
    icon: "restaurant",
    intro:
      "Restaurants often span dining areas, basements and semi-outdoor seating, each with different exposure to outdoor signal.",
    challenges: [
      "Basement or lower-ground dining areas",
      "Semi-outdoor seating with inconsistent coverage",
      "Kitchen and service areas needing staff connectivity",
      "Compact spaces requiring discreet installation",
    ],
    relevantServiceSlugs: ["commercial-signal-booster", "site-survey"],
  },
  {
    slug: "retail-stores",
    name: "Retail Stores",
    description: "Showrooms, malls and multi-brand outlets.",
    icon: "store",
    intro:
      "Retail spaces need reliable coverage for both staff systems and customer connectivity, often within mall or multi-tenant environments.",
    challenges: [
      "Coverage within larger mall structures",
      "Point-of-sale and staff communication reliability",
      "Basement-level and lower-ground stores",
      "Coordination with mall management for installation",
    ],
    relevantServiceSlugs: ["commercial-signal-booster", "site-survey"],
  },
  {
    slug: "commercial-buildings",
    name: "Commercial Buildings",
    description: "Mixed-use towers and business centres.",
    icon: "landmark",
    intro:
      "Commercial towers often require multi-floor, multi-antenna systems planned in coordination with facility and building management teams.",
    challenges: [
      "Multi-floor distributed coverage",
      "Coordination with building facility management",
      "Shared infrastructure and cable riser planning",
      "Phased installation to minimise tenant disruption",
    ],
    relevantServiceSlugs: ["commercial-signal-booster", "site-survey"],
  },
  {
    slug: "schools-institutions",
    name: "Schools & Institutions",
    description: "Campuses, classrooms and administrative offices.",
    icon: "school",
    intro:
      "Educational campuses often span multiple buildings and floors, with administrative offices and classrooms needing dependable connectivity.",
    challenges: [
      "Multi-building campus coverage",
      "Classroom and administrative block connectivity",
      "Basement or ground-floor library and lab areas",
      "Installation scheduled around academic hours",
    ],
    relevantServiceSlugs: ["commercial-signal-booster", "site-survey"],
  },
];

// ---------------------------------------------------------------------------
// Product category highlights (homepage preview copy only).
// The full, admin-manageable catalog is served from the database on /products.
// ---------------------------------------------------------------------------

export const productHighlights = [
  {
    name: "Single-Network Indoor Booster",
    summary: "A compact, single-antenna system suited to homes and small offices.",
    propertyType: "Home, Small Office",
  },
  {
    name: "Multi-Network Distributed System",
    summary: "A multi-antenna system for offices and commercial floors needing wider coverage.",
    propertyType: "Office, Commercial Building",
  },
  {
    name: "High-Gain Industrial System",
    summary: "A higher-capacity system for large-span factories and warehouses.",
    propertyType: "Factory, Warehouse",
  },
];

// ---------------------------------------------------------------------------
// Network providers
// ---------------------------------------------------------------------------

export const networkProviders = [
  { slug: "jio", name: "Jio" },
  { slug: "airtel", name: "Airtel" },
  { slug: "vi", name: "Vi" },
  { slug: "bsnl", name: "BSNL" },
];

// ---------------------------------------------------------------------------
// How it works
// ---------------------------------------------------------------------------

export const howItWorks = [
  {
    step: 1,
    title: "Contact Us",
    description:
      "Share your location and property type through our form, WhatsApp or a phone call.",
    icon: PhoneCall,
  },
  {
    step: 2,
    title: "Signal Assessment",
    description:
      "We evaluate outdoor and indoor signal strength and understand your building's construction.",
    icon: ClipboardCheck,
  },
  {
    step: 3,
    title: "Recommended Solution",
    description:
      "You receive a site-specific system recommendation, not a generic package.",
    icon: Layers,
  },
  {
    step: 4,
    title: "Professional Installation",
    description:
      "Our team installs and tests the system across your indoor spaces before handover.",
    icon: ShieldCheck,
  },
];

// ---------------------------------------------------------------------------
// Why choose us — configurable, no fabricated numbers
// ---------------------------------------------------------------------------

export const whyChooseUs = [
  { title: "Local Mumbai Service", description: "Based in Mumbai and familiar with the city's building types and signal conditions." },
  { title: "Site-Specific Solutions", description: "Recommendations follow an on-site or informed assessment, not a fixed package." },
  { title: "Professional Installation", description: "Structured cabling and antenna placement carried out by trained installers." },
  { title: "Technical Consultation", description: "Clear, honest guidance on what a booster system can and cannot achieve." },
  { title: "Multiple Property Types", description: "Experience across homes, offices, industrial units and commercial buildings." },
  { title: "After-Installation Support", description: "Support for troubleshooting and maintenance after the system is installed." },
];

// ---------------------------------------------------------------------------
// Problems section
// ---------------------------------------------------------------------------

export const commonProblems = [
  { title: "Call drops indoors", description: "Calls disconnecting or breaking up once you step inside a building." },
  { title: "Weak indoor signal", description: "Bars fluctuate or disappear away from windows." },
  { title: "Slow mobile data", description: "Pages and apps load slowly despite good outdoor speeds nearby." },
  { title: "Poor office coverage", description: "Meeting rooms and cabins with little to no usable signal." },
  { title: "Basement connectivity issues", description: "Parking levels and basement floors with minimal signal reach." },
  { title: "Concrete and glass buildings", description: "Modern construction materials that block outdoor signal from penetrating." },
  { title: "Industrial coverage gaps", description: "Large metal-structure factories and warehouses with dead zones." },
  { title: "Large commercial floor plates", description: "Big-footprint offices and retail floors far from exterior walls." },
];

export const faqs: { question: string; answer: string }[] = [
  {
    question: "What is a mobile signal booster?",
    answer:
      "A mobile signal booster (also called a network booster or repeater system) is a system that captures existing outdoor mobile signal, amplifies it, and redistributes it indoors through antennas, improving indoor call quality and data reception.",
  },
  {
    question: "How does a mobile signal booster work?",
    answer:
      "An outdoor antenna picks up available signal from nearby towers. This signal travels through cabling to an amplifier, which boosts it and sends it to one or more indoor antennas that broadcast the improved signal inside the building.",
  },
  {
    question: "Can a booster improve indoor mobile signal?",
    answer:
      "In most cases, yes — provided there is usable outdoor signal to begin with. A booster amplifies existing signal; it cannot create signal where none exists outdoors. A site survey helps confirm feasibility for your specific location.",
  },
  {
    question: "Which networks can be supported?",
    answer:
      "Depending on the system and frequency bands involved, solutions may support Jio, Airtel, Vi and BSNL. Compatibility depends on the specific bands used by each operator in your area.",
  },
  {
    question: "Does 4G/5G compatibility depend on frequency bands?",
    answer:
      "Yes. Both 4G and 5G coverage depend on the specific frequency bands your operator uses in your locality and whether the booster hardware supports those bands. This is assessed during the site survey.",
  },
  {
    question: "Do I need a site survey?",
    answer:
      "A site survey is strongly recommended. It measures actual outdoor and indoor signal conditions at your property and ensures the recommended system is appropriate rather than oversized or undersized.",
  },
  {
    question: "Can a booster cover an entire office?",
    answer:
      "Larger offices typically require a multi-antenna distributed system rather than a single indoor antenna. Coverage area depends on building layout, floor count and construction material.",
  },
  {
    question: "Can a booster work in a basement?",
    answer:
      "Basements are challenging due to minimal outdoor signal penetration. Feasibility depends on whether adequate outdoor signal can be captured and routed down to the basement — this is evaluated case by case.",
  },
  {
    question: "How long does installation take?",
    answer:
      "Installation timelines vary by property size and system complexity, ranging from a few hours for a home setup to multiple days for larger commercial or industrial installations.",
  },
  {
    question: "How much does installation cost?",
    answer:
      "Cost depends on the property size, number of indoor antennas required, and cabling complexity. We provide a specific quotation after the site survey rather than a fixed public price.",
  },
  {
    question: "Do you provide maintenance?",
    answer:
      "Yes, we offer troubleshooting and maintenance support for systems we install, and can assess third-party systems on request.",
  },
  {
    question: "Is a mobile signal booster legal in India?",
    answer:
      "Signal boosting equipment in India is subject to regulatory requirements, including type approval and, in some cases, operator or WPC (Wireless Planning & Coordination) related requirements. We recommend using compliant equipment and can guide you on the relevant considerations for your installation — this information is general guidance and not legal advice.",
  },
  {
    question: "What approvals or operator/WPC requirements may apply?",
    answer:
      "Certain signal boosting equipment may require type approval and adherence to WPC guidelines in India. Requirements can vary based on equipment type and use case. We advise using compliant, certified equipment and verifying current requirements before installation.",
  },
  {
    question: "Can the same system support multiple operators?",
    answer:
      "Multi-operator support depends on the frequency bands the system covers and the bands used by each operator at your location. This is confirmed during the site assessment.",
  },
];
