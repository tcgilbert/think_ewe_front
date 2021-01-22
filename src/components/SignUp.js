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
        <>
            <FormControl fullWidth="true">
                <Box mb={1.5}>
                    <TextField
                        fullWidth="true"
                        type="email"
                        variant="outlined"
                        size="small"
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                    />
                </Box>
                <Box mb={1.5}>
                    <TextField
                        fullWidth="true"
                        variant="outlined"
                        size="small"
                        label="Name"
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                    />
                </Box>
                <Box mb={1.5}>
                    <TextField
                        fullWidth="true"
                        variant="outlined"
                        size="small"
                        label="Password"
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                    />
                </Box>
                <Box mb={1.5}>
                    <TextField
                        fullWidth="true"
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
                    Create Account
                </Button>
            </FormControl>
        </>
    );
};

export default Signup;
