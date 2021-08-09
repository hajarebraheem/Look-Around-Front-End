const express = require('express');
const app = express();
const PORT = 4000;
require('dotenv').config();
const cors = require('cors');
const mongoose = require("mongoose");
const path = require('path')

mongoose.connect(process.env.MONGODB , 
 { useUnifiedTopology: true  ,  useNewUrlParser: true} ,
    ()=>console.log('Connect to MongoDB') )

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());

const userRoute = require('./routes/user_route');
const hotelRoute = require('./routes/hotel_route');
const flightRoute = require('./routes/flight_route');


app.use('/user', userRoute);
app.use('/hotel', hotelRoute);
app.use('/flight', flightRoute);

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });

app.listen(PORT ,()=>console.log('listening on port '+PORT))