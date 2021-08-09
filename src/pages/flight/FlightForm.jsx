import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import axios from 'axios'
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker.css";
import { Typography, Grid, TextField, MenuItem, Button } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from '@material-ui/core/styles';
import CitySelect from '../../components/search-by-city';
import { Alert } from '@material-ui/lab';
require('dotenv').config()

const muiBaseTheme = createMuiTheme();

const theme = {
    overrides: {
        MuiCard: {
            root: {
                "&.MuiEngagementCard--01": {
                    transition: "0.3s",
                    maxWidth: 900,
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

export default function FlightForm(props) {
    const history = useHistory()
    const qs = require('qs')

    var data = qs.stringify({
        'grant_type': process.env.REACT_APP_AMADEUS_GRANT_TYPE,
        'client_id': process.env.REACT_APP_AMADEUS_CLIENT_ID,
        'client_secret': process.env.REACT_APP_AMADEUS_CLIENT_SECRET
    });

    var config = {
        method: 'post',
        url: 'https://test.api.amadeus.com/v1/security/oauth2/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };

    const [userInput, setUserInput] = useState({})
    const [url, seturl] = useState([])
    const [token, setToken] = useState({})
    const [mesError, setMesError] = useState("")

    useEffect(() => {
        axios(config)
            .then(result => {
                setToken(result.data.access_token)
                props.setTokenFlight(result.data.access_token)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    const [testtravelclass, setTestTravelClass] = useState("")
    const handleTravelClassChange = (event) => {
        setTestTravelClass(event.target.value);
        userChangeHandler(event)
    };

    // onchange
    const userChangeHandler = (e) => {
        let value = e.target.value
        if (e.target.name == "originLocationCode" || e.target.name == "destinationLocationCode") {
            let code = e.target.value.split("  ");
            value = code[1]
        }
        let name = e.target.name
        seturl({ ...url, [name]: `${name}=${value}` });

        console.log(url)

    }
    // onSubmit
    const userOnsubmitHandler = (e) => {
        e.preventDefault()
        var resulturl = ""
        let index = 0
        for (const key in url) {
            index == (Object.keys(url).length - 1) ? resulturl = resulturl + url[key] : resulturl = resulturl + url[key] + "&"
            index++
        }
        console.log('resulturl')
        console.log(resulturl)

        // reset the user input
        const inputselect = document.querySelectorAll(".input")
        for (let index = 0; index < inputselect.length; index++) {
            const element = inputselect[index];
            // element.value=""
        }

        if (token) {
            axios.get(`https://test.api.amadeus.com/v2/shopping/flight-offers?${resulturl}&currencyCode=${props.currency}&max=250`,
                {
                    headers: { "Authorization": `Bearer ${token}` }
                }).then(result => {
                    console.log("result then");
                    console.log(result);
                    props.setFlights(result)
                    !result ? setMesError(<Alert variant='filled' severity='error'>There is no result</Alert>) : setMesError("")
                }).catch(error => {
                    console.log("Error")
                    setMesError(<Alert variant='filled' severity='error'>There is a problem</Alert>)
                })
        }

    }

    const travelClass = [
        {
            value: '',
            label: 'Select your travel class',
        },
        {
            value: 'ECONOMY',
            label: 'ECONOMY',
        },
        {
            value: 'PREMIUM_ECONOMY',
            label: 'PREMIUM ECONOMY',
        },
        {
            value: 'BUSINESS',
            label: 'BUSINESS',
        },
        {
            value: 'FIRET',
            label: 'FIRET',
        },
    ];

    const useStyles = makeStyles((theme) => ({
        root: {
            '& .MuiTextField-root': {
                width: '20ch',
                background: 'white'
            },
            flexGrow: 1,
        },
        paper: {
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }));
    const classes = useStyles()

    return (
        <div className="divFlightForm">
            {mesError}
            <div className="test1">
                <MuiThemeProvider theme={createMuiTheme(theme)}>
                    <div className="App">
                        {/* <Typography style={{ fontWeight: 600, fontSize: "40px" }} variant="h1">Flight Search</Typography> */}
                        <br />
                        <Grid container style={{ margin: "auto", justifyContent: "center", width: "85%" }}>
                            <Grid item style={{ margin: "20px", width: "900px" }}>
                                {/* the left card */}
                                <Card className={"MuiEngagementCard--01"} >
                                    <CardContent>
                                        <Grid container>
                                            <Grid container style={{ padding: "10px" }}>
                                                <div className={classes.root}>
                                                    {/* new row 1 */}
                                                    <Grid container spacing={1}
                                                        container
                                                        direction="row"
                                                        justify="center"
                                                        alignItems="center">

                                                        <Grid item xs={6} sm={3}>
                                                            <CitySelect label="Origin Location" name="originLocationCode" userChangeHandler={userChangeHandler} />
                                                        </Grid>

                                                        <Grid item xs={60} sm={3}>
                                                            <CitySelect label="destination Location" name="destinationLocationCode" userChangeHandler={userChangeHandler} />
                                                        </Grid>

                                                        <Grid item xs={6} sm={3}>
                                                            <TextField
                                                                variant="filled"
                                                                fullWidth
                                                                id="departureDate"
                                                                type="date"
                                                                label="Departure Date"
                                                                name="departureDate"
                                                                required
                                                                className={classes.textField}
                                                                onChange={(e) => userChangeHandler(e)}
                                                                InputLabelProps={{
                                                                    shrink: true,
                                                                }}
                                                            />

                                                        </Grid>
                                                        <Grid item xs={6} sm={3}>
                                                            <TextField
                                                                variant="filled"
                                                                fullWidth
                                                                name="returnDate"
                                                                id="returnDate"
                                                                placeholder="Return date"
                                                                onChange={(date) => userChangeHandler(date)}
                                                                type="date"
                                                                label="Return Date"

                                                                className={classes.textField}
                                                                InputLabelProps={{
                                                                    shrink: true,
                                                                }}
                                                            />
                                                        </Grid>

                                                    </Grid>

                                                    {/* new row 2 */}
                                                    <Grid container spacing={1}
                                                        container
                                                        direction="row"
                                                        justify="center"
                                                        alignItems="center">

                                                        <Grid item xs={6} sm={3}>
                                                            <TextField
                                                                id="travelClass"
                                                                select
                                                                name="travelClass"
                                                                label="Select travel class"
                                                                value={testtravelclass}
                                                                defaultValue=""
                                                                onChange={(e) => handleTravelClassChange(e)}
                                                                variant="filled"
                                                            >
                                                                {travelClass.map((option) => (
                                                                    <MenuItem key={option.value} value={option.value}>
                                                                        {option.label}
                                                                    </MenuItem>
                                                                ))}
                                                            </TextField>
                                                        </Grid>

                                                        <Grid item xs={6} sm={3}>
                                                            {/*        <TextField
                            name="adults"
                            id="adults"
                            onChange={(e) => userChangeHandler(e)}
                            className="input"
                            type="number"
                            Value="1"
                            placeholder="From"
                            background="red"
                            label="Adults"
                            variant="filled"
                            required
                            fullWidth
                        />  */}

                                                            <TextField
                                                                id="adults"
                                                                select
                                                                name="adults"
                                                                label="Adults"
                                                                required
                                                                defaultValue=""
                                                                onChange={(e) => userChangeHandler(e)}
                                                                variant="filled"
                                                            >
                                                                [
                            <MenuItem key='option' value=''>NULL</MenuItem>
                                                                <MenuItem key='option1' value='1'>1</MenuItem>
                                                                <MenuItem key='option2' value='2'>2</MenuItem>
                                                                <MenuItem key='option3' value='3'>3</MenuItem>
                                                                <MenuItem key='option4' value='4'>4</MenuItem>
                                                                <MenuItem key='option5' value='5'>5</MenuItem>
                                                                <MenuItem key='option6' value='6'>6</MenuItem>
                                                                <MenuItem key='option7' value='7'>7</MenuItem>
                                                                <MenuItem key='option8' value='8'>8</MenuItem>
                                                                <MenuItem key='option9' value='9'>9</MenuItem>

                                                            </TextField>

                                                        </Grid>
                                                        <Grid item xs={6} sm={3}>
                                                            {/*     <TextField
                            name="children"
                            id="children"
                            onChange={(e) => userChangeHandler(e)}
                            className="input"
                            type="number"
                            placeholder="From"
                            background="red"
                            label="Children"
                            variant="filled"
                            fullWidth
                        /> */}


                                                            <TextField
                                                                id="children"
                                                                select
                                                                name="children"
                                                                label="Children"

                                                                defaultValue=""
                                                                onChange={(e) => userChangeHandler(e)}
                                                                variant="filled"
                                                            >
                                                                [
                            <MenuItem key='option' value=''>NULL</MenuItem>
                                                                <MenuItem key='option1' value='1'>1</MenuItem>
                                                                <MenuItem key='option2' value='2'>2</MenuItem>
                                                                <MenuItem key='option3' value='3'>3</MenuItem>
                                                                <MenuItem key='option4' value='4'>4</MenuItem>
                                                                <MenuItem key='option5' value='5'>5</MenuItem>
                                                                <MenuItem key='option6' value='6'>6</MenuItem>
                                                                <MenuItem key='option7' value='7'>7</MenuItem>
                                                                <MenuItem key='option8' value='8'>8</MenuItem>
                                                                <MenuItem key='option9' value='9'>9</MenuItem>

                                                            </TextField>


                                                        </Grid>
                                                        <Grid item xs={6} sm={3}>
                                                            <TextField
                                                                name="maxPrice"
                                                                id="maxPrice"
                                                                onChange={(e) => userChangeHandler(e)}
                                                                className="input"
                                                                type="number"
                                                                placeholder="Max price"
                                                                background="red"
                                                                label="Max price"
                                                                variant="filled"
                                                                fullWidth
                                                            />
                                                        </Grid>

                                                    </Grid>
                                                    <br />
                                                    {/* new row  3*/}
                                                    <Grid container spacing={1}
                                                        container
                                                        direction="row"
                                                        justify="center"
                                                        alignItems="center">

                                                        <Grid item xs={6} sm={3} style={{display: "none"}}>
                                                            <TextField
                                                                id="nonStop"
                                                                select
                                                                name="nonStop"
                                                                label="nonStop"

                                                                defaultValue=""
                                                                onChange={(e) => userChangeHandler(e)}
                                                                variant="filled"
                                                            >
                                                                [

                            <MenuItem key='nonStop1' value='False'>
                                                                    False
                            </MenuItem>

                                                                <MenuItem key='nonStop2' value='True'>
                                                                    True
                            </MenuItem>

                                                            </TextField>
                                                        </Grid>

                                                        <Grid item xs={6} sm={3}>

                                                            <Button
                                                                className="MuiButton-root"
                                                                type="submit"
                                                                fullWidth
                                                                variant="contained"

                                                                className={classes.submit}
                                                                onClick={(e) => userOnsubmitHandler(e)}
                                                            >
                                                                Search
                        </Button>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </div>
                </MuiThemeProvider>
            </div>
        </div>
    )
}