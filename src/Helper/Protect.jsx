import React from 'react'
import { Redirect, Route } from 'react-router-dom'
export default function Protect({ component: Component, isLogin, location, path, ...rest }) {
    return (
        <>
            <Route exact path={path} render={() => isLogin ?
                <Component {...rest} />
                :
                // <Redirect to='/login'/>}
                // />
                <Redirect to={{ pathname: '/login', state: location.pathname }} />}
            />
        </>
    )
}
