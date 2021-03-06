// imports
import "./App.css";
import { useEffect, useState, useRef } from "react";
import { Route, Redirect, useHistory, Switch } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utilities/setAuthToken";

// components
import LandingPage from "./components/LandingPage";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import Navigation from "./components/Navigation";
import OtherUserProfile from "./components/OtherUserProfile";

function App() {
    const [currentUser, setCurrentUser] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [logLink, setLogLink] = useState(false);
    const SERVER = process.env.REACT_APP_SERVER;
    const history = useHistory();
    const handleLogout = useRef(() => {})
    // Private Route
    const PrivateRoute = ({ component: Component, ...rest }) => {
        const user = localStorage.getItem("jwtToken");
        return (
            <Route
                {...rest}
                render={(props) => {
                    return user ? (
                        <Component {...rest} {...props} />
                    ) : (
                        <Redirect to="/" />
                    );
                }}
            />
        );
    };
    // handle log in
    const handleLogin = async (values) => {
        try {
            console.log("logging in");
            // look for user
            const requestedUser = await axios.post(`${SERVER}/users/login`, {
                identifier: values.identifier,
                password: values.password,
            });
            // extract token
            const { token } = requestedUser.data;
            // add to local storage
            localStorage.setItem("jwtToken", token);
            // set token
            setAuthToken(token);
            // decode token
            const userInfo = jwt_decode(token);
            // fetch user
            const apiRes = await axios.get(
                `${SERVER}/users/current/${userInfo.id}`
            );
            const user = apiRes.data.requestedUser;
            // set the current user
            setCurrentUser(user);
            setIsAuthenticated(true);
            
            return true
        } catch (error) {
            return await error
        }
    };


    handleLogout.current = () => {
        setCurrentUser(null);
        setIsAuthenticated(false);
        history.push("/");
        if (localStorage.getItem("jwtToken")) {
            localStorage.removeItem("jwtToken");
        }
    };


    // send token to backend to check for user
    useEffect(() => {
        const checkToken = async (token) => {
            try {
                const tokenUser = await axios.post(
                    `${SERVER}/users/check-token`,
                    {
                        token: token,
                    }
                );
                const userFound = await tokenUser.data.user_found;
                if (userFound) {
                    setCurrentUser(userFound);
                    setIsAuthenticated(true);
                    setAuthToken(token);
                } else {
                    handleLogout.current();
                }
            } catch (error) {
                handleLogout.current();
            }
        };

        const token = localStorage.getItem("jwtToken");
        if (token) {
            checkToken(token);
        }
    }, [SERVER, handleLogout]);



    return (
        <div>
            <Navigation
                logLink={logLink}
                setLogLink={setLogLink}
                handleLogin={handleLogin}
                handleLogout={handleLogout.current}
                isAuthenticated={isAuthenticated}
            />
            <div className="app-container">
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => {
                            return (
                                <LandingPage
                                    logLink={logLink}
                                    setLogLink={setLogLink}
                                    handleLogin={handleLogin}
                                    setUser={setCurrentUser}
                                    setAuth={setIsAuthenticated}
                                    isAuth={isAuthenticated}
                                    currentUser={currentUser}
                                />
                            );
                        }}
                    />
                    <PrivateRoute
                        exact
                        path="/profile"
                        component={Profile}
                        user={currentUser}
                        setUser={setCurrentUser}
                    />
                    <PrivateRoute
                        exact
                        path="/user/:username"
                        component={OtherUserProfile}
                        user={currentUser}
                    />
                    <PrivateRoute
                        exact
                        path="/dashboard"
                        component={Dashboard}
                        user={currentUser}
                        setUser={setCurrentUser}
                    />
                </Switch>
            </div>
        </div>
    );
}

export default App;
