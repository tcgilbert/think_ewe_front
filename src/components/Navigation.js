import React, { useState, useEffect } from "react";
import LoginPopUp from "./material-ui/LoginPopUp";
import AppBar from "./material-ui/AppBar";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Popover from "@material-ui/core/Popover";

const Navigation = (props) => {
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchFocus, setSearchFocus] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const SERVER = process.env.REACT_APP_SERVER;
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    const history = useHistory();

    useEffect(() => {
        if (search !== "") {
            handleSearch();
        } else if (search == "") {
            setSearchResults([]);
        }
    }, [search]);

    const handleRedirect = (username) => {
        console.log(username);
        setSearchFocus(false);
    };

    const handleSearch = async () => {
        try {
            let apiRes = await axios.get(`${SERVER}/users/find/${search}`);
            console.log(apiRes);
            let matches = await apiRes.data.matchesPayload;
            setSearchResults(matches);
        } catch (error) {
            console.log(`SEARCH ERROR: ${error}`);
        }
    };

    const searchDisplayed = searchResults.map((user, idx) => {
        if (searchFocus) {
            return (
                <div
                    onClick={() => handleRedirect(user.username)}
                    className="search-wrapper-parent"
                    key={idx}
                >
                    <div className="search-wrapper">
                        <div>
                            <div className="avatar-username">
                                <img
                                    className="tiny-avatar"
                                    src={`${process.env.PUBLIC_URL}${user.avatar}`}
                                    alt="avatar"
                                />
                                <p id="search-username">
                                    <strong>@{user.username}</strong>
                                </p>
                            </div>
                        </div>
                        {user.name}
                    </div>
                </div>
            );
        } else {
            return;
        }
    });

    const handleSearchResults = () => {
        if (searchResults.length === 0 && searchFocus) {
            return (
                <div className="absolute-child">
                    <div className="search-wrapper-parent">
                        <div className="search-wrapper">
                            <div>
                                <div className="avatar-username">
                                    <p id="search-username">No results...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (searchFocus) {
            return <div className="absolute-child">{searchDisplayed}</div>;
        } else {
            return;
        }
    };

    const handleNavBars = () => {
        if (props.isAuthenticated) {
            return (
                <div>
                    <AppBar
                        searchResults={searchResults}
                        search={search}
                        setSearch={setSearch}
                        handleLogout={props.handleLogout}
                        setSearchFocus={setSearchFocus}
                    />
                </div>
            );
        } else {
            return (
                <div className="nav-bar">
                    <h1 id="title">Think Ewe</h1>
                    <LoginPopUp
                        logLink={props.logLink}
                        setLogLink={props.setLogLink}
                        handleLogin={props.handleLogin}
                    />
                </div>
            );
        }
    };

    return (
        <>
            {handleNavBars()}
            <div id="search-results-parent" className="relative-parent">
                {handleSearchResults()}
            </div>
        </>
    );
};

export default Navigation;
