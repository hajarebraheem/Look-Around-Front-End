import React from 'react'
import HotelCard from './HotelCard'
import HotelForm from './HotelForm'
import { useState, useEffect } from 'react'
import axios from 'axios'
import "../../css/hotelCard.css"
import Grid from '@material-ui/core/Grid';
import { GridList } from '@material-ui/core'



export default function AllHotel(props) {
    const [hotels, setHotels] = useState({})
    //this token for API
    const [tokenhotel, setTokenHotel] = useState('')

    useEffect(() => {
        console.log(hotels.data?.data);

    }, [hotels])

    var temp = []
    var hotelCard = hotels.data?.data.map(ele => {

        ele.offers.map(room => {
            console.log(room);
            temp.push(

                <Grid item>
                    <HotelCard room={room} hotel={ele.hotel} setCheckoutHotel={props.setCheckoutHotel} setCheckoutRoom={props.setCheckoutRoom} />            </Grid>
            )
            // return <HotelCard hotel={room}  checkouthotel={props.checkouthotel}/>

        })

    })
    console.log(temp);


    return (
        <>
            <Grid
                container
                direction="column"
                justify="center">
                <HotelForm setHotels={setHotels} currency={props.currency} setTokenHotel={setTokenHotel} />
                <div className="allHotels">
                    {temp}
                </div>
            </Grid>
        </>
    )
}
