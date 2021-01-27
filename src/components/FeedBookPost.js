import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const FeedBookPost = (props) => {
    const [username, setUserName] = useState("");
    const [userAvatar, setUserAvatar] = useState("");
    const SERVER = process.env.REACT_APP_SERVER;
    const getUserInfo = useRef(() => {})

    useEffect(() => {
        if (username === "") {
            getUserInfo.current();
        }
    }, [username]);

    getUserInfo.current = async () => {
        let apiRes = await axios.get(
            `${SERVER}/users/current/${props.post.user_id}`
        );
        let userData = await apiRes.data.requestedUser;
        setUserName(userData.username);
        setUserAvatar(userData.avatar);
    };

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
                <div>
                    <p>
                        <a className="username-link" href={`/user/${username}`}>
                            <img
                                className="tiny-avatar"
                                src={`${process.env.PUBLIC_URL}${userAvatar}`}
                                alt="avatar"
                            />
                            @{username}
                        </a>
                    </p>
                    <p className="post-blurb">{props.post.blurb}</p>
                </div>
                <div className="post-actions"></div>
            </div>
        </div>
    );
};

export default FeedBookPost;
