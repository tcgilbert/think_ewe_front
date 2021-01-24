import UserBookPost from './UserBookPost'

const MyPosts = (props) => {

    const posts = props.myBookPosts.map((post, idx) => {
        return <UserBookPost user={props.user} key={idx} post={post} />
    })


    return (
        <div>
            {posts}
        </div>
    )
}

export default MyPosts
