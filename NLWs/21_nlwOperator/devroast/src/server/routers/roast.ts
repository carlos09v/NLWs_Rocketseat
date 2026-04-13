import { avg, count } from "drizzle-orm";
import { db } from "@/db";
import { roasts } from "@/db/schema";
import { publicProcedure, router } from "../trpc";

export const roastRouter = router({
  getMetrics: publicProcedure.query(async () => {
    const [metrics] = await db
      .select({
        count: count(),
        avgScore: avg(roasts.score),
      })
      .from(roasts);

    return {
      totalRoasted: Number(metrics.count),
      avgScore: Number(parseFloat(metrics.avgScore || "0").toFixed(1)),
    };
  }),
});
