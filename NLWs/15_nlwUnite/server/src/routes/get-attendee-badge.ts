import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../libs/prisma";
import { BadRequest } from "./_errors/bad-request";

export const getAttendeeBadge = async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().get('/attendees/:attendeeId/badge', {
        schema: {
            summary: 'Get an attendee badge.',
            tags: ['attendees'],
            params: z.object({
                attendeeId: z.coerce.number().int()
            }),
            response: {
                200: z.object({
                    badge: z.object({
                        name: z.string(),
                        email: z.string().email(),
                        eventTitle: z.string(),
                        checkInURL: z.string().url()
                    })
                })
            }
        }
    }, async (req, res) => {
        const { attendeeId } = req.params

        const attendee = await prisma.attendee.findUnique({
            select: {
                name: true,
                email: true,
                event: {
                    select: {
                        title: true
                    }
                }
            },
            where: {
                id: attendeeId
            }
        })

        if (!attendee) throw new BadRequest('Attendee not found!')

        const baseUrl = `${req.protocol}://${req.hostname}`
        const checkInUrl = new URL(`/attendees/${attendeeId}/check-in`, baseUrl)

        return res.send({
            badge: {
                name: attendee.name,
                email: attendee.email,
                eventTitle: attendee.event.title,
                checkInURL: checkInUrl.toString()
            }
        })
    })

}