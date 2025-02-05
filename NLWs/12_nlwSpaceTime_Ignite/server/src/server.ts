import 'dotenv/config' // => process.env

import fastify from "fastify";
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart';
import { memoriesRoutes } from "./routes/memories";
import { authRoutes } from './routes/auth';
import { uploadRoutes } from './routes/upload';
import { resolve } from 'node:path';

const app = fastify()
// HTTP Methods: GET, POST, DELETE, PUT, PATCH

app.register(multipart)
app.register(require('@fastify/static'), {
    root: resolve(__dirname, '../uploads'),
    prefix: '/uploads'
    
})
app.register(cors, {
    origin: true, // Todas URLs de front-end proderão acessar o back-end
})
app.register(jwt, {
    secret: process.env.JWT_SECRET!
})

app.register(authRoutes)
app.register(memoriesRoutes)
app.register(uploadRoutes)

app.listen({
    port: 3333,
    host: '0.0.0.0'
}).then(() => console.log('HTTP server running on http://localhost:3333'))