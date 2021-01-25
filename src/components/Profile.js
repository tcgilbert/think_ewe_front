import React, { useState, useEffect } from 'react'
import UserInfo from '../components/UserInfo'
import DynamicContent from '../components/DynamicContent'
import axios from 'axios'


const Profile = (props) => {

    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const SERVER = process.env.REACT_APP_SERVER;

    useEffect(() => {
        if (props.user) {
            fetchSocials()
        }
    }, [])

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
        let accountIds = []
        following.forEach((ele) => {
            accountIds.push(ele.following_id)
        })
        console.log(accountIds);
        try {
            let apiRes = await axios.post(`${SERVER}/book-post/feed`, {
                accountIds: accountIds
            })
            console.log(apiRes);
        } catch (error) {
            console.log(`FEED FETCHING ERROR: ${error}`);
        }
    }

    return (
        <div className="profile-container">
            <UserInfo followers={followers} following={following} user={props.user}/>
            <DynamicContent user={props.user}/>
            <button onClick={fetchFeed}>Fetch feed</button>
        </div>
    )
}

export default Profile
