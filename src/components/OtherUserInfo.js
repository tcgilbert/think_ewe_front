import React from "react";
import Box from "@material-ui/core/Box";
import { Button } from "@material-ui/core"

const OtherUserInfo = (props) => {
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
            <Box mt={2}>
                <Button onClick={() => props.handleFollow()} fullWidth="true" variant="outlined">Follow</Button>
            </Box>
        </div>
    );
};

export default OtherUserInfo;
