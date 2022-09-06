// Aplicação se autogerencia, tem a capacidade de receber e responder request's
'use strict'

const http = require('http')
const debug = require('debug')('nodestr:server')// Nomeando o debug
const express = require('express')

const app = express()
const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

//criando o server
const server = http.createServer(app)
const router = express.Router()

//criando a rota inicial
const route = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Node API: Curso Balta",
        version: "0.0.1"
    })
})

app.use('/', route)
server.listen(port)
console.log(`Server is running... port : ${port} `);

function normalizePort(val) {
    const port = parseInt(val, 10)
    if (isNaN(port)) {
        return val
    }

    if (port >= 0) {
        return port
    }

    return false
}