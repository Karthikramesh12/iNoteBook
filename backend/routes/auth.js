const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_CODE = "Karmine12@_and|this/should)beScure(enough";
const fetchuser = require('../middleWare/fetchuser')

// route 1: to create a user of register
router.post('/createUser',[
    body('name').isLength({min: 3}),
    body('email').isEmail(),
    body('password').isLength({min: 5}),
], async (req, res)=>{
    var success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        success = false;
        return res.status(400).json({success, errors: errors.array()});
    }

    try{
        let user = await User.findOne({success, email: req.body.email})
        if (user){
            success = false;
            return res.status(400).json({success, error: "This Email is already registered"});
        }
        const salt = await bcrypt.genSalt(10); 
        const secPassword = await bcrypt.hash(String(req.body.password), salt)

        user = await User.create({
            Name: req.body.name,
            email: req.body.email,
            password: secPassword
        });
        const Data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(Data, JWT_CODE);
        success = true
        res.json({success, authToken})
    }
    catch(error){
        console.error(error.message)
        res.status(500).send("Internal server Error");
    }
})
//route 2: to login the user
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be empty').exists()
], async (req, res) => {
    var success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success = false;
        return res.status(400).json({ success, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false
            return res.status(400).json({ success, error: "Please try with correct credentials" });
        }

        // Correct usage of bcrypt.compare
        const passwordCompare = await bcrypt.compare(String(password), user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please try with correct credentials" });
        }

        const Data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(Data, JWT_CODE);
        success = true
        res.json({success, authToken})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

// route 3: return the data of the user "/api/v1/auth/getuser"
router.post('/getuser', fetchuser, async (req, res) => {
    try{
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user)
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

module.exports = router 