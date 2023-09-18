// Back-end API RESTful => Rotas
import Fastify from "fastify";
import cors from '@fastify/cors'
import { appRoutes } from "./routes";
import { notificationRoutes } from "./notifications-routes";

const app = Fastify({
    logger: true
})

app.register(cors, {
    origin: true
})
app.register(appRoutes)
app.register(notificationRoutes)

app.listen({ port: 3333, host: '0.0.0.0' })

