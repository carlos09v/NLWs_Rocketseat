import { FastifyInstance } from "fastify";
import axios from 'axios'
import { z } from 'zod'
import { prisma } from "../lib/prisma";

export const authRoutes = async (app: FastifyInstance) => {
    app.post('/register', async (req) => {
        const bodySchema = z.object({
            code: z.string() // Code do GitHub
        })
        const { code } = bodySchema.parse(req.body)

        // 1 - Enviar o Code recebido do front-end
        const accessTokenResponse = await axios.post(
            'https://github.com/login/oauth/access_token',
            null,
            {
                params: {
                    client_id: process.env.GITHUB_CLIENT_ID,
                    client_secret: process.env.GITHUB_CLIENT_SECRET,
                    code
                },
                headers: {
                    Accept: 'application/json' // Receber a resposta do GitHub em JSON
                }
            }
        )
        const { access_token } = accessTokenResponse.data // Token recebido
        
        // 2 - Enviar o token pra api do GitHub e receber o userData
        const userResponse = await axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })

        const userSchema = z.object({
            id: z.number(),
            login: z.string(),
            name: z.string(),
            avatar_url: z.string().url()
        })
        const userInfo = userSchema.parse(userResponse.data)

        // 3 - Salvar no DB
        let user = await prisma.user.findUnique({
            where: {
                githubId: userInfo.id
            }
        })

        // Criar o user caso n exista
        if(!user) {
            user = await prisma.user.create({
                data: {
                    githubId: userInfo.id,
                    login: userInfo.login,
                    name: userInfo.name,
                    avatarUrl: userInfo.avatar_url
                }
            })
        }

        // Alerta: O acess_token do GitHub dura apenas 1 dia, por isso, sera necessario o uso do JWT Token
        // Obs: O token ñ é criptografado, é apenas assinado (Com o Secret Key)
        const token = app.jwt.sign({
            name: user.name,
            avatarUrl: user.avatarUrl
        }, {
            sub: user.id,
            expiresIn: '3 days'
        })

        return {
            token
        }
    })
}