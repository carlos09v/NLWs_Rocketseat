import { randomUUID } from "node:crypto";
import { extname, resolve } from "node:path";
import { createWriteStream } from "node:fs";
import { FastifyInstance } from "fastify";

import { pipeline } from "node:stream";
import { promisify } from "node:util";
const pump = promisify(pipeline)

export const uploadRoutes = async (app: FastifyInstance) => {
    app.post('/upload', async (req, res) => {
        const upload = await req.file({
            limits: {
                fileSize: 5_242_880 // Ate 5Mb
            }
        })
        if(!upload) return res.status(400).send()

        // 1- Validar so Imagem e Video
        const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/
        const isValidFileFormat = mimeTypeRegex.test(upload.mimetype)

        if(!isValidFileFormat) return res.status(400).send()

        // 2- FileName
        const fileId = randomUUID() // Gerar UUID
        const extension = extname(upload.filename)
        const fileName = fileId.concat(extension)

        // 3- Escrever aos poucos
        const writeStream = createWriteStream(
            resolve(__dirname, '../../uploads/', fileName)
        )

        await pump(upload.file, writeStream)

        // 4- Url
        const fullUrl = req.protocol.concat('://').concat(req.hostname)
        const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString()

        // Obs: Ao inves de salvar no disco
        // Serviços de Upload apropriados: Amazon S3, Google GCS, Cloudflare R2
    })
}