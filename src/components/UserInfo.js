import React from "react";
import Box from "@material-ui/core/Box";
import { Button } from "@material-ui/core"

const UserInfo = (props) => {
    return (
        <div className="user-info">
            <div className="center">
                <img
                    id="profile-pic"
                    src={process.env.PUBLIC_URL + props.user.avatar}
                    alt=""
                />
                <h2>{props.user.name}</h2>
            </div>
            <h3 className="inline">@{props.user.username}:</h3>
            <Box className="inline" ml={1}>
                <p>{props.user.bio}</p>
            </Box>
            <p>Following: {props.following.length}</p>
            <p>Followers: {props.followers.length}</p>
            <Box mt={2}>
                <Button onClick={() => props.setOpenModal(true)} fullWidth="true" variant="outlined">Edit Profile</Button>
            </Box>
        </div>
    );
};

export default UserInfo;
