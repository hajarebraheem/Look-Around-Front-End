import React, { useEffect,useState } from 'react'
import { useHistory } from "react-router-dom"
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

export default function UpdateProfile(props) {
    const [user, setUser] = useState(props.user)
    const [visibility, setVisibility] = useState(true)
    const history = useHistory()

    const userChangeHandler = (e) => {
        let name = e.target.name
        let value = e.target.value
        console.log({ ...user, [name]: value });
        setUser({ ...user, [name]: value })
    }

    const userOnsubmitHandler = (e) => {
        console.log("Before");
        console.log(user)
        e.preventDefault()
        axios.put(`http://localhost:4000/user/editprofile/${props.user._id}`,
            {user },
            { headers: { "token": localStorage.getItem("token") } })
            .then(data => {
                console.log("After");
                console.log(user);
                //   setFlage(true)
                //   setMessage(data.data.message)
                //   setSuccess(true)
                props.setUser(data.data.user)
                setUser(data.data.user)
                console.log(data)
                setVisibility(true)
            }).catch(error => {
                //   setMessage(error.response.data.message)
                //   setFlage(true)
                /* setSuccess(false) */
                console.log(error)
            })
    }

    useEffect(() => {
    }, [user])

    const names = ["name", "email", "nationality", "address", "phone"]
    const fieldsNames = ["Name", "Email", "Nationality", "Address", "Phone"]
    const fieldsValues = [
        props.user.name, props.user.email,
        props.user.nationality, props.user.address,
        props.user.phone]

    let containers = []

    for (let i = 0; i < fieldsValues.length; i++) {
        containers.push(
            <Grid container style={{ borderBottom: "solid 1px", padding: "10px 0", marginBottom: "10px" }}>
                <Grid item>
                    <p style={{ fontWeight: "bold" }}>{fieldsNames[i]}</p>
                </Grid>
                {visibility ?
                    <Grid container spacing={2}>
                        <Grid item xs={9}>
                            <p>{user[names[i]]}</p>
                        </Grid>
                        <Grid item >
                            <p style={{ fontWeight: "bold" }} onClick={() => setVisibility(false)}>Edit</p>
                        </Grid>
                    </Grid>
                    :
                    <Grid container  alignItems="center" justify="space-around">
                        <form onSubmit={(e) => userOnsubmitHandler(e)}>
                        <Grid item xs={9}>
                            <TextField
                                name={names[i]}
                                id="name"
                                placeholder={fieldsValues[i]}
                                value={user[names[i]]}
                                onChange={(e) => userChangeHandler(e)} />
                        </Grid>
                        <Grid item xs={0}>
                            <p style={{ fontWeight: "bold" }} onClick={() => setVisibility(true)}>Cancel</p>
                        </Grid>
                        <Grid container justify="flex-end" style={{ marginBottom: "20px" }}>
                            <Button type="submit" variant="contained">Save</Button>
                        </Grid>
                        </form>
                    </Grid>
                }
            </Grid>
        )
    }
    return (
        <>
            <MuiThemeProvider theme={createMuiTheme(theme)}>
                <div className="App">
                    <Card className={"MuiEngagementCard--01"} style={{marginTop: "50px"}}>
                        <CardContent>
                            <Typography className={"MuiTypography--heading"}
                                variant={"h6"}
                                gutterBottom>
                                Edit Your Info
                            </Typography>
                            <Grid container>
                                {containers}
                                <Grid container justify="center" direction="column" alignItems="center">
                                    <Grid item style={{ margin: "20px" }}>
                                        <Button style={{ fontSize: "10px", width: "140px", backgroundColor: "#D3FFE9"  }} onClick={() => history.push('/profile')} variant="contained">Go Back</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </div>
            </MuiThemeProvider>
        </>
    )
}