const express = require("express");
const nodemailer = require("nodemailer");
const { Mails } = require('../model/mail')
const details = require("../config/details.json");

const router = express.Router()

router.get('/', (req, res) => {
  const mails = await Mails.find()
  res.status(200).send(mails)
})

router.post("/", async (req, res) => {
    console.log("request came");

    let user = req.body.email
    sendMail(user, info => {
      console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
      res.send(info);
    });

    let data = new Mails({
        email: user
    })

    data = await data.save()
});

async function sendMail(user, cb) {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: details.email,
        pass: details.password
      }
    });
  
    let mailOptions = {
      from: 'Finn-Solutions Company',
      to: user,
      subject: "Welcome to tienda-app 👻",
      html: `<h1>Hi, This is finn-solutions</h1><br>
      <h4>Thanks for joining us</h4>`
    };
  
    let info = await transporter.sendMail(mailOptions);
  
    cb(info);
  }

module.exports = router