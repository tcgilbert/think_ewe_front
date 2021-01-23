import React from 'react'

const NewPostForm = (props) => {
    const { authors, imgUrl, publishedDate, publisher, title } = props.book

    return (
        <div className="new-post-form">
            <img id="create-post-img" src={imgUrl} alt="Book Cover"/>
            <h2 id="create-post-title">{title}</h2>
        </div>
    )
}

export default NewPostForm
