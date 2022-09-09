'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config')

const app = express()
const router = express.Router()

mongoose
    .connect(config.connectionString)
    .then(console.log('conectado a base de dados'))
    .catch(e => {
        console.log('erro ao conectar a base de dados. ', e);
    })

// Carrega os Models
const Product = require('./models/product')
const Customer = require('./models/customer')
const Order = require('./models/order')

const indexRoutes = require('./routes/index-routes')
const customersRoutes = require('./routes/customer-routes')
const ordersRoutes = require('./routes/order-routes')
const productsRoutes = require('./routes/product-routes')

app.use(bodyParser.json({
    limit: '5mb'
})) // todo o conteúdo será convertido para json
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', indexRoutes)
app.use('/customers', customersRoutes)
app.use('/orders', ordersRoutes)
app.use('/products', productsRoutes)

module.exports = app