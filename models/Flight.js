const mongoose = require('mongoose');

const flightSchema = mongoose.Schema({
    airlineName: { // Saudi Airlines
        type: String,
        required: true
    },
    // Does API has image for Airlines?
    depDate: { // 6 Jun
        type: Date,
        required: true,
    },
    depStation: { // Riyadh
        type: String,
        required: true
    },
    arrStation: { // Jeddah
        type: String,
        required: true
    },
    startFlight: { // 6:00 AM
        type: String,
        required: true
    },
    endFlight: { // 7:30 AM
        type: String,
        required: true
    },
    adult: { // 1
        type: Number,
        required: true,
        default: 1
    },
    child: { // 0
        type: Number,
        required: true,
        default: 0
    },
    type: { // Economy
        type: String,
        required: true
    },
    price: { // 300 SR
        type: Number,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "Book"

    },
},
 {timestapm: true}
 )

const Flight = mongoose.model("flight" , flightSchema);
module.exports = Flight;