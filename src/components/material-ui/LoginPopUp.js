import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Login from "../Login";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));


export default function LoginPopUp(props) {
    const classes = useStyles();
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [anchorEl, setAnchorEl] = React.useState(null);

    useEffect(() => {
        const button = document.getElementById("login-btn")
        if (props.logLink) {
            setAnchorEl(button)
        }

    }, [props.logLink])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setIdentifier("")
        setPassword("")
        props.setLogLink(false)
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    return (
        <div>
            <Button
                id="login-btn"
                aria-describedby={id}
                onClick={handleClick}
            >
                Log In
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <Typography className={classes.typography}>
                    <Login
                        isAuthenticated={props.isAuthenticated}
                        handleClose={handleClose}
                        handleLogin={props.handleLogin}
                        identifier={identifier}
                        setIdentifier={setIdentifier}
                        password={password}
                        setPassword={setPassword}
                    />
                </Typography>
            </Popover>
        </div>
    );
}
