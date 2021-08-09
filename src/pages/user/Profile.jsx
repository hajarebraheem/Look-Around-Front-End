import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom"
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import reservations from '../../images/reservations.jpg'
import favorites from '../../images/favorites.jpg'
const images = [
    {
        url: `${reservations}`,
        title: 'Reservations',
        width: '50%',
        path: '/reservations'
    },
    {
        url: `${favorites}`,
        title: 'Favorites',
        width: '50%',
        path: '/favorites'
    },
];

const useStyles = makeStyles((theme) => ({
    button: {
        fontSize: "10px",
        width: "140px",
        backgroundColor: "#D3FFE9",
    },
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: "center",
        minWidth: 320,
        width: '20%'
    },
    image: {
        position: 'relative',
        height: 100,
        [theme.breakpoints.down('xs')]: {
            width: '100% !important', // Overrides inline-style
            height: 100,
        },
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.15,
            },
            '& $imageMarked': {
                opacity: 0,
            },
            '& $imageTitle': {
                border: '4px solid currentColor',
            },
            
        },
    },
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
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

export default function Profile(props) {
    console.log(props);
    const history = useHistory()
    const classes = useStyles();
    const [user, setUser] = useState({})

    useEffect(() => {
        
    }, [user])



    // const userChangeHandler = (e) => {
    //     let name = e.target.name
    //     let value = e.target.value
    //     console.log({ ...user, [name]: value });
    //     setUser({ ...user, [name]: value })
    // }

    // const userOnsubmitHandler = (e) => {
    //     console.log("Before");
    //     console.log(user)
    //     e.preventDefault()
    //     axios.put(`http://localhost:4000/user/editprofile/${props.user._id}`,
    //         { user },
    //         { headers: { "token": localStorage.getItem("token") } })
    //         .then(data => {
    //             console.log("After");
    //             console.log(user);
    //             //   setFlage(true)
    //             //   setMessage(data.data.message)
    //             //   setSuccess(true)
    //             props.setUser(data.data.user)
    //             console.log(data)
    //         }).catch(error => {
    //             //   setMessage(error.response.data.message)
    //             //   setFlage(true)
    //             /* setSuccess(false) */
    //             console.log(error)
    //         })
    // }
    
    return (
        <div >
            <MuiThemeProvider theme={createMuiTheme(theme)}>
                <div className="App" >
                    <Grid item >
                        <Typography className={"MuiTypography--heading"}
                            style={{ fontWeight: "bold" }}
                            variant={"h6"}
                            gutterBottom>
                            Personal info
                        </Typography>
                    </Grid>
                    <Grid container style={{ margin: "auto", justifyContent: "center", width: "85%" }}>

                        <Grid item style={{ margin: "20px", width: "300px" }} >
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
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item style={{ margin: "20px", width: "300px" }}>
                            <Card className={"MuiEngagementCard--01"}>
                                <CardContent>
                                    <Grid container>
                                        <Grid container style={{ padding: "10px" }}>
                                            <Grid itemitem style={{ height: "35px" }} >
                                                <p style={{ fontWeight: "bold" }}>Email</p>
                                            </Grid>
                                            <Grid container spacing={2}>
                                                <Grid item xs={9}>
                                                    <p>{props.user.email}</p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item style={{ margin: "20px", width: "300px" }}>
                            <Card className={"MuiEngagementCard--01"}>
                                <CardContent>
                                    <Grid container>
                                        <Grid container style={{ padding: "10px" }}>
                                            <Grid itemitem style={{ height: "35px" }} >
                                                <p style={{ fontWeight: "bold" }}>Nationality</p>
                                            </Grid>
                                            <Grid container spacing={2}>
                                                <Grid item xs={9}>
                                                    <p>{props.user.nationality}</p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item style={{ margin: "20px", width: "300px" }}>
                            <Card className={"MuiEngagementCard--01"}>
                                <CardContent>
                                    <Grid container>
                                        <Grid container style={{ padding: "10px" }}>
                                            <Grid itemitem style={{ height: "35px" }} >
                                                <p style={{ fontWeight: "bold" }}>Address</p>
                                            </Grid>
                                            <Grid container spacing={2}>
                                                <Grid item xs={9}>
                                                    <p>{props.user.address}</p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item style={{ margin: "20px", width: "300px" }}>
                            <Card className={"MuiEngagementCard--01"}>
                                <CardContent>
                                    <Grid container>
                                        <Grid container style={{ padding: "10px" }}>
                                            <Grid itemitem style={{ height: "35px" }} >
                                                <p style={{ fontWeight: "bold" }}>Phone Number</p>
                                            </Grid>
                                            <Grid container spacing={2}>
                                                <Grid item xs={9}>
                                                    <p>{props.user.phone}</p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item style={{ margin: "auto 10px", justifyContent: "center" }}>
                            <div className={classes.root}>
                                {images.map((image) => (
                                    <ButtonBase
                                        focusRipple
                                        key={image.title}
                                        className={classes.image}
                                        focusVisibleClassName={classes.focusVisible}
                                        style={{
                                            width: image.width,
                                            margin: "10px",
                                            boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)"
                                        }}
                                        onClick={() => history.push(image.path)}
                                    >
                                        <span
                                            className={classes.imageSrc}
                                            style={{
                                                backgroundImage: `url(${image.url})`,
                                            }}
                                        />
                                        <span className={classes.imageBackdrop} />
                                        <span className={classes.imageButton} >
                                            <Typography style={{ fontSize: "10px" }}
                                                component="span"
                                                variant="subtitle1"
                                                color="inherit"
                                                className={classes.imageTitle}
                                            >
                                                {image.title}
                                                <span className={classes.imageMarked} />
                                            </Typography>
                                        </span>
                                    </ButtonBase>
                                ))}
                            </div>
                        </Grid>
                    </Grid>

                    <Grid container justify="center" alignItems="center">
                        <Grid container style={{ width: "50%", marginTop: "50px" }} justify="center" alignItems="center" justify="space-between">
                            <Grid item>
                                <Button style={{ fontSize: "10px", width: "140px", backgroundColor: "#D3FFE9" }} onClick={() => history.push('/updateprofile')} variant="contained">Update Profile</Button>
                            </Grid>
                            <Grid item>
                                <Button style={{ fontSize: "10px", width: "140px", backgroundColor: "#D3FFE9" }} onClick={() => history.push('/changepassword')} variant="contained">Update Password</Button>
                            </Grid>
                            <Grid item>
                                <Button style={{ fontSize: "10px", width: "140px", backgroundColor: "#D3FFE9" }} onClick={() => history.push('/deleteaccount')} variant="contained">Delete Account</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </MuiThemeProvider>
        </div>
    )
}