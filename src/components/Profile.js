import React, { useState, useEffect } from "react";
import UserInfo from "../components/UserInfo";
import DynamicContent from "../components/DynamicContent";
import axios from "axios";
import EditProfileModal from "./material-ui/EditProfileModal";
import FollowsModal from "./material-ui/FollowsModal";

const Profile = (props) => {
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openFollowsModal, setOpenFollowsModal] = useState(false);
    const [followsModalContent, setFollowsModalContent] = useState(null);
    const [feed, setFeed] = useState([]);
    const SERVER = process.env.REACT_APP_SERVER;

    useEffect(() => {
        if (props.user) {
            fetchSocials();
            fetchFeed();
        }
    }, []);

    useEffect(() => {
        if (props.user) {
            fetchFeed();
        }
    }, [following]);

    const fetchSocials = async () => {
        try {
            let apiResFollowers = await axios.get(
                `${SERVER}/social/followers/${props.user.id}`
            );
            let followersData = await apiResFollowers.data.followers;
            let apiResFollowing = await axios.get(
                `${SERVER}/social/following/${props.user.id}`
            );
            let followingData = await apiResFollowing.data.following;
            setFollowing(followingData);
            setFollowers(followersData);
        } catch (error) {
            console.log(`ERROR FETCHING POSTS: ${error}`);
        }
    };

    const fetchFeed = async () => {
        let accountIds = [];
        following.forEach((ele) => {
            accountIds.push(ele.id);
        });
        try {
            let apiRes = await axios.post(`${SERVER}/book-post/feed`, {
                accountIds: accountIds,
            });
            let feedData = await apiRes.data.posts;
            setFeed(feedData);
        } catch (error) {
            console.log(`FEED FETCHING ERROR: ${error}`);
        }
    };

    return (
        <>
            <div className="profile-container">
                <UserInfo
                    setOpenModal={setOpenModal}
                    setOpenFollowsModal={setOpenFollowsModal}
                    setContent={setFollowsModalContent}
                    followers={followers}
                    following={following}
                    user={props.user}
                />
                <DynamicContent feed={feed} user={props.user} />
            </div>
            <EditProfileModal
                setUser={props.setUser}
                user={props.user}
                openModal={openModal}
                setOpenModal={setOpenModal}
            />
            <FollowsModal
                followers={followers}
                following={following}
                openFollowsModal={openFollowsModal}
                setOpenFollowsModal={setOpenFollowsModal}
                content={followsModalContent}
            />
        </>
    );
};

export default Profile;
