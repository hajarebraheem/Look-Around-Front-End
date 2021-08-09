const express = require('express');
const router = express.Router();
const User = require('../models/User')
const Hotel = require('../models/Hotel')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
require('dotenv').config()
const protectRoute = require("../protect/protect");
const { findById } = require('../models/User');

router.post("/add/:id",protectRoute, async (req, res) => {
    try {

        let userId = req.params.id
        let newHotel = new Hotel({ ...req.body, user: userId })
        newHotel.save()
       let addHotel=await User.findByIdAndUpdate(newHotel.user, { $push: { resHotel: newHotel} })
       if (!addHotel) {
        throw new Error ("this user not found")
    }
            res.status(200).json({
                message: "Reservation Created Successfully",
                hotel: addHotel,
                success: true
            })
    } catch (err) {
        res.status(401)
            .json({ name: err.name, message: err.message, url: req.originalUrl })
    }
})

router.put("/update/:hotelID",protectRoute, async (req, res) => {
    const hotelID= req.params.hotelID
    try {
        let updateHotel = await Hotel.findByIdAndUpdate(hotelID, req.body,{ new: true })
        console.log(updateHotel);
        if (!updateHotel) {
            throw new Error ("this hotel not found")
        }
        res.status(200).json({
                message: "Reservation update Successfully",
                hotel: updateHotel,
                success: true
            })
        
    } catch (error) {
        res.status(401)
            .json({ name: err.name, message: err.message, url: req.originalUrl })
    }    
})

router.get("/show/:hotelID",protectRoute, async (req, res) => {
    const hotelID= req.params.hotelID
    try {
        let oneHotel=await Hotel.findById(hotelID)
        if (!oneHotel) {
            throw new Error ("this hotel not found")
        }
            res.status(200).json({
                message: "show details successfully",
                hotel: oneHotel,
                success: true
            })
        
            
    } catch (error) {
        res.status(401)
            .json({ name: error.name, message: error.message, url: req.originalUrl })
    }    
})

router.put('/delete/:hotelID',protectRoute, async (req, res) => {
    const hotelID= req.params.hotelID

    try {
        const deletHotel = await Hotel.findByIdAndUpdate(hotelID, 
            {status : "cancel"}, 
            { new: true })
            if (!deletHotel) {
                throw new Error ("this user not found")
            }
        res.status(200).json({ message: "Hotel change status successfully ", deletHotel })
    } catch (error) {
        res.status(400).json({
            name: error.name,
            message: error.message,
            url: req.originalUrl
        })
    }


})
module.exports = router