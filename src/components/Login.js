import React from "react";
import { TextField, Button, FormControl } from "@material-ui/core";
import Box from "@material-ui/core/Box";

const Login = (props) => {

    const handleSubmit = () => {
        const values = {
            identifier: props.identifier,
            password: props.password
        }
        props.handleClose()
        props.handleLogin(values)
    }

    return (
        <div>
            <FormControl>
                <Box mb={1.5}>
                    <TextField
                        autoFocus
                        type="text"
                        variant="outlined"
                        size="small"
                        label="Username/Email"
                        name="identifier"
                        value={props.identifier}
                        onChange={(e) => props.setIdentifier(e.target.value)}
                    />
                </Box>
                <Box mb={1.5}>
                    <TextField
                        variant="outlined"
                        size="small"
                        label="Password"
                        type="password"
                        name="password"
                        value={props.password}
                        onChange={(e) => props.setPassword(e.target.value)}
                    />
                </Box>
                <Button
                    variant="contained"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Login
                </Button>
            </FormControl>
        </div>
    );
};

export default Login;
