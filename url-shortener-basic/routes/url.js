const { BASE_URL, BACKEND_BASE_URL } = require('../constants');
const URLModal = require('../models/URLModal');

const router = require('express').Router()
const { nanoid } = require('nanoid')
// const nanoid = (...args) => import('nanoid').then(({default: nanoid}) => nanoid(...args));



router.post("/", async (req, res) => {
  try {
    const { longUrl } = req.body;
    const id = nanoid(4);
    const data = {
      shortUrl: id,
      longUrl,
    }
    const response = await URLModal.create(data) 
    response.dataValues["status"] = "OK";
    response.dataValues["shortUrl"] = `${BACKEND_BASE_URL}/${data.shortUrl}`
    res.status(200).send(response);
  } catch (e) {
    res.status(500).send(e.message)
  }})
  
router.get("/", async (req, res) => {
  try {
    const urls = await URLModal.findAll()
    res.status(200).send(urls)

  } catch (e) {
    res.status(500).send(e.message)
      
  }
})

router.get("/:shortUrl", async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const url = await URLModal.findOne({
      where:{shortUrl}
    })
    console.log(url)
    if(!url) res.status(404).send("Invalid url!")
    else res.status(200).redirect(url.longUrl)

  } catch (e) {
    res.status(500).send(e.message)
      
  }
})


module.exports=router