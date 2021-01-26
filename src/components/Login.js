import React, { useState } from "react";
import { TextField, Button, FormControl } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import axios from 'axios'

const Login = (props) => {

    const [errorPresent, setErrorPresent] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const SERVER = process.env.REACT_APP_SERVER;

    const handleSubmit = async () => {
        const values = {
            identifier: props.identifier,
            password: props.password
        }
        props.handleLogin(values)
        if (props.isAuthenticated) {
            props.handleClose()
            setErrorPresent(false)
            setPasswordError(false)
        } else {
            let result = await findIdentifier()
            if (result === true) {
                setPasswordError(true)
                setErrorPresent(false)
            } else {
                setPasswordError(false)
                setErrorPresent(true)
            }
        }
    }

    const findIdentifier = async () => {
        try {
            let apiRes = await axios.get(`${SERVER}/users/other-user/${props.identifier}`)
            if (apiRes.data.requestedUser) {
                return true
            } else {
                return false
            }
        } catch (error) {
            console.log(error);
            return error
        }
    }

    return (
        <div>
            <FormControl>
                <Box mb={1.5}>
                    <TextField
                        autoFocus
                        id="login-id"
                        type="text"
                        variant="outlined"
                        size="small"
                        label="Username/Email"
                        name="identifier"
                        error={errorPresent}
                        helperText={errorPresent ? "No user found" : null }
                        value={props.identifier}
                        onChange={(e) => props.setIdentifier(e.target.value)}
                    />
                </Box>
                <Box mb={.5}>
                    <TextField
                        variant="outlined"
                        size="small"
                        id="login-password"
                        label="Password"
                        type="password"
                        name="password"
                        error={passwordError}
                        helperText={passwordError ? "Password incorrect" : null }
                        value={props.password}
                        onChange={(e) => props.setPassword(e.target.value)}
                    />
                </Box>
                <Button
                    variant="contained"
                    type="submit"
                    onClick={handleSubmit}
                    style={{
                        backgroundColor: "#818AA3",
                        fontWeight: "bold",
                        color: "whitesmoke",
                        marginTop: "10px"
                    }}
                >
                    Login
                </Button>
            </FormControl>
        </div>
    );
};

export default Login;
