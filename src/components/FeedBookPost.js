import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

const FeedBookPost = (props) => {
    const [username, setUserName] = useState("");
    const [userAvatar, setUserAvatar] = useState("");
    const [likes, setLikes] = useState(null);
    const [likedByUser, setLikedByUser] = useState(false);
    const SERVER = process.env.REACT_APP_SERVER;
    const getUserInfo = useRef(() => {});

    useEffect(() => {
        if (username === "") {
            getUserInfo.current();
        }
    }, [username]);

    useEffect(() => {
        const getLikes = async () => {
            try {
                let apiRes = await axios.get(
                    `${SERVER}/likes/book-post/${props.post.id}`
                );
                let likes = await apiRes.data.likes;
                console.log(likes);
                setLikes(likes);
            } catch (error) {
                console.log(`ERROR FETCHING LIKES: ${error}`);
            }
        };

        // get the likes
        getLikes()
        
    }, [likedByUser])

    useEffect(() => {
        const checkForUser = () => {
            if (likes) {
                likes.forEach((like) => {
                    if (props.user.id === like.user_id) {
                        setLikedByUser(true)
                    }
                })
            }
        }
        checkForUser()
    }, [likes])

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

    const handleLike = async () => {
        try {
            let apiRes = await axios.post(`${SERVER}/likes/create`, {
                post_id: props.post.id,
                user_id: props.user.id,
            });
            console.log(apiRes);
            if (await apiRes.data.created) {
                setLikedByUser(true)
            }
        } catch (error) {
            console.log(`ERROR CREATING LIKE: ${error}`);
        }
    };

    const handleUnlike = async () => {
        try {
            let apiRes = await axios.delete(`${SERVER}/likes/delete`, {
                data: {
                    post_id: props.post.id,
                    user_id: props.user.id,
                }
            });
            if (await apiRes.data.removed) {
                setLikedByUser(false)
            }
        } catch (error) {
            console.log(`ERROR CREATING LIKE: ${error}`);
        }
    }

    const handleLikeButtons = () => {

        let postLikes;

        if (likes) {
            postLikes = likes.length
        } else {
            postLikes = 0
        }

        if (likedByUser) {
            return (
                <div className="like-container">
                    <IconButton onClick={handleUnlike} size="small">
                        <FavoriteIcon color="secondary"/>
                    </IconButton>
                    {postLikes}
                </div>
            );
        } else {
            return (
                <div className="like-container">
                    <IconButton onClick={handleLike} size="small">
                        <FavoriteBorderIcon />
                    </IconButton>
                    {postLikes}
                </div>
            );
        }
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
                <div className="post-actions">
                    {handleLikeButtons()}
                </div>
            </div>
        </div>
    );
};

export default FeedBookPost;
