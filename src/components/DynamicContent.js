import axios from 'axios'
import React, {useEffect, useState, useRef} from 'react'
import NavTabs from './material-ui/NavTabs'
import SearchBooks from './SearchBooks'
import MyPosts from './MyPosts'
import MyFeed from './MyFeed'
import Box from "@material-ui/core/Box";




const DynamicContent = (props) => {

    const [shownContent, setShownContent] = useState("myFeed")
    const [myBookPosts, setMyBookPosts] = useState([])
    const [loadingFeed, setLoadingFeed] = useState(false)
    const SERVER = process.env.REACT_APP_SERVER;
    const fetchBookPosts = useRef(() => {})
    // load book posts on state switch
    useEffect(() => {

        if (shownContent === "myPosts") {
            // function to get books
            fetchBookPosts.current()
        }

    }, [shownContent])

    fetchBookPosts.current = async () => {
        console.log(`${SERVER}/book-post/user/${props.user.id}`);
        let apiRes = await axios.get(`${SERVER}/book-post/user/${props.user.id}`)
        let usersPosts = await apiRes.data.posts
        setMyBookPosts(usersPosts)
        setLoadingFeed(false)
    }

    const handleRefresh = () => {
        setLoadingFeed(true)
        setTimeout(() => {
            fetchBookPosts.current()
        }, 1000)
    }

    // returns selected component
    const handleContent = () => {
        if (shownContent === "myPosts") {
            return <MyPosts fetchBookPosts={fetchBookPosts.current} myBookPosts={myBookPosts} user={props.user}/>
        } else if (shownContent === "searchBooks") {
            return <SearchBooks setShownContent={setShownContent} user={props.user}/>
        } else {
            return <MyFeed user={props.user} loadingFeed={loadingFeed} handleRefresh={handleRefresh} setLoadingFeed={setLoadingFeed} feed={props.feed} />
        }
    }

    return (
        <div className="dynamic-content">
            <NavTabs shownContent={shownContent} setShownContent={setShownContent}/>
            <Box style={{maxHeight: "600px", minHeight: "600px"}} overflow="auto">
                {handleContent()}
            </Box>
        </div>
    )
}

export default DynamicContent
