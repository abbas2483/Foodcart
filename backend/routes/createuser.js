const express = require('express')
const router = express.Router()
const User = require('../models/user')
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bycrpt = require('bcryptjs');
const JWT_SECRET = process.env.JWT_SECRET;
require('dotenv').config();


router.post("/createuser",
    body('email', 'Invalid Email').isEmail(),
    body('password', 'Invalid Password').isLength({ min: 5 }),
    body('name', 'Invalid Name').isLength({ min: 3 }),
    body('location', 'Invalid Location').isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bycrpt.genSalt(10);
        let secPassword = await bycrpt.hash(req.body.password, salt);


        try {
            await User.create({
                name: req.body.name,
                email: req.body.email,
                location: req.body.location,
                password: secPassword
            })
            res.json({ success: true });
        } catch (error) {
            // console.log(error);
            res.json({ success: false });

        }
    });


router.post("/loginuser",
    body('email', 'Invalid Email').isEmail(),
    body('password', 'Invalid Password').isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.status(400).json({ errors: "Enter Valid Credentials" });
        }
        let email = req.body.email;
        try {
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Enter Valid Credentials,user not found" });
            }
            const passwordCompare = await bycrpt.compare(req.body.password, userData.password);
            if (!passwordCompare) {
                return res.status(400).json({ errors: "try logging with correct credentials" });
            }
            const data = {
                user:{
                    id:userData.id
                }
            }
            const authToken = jwt.sign(data,JWT_SECRET);
            return res.json({ success: true,authToken:authToken });
        } catch (error) {
            console.log(error);
            res.json({ success: false });

        }
    });
module.exports = router;








