import React from "react";

const UserBookPost = (props) => {
    const postRating = () => {
        let stars = [];
        for (let i = 0; i < props.post.rating; i++) {
            stars.push(
                <img
                    className="star-img-post"
                    src={process.env.PUBLIC_URL + "/images/star.svg"}
                    alt="star"
                />
            );
        }
        return stars;
    };

    return (
        <div className="book-post-container">
            <div className="cover-info-container-post">
                <img className="cover-img" src={props.post.cover_url} alt="" />
                <div id="title-rating-author">
                    <div>
                        <h4 id="book-title">{props.post.title}</h4>
                        <p id="by-author">By: {props.post.authors}</p>
                    </div>
                    <div className="book-post-rating">{postRating()}</div>
                </div>
            </div>
            <div className="post-social-content">
                <p>
                    @{props.user.username}: {props.post.blurb}
                </p>
                <div className="post-actions">
                	<button onClick={() => props.handleModal(props.post)} className="action-button">Edit</button>
                </div>
            </div>
        </div>
    );
};

export default UserBookPost;
