import React, { useEffect, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";

const EditPostForm = (props) => {
    const { authors, cover_url, title } = props.post;
    const [ratingDisplayed, setRatingDisplayed] = useState("");
    const [rating, setRating] = useState(props.post.rating);
    const [blurb, setBlurb] = useState(props.post.blurb);

    const validateSubmission = () => {
        if (!rating) {
            console.log("A rating is required");
            return;
        }
        const book_post = {
            authors,
            title,
            cover_url: cover_url,
            rating,
            blurb,
        };
        props.handleSubmit(book_post);
        props.handleClose();
    };

    // set the rating on mount
    // useEffect(() => {
    //     if (rating === 1) {
    //         setRatingDisplayed("Good!")
    //     } else if (rating === 2) {
    //         setRatingDisplayed("Great!")
    //     } else {
    //         setRatingDisplayed("Exceptional!")
    //     }
    // }, [])

    useEffect(() => {
        // select the stars from DOM
        const starOne = document.getElementById("star-one");
        const starTwo = document.getElementById("star-two");
        const starThree = document.getElementById("star-three");
        let notSelected = false;

        if (rating === 1) {
            setRatingDisplayed("Good!")
            starOne.setAttribute(
                "src",
                `${process.env.PUBLIC_URL}/images/star.svg`
            );
        } else if (rating === 2) {
            setRatingDisplayed("Great!")
            starOne.setAttribute(
                "src",
                `${process.env.PUBLIC_URL}/images/star.svg`
            );
            starTwo.setAttribute(
                "src",
                `${process.env.PUBLIC_URL}/images/star.svg`
            );
        } else {
            setRatingDisplayed("Exceptional!")
            starOne.setAttribute(
                "src",
                `${process.env.PUBLIC_URL}/images/star.svg`
            );
            starTwo.setAttribute(
                "src",
                `${process.env.PUBLIC_URL}/images/star.svg`
            );
            starThree.setAttribute(
                "src",
                `${process.env.PUBLIC_URL}/images/star.svg`
            );
        }


        // Mouseover event listeners
        starOne.addEventListener("mouseover", () => {
            if (notSelected) {
                console.log("this is being triggered unintentionally");
                setRatingDisplayed("Good!");
                starOne.setAttribute(
                    "src",
                    `${process.env.PUBLIC_URL}/images/star.svg`
                );
            }
        });

        starOne.addEventListener("mouseout", () => {
            console.log("off");
            if (notSelected) {
                starOne.setAttribute(
                    "src",
                    `${process.env.PUBLIC_URL}/images/star-empty.svg`
                );
            }
        });

        starTwo.addEventListener("mouseover", () => {
            console.log("on");
            if (notSelected) {
                setRatingDisplayed("Great!");
                starOne.setAttribute(
                    "src",
                    `${process.env.PUBLIC_URL}/images/star.svg`
                );
                starTwo.setAttribute(
                    "src",
                    `${process.env.PUBLIC_URL}/images/star.svg`
                );
            }
        });

        starTwo.addEventListener("mouseout", () => {
            console.log("off");
            if (notSelected) {
                starOne.setAttribute(
                    "src",
                    `${process.env.PUBLIC_URL}/images/star-empty.svg`
                );
                starTwo.setAttribute(
                    "src",
                    `${process.env.PUBLIC_URL}/images/star-empty.svg`
                );
            }
        });

        starThree.addEventListener("mouseover", () => {
            console.log("on");
            if (notSelected) {
                setRatingDisplayed("Exceptional!");
                starOne.setAttribute(
                    "src",
                    `${process.env.PUBLIC_URL}/images/star.svg`
                );
                starTwo.setAttribute(
                    "src",
                    `${process.env.PUBLIC_URL}/images/star.svg`
                );
                starThree.setAttribute(
                    "src",
                    `${process.env.PUBLIC_URL}/images/star.svg`
                );
            }
        });

        starThree.addEventListener("mouseout", () => {
            console.log("off");
            if (notSelected) {
                starOne.setAttribute(
                    "src",
                    `${process.env.PUBLIC_URL}/images/star-empty.svg`
                );
                starTwo.setAttribute(
                    "src",
                    `${process.env.PUBLIC_URL}/images/star-empty.svg`
                );
                starThree.setAttribute(
                    "src",
                    `${process.env.PUBLIC_URL}/images/star-empty.svg`
                );
            }
        });

        // handle clicks on stars
        starOne.addEventListener("click", () => {
            console.log("clicked star one");
            if (notSelected) {
                // setNotSelected(false)
                notSelected = false;
                setRating(1);
                setRatingDisplayed("Good!");
                starOne.setAttribute(
                    "src",
                    `${process.env.PUBLIC_URL}/images/star.svg`
                );
            } else {
                // setNotSelected(true)
                notSelected = true;
                setRating(null);
                setRatingDisplayed("");
                starOne.setAttribute(
                    "src",
                    `${process.env.PUBLIC_URL}/images/star-empty.svg`
                );
                starTwo.setAttribute(
                    "src",
                    `${process.env.PUBLIC_URL}/images/star-empty.svg`
                );
                starThree.setAttribute(
                    "src",
                    `${process.env.PUBLIC_URL}/images/star-empty.svg`
                );
            }
        });

        starTwo.addEventListener("click", () => {
            console.log("clicked star one");
            if (notSelected) {
                // setNotSelected(false)
                notSelected = false;
                setRating(2);
                setRatingDisplayed("Great!");
                starOne.setAttribute(
                    "src",
                    `${process.env.PUBLIC_URL}/images/star.svg`
                );
                starTwo.setAttribute(
                    "src",
                    `${process.env.PUBLIC_URL}/images/star.svg`
                );
            } else {
                // setNotSelected(true)
                notSelected = true;
                setRating(null);
                setRatingDisplayed("");
                starOne.setAttribute(
                    "src",
                    `${process.env.PUBLIC_URL}/images/star-empty.svg`
                );
                starTwo.setAttribute(
                    "src",
                    `${process.env.PUBLIC_URL}/images/star-empty.svg`
                );
                starThree.setAttribute(
                    "src",
                    `${process.env.PUBLIC_URL}/images/star-empty.svg`
                );
            }
        });

        starThree.addEventListener("click", () => {
            console.log("clicked star one");
            if (notSelected) {
                // setNotSelected(false)
                notSelected = false;
                setRating(3);
                setRatingDisplayed("Exceptional!");
                starOne.setAttribute(
                    "src",
                    `${process.env.PUBLIC_URL}/images/star.svg`
                );
                starTwo.setAttribute(
                    "src",
                    `${process.env.PUBLIC_URL}/images/star.svg`
                );
                starThree.setAttribute(
                    "src",
                    `${process.env.PUBLIC_URL}/images/star.svg`
                );
            } else {
                // setNotSelected(true)
                notSelected = true;
                setRating(null);
                setRatingDisplayed("");
                starOne.setAttribute(
                    "src",
                    `${process.env.PUBLIC_URL}/images/star-empty.svg`
                );
                starTwo.setAttribute(
                    "src",
                    `${process.env.PUBLIC_URL}/images/star-empty.svg`
                );
                starThree.setAttribute(
                    "src",
                    `${process.env.PUBLIC_URL}/images/star-empty.svg`
                );
            }
        });
    }, []);

    return (
        <div className="new-post-form">
            <div className="upper-create-form">
                <div>
                    <img
                        id="create-post-img"
                        src={cover_url}
                        alt="Book Cover"
                    />
                </div>
                <div className="flex-column">
                    <div>
                        <h2 id="create-post-title">{title}</h2>
                        <p id="create-post-author">By: {authors[0]}</p>
                    </div>
                    <div>
                        <Divider
                            id="new-post-divider"
                            orientation="horizontal"
                        />
                        <h2>Your Rating: {ratingDisplayed}</h2>
                        <div className="stars">
                            <img
                                id="star-one"
                                className="star-img-form"
                                src={
                                    process.env.PUBLIC_URL +
                                    "images/star-empty.svg"
                                }
                                alt="Star"
                            />
                            <img
                                id="star-two"
                                className="star-img-form"
                                src={
                                    process.env.PUBLIC_URL +
                                    "images/star-empty.svg"
                                }
                                alt="Star"
                            />
                            <img
                                id="star-three"
                                className="star-img-form"
                                src={
                                    process.env.PUBLIC_URL +
                                    "images/star-empty.svg"
                                }
                                alt="Star"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-container">
                <Box my={1}>
                    <TextField
                        fullWidth="true"
                        label="Your Thoughts..."
                        type="text"
                        variant="outlined"
                        value={blurb}
                        onChange={(e) => setBlurb(e.target.value)}
                        multiline
                        rows={5}
                        size="small"
                        name="bio"
                    />
                </Box>
                <div className="btn-group">
                    <Button fullWidth="true" variant="contained" type="submit">
                        Delete Post
                    </Button>
                    <Button
                        onClick={() => validateSubmission()}
                        fullWidth="true"
                        variant="contained"
                        type="submit"
                    >
                        Update Post
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default EditPostForm;
