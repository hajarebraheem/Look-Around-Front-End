import React from 'react'
import Main from './Main'
import "../../css/home.css"
import left from "../../img/left.png"
import right from "../../img/right.png"
import Nav from './Nav'


export default function Home(props) {
    const city = [<div className="active">
        <h2>Tokyo</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae harum ea saepe incidunt modi minus non porro ducimus dignissimos repellendus enim atque soluta, fugit doloribus quam beatae quos cum. Nulla?</p>
    </div>, <div className="active">
        <h2>Paris</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae harum ea saepe incidunt modi minus non porro ducimus dignissimos repellendus enim atque soluta, fugit doloribus quam beatae quos cum. Nulla?</p>
    </div>, <div className="active">
        <h2>Egypt</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae harum ea saepe incidunt modi minus non porro ducimus dignissimos repellendus enim atque soluta, fugit doloribus quam beatae quos cum. Nulla?</p>
    </div>, <div className="active">
        <h2>Maldives</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae harum ea saepe incidunt modi minus non porro ducimus dignissimos repellendus enim atque soluta, fugit doloribus quam beatae quos cum. Nulla?</p>
    </div>]

    return (
        <div className="home">
            <Nav isLogin={props.isLogin} loginFunction={props.loginFunction} setCurrency={props.setCurrency} />

            {/* <Main /> */}
            <div className="content">
                <div className="bannerText">
                    {city[Math.floor(Math.random() * city.length)]}
                </div>
            </div>
        </div>
        // <>
        // <Main />
        // </>
        // <section>
        //     <div className="container">
        //         <header id="navbar">
        //             <a href="#" className="logo">Look Around</a>
        //             <ul>
        //                 <li><a href="#"></a></li>
        //                 <li><a href="#"></a></li>
        //                 <li><a href="#"></a></li>
        //                 <li><a href="#"></a></li>


        //             </ul>

        //         </header>
        //     </div>
        // </section>
    )
}