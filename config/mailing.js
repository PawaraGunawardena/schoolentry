'use strict';
const nodemailer = require('nodemailer');

module.exports = function (nodemailer, data) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'moeofficerclerk@gmail.com',
            pass: 'dasunpubudumal'
        }
    });

    //Here assign a variable for data and create e a proper html to append to 'html' in mailOptions.

    const mailOptions = {
        from: 'moeofficeclerk@gmail.com', // sender address
        to: 'dasun.15@cse.mrt.ac.lk', // list of receivers
        subject: 'Accepted lists', // Subject line
        html: '<p>Your mail goes here</p>'// plain text body
    };


    //Send email.
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) throw err;
        console.log(info);
    });
}


