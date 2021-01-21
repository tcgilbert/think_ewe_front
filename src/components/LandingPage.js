import React from "react";
import Login from "./Login";
import Signup from "./Signup";
import axios from "axios";
import setAuthToken from "../utilities/setAuthToken";
import jwt_decode from "jwt-decode";
import { Redirect } from "react-router-dom";

const LandingPage = (props) => {
    const SERVER = process.env.REACT_APP_SERVER;
    const autoLoginValues = {
        identifier: "tcgilbert94@gmail.com",
        password: '00000000'
    }

    const handleLogin = async (values) => {
        try {
            console.log("logging in");
            // look for user
            console.log(values);
            const requestedUser = await axios.post(`${SERVER}/users/login`, {
                identifier: values.identifier,
                password: values.password,
            });
            // extract token
            const { token } = requestedUser.data;
            // add to local storage
            localStorage.setItem("jwtToken", token);
            // set token
            setAuthToken(token);
            // decode token
            const userInfo = jwt_decode(token);
            // set the current user
            props.setUser(userInfo);
            props.setAuth(true);
        } catch (error) {
            console.log(error);
            console.log(`LOGIN ERROR: ${error.data}`);
        }
    };

    const handleSignUp = async (values) => {
        try {
            console.log("signing up");
            if (values.confirmPassword !== values.password) {
                return console.log("Passwords do not match");
            }
            const newUser = await axios.post(`${SERVER}/users/signup`, {
                email: values.email,
                name: values.name,
                password: values.password
            });
            if (newUser) {
                const loginValues = {
                    identifier: newUser.data.email,
                    password: values.password
                }
                handleLogin(loginValues)
            }
        } catch (error) {
            console.log(`SIGNUP ERROR: ${error.data}`);
        }
    }

    const autoLogin = (values) => {
        handleLogin(values)
    }

    const Redirections = () => {
        if (props.isAuth) {
            if (props.currentUser.registered) {
                return <Redirect to="/profile" />;
            } else {
                return <Redirect to="/dashboard" />;
            }
        } else {
            return (
                <div>
                    <Login
                        handleLogin={handleLogin}
                        setUser={props.setUser}
                        setAuth={props.setAuth}
                    />
                    <Signup handleSignup={handleSignUp} setUser={props.setUser} setAuth={props.setAuth} />
                    <button type="submit" onClick={() => autoLogin(autoLoginValues)}>Auto Login</button>
                </div>
            );
        }
    };

    return (
        <div>
            {Redirections()}
        </div>
    );
};

export default LandingPage;
