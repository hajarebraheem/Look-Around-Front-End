import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import axios from 'axios'
import Rating from '@material-ui/lab/Rating';
import HotelCard from './HotelCard'
import "../../css/hotelInfo.css"
import { SlidShow } from "../../Helper/SlidShow"
import GoogleMap from "../../Helper/GoogleMap"
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';


export default function HotelInfo(props) {
    const numberOfNights = ""

    // const qs = require('qs')
    // var data = qs.stringify({'grant_type': "client_credentials",'client_id': "B8nTnSTHwTubAfV9mUE750yPfenCotFE",'client_secret': "FdazkFlCwOj50rrk"});
    // var config = {method: 'post',url: 'https://test.api.amadeus.com/v1/security/oauth2/token',headers: {'Content-Type': 'application/x-www-form-urlencoded'},data: data};

    const [token, setToken] = useState({})

    const [infohotel, setInfohotel] = useState({})
    const [hotelImg, setHotelImg] = useState([])
    const history = useHistory()
    const img = []
    const [index, setIndex] = useState(0)




    const location = {
        method: 'GET', url: 'https://hotels4.p.rapidapi.com/locations/search',
        params: { query: `${props.location.state.state.hotel.name}`, locale: 'en_US' }, headers: { 'x-rapidapi-key': 'd744223f8dmsh38dad58462fe5e0p12011ejsnedf714c11a35', 'x-rapidapi-host': 'hotels4.p.rapidapi.com' }
    };


    // useEffect(()=>{

    //     axios(config)
    //     .then(result => {
    //         console.log(result.data.access_token);
    //         setToken(result.data.access_token)
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
    // }, [])

    useEffect(() => {
        axios.get(`https://test.api.amadeus.com/v2/shopping/hotel-offers/by-hotel?hotelId=${props.location.state.state.hotel.hotelId}&view=FULL_ALL_IMAGES`,
            {
                headers: { "Authorization": `Bearer ${token}` }
            }).then(result => {
                setInfohotel(result)
            }).catch(err => {
                console.log(err)
            })
    }, [token])

    useEffect(() => {

        axios.request(location).then(function (response) {
            console.log(response.data.suggestions[1].entities[0].destinationId);
            const hotelDetails = {
                method: 'GET',
                url: 'https://hotels4.p.rapidapi.com/properties/get-hotel-photos',
                params: { id: `${response.data.suggestions[1].entities[0].destinationId}` },
                headers: {
                    'x-rapidapi-key': 'd744223f8dmsh38dad58462fe5e0p12011ejsnedf714c11a35',
                    'x-rapidapi-host': 'hotels4.p.rapidapi.com'
                }
            };
            //    AIzaSyBBu2OsbvfrO6bkaVQNEx4Ioj721WUDSV4
            axios.request(hotelDetails).then(function (response) {
                const temp = response.data.hotelImages.concat(response.data.roomImages).map(ele => {
                    if (ele.imageId) {
                        img.push(ele.baseUrl.replace("{size}", "z"))
                    } else {
                        ele.images.forEach(element => {
                            img.push(element.baseUrl.replace("{size}", "z"))
                        });

                    }
                })
                console.log(img);
                setHotelImg(img)
            }).catch(function (error) {
                console.error(error);
            });
        }).catch(function (error) {
            console.error(error);
        });
        console.log(hotelImg);


    }, [])





    // boardType
    // checkInDate
    // checkOutDate
    // guests.adults
    // id
    // policies.cancellation.deadline
    // policies.cancellation.numberOfNights
    // policies.guarantee.acceptedPayments.methods[0]
    // price.currency
    // price.total
    // room.description.text
    // room.typeEstimated?.bedType
    // room.typeEstimated?.beds
    // room.typeEstimated?.category
    //  /latitude /longitude / hotelDistance.distance /address.lines[0]  cityName /contact.phone /amenities

    if (props.location.state.state.room.numberOfNights) {
        numberOfNights = <div>
            <p>Number Of Nights</p>
            <h3>{props.location.state.state.room.numberOfNights}</h3>
        </div>
    }
    console.log(props.location.state.state.hotel?.latitude);
    const nextImg = () => {
        if (index == hotelImg.length - 1) {
            console.log(index);
            setIndex(0)
        } else {
            setIndex(index + 1)
        }
    }
    const backImg = () => {
        if (index < 1) {
            console.log(index);
            setIndex(hotelImg.length)
        } else {
            setIndex(index - 1)
        }
    }
    return (

        <div className="blur">
            <div className="non-blur">



                <div class="container-HotelInfo" >

                    <div class="left-side">
                        {/* <SlidShow img={hotelImg} /> */}
                        {console.log(hotelImg[index])}
                        <img src={hotelImg[index]} />

                        <Grid container justify="space-evenly" style={{marginBottom: "20px"}}>
                            <Grid item>
                                <Button style={{backgroundColor: "#e8e8e8"}} onClick={() => nextImg()}>next</Button>
                            </Grid>
                            <Grid item>
                                <Button style={{backgroundColor: "#e8e8e8"}} onClick={() => backImg()}>back</Button>
                            </Grid>
                        </Grid>
                        
                        {<GoogleMap lat={props.location.state.state.hotel?.latitude} lng={props.location.state.state.hotel?.longitude} />}

                    </div>

                    <div class="right-side" >

                        <h2>{props.location.state.state.hotel.name}</h2>

                        <h4>{props.location.state.state.hotel.address.cityName}, {props.location.state.state.hotel.address.lines[0]}</h4>
                        <Rating name="read-only" value={props.location.state.state.hotel.rating} readOnly />

                        {numberOfNights}

                        <ul>
                            <li>


                            </li>
                            <li>
                                <p>Check In Date</p>
                                <h3>{props.location.state.state.room.checkInDate}</h3>

                                <p>Check Out Date</p>
                                <h3>{props.location.state.state.room.checkOutDate}</h3>
                                {numberOfNights}



                            </li>

                            <li>
                                <p>price</p>
                                <h3>{props.location.state.state.room.price.total} </h3>
                            </li>

                            <li>
                                <p>Description</p>
                                <p>{props.location.state.state.room.room.description.text} </p>
                                <p>Room Category</p>
                                <h3>{props.location.state.state.room.room.typeEstimated?.category}, Beds:  {props.location.state.state.room.room.typeEstimated?.beds} ,{props.location.state.state.room.room.typeEstimated?.bedType}</h3>
                            </li>
                            <li>
                                <p>Contact</p>
                                <h3>{props.location.state.state.hotel.contact?.phone}, {props.location.state.state.hotel.contact?.email}</h3>
                            </li>
                        </ul>


                        <button class="btn" onClick={() => history.push(`/hotelcheckout`)}>Confirm Reservation</button>

                    </div>
                </div>

            </div>
        </div>
    )
}


