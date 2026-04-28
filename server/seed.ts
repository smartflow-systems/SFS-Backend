/**
 * Run once after first deploy: npx tsx server/seed.ts
 * Seeds the SFS product catalog.
 */
import { db } from "./db";
import { products } from "@shared/schema";

const sfsProducts = [
  { slug: "barber-booker", name: "Barber Booker", description: "Online booking system for barbershops and salons" },
  { slug: "social-scale-booster", name: "SocialScaleBooster", description: "Multi-platform social media automation" },
  { slug: "data-query-engine", name: "SFS Data Query Engine", description: "Natural language to SQL analytics" },
  { slug: "crm", name: "SFS CRM", description: "Customer relationship management" },
  { slug: "white-label-dashboard", name: "White Label Dashboard", description: "Multi-tenant admin platform" },
  { slug: "marketing-growth", name: "Marketing & Growth", description: "Booking, marketing, and growth tools" },
  { slug: "social-powerhouse", name: "Social Powerhouse", description: "Comprehensive social media management" },
  { slug: "data-scrape-insights", name: "DataScrape Insights", description: "AI-powered web scraping and analysis" },
  { slug: "social-scale-booster-ai-bot", name: "SocialScaleBooster AI Bot", description: "No-code AI bot builder for e-commerce" },
  { slug: "website-builder", name: "Website Builder", description: "Drag-and-drop website builder" },
  { slug: "invoice-billing", name: "Invoice & Billing", description: "Financial operations and invoicing" },
  { slug: "project-manager", name: "Project Manager", description: "Team project tracking and collaboration" },
];

async function seed() {
  console.log("Seeding SFS product catalog...");
  for (const p of sfsProducts) {
    await db.insert(products).values({ ...p, isActive: true }).onConflictDoNothing();
    console.log(`  ✓ ${p.name}`);
  }
  console.log("Done.");
  process.exit(0);
}

seed().catch((err) => { console.error(err); process.exit(1); });
