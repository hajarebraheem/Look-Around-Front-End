import React from 'react'
import {useHistory} from 'react-router-dom'
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

export default function DeleteAccount(props) {
    const history = useHistory()
    
    const deleteAccount = () =>{
        axios.delete(`http://localhost:4000/user/delete/${props.user._id}`,
        { headers: { "token": localStorage.getItem("token") } }
        ).then(result=>{
            props.setUser({})
            localStorage.removeItem("token")
            props.setIsLogin(false)
            history.push('/')
        }).catch(err=>{
            console.log(err)
       }) 
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
                                Are You Sure You Want To Delete Your Account?
                            </Typography>
                            <Grid container style={{display: "flex", justifyContent: "center"}}>
                                    <Grid container justify="center" alignItems="center" style={{marging: "20px"}}>
                                        <Grid item style={{padding: "20px"}}>
                                            <Button style={{ fontSize: "10px", width: "140px", backgroundColor: "#D3FFE9" }} onClick={() => deleteAccount()} variant="contained">Yes, Delete</Button>
                                        </Grid>
                                        <Grid item >
                                            <Button style={{ fontSize: "10px", width: "140px", backgroundColor: "#D3FFE9"  }} onClick={() => history.push('/profile')} variant="contained">No, Go Back</Button>
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