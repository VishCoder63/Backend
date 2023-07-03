const path = require('path')

const router = require('express').Router()


router.get("", (req, res) => {
  console.log("===", __dirname)
  const htmlPath= path.join(__dirname,"public","index.html")
  res.status(200).sendFile(htmlPath)
})


module.exports=router