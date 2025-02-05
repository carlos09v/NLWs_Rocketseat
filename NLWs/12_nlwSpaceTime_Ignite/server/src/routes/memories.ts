import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from 'zod'

export const memoriesRoutes = async (app: FastifyInstance) => {
    app.addHook('preHandler', async (req) => {
        await req.jwtVerify() // Verificar auth de cada rota
    })

    // CRUD (Create, Read, Update, Delete)
    // Listagem
    app.get('/memories', async (req) => {
        const memories = await prisma.memory.findMany({
            where: {
                userId: req.user.sub
            },
            orderBy: {
                createdAt: 'asc' // Da antiga pra + nova
            }
        })

        return memories.map(memory => {
            return {
                id: memory.id,
                coverUrl: memory.coverUrl,
                exerpt: memory.content.substring(0, 115).concat('...'), // Content resumido (pequeno)
                createdAt: memory.createdAt
            }
        })
    })

    // Detalhe
    app.get('/memories/:id', async (req, res) => {
        const paramsSchema = z.object({
            id: z.string().uuid()
        })
        const { id } = paramsSchema.parse(req.params)

        const memory = await prisma.memory.findUniqueOrThrow({
            where: {
                id
            }
        })
        // Verificar Usuário Autenticado e se estiver Public
        if(!memory.isPublic && memory.userId !== req.user.sub) return res.status(401).send()

        return memory
    })

    // Criação
    app.post('/memories', async (req) => {
        const bodySchema = z.object({
            content: z.string(),
            coverUrl: z.string(),
            isPublic: z.coerce.boolean().default(false)
        })
        const { content, coverUrl, isPublic } = bodySchema.parse(req.body)

        const memory = await prisma.memory.create({
            data: {
                content,
                coverUrl,
                isPublic,
                userId: req.user.sub
            }
        })

        return memory
    })

    // Atualização
    app.put('/memories/:id', async (req, res) => {
        const paramsSchema = z.object({
            id: z.string().uuid()
        })
        const { id } = paramsSchema.parse(req.params)

        const bodySchema = z.object({
            content: z.string(),
            coverUrl: z.string(),
            isPublic: z.coerce.boolean().default(false)
        })
        const { content, coverUrl, isPublic } = bodySchema.parse(req.body)

        let memory = await prisma.memory.findUniqueOrThrow({
            where: {
                id
            }
        })
        if(memory.userId !== req.user.sub) return res.status(401).send() // Verificar Usuário Autenticado

        memory = await prisma.memory.update({
            where: {
                id
            },
            data: {
                content,
                coverUrl,
                isPublic
            }
        })

        return memory
    })

    // Deletar
    app.delete('/memories/:id', async (req, res) => {
        const paramsSchema = z.object({
            id: z.string().uuid()
        })
        const { id } = paramsSchema.parse(req.params)

        const memory = await prisma.memory.findUniqueOrThrow({
            where: {
                id
            }
        })
        if(memory.userId !== req.user.sub) return res.status(401).send() // Verificar Usuário Autenticado

        await prisma.memory.delete({
            where: {
                id
            }
        })
    })
}