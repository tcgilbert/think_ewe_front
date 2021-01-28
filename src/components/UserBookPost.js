import React, { useState, useEffect } from "react";
import axios from 'axios'
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

const UserBookPost = (props) => {

    const [likes, setLikes] = useState(null);
    const [likedByUser, setLikedByUser] = useState(false);
    const SERVER = process.env.REACT_APP_SERVER;


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
                        <a
                            className="username-link"
                            href={`/user/${props.user.username}`}
                        >
                            <img
                                className="tiny-avatar"
                                src={`${process.env.PUBLIC_URL}${props.user.avatar}`}
                                alt="avatar"
                            />
                            @{props.user.username}
                        </a>
                    </p>
                    <p className="post-blurb">{props.post.blurb}</p>
                </div>
                <div className="post-actions">
                    {handleLikeButtons()}
                    <button
                        onClick={() => props.handleModal(props.post)}
                        className="edit-post-btn"
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserBookPost;
