import React from 'react'
import UserInfo from '../components/UserInfo'



const OtherUserProfile = (props) => {

    console.log(props);
    return (
        <div className="profile-container">
            {/* <UserInfo user={props.user}/> */}
            {/* <DynamicContent user={props.user}/> */}
        </div>
    )
}

export default OtherUserProfile