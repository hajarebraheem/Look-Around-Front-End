import React, { useState } from 'react'
import axios from 'axios'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { TextField } from '@material-ui/core';

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
                        }
                    }
                }
            }
        }
    }
};

export default function ForgotPass() {
    const [user, setUser] = useState({})
    const changeUserHandler = ({ target: { name, value } }) => setUser({ ...user, [name]: value })
    const message = ''
    
    const onSubmitHandler = (e) => {
        e.preventDefault()
        axios.put("http://localhost:4000/user/forgotpassword", { "email" : user.email})
        .then(data => {
            message = data.data.message
            console.log(data.data);
        })
        .catch(err => console.log(err.response))
    }

    return (
        <>
            <MuiThemeProvider theme={createMuiTheme(theme)}>
                <div className="App">
                    <Card className={"MuiEngagementCard--01"}>
                        <CardContent>
                            <Typography className={"MuiTypography--heading"}
                                variant={"h6"}
                                gutterBottom>
                                Reset Password
                            </Typography>
                            <Grid container style={{display: "flex", justifyContent: "center"}}>
                                <form onSubmit={(e) => onSubmitHandler(e)}>
                                    <Grid container >
                                        <Grid item>
                                            <p style={{ fontWeight: "bold" }}>Please Type Your Email</p>
                                        </Grid>
                                        <Grid container alignItems="center" justify="space-around" style={{ marginBottom: "15px", width: "200px"}}>
                                            <Grid item xs={12} >
                                                <TextField style={{width: "250px"}}
                                                    id="email"
                                                    type="email"
                                                    placeholder="Email Address"
                                                    name="email"
                                                    onChange={(e) => changeUserHandler(e)}/>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid container justify="center" direction="column" alignItems="center">
                                        <Grid item style={{ margin: "20px" }}>
                                            <Button type="submit" style={{ fontSize: "10px", width: "140px", backgroundColor: "#D3FFE9"  }} variant="contained">Send</Button>
                                        </Grid>
                                    </Grid>
                                </form>
                                <Typography className={"MuiTypography--heading"}
                                variant={"h6"}
                                gutterBottom>
                                {message}
                            </Typography>
                            </Grid>
                        </CardContent>
                    </Card>
                </div>
            </MuiThemeProvider>
        </>
    )
}