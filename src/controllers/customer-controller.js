'use strict'

const ValidationContract = require('../validators/validator')
const repository = require('../repositories/customer-repository.js')

exports.get = async (req, res, next) => {
    try {
        const data = await repository.get()
        res.status(200).send(data)
    } catch (e) {
        res.status(400).send({
            message: 'Falha ao listar usuários.',
        })
    }
}

exports.post = async (req, res, next) => {
    let contract = new ValidationContract()

    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres')
    contract.isEmail(req.body.email, 'O email informado é inválido')
    contract.hasMinLen(req.body.password, 8, 'A senha deve conter pelo menos 8 dígitos')

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end()
        return
    }

    try {
        await repository.create(req.body)
        res.status(201).send({ message: 'Cliente cadastrado com sucesso!' })
    }
    catch (e) {
        res.status(400).send({ message: 'Falha ao cadastrar o cliente.', data: e })
    }
}

