import React from "react";
import Login from "./Login";
import Signup from "./Signup";
import axios from 'axios'
import setAuthToken from '../utilities/setAuthToken'
import jwt_decode from 'jwt-decode'

const Signup_Login = (props) => {

    const SERVER = process.env.REACT_APP_SERVER

    const handleLogin = async (values) => {
        try {
            console.log("logging in");     
            // look for user
            const requestedUser = await axios.post(`${SERVER}/users/login`, {
                email: values.identifier,
                password: values.password
            })
            // extract token
            const { token } = requestedUser.data
            // add to local storage
            localStorage.setItem('jwtToken', token)
            // set token
            setAuthToken(token)
            // decode token
            const userInfo = jwt_decode(token)
            // set the current user
            props.setUser(userInfo)
            props.setAuth(true)

            // TO DO: redirect to profile component

        } catch (error) {
            console.log(error);
            console.log(`LOGIN ERROR: ${error.data}`);
        }
    }

    return (
        <div>
            <Login handleLogin={handleLogin} setUser={props.setUser} setAuth={props.setAuth}/>
            <Signup setUser={props.setUser} setAuth={props.setAuth}/>
        </div>
    );
};

export default Signup_Login;
