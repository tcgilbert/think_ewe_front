// imports
import "./App.css";
import { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";


// components
import Signup_Login from "./components/Signup_Login";

function App() {
    const [currentUser, setCurrentUser] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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
