const express = require('express')
const req = require('express/lib/request')
const routes = express.Router()
const ProfileController = require('./controllers/ProfileController')
const JobController = require('./controllers/JobController')
const DashboardController = require("./controllers/DashboardController")

/*
const basePath = __dirname + '/views'
// request, response
routes.get('/', (request, response) => response.sendFile(basePath + '/index.html')) // Executar quando entrar
routes.get('/index.html', (request, response) => response.sendFile(basePath + '/index.html'))
routes.get('/job.html', (request, response) => response.sendFile(basePath + '/job.html'))
routes.get('/job/edit.html', (request, response) => response.sendFile(basePath + '/job-edit.html'))
routes.get('/profile.html', (request, response) => response.sendFile(basePath + '/profile.html'))
*/

// (Alt + Shift + SetaBaixo) - Duplicar 
// (Alt + Clicks) - Multiplo Cursor

// Usando EJS

 

routes.get('/', DashboardController.index) // Executar quando entrar
routes.get('/index.html', DashboardController.index)

routes.get('/job.html', JobController.create)
routes.get('/job/:id', JobController.show)
routes.get('/profile', ProfileController.index) // Incluir/Importar o objeto no Profile
routes.get('/profile.html', ProfileController.index)

routes.post('/job/:id', JobController.update)
routes.post('/job/delete/:id', JobController.delete)
routes.post('/profile', ProfileController.update)
routes.post('/job', JobController.save)

// Exportar as rotas
module.exports = routes