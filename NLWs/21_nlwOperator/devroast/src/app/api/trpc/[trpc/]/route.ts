import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const handler = fetchRequestHandler({
  endpoint: "/api/trpc",
  createContext: () => ({}),
});

export async function GET(req: Request) {
  return handler(req);
}

export async function POST(req: Request) {
  return handler(req);
}
