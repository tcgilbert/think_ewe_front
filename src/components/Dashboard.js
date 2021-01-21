import React from "react";
import useForm from "../utilities/useForm";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { TextField, Button, FormControl } from "@material-ui/core";

const Dashboard = (props) => {
    const [values, handleChange] = useForm({ username: null, bio: "" });
    const SERVER = process.env.REACT_APP_SERVER;

    const handleSubmit = async () => {
        console.log("updating user");
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
                    <FormControl>
                        <TextField
                            label="Username"
                            type="text"
                            variant="outlined"
                            size="small"
                            type="text"
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Bio"
                            type="text"
                            variant="outlined"
                            multiline
                            rows={4}
                            size="small"
                            type="text"
                            name="bio"
                            value={values.bio}
                            onChange={handleChange}
                        />
                        <Button
                            variant="contained"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </FormControl>
                </div>
            );
        }
    };
    return <div>{handleRedirect()}</div>;
};

export default Dashboard;
