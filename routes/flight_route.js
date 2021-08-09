const express = require('express');
const router = express.Router();
const User = require('../models/User')
const Flight = require('../models/Flight')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
require('dotenv').config()
const protectRoute = require("../protect/protect");
const { findById } = require('../models/User');

router.post("/add/:id", protectRoute, async (req, res) => {
    try {
        let userId = req.params.id
        let newFlight = new Flight({ ...req.body, user: userId })
        newFlight.save()
        let addFlight = await User.findByIdAndUpdate(newFlight.user, { $push: { resFlight: newFlight } })
        if (!addFlight) {
            throw new Error("this user not found")
        }
        res.status(200).json({
            message: "Reservation Created Successfully",
            hotel: addFlight,
            success: true
        })
    } catch (err) {
        res.status(401)
            .json({ name: err.name, message: err.message, url: req.originalUrl })
    }
})

router.put("/update/:FlightID", protectRoute, async (req, res) => {
    const FlightID = req.params.FlightID
    try {
        let updateFlight = await Flight.findByIdAndUpdate(FlightID, req.body, { new: true })
        if (!updateFlight) {
            throw new Error("this user not found")
        }
        res.status(200).json({
            message: "Reservation update Successfully",
            hotel: updateFlight,
            success: true
        })
    } catch (error) {
        res.status(401)
            .json({ name: err.name, message: err.message, url: req.originalUrl })
    }
})

router.get("/show/:flightID", protectRoute, async (req, res) => {
    const FlightID = req.params.FlightID
    try {
        let oneFlight = await Flight.findById(FlightID)
        if (!oneFlight) {
            throw new Error("this flight not found")
        }
        res.status(200).json({
            message: "show details successfully",
            flight: oneFlight,
            success: true
        })
    } catch (error) {
        res.status(401)
            .json({ name: error.name, message: error.message, url: req.originalUrl })
    }
})

router.put('/delete/:FlightID', protectRoute, async (req, res) => {
    const FlightID = req.params.FlightID
    try {
        const deletFlight = await Flight.findByIdAndUpdate(FlightID,
            { status: "cancel" },
            { new: true })
        if (!deletFlight) {
            throw new Error("this user not found")
        }
        res.status(200).json({ message: "Hotel change status successfully ", deletFlight })
    } catch (error) {
        res.status(400).json({
            name: error.name,
            message: error.message,
            url: req.originalUrl
        })
    }
})
module.exports = router