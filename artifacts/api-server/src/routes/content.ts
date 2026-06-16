import { Router, type IRouter } from "express";
import { db, contentSectionsTable } from "@workspace/db";
import {
  GetContentSectionParams,
  UpdateContentSectionParams,
  UpdateContentSectionBody,
  ListContentSectionsResponse,
  GetContentSectionResponse,
  UpdateContentSectionResponse,
} from "@workspace/api-zod";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/content/sections", async (_req, res): Promise<void> => {
  const sections = await db.select().from(contentSectionsTable);
  res.json(ListContentSectionsResponse.parse(sections));
});

router.get("/content/sections/:key", async (req, res): Promise<void> => {
  const params = GetContentSectionParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [section] = await db
    .select()
    .from(contentSectionsTable)
    .where(eq(contentSectionsTable.key, params.data.key));

  if (!section) {
    res.status(404).json({ error: "Content section not found" });
    return;
  }

  res.json(GetContentSectionResponse.parse(section));
});

router.put("/content/sections/:key", async (req, res): Promise<void> => {
  const params = UpdateContentSectionParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const body = UpdateContentSectionBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
    return;
  }

  const [section] = await db
    .update(contentSectionsTable)
    .set({ ...body.data, updatedAt: new Date() })
    .where(eq(contentSectionsTable.key, params.data.key))
    .returning();

  if (!section) {
    res.status(404).json({ error: "Content section not found" });
    return;
  }

  res.json(UpdateContentSectionResponse.parse(section));
});

export default router;
