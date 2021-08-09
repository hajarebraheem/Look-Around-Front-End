import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom"
import { CardContent, Card, Typography, Grid, Paper, TextField, MenuItem, FormControl, InputLabel, Select, Button } from '@material-ui/core';
import { makeStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CitySelect from '../../components/search-by-city';
import { Alert } from '@material-ui/lab';

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

export default function HotelForm(props) {
    //Gen Token for API
    const qs = require('qs')
    var data = qs.stringify({ 'grant_type': "client_credentials", 'client_id': "B8nTnSTHwTubAfV9mUE750yPfenCotFE", 'client_secret': "FdazkFlCwOj50rrk" });
    var config = { method: 'post', url: 'https://test.api.amadeus.com/v1/security/oauth2/token', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, data: data };

    const [url, seturl] = useState([])
    const [token, setToken] = useState({})
    const [mesError, setMesError] = useState("")

    useEffect(() => {
        axios(config)
            .then(result => {
                setToken(result.data.access_token)
                props.setTokenHotel(result.data.access_token)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    const userChangeHandler = (e) => {
        setMesError("")
        let value = e.target.value
        if (e.target.name == "cityCode") {
            let code = e.target.value.split("  ");
            value = code[1]
        }
        let name = e.target.name
        seturl({ ...url, [name]: `${name}=${value}` });
        console.log(url)
    }

    const userOnsubmitHandler = (e) => {
        e.preventDefault()
        var resulturl = ""
        let index = 0
        for (const key in url) {
            index == (Object.keys(url).length - 1) ? resulturl = resulturl + url[key] : resulturl = resulturl + url[key] + "&"
            index++
        }

        // reset the user input
        const inputselect = document.querySelectorAll(".input")
        for (let index = 0; index < inputselect.length; index++) {
            const element = inputselect[index];
            // element.value=""
        }

        setMesError("json")
        axios.get(`https://test.api.amadeus.com/v2/shopping/hotel-offers?${resulturl}&radius=40&radiusUnit=KM&paymentPolicy=NONE&includeClosed=false&bestRateOnly=false&view=FULL&sort=NONE&currency=${props.currency}`,
            {
                headers: { "Authorization": `Bearer ${token}` }
            }).then(result => {
                console.log('token then')
                console.log(token)
                props.setHotels(result)
                !result ? setMesError(<Alert variant='filled' severity='error'>{mesError}</Alert>) : setMesError("")
            }).catch(err => {
                console.log(err)
            })
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            '& .MuiTextField-root': {
                width: '20ch',
                background: 'white'
            },
            '& .MuiButton-root': {
                width: '25ch',
            },
            flexGrow: 1,
        },
        paper: {
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }));
    const classes = useStyles()

    //https://test.api.amadeus.com/v2/shopping/hotel-offers?${resulturl}&radius=40&radiusUnit=KM&paymentPolicy=NONE&includeClosed=false&bestRateOnly=false&view=FULL&sort=NONE&currency=${props.currency}
    return (
        <div className="divHotelForm">
            {/* {mesError} */}
            <div className="test1">
                <MuiThemeProvider theme={createMuiTheme(theme)}>
                    <div className="App">
                        <br />
                        {/* <Typography style={{ fontWeight: 600, fontSize: "80px" }} variant="h1">Hotel Search</Typography> */}
                        <br />
                        <Grid container style={{ margin: "auto", justifyContent: "center", width: "85%" }}>
                            <Grid item style={{ margin: "20px", width: "900px" }}>
                                {/* the left card */}
                                <Card className={"MuiEngagementCard--01"} >
                                    <CardContent>
                                        <Grid container>
                                            <Grid container style={{ padding: "10px" }}>
                                                <div className={classes.root}>
                                                    {/* new row */}
                                                    <Grid container
                                                        container
                                                        direction="row"
                                                        justify="center"
                                                        alignItems="center">
                                                        <Grid item xs={6} sm={3}>
                                                            <CitySelect label="City Code" name="cityCode" userChangeHandler={userChangeHandler} />
                                                        </Grid>
                                                        <Grid item xs={6} sm={3}>
                                                            <TextField
                                                                name="checkInDate"
                                                                id="checkInDate"
                                                                placeholder="check In Date"
                                                                className="input"
                                                                label="Check In date"
                                                                variant="filled"
                                                                fullWidth
                                                                type="date"
                                                                required
                                                                defaultValue="yyy-mm-dd"

                                                                className={classes.textField}
                                                                onChange={(e) => userChangeHandler(e)}
                                                                InputLabelProps={{
                                                                    shrink: true,
                                                                }}
                                                            />

                                                        </Grid>
                                                        <Grid item xs={6} sm={3}>
                                                            <TextField
                                                                name="checkOutDate"
                                                                id="checkOutDate"
                                                                placeholder="check Out Date"
                                                                label="Check Out Date"
                                                                variant="filled"
                                                                fullWidth
                                                                required
                                                                type="date"
                                                                defaultValue="yyy-mm-dd"
                                                                className={classes.textField}
                                                                onChange={(e) => userChangeHandler(e)}
                                                                InputLabelProps={{
                                                                    shrink: true,
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6} sm={3}>
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

                                                    </Grid>
                                                    <br />
                                                    {/* new row */}
                                                    <Grid container
                                                        container
                                                        direction="row"
                                                        justify="center"
                                                        alignItems="center">
                                                        <Grid item xs={6} sm={3}>
                                                            <TextField
                                                                id="roomQuantity"
                                                                select
                                                                name="roomQuantity"
                                                                label="Room Quantity"
                                                                required
                                                                defaultValue="" sss
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
                                                                name="priceRange"
                                                                id="priceRange"
                                                                onChange={(e) => userChangeHandler(e)}
                                                                className="input"
                                                                type="number"
                                                                placeholder="ex:200-300"
                                                                label="Price range"
                                                                variant="filled"
                                                                fullWidth
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6} sm={3}>
                                                            <TextField
                                                                id="ratings"
                                                                select
                                                                name="ratings"
                                                                label="Ratings"
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
                                                            </TextField>
                                                        </Grid>

                                                    </Grid>
                                                    <Grid container justify="center" style={{marginTop: "20px"}}>
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
