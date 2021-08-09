const express = require('express');
const router = express.Router();
const User = require('../models/User')
const Hotel = require('../models/Hotel')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const _ = require('lodash')
require('dotenv').config()
const protectRoute = require("../protect/protect")
const mailgun = require("mailgun-js");
const DOMAIN = 'sandboxbfeae8053c41432dbda1c5d53e65260d.mailgun.org';
const mg = mailgun({ apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN });

// Create ->  POST
router.post("/register", async (req, res) => {
    try {
        const newUser = new User(req.body);
        console.log("newUser")

        console.log(newUser)
        await newUser.save();
        res.status(200).json({
            message: "Welcome to Our Webstie"

            , success: true
        })
    } catch (err) {
        res.status(401).json({
            name: err.name,
            message: err.message,
            url: req.originalUrl
        })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email: email })
        if (!user) throw new Error("Incorrect Email or Password. Please Try Again.")
        if (!bcrypt.compareSync(password, user.password)) throw new Error("Incorrect password")
        // We don't want to send the password to the front-end
        user.password = undefined // -> One Way
        // const {password..., other} = un -> Second Way
        let token = jwt.sign({ user }, process.env.SECRETKEY, { expiresIn: 60 * 60 * 1000 })
        res.json({ message: "Wellcome Back", token })
    } catch (err) {
        res.status(401).json({
            name: err.name, message: err.message,
            url: req.originalUrl
        })
    }
})

router.get('/allhotels/:userID', async (req, res) => {
    const userID = req.params.userID
    try {
        const user = await User.findById(userID)
        res.json({ message: "All Hotels for user", hotels: user.resHotel })
    } catch (error) {
        res.status(401).json({
            name: error.name, message: error.message, url: req.originalUrl
        })
    }
})
router.get('/allflights/:userID', async (req, res) => {
    const userID = req.params.userID
    try {
        const user = await User.findById(userID)
        res.json({ message: "All Flights for user", flights: user.resFlight })
    } catch (error) {
        res.status(401).json({
            name: error.name, message: error.message, url: req.originalUrl
        })
    }
})

router.get('/allUsers', async (req, res) => {
    try {
        const users = await User.find()
        res.json({ message: "All users", users })
    } catch (error) {
        res.status(401).json({
            name: error.name, message: error.message, url: req.originalUrl
        })
    }
})

// User.findByIdAndUpdate(req.user.id, { password: hash })

router.put('/changepass/:userID', protectRoute, async (req, res) => {
    const userID = req.params.userID
    try {
        let user1 = await User.findById(userID)
        console.log(user1);
        if (user1.verifyPassword(req.body.password_old)) {
            let hash = bcrypt.hashSync(req.body.password_new, bcrypt.genSaltSync());
            const user = await User.findByIdAndUpdate(userID, { password: hash })
            res.json({ message: "password updated" })
        } else {
            throw new Error("password error")
        }
    } catch (error) {
        res.status(401).json({
            name: error.name, message: error.message, url: req.originalUrl
        })
    }

})

router.put('/editprofile/:userID', async (req, res) => {
    const userID = req.params.userID
    console.log(userID)
    console.log(req.body)
    try {
        // let data ={
        //     $set: req.body.user
        // }
        const user = await User.findByIdAndUpdate(userID, {$set:req.body.user}, { new: true })
        res.json({ message: "Update profile Successfully", user })
    }
    catch (error) {
        res.status(401).json({
            name: error.name, message: error.message, url: req.originalUrl
        })
    }
})

router.get('/reservations/:userID', async (req, res) => {

    try {
        const users = await User.find()
        res.json({ message: "All users", users })
    } catch (error) {
        res.status(401).json({
            name: error.name, message: error.message, url: req.originalUrl
        })
    }

})

router.put('/forgotpassword', (req, res) => {
    const { email } = req.body
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({ error: "User with this email does not exists." })
        }
        const token = jwt.sign({ _id: user._id }, process.env.RESET_PASSWORD_KEY, { expiresIn: '20m' })
        const data = {
            from: 'noreply@lookaround.com',
            to: email,
            subject: "Password Resest",
            html: `<h2>To reset your password, please click on the given link.</h2><br><p>${process.env.CLIENT_URL}/resetpassword/${token}</p>`
        }
        return user.updateOne({ resetLink: token }, (err, success) => {
            console.log(err);
            if (err) {
                return res.status(400).json({ error: "Reset password went wrong." })
            }
            else {
                mg.messages().send(data, (error, body) => {

                    console.log("error");

                    console.log(error);
                    if (error) {
                        return res.json({
                            error: "err.message"
                        })
                    }
                    return res.json({ message: "Password reset email has been sent." })
                })
            }
        })
    })
})

router.put('/resetpassword/:resetLink', (req, res) => {
    const newPass = req.body.newPass
    const resetLink = req.params.resetLink
    if (resetLink) {
        jwt.verify(resetLink, process.env.RESET_PASSWORD_KEY, (error, decodeDate) => {
            if (error) {
                return res.status(401).json({ error: "Authentication error." })
            }
            User.findOne({ resetLink }, (err, user) => {
                if (err || !user) {
                    console.log(err);
                    return res.status(400).json({ error: "User with this email does not exists." })
                }
                const obj = {
                    password: newPass,
                    resetLink: ''
                }
                user = _.extend(user, obj)
                user.save((err, result) => {
                    if (err) {
                        return res.status(400).json({ error: "Reset Psssword Error" })
                    }
                    else {
                        return res.status(200).json({ message: "Your Psssword Has Been Changed." })
                    }
                })
            })
        })
    }
    else {
        return res.status(401).json({ error: "Authentication error." })
    }
})

router.delete('/delete/:userID', protectRoute,async (req, res) => {
    const userID = req.params.userID
    try {
        let user1 = await User.findById(userID)
        if (user1) {
            const delUser = await User.findByIdAndDelete(userID)
            res.json({ message: "Delete account Successfully" })
        } else {
            throw new Error("There is no user")
        }
    } catch (error) {
        res.status(401).json({
            name: error.name, message: error.message, url: req.originalUrl
        })
    }
})
module.exports = router
