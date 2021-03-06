import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import OtherUserInfo from "../components/OtherUserInfo";
import OtherNavTabs from "./material-ui/OtherNavTabs";
import OtherUserBookPost from "./OtherUserBookPost";
import Box from "@material-ui/core/Box";
import FollowsModal from "./material-ui/FollowsModal";
import { useHistory } from "react-router-dom";

const OtherUserProfile = (props) => {
    const [otherUser, setOtherUser] = useState(null);
    const [bookPosts, setBookPosts] = useState(null);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [openFollowsModal, setOpenFollowsModal] = useState(false);
    const [followsModalContent, setFollowsModalContent] = useState(null);
    const SERVER = process.env.REACT_APP_SERVER;
    const usernameFromPath = props.match.params.username;
    const history = useHistory();
    const fetchSocials = useRef(() => {});

    fetchSocials.current = async () => {
        try {
            let apiResFollowers = await axios.get(
                `${SERVER}/social/followers/${otherUser.id}`
            );
            let followersData = await apiResFollowers.data.followers;
            let apiResFollowing = await axios.get(
                `${SERVER}/social/following/${otherUser.id}`
            );
            let followingData = await apiResFollowing.data.following;
            setFollowing(followingData);
            setFollowers(followersData);
        } catch (error) {
            console.log(`ERROR FETCHING POSTS: ${error}`);
        }
    };

    useEffect(() => {
        if (usernameFromPath === props.user.username) {
            history.push("/profile");
        }
    }, [usernameFromPath, history, props.user.username]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                let apiRes = await axios.get(
                    `${SERVER}/users/other-user/${usernameFromPath}`
                );
                let userData = await apiRes.data.requestedUser;
                setOtherUser(userData);
            } catch (error) {
                console.log(`ERROR FETCHING OTHER USER: ${error}`);
            }
        };
        if (!otherUser || otherUser.username !== usernameFromPath) {
            fetchUser();
        }
    }, [props.match.params.username, SERVER, otherUser, usernameFromPath]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                let apiRes = await axios.get(
                    `${SERVER}/book-post/user/${otherUser.id}`
                );
                let usersPosts = await apiRes.data.posts;
                setBookPosts(usersPosts);
            } catch (error) {
                console.log(`ERROR FETCHING POSTS: ${error}`);
            }
        };

        if (otherUser) {
            fetchPosts();
            fetchSocials.current();
        }
    }, [otherUser, SERVER]);

    const handleFollow = async () => {
        await axios.post(`${SERVER}/social/follow/create`, {
            follower_id: props.user.id,
            following_id: otherUser.id,
        });
        fetchSocials.current();
    };

    const handleUnfollow = async () => {
        await axios.post(`${SERVER}/social/follow/delete`, {
            follower_id: props.user.id,
            following_id: otherUser.id,
        });
        fetchSocials.current();
    };

    const handleContent = () => {
        if (otherUser) {
            return (
                <OtherUserInfo
                    setOpenFollowsModal={setOpenFollowsModal}
                    setContent={setFollowsModalContent}
                    currentUserId={props.user.id}
                    followers={followers}
                    following={following}
                    handleFollow={handleFollow}
                    handleUnfollow={handleUnfollow}
                    user={otherUser}
                />
            );
        } else {
            return <h1>Loading...</h1>;
        }
    };

    const handleBookPosts = () => {
        if (bookPosts) {
            if (bookPosts.length === 0) {
                return (
                    <div id="no-posts-container">
                        <h1 id="no-posts-yet">No Posts Yet</h1>
                    </div>
                );
            } else {
                const posts = bookPosts.map((post, idx) => {
                    return (
                        <OtherUserBookPost
                            currentUser={props.user}
                            user={otherUser}
                            key={idx}
                            post={post}
                        />
                    );
                });
                return posts;
            }
        }
    };

    return (
        <div className="profile-container">
            <div className="user-info-container">{handleContent()}</div>
            <div className="dynamic-content">
                <OtherNavTabs />
                <Box
                    style={{ maxHeight: "600px", minHeight: "600px" }}
                    overflow="auto"
                >
                    {handleBookPosts()}
                </Box>
            </div>
            <FollowsModal
                followers={followers}
                following={following}
                openFollowsModal={openFollowsModal}
                setOpenFollowsModal={setOpenFollowsModal}
                content={followsModalContent}
            />
        </div>
    );
};

export default OtherUserProfile;
