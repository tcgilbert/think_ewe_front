// imports
import "./App.css";
import { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import axios from 'axios'
import jwt_decode from 'jwt-decode'


// components
import Signup_Login from "./components/Signup_Login";

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const SERVER = process.env.REACT_APP_SERVER

    useEffect(async () => {
        const token = localStorage.getItem('jwtToken')
        if (token) {
            console.log(token);
            const tokenUser = await axios.post(`${SERVER}/users/check-token`, {
                token: token
            })
            const userFound = await tokenUser.data.user_found
            if (userFound) {
                const userInfo = await jwt_decode(token)
                setCurrentUser(userInfo)
                setIsAuthenticated(true)
            }
        }
    }, [])

    const handleLogout = () => {
      console.log('logging out');
        if (localStorage.getItem("jwtToken")) {
            localStorage.removeItem("jwtToken");
            setCurrentUser(null);
            setIsAuthenticated(false);
        }
    };

    return (
        <div className="App">
            <h1>Hello from client side</h1>
            <Signup_Login
                setUser={setCurrentUser}
                setAuth={setIsAuthenticated}
            />
            <button onClick={handleLogout} type="submit">Logout</button>
        </div>
    );
}

export default App;
