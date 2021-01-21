import React from 'react'
import { Button } from "@material-ui/core";

const Navigation = (props) => {
    return (
        <div className="nav-bar">
            <h1 id="title">Think Ewe</h1>
            <Button onClick={props.handleLogout} id="logout">Log Out</Button>
        </div>
    )
}

export default Navigation
