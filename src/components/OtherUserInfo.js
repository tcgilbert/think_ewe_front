import React from "react";
import Box from "@material-ui/core/Box";
import { Button } from "@material-ui/core";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";

const OtherUserInfo = (props) => {
    const handleFollowButtons = () => {
        let isFollowing = false;
        props.followers.forEach((follower) => {
            if (follower.id === props.currentUserId) {
                isFollowing = true;
            }
        });
        if (isFollowing) {
            return (
                <Button
                    onClick={() => props.handleUnfollow()}
                    fullWidth="true"
                    variant="outlined"
                    style={{
                        backgroundColor: "rgb(59,59,59)",
                        fontWeight: "bold",
                        color: "whitesmoke",
                        marginTop: "5px",
                    }}
                >
                    Unfollow
                </Button>
            );
        } else {
            return (
                <Button
                    onClick={() => props.handleFollow()}
                    fullWidth="true"
                    variant="outlined"
                    style={{
                        backgroundColor: "rgb(59,59,59)",
                        fontWeight: "bold",
                        color: "whitesmoke",
                        marginTop: "5px",
                    }}
                >
                    Follow
                </Button>
            );
        }
    };

    return (
        // <div className="user-info">
        //     <div className="center">
        //         <img
        //             id="profile-pic"
        //             src={process.env.PUBLIC_URL + props.user.avatar}
        //             alt=""
        //         />
        //         <h2>{props.user.name}</h2>
        //     </div>
        //     <h3 className="inline">@{props.user.username}:</h3>
        //     <Box className="inline" ml={1}>
        //         <p>{props.user.bio}</p>
        //     </Box>
        //     <p>Following: {props.following.length}</p>
        //     <p>Followers: {props.followers.length}</p>
        //     <Box mt={2}>
        //         {handleFollowButtons()}
        //     </Box>
        // </div>
        <div className="user-info">
            <div className="center">
                <img
                    id="profile-pic"
                    src={process.env.PUBLIC_URL + props.user.avatar}
                    alt=""
                />
            </div>
            <h2>{props.user.name}</h2>
            <p id="profile-username">{props.user.username}</p>
            <Box mt={1} mb={2}>
                <p>{props.user.bio}</p>
            </Box>
            <div className="follows-container">
                <p
                    // onClick={() => handleFollowerModal()}
                    className="followers-hover"
                >
                    <PeopleAltOutlinedIcon />
                    <strong> {props.followers.length}</strong> followers{" "}
                </p>
                <p
                    // onClick={() => handleFollowingModal()}
                    className="following-hover"
                >
                    <span id="bullet-point">{"\u0081"}</span>
                    <strong>{props.following.length}</strong> following
                </p>
            </div>

            {handleFollowButtons()}
        </div>
    );
};

export default OtherUserInfo;
