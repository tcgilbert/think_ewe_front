import React from "react";
import useForm from "../utilities/useForm";

const Login = () => {
    const [values, handleChange] = useForm({ identifier: "", password: "" });

    return (
        <div>
            <h3>Login</h3>
            <label htmlFor="email">Email or Username</label>
            <input
                type="text"
                name="identifier"
                value={values.identifier}
                onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
            <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
            />
        </div>
    );
};

export default Login;
