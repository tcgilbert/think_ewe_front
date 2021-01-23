import React from "react";
import Box from "@material-ui/core/Box";

const BookDisplayed = (props) => {
    return (
        <div className="book-container">
            <div className="cover-info-container">
                <img className="cover-img" src={props.book.imgUrl} alt="" />
                <div id="title-published">
                    <div>
                        <h4 id="book-title">{props.book.title}</h4>
                        <p id="by-author">By: {props.book.authors}</p>
                    </div>
                    <div>
                        <p id="book-publisher">
                            Published by:{" "}
                            <strong>{props.book.publisher}</strong>{" "}
                            <em>{props.book.publishedDate}</em>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDisplayed;
