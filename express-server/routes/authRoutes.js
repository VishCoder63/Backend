const router = require('express').Router()
const bcrypt = require('bcrypt')
const {v4} =require('uuid')


let users = [{id:1,name:"Vishnu",email:"abc@abc.com",password:"123"}]

//READ
router.get("/", (req, res) => {
  try {
    res.status(200).send(JSON.stringify(users))
  } catch (e) {
    console.log('here!',e.message)
  }
})
router.get("/:id", (req, res) => {
  try {
    const { id } = req.params
    const user = users.find(user => user.id === id)
    if (!user) res.status(404).send("Invalid user-id")
    else res.status(200).send({...user,password:undefined})
  } catch (e) {
    console.log('here!',e.message)
  }
})
//CREATE
router.post("/signup", (req, res) => {
  try {
    const { name, email, password } = req.body;
    // console.log(name,email,password)
    // user exists ?
    // if true print error
    // if false make object and encrypt password and push to Array
    const userExists = users.find((user) => user.email === email);
    if (userExists?.hasOwnProperty("email")) {
      res.status(400).send("User's email id already exists!");
    } else {

      const user = {
        id:v4(),
        name,
        email,
        password: bcrypt.hashSync(password, 10),
      };

      users.push(user);

      res.status(200).send(`Signed up ${user.name}!`);
    }
    console.log(users);
  } catch (e) {
    console.log("error:", e.message);
  }
});
router.post("/signin", (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(name,email,password)
    // user exists ?
    // if true print error
    // if false make object and encrypt password and push to Array
    const userExists = users.find((user) => user.email === email);
    if (!userExists?.hasOwnProperty("email")) {
      res.status(401).send("Invalid cred");
    }
    
    const passwordMatches = bcrypt.compareSync(password, userExists.password, 10)
    if (!passwordMatches) res.status(401).send("Invalid cred");

      res.status(200).send(`Welcome back ${userExists.name}!`);
  } catch (e) {
    console.log("error:", e.message);
  }
});
//UPDATE
router.patch("/:id", (req, res) => {
  try {
    const { id } = req.params
    const validUser = users.find(user => user.id == id)
    if (!validUser) res.status(400).send("Invalid user-id")
    else {      
      const { name, email } = req.body;

      if (email) {
        const user = users.find((user) => user.email === email);
        if (user?.hasOwnProperty("email"))
          res.status(400).send("Email already present in DB!");
      }

        let newUser = {};
        users.forEach((user) => {
          if (user.id == id) {
            user.email = email || validUser.email;
            user.name = name;
            newUser = { ...user };
          }
        });
        res.status(200).send({...newUser,password:undefined});
      }
    
  } catch (e) {
    console.log('here!',e.message)
  }
  console.log(users)
})
//DELETE
router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params
    const user = users.find(user => user.id == id)
    if (!user?.hasOwnProperty('email')) res.status(400).send("Invalid user-id")
    else { 
      users = users.filter(user => user.id != id)
      res.status(200).send(`Deleted ${user.name}`)
    }
  } catch (e) {
    console.log(e.message)
  }
  
})

module.exports = router