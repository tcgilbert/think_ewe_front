import UserBookPost from './UserBookPost'
import PostEditModal from './material-ui/PostEditModal'
import React, { useState, useEffect } from "react";

const MyPosts = (props) => {

    const [postToEdit, setPostToEdit] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const SERVER = process.env.REACT_APP_SERVER;
    
    const editPost = () => {
        
    }
    
    const handleModal = (post) => {
        setOpenModal(true)
        setPostToEdit(post)
    }

    const handleBookPostUpdate = (post) => {
        console.log("updating book");
        console.log(post);
    }

    const posts = props.myBookPosts.map((post, idx) => {
        return <UserBookPost handleModal={handleModal} user={props.user} key={idx} post={post} />
    })

    return (
        <div>
            {posts}
            <PostEditModal handleBookPostUpdate={handleBookPostUpdate} setOpenModal={setOpenModal} openModal={openModal} post={postToEdit}/>
        </div>
    )
}

export default MyPosts
