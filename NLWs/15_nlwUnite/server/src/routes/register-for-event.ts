import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { prisma } from "../libs/prisma"
import { BadRequest } from "./_errors/bad-request"

export const registerForEvent = async (app: FastifyInstance) => {
    app.withTypeProvider<ZodTypeProvider>().post('/events/:eventId/attendees', {
        schema: {
            summary: 'Register an attendee.',
            tags: ['attendees'],
            body: z.object({
                name: z.string().min(4),
                email: z.string().email()       
            }),
            params: z.object({
                eventId: z.string().uuid()
            }),
            response: {
                201: z.object({
                    attendeeId: z.number()
                })
            }
        }
    }, async (req, res) => {
        const { eventId } = req.params
        const { email, name } = req.body

        const attendeeFromEmail = await prisma.attendee.findUnique({
            where: {
                eventId_email: {
                    email,
                    eventId
                }
            }
        })

        if(attendeeFromEmail) throw new BadRequest('This email is already registered for this event.')

        // Same time
        const [event, amountOfAttendeesForEvent] = await Promise.all([
            await prisma.event.findUnique({
                where: {
                    id: eventId
                }
            }),

            await prisma.attendee.count({
                where: {
                    eventId
                }
            })
        ])

        if(event?.maximumAttendees && amountOfAttendeesForEvent > event?.maximumAttendees) throw new BadRequest('The maximum number of attendees for this event has been reached.')

        const attendee = await prisma.attendee.create({
            data: {
                name,
                email,
                eventId
            }
        })

        return res.status(201).send({ attendeeId: attendee.id })
    })
}