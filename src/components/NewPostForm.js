import React from "react";

const NewPostForm = (props) => {
    const { authors, imgUrl, publishedDate, publisher, title } = props.book;

    return (
        <div className="new-post-form">
            <div className="upper-create-form">
                <div>
                    <img id="create-post-img" src={imgUrl} alt="Book Cover" />
                </div>
                <div>
                    <div>
                        <h2 id="create-post-title">{title}</h2>
                        <p id="create-post-author">By: {authors[0]}</p>
                        <p id="create-post-publisher">
                            Published By: <strong>{publisher}</strong> -{" "}
                            <em>{publishedDate}</em>
                        </p>
                    </div>
                </div>
            </div>
            <div className="rating-container">
                <h2>Your Rating:</h2>
                <div className="stars">
                    <img className="star-img-form" src={process.env.PUBLIC_URL + "images/star-empty.svg"} alt="Star"/>
                    <img className="star-img-form" src={process.env.PUBLIC_URL + "images/star-empty.svg"} alt="Star"/>
                    <img className="star-img-form" src={process.env.PUBLIC_URL + "images/star-empty.svg"} alt="Star"/>
                </div>
            </div>
        </div>
    );
};

export default NewPostForm;
