import React, { useState } from 'react'
import NavTabs from './material-ui/NavTabs'
import SearchBooks from './SearchBooks'
import MyPosts from './MyPosts'
import MyFeed from './MyFeed'
// import BookPostModal from './material-ui/BookPostModal'


const DynamicContent = (props) => {

    const [shownContent, setShownContent] = useState("myFeed")
    // const [openModal, setOpenModal] = useState(false)
    // const [createPostBook, setCreatePostBook] = useState(null)
    
    // opens and closes the modal
    // const handleModal = (book) => {
    //     console.log(book);
    //     setOpenModal(true)
    //     setCreatePostBook(book)
    // }

    // submits bookpost to back-end
    // const handleBookPostSubmit = (book_post) => {
    //     setOpenModal(false)
    //     console.log("submitting post");
    //     console.log(book_post);
    // }

    // returns selected component
    const handleContent = () => {
        if (shownContent === "myPosts") {
            return <MyPosts />
        } else if (shownContent === "searchBooks") {
            return <SearchBooks user={props.user}/>
        } else {
            return <MyFeed />
        }
    }

    return (
        <div className="dynamic-content">
            <NavTabs setShownContent={setShownContent}/>
            {handleContent()}
            {/* <BookPostModal handleBookPostSubmit={handleBookPostSubmit} book={createPostBook}  setOpenModal={setOpenModal} openModal={openModal}/> */}
        </div>
    )
}

export default DynamicContent
