import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import axios from 'axios'
import Moment from 'moment';
import "../../css/flightCard.css"
import NonStopCard from "./NonStopCard"
import StopCard from "./StopCard"
import ReturnCard from "./ReturnCard"

//props.flight?.itineraries[0].segments[0].arrival.iataCode
//props.flight?.itineraries[0].segments[0].arrival.at
//props.flight?.itineraries[0].segments[0].arrival.terminal
//props.flight?.itineraries[0].segments[0].carrierCode
//props.flight?.itineraries[0].segments[0].departure .at .iataCode .terminal 
//props.flight?.lastTicketingDate
//props.flight?.numberOfBookableSeats
//props.flight?.oneWay
//props.flight?.price.grandTotal
//props.flight?.travelerPricings[0].fareDetailsBySegment[0].cabin
//props.flight?.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.quantityl
//data.data[87].itineraries[0].segments[0].stops

export default function FlightCard(props) {
    const history = useHistory()
    let segments = ""

    if(props.returnDate){

        segments=<ReturnCard flight={props.flight}/>



    }else{
        if(props.flight?.itineraries[0].segments.length > 1){
            segments=<StopCard flight={props.flight}/>
        }else{

            <NonStopCard flight={props.flight} style={{marginBottom: "20px"}}/>
        }
    }

  
    const goCheckout = () => {
        props.setCheckoutFlight(props.flight)
        history.push(`/flightcheckout`)
    }
    
    return (
        
            <div  onClick={()=>goCheckout()}>
                {segments}
            </div>
            

    )
}
