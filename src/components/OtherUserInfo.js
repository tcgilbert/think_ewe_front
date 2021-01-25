import React from "react";
import Box from "@material-ui/core/Box";
import { Button } from "@material-ui/core"

const OtherUserInfo = (props) => {

    const handleFollowButtons = () => {
        let isFollowing = false
        props.followers.forEach((follower) => {
            if (follower.follower_id === props.currentUserId) {
                isFollowing = true
            }
        })
        if (isFollowing) {
            return <Button onClick={() => props.handleUnfollow()} fullWidth="true" variant="outlined">Unfollow</Button>
        } else {
            return <Button onClick={() => props.handleFollow()} fullWidth="true" variant="outlined">Follow</Button>
        }
    }

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
                {handleFollowButtons()}
            </Box>
        </div>
    );
};

export default OtherUserInfo;
