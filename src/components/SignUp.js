import React from "react";
import useForm from "../utilities/useForm";

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
            <label htmlFor="email">Email</label>
            <input
                type="text"
                name="email"
                value={values.email}
                onChange={handleChange}
            />
            <label htmlFor="email">Name</label>
            <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
            <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
            />
            <label htmlFor="password">Confirm Password</label>
            <input
                type="password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
            />
            <button type="submit" onClick={() => props.handleSignup(values)}>Sign Up</button>
        </div>
    );
};

export default Signup;
