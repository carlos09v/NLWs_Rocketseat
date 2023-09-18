import { FastifyInstance } from "fastify";
import { fastifyMultipart } from '@fastify/multipart'
import { prisma } from '../lib/prisma'

import path from "node:path";
import { randomUUID } from 'node:crypto'
import fs from 'node:fs'
// streams => ler/escrever dados em partes
// Obs: Ñ esperar o upload completo do video pra so dps salvar no disco
import { pipeline } from "node:stream"
import { promisify } from "node:util"

const pump = promisify(pipeline)

export const uploadVideoRoute = async (app: FastifyInstance) => {
    app.register(fastifyMultipart, {
        limits: {
            fileSize: 1_048_576 * 25 // 25mb
        }
    })
    
    app.post('/videos', async (req, res) => {
        const data = await req.file()

        // Checar se existe
        if(!data) return res.status(400).send({ error: 'Missing file input.' })
        
        // Extensão do arquivo
        const extension = path.extname(data.filename)

        // Validar
        if(extension !== '.mp3') return res.status(400).send({ error: 'Invalid input type, please upload a MP3.' })

        // Gerar o fileName
        const fileBaseName = path.basename(data.filename, extension)
        const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`

        const uploadDestination = path.resolve(__dirname, '../../tmp', fileUploadName)

        await pump(data.file, fs.createWriteStream(uploadDestination))

        // Salvar no DB
        const video = await prisma.video.create({
            data: {
                name: data.filename,
                path: uploadDestination
            }
        })

        return {
            video
        }
    })
}