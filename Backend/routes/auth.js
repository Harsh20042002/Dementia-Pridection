const express = require("express"); 
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetch')

const JWT_SECRET = 'HarshFaldu' // should be put in env.local
const router = express.Router();
 
// create user : no login req.
router.post("/createuser",[
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid mail").isEmail(),
    body("password", "Invalid Password").isLength({ min: 5 }),],
    async (req, res) => {
        let success = false
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array() });
        }
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({success, error: "Sorry, User already exist" });
            }
            const salt = await bcrypt.genSalt(10)
            const secPass = await bcrypt.hash(req.body.password, salt)
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass
            });
            const data = {
                user:{
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET)
      
            success=true
            res.json({success, authtoken});

        } 
        catch (error) 
        {
            console.log(error.message);
            res.status(500).send("Internal server error!");
        }
  }
);

// Authenticate : no login req.
router.post("/login",[
  body("email", "Enter a valid mail").isEmail(),
  body("password", "Password cannot be blank").exists()],
  async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) 
    {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body
    try 
    {
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).josn({success, error: "Try with correct credentials."})  
        }
    
        const passwordCompare = await bcrypt.compare(password, user.password)
        if(!passwordCompare){
            return res.status(400).json({success, error: "Try with correct credentials."})  
        }
        const data = {
            user:{
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        success = true;
        res.json({success, authtoken});
    }

    catch (error)
    {
        console.log(error.message);
        res.status(500).send("Internal server error!");
    }
})

// get user details : login req.
router.post('/getuser', fetchuser, async (req, res)=>{
    try 
    {
        userId = req.user.id;
        const user = await User.findById(userId).select('-password')
        res.send(user)
    } 
    catch (error) 
    {
        console.log(error.message);
        res.status(500).send("Internal server error!");
    }

})

module.exports = router