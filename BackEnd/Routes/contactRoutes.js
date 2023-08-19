const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",
  port: 25,
  auth: {
    user: "api",
    pass: "9340a12f51ba1077214dd505212f88f4"
  }
});

const transporter = nodemailer.createTransport(transport);

transport.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

router.post('/', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = `Message received from ${email}: ${req.body.message}`;

  const mail = {
    from: name,
    to: 'lightgaia19@gmail.com',
    subject: 'New Message from Contact Form',
    text: message
  };

  transport.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: 'fail'
      });
    } else {
      res.json({
        status: 'success'
      });
    }
  });
});

module.exports = router;