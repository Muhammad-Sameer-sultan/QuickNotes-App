const express = require("express");
const User = require("../Models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// create a User using : post "/api/auth/createuser" no login required
router.post(
  "/createuser",
  [
    body("name", "Name must be greater than 3 character").isLength({ min: 3 }),
    body("email", "Enter Valid mail").isEmail(),
    body(
      "password",
      "password must be strong and more than 3 character"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    // if there are error return bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // lets check wheter the user with this email exist or not
    let user = await User.findOne({ email: req.body.email });
    try {
      if (user) {
        return res
          .status(400)
          .json({ error: "sorry the email with this user is already exist" });
      }
      const salt=await bcrypt.genSalt(10)
      const secPass=await bcrypt.hash(req.body.password,salt)
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data= {
        user:{
          id: user.id
        }
      }
      const authtoken = jwt.sign(data,"JWT_SECRET")
      console.log(authtoken)
      
      res.json({authtoken});
    } catch (error) {
      console.log(error);
      res.status(500).send("some error occur  ");
    }
    //  .then(user=>res.json(user)).catch(err=>{console.log(err)
    //   res.json({error: "please enter a unique value for email",message: err.message})}
    //  )


    // console.log(req.body)
    // res.send("hellow" )
  }
);

module.exports = router;
