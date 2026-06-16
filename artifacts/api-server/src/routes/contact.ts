import { Router, type IRouter } from "express";
import { db, contactSubmissionsTable } from "@workspace/db";
import {
  SubmitContactBody,
  ListContactSubmissionsResponse,
} from "@workspace/api-zod";
import { desc } from "drizzle-orm";

const router: IRouter = Router();

router.post("/contact", async (req, res): Promise<void> => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [submission] = await db
    .insert(contactSubmissionsTable)
    .values(parsed.data)
    .returning();

  req.log.info({ id: submission.id }, "Contact submission created");
  res.status(201).json(submission);
});

router.get("/contact/submissions", async (req, res): Promise<void> => {
  const submissions = await db
    .select()
    .from(contactSubmissionsTable)
    .orderBy(desc(contactSubmissionsTable.createdAt));

  res.json(ListContactSubmissionsResponse.parse(submissions));
});

export default router;
