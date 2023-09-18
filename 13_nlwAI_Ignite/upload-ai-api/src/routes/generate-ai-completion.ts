import { FastifyInstance } from "fastify";
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import { openai } from '../lib/openai'
import { streamToResponse, OpenAIStream } from 'ai'

export const generateAICompletionRoute = async (app: FastifyInstance) => {
    app.post('/ai/complete', async (req, res) => {
        // Validações
        const bodySchema = z.object({
            videoId: z.string().uuid(),
            prompt: z.string(),
            temperature: z.number().min(0).max(1).default(0.5)
        })
        const { videoId, prompt, temperature } = bodySchema.parse(req.body)
        
        // Verificar se o video existe
        const video = await prisma.video.findUniqueOrThrow({
            where: {
                id: videoId
            }
        })
        // Verificar se a transcrição existe
        if(!video.transcription) return res.status(400).send({ error: 'Video transcription was not generated yet.'})

        const promptMessage = prompt.replace('{transcription}', video.transcription)

        // Enviar e receber da OpenAI
        const resOpenAI = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo', // Ate 4096 Tokens => Mais barato
            temperature,
            messages: [
                {
                    role: 'user',
                    content: promptMessage
                }
            ],
            stream: true
        })

        const stream = OpenAIStream(resOpenAI)
        streamToResponse(stream, res.raw, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
            }
        })
    })
    
}