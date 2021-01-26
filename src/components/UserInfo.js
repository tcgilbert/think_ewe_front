import React from "react";
import Box from "@material-ui/core/Box";
import { Button } from "@material-ui/core";
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';

const UserInfo = (props) => {


    const handleFollowerModal = () => {
        props.setContent("followers")
        props.setOpenFollowsModal(true)
    }

    const handleFollowingModal = () => {
        props.setContent("following")
        props.setOpenFollowsModal(true)
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
            <div className="follows-container">
                <p onClick={() => handleFollowerModal()} className="followers-hover"><PeopleAltOutlinedIcon/><strong> {props.followers.length}</strong> followers </p>
                <p onClick={() => handleFollowingModal()} className="following-hover"><span id="bullet-point">{'\u0081'}</span><strong>{props.following.length}</strong> following</p>
            </div>
            <Box mt={2}>
                <Button
                    onClick={() => props.setOpenModal(true)}
                    fullWidth="true"
                    variant="outlined"
                >
                    Edit Profile
                </Button>
            </Box>
        </div>
    );
};

export default UserInfo;
