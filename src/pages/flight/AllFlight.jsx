import React from 'react'
import FlightForm from './FlightForm'
import FlightCard from './FlightCard'
import { useState, useEffect } from 'react'
import axios from 'axios'
import "../../css/home.css"
import "../../css/flightCard.css"
import NonStopCard from "./NonStopCard"
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import StopCard from "./StopCard"
import Alert from '@material-ui/lab/Alert';
import { useHistory } from "react-router-dom"

export default function AllFlight(props) {
    const [flights, setFlights] = useState({})
    const [tokenflight, setTokenFlight] = useState('')
    const [operator, setOperator] = useState({})
    const [returnDate, setreturnDate] = useState({})
    const history = useHistory()

    // city 1 RUH
    // city 2 JED
    // date go yyy-mm-dd
    // date return yyy-mm-dd
    // adults 
    // child optinal 
    // travel class dropdown list 1- economy premium_Econmy Business FIRET all caps
    // nonStop boolean
    // currencycode 
    // maxprice 
    //max 250

    useEffect(() => {
        if (flights.data?.data) {
            console.log(props);
        }
    }, [flights])

    var flightCard = flights.data?.data.map(ele => {
        return <FlightCard flight={ele} setSearchbyCity={props.setSearchbyCity} searchbyCity={props.searchbyCity} setCheckoutFlight={props.setCheckoutFlight} />
    })

    return (
        <div>
            <FlightForm setFlights={setFlights} currency={props.currency} setTokenFlight={setTokenFlight} setreturnDate={setreturnDate} />
            <Grid
                style={{ height: "260px" }}
                container
                direction="column"
                justify="center"
            >
                {
                    <div className="allFlights">
                        {flightCard}
                    </div>}
                {/* <NonStopCard/>
            <StopCard/>*/}
             
            </Grid> 
        </div>
    )
}
