import React from 'react'
import twitter from "../../img/twitter.png"
import facebook from "../../img/facebook.png"
import instagram from "../../img/instagram.png"

export default function Footer() {
    return (
        <>
        <ul className="sci">
            <li><a href="#"><img src={twitter}  /></a></li>
            <li><a href="#"><img src={facebook}  /></a></li>
            <li><a href="#"><img src={instagram}  /></a></li>
    
        </ul>

        </>
    )
}
