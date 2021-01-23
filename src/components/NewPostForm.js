import React, { useEffect, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
import Box from "@material-ui/core/Box";

const NewPostForm = (props) => {
    const { authors, imgUrl, publishedDate, publisher, title } = props.book;
    const [ratingDisplayed, setRatingDisplayed] = useState("");
    const [rating, setRating] = useState(null);

    useEffect(() => {
        // select the stars from DOM
        const starOne = document.getElementById("star-one");
        const starTwo = document.getElementById("star-two");
        const starThree = document.getElementById("star-three");

        let notSelected = true;

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
                    <img id="create-post-img" src={imgUrl} alt="Book Cover" />
                </div>
                <div className="flex-column">
                    <div>
                        <h2 id="create-post-title">{title}</h2>
                        <p id="create-post-author">By: {authors[0]}</p>

                    </div>
                    <div>
                        <Divider id="new-post-divider" orientation="horizontal" />
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
                        multiline
                        rows={5}
                        size="small"
                        name="bio"
                    />
                </Box>
                <Button fullWidth="true" variant="contained" type="submit">
                    Submit Post
                </Button>
            </div>
        </div>
    );
};

export default NewPostForm;
