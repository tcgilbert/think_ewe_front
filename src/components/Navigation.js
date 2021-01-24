import React, { useState, useEffect } from "react";
import LoginPopUp from "./material-ui/LoginPopUp";
import AppBar from "./material-ui/AppBar";
import axios from 'axios';

const Navigation = (props) => {

    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const SERVER = process.env.REACT_APP_SERVER

    // useEffect(() => {

    // }, [search])


    const handleSearch = async () => {
        let users = []
        try {
            let apiRes = await axios.get(`${SERVER}/users/find/${search}`)
            console.log(apiRes);
            let matches = await apiRes.data.matchesPayload
            setSearchResults(matches)
        } catch (error) {
            console.log(`SEARCH ERROR: ${error}`);
        }
    }


    const searchDisplayed = searchResults.map((user, idx) => {
        return <li>{user.name}</li>
    })


    const handleNavBars = () => {
        if (props.isAuthenticated) {
            return (
                <div>
                    <AppBar searchResults={searchResults} search={search} setSearch={setSearch} handleLogout={props.handleLogout} />
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
            <button onClick={handleSearch}>search</button>
            <ul>
                {searchDisplayed}
            </ul>
        </>
    );
};

export default Navigation;
