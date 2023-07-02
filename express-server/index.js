const express = require('express')
const authRouter = require('./routes/authRoutes')
const createDb = require('./config/db')
const app = express()
const PORT = 1234
createDb.sync().then(() => {
  console.log("DB is up and running")
})

//middleware to accept body as json
app.use(express.json())

app.use('/api/v1/auth', authRouter)


app.listen(PORT, () => {
  console.log('Server is now listening to port: ', PORT)
});