'use strict'

const repository = require('../repositories/order-repository')
const guid = require('guid')

exports.get = async (req, res, next) => {
    try {
        const data = await repository.get()
        res.status(200).send(data)
    } catch (e) {
        res.status(400).send({
            message: 'Falha ao listar items.',
        })
    }
}

exports.post = async (req, res, next) => {
    let data = {
        customer: req.body.customer,
        items: req.body.items
    }
    
    data.number = guid.raw().substring(0, 6)

    try {
        await repository.create(data)
        res.status(201).send({ message: 'Item cadastrado com sucesso!' })
    }
    catch (e) {
        res.status(400).send({ message: 'Falha ao cadastrar o Item.', data: e })
    }
}

