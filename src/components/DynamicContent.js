import React, { useState } from 'react'
import NavTabs from './material-ui/NavTabs'
import SearchBooks from './SearchBooks'
import MyPosts from './MyPosts'
import MyFeed from './MyFeed'


const DynamicContent = () => {

    const [shownContent, setShownContent] = useState("searchBooks")


    const handleContent = () => {
        if (shownContent === "myPosts") {
            return <MyPosts />
        } else if (shownContent === "searchBooks") {
            return <SearchBooks />
        } else {
            return <MyFeed />
        }
    }


    return (
        <div className="dynamic-content">
            <NavTabs setShownContent={setShownContent}/>
            {handleContent()}
        </div>
    )
}

export default DynamicContent
