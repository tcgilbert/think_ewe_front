import React, { useEffect, useState } from 'react'
import axios from 'axios';
import UserInfo from '../components/UserInfo'



const OtherUserProfile = (props) => {

    const [otherUser, setOtherUser] = useState(null)
    const SERVER = process.env.REACT_APP_SERVER

    useEffect(() => {
        if (!otherUser) {
            fetchUser()
        }
    }, [])

    const fetchUser = async () => {
        let apiRes = await axios.get(`${SERVER}/users/other-user/${props.match.params.username}`)
        let userData = await apiRes.data.requestedUser
        setOtherUser(userData)
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


    return (
        <div className="profile-container">
            {handleContent()}
        </div>
    )
}

export default OtherUserProfile