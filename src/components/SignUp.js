import React from "react";
import useForm from "../utilities/useForm";
import { TextField, Button, FormControl } from "@material-ui/core";
import Box from "@material-ui/core/Box";

const Signup = (props) => {
    const [values, handleChange] = useForm({
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
    });

    return (
        <div>
            <p>Register for an account</p>
            <FormControl>
                <Box mb={1}>
                    <TextField
                        type="email"
                        variant="outlined"
                        size="small"
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                    />
                </Box>
                <Box mb={1}>
                    <TextField
                        variant="outlined"
                        size="small"
                        label="Name"
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                    />
                </Box>
                <Box mb={1}>
                    <TextField
                        variant="outlined"
                        size="small"
                        label="Password"
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                    />
                </Box>
                <Box mb={1}>
                    <TextField
                        variant="outlined"
                        size="small"
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                    />
                </Box>
                <Button
                    variant="contained"
                    type="submit"
                    onClick={() => props.handleSignup(values)}
                >
                    Sign Up
                </Button>
            </FormControl>
        </div>
    );
};

export default Signup;
