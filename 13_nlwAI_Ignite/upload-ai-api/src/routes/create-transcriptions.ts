import { FastifyInstance } from "fastify";
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import { openai } from '../lib/openai'

import { createReadStream } from "node:fs"

export const createTranscriptionRoute = async (app: FastifyInstance) => {
    app.post('/videos/:videoId/transcription', async (req) => {
        // Validações
        const paramsSchema = z.object({
            videoId: z.string().uuid()
        })
        const { videoId } = paramsSchema.parse(req.params)

        const bodySchema = z.object({
            prompt: z.string()
        })
        const { prompt } = bodySchema.parse(req.body)

        // Ache ou retorne o erro
        const video = await prisma.video.findUniqueOrThrow({
            where: {
                id: videoId
            }
        })

        // Colocar o Path do video em Stream
        // Streams => pegar/salvar em partes
        const videoPath = video.path
        const audioReadStream = createReadStream(videoPath)

        // Enviar e receber da OpenAI
        const resOpenAI = await openai.audio.transcriptions.create({
            file: audioReadStream,
            model: 'whisper-1',
            language: 'pt',
            response_format: 'json',
            temperature: 0,
            prompt
        })

        const transcription = resOpenAI.text
        await prisma.video.update({
            where: {
                id: videoId
            },
            data: {
                transcription
            }
        })

        return { transcription }
    })
    
}