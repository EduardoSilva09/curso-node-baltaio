'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const router = express.Router()

mongoose.connect('')

const indexRoutes = require('./routes/index-routes')
const productsRoutes = require('./routes/product-routes')

app.use(bodyParser.json()) // todo o conteúdo será convertido para json
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', indexRoutes)
app.use('/products', productsRoutes)

module.exports = app