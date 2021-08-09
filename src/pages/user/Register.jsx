import React, { useState } from 'react'
import axios from 'axios'
import { Link, useHistory } from "react-router-dom"
import { Avatar, Button, Card, CardContent, CardHeader, CardMedia, Checkbox, Container, CssBaseline, FormControlLabel, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { createMuiTheme, makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import '../../css/formcss.css'
import { Alert } from '@material-ui/lab';


export default function Register() {
    const [user, setUser] = useState({}); 
    // for aleart styles
    const [flage, setFlage] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("")
    const [msgpassword, setMsgpassword] = useState("")
    const [fillfields, setFillfields] = useState("")
    const [mesError, setMesError] = useState("")

    const [password, setPassword] = useState({});

    const history = useHistory()


    const userChangeHandler = (e) => {
        let name = e.target.name
        let value = e.target.value
        console.log({ ...user, [name]: value });
        setUser({ ...user, [name]: value })
        if (user.password == user.confirm_password) {
            setMsgpassword("")
        }
    }

    const userOnsubmitHandler = (e) => {
        e.preventDefault()



        if (user.name && user.email && user.phone && user.nationality && user.address && user.birthDate) {
            if (user.password == user.confirm_password && user.confirm_password) {
                axios.post('http://localhost:4000/user/register',
                    { name: user.name, email: user.email, password: user.password, phone: user.phone, birthDate: user.birthDate, nationality: user.nationality, address: user.address, })
                    .then(data => {
                        setFlage(true)
                        setMessage(data.data.message)
                        setSuccess(true)
                        setTimeout(() => history.push('/login'), 2000)
                        console.log(data);

                    }).catch(error => {
                        setMessage(error.response.data.message)
                        setFlage(true)
                        setSuccess(false)
                        console.log(error)

                    })

            } else {
                //          console.log("Password and confirm password are not equal");
                setMsgpassword("Password and confirm password are not equal")
                setMsgpassword(<Alert severity="error">Password and confirm password are not equal</Alert>)
            }
        } else {
            //            console.log("You need to fill all required fields");   
            setFillfields(<Alert severity="error">You need to fill all required fields</Alert>)
        }



    }

    const useStyles = makeStyles((theme) => ({
        paper: {
            marginTop: theme.spacing(1),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadiuss: 25
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }));


    const muiBaseTheme = createMuiTheme();

    const theme = {
        overrides: {
            MuiCard: {
                root: {
                    "&.MuiEngagementCard--01": {
                        transition: "0.3s",
                        margin: "auto",
                        maxWidth: '1500px',
                        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
                        "&:hover": {
                            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
                        },
                        "& .MuiCardMedia-root": {
                            paddingTop: "20.25%"
                        },
                        "& .MuiCardContent-root": {
                            textAlign: "left",
                            padding: muiBaseTheme.spacing.unit * 3
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


    const classes = useStyles();
    return (
        <div className="register_form" >
           
            <MuiThemeProvider theme={createMuiTheme(theme)} className="main_form">


                <div className="App">
                    <Card className={"MuiEngagementCard--01"}>
                         <CardHeader
                    className="FormCardHeader" 
                    title="Register" 
                            />
                        <CardContent>
                            <Container component="main" className="main_form" maxWidth="xs">

                                <CssBaseline />
                                <div className={classes.paper}>

                                    {fillfields}
                                  
                                    <form className={classes.form} noValidate onSubmit={(e) => userOnsubmitHandler(e)}>

                                        <div className={classes.root}>
                                            <Grid container spacing={3}>

                                                <Grid item xs={12} sm={6}>

                                                    {/* name */}
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            autoComplete="fname"
                                                            name="name"
                                                            id="name"
                                                            placeholder="Full name"
                                                            variant="outlined"
                                                            required
                                                            fullWidth
                                                            label="full Name"
                                                            onChange={(e) => userChangeHandler(e)}
                                                            autoFocus
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        variant="outlined"
                                                        required
                                                        fullWidth
                                                        id="email"
                                                        label="Email Address"
                                                        name="email"
                                                        autoComplete="email"
                                                        onChange={(e) => userChangeHandler(e)}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </div>


                                        <Grid item xs={12} >


                                            {/* email */}

                                            <Grid item xs={12}>

                                            </Grid>

                                            {/* pass */}
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        variant="outlined"
                                                        required
                                                        fullWidth
                                                        name="password"
                                                        label="Password"
                                                        type="password"
                                                        id="password"
                                                        autoComplete="current-password"
                                                        onChange={(e) => userChangeHandler(e)}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        variant="outlined"
                                                        required
                                                        fullWidth
                                                        name="confirm_password"
                                                        label="Confirm password"
                                                        type="password"
                                                        id="confirm_password"
                                                        autoComplete="current-password"
                                                        onChange={(e) => userChangeHandler(e)}
                                                    />
                                                </Grid>
                                                {msgpassword}
                                            </Grid>


                                            {/* address */}
                                            <br />
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        variant="outlined"
                                                        required
                                                        fullWidth
                                                        name="nationality"
                                                        label="Nationality"
                                                        type="text"
                                                        id="nationality"

                                                        onChange={(e) => userChangeHandler(e)}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        variant="outlined"
                                                        required
                                                        fullWidth
                                                        name="address"
                                                        label="Address"
                                                        type="text"
                                                        id="address"
                                                        onChange={(e) => userChangeHandler(e)}
                                                    />
                                                </Grid>
                                            </Grid>


                                            <div className={classes.root}>
                                                <Grid container spacing={3}>

                                                    <Grid item xs={12} sm={6}>
                                                   {/* phone */}
                                                            <Grid item xs={12}>
                                                                <TextField
                                                                    variant="outlined"
                                                                    required
                                                                    fullWidth
                                                                    id="phone"
                                                                    label="Phone number"
                                                                    name="phone"
                                                                    autoComplete="phone"
                                                                    onChange={(e) => userChangeHandler(e)}
                                                                />
                                                            </Grid>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        {/* birthDate */}
                                                        <Grid item xs={12}>
                                                            <TextField
                                                                variant="outlined"
                                                                fullWidth
                                                                id="birthDate"
                                                                type="date"
                                                                label="birth Date"
                                                                name="birthDate"
                                                                defaultValue="2020-05-24"
                                                                className={classes.textField}
                                                                onChange={(e) => userChangeHandler(e)}
                                                                InputLabelProps={{
                                                                    shrink: true,
                                                                }}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </Grid>

                                        <Button
                                            className="MuiButton-root"
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            className={classes.submit}
                                        >
                                            Sign Up
                                        </Button>
                                        <Grid container justify="flex-end">
                                            <Grid item>
                                                <Typography variant="body2" >Already have an account? <a className="oringetext bold" onClick={() => history.push(`/login`)}>Sign in </a></Typography>
                                            </Grid>

                                        </Grid>
                                    </form>
                                </div>
                            </Container>
                        </CardContent>
                    </Card>
                </div>
            </MuiThemeProvider>
        </div>


    )
}
