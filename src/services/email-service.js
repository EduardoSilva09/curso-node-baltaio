'use strict'

const config = require('../config')
const sendgrid = require('sendgrid')(config.sendgridKey)

exports.send = async (to, subject, body) => {
    sendgrid.send({
        to: to,
        from: 'hello@balta.io',
        subject: subject,
        html: body
    })
}