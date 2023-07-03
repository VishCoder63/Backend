const nodemailer = require('nodemailer');
const { MailtrapConfig } = require('../config/credential');


const transport = nodemailer.createTransport(MailtrapConfig);
module.exports = transport

