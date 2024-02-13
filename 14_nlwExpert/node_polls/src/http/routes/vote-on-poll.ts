import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { redis } from "../../lib/redis";
import { voting } from "../../utils/voting-pub-sub";


export const voteOnPoll = async (app: FastifyInstance) => {
    app.post('/polls/:pollId/votes', async (req, res) => {
        const voteOnPollBody = z.object({
            pollOptionId: z.string().uuid()
        })
        const { pollOptionId } = voteOnPollBody.parse(req.body)

        const voteOnPollParams = z.object({
            pollId: z.string().uuid()
        })
        const { pollId } = voteOnPollParams.parse(req.params)

        // Verificar se ja possui o cookie, se ñ cria + Mudança de voto
        let { sessionId } = req.cookies
        if(sessionId) {
            const usePreviousVoteOnPoll = await prisma.vote.findUnique({
                where: {
                    sessionId_pollId: {
                        sessionId,
                        pollId
                    }
                }
            })

            if(usePreviousVoteOnPoll && usePreviousVoteOnPoll.pollOptionId !== pollOptionId) {
                // Apagar o voto anterior
                // Criar um novo
                await prisma.vote.delete({
                    where: {
                        id: usePreviousVoteOnPoll.id
                    }
                })

                // Decrementar Ranking usando Redis
                const votes = await redis.zincrby(pollId, -1, usePreviousVoteOnPoll.pollOptionId)

                voting.publish(pollId, {
                    pollOptionId: usePreviousVoteOnPoll.pollOptionId,
                    votes: Number(votes)
                })
            }else if (usePreviousVoteOnPoll) {
                return res.status(400).send({ message: 'You already voted on this poll.'})
            }
        }
        if(!sessionId) {
            sessionId = randomUUID()
            res.setCookie('sessionId', sessionId, {
                path: '/',
                maxAge: 60*60*24*30, // 30 days
                signed: true,
                httpOnly: true // Somente o back-end vai ler os cookies
            })
        }

        await prisma.vote.create({
            data: {
                sessionId,
                pollId,
                pollOptionId
            }
        })

        // Incrementar Ranking usando Redis
        const votes = await redis.zincrby(pollId, 1,  pollOptionId)


        voting.publish(pollId, {
            pollOptionId,
            votes: Number(votes)
        })

        return res.status(201).send()
    })
}