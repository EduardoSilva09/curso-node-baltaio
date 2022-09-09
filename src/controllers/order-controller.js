'use strict'

const repository = require('../repositories/order-repository')
const guid = require('guid')
const authService = require('../services/auth-service')

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
    //recupera o token
    const token = authService.getToken(req)

    //decodifica o token
    const data = await authService.decodeToken(token);

    try {
        await repository.create({
            customer: data.id,
            items: req.body.items,
            number: guid.raw().substring(0, 6)
        })
        res.status(201).send({ message: 'Item cadastrado com sucesso!' })
    }
    catch (e) {
        res.status(400).send({ message: 'Falha ao cadastrar o Item.', data: e })
    }
}

