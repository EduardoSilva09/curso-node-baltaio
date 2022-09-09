'use strict'

const md5 = require('md5')
const ValidationContract = require('../validators/validator')
const repository = require('../repositories/customer-repository.js')
const emailService = require('../services/email-service')
const authService = require('../services/auth-service')

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
        const data = {
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        }

        await repository.create(data)
        emailService.send(
            data.email,
            'Bem vindo ao Node Store',
            global.EMAIL_TMPL.replace('{0}', data.name))
        res.status(201).send({ message: 'Cliente cadastrado com sucesso!' })
    }
    catch (e) {
        res.status(400).send({ message: 'Falha ao cadastrar o cliente.', data: e })
    }
}

exports.authenticate = async (req, res, next) => {
    try {
        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        })

        if (!customer) {
            res.status(404).send({
                message: 'Usuário ou senha inválidos'
            })
            return
        }

        const token = await authService.generateToken({
            name: customer.name,
            email: customer.email,
        })

        res.status(201).send({
            token: token,
            name: customer.name,
            email: customer.email,
        })
    }
    catch (e) {
        res.status(400).send({ message: 'Authenticação falhou.', data: e })
    }
}

