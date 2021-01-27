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

    const checkPasswordError = () => {
        if (props.passwordLengthWrong || props.passwordsDontMatch) {
            return true
        } else {
            return false
        }
    }

    const emailError = () => {
        if (props.emailAlreadyUsed || props.emailEmpty) {
            return true
        }
    }

    return (
        <div className="signup-form">
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
                        error={emailError()}
                        helperText={props.emptyEmail ? "Email is required" : props.emailAlreadyUsed ? "Email already used" : null }
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
                        error={props.emptyName}
                        helperText={props.emptyName ? "Name is required" : null}
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
                        error={checkPasswordError()}
                        helperText={props.passwordsDontMatch ? "Passwords do not match" : props.passwordLengthWrong ? "Password must be at least 6 characters" : null}
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
                        error={checkPasswordError()}
                        helperText={props.passwordsDontMatch ? "Passwords do not match" : props.passwordLengthWrong ? "Password must be at least 6 characters" : null}
                    />
                </Box>
                <Button
                    variant="contained"
                    type="submit"
                    onClick={() => props.handleSignup(values)}
                    style={{
                        backgroundColor: "#818AA3",
                        fontWeight: "bold",
                        color: "whitesmoke",
                        marginTop: "10px"
                    }}
                >
                    Create Account
                </Button>
            </FormControl>
        </div>
    );
};

export default Signup;
