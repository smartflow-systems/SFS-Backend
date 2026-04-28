import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { SFSTokenPayload } from "@shared/schema";

declare global {
  namespace Express {
    interface Request {
      user?: SFSTokenPayload;
    }
  }
}

function getSecret(): string {
  const s = process.env.SFS_JWT_SECRET;
  if (!s) throw new Error("SFS_JWT_SECRET is required");
  return s;
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    req.user = jwt.verify(token, getSecret()) as unknown as SFSTokenPayload;
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

export function requireRole(...roles: SFSTokenPayload["role"][]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  };
}
