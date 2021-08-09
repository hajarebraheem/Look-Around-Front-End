import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom"
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

export default function ChangePass(props) {
    const [password, setPassword] = useState({});
    const history = useHistory()

    const userChangeHandler = (e) => {
        let name = e.target.name
        let value = e.target.value
        setPassword({ ...password, [name]: value })
    }

    const userOnsubmitHandler = (e) => {
        e.preventDefault()
        if (password.new_password == password.confirm_password) {
            console.log(localStorage.getItem("token"));
            axios.put(`http://localhost:4000/user/changepass/${props.user._id}`,
                { password_old: password.old_password, password_new: password.confirm_password },
                { headers: { "token": localStorage.getItem("token") } })
                .then(data => {
                    //   setFlage(true)
                    //   setMessage(data.data.message)
                    //   setSuccess(true)
                    console.log(data)
                    setTimeout(() => history.push('/profile'), 2000)
                }).catch(error => {
                    //   setMessage(error.response.data.message)
                    //   setFlage(true)
                    /* setSuccess(false) */
                    console.log(error)
                })
        } else {
            console.log("New password and confirm password are not equal ");
        }
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
                                Update Your Password
                            </Typography>
                            <Grid container style={{display: "flex", justifyContent: "center"}}>
                                <form onSubmit={(e) => userOnsubmitHandler(e)}>
                                    <Grid container >
                                        <Grid item>
                                            <p style={{ fontWeight: "bold" }}>Old Password</p>
                                        </Grid>
                                        <Grid container alignItems="center" justify="space-around" style={{ marginBottom: "15px" }}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    name="old_password"
                                                    id="old_password"
                                                    placeholder="Old Password"
                                                    type="password"
                                                    onChange={(e) => userChangeHandler(e)} />
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid container>
                                        <Grid item>
                                            <p style={{ fontWeight: "bold" }}>New Password</p>
                                        </Grid>
                                        <Grid container alignItems="center" justify="space-around" style={{ marginBottom: "15px" }}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    name="new_password"
                                                    id="new_password"
                                                    placeholder="New Password"
                                                    type="password"
                                                    onChange={(e) => userChangeHandler(e)} />
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid container>
                                        <Grid item>
                                            <p style={{ fontWeight: "bold" }}>Confirm Password</p>
                                        </Grid>
                                        <Grid container alignItems="center" justify="space-around" style={{ marginBottom: "15px" }}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    name="confirm_password"
                                                    id="confirm_password"
                                                    placeholder="Confirm Password"
                                                    type="password"
                                                    onChange={(e) => userChangeHandler(e)} />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid container justify="center" direction="column" alignItems="center">
                                        <Grid item style={{ margin: "20px" }}>
                                            <Button type="submit" style={{ fontSize: "10px", width: "140px", backgroundColor: "#D3FFE9"  }} variant="contained">Save</Button>
                                        </Grid>
                                        <Grid item style={{ margin: "20px" }}>
                                            <Button onClick={() => history.push('/profile')} style={{ fontSize: "10px", width: "140px", backgroundColor: "#D3FFE9"  }} variant="contained">Go Back</Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Grid>
                        </CardContent>
                    </Card>
                </div>
            </MuiThemeProvider>
        </>
    )
}