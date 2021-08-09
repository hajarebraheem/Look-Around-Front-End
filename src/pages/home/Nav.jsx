import React, { useState } from 'react'
import { useHistory } from "react-router-dom"

export default function Nav(props) {
  //    const [loginState, setLoginState] = setState()
  const history = useHistory()



  const logOut = () => {
    localStorage.removeItem("token")
    props.loginFunction()
    history.push("/")
  }


  const currencyChangeHandler = (e) => {
    let value = e.target.value
    console.log(`name value ${value}`)
    props.setCurrency(value)
  }

  const toggleMenu = ()=> {
     const menuIcon = document.querySelector('.menuIcon')
     const navbar = document.getElementById('navbar')
     menuIcon.classList.toggle('active')
     navbar.classList.toggle('active')
  }



  return (
          <header id="navbar" >
            <a  href="#" className="logo">Look Around</a>
            <ul>
              <li><a   onClick={() => history.push(`/`)}>Home</a></li>
              <li><a   onClick={() => history.push(`/flight`)}>Flight</a></li>
              <li><a   onClick={() => history.push(`/hotel`)}>Hotel</a></li>

              {props.isLogin ?
                <div>
                  <li><a  onClick={() => logOut()}>Logout</a></li>
                  <li><a  onClick={() => history.push(`/reservations`)}>Reservations</a></li>
                  <li><a  onClick={() => history.push(`/profile`)}>Profile</a></li>
                </div>
                :
                <li><a onClick={() => history.push(`/login`)}>Login</a></li>
              }




            </ul>
            <span className="menuIcon" onClick={() => toggleMenu()}></span>

          </header>

        




    
    
  )
}
