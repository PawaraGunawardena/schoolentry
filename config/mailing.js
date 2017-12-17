'use strict';
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'moeofficeclerk@gmail.com',
           pass: 'moeofficeclerk'
    }
});

const mailOptions = {
    from: 'moeofficeclerk@gmail.com', // sender address
    to: 'dasun.15@uomcse.lk', // list of receivers
    subject: 'Accepted lists', // Subject line
    html: '<p>Your html here</p>'// plain text body
  };

  