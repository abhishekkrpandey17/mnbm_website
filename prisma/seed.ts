import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@example.com";
  const password = process.env.ADMIN_SEED_PASSWORD || "ChangeMe123!";

  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (existing) {
    console.log(`Admin user already exists: ${email}`);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.adminUser.create({
    data: {
      name: "Super Admin",
      email,
      passwordHash,
      role: "SUPER_ADMIN",
      isActive: true,
    },
  });

  console.log(`Created super admin: ${email}`);
  console.log(
    password === "ChangeMe123!"
      ? "Using default password 'ChangeMe123!' — set ADMIN_SEED_PASSWORD env var to override, and change it after first login."
      : "Password set from ADMIN_SEED_PASSWORD."
  );

  await seedProducts();
}

/**
 * Illustrative placeholder products using generic category-level descriptions
 * only — no invented model numbers, dB gain figures or band specifications.
 * Replace with real product data from the admin panel before going live.
 */
async function seedProducts() {
  const products = [
    {
      slug: "single-network-indoor-booster",
      name: "Single-Network Indoor Booster",
      summary: "A compact, single-antenna system suited to homes and small offices.",
      description:
        "Designed for smaller indoor areas that need coverage from one mobile network. Typically installed with one outdoor antenna and one indoor antenna. Exact coverage depends on a site assessment.",
      bands: ["Bands vary by operator and site survey"],
      networks: ["Single operator (as confirmed during site survey)"],
      coverageArea: "Suited to smaller indoor areas",
      propertyType: "Home, Small Office",
      sortOrder: 1,
    },
    {
      slug: "multi-network-distributed-system",
      name: "Multi-Network Distributed System",
      summary: "A multi-antenna system for offices and commercial floors needing several operators covered.",
      description:
        "Uses multiple indoor antennas distributed across a floor or building to cover larger areas and, where feasible, more than one mobile operator. Configuration is confirmed after a site survey.",
      bands: ["Bands vary by operator and site survey"],
      networks: ["Multiple operators, subject to band compatibility"],
      coverageArea: "Suited to larger offices and commercial floors",
      propertyType: "Office, Commercial Building",
      sortOrder: 2,
    },
    {
      slug: "high-gain-industrial-system",
      name: "High-Gain Industrial System",
      summary: "A higher-capacity system for large-span factories and warehouses.",
      description:
        "Intended for large open-span industrial spaces where signal needs to travel further and around metal structures and machinery. System sizing is determined after an on-site assessment.",
      bands: ["Bands vary by operator and site survey"],
      networks: ["Configured based on site requirements"],
      coverageArea: "Suited to large-span industrial spaces",
      propertyType: "Factory, Warehouse",
      sortOrder: 3,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
  }

  console.log(`Seeded ${products.length} placeholder products.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
