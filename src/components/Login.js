import React from "react";
import useForm from "../utilities/useForm";
import { TextField, Button } from "@material-ui/core";

const Login = (props) => {
    const [values, handleChange] = useForm({ identifier: "", password: "" });

    return (
        <div>
            <h3>Login</h3>
            <TextField
                type="text"
                variant="outlined"
                size="small"
                label="Email or Username"
                name="identifier"
                value={values.identifier}
                onChange={handleChange}
            />
            <TextField
                variant="outlined"
                size="small"
                label="Password"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
            />
            <Button
                variant="contained"
                type="submit"
                onClick={() => props.handleLogin(values)}
            >
                Login
            </Button>
        </div>
    );
};

export default Login;
