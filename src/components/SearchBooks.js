import React, { useState } from "react";
import SearchBar from "../utilities/SearchBar";

const SearchBooks = () => {

    const [search, setSearch] = useState("")

    return (
        <div>
            <SearchBar search={search} setSearch={setSearch}/>
        </div>
    );
};

export default SearchBooks;
