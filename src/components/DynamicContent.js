import React, { useState } from 'react'
import NavTabs from './material-ui/NavTabs'
import SearchBooks from './SearchBooks'
import MyPosts from './MyPosts'
import MyFeed from './MyFeed'
import BookPostModal from './material-ui/BookPostModal'


const DynamicContent = () => {

    const [shownContent, setShownContent] = useState("searchBooks")
    const [openModal, setOpenModal] = useState(false)
    const [createPostBook, setCreatePostBook] = useState(null)
    
    const handleModal = (book) => {
        console.log("book selected");
        console.log(book);
        setOpenModal(true)
        setCreatePostBook(book)
    }

    const handleContent = () => {
        if (shownContent === "myPosts") {
            return <MyPosts />
        } else if (shownContent === "searchBooks") {
            return <SearchBooks handleModal={handleModal}/>
        } else {
            return <MyFeed />
        }
    }

    return (
        <div className="dynamic-content">
            <NavTabs setShownContent={setShownContent}/>
            {handleContent()}
            <BookPostModal book={createPostBook} setOpenModal={setOpenModal} openModal={openModal}/>
        </div>
    )
}

export default DynamicContent
