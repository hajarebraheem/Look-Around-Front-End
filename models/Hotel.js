const mongoose = require('mongoose');

const hotelSchema = mongoose.Schema({
    hotelName: {
        type: String,
        required: true
    },
    checkIn: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "Book"

    },
    checkOut: {
        type: Date,
        required: true,

    },
    image: {
        type: String,
        required: true
    },
    adult: {
        type: Number,
        required: true,
        default: 1
    },
    child: {
        type: Number,
        default: 0
    },
    room: {
        type: Number,
        required: true,
        default: 1
    },
    price: {
        type: Number,
        required: true
    },
    // res: [{
    //     user:{
    //         type : mongoose.Schema.Types.ObjectId ,
    //         ref : 'use'
    //     }
    // }]
    user: {
        type: String,
        required: true
    }
}, {timestapm: true})

const Hotle = mongoose.model("hotel" , hotelSchema);
module.exports = Hotle;