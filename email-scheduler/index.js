//For more strings refer: https://crontab.guru/
const express = require('express')
const app = express()
require('dotenv').config();
const scheduler = require("node-cron");
const transport = require('./services/email');
const cronString = "* * * * *";

const temp_sender_receiver = "tosawi4863@extemer.com"
scheduler.schedule(cronString, () => {
  transport.sendMail({
    from: temp_sender_receiver,
    to: temp_sender_receiver,
    subject: "Hello from NodeJS Email Scheduler!",
    html:`<h1>Hi broo! Happy Birthday🎂🎂🎂</h1>`
  },console.log, console.error)
})

app.listen(process.env.PORT, () => {
  console.log('Listening to port:', process.env.PORT)
})

module.exports = app;
