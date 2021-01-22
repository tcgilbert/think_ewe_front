import React from "react";
import { Button } from "@material-ui/core";
import LoginPopUp from "./material-ui/LoginPopUp";

const Navigation = (props) => {
    return (
        <div className="nav-bar">
            <h1 id="title">Think Ewe</h1>
            <div className="flex-row">
                <LoginPopUp
                    logLink={props.logLink}
                    setLogLink={props.setLogLink}
                    handleLogin={props.handleLogin}
                />
                <Button onClick={props.handleLogout} id="logout">
                    Log Out
                </Button>
            </div>
        </div>
    );
};

export default Navigation;
