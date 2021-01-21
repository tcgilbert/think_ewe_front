import React from "react";
import useForm from "../utilities/useForm";
import { TextField, Button, FormControl } from "@material-ui/core";
import Box from "@material-ui/core/Box";

const Login = (props) => {
    const [values, handleChange] = useForm({ identifier: "", password: "" });

    return (
        <div>
            <p>Already have an account?</p>
            <FormControl>
                <Box mb={1}>
                    <TextField
                        spacing={5}
                        type="text"
                        variant="outlined"
                        size="small"
                        label="Username/Email"
                        name="identifier"
                        value={values.identifier}
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
                <Button
                    variant="contained"
                    type="submit"
                    onClick={() => props.handleLogin(values)}
                >
                    Login
                </Button>
            </FormControl>
        </div>
    );
};

export default Login;
