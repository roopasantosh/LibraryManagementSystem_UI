import React from "react";
import { Navigate, Route, useLocation } from "react-router-dom";
import NavBar from "../pages/base/NavBar";
import { IsNullOrEmpty, decodeToken, getToken } from "./utility";

const ProtectedRoute = ({ children, ...rest }) => {
    const location = useLocation();
    let accessToken = getToken()
    const user = decodeToken();
    if (IsNullOrEmpty(accessToken)) {
        return (
            <Navigate
                to={
                    "/login#" +
                    location.pathname +
                    location.search +
                    location.hash
                }
                state={{ lastPage: location.pathname }}
            />
        );
    }    
    else {
        return (
            <div>
                <NavBar>
                    {children}
                </NavBar>
            </div >
        );
    }
};

export default ProtectedRoute;
