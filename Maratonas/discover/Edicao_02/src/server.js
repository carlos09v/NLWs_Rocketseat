// Pedir e rodar o express / Importar o express
const express  = require('express')
const server = express()
const routes = require('./routes')
const path = require('path')

// Usar template engine - ejs
server.set('view engine', 'ejs')

// Mudar a localização da pasta views
server.set('views', path.join(__dirname, 'views'))

// habilitar arquivos statics
server.use(express.static('public'))

// Usar o req.body
server.use(express.urlencoded( { extended: true }))

// Rotas
server.use(routes)

server.listen(3000, () => console.log('rodando')) // Rodar o server

// npm run dev