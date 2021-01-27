import React, { useState, useEffect } from "react";
import SearchBar from "./material-ui/SearchBar";
import BookDisplayed from "./BookDisplayed";
import BookPostModal from "./material-ui/BookPostModal";
import axios from "axios";
import useDebounce from "../utilities/useDebounce";
import LoadingCircle from "./material-ui/LoadingCircle";

const SearchBooks = (props) => {
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [createPostBook, setCreatePostBook] = useState(null);
    const [loading, setLoading] = useState(false);
    const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
    const SERVER = process.env.REACT_APP_SERVER;
    const searchDebounced = useDebounce(search, 500);

    const handleModal = (book) => {
        console.log(book);
        setOpenModal(true);
        setCreatePostBook(book);
    };

    const handleBookPostSubmit = async (book_post) => {
        setOpenModal(false);
        book_post.user_id = props.user.id;
        try {
            await axios.post(`${SERVER}/book-post/create`, book_post);
            props.setShownContent("myPosts");
        } catch (error) {
            console.log(`ERROR CREATING POST: ${error}`);
        }
    };

    // handles book search
    useEffect(() => {
        if (searchDebounced) {
            handleSearch();
        }
    }, [searchDebounced]);

    useEffect(() => {
        if (search === "") {
            setSearchResults([]);
            setLoading(false);
        } else {
            setLoading(true);
        }
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
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const resultsDisplayed = searchResults.map((book, idx) => {
        return (
            <BookDisplayed handleModal={handleModal} key={idx} book={book} />
        );
    });

    const handleResultsDisplayed = () => {
        if (loading) {
            return (
                <div className="loading-div">
                    <LoadingCircle />
                    <p id="loading-text">Loading Books...</p>
                </div>
            );
        } else {
            return resultsDisplayed;
        }
    };

    return (
        <div>
            <SearchBar
                handleSearch={handleSearch}
                search={search}
                setSearch={setSearch}
            />
            {handleResultsDisplayed()}
            <BookPostModal
                setShownContent={props.setShownContent}
                handleBookPostSubmit={handleBookPostSubmit}
                book={createPostBook}
                setOpenModal={setOpenModal}
                openModal={openModal}
            />
        </div>
    );
};

export default SearchBooks;
