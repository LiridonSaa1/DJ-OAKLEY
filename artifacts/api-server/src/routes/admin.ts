import { Router, type IRouter } from "express";
import { AdminLoginBody, AdminLoginResponse, GetAdminSessionResponse } from "@workspace/api-zod";

const router: IRouter = Router();

// Simple session-based admin auth using a hardcoded password env var
// In production this should be changed via ADMIN_PASSWORD env variable
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "djscaffolding2024";

declare module "express-serve-static-core" {
  interface Request {
    session?: { authenticated?: boolean };
  }
}

// Simple in-memory session store (good enough for a single-admin CMS)
const sessions = new Map<string, { authenticated: boolean; createdAt: Date }>();

function generateSessionId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

router.post("/admin/login", async (req, res): Promise<void> => {
  const parsed = AdminLoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  if (parsed.data.password !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "Invalid password" });
    return;
  }

  const sessionId = generateSessionId();
  sessions.set(sessionId, { authenticated: true, createdAt: new Date() });

  res.cookie("admin_session", sessionId, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: "lax",
  });

  res.json(AdminLoginResponse.parse({ authenticated: true }));
});

router.post("/admin/logout", async (req, res): Promise<void> => {
  const sessionId = req.cookies?.admin_session;
  if (sessionId) {
    sessions.delete(sessionId);
  }
  res.clearCookie("admin_session");
  res.json({ authenticated: false });
});

router.get("/admin/me", async (req, res): Promise<void> => {
  const sessionId = req.cookies?.admin_session;
  if (!sessionId || !sessions.has(sessionId)) {
    res.status(401).json({ authenticated: false });
    return;
  }

  const session = sessions.get(sessionId)!;
  res.json(GetAdminSessionResponse.parse({ authenticated: session.authenticated }));
});

export default router;
