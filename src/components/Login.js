import React from "react";
import useForm from "../utilities/useForm";


const Login = (props) => {
    const [values, handleChange] = useForm({ identifier: "", password: "" });
    const SERVER = process.env.REACT_APP_SERVER

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
            <button type="submit" onClick={() => props.handleLogin(values)}>Login</button>
        </div>
    );
};

export default Login;
