import React from "react";
import Box from "@material-ui/core/Box";
import { Button } from "@material-ui/core";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";

const OtherUserInfo = (props) => {


    const handleFollowerModal = () => {
        props.setContent("followers");
        props.setOpenFollowsModal(true);
    };

    const handleFollowingModal = () => {
        props.setContent("following");
        props.setOpenFollowsModal(true);
    };

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

        <div className="user-info">
            <div className="center">
                <img
                    id="profile-pic"
                    src={process.env.PUBLIC_URL + props.user.avatar}
                    alt=""
                />
            </div>
            <div className="user-info-text">
                <div>
                    <h2>{props.user.name}</h2>
                    <p id="profile-username">{props.user.username}</p>
                    <Box mt={1} mb={2}>
                        <p>{props.user.bio}</p>
                    </Box>
                </div>
                <div>
                    <div className="follows-container">
                        <p
                            onClick={() => handleFollowerModal()}
                            className="followers-hover"
                        >
                            <PeopleAltOutlinedIcon />
                            <strong> {props.followers.length}</strong> followers{" "}
                        </p>
                        <p
                            onClick={() => handleFollowingModal()}
                            className="following-hover"
                        >
                            <span id="bullet-point">{"\u0081"}</span>
                            <strong>{props.following.length}</strong> following
                        </p>
                    </div>
                    {handleFollowButtons()}
                </div>
            </div>
        </div>
    );
};

export default OtherUserInfo;
