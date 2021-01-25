import React, { useEffect, useState } from 'react'
import axios from 'axios';
import UserInfo from '../components/UserInfo'
import OtherNavTabs from './material-ui/OtherNavTabs'
import OtherUserBookPost from './OtherUserBookPost'



const OtherUserProfile = (props) => {

    const [otherUser, setOtherUser] = useState(null)
    const [bookPosts, setBookPosts] = useState(null)
    const SERVER = process.env.REACT_APP_SERVER
    const usernameFromPath = props.match.params.username

    useEffect(() => {
        if (!otherUser || otherUser.username !== usernameFromPath) {
            fetchUser()
        }
    }, [props.match.params.username])

    useEffect(() => {
        if (otherUser) {
            fetchPosts()
        }
    }, [otherUser])

    const fetchUser = async () => {
        try {            
            let apiRes = await axios.get(`${SERVER}/users/other-user/${usernameFromPath}`)
            let userData = await apiRes.data.requestedUser
            setOtherUser(userData)
        } catch (error) {
            console.log(`ERROR FETCHING OTHER USER: ${error}`);
        }
    }

    const fetchPosts = async () => {
        try {            
            console.log(`${SERVER}/book-post/${otherUser.id}`);
            console.log(`${SERVER}/book-post/${props.user.id}`);
            let apiRes = await axios.get(`${SERVER}/book-post/${otherUser.id}`)
            let usersPosts = await apiRes.data.posts
            setBookPosts(usersPosts)
        } catch (error) {
            console.log(`ERROR FETCHING POSTS: ${error}`);
        }
    }

    const handleContent = () => {
        if (otherUser) {
            return (
                <UserInfo user={otherUser}/>
            )
        } else {
            return <h1>Loading...</h1>
        }
    }

    const handleBookPosts = () => {
 
        if (bookPosts) {
            const posts = bookPosts.map((post, idx) => {
                return (
                    <OtherUserBookPost
                        user={otherUser}
                        key={idx}
                        post={post}
                    />
                );
            });
            return posts
        }
    }


    return (
        <div className="profile-container">
            {handleContent()}
            <div className="dynamic-content">
                <OtherNavTabs />
                <div>
                    {handleBookPosts()}
                </div>
            </div>
        </div>
    )
}

export default OtherUserProfile