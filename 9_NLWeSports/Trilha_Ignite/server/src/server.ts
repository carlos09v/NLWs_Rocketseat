import express from 'express'
import cors from 'cors'
import { prisma } from './lib/prisma'
import { z } from 'zod'
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes'
import { convertMinutesToHourString } from './utils/convert-minutes-to-hour-string'

const app = express()

app.use(express.json())
app.use(cors())

// localhost:3333/ads

// HTTP methods (GET, POST, PATCH, DELETE) / API RESTful / HTTP Codes
/*
    < Params >
    Query: localhost:3333/ads?page=2&sort=title
    Route: localhost:3333/ads/5
    Body: ...
*/

// Listagem de games com contagem de anúncios
app.get('/games', async (req, res) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true
                }
            }
        }
    })

    return res.json(games)
})

// Criação de novo anúncio
app.post('/games/:gameId/ads', async (req, res) => {
    const createParams = z.object({
        gameId: z.string().uuid()
    })
    const createBody = z.object({
        name: z.string(),
        yearsPlaying: z.number().int(),
        discord: z.string(),
        weekDays: z.array(z.number().min(0).max(6)),
        hourStart: z.string(),
        hourEnd: z.string(),
        useVoiceChannel: z.boolean()
    })
    const { gameId } = createParams.parse(req.params)
    const { name, yearsPlaying, discord, hourEnd, hourStart, useVoiceChannel, weekDays } = createBody.parse(req.body)

    const ad = await prisma.ad.create({
        data: {
            gameId,
            name,
            yearsPlaying,
            discord,
            hourStart: convertHourStringToMinutes(hourStart),
            hourEnd: convertHourStringToMinutes(hourEnd),
            useVoiceChannel,
            weekDays: weekDays.join(',')
        }
    })

    return res.status(201).json(ad)
})

// Listagem de anúncios por game
app.get('/games/:id/ads', async (req, res) => {
    const createParams = z.object({
        id: z.string().uuid()
    })
    const { id } = createParams.parse(req.params)

    const ads = await prisma.ad.findMany({
        where: {
            gameId: id
        },
        select: {
            id: true,
            name: true,
            weekDays: true,
            hourStart: true,
            hourEnd: true,
            useVoiceChannel: true,
            yearsPlaying: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return res.json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutesToHourString(ad.hourStart),
            hourEnd: convertMinutesToHourString(ad.hourEnd)
        }
    }))

    // return res.json([
    //     { id: 1, name: 'Anúncio 1' },
    //     { id: 2, name: 'Anúncio 2' },
    //     { id: 3, name: 'Anúncio 3' },
    //     { id: 4, name: 'Anúncio 4' },
    //     { id: 5, name: 'Anúncio 5' }
    // ])
})

// Buscar discord pelo ID do anúncio
app.get('/ads/:id/discord', async (req, res) => {
    const createParams = z.object({
        id: z.string().uuid()
    })
    const { id } = createParams.parse(req.params)

    const ad = await prisma.ad.findUniqueOrThrow({
        where: {
            id
        },
        select: {
            discord: true
        }
    })

    return res.json({
        discord: ad.discord
    })
})

app.listen(3333)