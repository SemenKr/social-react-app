import React from "react";
import {Navigate} from "react-router";
import {connect} from "react-redux";

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
})

export const withAuthRedirect = (Component) => {
    const RedirectComponent = (props) => {
        if (!props.isAuth) return <Navigate to={'/login'}/>
        return <Component {...props} />
    }

    const ConnectAuthRedirectComponent = connect(mapStateToProps)(RedirectComponent)
    return ConnectAuthRedirectComponent;
}

