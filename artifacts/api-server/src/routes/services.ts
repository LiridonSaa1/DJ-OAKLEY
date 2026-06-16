import { Router, type IRouter } from "express";
import { db, servicesTable } from "@workspace/db";
import {
  CreateServiceBody,
  UpdateServiceParams,
  UpdateServiceBody,
  DeleteServiceParams,
  ListServicesResponse,
  UpdateServiceResponse,
} from "@workspace/api-zod";
import { eq, asc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/services", async (_req, res): Promise<void> => {
  const services = await db
    .select()
    .from(servicesTable)
    .orderBy(asc(servicesTable.sortOrder));

  res.json(ListServicesResponse.parse(services));
});

router.post("/services", async (req, res): Promise<void> => {
  const parsed = CreateServiceBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [service] = await db
    .insert(servicesTable)
    .values(parsed.data)
    .returning();

  res.status(201).json(service);
});

router.put("/services/:id", async (req, res): Promise<void> => {
  const params = UpdateServiceParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const body = UpdateServiceBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
    return;
  }

  const [service] = await db
    .update(servicesTable)
    .set(body.data)
    .where(eq(servicesTable.id, params.data.id))
    .returning();

  if (!service) {
    res.status(404).json({ error: "Service not found" });
    return;
  }

  res.json(UpdateServiceResponse.parse(service));
});

router.delete("/services/:id", async (req, res): Promise<void> => {
  const params = DeleteServiceParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [deleted] = await db
    .delete(servicesTable)
    .where(eq(servicesTable.id, params.data.id))
    .returning();

  if (!deleted) {
    res.status(404).json({ error: "Service not found" });
    return;
  }

  res.sendStatus(204);
});

export default router;
