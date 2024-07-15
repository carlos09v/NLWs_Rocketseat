import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod'
import { prisma } from "../../lib/prisma";
import { ClientError } from "../errors/client-error";


export const createLink = async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().post('/trips/:tripId/links', {
        schema: {
            params: z.object({
                tripId: z.string().uuid()
            }),
            body: z.object({
                title: z.string().min(4),
                url: z.string().url()
            })
        }
    }, async (req) => {
        const { url, title } = req.body
        const { tripId } = req.params

        const trip = await prisma.trip.findUnique({
            where: { id: tripId }
        })

        if(!trip) throw new ClientError('Trip not found!')

        const link = await prisma.link.create({
            data: {
               title,
               url,
               trip_id: tripId 
            }
        })

        return { linkId: link.id }
    })
}