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

    return (
        <div className="profile-container">
            <UserInfo followers={followers} following={following} user={props.user}/>
            <DynamicContent user={props.user}/>
        </div>
    )
}

export default Profile
