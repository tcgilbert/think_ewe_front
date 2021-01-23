import React, { useState, useEffect } from "react";
import SearchBar from "./material-ui/SearchBar";
import BookDisplayed from "./BookDisplayed";
import axios from "axios";


const SearchBooks = (props) => {
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

    useEffect(() => {
        if (search === "") {
            setSearchResults([]);
        }
        handleSearch();
    }, [search]);

    const handleSearch = async () => {
        let books = [];
        try {
            let axiosRes = await axios.get(
                `https://www.googleapis.com/books/v1/volumes?q=${search.toLowerCase()}&maxResults=6&key=${API_KEY}`
            );
            let resArray = await axiosRes.data.items;
            if (resArray !== "undefined") {
                resArray.forEach((ele) => {
                    if (
                        ele.volumeInfo.title &&
                        ele.volumeInfo.authors &&
                        ele.volumeInfo.publisher &&
                        ele.volumeInfo.publishedDate &&
                        ele.volumeInfo.imageLinks
                    ) {
                        let book = {
                            title: ele.volumeInfo.title,
                            authors: ele.volumeInfo.authors,
                            publisher: ele.volumeInfo.publisher,
                            publishedDate: ele.volumeInfo.publishedDate,
                            imgUrl: ele.volumeInfo.imageLinks.thumbnail,
                        };
                        books.push(book);
                    }
                });
            }
            setSearchResults(books);
        } catch (error) {
            console.log(error);
        }
    };

    const resultsDisplayed = searchResults.map((book, idx) => {
        return <BookDisplayed handleCreatePost={props.handleCreatePost} key={idx} book={book} />;
    });


    return (
        <div>
            <SearchBar
                handleSearch={handleSearch}
                search={search}
                setSearch={setSearch}
            />
            {resultsDisplayed}
        </div>
    );
};

export default SearchBooks;
