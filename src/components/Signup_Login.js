import React from "react";
import Login from "./Login";
import Signup from "./Signup";

const Signup_Login = (props) => {


    return (
        <div>
            <Login setUser={props.setUser} setAuth={props.setAuth}/>
            <Signup setUser={props.setUser} setAuth={props.setAuth}/>
        </div>
    );
};

export default Signup_Login;
