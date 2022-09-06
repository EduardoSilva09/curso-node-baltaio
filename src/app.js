'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const router = express.Router()

mongoose.connect('mongodb+srv://eduardo09:eduardo123@ndstr.kpdfjif.mongodb.net/?retryWrites=true&w=majority')
const Product = require('./models/product')

const indexRoutes = require('./routes/index-routes')
const productsRoutes = require('./routes/product-routes')

app.use(bodyParser.json()) // todo o conteúdo será convertido para json
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', indexRoutes)
app.use('/products', productsRoutes)

module.exports = app