// create a node app
const express= require('express')
const nodemailer =require('nodemailer')
const app=express()
require('dotenv').config();
const Port =3000


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: "troywurld@gmail.com",
      pass: process.env.USER_PASSCODE,
      accessToken: process.env.GMAIL_ACCESSTOKEN,
      clientId: process.env.OAUTH_CLIENTID,
      refreshToken: process.env.GMAIL_REFRESH_TOKEN
    }
  });

  let mailOptions = {
    from: "troywurld@gmail.com",
    to: "uchennaonwuliri@gmail.com",
    subject: 'Nodemailer Project zuri project',
    text: 'Hi from your nodemailer project,courtesy of the Zuri Team Training'
  };

  transporter.sendMail(mailOptions, function(err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
  });
  
app.listen(Port,(()=>{
    console.log(`nodemailer is listening at ${Port}`)
}))