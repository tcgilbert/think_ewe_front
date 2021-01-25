import React, { useState, useEffect } from "react";
import axios from 'axios'

const FeedBookPost = (props) => {

    const [username, setUserName] = useState("")
    const SERVER = process.env.REACT_APP_SERVER;

    useEffect(() => {
        if (username === "") {
            getUserInfo()
        }
    }, [])

    const getUserInfo = async () => {
        let apiRes = await axios.get(`${SERVER}/users/current/${props.post.user_id}`)
        let userData = await apiRes.data.requestedUser
        setUserName(userData.username)
    }


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
                    @{username}: {props.post.blurb}
                </p>
                <div className="post-actions">
    
                </div>
            </div>
        </div>
    );
};

export default FeedBookPost;
