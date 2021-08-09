import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
// import ButtonBase from '@material-ui/core/ButtonBase';

//import checkout from './../../css/checkout.css'

export default function Reservations(props) {
    const [hotels, setHotels] = useState([])
    const [flights, setFlight] = useState([])
    const [allhotelsCards, setAllHotelsCards] = useState([])
    const [allFlightsCards, setAllFlightCards] = useState([])

    console.log(props);
    let allHotels = [], allFlights = []
    let hotelsCards = [], flightsCards = []

    useEffect(() => {
        // axios.get(`http://localhost:4000/user/allhotels/${props.user.ـid}`,
        //     { headers: { "token": localStorage.getItem("token") } })
        //     .then(data => {
        //         allHotels = data.data.hotels.map((ele) => {
        //             return ele._id
        //         })
        //         setHotels(allHotels)
        //     })
        //     .catch(err => console.log(err.response))
            
        // axios.get(`http://localhost:4000/user/allflights/${props.user.ـid}`,
        //     { headers: { "token": localStorage.getItem("token") } })
        //     .then(data => {
        //         allFlights = data.data.flights.map((ele) => {
        //             return ele._id
        //         })
        //         setFlight(allFlights)
        //     })
        //     .catch(err => console.log(err.response))
    }, [])
    
    useEffect(() => {
         hotels.map((e) => {
            axios.get(`http://localhost:4000/hotel/show/${e}`,
                { headers: { "token": localStorage.getItem("token") } })
                .then(data1 => {
                    
                    hotelsCards.push(data1)
                })
                .catch(err => console.log(err.response))
        })

        setAllHotelsCards(hotelsCards)

         flights.map((e) => {
            console.log(e);
            axios.get(`http://localhost:4000/flight/show/${e}`,
            { headers: { "token": localStorage.getItem("token") } })
            .then(data => {
                
                console.log(data);
                    flightsCards.push(data)
                    // data.data.flights
                })
                .catch(err => console.log(err.response))
        })
        setAllFlightCards(flightsCards)
    }, [hotels,flights])
    console.log(flightsCards)

    console.log(hotelsCards);
    return (
        <>
            <h1>Reservations</h1>
            <h2>Flight</h2>
            {/* <h1>{hotels}</h1> */}
            <h4>{flights}</h4>
            <h1></h1>
        </>
    )
}