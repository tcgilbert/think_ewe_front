import React, { useState } from 'react'
import NavTabs from './material-ui/NavTabs'
import SearchBooks from './SearchBooks'

const DynamicContent = () => {

    const [shownContent, setShownContent] = useState("searchBooks")


    const handleContent = () => {
        if (shownContent === "myPosts") {
            // return my posts
            return 
        } else if (shownContent === "searchBooks") {
            // return search books
            return <SearchBooks />
        } else {
            // myFeed
            return 
        }
    }


    return (
        <div className="dynamic-content">
            <NavTabs />
            {handleContent()}
        </div>
    )
}

export default DynamicContent
