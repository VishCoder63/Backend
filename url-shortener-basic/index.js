const express = require('express')
const feRouter =require('./routes/home')
const beRouter = require('./routes/url')
const createDb =require("./config/db")
const { PORT } = require('./constants')
const app = express()



app.use(express.json())
app.use(express.static("public"))


app.use("/api/v1/url",beRouter)
app.use("/",feRouter)

createDb.sync().then(() => {
  console.log("DB is runnimg")
})

app.listen(PORT, () => {
  console.log('Listening to port: ',PORT)
})

module.exports=app