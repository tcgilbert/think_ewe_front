import React from "react";
import Login from "./Login";
import Signup from "./Signup";
import axios from "axios";
import { Redirect } from "react-router-dom";

const LandingPage = (props) => {
    const SERVER = process.env.REACT_APP_SERVER;



    const handleSignUp = async (values) => {
        try {
            console.log("signing up");
            if (values.confirmPassword !== values.password) {
                return console.log("Passwords do not match");
            }
            const newUser = await axios.post(`${SERVER}/users/signup`, {
                email: values.email,
                name: values.name,
                password: values.password,
            });
            if (newUser) {
                const loginValues = {
                    identifier: newUser.data.email,
                    password: values.password,
                };
                props.handleLogin(loginValues);
            }
        } catch (error) {
            console.log(`SIGNUP ERROR: ${error.data}`);
        }
    };

    const Redirections = () => {
        if (props.isAuth) {
            if (props.currentUser.registered) {
                return <Redirect to="/profile" />;
            } else {
                return <Redirect to="/dashboard" />;
            }
        } else {
            return (
                <div className="login-signup">
                    <Login
                        handleLogin={props.handleLogin}
                        setUser={props.setUser}
                        setAuth={props.setAuth}
                    />
                    <Signup
                        handleSignup={handleSignUp}
                        setUser={props.setUser}
                        setAuth={props.setAuth}
                    />
                </div>
            );
        }
    };

    return <div>{Redirections()}</div>;
};

export default LandingPage;
