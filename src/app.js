'use strict'

const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const router = express.Router()
const indexRoutes = require('./routes/index-routes')
const productsRoutes = require('./routes/product-routes')

app.use(bodyParser.json()) // todo o conteúdo será convertido para json
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', indexRoutes)
app.use('/products', productsRoutes)

module.exports = app