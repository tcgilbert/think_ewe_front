import React from 'react'
import FeedBookPost from './FeedBookPost'

const MyFeed = (props) => {

    const handleFeed = props.feed.map((post, key) => {
        return <FeedBookPost post={post}/>
    })

    return (
        <div>
            {handleFeed}
        </div>
    )
}

export default MyFeed
