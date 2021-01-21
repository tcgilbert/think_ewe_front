import React from "react";
import useForm from "../utilities/useForm";
import { TextField, Button } from "@material-ui/core";

const Signup = (props) => {
    const [values, handleChange] = useForm({
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
    });

    return (
        <div>
            <h3>Signup</h3>
            <TextField
                type="email"
                variant="outlined"
                size="small"
                label="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
            />
            <TextField
                variant="outlined"
                size="small"
                label="Name"
                type="text"
                name="name"
                value={values.name}
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
            <TextField
                variant="outlined"
                size="small"
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
            />
            <Button
                variant="contained"
                type="submit"
                onClick={() => props.handleSignup(values)}
            >
                Sign Up
            </Button>
        </div>
    );
};

export default Signup;
