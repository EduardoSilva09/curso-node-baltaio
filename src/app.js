'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const router = express.Router()
const connectionString = 'mongodb://localhost:27017/ndstr?readPreference=primary&ssl=false'

mongoose
    .connect(connectionString)
    .then(console.log('conectado a base de dados'))
    .catch(e => {
        console.log('erro ao conectar a base de dados. ', e);
    })

// Carrega os Models
const Product = require('./models/product')
const Customer = require('./models/customer')
const Order = require('./models/order')

const indexRoutes = require('./routes/index-routes')
const productsRoutes = require('./routes/product-routes')
const customersRoutes = require('./routes/customer-routes')

app.use(bodyParser.json()) // todo o conteúdo será convertido para json
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', indexRoutes)
app.use('/products', productsRoutes)
app.use('/customers', customersRoutes)

module.exports = app