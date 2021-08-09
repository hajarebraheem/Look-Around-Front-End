import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom"
import { Button, Card, CardContent, CardHeader,createMuiTheme, Grid, makeStyles, MuiThemeProvider, TextField, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import '../../css/formcss.css'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    button: {
        backgroundColor: "red",
    },
}));

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
                        paddingTop: "56.25%"
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
                        },
                        "& .MuiButton-root": {
        fontSize: "10px",
        width: "140px",
        backgroundColor: "RED",
                            }
                    }
                }
            }
        }
    }
};
export default function Login(props) {
    const history = useHistory()
    const [user, setUser] = useState({})
    const [fillfields, setFillfields] = useState("")

    const changeUserHandler = ({ target: { name, value } }) => setUser({ ...user, [name]: value })

    const onSubmitHandler = (e) => {
        e.preventDefault()
        console.log("click")
        if(user.password && user.email){
            axios.post("http://localhost:4000/user/login", { "email": user.email, "password": user.password })
            .then(data => {
                localStorage.setItem("token", data.data.token)
                props.loginFunction()
                props.setFlage(true)
                props.setResult(true)

                //setflage true
                //result login ss
                props.location.state ? history.push(props.location.state) : history.push('/')
            })
            .catch(err => {
                props.setFlage(true)
                props.setResult(false)
                
                console.log(err.response)})
        }else{
            setFillfields(<Alert severity="error">You need to fill all required fields</Alert>)
        }
  
    }

    const classes = useStyles();
    return (
<div className="login_form">
            <MuiThemeProvider theme={createMuiTheme(theme)}  className="main_form">
                <div className="App">
                    <Card className={"MuiEngagementCard--01"}>
                    <CardHeader
                    className="FormCardHeader" 
                    title="SIGN IN" />
                        <CardContent>
                <div className={classes.paper}>
                    {fillfields}
                    <form className={classes.form} noValidate onSubmit={(e) => onSubmitHandler(e)}>
                  
                        <Grid item xs={12} >
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={(e) => changeUserHandler(e)}
                                />
                            </Grid>
                            <br />
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={(e) => changeUserHandler(e)}
                                />

                            </Grid>
                            <Typography>   <a className="selvertext" onClick={() => history.push('/forgotpassword')}>Forgot password?</a></Typography>


                        </Grid>

                        <Button
                        className={classes.button}
                            type="submit"
                            fullWidth
                           variant="contained"
                            className={classes.submit}
                            >
                            Sign In
                        </Button>
                        <Grid container justify="center">
                            <Grid item>
                                <Typography variant="body2">Create new account? <a className="oringetext bold" onClick={() => history.push("/register")}>Sign Up</a></Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2"><a className="oringetext bold" onClick={() => history.push("/forgotpassword")}>Forgot Password?</a></Typography>
                            </Grid>
                       

                        </Grid>
                    </form>
                </div>
           {/*  </Container> */}
            </CardContent>
                    </Card>
                </div>
            </MuiThemeProvider>
        
        </div>
    )
}