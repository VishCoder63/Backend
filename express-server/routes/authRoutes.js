const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/UserModel')
const {v4} =require('uuid')


//READ
router.get("/", async (req, res) => {
  try {
    const usersDB = await User.findAll();
    const u = usersDB.map(user => {
      
      user.dataValues.password = undefined;
      return user
      
    })
    res.status(200).send(u);
  } catch (e) {
    console.log("here!", e.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findOne({
      where: {
        id,
      },
    });
    if (!user) res.status(404).send("Invalid user-id")
    else res.status(200).send({...user['dataValues'],password:undefined})
  } catch (e) {
    console.log('here!',e.message)
  }
})


//CREATE
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // console.log(name,email,password)
    // user exists ?
    // if true print error
    // if false make object and encrypt password and push to Array
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (user) res.status(404).send("Email id is already registered")
    else {

      const user = {
        name,
        email,
        password: bcrypt.hashSync(password, 10),
      };

      const response = await User.create(user)
      response.dataValues.password = undefined;



      res.status(200).send({...response.dataValues});
    }
  } catch (e) {
    console.log("error:", e.message);
  }
});
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({
      where: {
        email,
      },
    });
    if (!userExists) res.status(404).send("Invalid credentials!")
      
      const passwordMatches = bcrypt.compareSync(password, userExists.password, 10)
      if (!passwordMatches) res.status(404).send("Invalid credentials!")
  
        res.status(200).send(`Welcome back ${userExists.name}!`);
    
  } catch (e) {
    console.log("error:", e.message);
  }
});
//UPDATE
router.patch("/:id", async(req, res) => {
  try {
    const { id } = req.params
    const user = await User.findOne({
      where: {
        id,
      },
    });
    if (!user) res.status(404).send("Invalid user-id")
    else {      
      const { name, email } = req.body;
      const data = {}

      if (email) {
        const user = await User.findOne({
          where: {
            email,
          },
        });
        if (user)
          res.status(400).send("Email already present in DB!");
      }


      // data = {
      //   email : email || validUser.email
      // }

      
      const updateUser = await User.update(req.body, {
        where: {
          id,
        },
      });
      
        res.status(200).send(updateUser);
      }
    
  } catch (e) {
    console.log('here!',e.message)
  }
})
//DELETE
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findOne({
      where: {
        id,
      },
    });


    if (!user) res.status(400).send("Invalid user-id")
    else { 
      const status = await User.destroy({
        where: {
          id,
        },
      })

      res.status(200).send(`Deleted ${user.name}`)
    }
  } catch (e) {
    console.log(e.message)
  }
  
})

module.exports = router