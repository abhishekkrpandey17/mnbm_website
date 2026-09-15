import "server-only";
import { prisma } from "@/lib/db";

export async function getPublishedProducts() {
  try {
    return await prisma.product.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: "asc" },
    });
  } catch (err) {
    console.error("[data/products] Failed to load products", err);
    return [];
  }
}

export async function getProductBySlug(slug: string) {
  try {
    return await prisma.product.findFirst({ where: { slug, isPublished: true } });
  } catch (err) {
    console.error("[data/products] Failed to load product", err);
    return null;
  }
}
