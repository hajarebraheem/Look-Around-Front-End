import React, { useEffect, useState } from 'react'
import './App.css';
import { Route, Switch, useLocation } from "react-router-dom"
import AllFlight from './pages/flight/AllFlight'
import Home from './pages/home/Home'
import Nav from './pages/home/Nav'
import Footer from './pages/home/Footer'
import AllHotel from './pages/hotel/AllHotel'
import Register from './pages/user/Register'
import Login from './pages/user/Login'
import Profile from './pages/user/Profile'
import Favorites from './pages/user/Favorites'
import Reservations from './pages/user/Reservations'
import ChangePass from './pages/user/ChangePass'
import ForgotPass from './pages/user/ForgotPass'
import DeleteAccount from './pages/user/DeleteAccount'
import FlightCheckOut from './pages/flight/FlightCheckOut'
import HotelCheckOut from './pages/hotel/HotelCheckOut'
import HotelInfo from './pages/hotel/HotelInfo'
import img1 from "./img/185289.jpg"
import img2 from "./img/254381.jpg"
import img3 from "./img/1431622.jpg"
import img4 from "./img/1510128.jpg"
import UpdateProfile from './pages/user/UpdateProfile'
import Protect from './Helper/Protect'
import ResetPass from './pages/user/ResetPass';
import { isExpired, decodeToken } from "react-jwt"
import { Alert } from '@material-ui/lab';


export default function App() {
  const [user, setUser] = useState({})
  const [isLogin, setIsLogin] = useState(false)
  const [currency, setCurrency] = useState("SAR")
  const [checkoutflight, setCheckoutFlight] = useState({})
  const [checkouthotel, setCheckoutHotel] = useState({})
  const [checkoutroom, setCheckoutRoom] = useState({})
  const [searchbyCity, setSearchbyCity] = useState("")
  const [flage, setFlage] = useState("")
  const [result, setResult] = useState("")
  const [alert, setAlert] = useState("")
  const [costumAlert, setCostumAlert] = useState("")



  const location = useLocation()

  useEffect(() => {
    loginFunction()
    alret()

  }, [])

  const loginFunction = () => {
    let token = localStorage.getItem("token")
    let decodeuser = decodeToken(token)
    if (decodeuser?.user && !isExpired(token)) {
      setUser(decodeuser.user)
      setIsLogin(true)
    } else {
      setUser({})
      setIsLogin(false)
    }
  }

  const alret = () => {
    if (flage) {
      if (result) {
        setCostumAlert(<Alert severity="success">Login seccuss</Alert>)
      } else {
        setCostumAlert(<Alert severity="error">There is a problem</Alert>)
      }
    }
  }


  // https://compressimage.toolur.com/viewimage/20210613-14-Nx6iVCf5wBpbeCru-GZaBwZ-switzerland31
  // https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bhmpics.com%2Fview-the_plane_flying_at_sunset-wide.html&psig=AOvVaw1tgMClCaWx5Tt-iRlyVcke&ust=1623722112253000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMC0mbCClvECFQAAAAAdAAAAABAS
  const backgrund = [
    <img src="https://images.unsplash.com/photo-1494587416117-f102a2ac0a8d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80" className="active" />
    , <img src="https://p1.zoon.ru/5/7/554a4bcf40c088f04d8b65a5_5a620f6b50d3d.jpg" className="active" />
    , <img src={img3} className="active" />
    , <img src={img4} className="active" />]


  return (
    <section>
      <div className="bannerimg" id="slideShow">
        {backgrund[Math.floor(Math.random() * backgrund.length)]}
      </div>

      <div className="container">
        <div className="nav">
          <Nav isLogin={isLogin} loginFunction={loginFunction} setCurrency={setCurrency} />
        </div>
        <div className="nav">
          {/* <BrowserRouter> */}



          {costumAlert}





          <Switch >
            <Route exact path="/" render={() => <Home isLogin={isLogin} loginFunction={loginFunction} />} />
            <Route exact path="/flight" render={() => <AllFlight currency={currency} setSearchbyCity={setSearchbyCity} searchbyCity={searchbyCity} setCheckoutFlight={setCheckoutFlight} />} />
            <Route exact path="/hotel" render={() => <AllHotel currency={currency} setCheckoutHotel={setCheckoutHotel} setCheckoutRoom={setCheckoutRoom} />} />
            <Route exact path="/login" render={() => <Login loginFunction={loginFunction} location={location} setFlage={setFlage} setResult={setResult} />} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/forgotpassword" component={ForgotPass} />
            <Route exact path="/resetpassword/:resetLink" component={ResetPass} />
            <Route exact path="/hotelinfo" component={HotelInfo} />



            {/* <Route exact path={"/flightcheckout"} component={FlightCheckOut}/> */}

            {/* <Protect component={Profile} path={"/profile"} isLogin={isLogin} user={user} loginFunction={loginFunction} location={location} /> */}
            <Protect component={Profile} path={"/profile"} isLogin={isLogin} user={user} loginFunction={loginFunction} setUser={setUser} location={location} />
            {<Protect component={Favorites} path={"/favorites"} isLogin={isLogin} location={location} />}
            <Protect component={Reservations} path={"/reservations"} isLogin={isLogin} location={location} />
            <Protect component={UpdateProfile} path={"/updateprofile"} isLogin={isLogin} user={user} location={location} setUser={setUser} />
            <Protect component={ChangePass} path={"/changepassword"} isLogin={isLogin} user={user} location={location} />
            <Protect component={DeleteAccount} path={"/deleteaccount"} isLogin={isLogin} user={user} location={location} setUser={setUser} />
            <Protect component={FlightCheckOut} path={"/flightcheckout"} isLogin={isLogin} user={user} location={location} checkoutflight={checkoutflight} />
            <Protect component={HotelCheckOut} path={"/hotelcheckout"} isLogin={isLogin} user={user} location={location} checkouthotel={checkouthotel} checkoutroom={checkoutroom} />

            {/* <Protect component={Profile} path={"/profile"} isLogin={isLogin} user={user} loginFunction={loginFunction} location={location}/>
          <Protect component={Favorites} path={"/favorites"} isLogin={isLogin}/>
          <Protect component={Reservations} path={"/reservations"} isLogin={isLogin}/>
          <Protect component={ChangePass} path={"/changepassword"}  isLogin={isLogin}  user={user} />  */}
          </Switch>
          {<Footer />}
          {/* </BrowserRouter> */}
        </div>
      </div>
    </section>

  )
}