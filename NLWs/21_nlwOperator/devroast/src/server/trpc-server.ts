import { appRouter } from "./routers/_app";

export const trpcServer = appRouter.createCaller({});
