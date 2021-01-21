import React from "react";
import useForm from "../utilities/useForm";
import axios from "axios";
import { Redirect } from "react-router-dom";

const Dashboard = (props) => {
    const [values, handleChange] = useForm({ username: null, bio: "" });
    const SERVER = process.env.REACT_APP_SERVER;

    const handleSubmit = async () => {
        console.log("updating user");
        console.log(props.user);
        if (!values.username) {
            console.log("Username is required");
            return;
        }
        // update the user
        try {
            await axios.put(`${SERVER}/users/dashboard-update`, {
                username: values.username,
                bio: values.bio,
                id: props.user.id,
            });
            let apiRes = await axios.get(`${SERVER}/users/${props.user.id}`);
            const updatedUser = await apiRes.data.requestedUser;
            const userCopy = JSON.parse(JSON.stringify(props.user));
            userCopy.username = updatedUser.username;
            userCopy.bio = updatedUser.bio;
            userCopy.registered = updatedUser.registered;
            props.setUser(userCopy);
        } catch (error) {
            console.log(`UPDATE ERROR: ${error}`);
        }
    };

    const handleRedirect = () => {
        if (props.user.registered) {
            return <Redirect to="/profile" />;
        } else {
            return (
                <div>
                    <h3>Welcome, {props.user.name}!</h3>
                    <label htmlFor="email">Pick a username</label>
                    <input
                        type="text"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                    />
                    <label htmlFor="bio">Bio (optional)</label>
                    <input
                        type="text"
                        name="bio"
                        value={values.bio}
                        onChange={handleChange}
                    />
                    <button type="submit" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            );
        }
    };
    return (
        <div>
            {handleRedirect()}
        </div>
    ) 
};

export default Dashboard;
