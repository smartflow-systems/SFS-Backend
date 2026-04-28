import type { Express } from "express";
import { createServer, type Server } from "http";
import authRoutes from "./routes/auth";
import productRoutes from "./routes/products";
import orgRoutes from "./routes/orgs";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/health", (_req, res) => {
    res.json({ ok: true, service: "sfs-backend", version: "1.0.0" });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/products", productRoutes);
  app.use("/api/orgs", orgRoutes);

  const httpServer = createServer(app);
  return httpServer;
}
