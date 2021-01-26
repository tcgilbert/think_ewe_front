import React, { useEffect, useState } from "react";
import axios from "axios";
import OtherUserInfo from "../components/OtherUserInfo";
import OtherNavTabs from "./material-ui/OtherNavTabs";
import OtherUserBookPost from "./OtherUserBookPost";
import Box from "@material-ui/core/Box";

const OtherUserProfile = (props) => {
    const [otherUser, setOtherUser] = useState(null);
    const [bookPosts, setBookPosts] = useState(null);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const SERVER = process.env.REACT_APP_SERVER;
    const usernameFromPath = props.match.params.username;

    useEffect(() => {
        if (!otherUser || otherUser.username !== usernameFromPath) {
            fetchUser();
        }
    }, [props.match.params.username]);

    useEffect(() => {
        if (otherUser) {
            fetchPosts();
            fetchSocials();
        }
    }, [otherUser]);

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

    const fetchSocials = async () => {
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

    const handleFollow = async () => {
        await axios.post(`${SERVER}/social/follow/create`, {
            follower_id: props.user.id,
            following_id: otherUser.id,
        });
        fetchSocials();
    };

    const handleUnfollow = async () => {
        await axios.post(`${SERVER}/social/follow/delete`, {
            follower_id: props.user.id,
            following_id: otherUser.id,
        });
        fetchSocials();
    };

    const handleContent = () => {
        if (otherUser) {
            return (
                <OtherUserInfo
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
        </div>
    );
};

export default OtherUserProfile;
