import React from 'react'
import UserInfo from '../components/UserInfo'
import DynamicContent from '../components/DynamicContent'
import NavTabs from './material-ui/NavTabs'

const Profile = (props) => {

    return (
        <div className="profile-container">
            <UserInfo user={props.user}/>
            <DynamicContent />
        </div>
    )
}

export default Profile
