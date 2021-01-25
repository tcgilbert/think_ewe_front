import axios from 'axios'
import React, {useEffect, useState} from 'react'
import NavTabs from './material-ui/NavTabs'
import SearchBooks from './SearchBooks'
import MyPosts from './MyPosts'
import MyFeed from './MyFeed'



const DynamicContent = (props) => {


    const [shownContent, setShownContent] = useState("myFeed")
    const [myBookPosts, setMyBookPosts] = useState([])
    const SERVER = process.env.REACT_APP_SERVER;

    // load book posts on state switch
    useEffect(() => {

        if (shownContent === "myPosts") {
            // function to get books
            fetchBookPosts()
        }

    }, [shownContent])

    const fetchBookPosts = async () => {
        let apiRes = await axios.get(`${SERVER}/book-post/user/${props.user.id}`)
        let usersPosts = await apiRes.data.posts
        setMyBookPosts(usersPosts)
    }

    // returns selected component
    const handleContent = () => {
        if (shownContent === "myPosts") {
            return <MyPosts fetchBookPosts={fetchBookPosts} myBookPosts={myBookPosts} user={props.user}/>
        } else if (shownContent === "searchBooks") {
            return <SearchBooks setShownContent={setShownContent} user={props.user}/>
        } else {
            return <MyFeed feed={props.feed} />
        }
    }

    return (
        <div className="dynamic-content">
            <NavTabs shownContent={shownContent} setShownContent={setShownContent}/>
            {handleContent()}
           
        </div>
    )
}

export default DynamicContent
