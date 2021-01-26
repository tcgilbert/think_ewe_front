import React, { useState } from "react";
import Signup from "./Signup";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";

const LandingPage = (props) => {
    const SERVER = process.env.REACT_APP_SERVER;

    const [passwordsDontMatch, setPasswordsDontMatch] = useState(false);
    const [emptyEmail, setEmptyEmail] = useState(false);
    const [emptyName, setEmptyName] = useState(false);
    const [passwordLengthWrong, setPasswordLengthWrong] = useState(false);

    const handleSignUp = async (values) => {
        try {
            if (validateFields(values)) {
                return;
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

    const validateFields = (values) => {
        let errorsPresent = false;
        if (values.confirmPassword !== values.password) {
            setPasswordsDontMatch(true);
            errorsPresent = true;
        } else {
            setPasswordsDontMatch(false);
        }
        if (values.email === "") {
            setEmptyEmail(true);
            errorsPresent = true;
        } else {
            setEmptyEmail(false);
        }
        if (values.name === "") {
            setEmptyName(true);
            errorsPresent = true;
        } else {
            setEmptyName(false);
        }
        if (values.password.length < 6) {
            setPasswordLengthWrong(true);
            errorsPresent = true;
        } else {
            setPasswordLengthWrong(false);
        }
        return errorsPresent;
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
                    <Box>
                        <div class="flex-row">
                            <Box>
                                <img
                                    id="landing-img"
                                    src={
                                        process.env.PUBLIC_URL +
                                        "/images/logo-gray.png"
                                    }
                                    alt=""
                                />
                                <h1 id="landing-title">Think Ewe</h1>
                                <p id="landing-subtitle">
                                    A Novel approach to Social Media
                                </p>
                            </Box>
                            <Box className="signup-form-container">
                                <div className="already-have-account">
                                    <span id="already-text">
                                        Already have an account?
                                    </span>
                                    <button
                                        id="log-link-btn"
                                        onClick={() => {
                                            props.setLogLink(true);
                                        }}
                                    >
                                        Login
                                    </button>
                                    <Divider
                                        style={{
                                            width: "100%",
                                            backgroundColor: "gray",
                                            margin: "5px auto"
                                        }}
                                        orientation="horizontal"
                                    />
                                </div>
                                <Signup
                                    emptyEmail={emptyEmail}
                                    emptyName={emptyName}
                                    passwordLengthWrong={passwordLengthWrong}
                                    passwordsDontMatch={passwordsDontMatch}
                                    handleSignup={handleSignUp}
                                    setUser={props.setUser}
                                    setAuth={props.setAuth}
                                />
                            </Box>
                        </div>
                    </Box>
                </div>
            );
        }
    };

    return <div className="login-signup-parent">{Redirections()}</div>;
};

export default LandingPage;
