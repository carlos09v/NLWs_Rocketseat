import { router } from "../trpc";
import { roastRouter } from "./roast";

export const appRouter = router({
  roast: roastRouter,
});

export type AppRouter = typeof appRouter;
