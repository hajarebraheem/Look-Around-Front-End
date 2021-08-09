import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom"
import checkout from './../../css/checkout.css'
import Moment from 'moment';
import QRCode from 'react-qr-code'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import { includes } from 'lodash'

const muiBaseTheme = createMuiTheme();

const theme = {
    overrides: {
        MuiCard: {
            root: {
                "&.MuiEngagementCard--01": {
                    transition: "0.3s",
                    maxWidth: 400,
                    margin: "auto",
                    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
                    "&:hover": {
                        boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
                    },
                    "& .MuiCardMedia-root": {
                        paddingTop: "56.25%",
                    },
                    "& .MuiCardContent-root": {
                        textAlign: "left",
                        padding: 1,
                    },
                    "& .MuiDivider-root": {
                        margin: `${muiBaseTheme.spacing.unit * 3}px 0`
                    },
                    "& .MuiTypography--heading": {
                        fontWeight: "bold"
                    },
                    "& .MuiTypography--subheading": {
                        lineHeight: 1.8
                    },
                    "& .MuiAvatar-root": {
                        display: "inline-block",
                        border: "2px solid white",
                        "&:not(:first-of-type)": {
                            marginLeft: -muiBaseTheme.spacing.unit
                        }
                    }
                }
            }
        }
    }
};
export default function FlightCheckOut(props) {
    console.log(props);
    const history = useHistory()
    const travelerPricings = props.checkoutflight?.travelerPricings
    let traveler = []
    const routesPaths = props.checkoutflight?.itineraries[0].segments.length
    
    let routes = []
    let passnger = []
    let adult = 0, child = 0

    const userOnsubmitHandler = (e) => {
        axios.post(`http://localhost:4000/flight/add/${props.user._id}`,
            {
                'airlineName': "Aa",
                'depDate': props.checkoutflight?.itineraries[0].segments[0].departure.at,
                'depStation': props.checkoutflight?.itineraries[0].segments[0].departure.iataCode,
                'arrStation': props.checkoutflight?.itineraries[0].segments[0].arrival.iataCode,
                'startFlight': props.checkoutflight?.itineraries[0].segments[0].departure.at,
                'endFlight': props.checkoutflight?.itineraries[0].segments[0].arrival.at,
                'adult': adult,
                'child': child,
                'type': props.checkoutflight?.travelerPricings[0].fareDetailsBySegment[0].cabin,
                'price': props.checkoutflight?.price.total
            }, { headers: { "token": localStorage.getItem("token") } })
            .then(result => {
                console.log(result);
                history.push("/profile")
            })
            .catch(function (error) {
                console.log(error);
            })

    }
let child_price=0
    for (let index = 0; index < routesPaths; index++) {
        if (index == 0) {
            for (const key in travelerPricings) {
                if (Object.hasOwnProperty.call(travelerPricings, key)) {
                    const element = travelerPricings[key];
                    for (let i = 0; i < element.fareDetailsBySegment.length; i++) {
                        console.log(element.fareDetailsBySegment[0]);
                        element.travelerType == "ADULT" ? adult += 1 : child += 1
                        element.travelerType == "CHILD" ? child_price=element.price.base : child_price=child_price
                    }
                }
            }
        }
        routes.push(
            <>
                <div class="route">
                    {routesPaths > 1 ?
                        <>
                            <h2>{props.checkoutflight?.itineraries[0].segments[index].departure.iataCode}</h2>
                            <svg class="plane-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 510 510">
                                <path fill="#3f32e5" d="M497.25 357v-51l-204-127.5V38.25C293.25 17.85 275.4 0 255 0s-38.25 17.85-38.25 38.25V178.5L12.75 306v51l204-63.75V433.5l-51 38.25V510L255 484.5l89.25 25.5v-38.25l-51-38.25V293.25l204 63.75z" />
                            </svg>
                            <h2>{props.checkoutflight?.itineraries[0].segments[index].arrival.iataCode}</h2>
                        </>
                        :
                        <>

                            <h2>{props.checkoutflight?.itineraries[0].segments[index].departure.iataCode}</h2>
                            <svg class="plane-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 510 510">
                                <path fill="#3f32e5" d="M497.25 357v-51l-204-127.5V38.25C293.25 17.85 275.4 0 255 0s-38.25 17.85-38.25 38.25V178.5L12.75 306v51l204-63.75V433.5l-51 38.25V510L255 484.5l89.25 25.5v-38.25l-51-38.25V293.25l204 63.75z" />
                            </svg>
                            <h2>{props.checkoutflight?.itineraries[0].segments[index].arrival.iataCode}</h2>
                        </>
                    }
                </div>
            </>
        )

    }

 


    return (
        <die className="test1">
            <MuiThemeProvider theme={createMuiTheme(theme)}>
            {/* <Grid item >
                        <Typography className={"MuiTypography--heading"}
                            style={{ fontWeight: "bold", marginBottom: "20px" }}
                            variant={"h6"}
                            gutterBottom>
                            Checkout
                        </Typography>
                    </Grid> */}
                <div className="App" style={{ marginTop: "70px", width: "910px"}}>
                    <Grid container style={{ justifyContent: "center",width: "100%" }}>
                        <Grid item style={{ margin: "20px", width: "300px" }}>
                            {/* the left card */}
                            <Card className={"MuiEngagementCard--01"} >
                                <CardContent>
                                    <Grid container>
                                        <Grid container style={{ padding: "10px" }}>

                                            <Grid item style={{ height: "35px" }}>
                                                <p style={{ fontWeight: "bold" }}>Name</p>
                                            </Grid>
                                            <Grid container >
                                                <Grid item >
                                                    <p>{props.user.name}</p>
                                                </Grid>
                                            </Grid>

                                            <Grid item style={{ height: "35px" }}>
                                                <p style={{ fontWeight: "bold" }}>Cabin</p>
                                            </Grid>
                                            <Grid container >
                                                <Grid item >
                                                    <p>{props.checkoutflight?.travelerPricings[0].fareDetailsBySegment[0].cabin}</p>
                                                </Grid>
                                            </Grid>

                                            <Grid item style={{ height: "35px" }}>
                                                <p style={{ fontWeight: "bold" }}>Date</p>
                                            </Grid>
                                            <Grid container >
                                                <Grid item >
                                                    <p>{Moment(props.checkoutflight?.itineraries[0].segments[0].departure.at).format('YYYY-MM-DD, hh:mm')}</p>
                                                </Grid>
                                            </Grid>

                                            <Grid item style={{ height: "35px" }}>
                                                <p style={{ fontWeight: "bold" }}>Ticket Per Adult</p>
                                            </Grid>
                                            <Grid container >
                                                <Grid item >
                                                    <p>{props.checkoutflight?.price.total}   {props.checkoutflight?.price.currency}</p>
                                                </Grid>
                                            </Grid>

                                            {child > 0  ?
                                                <>
                                                    <Grid item style={{ height: "35px" }}>
                                                        <p style={{ fontWeight: "bold" }}>Ticket Per Child</p>
                                                    </Grid>
                                                    <Grid container >
                                                        <Grid item >
                                                             <p>{child_price}</p> 
                                                        </Grid>
                                                    </Grid>
                                                </>
                                                :
                                                null
                                            }

                                            <Grid item style={{ height: "35px" }}>
                                                <p style={{ fontWeight: "bold" }}>Total Price</p>
                                            </Grid>
                                            <Grid container >
                                                <Grid item >
                                                    <p>{props.checkoutflight?.price.total} {props.checkoutflight.price?.currency}</p>
                                                </Grid>
                                            </Grid>

                                        </Grid>

                                    </Grid>

                                </CardContent>
                                <Grid container justify="center" alignItems="center">
                                <Grid container style={{ width: "50%", marginTop: "10px", marginBottom: "20px" }} justify="center" alignItems="center" justify="space-between">
                                    <Grid item>
                                        <Button style={{ fontSize: "10px", width: "140px", backgroundColor: "#D3FFE9" }} onClick={(e) => userOnsubmitHandler(e)} variant="contained">Save</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            </Card>
                            {/* airline card */}
                            
                        </Grid>

                        <Grid item style={{ marginTop: "30px" }}>
                            <main class="ticket-system" >
                                <div class="receipts-wrapper">
                                    <div class="receipts" >
                                        <div class="receipt">
                                            <Typography className={"MuiTypography--heading airliner-logo"}
                                                style={{ fontWeight: "bold" }}
                                                variant={"h6"}
                                                gutterBottom>
                                                {props.checkoutflight?.itineraries[0].segments[0].operating.carrierCode}
                                            </Typography>

                                            {routes}

                                            <div class="details">
                                                <div class="item">
                                                    <span>Passanger</span>
                                                    <h3>{child + adult}</h3>
                                                </div>
                                                <div class="item">
                                                    <span>Flight No.</span>
                                                    <h3>{props.checkoutflight?.itineraries[0].duration}</h3>
                                                </div>
                                                <div class="item">
                                                    <span>Departure</span>
                                                    <h3>{Moment(props.checkoutflight?.itineraries[0].segments[0].departure.at).format('HH:mm')}</h3>
                                                </div>
                                                <div class="item">
                                                    {/* props.checkoutflight?.travelerPricings */}
                                                    <span>Arrival</span>
                                                    <h3>{Moment(props.checkoutflight?.itineraries[0].segments[0].arrival.at).format('HH:mm')}</h3>
                                                </div>
                                                <div class="item">
                                                    <span>Life Stage</span>
                                                    <h3> {adult} Adult {child > 0 ? `with ${child} child` : null}</h3>
                                                </div>
                                                <div class="item">
                                                    <span>Price</span>
                                                    <h3>{props.checkoutflight?.price.total}</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="receipt qr-code">
                                            <QRCode className="plane-icon" value={props.checkoutflight?.travelerPricings[0].travelerId} size={80} level={"H"}
                                                includeMargin={true} />
                                            <div class="description">
                                                <h2>{props.checkoutflight?.travelerPricings[0].travelerId}</h2>
                                                <p>Show QR-code when requested</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </Grid>
                    </Grid>
                </div>
            </MuiThemeProvider>
        </die>
    )
}
// hajaribraheem@hotmail.com
// 1234567890