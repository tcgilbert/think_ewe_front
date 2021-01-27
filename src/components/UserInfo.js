import React from "react";
import Box from "@material-ui/core/Box";
import { Button } from "@material-ui/core";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";

const UserInfo = (props) => {
    const handleFollowerModal = () => {
        if (props.followers.length !== 0) {
            props.setContent("followers");
            props.setOpenFollowsModal(true);
        }
    };

    const handleFollowingModal = () => {
        if (props.following.length !== 0) {
            props.setContent("following");
            props.setOpenFollowsModal(true);
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
            <h2>{props.user.name}</h2>
            <p id="profile-username">{props.user.username}</p>
            <Box mt={1} mb={2}>
                <p>{props.user.bio}</p>
            </Box>
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

            <Button
                onClick={() => props.setOpenModal(true)}
                fullWidth="true"
                variant="outlined"
                style={{
                    backgroundColor: "rgb(59,59,59)",
                    fontWeight: "bold",
                    color: "whitesmoke",
                    marginTop: "5px",
                }}
            >
                Edit Profile
            </Button>
        </div>
    );
};

export default UserInfo;
