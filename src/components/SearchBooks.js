import React, { useState } from "react";
import SearchBar from "../utilities/SearchBar";
import axios from 'axios'

const SearchBooks = () => {

    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY

    const handleSearch = async () => {
        console.log("searching");
        let books = []
        try {
            let axiosRes = await axios.get(
                `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=10&key=${API_KEY}`
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
            setSearchResults(books)
            
        } catch (error) {
            console.log(error);
        }
    }

    const resultsDisplayed = searchResults.map((book, idx) => {
        return <li key={idx}>{book.title}</li>
    })

    return (
        <div>
            <SearchBar handleSearch={handleSearch} search={search} setSearch={setSearch}/>
            <ul>
                {resultsDisplayed}
            </ul>
        </div>
    );
};

export default SearchBooks;
