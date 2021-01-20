import React from "react";
import useForm from "../utilities/useForm";
import axios from 'axios'
import setAuthToken from '../utilities/setAuthToken'
import jwt_decode from 'jwt-decode'
import { Redirect } from "react-router-dom"


const Login = (props) => {
    const [values, handleChange] = useForm({ identifier: "", password: "" });
    const SERVER = process.env.REACT_APP_SERVER

    const handleLogin = async () => {
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
            <h3>Login</h3>
            <label htmlFor="email">Email or Username</label>
            <input
                type="text"
                name="identifier"
                value={values.identifier}
                onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
            <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
            />
            <button type="submit" onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
