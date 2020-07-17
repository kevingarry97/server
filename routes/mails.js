const express = require("express");
const nodemailer = require("nodemailer");
const { Mails } = require('../model/mail')
const details = require("../config/details.json");

const router = express.Router()

router.get('/', (req, res) => {
    res.send('Working')
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

async function sendMail(user, callback) {
    // create reusable transporter object using the default SMTP transport
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
      from: '"Fun Of Heuristic"<example.gimail.com>', // sender address
      to: user, // list of receivers
      subject: "Wellcome to Fun Of Heuristic 👻", // Subject line
      html: `<h1>Hi, This is finn</h1><br>
      <h4>Thanks for joining us</h4>`
    };
  
    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);
  
    callback(info);
  }

module.exports = router