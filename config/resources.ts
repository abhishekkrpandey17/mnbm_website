export interface ResourceSection {
  heading?: string;
  paragraphs: string[];
  list?: string[];
}

export interface ResourceArticle {
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
  sections: ResourceSection[];
  relatedServiceSlugs: string[];
}

export const resourceArticles: ResourceArticle[] = [
  {
    slug: "what-is-mobile-signal-booster",
    title: "What Is a Mobile Signal Booster?",
    excerpt:
      "A plain-language introduction to what a mobile signal booster is, what it does, and when it actually helps.",
    readTime: "5 min read",
    relatedServiceSlugs: ["mobile-network-booster", "site-survey"],
    sections: [
      {
        paragraphs: [
          "A mobile signal booster — also called a mobile network booster or cellular repeater system — is a set of equipment that captures existing outdoor mobile signal, amplifies it, and rebroadcasts it inside a building. It doesn't generate new signal from nothing; it works with whatever usable signal already reaches the outside of your property.",
        ],
      },
      {
        heading: "The three core components",
        paragraphs: [
          "Every booster system, regardless of size, is built from three parts: an outdoor antenna that picks up signal from nearby mobile towers, an amplifier (or booster unit) that strengthens that signal, and one or more indoor antennas that broadcast the amplified signal inside the building. Cabling connects all three, routed to minimise loss along the way.",
        ],
      },
      {
        heading: "When a booster helps — and when it doesn't",
        paragraphs: [
          "Boosters are effective when there is reasonable outdoor signal but poor indoor reception, which is the most common scenario in Mumbai's concrete and glass-heavy buildings. They are far less effective in areas where outdoor signal itself is very weak or absent, since there's nothing meaningful to amplify. This is exactly why a site survey — measuring actual outdoor and indoor signal levels — comes before any recommendation.",
        ],
      },
    ],
  },
  {
    slug: "how-mobile-signal-booster-works",
    title: "How Does a Mobile Signal Booster Work?",
    excerpt:
      "A step-by-step look at how signal travels from an outdoor antenna to your phone indoors.",
    readTime: "6 min read",
    relatedServiceSlugs: ["mobile-signal-booster-installation", "4g-signal-booster"],
    sections: [
      {
        paragraphs: [
          "Understanding how a booster system works helps set realistic expectations about what it can achieve in your specific building.",
        ],
      },
      {
        heading: "Step 1: Capturing outdoor signal",
        paragraphs: [
          "An outdoor donor antenna is mounted at the point on your property — usually a rooftop or an external wall — where signal from nearby mobile towers is strongest. Antenna placement and orientation matter significantly here, which is why installers test multiple positions before finalising one.",
        ],
      },
      {
        heading: "Step 2: Amplification",
        paragraphs: [
          "The captured signal travels through low-loss coaxial cable to an amplifier unit, typically installed in a utility room, server room or similar space. The amplifier boosts the signal strength before sending it onward — and does the same in reverse for the signal your phone sends back out to the tower.",
        ],
      },
      {
        heading: "Step 3: Indoor distribution",
        paragraphs: [
          "From the amplifier, cabling runs to one or more indoor antennas positioned to cover the relevant rooms or floor areas. Larger properties may need multiple indoor antennas connected through a splitter to cover different zones evenly.",
        ],
      },
      {
        heading: "What affects real-world performance",
        paragraphs: [
          "Cable length and quality, the number of walls or floors between the amplifier and indoor antennas, building material, and the strength of outdoor signal all affect final performance. This is why two buildings a few hundred metres apart can need quite different system configurations.",
        ],
      },
    ],
  },
  {
    slug: "4g-vs-5g-signal-booster",
    title: "4G vs 5G Signal Boosters: What's the Difference?",
    excerpt:
      "How 4G and 5G boosting differs, and why band compatibility matters more than the marketing label.",
    readTime: "5 min read",
    relatedServiceSlugs: ["4g-signal-booster", "5g-signal-booster"],
    sections: [
      {
        paragraphs: [
          "\"4G booster\" and \"5G booster\" are common terms, but the more accurate way to think about signal boosting is in terms of frequency bands, not generation labels alone.",
        ],
      },
      {
        heading: "Why bands matter more than generation",
        paragraphs: [
          "Mobile operators in India use specific frequency bands for 4G and 5G services, and these can vary by operator and by location. A booster is only effective for the bands it's designed to amplify. This means a system that works well for 4G voice and data on one operator's bands may not automatically support another operator's 5G bands in the same location.",
        ],
      },
      {
        heading: "Is 5G boosting always the better choice?",
        paragraphs: [
          "Not necessarily. 5G rollout and indoor penetration characteristics are still evolving in many areas, and in some buildings, a well-configured 4G-focused system delivers more reliable day-to-day performance for calls and general data use than an early-stage 5G setup. We assess your location's actual band availability during the site survey and recommend accordingly, rather than defaulting to whichever label sounds newer.",
        ],
      },
      {
        heading: "Planning for the future",
        paragraphs: [
          "If 5G coverage is a priority for your property, it's worth discussing during the site survey so the system design accounts for it where feasible, even if the immediate focus is on stabilising 4G coverage first.",
        ],
      },
    ],
  },
  {
    slug: "how-to-improve-mobile-signal-at-home",
    title: "How to Improve Mobile Signal at Home",
    excerpt:
      "Practical steps to diagnose and fix weak indoor mobile signal in apartments and independent homes.",
    readTime: "6 min read",
    relatedServiceSlugs: ["home-signal-booster", "site-survey"],
    sections: [
      {
        paragraphs: [
          "Weak mobile signal at home is one of the most common complaints we hear in Mumbai, especially in buildings with thick concrete construction or lower floors surrounded by other structures.",
        ],
      },
      {
        heading: "Start with quick checks",
        paragraphs: [
          "Before assuming you need a booster, check signal strength near windows versus interior rooms, and compare signal on different floors if possible. If signal is noticeably better near windows or on higher floors, that's a strong sign the issue is building penetration rather than a lack of outdoor coverage in your area — which is exactly the scenario a booster addresses well.",
        ],
      },
      {
        heading: "Consider your building's construction",
        paragraphs: [
          "Reinforced concrete, low-emissivity glass, and metal-backed insulation are common in Mumbai's newer construction and can block outdoor signal significantly. Older buildings with thick masonry walls have similar effects. Both scenarios typically respond well to a properly sized indoor booster system.",
        ],
      },
      {
        heading: "When to get a site survey",
        paragraphs: [
          "If weak signal is a consistent, building-wide issue rather than a one-off dead spot, a site survey will measure actual outdoor and indoor signal levels and tell you whether a compact home booster system is a practical fix for your specific apartment or house.",
        ],
      },
    ],
  },
  {
    slug: "mobile-signal-problems-in-buildings",
    title: "Why Modern Buildings Block Mobile Signal",
    excerpt:
      "The construction factors — from low-E glass to concrete density — that quietly kill indoor mobile signal.",
    readTime: "5 min read",
    relatedServiceSlugs: ["mobile-network-booster", "commercial-signal-booster"],
    sections: [
      {
        paragraphs: [
          "It's a common experience: signal that looks fine outside a building drops noticeably once you step in. This isn't random — specific construction choices are usually responsible.",
        ],
      },
      {
        heading: "Low-emissivity (Low-E) glass",
        paragraphs: [
          "Many modern commercial and residential towers use low-E glass for energy efficiency. The thin metallic coating that reflects heat also reflects a meaningful portion of radio frequency signal, significantly reducing how much outdoor signal reaches indoor spaces.",
        ],
      },
      {
        heading: "Reinforced concrete and rebar",
        paragraphs: [
          "Steel reinforcement bars inside concrete walls and floors can act as a partial shield against radio signals, particularly in buildings with dense structural steel — common in high-rise construction across Mumbai.",
        ],
      },
      {
        heading: "Building depth and floor count",
        paragraphs: [
          "Large floor plates mean interior rooms can be tens of metres from the nearest exterior wall, with signal weakening rapidly with each wall and floor it passes through. Basements and lower-ground areas face the added challenge of little to no direct line of sight to any outdoor signal source.",
        ],
      },
      {
        heading: "What this means practically",
        paragraphs: [
          "None of these factors are unusual or avoidable — they're simply part of how modern buildings are constructed. A signal booster system is specifically designed to work around them by capturing signal at a favourable point and distributing it indoors through cabling rather than relying on it to pass through walls and glass.",
        ],
      },
    ],
  },
  {
    slug: "mobile-signal-booster-for-office",
    title: "Planning a Mobile Signal Booster for Your Office",
    excerpt:
      "What to consider when planning indoor mobile coverage for a working office space.",
    readTime: "6 min read",
    relatedServiceSlugs: ["office-signal-booster", "commercial-signal-booster"],
    sections: [
      {
        paragraphs: [
          "Offices bring a different set of considerations than homes: multiple users, meeting rooms, partitioned cabins, and often stricter expectations around minimal disruption during installation.",
        ],
      },
      {
        heading: "Map out problem zones first",
        paragraphs: [
          "Before any installation, it helps to identify which specific areas have the weakest signal — often meeting rooms enclosed by glass partitions, cabins away from windows, or basement-level facilities. This mapping directly informs how many indoor antennas are needed and where they should go.",
        ],
      },
      {
        heading: "Multi-operator considerations",
        paragraphs: [
          "Offices typically have employees on different mobile networks. Depending on band compatibility, a single system can sometimes support multiple operators — this is confirmed during the site survey rather than assumed upfront.",
        ],
      },
      {
        heading: "Minimising disruption",
        paragraphs: [
          "Cable routing through false ceilings and existing conduits, and scheduling installation around working hours or weekends, keeps disruption to a working office to a minimum. For larger offices, phased installation across floors is often more practical than a single all-at-once rollout.",
        ],
      },
    ],
  },
  {
    slug: "mobile-signal-booster-for-warehouse",
    title: "Mobile Signal Boosters for Warehouses and Large Industrial Spaces",
    excerpt:
      "Why large-span industrial buildings need a different approach to signal boosting than offices or homes.",
    readTime: "5 min read",
    relatedServiceSlugs: ["industrial-signal-booster", "site-survey"],
    sections: [
      {
        paragraphs: [
          "Warehouses and factories present a fundamentally different coverage challenge: instead of many small rooms, you typically have one or two very large open spaces, often filled with metal racking, machinery or stored goods.",
        ],
      },
      {
        heading: "Why standard home or office systems fall short",
        paragraphs: [
          "A single indoor antenna sized for an apartment or office cabin simply can't cover a warehouse floor spanning thousands of square feet. Industrial installations typically need higher-gain amplifiers and multiple strategically placed indoor antennas to achieve even coverage across the full space.",
        ],
      },
      {
        heading: "Metal structures and machinery",
        paragraphs: [
          "Steel racking, machinery and metal roofing common in industrial buildings can reflect and block signal in ways that are harder to predict than in a standard office. This makes an on-site assessment particularly important — a desk-based estimate isn't reliable for spaces like this.",
        ],
      },
      {
        heading: "Prioritising key areas",
        paragraphs: [
          "Where full blanket coverage isn't practical or necessary, we often prioritise control rooms, loading docks, and administrative areas where consistent connectivity matters most for operations, while assessing what's feasible for the wider floor area.",
        ],
      },
    ],
  },
  {
    slug: "mobile-network-booster-mumbai-guide",
    title: "A Practical Guide to Mobile Network Boosters in Mumbai",
    excerpt:
      "An overview of how Mumbai's building types and geography shape mobile signal — and what that means for choosing a booster system.",
    readTime: "7 min read",
    relatedServiceSlugs: ["mobile-network-booster", "site-survey", "commercial-signal-booster"],
    sections: [
      {
        paragraphs: [
          "Mumbai's mobile signal conditions are shaped by a combination of dense construction, a mix of old and new building types, and a coastline that affects tower placement and density in different parts of the city.",
        ],
      },
      {
        heading: "South Mumbai's older high-rises",
        paragraphs: [
          "Many buildings in South Mumbai were constructed decades before today's data-heavy mobile usage patterns, with thick masonry walls that were never designed with radio signal penetration in mind. These buildings often see a sharp drop in signal quality just a few metres from a window.",
        ],
      },
      {
        heading: "Newer high-rise and business districts",
        paragraphs: [
          "Areas like Bandra-Kurla Complex, Lower Parel and parts of the western suburbs feature newer glass-and-steel towers. While structurally very different from older buildings, low-E glass and dense steel reinforcement can create similar or even greater signal attenuation.",
        ],
      },
      {
        heading: "Suburban and satellite townships",
        paragraphs: [
          "Thane and Navi Mumbai's newer, larger residential townships often consist of multiple towers within a single development, where shared outdoor antenna infrastructure can sometimes serve several buildings more efficiently than treating each in isolation.",
        ],
      },
      {
        heading: "The common thread: assess before you install",
        paragraphs: [
          "Across all of these building types, the starting point is the same — measuring actual outdoor and indoor signal conditions at your specific property. Mumbai's variety of construction styles means a system that works well in one building type can be entirely wrong for another just a few streets away.",
        ],
      },
    ],
  },
];

export function getResourceBySlug(slug: string) {
  return resourceArticles.find((a) => a.slug === slug);
}
