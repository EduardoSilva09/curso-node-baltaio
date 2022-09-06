'use strict'

const mongoose = require("mongoose")
const Product = mongoose.model('Product')
const ValidationContract = require('../validators/validator')

exports.get = (req, res, next) => {
    Product.find({
        active: true
    }, 'title price slug')
        .then(data => {
            res.status(200).send(data)
        })
        .catch(e => {
            res.status(400).send({ message: 'Falha ao listar produtos.', data: e })
        })
}

exports.getBySlug = (req, res, next) => {
    Product.findOne({
        slug: req.params.slug,
        active: true
    }, 'title description price slug tags')
        .then(data => {
            res.status(200).send(data)
        })
        .catch(e => {
            res.status(400).send({ message: 'Falha ao listar produto.', data: e })
        })
}

exports.getById = (req, res, next) => {
    Product.findById(req.params.id)
        .then(data => {
            res.status(200).send(data)
        })
        .catch(e => {
            res.status(400).send({ message: 'Falha ao listar produto.', data: e })
        })
}

exports.getByTag = (req, res, next) => {
    Product.find({
        tags: req.params.tag,
        active: true
    }).then(data => {
        res.status(200).send(data)
    })
        .catch(e => {
            res.status(400).send({ message: 'Falha ao listar produto.', data: e })
        })
}

exports.post = (req, res, next) => {
    let contract = new ValidationContract()

    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres')
    contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres')
    contract.hasMinLen(req.body.description, 3, 'A descrição deve conter pelo menos 3 caracteres')

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end()
        return
    }

    const product = new Product(req.body)
    product.save()
        .then(x => {
            res.status(201).send({ message: 'Produto cadastrado com sucesso!' })
        })
        .catch(e => {
            res.status(400).send({ message: 'Falha ao cadastrar o produto.', data: e })
        })
}

exports.put = (req, res, next) => {
    Product.findByIdAndUpdate(req.params.id, {
        $set: { // Passando os dados da req para o objeto
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            slug: req.body.slug
        }
    })
        .then(x => {
            res.status(200).send({
                message: 'Produto atualizado com sucesso!'
            })
        })
        .catch(e => {
            res.status(400).send({
                message: 'Falha ao cadastrar o produto.',
                data: e
            })
        })
}

exports.del = (req, res, next) => {
    Product.findByIdAndRemove(req.body.id)
        .then(x => {
            res.status(200).send({
                message: 'Produto removido com sucesso!'
            })
        })
        .catch(e => {
            res.status(400).send({
                message: 'Falha ao remover o produto.',
                data: e
            })
        })
}